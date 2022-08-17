import accountDao, { AuthDTO, CustomerDTO } from "./account_dao";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../../config/config";
import { User } from "../../types/express";
import { ErrorOrData } from "../fund/fund_service";
export interface AccountDTO {
  balance: number;
  availableBalance: number;
  userId: number;
}
type LoginParams = {
  username: string;
  password: string;
};

class AccountService {
  private dao: typeof accountDao;
  constructor(dao: typeof accountDao) {
    this.dao = dao;
  }
  createAccount: (payload: AccountDTO) => void = (payload: AccountDTO) => {
    console.log("Creating account in service", payload);

    accountDao.createAccount(payload);
  };
  signup: (payload: CustomerDTO) => Promise<number> = async (
    customerDTO: CustomerDTO
  ) => {
    const { firstName, lastName, email, dob, sex } = customerDTO;
    return await accountDao.createCustomer({
      firstName,
      lastName,
      email,
      dob,
      sex,
    });
  };
  createCustomerAuth = (customerAuth: AuthDTO) => {
    return accountDao.createAuth(customerAuth);
  };
  login: (payload: LoginParams) => ErrorOrData = async (
    payload: LoginParams
  ) => {
    const { username, password } = payload;
    const user: User = await accountDao.getUserAuth(username);
    if (!user) {
      return {
        error: "incorrect username or password",
      };
    }
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword!);
    if (!isValid) {
      return {
        error: "incorrect username or password",
      };
    }
    delete user.password;
    const token = jwt.sign({ ...user }, config.TOKEN_KEY!, { expiresIn: "2h" });
    return {
      data: token,
    };
  };
}

export default new AccountService(accountDao);
