export type PhotoFeedState = {
    quota: number;
    postList: Post[];
    profilePostList: Post[];
    newPostCount:number,
    redirect: boolean,
    update: boolean,
};

export type Post =  {
    id: number;
    caption: string;
    create_at: string;
    update_at: string;
    username: string;
    profile_picture: string;
    images: string[];
    ratings?: number;
    myRating?: number;
};

export type Comment = {
    id: number;
    author: string;
    content: string;
};

export const initialState:PhotoFeedState = {
    postList:[],
    profilePostList:[],
    quota: 10,
    newPostCount:-1,
    redirect: false,
    update: false,
}