import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import AddCard from "../../components/PhotoFeed/AddPost/AddCard";

const PhotoFeedAddPage: React.FC = (imageEle) => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/PhotoFeed" />
                    </IonButtons>
                    <IonTitle>Add New Post</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Add New Post</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <AddCard />
            </IonContent>
        </IonPage>
    );
};
export default PhotoFeedAddPage;

