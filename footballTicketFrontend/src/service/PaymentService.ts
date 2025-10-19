import type { RegisterPaymentAccountDto } from "../dto/RegisterPaymentAccountDto";
import type { PaymentAccountDto } from "../dto/PaymentAccountDto";
import API from "./axiosInstance";

const BASE_URL = "/payment";

export const createAccount = (registerPaymentAccountDto: RegisterPaymentAccountDto) =>
  API.post(`${BASE_URL}/create-account`, registerPaymentAccountDto);

export const withdraw = (paymentAccountDto: PaymentAccountDto) =>
  API.post(`${BASE_URL}/withdraw`, paymentAccountDto);

export const getLoan = (loanAccountDto: PaymentAccountDto) => 
  API.post(`${BASE_URL}/get-loan`, loanAccountDto);

export const findByUsername = (username: string) => 
  API.get(`${BASE_URL}/find-by-username/${username}`)
