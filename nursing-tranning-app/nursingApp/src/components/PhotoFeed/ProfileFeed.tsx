import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Post } from "../../redux/photoFeed/state";
import PhotoCard from "./PhotoCard";
import { getPhotoFeedThunk, getProfileThunk } from '../../redux/photoFeed/thunk';
import { useParams } from "react-router-dom";


export default function ProfileFeed(props:{user_id:number}) {
    const { searchId } = useParams<{ searchId: string }>();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)
    const cpp = 100;

    const postList = useSelector((state: RootState) => state.photoFeed.profilePostList)
    const {user_id} = props;

    useEffect(() => {
        if(!user_id) {return}
        dispatch(getProfileThunk(page, cpp, props.user_id))
        // dispatch(getProfileThunk(page, cpp, user_id))
    }, [])

    return (
        <>
            {postList.map((post: Post) =>
                <PhotoCard
                    options={post}
                    key={post.id}
                    isPhotoFeed={false}
                    page={page}
                    cpp={cpp}
                />
            )}
        </>
    )
}