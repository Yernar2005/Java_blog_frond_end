// src/components/PostList.tsx
import React, {useEffect, useContext} from "react";
import {observer} from "mobx-react-lite";
import {PostDto} from "../../models/PostDto.ts";
import {Context} from "../../main.tsx";
import "./postList.scss";

const PostList: React.FC = observer(() => {
    const {store} = useContext(Context);
    useEffect(() => {
        store.fetchPosts();
    }, []);
    if (store.posts.length === 0) {
        return <p className="post-list">No posts found.</p>;
    }

    const handleDeletePost = async (post: PostDto) => {
        try{
            const canDelete = await store.canDeletePost(post);


            if (canDelete) {
                await store.deletePost(post.id);
                store.fetchPosts();
            } else {
                console.error("У вас нет прав на удаление этого поста");
                alert("У вас нет прав на удаление этого поста");
            }
        }
        catch (error){
            console.error("Ошибка при удалении поста:", error);

        }
    }
    return (
        <div className="post-list">
            {store.posts.map((post: PostDto) => (
                <div key={post.id} className="post">
                    <div className="post-header">
                        <h2 className="post-title">{post.title}</h2>
                        {/*<button className="post-button" onClick={() => store.deletePost(post.id)}/>*/}
                        <button
                            className="post-button delete-button"
                            onClick={() => handleDeletePost(post)}
                            title="Удалить пост"
                        >
                            Удалить️
                        </button>


                    </div>
                    <p className="post-meta">
                        by {post.authorUsername} on{" "}
                        {new Date(post.createdAt).toLocaleString()}
                    </p>
                    <p className="post-content">{post.content}</p>
                    {post.imagePath && (
                        <img
                            className="post-image"
                            src={`http://localhost:8080${post.imagePath.startsWith('/') ? '' : '/'}${post.imagePath}`}
                            alt={post.title}
                        />
                    )}
                </div>
            ))}
            {/* Pagination controls can be added here, e.g. Previous/Next */}
        </div>
    );
});

export default PostList;
