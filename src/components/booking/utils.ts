import { v4 as uuidv4 } from "uuid";

export interface Room {
  id: string;
  cost: number;
  isReserved: boolean;
  roomNumber: number;
}
export interface User {
  firstname: string;
  lastname: string;
  credits: number;
}
const ROOMS_DATA: Room[] = new Array(15).fill(null).map((_, i) => ({
  id: uuidv4(),
  cost: Math.floor(Math.random() * 22) + 1,
  isReserved: false,
  roomNumber: i,
}));
const USER_DATA: User = {
  firstname: "Vijay",
  lastname: "Tyagi",
  credits: Math.floor(Math.random() * 15) + 10,
};
export const fetchRoomDetails = (): Promise<Room[]> => {
  return new Promise<Room[]>((resolve) => {
    setTimeout(() => resolve(ROOMS_DATA), 1000);
  });
};
export const fetchUserDetails = (): Promise<User> => {
  return new Promise<User>((resolve) => {
    setTimeout(() => resolve(USER_DATA), 1000);
  });
};
