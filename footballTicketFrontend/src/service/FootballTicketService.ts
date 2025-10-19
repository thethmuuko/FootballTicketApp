import type { BookingDto } from "../dto/BookingDto";
import API from "./axiosInstance";

const BASE_URL = "/football";

export const listAllMatch = () => API.get(`${BASE_URL}/list-all-match`);
export const listAllSeat = () => API.get(`${BASE_URL}/list-all-seat`);
export const bookSeat = (bookingDto: BookingDto) =>
  API.post(`${BASE_URL}/book-seat`, bookingDto);
export const listAllSeatByStadiumName = (stadiumName: string) =>
  API.get(`${BASE_URL}/seats-by-stadium-name/${stadiumName}`);
