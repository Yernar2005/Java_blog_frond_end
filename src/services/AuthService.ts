import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse.ts";
import api from "../http";


export default class AuthService {

    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/auth/login',
            {
                email,
                password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true

            }
        )


    }

    static async registration(username: string, email: string, password: string, confirmPassword: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post('/auth/registration', {
                username,
                email,
                password,
                confirmPassword,
            },
            {
                withCredentials: true

            })
    }
    static async refreshToken(): Promise<AxiosResponse<AuthResponse>> {
        return api.get('/refresh', {
            withCredentials: true
        })
    }


    static async logout(): Promise<void> {
        return api.post('/logout', {},{withCredentials: true
        } )
    }
}