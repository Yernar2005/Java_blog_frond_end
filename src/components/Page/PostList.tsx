// src/components/PostList.tsx
import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {PostDto} from "../../models/PostDto.ts";
import {Context} from "../../main.tsx";


const PostList: React.FC = observer(() => {
    const {store} = React.useContext(Context);
    useEffect(() => {
        store.fetchPosts();
    }, []);

    if (store.posts.length === 0) {
        return <p>No posts found.</p>;
    }

    return (
        <div>
            {store.posts.map((post: PostDto) => (
                <div key={post.id} style={{border: "1px solid #ccc", margin: 16, padding: 16}}>
                    <h2>{post.title}</h2>
                    <p>by {post.authorUsername} on {new Date(post.createdAt).toLocaleString()}</p>
                    <p>{post.content}</p>
                    {post.imagePath && (
                        <img
                            src={`http://localhost:8080${post.imagePath.startsWith('/') ? '' : '/'}${post.imagePath}`}
                            alt={post.title}
                            style={{maxWidth: "100%", marginTop: 8}}
                        />
                    )}

                </div>
            ))}
            {/* Здесь можно добавить пагинацию: кнопки «Previous»/«Next» по store.currentPage и store.totalPages */}
        </div>
    );
});

export default PostList;