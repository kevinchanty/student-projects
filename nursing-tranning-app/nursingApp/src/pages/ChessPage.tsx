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
import Chess from "../components/Chess/Chess";
import { RootState } from "../redux/store";
// import './Chess.css';

const ChessPage: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const user = useSelector((state: RootState) => state.auth.user?.username);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/Game/Lobby"/>
                    </IonButtons>
                    <IonTitle>Chess</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent scrollX={false} scrollY={false}>
                <Chess />
            </IonContent>
        </IonPage>
    );
};

export default ChessPage;
