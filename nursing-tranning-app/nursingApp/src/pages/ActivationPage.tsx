import {
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
    useIonToast,
} from "@ionic/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { API_SERVER } from "../helpers/api";

// NAME THE COMPONENT
const ActivationPage: React.FC = () => {
    const TITLE = "Activation"; // INSERT YOUR TITLE
    const router = useIonRouter();
    const [present, dismiss] = useIonToast();

    useEffect(() => {
        activateAcc();
    }, []);

    let { passcode } = useParams<{ passcode: string }>();
    async function activateAcc() {
        let res = await fetch(`${API_SERVER}/user/activation/${passcode}`);
        if (res.status === 200) {
            present({
                message: "you will be redirected to login page soon..",
                duration: 2 * 1000,
            });
            setTimeout(() => {
                router.push("/LoginPage");
            }, 3 * 1000);
        } else if (res.status === 400) {
            present({
                message:
                    "account is not activated because of expired / incorrect passcode, please register again",
                duration: 2 * 1000,
                color: "danger",
            });
            setTimeout(() => {
                router.push("/register");
            }, 3 * 1000);
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start"></IonButtons>
                    <IonTitle>{TITLE}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{TITLE}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard className="ion-padding">
                    <IonCardTitle color="primary" className="ion-text-center">
                        Account has been activated
                    </IonCardTitle>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default ActivationPage;
