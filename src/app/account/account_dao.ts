import db from "../../db/db";
import { AccountDTO } from "./account_service";
export interface CustomerDTO {
  firstName: string;
  lastName: string;
  email: string;
  sex: Enumerator;
  dob: Date;
}
export interface AuthDTO {
  email: string;
  password: string;
}
class CustomerDAO {
  createAccount: (payload: AccountDTO) => void = async (
    payload: AccountDTO
  ) => {
    console.log("Creating account in dao", payload);

    const result = await db("accounts").insert({
      user_id: payload.userId,
      balance: payload.balance,
      available_balance: payload.availableBalance,
    });
    console.log("The result of account", result);
  };
  getUserAuth: (payload: string) => any = async (email: string) => {
    const [user] = await db("user_auth").where({ email });
    return user;
  };
  getUser: (payload: string) => any = async (email: string) => {
    const [user] = await db("users").where({ email });
    return user;
  };
  createAuth: (payload: AuthDTO) => Promise<number> = async (
    customerAuth: AuthDTO
  ) => {
    console.log("Inserting customer auth", customerAuth);
    const [id] = await db("user_auth").insert({
      email: customerAuth.email,
      password: customerAuth.password,
    });
    return id;
  };
  createTransaction: (payload: {
    from: number;
    to: number;
    type: string;
    amount: number;
  }) => void = (payload) => {
    db("transactions").insert(payload);
  };
  findById: (userId: number) => Promise<Record<string, string>[]> = async (
    userId: number
  ) => {
    return await db("accounts").where({ user_id: userId });
  };
  createCustomer: (payload: CustomerDTO) => Promise<number> = async (
    customer: CustomerDTO
  ) => {
    const [id] = await db("users").insert({
      first_name: customer.firstName,
      last_name: customer.lastName,
      dob: customer.dob,
      sex: customer.sex,
      email: customer.email,
    });
    return id;
  };
  updateAccount: (
    query: Record<string, string>,
    update: Record<string, string>
  ) => Promise<number> = async (
    query: Record<string, string>,
    update: Record<string, string>
  ) => {
    return await db("accounts").update(update).where(query);
  };
}

export default new CustomerDAO();
