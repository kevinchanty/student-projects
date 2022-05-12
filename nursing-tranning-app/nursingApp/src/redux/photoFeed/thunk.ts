import { RootDispatch, RootState } from "../store";
import { onReditect, setPost, setProfile, setQuota } from "./action";
import { UserPhoto } from '../../hooks/usePhotoGallery'
import { API_SERVER, get, post } from "../../helpers/api"


export function getQuotaThunk() {
    return async (dispatch: RootDispatch) => {
        let token = localStorage.getItem("token");
        if (!token) { 
        return } // TODO ERROR HANDLE


        const res = await fetch(`${API_SERVER}/post/quota`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        const result = await res.text();
        if (res.status === 200) {
            dispatch(setQuota(parseInt(result)));
            return;
        } else {
        }
    }
};

export function getPhotoFeedThunk(page: number, cpp: number) {
    return async (dispatch: RootDispatch) => {
        let token = localStorage.getItem("token");
        if (!token) {  return } // TODO ERROR HANDLE

        const res = await fetch(`${API_SERVER}/photoFeed?p=${page}&cpp=${cpp}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        const result = await res.json();
        if (res.status === 200) {
            dispatch(setPost(result));

        } else {
            return
        }

    }
};

export function getProfileThunk(page: number, cpp: number, searchId: number) {
    return async (dispatch: RootDispatch, useState: () => RootState) => {
        const token = useState().auth.token
        if (!token) { return };

        const json = await get(`/post/profile?searchId=${searchId}&p=${page}&cpp=${cpp}`)
        dispatch(setProfile(json));
    }
}

export function addPostThunk(newPost: {
    caption: string,
    visibility: boolean,
    images: UserPhoto[],
}) {
    return async (dispatch: RootDispatch, useState: () => RootState) => {
        let formData = new FormData();
        formData.append("caption", newPost.caption);
        formData.append("visibility", JSON.stringify(newPost.visibility));
        newPost.images.forEach(image => formData.append("images", image.file));
        formData.entries();

        const json = await post("/post", formData);
        
        if (json.message === "Success") {
            dispatch(onReditect());
        }}

    }