import {
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import PopUpQuiz from "../components/PopUpQuizTest/PopUpQuiz";

const PopUpQuizPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Pop Up Quiz</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Pop Up Quiz</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <PopUpQuiz />
            </IonContent>
        </IonPage>
    );
};

export default PopUpQuizPage;
