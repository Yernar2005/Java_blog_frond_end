import api from "../http";
import {IUser} from "../models/IUser.ts";
import {AxiosResponse} from "axios";

export default class UserService {


    // static fetchUser(): Promise<AxiosResponse<IUser[]>> {
    //     return api.post<IUser[]>("/users")
    // }
    static async getCurrentUser(): Promise<AxiosResponse<IUser>> {
        return api.get<IUser>("/users/me");
    }



}

