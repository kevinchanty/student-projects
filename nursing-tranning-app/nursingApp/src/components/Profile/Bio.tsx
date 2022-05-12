import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCol,
    IonGrid,
    IonRow,
    IonThumbnail,
} from "@ionic/react";
import { useLocation, useParams } from "react-router-dom";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { API_SERVER } from "../../helpers/api";
import { RootState } from "../../redux/store";
import styles from "./Bio.module.scss";
import { UploadButton } from "../PhotoFeed/FeedDetails";
import FeedDetail from "../PhotoFeed/FeedDetails";

type UserDetails = {
    id: number;
    username: string;
    score: number;
    calories: number;
    biography: string;
};
const Bio: FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const [userDetails, setUserDetails] = useState<UserDetails>();
    const isPhotoFeed = ["/PhotoFeed", "/PhotoFeed/"].includes(
        useLocation().pathname
    );

    // const paras = useParams<{ userId: string }>();
    // const userId = parseInt(paras.userId);

    async function getUserDetails() {
        try {
            const res = await fetch(`${API_SERVER}/user/profile/${user.id}`);
            const result = await res.json();
            return setUserDetails(result);
        } catch (error) {
        }
    }

    return (
        <IonGrid className={styles.profilePage}>
            <IonRow>
                <IonCol size="4" className={styles.End}>
                    <IonThumbnail className={styles.Thumbnail}>
                        <img
                            src={
                                API_SERVER + "/uploads/" + user.profile_picture
                            }
                        />
                    </IonThumbnail>
                </IonCol>
                <IonCol size="8" className={styles.Center}>
                    <IonCard className={styles.NoShadow}>
                        <IonCardHeader className={styles.Username}>
                            <b>{user.username}</b>
                        </IonCardHeader>
                        <IonCardContent>
                            {user.biography}
                            <br />
                            <div className={styles.buttonAlign}><UploadButton /></div>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default Bio;
