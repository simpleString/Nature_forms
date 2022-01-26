import React, { useEffect, useState } from "react";
import { IPost } from "../../contracts";
import { ITheoryData } from "../interfaces";
import { getAllPosts } from "../services/PostService";
import { Theory } from "./Theory";

export const TheoryList = () => {
    const [posts, setPosts] = useState<IPost[]>();

    useEffect(() => {
        const fetchData = async () => {
            setPosts(await getAllPosts());
        };

        fetchData();
    }, []);

    return (
        <div className="theory-list">
            {posts &&
                posts.map((post) => (
                    <Theory title={post.title} content={post.content} />
                ))}
        </div>
    );
};
