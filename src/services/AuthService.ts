import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse.ts";
import api from "../http";


export default class AuthService {

    static async login(username:string, password:string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/auth/login',
            {
                username,
                password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )


    }

    static async registration(username:string, email:string, password:string, confirmPassword:string): Promise<AxiosResponse<AuthResponse>> {
        return api.post('/auth/registration', {
            username,
            email,
            password,
            confirmPassword,
        })
    }


    static async logout(): Promise<void> {
        return api.post('/logout')
    }
}