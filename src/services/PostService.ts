import axios from "axios";
import { BASE_URL } from "../configs";
import { IPost } from "../../contracts";

export const getPostsById = async (id: number) => {
    const result = await axios.get(BASE_URL + "posts/" + id);
    if (result.status !== 200) {
        throw "Error";
    }
    const data = (await result.data) as IPost;
    return data;
};

export const getAllPosts = async () => {
    const result = await axios.get(BASE_URL + "posts");
    if (result.status !== 200) {
        throw "Error";
    }
    const data = (await result.data) as IPost[];
    return data;
};
