import {
    IonAvatar,
    IonButton,
    IonCol,
    IonContent,
    IonFab,
    IonIcon,
    IonLabel,
    IonPopover,
    IonRow,
} from "@ionic/react";
import {
    arrowBack,
    arrowDown,
    arrowForward,
    arrowUp,
    arrowUpSharp,
} from "ionicons/icons";
import React, { useState } from "react";
import { Player, Quiz } from "./Chess";
import styles from "./Chess.module.scss";
import Dice from "react-dice-roll";
import GameQuiz from "./GameQuestion";
import chessBoard from "../../assets/img/4462656-01.png";
import { API_SERVER } from "../../helpers/api";

type Props = {
    diceResult?: number | undefined;
    turn: number;
    quiz: Quiz | null;
    playerState: Player[];
    board: number[];
    X: number;
    offsetX: number;
    offsetY: number;
    size: number;
    isActive: boolean;
    isFinished: boolean;
    setOffsetY: React.Dispatch<React.SetStateAction<number>>;
    setOffsetX: React.Dispatch<React.SetStateAction<number>>;
    setSize: React.Dispatch<React.SetStateAction<number>>;
    rollDice: (value: number) => void;
    // submitAnswer: (is_correct: boolean) => void;
};

export const Board = (props: Props) => {
    const [popoverState, setShowPopover] = useState<{
        showPopover: boolean;
        event: Event | undefined;
        player: Player | null;
    }>({
        showPopover: false,
        event: undefined,
        player: null,
    });

    let scale = "scale(" + props.size * 0.1 + ")";

    return (
        <div>
            <div className={styles.board}>
                <img
                    src={chessBoard}
                    style={{
                        transform: scale,
                        transformOrigin: "top left",
                    }}
                />
                {props.board.map((box, index) => {
                    let x = index % props.X;
                    let y = (index - x) / props.X;
                    x += props.offsetX;
                    y += props.offsetY;
                    return (
                        <div
                            key={index}
                            className={styles.tile}
                            style={{
                                width: props.size + "vw",
                                height: props.size + "vw",
                                top: y * props.size + "vw",
                                left: x * props.size + "vw",
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "space-evenly",
                            }}
                        >
                            {/* <div> */}
                            {props.playerState?.map((player, index) =>
                                player.location === box ? (
                                    <div
                                        style={{
                                            width: "50%",
                                        }}
                                        key={index}
                                    >
                                        <IonAvatar
                                            key={index}
                                            id={player.id + ""}
                                            onClick={(e: any) => {
                                                e.persist();
                                                setShowPopover({
                                                    showPopover: true,
                                                    event: e,
                                                    player: player,
                                                });
                                            }}
                                            style={{
                                                width: props.size * 0.3 + "vw",
                                                height: props.size * 0.3 + "vw",
                                                top:
                                                    y * props.size * 0.3 + "vw",
                                                left:
                                                    x * props.size * 0.3 + "vw",
                                            }}
                                        >
                                            <img
                                                src={
                                                    API_SERVER +
                                                    "/uploads/" +
                                                    player.profile_picture
                                                }
                                            />
                                        </IonAvatar>
                                        <IonPopover
                                            cssClass="my-custom-class"
                                            event={popoverState.event}
                                            isOpen={popoverState.showPopover}
                                            backdropDismiss={true}
                                            onDidDismiss={() =>
                                                setShowPopover({
                                                    showPopover: false,
                                                    event: undefined,
                                                    player: null,
                                                })
                                            }
                                        >
                                            <p
                                                className="ion-text-center"
                                                style={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {popoverState.player?.username}
                                            </p>
                                            <p className="ion-text-center">
                                                coins:{" "}
                                                {popoverState.player?.coins}
                                            </p>
                                        </IonPopover>
                                    </div>
                                ) : null
                            )}
                            {/* </div> */}
                        </div>
                    );
                })}
            </div>
            <div className={styles.controller}>
                <Dice
                    disabled={
                        props.isFinished ? true : props.isActive ? false : true
                    }
                    cheatValue={2}
                    onRoll={(value) => props.rollDice(value)}
                    size={50}
                />
            </div>
        </div>
    );
};

export default Board;
