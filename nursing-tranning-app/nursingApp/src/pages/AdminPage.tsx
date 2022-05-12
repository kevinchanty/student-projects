import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { informationCircle } from "ionicons/icons";
import { useParams } from "react-router";
import ManageTab from "../components/Admin/ManageTab";

const ManageQuestionsPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                        <IonMenuButton />
                    <IonTitle>Admin</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Admin</IonTitle>

                    </IonToolbar>
                </IonHeader>

                <ManageTab />
            </IonContent>
        </IonPage>
    );
};
export default ManageQuestionsPage;
