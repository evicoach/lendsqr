import { EVENTS } from "../../constants/events";
import listener from "../../util/listener";
import accountDao from "../account/account_dao";

type WidthrawPayload = {
  amount: number;
  userId: number;
};

type TransferPayload = {
  to: number;
  from: number;
  amount: number;
};

export type ErrorOrData = Promise<
  | {
      error: string;
      data?: undefined;
    }
  | {
      data: string;
      error?: undefined;
    }
>;

class FundService {
  transfer: (payload: TransferPayload) => ErrorOrData = async (
    payload: TransferPayload
  ) => {
    console.log("transfer payload", payload);

    const [from] = await accountDao.findById(payload.from);
    const [to] = await accountDao.findById(payload.to);

    if (!from || !to) {
      return { error: "One of the parties is invalid" };
    }
    if (+from.balance < +payload.amount) {
      return {
        error: "You don't have enough balance to complete this transaction",
      };
    }
    let fromAmount = +from.balance - payload.amount;
    await accountDao.updateAccount(
      {
        user_id: `${payload.from}`,
      },
      {
        balance: `${fromAmount}`,
        available_balance: `${fromAmount}`,
      }
    );
    let toAmount = +to.balance + +payload.amount;
    await accountDao.updateAccount(
      {
        user_id: `${payload.to}`,
      },
      {
        balance: `${toAmount}`,
        available_balance: `${toAmount}`,
      }
    );
    listener.emit(EVENTS.TRANSACTION.COMPLETED, {
      from: payload.from,
      to: payload.to,
      fromId: from.user_id,
      toId: to.user_id,
      type: "debit",
      amount: payload.amount,
    });

    return {
      data: "Transaction successful",
    };
  };
  widthraw: (payload: WidthrawPayload) => ErrorOrData = async (
    payload: WidthrawPayload
  ) => {
    const [account] = await accountDao.findById(payload.userId);
    console.log("Account found ", account, payload);

    if (!account) {
      return { error: "Account with the given ID does not exist" };
    }
    if (+account.balance < +payload.amount) {
      return { error: "Insufficient funds" };
    }
    const newAmount = +account.balance - +payload.amount;
    await accountDao.updateAccount(
      {
        user_id: `${payload.userId}`,
      },
      {
        balance: `${newAmount}`,
        available_balance: `${newAmount}`,
      }
    );
    return { data: `${payload.amount} has been widthrawn successfully` };
  };
  fund: Function = async (payload: { amount: number; accountId: number }) => {
    let [account] = await accountDao.findById(payload.accountId);
    if (!account) {
      return {
        error: "Account with given ID not found",
      };
    }
    console.log("Found account ", account);
    // update this account
    const newAmount = +account.balance + +payload.amount;
    await accountDao.updateAccount(
      {
        user_id: `${payload.accountId}`,
      },
      {
        balance: `${newAmount}`,
        available_balance: `${newAmount}`,
      }
    );
    [account] = await accountDao.findById(payload.accountId);
    return {
      data: account,
    };
  };
}

export default new FundService();
