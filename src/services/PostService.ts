import api from "../http/index.ts"
import {AxiosResponse} from "axios";
import {Page} from "../models/Page.ts";
import {PostDto} from "../models/PostDto.ts";

class PostService {
    static async fetchPosts(
        page: number = 0,
        size: number = 10
    ): Promise<AxiosResponse<Page<PostDto>>> {
        return api.get<Page<PostDto>>(
            `/posts?page=${page}&size=${size}`
        );
    }


    static async createPost(
        title: string,
        content: string,
        image?: File
    ): Promise<AxiosResponse<PostDto>> {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) {
            formData.append("image", image);
        }

        // Заголовок Content-Type автоматически выставит axios при FormData
        return api.post<PostDto>("/posts", formData);
    }
};

export default PostService;