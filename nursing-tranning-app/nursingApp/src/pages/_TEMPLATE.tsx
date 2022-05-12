import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";

// NAME THE COMPONENT
const COMPONENT_NAME: React.FC = () => {
    const TITLE = ""; // INSERT YOUR TITLE

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{TITLE}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{TITLE}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {/* YOUR COMPONENTS: */}
            </IonContent>
        </IonPage>
    );
};

// export default COMPONENT_NAME;
