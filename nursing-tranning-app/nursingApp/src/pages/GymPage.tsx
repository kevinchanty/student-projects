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
import { attachProps } from "@ionic/react/dist/types/components/utils";
import { informationCircle } from "ionicons/icons";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Equipment from "../components/Gym/Equipment";
import Gym from "../components/Gym/Gym";
import { RootState } from "../redux/store";
import PopUpQuizPage from "./PopUpQuizPage";

const GymPage: React.FC = () => {
    const is_answering_question = useSelector(
        (state: RootState) => !!state.user.active_question
    );

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Gym</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Gym</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {is_answering_question ? <PopUpQuizPage /> : <Gym />}
            </IonContent>
        </IonPage>
    );
};
export default GymPage;
