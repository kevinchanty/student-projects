import { Post } from "./state"

export function setPost(postList:Post[]) {
    return {
        type: "setPost" as const,
        postList
    }
};

export function setQuota(quota: number) {
    return {
        type: "setQuota" as const,
        quota
    }
};

export function setProfile(postList:Post[]) {
    return {
        type: "setProfle" as const,
        postList
    }
};

export function onReditect() {
    return {
        type: "onRedirect" as const,
    }
}

export function offReditect() {
    return {
        type: "offRedirect" as const,
    }
}
export function setUpdate(value:boolean) {
    return {
        type: "setUpdate" as const,
        value
    }
}


export type PhotoFeedAction = 
    |ReturnType <typeof setPost>
    |ReturnType <typeof setQuota>
    |ReturnType <typeof setProfile>
    |ReturnType <typeof onReditect>
    |ReturnType <typeof offReditect>
    |ReturnType <typeof setUpdate>