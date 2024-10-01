import { createContext } from "react";
import { User } from "../Utils/types";

interface UserContextType {
  user: User | null;
  login: (loginIdentifier: string, password: string) => boolean;
  register: (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    phoneNumber: string
  ) => boolean;
  logout: () => void;
  queryUser: () => void;
}

const userContext = createContext<UserContextType | undefined>(undefined);

export default userContext;
