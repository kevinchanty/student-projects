import { IonButton, IonHeader, IonInput, IonText } from "@ionic/react";
import { io, Socket } from "socket.io-client";
import React, { ReactElement, useEffect, useState } from "react";

interface Props {}

export default function WebSocketPlayground({}: Props): ReactElement {
    const [socket, setSocket] = useState<Socket>();
    const [displayText, setDisplayText] = useState("Init");
    const [room, setRoom] = useState("");

    function connectWebSocket() {
        setSocket(io("http://localhost:3100"));
    }

    function initWebSocket() {
        socket?.on("getMessage", (message) => {
            setDisplayText(message);
        });
    }

    function onJoin() {
        socket?.emit("joinGame", room);
    }

    function onCreate() {
        socket?.emit("createGame");
    }

    function dice() {
        let result = Math.floor(Math.random() * 6);
        socket?.emit("dice", result);
    }

    useEffect(() => {
        if (socket) {
            initWebSocket();
        }
    }, [socket]);

    useEffect(() => {
        connectWebSocket();
        return function cleanup() {
            socket?.emit("disconnect", "React Clean Up");
        };
    }, []);

    const myHeaders = new Headers();
    myHeaders.append("kker", "kkwer");

    return (
        <div className="ion-text-center">
            <IonText>{displayText}</IonText>
            <form>
                <IonInput
                    type="text"
                    value={room}
                    placeholder="Join Room"
                    onIonChange={(e) => setRoom(e.detail.value!)}
                />
                <IonButton onClick={onJoin}>Join</IonButton>
                <IonButton onClick={onCreate}>Create Game</IonButton>
                <IonButton onClick={dice}>Dice</IonButton>
            </form>
        </div>
    );
}
