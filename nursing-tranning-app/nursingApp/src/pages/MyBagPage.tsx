import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import MyBagTab from "../components/MyBag/MyBagTab";
import SupermarketHistory from "../components/MyBag/SupermarketHistory";

const MyBagPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Purchase History</IonTitle>
                    <IonButtons slot="end">
                        <IonButton>Info</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Purchase History</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <MyBagTab />
            </IonContent>
        </IonPage>
    );
};
export default MyBagPage;