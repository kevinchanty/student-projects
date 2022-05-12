import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import EnterRoom from "../components/Game/EnterRoom";

// NAME THE COMPONENT
const EnterRoomPage: React.FC = () => {
    const TITLE = "Room"; // INSERT YOUR TITLE

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
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
                <EnterRoom />
            </IonContent>
        </IonPage>
    );
};

export default EnterRoomPage;
