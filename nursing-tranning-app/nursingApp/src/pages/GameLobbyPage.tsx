import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { informationCircle } from "ionicons/icons";
import GameLobby from "../components/Game/GameLobby";

// NAME THE COMPONENT
const GameLobbyPage: React.FC = () => {
    const TITLE = "Game Lobby"; // INSERT YOUR TITLE

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{TITLE}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{TITLE}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <GameLobby />
            </IonContent>
        </IonPage>
    );
};

export default GameLobbyPage;
