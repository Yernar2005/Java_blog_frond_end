import api from "../http";
import {IUser} from "../models/IUser.ts";
import {AxiosResponse} from "axios";

export default class UserService {


    static fetchUser(): Promise<AxiosResponse<IUser[]>> {
        return api.post<IUser[]>("/users")
    }


}

