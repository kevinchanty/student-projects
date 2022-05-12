import React, { ReactElement, useState } from "react";
import { IonList, IonItem, IonLabel, IonIcon, IonText } from "@ionic/react";
import {
    analyticsOutline,
    bookOutline,
    chevronForwardOutline,
    gameControllerOutline,
    hammerOutline,
    informationCircleOutline,
    personOutline,
} from "ionicons/icons";
import styles from "../Admin/Admin.module.scss";
import backgroundPic from "../../assets/img/43071.jpg";
import { RootState } from "../../redux/store";

interface Props {}

export default function AdminPanel({}: Props): ReactElement {
    return (
        <>
            <IonList>
                <IonItem routerLink="/AdminPanel/ManageQuestions">
                    <IonIcon color="primary" icon={bookOutline}></IonIcon>
                    <IonText color="primary">
                        <IonLabel className="ion-margin-start">
                            Manage Question Bank
                        </IonLabel>
                    </IonText>
                </IonItem>
                {/* <IonItem routerLink="/AdminPanel/ManageQuestions">
                    <IonIcon
                        color="primary"
                        icon={gameControllerOutline}
                    ></IonIcon>
                    <IonText color="primary">
                        <IonLabel className="ion-margin-start">
                            Manage Game Settings
                        </IonLabel>
                    </IonText>
                </IonItem> */}
                <IonItem routerLink="/AdminPanel/Analytics">
                    <IonIcon color="primary" icon={analyticsOutline}></IonIcon>
                    <IonText color="primary">
                        <IonLabel className="ion-margin-start">
                            Analytics
                        </IonLabel>
                    </IonText>
                </IonItem>
            </IonList>
            <div className={styles.backgroundAdmin}>
                <img src={backgroundPic} />
            </div>
        </>
    );
}
