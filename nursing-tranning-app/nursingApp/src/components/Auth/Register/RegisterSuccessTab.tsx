import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardSubtitle,
    IonCardTitle,
    IonItemGroup,
    IonLabel,
    IonTitle,
    useIonRouter,
} from "@ionic/react";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./RegisterForm.module.scss";

export default function RegisterSuccessTab() {
    const dispatch = useDispatch();
    const router = useIonRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/LoginPage");
        }, 3 * 1000);
    }, []);

    return (
        <IonItemGroup className={styles.formContainer}>
            <IonCard className="ion-padding">
                <IonCardTitle color="primary" className="ion-margin">
                    Registration Success
                </IonCardTitle>
                <IonCardSubtitle
                    className="ion-margin"
                    style={{ fontSize: "1em" }}
                    color="dark"
                >
                    please check your inbox and activate the account by the link
                </IonCardSubtitle>
            </IonCard>
        </IonItemGroup>
    );
}
