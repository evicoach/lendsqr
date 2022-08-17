import Emitter from "events";
import accountDao, { CustomerDTO } from "../app/account/account_dao";
import { EVENTS } from "../constants/events";
import customerService from "../app/account/account_service";

const listener = new Emitter.EventEmitter();

listener.on(EVENTS.CUSTOMER.CREATED, async (payload: CustomerDTO) => {
  const userId = await customerService.signup(payload);
  console.log("User created:: ", userId);
  customerService.createAccount({
    userId,
    balance: 0,
    availableBalance: 0,
  });
});
listener.on(
  EVENTS.TRANSACTION.COMPLETED,
  (payload: { from: number; to: number; type: string; amount: number }) => {
    accountDao.createTransaction({...payload, type:"debit", from:payload.from});
    accountDao.createTransaction({
      ...payload,
      type: "credit",
      to: payload.to,
    });
  }
);

export default listener;
