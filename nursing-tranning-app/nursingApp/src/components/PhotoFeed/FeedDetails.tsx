import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCol,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonRow,
    IonText,
    IonThumbnail,
    IonToggle,
    useIonPopover,
} from "@ionic/react";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getQuotaThunk } from "../../redux/photoFeed/thunk";
import { RootState } from "../../redux/store";
import styles from "../../helpers/helpers.module.scss";
import { addCircle, addCircleOutline, addCircleSharp } from "ionicons/icons";
import { API_SERVER, get } from "../../helpers/api";
import { setUpdate } from "../../redux/photoFeed/action";

interface Props { }

export default function FeedDetails({ }: Props): ReactElement {
    const isPhotoFeed = ["/PhotoFeed", "/PhotoFeed/"].includes(
        useLocation().pathname
    );
    const user = useSelector((state: RootState) => state.user);
    const update = useSelector((state: RootState) => state.photoFeed.update);

    const dispatch = useDispatch();
    const [sort, setSort] = useState("Stars");
    const [totalStars, setTotalStars] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [present, dismiss] = useIonPopover(PopoverList, {
        onHide: () => dismiss(),
        setSort: setSort,
    });

    const sortTextDisplay = {
        stars: "No. of Stars",
        date: "Date",
    };

    const fetchUserStats = async () => {
        if (user.id) {
            const result = await get(`/analytics/UserStats/${user.id}`)
            if (!result.error) {
                setTotalPosts(result.postCount || 0);
                setTotalStars(result.starCount || 0);
            }
        }
    }

    useEffect(() => {
        dispatch(getQuotaThunk());
        fetchUserStats();
        if(update == true) {dispatch(setUpdate(false))}
    }, [user,update]);

    return (
        <div>
            <IonGrid>
                <IonRow>
                    <IonCol size="4">
                        <IonThumbnail className={styles.igIcon}>
                            <img
                                src={
                                    API_SERVER +
                                    "/uploads/" +
                                    user.profile_picture
                                }
                            />
                        </IonThumbnail>
                        <IonText className={styles.igIconName} color="primary">
                            <b>{user.username}</b>
                        </IonText>

                    </IonCol>
                    <IonCol size="8" className={styles.Start}>
                        <IonCol size="3">
                            <div className="ion-text-center" style={{ fontWeight: "bold" }}>
                                <IonText color="primary" className="ion-text-cente"> {totalPosts}
                                </IonText>
                                <br/>
                                <IonText color="primary" className="ion-text-cente"> Posts
                                </IonText>
                            </div>
                            {/* <b>80</b>
                                <br />
                                Posts */}
                        </IonCol>
                        <IonCol size="3">
                            <div className="ion-text-center" style={{ fontWeight: "bold" }}>
                                <IonText color="primary" className="ion-text-cente"> {totalStars}
                                </IonText>
                                <br/>
                                <IonText color="primary" className="ion-text-cente"> Stars
                                </IonText>
                            </div>
                            {/* <IonCol size="3">
                            <IonText color="primary">
                                <b>55</b>
                                <br />
                                Stars
                            </IonText> */}
                        </IonCol>

                        <IonCol className={styles.buttonAlign} size="6">
                            {isPhotoFeed ? <UploadButton /> : ""}
                        </IonCol>
                    </IonCol>
                    <IonCol size="12">
                    </IonCol>

                </IonRow>
            </IonGrid>
        </div >
    );
}

const PopoverList: React.FC<{
    onHide: () => void;
    setSort: (state: string) => void;
}> = ({ onHide, setSort }) => (
    <IonList>
        {/* <IonListHeader>Ionic</IonListHeader> */}
        <IonItem button onClick={() => setSort("Stars")}>
            No. of Star
        </IonItem>
        <IonItem button onClick={() => setSort("Date")}>
            Date
        </IonItem>
    </IonList>
);

const ViewMyPostButton: React.FC = () => {
    const myId = useSelector((state: RootState) => state.user?.id);
    return (
        <IonButton
            size="small"
            fill="outline"
            color="primary"
            routerLink={"/PhotoFeed/Profile/" + myId}
        >
            <b>View</b>
        </IonButton>
    );
};

export const UploadButton: React.FC<{}> = ({ }) => {
    const quota = useSelector((state: RootState) => state.photoFeed.quota);

    return (
        <IonButton
            size="small"
            fill="outline"
            color="primary"
            routerLink="/PhotoFeed/Add"
        >
            <div>
                <IonText>
                    <b>Upload</b>
                </IonText>
            </div>
        </IonButton>
    );
};
