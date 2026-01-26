import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>(
    {
        isLoggedIn: false,
        setIsLoggedIn: () => {}
    }
);
