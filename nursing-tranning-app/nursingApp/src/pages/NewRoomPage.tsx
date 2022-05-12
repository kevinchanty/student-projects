import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import NewRoom from "../components/Game/NewRoom";

// NAME THE COMPONENT
const NewRoomPage: React.FC = () => {
    const TITLE = "New Room"; // INSERT YOUR TITLE

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>{TITLE}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton>info</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{TITLE}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <NewRoom />
            </IonContent>
        </IonPage>
    );
};

export default NewRoomPage;
