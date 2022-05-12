//not in use
import {
    IonButton,
    IonCol,
    IonGrid,
    IonIcon,
    IonRow,
    useIonModal,
} from "@ionic/react";
import { barbellOutline, cartOutline, diceOutline } from "ionicons/icons";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { API_SERVER } from "../../helpers/api";
import ChessPage from "../../pages/ChessPage";
import SupermarketPage from "../../pages/SupermarketPage";
import { RootState } from "../../redux/store";
import { saveDestination } from "../../redux/user/action";
import { getQuestion } from "../../redux/user/thunk";
import { Answer, Question } from "../Admin/model";
import PopUpQuizModalBody from "../PopUpQuizTest/PopUpQuizModal";
import styles from "./Game.module.scss";

interface Props {}

export default function Game({}: Props): ReactElement {
    const user = useSelector((state: RootState) => state.user);
    const token = useSelector((state: RootState) => state.auth.token);
    const dispatch = useDispatch();

    function activateQuestion(destination: string) {
        if (!user.finished_all_mc) {
            dispatch(getQuestion(token!));
            dispatch(saveDestination(destination));
        } else {
            // console.log("all mc is finished");
        }
    }

    return (
        <div className={styles["outer-container"]}>
            <div>
                <div>Game</div>
            </div>
            <div>
                <div className={styles["user-box"]}>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="4">
                                <div id={styles.profile}>
                                    <img src={user?.profile_picture} />
                                </div>
                            </IonCol>
                            <IonCol size="8" id={styles["info-container"]}>
                                {user ? (
                                    <>
                                        <div>username: {user.username}</div>
                                        <div>user id: {user.id}</div>
                                        <div>score: {user.score}</div>
                                        <div>
                                            glycemic_index:{" "}
                                            {user.glycemic_index}
                                        </div>
                                    </>
                                ) : null}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
                <div id={styles["btn-container"]}>
                    <IonButton routerLink="/Game/SelectMode">
                        <IonIcon ios={diceOutline} />
                        Chess
                    </IonButton>
                    <IonButton
                        onClick={() => activateQuestion("supermarket")}
                        routerLink="/Game/SupermarketPage"
                    >
                        <IonIcon ios={cartOutline} />
                        Supermarket
                    </IonButton>
                    <IonButton
                        routerLink="/Game/GymPage"
                        onClick={() => activateQuestion("gym")}
                    >
                        <IonIcon ios={barbellOutline} />
                        Gym
                    </IonButton>
                </div>
            </div>
        </div>
    );
}
