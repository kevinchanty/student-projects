import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCol,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonRow,
    IonText,
    useIonRouter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_SERVER } from "../../helpers/api";
import { RootState } from "../../redux/store";
import { socket } from "../Context/socket";

type Room = {
    id: number;
    name: string;
    userList: User[];
};

type User = {
    id: number;
    username: string;
    profile_picture: string;
};

export default function GameLobby() {
    const [newRoom, setNewRoom] = useState("");
    const [roomList, setRoomList] = useState<Room[]>();
    const [inRoom, setInRoom] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const token = localStorage.getItem("token");
    const router = useIonRouter();

    const hasJoin: boolean = !!roomList?.find((room) =>
        room.userList.find((player) => player.id === user.id)
    );

    useEffect(() => {
        getRoomList();
        checkInRoom();
        socket.emit("enterLobby", user);

        const roomUpdate: (...args: any[]) => void = (roomList) => {
            let newRoomList = roomList;
            setRoomList(newRoomList);
        };
        socket.on("roomUpdate", roomUpdate);
    
        const gameStart: (...args: any[]) => void = (roomId) => {
            router.push("/game/room/" + roomId);
        };
        // socket.on("joinRoom", (message) => {
        // });
    
        socket.on("gameStart", gameStart);

        return () => {
            socket.off("roomUpdate", roomUpdate)
            socket.off("gameStart", gameStart)
        }
    }, []);

    async function getRoomList() {
        let res = await fetch(`${API_SERVER}/game/room`);
        let rooms = await res.json();
        setRoomList(rooms);
    }

    async function checkInRoom() {
        let res = await fetch(`${API_SERVER}/game/inRoom`, {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        });
        let roomList = await res.json();
        if (roomList.length !== 0) {

            setInRoom(true);
        } else {
            setInRoom(false);
        }
    }

    async function createRoom() {
        let res = await fetch(`${API_SERVER}/game/room`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newRoom }),
        });
        let roomId = await res.json();
        socket.emit("joinRoom", roomId, user);
        setNewRoom("");
        setInRoom(true);
    }

    async function joinRoom(roomId: number) {
        socket.emit("joinRoom", roomId, user);
        await fetch(`${API_SERVER}/game/join`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ roomId }),
        });

        setInRoom(true);
    }

    async function leaveRoom(roomId: number) {
        await fetch(`${API_SERVER}/game/leave/${roomId}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        setInRoom(false);
    }

    return (
        <>
            <IonList>
                <IonListHeader>Create New Room</IonListHeader>
                <IonItem>
                    <IonLabel color="primary" position="floating">
                        Room Name
                    </IonLabel>
                    <IonInput
                        value={newRoom}
                        onIonChange={(e) => setNewRoom(e.detail.value || "")}
                    ></IonInput>
                    <IonButton
                        size="default"
                        slot="end"
                        fill="outline"
                        onClick={() => createRoom()}
                        disabled={inRoom}
                    >
                        Create
                    </IonButton>
                </IonItem>
            </IonList>

            <IonList>
                <IonListHeader>Join Game Room</IonListHeader>
                {roomList?.map((room) => {
                    let isInRoom = room.userList.find((player) => {
                        return player.id === user.id;
                    });
                    let numberOfPlayer = room.userList.length;
                    let roomFull = numberOfPlayer >= 2;
                    return (
                        <IonCard key={room.id}>
                            <IonCardHeader>
                                <IonRow>
                                    <IonCol size="9">
                                        <IonText color="primary">
                                            #{room.id} - {room.name}
                                        </IonText>
                                    </IonCol>
                                    <IonCol>
                                        <IonButtons>
                                            {/* not in any room */}
                                            {!inRoom ? (
                                                !roomFull ? (
                                                    <IonButton
                                                        onClick={() =>
                                                            joinRoom(room.id)
                                                        }
                                                    >
                                                        JOIN
                                                    </IonButton>
                                                ) : null
                                            ) : isInRoom ? (
                                                <IonButton
                                                    onClick={() =>
                                                        leaveRoom(room.id)
                                                    }
                                                >
                                                    QUIT
                                                </IonButton>
                                            ) : null}
                                        </IonButtons>
                                    </IonCol>
                                </IonRow>
                            </IonCardHeader>
                            <IonCardContent>
                                <div
                                    style={{
                                        display: "flex",
                                    }}
                                >
                                    {room.userList.map((player, i) => (
                                        <div
                                            key={i}
                                            className="ion-text-center"
                                            style={{ margin: "0 0.5em" }}
                                        >
                                            <IonAvatar>
                                                <img
                                                    src={
                                                        API_SERVER +
                                                        "/uploads/" +
                                                        player.profile_picture
                                                    }
                                                />
                                            </IonAvatar>
                                            <IonText
                                                color={
                                                    player.id === user.id
                                                        ? "primary"
                                                        : ""
                                                }
                                            >
                                                {player.username}
                                            </IonText>
                                        </div>
                                    ))}
                                </div>
                            </IonCardContent>
                        </IonCard>
                    );
                })}
            </IonList>
        </>
    );
}
