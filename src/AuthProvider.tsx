import { useState } from "react";
import { AuthContext } from "./AuthContext";

// children - это возмодность использовать тэг AuthProvider для обертки DOM элемента(ов) как дочерних тэгов
//     <AuthProvider>
//      <App />
//    </AuthProvider>
interface AuthProviderProps {
    children: React.ReactNode;
}

// Обертка над деревом DOM 'элементов для хранения данных авторизации
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        /* Контекст объект для трансляции и что транлисровать из негою Транслируется свойтства AuthContext */
        <AuthContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn
        }}>
            {children}
        </AuthContext.Provider>
    );
};
