import {
    IonAvatar,
    IonCard,
    IonCardTitle,
    IonCol,
    IonGrid,
    IonIcon,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList,
    IonListHeader,
    IonRow,
    IonText,
    IonTitle,
} from "@ionic/react";
import { trophyOutline } from "ionicons/icons";
import React from "react";
import { useSelector } from "react-redux";
import { API_SERVER } from "../../helpers/api";
import { RootState } from "../../redux/store";
import { Player } from "./Chess";

type Props = {
    winner: Player;
    playerState: Player[];
};

export const GameOver = (props: Props) => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <IonCard className="ion-padding">
            <IonCardTitle className="ion-text-center">
                {props.winner.id === user.id
                    ? "Congratulations!"
                    : "Game is Finished"}
            </IonCardTitle>
            <IonList>
                <IonListHeader>
                    <IonIcon icon={trophyOutline}></IonIcon> Winner
                </IonListHeader>
                <IonItem>
                    <IonAvatar slot="start">
                        <img
                            src={
                                API_SERVER +
                                "/uploads/" +
                                props.winner.profile_picture
                            }
                        />
                    </IonAvatar>
                    <IonLabel>
                        <h2>User: {props.winner.username}</h2>
                        <h3>Coins Earned: {props.winner.coins}</h3>
                    </IonLabel>
                    <IonLabel slot="end" color="primary">
                        # 1
                    </IonLabel>
                </IonItem>
            </IonList>
            <IonListHeader>Ranking</IonListHeader>
            <IonList>
                {props.playerState
                    .filter((player) => player.id !== props.winner.id) //exclude the winner
                    .map((player, index) => {
                        return (
                            <IonItem key={player.id}>
                                <IonAvatar slot="start">
                                    <img
                                        src={
                                            API_SERVER +
                                            "/uploads/" +
                                            player.profile_picture
                                        }
                                    />
                                </IonAvatar>
                                <IonLabel>
                                    <h2>User: {player.username}</h2>
                                    <h3>Coins Earned: {player.coins}</h3>
                                </IonLabel>
                                <IonLabel slot="end" color="primary">
                                    # {index + 2}
                                </IonLabel>
                            </IonItem>
                        );
                    })}
            </IonList>
            {/* <IonGrid>
                <IonRow>
                    <IonCol size="6">
                        <div className="ion-text-center">
                            <div>Winner</div>
                            <IonAvatar>
                                <img
                                    src={
                                        API_SERVER +
                                        "/uploads/" +
                                        props.winner.profile_picture
                                    }
                                />
                            </IonAvatar>
                            <div>user: {props.winner.id}</div>
                            <div>Coins +{props.winner.coins}</div>
                        </div>
                    </IonCol>
                    <IonCol size="6">
                        <div className="ion-text-center">
                            {props.playerState?.map((player, index) => {
                                return (
                                    <div key={index}>
                                        {index + 2}. user id: {player.id} coins:{" "}
                                        {player.coins > 0 ? "+" : null}
                                        {player.coins}
                                    </div>
                                );
                            })}
                        </div>
                    </IonCol>
                </IonRow>
            </IonGrid> */}
        </IonCard>
    );
};

export default GameOver;
