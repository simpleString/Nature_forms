import { atom } from "recoil";
import { IUserData } from "../interfaces";

const userAtom = atom<IUserData>({
    key: "user",
    // default: JSON.parse(localStorage.getItem("user") || ""),
    default: { username: "", password: "" },
});

export { userAtom };
