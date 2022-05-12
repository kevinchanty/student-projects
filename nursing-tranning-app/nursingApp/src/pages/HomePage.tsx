import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import Home from "../components/Home/Home";

// NAME THE COMPONENT
const HomePage: React.FC = () => {
    const TITLE = "Home Page"; // INSERT YOUR TITLE

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
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
                {/* YOUR COMPONENTS: */}
                <Home />
            </IonContent>
        </IonPage>
    );
};

export default HomePage;
