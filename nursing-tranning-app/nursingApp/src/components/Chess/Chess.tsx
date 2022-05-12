import React, { ReactElement, useEffect, useState } from "react";
import { Board } from "./Board";
import { GameOver } from "./GameOver";
import { socket } from "../Context/socket";
import { useParams } from "react-router-dom";
import { API_SERVER } from "../../helpers/api";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import GameQuestion from "./GameQuestion";
import {
    IonAvatar,
    IonContent,
    IonFab,
    IonIcon,
    IonRange,
    IonText,
    useIonRouter,
    useIonToast,
} from "@ionic/react";
import styles from "./Chess.module.scss";
import { arrowDown, locationOutline, walletOutline } from "ionicons/icons";
import chessBoard from "../../assets/img/4462656-01.png";

export type GameState = {
    playerList: Player[];
    activePlayerId: number;
};

export type Player = {
    id: number;
    location: number;
    answering_mc: boolean;
    coins: number;
    profile_picture: string;
    username: string;
};

let X = 10;
let Y = 10;
let N = X * Y;

export type Question = {
    id: number;
    content: string;
    pool: string | null;
};

export type Answer = {
    id: number;
    question_id: number;
    content: string;
    is_correct: boolean;
    is_active: boolean;
};

export type Quiz = {
    question: Question;
    answers: Answer[];
};

export type Tile = {
    origin: number;
    destination: number;
    reward: number;
    is_reward: boolean;
};

export default function Chess(): ReactElement {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [board, setBoard] = useState<number[]>([]);
    const [size, setSize] = useState(30);
    const [sizeRange, setSizeRange] = useState<{
        lower: number;
        upper: number;
    }>({ lower: 10, upper: 100 });
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [diceResult, setDiceResult] = useState<number>();
    const [playerState, setPlayerState] = useState<Array<Player>>();
    const [turn, setTurn] = useState<number>(1);
    const [winner, setWinner] = useState<Player>();
    const [specialTile, setSpecialTile] = useState<Tile>();
    const user = useSelector((state: RootState) => state.user);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [answerer, setAnswerer] = useState<Player>();
    const [isFinished, setIsFinished] = useState(false);
    const [present, dismiss] = useIonToast();
    const [activePlayer, setActivePlayer] = useState<Player>();
    const router = useIonRouter();
    const [popoverState, setShowPopover] = useState({
        showPopover: false,
        event: undefined,
    });

    const token = localStorage.getItem("token");

    let { roomId } = useParams<{ roomId: string }>();

    useEffect(() => {
        createBoard();
        initiateGame(parseInt(roomId));
        socket.emit("joinRoom", roomId, token);
    }, []);

    async function initiateGame(roomId: number) {
        let res = await fetch(`${API_SERVER}/game/room/${roomId}`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        });

        let { playerList, activePlayer } = await res.json();

        setPlayerState(playerList);
        setActivePlayer(activePlayer);
    }

    async function rollDice(value: number) {
        await fetch(`${API_SERVER}/game/dice/${roomId}`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ playerState, step: value }),
        });
    }

    socket.on("updateGame", (playerState, activePlayer) => {
        // getting the updated location from the server and set to the player state
        setPlayerState(playerState);
        setActivePlayer(activePlayer);

        // check if the current client is the one on move
        if (activePlayer.id === user.id) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    });

    socket.on("diceResult", (result, player) => {

        present({
            message:
                (player.id === user.id ? "You" : player.username) +
                " rolled " +
                result,
            duration: 2 * 1000,
            position: "bottom",
        });
    });

    socket?.on("gameOver", (winner, losers) => {
        setWinner(winner);
        setPlayerState(losers);
        setIsFinished(true);
    });
    socket?.on("question", (tile, question, player) => {
        setAnswerer(player);
        setSpecialTile(tile);
        setQuiz(question);
    });
    socket?.on("answer", (player, answer) => {
        present({
            message:
                (player.id === user.id ? "Your" : player.username + "'s") +
                " answer is " +
                (answer.is_correct ? "correct" : "incorrect"),
            duration: 2 * 1000,
            position: "bottom",
        });
        setQuiz(null);
    });

    function createBoard() {
        let tileArray: Array<number> = [];
        let index = N;
        for (let line = 0; line < Y; line++) {
            let buffer = [];
            for (let i = 0; i < X; i++) {
                buffer.push(index);
                index--;
            }
            if (line % 2 == 1) {
                buffer.reverse();
            }
            tileArray.push(...buffer);
        }
        setBoard(tileArray);
    }

    async function submitAnswer(question: Question, answer: Answer) {
        await fetch(`${API_SERVER}/game/answer/${roomId}`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ playerState, question, answer }),
        });
        return;
    }

    // when nav to the player the buttons will be out of screen
    function navTo(playerId: string) {
        const location = document.getElementById(playerId + "");
        location?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
        return;
    }

    return (
        <IonContent>
            {isFinished ? (
                <GameOver winner={winner!} playerState={playerState!} />
            ) : (
                <>
                    <div className={styles["board-container"]}>
                        <Board
                            diceResult={diceResult!}
                            turn={turn}
                            quiz={quiz}
                            playerState={playerState!}
                            board={board}
                            X={X}
                            offsetX={offsetX}
                            offsetY={offsetY}
                            size={size}
                            setOffsetY={setOffsetY}
                            setOffsetX={setOffsetX}
                            setSize={setSize}
                            rollDice={rollDice}
                            isActive={isActive}
                            isFinished={isFinished}
                        />
                    </div>

                    <div className={styles.chessFab}>
                        <IonFab
                            horizontal="start"
                            vertical="bottom"
                            className={styles.sequenceContainer}
                        >
                            {playerState?.map((player, i) => {
                                return (
                                    <div key={i}>
                                        {activePlayer?.id === player.id ? (
                                            <div className="ion-text-center">
                                                <IonIcon
                                                    icon={arrowDown}
                                                    color="primary"
                                                ></IonIcon>
                                            </div>
                                        ) : null}
                                        <IonAvatar
                                            onClick={() =>
                                                navTo(player.id + "")
                                            }
                                        >
                                            <img
                                                src={
                                                    API_SERVER +
                                                    "/uploads/" +
                                                    player.profile_picture
                                                }
                                            />
                                        </IonAvatar>
                                    </div>
                                );
                            })}
                        </IonFab>
                    </div>
                    <div className={styles.roomInfo}>
                        <IonText color="primary">
                            <span className={styles.roomNum}>
                                <b>Room: {roomId}</b>
                            </span>
                        </IonText>
                        <div>
                            {playerState?.map((player, i) => {
                                return player.id === user.id ? (
                                    <div key={i}>
                                        <div
                                            className={styles.infoMarginBetween}
                                        >
                                            <IonIcon
                                                color="primary"
                                                icon={walletOutline}
                                            />
                                            <IonText color="primary">
                                                Coins: {player.coins}
                                            </IonText>
                                        </div>
                                        <div
                                            className={styles.infoMarginBetween}
                                        >
                                            <IonIcon
                                                color="primary"
                                                icon={locationOutline}
                                            />
                                            <IonText color="primary">
                                                Location: {player.location}
                                            </IonText>
                                        </div>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>
                    <div className={styles["slider-container"]}>
                        <IonRange
                            value={size}
                            min={sizeRange.lower}
                            max={sizeRange.upper}
                            onIonChange={(e) =>
                                setSize(e.detail.value as number)
                            }
                        ></IonRange>
                    </div>
                    {quiz ? (
                        <GameQuestion
                            quiz={quiz}
                            isActive={isActive}
                            answerer={answerer!}
                            tile={specialTile!}
                            submitAnswer={submitAnswer}
                        />
                    ) : null}
                </>
            )}
        </IonContent>
    );
}
