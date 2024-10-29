import { createContext } from "react";
import { User } from "../Utils/types";

interface UserContextType {
  user: User | null;
  login: (loginIdentifier: string, password: string) => Promise<boolean>;
  register: (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    phoneNumber: string
  ) => Promise<boolean>;
  logout: () => void;
  queryUser: () => Promise<boolean>;
}

const userContext = createContext<UserContextType | undefined>(undefined);

export default userContext;
