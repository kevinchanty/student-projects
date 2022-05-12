import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import Register from "../components/Auth/Register/Register";

const RegisterPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                        <IonBackButton defaultHref="/LoginPage"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Register</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <Register />
            </IonContent>
        </IonPage>
    );
};
export default RegisterPage;
