import { PhotoFeedAction } from "./action";
import { initialState, PhotoFeedState } from "./state";

export function photoFeedReducer(
    state: PhotoFeedState = initialState,
    action: PhotoFeedAction): PhotoFeedState {
    switch (action.type) {
        case "setPost":
            {
                let oldCount = state.postList.length
                let postList = [...state.postList, ...action.postList]
                postList = Array.from(new Map(postList.map(post=>[post.id, post])).values())
                postList.sort((a,b)=> -compare(a.create_at,b.create_at)  )
                let newCount = postList.length
                return {
                    ...state,
                    postList,
                    newPostCount: newCount - oldCount
                }
            }
            
        case "setProfle":
            return {
                ...state,
                profilePostList: action.postList
            }
        case "setQuota":
            return {
                ...state,
                quota: action.quota
            }

        case "onRedirect":
            return {
                ...state,
                redirect: true
            }

        case "offRedirect":
            return {
                ...state,
                redirect: false
            }

        case "setUpdate":
            return {
                ...state,
                update: action.value
            }

        default:
            return state
    }
};

function compare<T extends string | number>(a:T,b:T){
    if(a<b){
        return -1
    }
    if(a>b){
        return 1
    }
    return 0
}