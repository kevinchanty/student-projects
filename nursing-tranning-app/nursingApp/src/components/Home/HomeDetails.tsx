import { IonButton, IonCol, IonGrid, IonImg, IonRow, IonText } from "@ionic/react";
import React, { ReactElement } from "react";
import HomeHealthCard from "./HomeHealthCard";

interface Props {}

export default function HomeDetails({}: Props): ReactElement {
    return (

        <div>
            {/* <IonRow>
                <IonCol>
                    <div className="ion-text-start">SettingBtn</div>
                </IonCol>
                <IonCol>
                    <div className="ion-text-center">App Logo & Name</div>
                </IonCol>
                <IonCol>
                    <div className="ion-text-end">InfoBtn</div>
                </IonCol>
            </IonRow>

            <IonRow>
                <IonCol size="6">
                    <HomeHealthCard />
                </IonCol>

                <IonCol size="3">
                    icon
                    <IonButton routerLink="/Game">Games</IonButton>
                </IonCol>

                <IonCol size="3">
                    icon
                    <IonButton routerLink="/PhotoFeed">
                        Photo Feed
                    </IonButton>
                </IonCol>
            </IonRow> */}
        </div>
    );
}
