// not in use
import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonRow,
} from "@ionic/react";
import React from "react";
import AddPlayerBtn from "./AddPlayerBtn";
import GuideMsg from "./GuideMsg";
import PlayerInfo from "./PlayerInfo";

export default function EnterRoom() {
    return (
        <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol size="5">Room </IonCol>
                    <IonCol size="7">
                        <AddPlayerBtn />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="6">
                        <PlayerInfo />
                    </IonCol>
                    <IonCol size="6">
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
