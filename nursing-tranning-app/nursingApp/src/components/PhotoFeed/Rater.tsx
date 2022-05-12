import React, { ReactElement, useState, useEffect } from 'react'
import {
    IonIcon, useIonToast,
} from "@ionic/react";
import {
    images,
    star,
    starOutline,
} from "ionicons/icons";
import { post } from '../../helpers/api';
import { useDispatch } from 'react-redux';
import { getPhotoFeedThunk } from '../../redux/photoFeed/thunk';
import { setUpdate } from '../../redux/photoFeed/action';

interface Props {
    postId: number
    stars: number | null
    page: number
    cpp: number
}  

export default function Rater(props: Props): ReactElement {
    const dispatch = useDispatch();
    const [present, dismiss] = useIonToast();
    const { stars, postId } = props
    const [localStars, setLocalStars] = useState<number | null>()

    useEffect(()=>{
        setLocalStars(stars)
    },[])

    async function postRating(rating:number) {
        const result = await post("/Rating", {postId , rating},"application/json");
        if (result.message === 'Success') {
            setLocalStars(rating);
            present({
                message: "Rating Success",
                duration: 2 * 1000,
            });
        }
    }

    return (
        <div style={{fontSize:"2rem"}}>
            {localStars
                ? <>
                    <IonIcon icon={star} color={localStars >= 1 ? "primary" : "grey"}></IonIcon>
                    <IonIcon icon={star} color={localStars >= 2 ? "primary" : "grey"}></IonIcon>
                    <IonIcon icon={star} color={localStars >= 3 ? "primary" : "grey"}></IonIcon>
                    <IonIcon icon={star} color={localStars >= 4 ? "primary" : "grey"}></IonIcon>
                    <IonIcon icon={star} color={localStars >= 5 ? "primary" : "grey"}></IonIcon>
                </>
                : <>
                    <IonIcon icon={starOutline} color="grey" onClick={()=>{
                        postRating(1);
                        dispatch(getPhotoFeedThunk(props.page, props.cpp));
                        dispatch(setUpdate(true))
                    }}></IonIcon>
                    <IonIcon icon={starOutline} color="grey" onClick={()=>{
                        postRating(2);
                        dispatch(getPhotoFeedThunk(props.page, props.cpp));
                        dispatch(setUpdate(true))
                    }}></IonIcon>
                    <IonIcon icon={starOutline} color="grey" onClick={()=>{
                        postRating(3);
                        dispatch(getPhotoFeedThunk(props.page, props.cpp));
                        dispatch(setUpdate(true))
                    }}></IonIcon>
                    <IonIcon icon={starOutline} color="grey" onClick={()=>{
                        postRating(4);
                        dispatch(getPhotoFeedThunk(props.page, props.cpp));
                        dispatch(setUpdate(true))
                    }}></IonIcon>
                    <IonIcon icon={starOutline} color="grey" onClick={()=>{
                        postRating(5);
                        dispatch(getPhotoFeedThunk(props.page, props.cpp));
                        dispatch(setUpdate(true))
                    }}></IonIcon>
                    </>}
        </div>
    )
}
