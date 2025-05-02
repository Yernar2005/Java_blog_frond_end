import {IUser} from "../IUser.ts"

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    user: IUser;
}