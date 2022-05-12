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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_SERVER } from "../helpers/api";
import EditQuestion from "../components/Admin/EditQuestion";

// NAME THE COMPONENT
const EditQuestionPage: React.FC = () => {
    const TITLE = "Edit Question";

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                        <IonBackButton />
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
                <EditQuestion />
            </IonContent>
        </IonPage>
    );
};

export default EditQuestionPage;
