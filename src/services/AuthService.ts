import axios from "axios";
import { IUserData } from "../interfaces";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../state";

class AuthService {
    public constructor() {}
    private globalUser = useSetRecoilState(userAtom);

    public login(user: IUserData) {
        console.log(user);
        this.globalUser(user);
    }

    public logout() {
        const emptyUser = { username: "", password: "" } as IUserData;
        this.globalUser(emptyUser);
    }
}

export default AuthService;
