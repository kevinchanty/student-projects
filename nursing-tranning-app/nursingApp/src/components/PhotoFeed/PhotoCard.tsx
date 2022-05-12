import {
    IonButton,
    IonCard,
    IonCardContent,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonModal,
    IonPage,
    IonRow,
    IonThumbnail,
    IonTitle,
    IonToolbar,
    useIonModal,
} from "@ionic/react";
import { Comment, Post } from "../../redux/photoFeed/state";
import styles from "../../helpers/helpers.module.scss";
import {
    images,
    star,
    starHalf,
    starOutline,
} from "ionicons/icons";
import { useState } from "react";
import { API_SERVER } from "../../helpers/api";
import Rater from "./Rater";
interface Props {
    options: Post;
    isPhotoFeed: boolean;
    page: number
    cpp: number
}

const PhotoCard = (props: Props) => {
    const [showModal, setShowModal] = useState(false);

    const post = props.options;
    if (!"dev") {
        return <pre>{JSON.stringify(post, null, 2)}</pre>;
    }
    return (
        <IonCard>
            {props.isPhotoFeed ? (
                <Username
                    username={props.options.username}
                    profilePic={
                        API_SERVER + "/uploads/" + props.options.profile_picture
                    }
                />
            ) : null}
            <div
                style={{
                    position: "relative",
                    height: "300px",
                    backgroundImage:
                        "url(" +
                        API_SERVER +
                        "/uploads/" +
                        props.options.images[0] +
                        ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                onClick={() => setShowModal(true)}
            >
                {props.options.images.length > 1 ? (
                    <IonIcon
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            right: "10px",
                            color: "white",
                        }}
                        icon={images}
                    />
                ) : (
                    ""
                )}
            </div>
            <IonCardContent>
                <div>
                    {props.options.caption}
                </div>
              
                <Rater postId={props.options.id} stars={props.options.myRating ? props.options.myRating : null} page={props.page} cpp={props.cpp}/>

                <div>
                    Stars: {props.options.ratings ? props.options.ratings : 0}
                </div>
                <div>
                    Post Time:{" "}
                    {new Date(props.options.create_at).toLocaleDateString()}
                </div>
                <div>
                    <IonChip color="primary">#foodinHk</IonChip>
                    <IonChip color="primary">#Nursing is fun</IonChip>
                </div>

            </IonCardContent>

            <IonModal isOpen={showModal} cssClass="my-custom-class">
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonButton
                                slot="end"
                                onClick={() => setShowModal(false)}
                                size="small"
                            >
                                Back
                            </IonButton>
                            <IonTitle>{props.options.username}</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent fullscreen>
                        <IonHeader collapse="condense">
                            <IonToolbar>
                                <IonTitle size="large">
                                    {props.options.username}
                                </IonTitle>
                            </IonToolbar>
                        </IonHeader>
                        <div>
                            {props.options.images.map((image, i) => {
                                return (
                                    <img
                                        src={API_SERVER + "/uploads/" + image}
                                        key={i}
                                    />
                                );
                            })}
                        </div>
                    </IonContent>
                </IonPage>
            </IonModal>
        </IonCard>
    );
};

const Username = (props: { profilePic: string; username: string }) => {
    return (
        <IonRow>
            <IonThumbnail className={styles.PostIcon}>
                <img src={props.profilePic} />
            </IonThumbnail>
            <div className={styles.PostName}>
                <b>{props.username}</b>
            </div>

            {/* <IonCol size="4" className={styles.End}> */}
            {/* </IonCol>
            <IonCol size="8" className={styles.Start}> */}
            {/* <IonCard className={styles.NoShadow}> */}
            {/* <IonCardContent> */}
            {/* </IonCardContent> */}
            {/* </IonCard> */}
            {/* </IonCol> */}
        </IonRow>
    );
};

export default PhotoCard;
