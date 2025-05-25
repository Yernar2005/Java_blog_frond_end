import IUser from "../models/IUser.ts";
import {makeAutoObservable, runInAction} from "mobx";
import AuthService from "../services/AuthService.ts";
import {API_URL} from "../http";
import axios from "axios";
import {PostDto} from "../models/PostDto.ts";
import PostService from "../services/PostService.ts";
import UserService from "../services/UserService.ts"; // Добавляем импорт UserService


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

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            if (!response) {
                console.error("Нет ответа от сервера");
                return;
            }

            // Проверяем наличие токена в ответе
            if (response.data && response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
                this.setAuth(true);

                // Получаем данные пользователя отдельным запросом
                const userData = await this.fetchCurrentUser();

                if (!userData) {
                    console.error("Не удалось получить данные пользователя после входа");
                }

            }
        } catch (e) {
            console.error("Ошибка входа:", {
                status: e.response?.status,
                data: e.response?.data,
                message: e.message
            });
        }


    }

    // async login(username: string, password: string) {
    //     try {
    //         const response = await AuthService.login(username, password);
    //         if (!response) {
    //             console.error("Нет ответа от сервера");
    //             return;
    //         }
    //
    //         // Убедимся, что у нас есть данные пользователя
    //         if (response.data && response.data.user) {
    //             console.log("Полученные данные пользователя:", response.data.user);
    //             localStorage.setItem('token', response.data.accessToken);
    //             this.setAuth(true);
    //             this.setUser(response.data.user);
    //         } else {
    //             console.error("Данные пользователя отсутствуют в ответе");
    //         }
    //     } catch (e) {
    //         console.error("Ошибка входа:", {
    //             status: e.response?.status,
    //             data: e.response?.data,
    //             message: e.message
    //         });
    //     }
    // }


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
            this.setUser(null)
            return response;
        } catch (e) {
            // console.log(e.response?.data?.message)
            console.log(e)

        }
    }

    // async checkAuth() {
    //     try {
    //         const response = await axios.get(`${API_URL}refresh`, {withCredentials: true})
    //         console.log(response)
    //         localStorage.setItem('token', response.data.accessToken);
    //         this.setAuth(true);
    //         this.setUser(response.data.user)
    //         return response;
    //
    //     } catch (e) {
    //         // console.log(e.response?.data?.message)
    //         console.log("mistake in checkAuth", e.message)
    //
    //     }
    // }
    async checkAuth() {

        const isToken  = localStorage.getItem('token')
        if(!isToken){
            console.log("Гостевой режим")
            this.setAuth(false);
            this.setUser(null);
            return false;

        }
        try {
            // const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
            const response = await AuthService.refreshToken();

            if (response && response.data) {
                localStorage.setItem('token', response.data.accessToken);
                this.setAuth(true);
                this.setUser(response.data.user);
                console.log("Пользователь авторизован:", response.data.user);
            }
            return response;
        } catch (e) {
            console.log("Ошибка при проверке авторизации:", e.message);
            this.setAuth(false);
            this.setUser(null);
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

    async fetchCurrentUser() {
        if (!this.isAuth || !localStorage.getItem('token')) {
            console.log('Пользователь не авторизован, невозможно получить данные');
            return null;
        }

        try {
            const response = await UserService.getCurrentUser();

            if (response && response.data) {
                console.log("Полученные данные пользователя:", response.data);
                this.setUser(response.data);
                return response.data;
            } else {
                console.error("Данные пользователя отсутствуют в ответе");
                return null;
            }
        } catch (e) {
            console.error("Error fetching user:", e);

            // Если получили 401 (Unauthorized), сбрасываем состояние авторизации
            if (e.response?.status === 401) {
                console.log('Токен недействителен, выполняем выход из системы');
                this.setAuth(false);
                this.setUser(null);
                localStorage.removeItem('token');
            }

            return null;
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


    async canDeletePost(post: PostDto): Promise<boolean> {
        // Проверяем авторизацию
        if (!this.isAuth) {

            return false;
        }

        try {
            // Получаем актуальные данные пользователя при каждой проверке
            const userData = await this.fetchCurrentUser();

            if (!userData) {
                console.log("Не удалось получить данные пользователя");
                return false;
            }

            console.log("Проверка прав на удаление поста:", {
                currentUser: userData.username,
                postAuthor: post.authorUsername,
                userRole: userData.roleName,
            });

            // Пользователь может удалить пост, если он его автор или если у него роль админа
            const isAuthor = userData.username === post.authorUsername;
            const isAdmin = userData.role === 'ROLE_ADMIN';

            return isAuthor || isAdmin;
        } catch (error) {
            console.error("Ошибка при проверке прав на удаление поста:", error);
            return false;
        }
    }
    async deletePost(id: number) {
        try{
            await PostService.deletePost(id);
            runInAction(()=> {
                this.posts = this.posts.filter(post => post.id !== id)
            })
            return true
        }
        catch (e){
            console.error("Ошибка при удалении поста:", e);
            return false
        }
    }

}