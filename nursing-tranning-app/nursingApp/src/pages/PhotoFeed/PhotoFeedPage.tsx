import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonButton,
    IonGrid,
    IonBackButton,
} from "@ionic/react";
import { useParams } from "react-router";
import {useEffect, useState} from "react"
import PhotoFeed from "../../components/PhotoFeed/PhotoFeed";
import { informationCircle } from "ionicons/icons";
import FeedDetails from "../../components/PhotoFeed/FeedDetails";
import { useDispatch } from "react-redux";
import { offReditect } from "../../redux/photoFeed/action";

const PhotoFeedPage: React.FC = () => {
    const dispatch = useDispatch()
    const { name } = useParams<{ name: string }>();
    useEffect(() => {
        dispatch(offReditect())
    }, [])


    return (
        // show when it is desktop/md
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Photo Feed</IonTitle>
                </IonToolbar>
            </IonHeader>

            {/* Show when it is IOS */}
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Photo Feed</IonTitle>
                    </IonToolbar>
                </IonHeader>

                {/* My-component */}
                <IonGrid>
                    <FeedDetails />
                    <PhotoFeed />
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default PhotoFeedPage;
