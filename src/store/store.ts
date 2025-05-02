import IUser from "../models/IUser.ts";
import {makeAutoObservable, runInAction} from "mobx";
import AuthService from "../services/AuthService.ts";
import {API_URL} from "../http";
import axios from "axios";
import postService from "../services/PostService.ts";
import {PostDto} from "../models/PostDto.ts";
import PostService from "../services/PostService.ts";



export default class Store {

    user: IUser | null = null;
    isAuth = false;
    posts: PostDto[] = [];
    totalPages = 0;
    currentPage = 0;
    constructor() {
        makeAutoObservable(this);
    }

    private setAuth(flag: boolean) {
        this.isAuth = flag;
    }

    private setUser(user: IUser | null) {
        this.user = user;
    }

    async login(username: string, password: string) {
        try {
            const response = await AuthService.login(username, password);
            if (!response) {
                console.error("Нет ответа от сервера");
                return;
            }
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (e) {
            console.error("Ошибка входа:", {
                status: e.response?.status,
                data: e.response?.data,
                message: e.message
            });
        }


    }


    async registration(username: string, email: string, password: string, confirmPassword: string) {
        try {
            console.log("Регистрационные данные:", username, email, password, confirmPassword,);
            const response = await AuthService.registration(username, email, password, confirmPassword);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.error("Registration error:", e.response?.data || e.message);
        }

    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser)
            return response;
        } catch (e) {
            // console.log(e.response?.data?.message)
            console.log(e)

        }
    }

    async checkAuth() {
        try {
            const response = await axios.get(`${API_URL}refresh`, {withCredentials: true})
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user)
            return response;

        } catch (e) {
            // console.log(e.response?.data?.message)
            console.log("mistake in checkAuth", e.message)

        }
    }


    async fetchPosts(page: number = 0, size: number = 10) {
        try {
            const response = await PostService.fetchPosts(page, size);
            runInAction(() => {
                this.posts = response.data.content;
                this.totalPages = response.data.totalPages;
                this.currentPage = response.data.number;
            });
        } catch (e) {
            console.error("Error fetching posts:", e);
        }
    }

    async createPost(title: string, content: string, image: File | null) {
        try {
            const response = await PostService.createPost(title, content, image || undefined);
            const newPost = response.data;
            runInAction(() => {
                this.posts.unshift(newPost);
            });
            return newPost;
        } catch (e) {
            console.error("Error creating post:", e);
            throw e;
        }
    }

}
