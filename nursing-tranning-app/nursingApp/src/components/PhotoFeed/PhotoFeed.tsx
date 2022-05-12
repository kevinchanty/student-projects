import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Post } from "../../redux/photoFeed/state";
import PhotoCard from "./PhotoCard";
import { getPhotoFeedThunk } from '../../redux/photoFeed/thunk';
import { IonButton } from "@ionic/react";
import styles from "../../helpers/helpers.module.scss"

const cpp = 3;

export default function PhotoFeed() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)

    const postList = useSelector((state: RootState) => state.photoFeed.postList)
    const newPostCount = useSelector((state: RootState) => state.photoFeed.newPostCount)

    useEffect(() => {
        dispatch(getPhotoFeedThunk(page, cpp))
    }, [page])

    return (
        <>
            {postList.map((post: Post) =>
                <PhotoCard
                    options={post}
                    key={post.id}
                    isPhotoFeed={true}
                    page={page}
                    cpp={cpp}
                />

            )}
            <div className={styles.showButton}>
                <IonButton
                    fill="outline"
                    onClick={() => setPage(page + 1)} >
                    Click Here to Show More
                </IonButton>
            </div>

        </>
    )
}