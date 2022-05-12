// not in use
import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonRow,
    IonText,
} from "@ionic/react";
import React from "react";
import AddPlayerBtn from "./AddPlayerBtn";
import GuideMsg from "./GuideMsg";
import PlayerInfo from "./PlayerInfo";

export default function NewRoom() {
    return (
        <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol size="3">New Room</IonCol>
                    <IonCol size="9">
                        <AddPlayerBtn />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="6">
                        <PlayerInfo />
                    </IonCol>
                    <IonCol size="6">
                        <IonButtons>
                            <IonText>Room Number</IonText>
                            <IonButton>Copy Room Number</IonButton>
                        </IonButtons>
                        <GuideMsg />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="6">
                        Waiting for player.... [retrieve the number of player in
                        room from server]
                    </IonCol>
                    <IonCol size="6">
                        <IonButtons>
                            <IonButton routerLink="/Game/ChessPage">
                                Start
                            </IonButton>
                        </IonButtons>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    );
}
