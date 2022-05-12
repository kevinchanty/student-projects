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
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Game from "../components/Game/Game";
import { RootState } from "../redux/store";
// import './Chess.css';

const GamePage: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const user = useSelector((state: RootState) => state.auth.user?.username);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Game</IonTitle>
                    <IonButtons slot="end">
                        <IonButton>Info</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Game</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <Game />
            </IonContent>
        </IonPage>
    );
};

export default GamePage;
