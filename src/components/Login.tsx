import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { IUserData } from "../interfaces";
import AuthService from "../services/AuthService";

export const Login = () => {
    const [user, setUser] = useState<IUserData>({ username: "", password: "" });

    const loginUser = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const authService = new AuthService();
        authService.login(user);
        setUser({ username: "", password: "" });
    };

    return (
        <div>
            <form>
                <input
                    type="text"
                    value={user?.username}
                    onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                    }
                />
                <input
                    type="text"
                    value={user?.password}
                    onChange={(e) => {
                        setUser({ ...user, password: e.target.value });
                    }}
                />
                <button onClick={loginUser}>Login</button>
            </form>
        </div>
    );
};
