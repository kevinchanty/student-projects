import { Server as SocketIO, Socket } from "socket.io";
import { nanoid } from "nanoid";
import { Answer, Question } from "../service/model";

export type Player = {
    id: number;
    location: number;
    answering_mc: boolean;
    reward: number;
};

export type SpecialTiles = {
    origin: number;
    destination: number;
    is_reward: boolean;
};

export function gameHandlers(io: SocketIO, socket: Socket) {
    let dummyPlayerList: Player[] = [
        { id: 1, location: 99, answering_mc: false, reward: 0 },
        { id: 2, location: 1, answering_mc: false, reward: 0 },
        { id: 3, location: 1, answering_mc: false, reward: 0 },
        { id: 4, location: 1, answering_mc: false, reward: 0 },
    ];

    let specialTile: SpecialTiles[] = [
        { origin: 6, destination: 20, is_reward: true },
    ];

    let gameQuestion: Question[] = [
        { id: 1, content: "dummy question 1" },
        { id: 2, content: "dummy question 2" },
        { id: 3, content: "dummy question 3" },
    ];

    let gameAnswer: Answer[] = [
        {
            id: 1,
            question_id: 1,
            content: "dummy answer 1 for question 1",
            is_correct: true,
            is_active: true,
        },
        {
            id: 2,
            question_id: 1,
            content: "dummy answer 2 for question 1",
            is_correct: false,
            is_active: true,
        },
        {
            id: 3,
            question_id: 1,
            content: "dummy answer 3 for question 1",
            is_correct: false,
            is_active: true,
        },
        {
            id: 4,
            question_id: 1,
            content: "dummy answer 4 for question 1",
            is_correct: false,
            is_active: true,
        },
        {
            id: 5,
            question_id: 3,
            content: "dummy answer 1 for question 3",
            is_correct: false,
            is_active: true,
        },
        {
            id: 6,
            question_id: 3,
            content: "dummy answer 2 for question 3",
            is_correct: true,
            is_active: true,
        },
        {
            id: 7,
            question_id: 3,
            content: "dummy answer 3 for question 3",
            is_correct: false,
            is_active: true,
        },
        {
            id: 8,
            question_id: 3,
            content: "dummy answer 4 for question 3",
            is_correct: false,
            is_active: true,
        },
        {
            id: 9,
            question_id: 2,
            content: "dummy answer 1 for question 2",
            is_correct: false,
            is_active: true,
        },
        {
            id: 10,
            question_id: 2,
            content: "dummy answer 2 for question 2",
            is_correct: false,
            is_active: true,
        },
        {
            id: 11,
            question_id: 2,
            content: "dummy answer 3 for question 2",
            is_correct: false,
            is_active: true,
        },
        {
            id: 12,
            question_id: 2,
            content: "dummy answer 4 for question 2",
            is_correct: true,
            is_active: true,
        },
    ];

    function onGameConnect() {
        console.log("we have contact");
        socket.emit("getMessage", "connection established");
        socket.emit("getLocation", dummyPlayerList);
    }

    let turn: number = 0;
    let winner;
    function onDice(result: number) {
        winner = checkWinner();
        if (winner) {
            gameOver(winner as number);
        }
        let activePlayer: number = turn % dummyPlayerList.length;
        let playerInMove = dummyPlayerList[activePlayer];
        let destination = dummyPlayerList[activePlayer].location + result;

        //check special tiles
        specialTile.map((tile) => {
            if (tile.origin === destination) {
                playerInMove.location += result;
                handleSpecialTile(activePlayer, tile);
                return;
            } else {
                //check winner
                if (destination > 100 /*hard code */) {
                    playerInMove.location = 100;
                } else {
                    playerInMove.location += result;
                }
            }
        });
        socket.emit("movePlayer", dummyPlayerList);
        turn++;

        winner = checkWinner();
        if (winner) {
            gameOver(winner as number);
        }
    }

    // pop up quiz
    function handleSpecialTile(playerInMove: number, tile: SpecialTiles) {
        let questionId = pickQuestion();
        let answerList = getAnswer(questionId);
        let quiz = {
            answerer: playerInMove,
            tile,
            quiz: { question: gameQuestion[questionId], answers: answerList },
        };
        console.log(quiz);
        socket.emit("question", quiz);
    }

    function pickQuestion() {
        let index = Math.floor(Math.random() * (gameQuestion.length - 1));
        return gameQuestion[index].id;
    }

    function getAnswer(questionId: number) {
        return gameAnswer.filter((answer) => answer.question_id === questionId);
    }

    function gameOver(winner: number) {
        sortPlayerList();
        socket.emit("game over", {
            id: winner,
            location: 100,
            answering_mc: false,
            reward: 11,
        });
    }

    function checkWinner() {
        for (let player of dummyPlayerList) {
            if (player.location === 100 /* hard code goal */) {
                console.log("we have a winner, the winner is: ", player.id);
                return player.id;
            } else {
                continue;
            }
        }
        return false;
    }

    function createGame(userId: string) {
        const room = nanoid();
        socket.join(room);
        io.sockets
            .in(room)
            .emit("getMessage", `user ${userId} joined Room ${room}`);
        io.sockets.in(room).emit("new room", room);
    }

    function joinGame(room: string, userId: string) {
        if (room) {
            socket.join(room);
            io.sockets
                .in(room)
                .emit("getMessage", `user ${userId} joined Room ${room}`);
        }
    }

    function sortPlayerList() {
        const myList = [...dummyPlayerList];
        myList.sort((a, b) => {
            if (a.location < b.location) {
                return 1;
            } else if (a.location > b.location) {
                return -1;
            }
            return 0;
        });
        let losers = myList.slice(1);
        let rewards = [8, 1, -5];
        for (let i = 0; i < losers.length; i++) {
            losers[i].reward = rewards[i];
        }
        socket.emit("ranking", losers);
        console.log(losers);
    }

    function onDisconnect(reason: string) {
        console.log(socket.id, " Disconnect, Reasons: ", reason);
        socket.disconnect();
    }

    // onGameConnect();
    // socket.on("createGame", (id) => createGame(id));
    // socket.on("joinGame", (room, userId) => joinGame(room, userId));
    // socket.on("disconnect", onDisconnect);
    // socket.on("dice", onDice);
    // socket.on("testing", (message) => {
    //     console.log(message);
    // });

    // socket.on("enterLobby", (user) => {
    //     console.log(user.username + " has enter the lobby");
    //     socket.join("/game/lobby");
    // });
}
