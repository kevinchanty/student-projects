import { Request, Response } from "express";
import jwtDecode from "jwt-decode";
import { Server, Socket } from "socket.io";
import { GameService } from "../service/gameService";
import { UserService } from "../service/userService";
import { ExpressController } from "./express-contoller";

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

type Player = {
    location: number;
    coins: number;
    answering_mc: boolean;
    id: number;
    username: string;
    profile_picture: string;
};

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
    id: number;
    origin: number;
    destination: number;
    reward: number;
    is_reward: boolean;
};

export class GameController extends ExpressController {
    constructor(private game: GameService, private io: Server) {
        super();
        this.io.on("connection", (socket) => {
            socket.on("enterLobby", (user) => {
                socket.join("/game/lobby");
                console.log(user.username + " has entered the lobby");
            });
            socket.on("joinRoom", (roomId, user) => {
                console.log(`${user.username} has entered room ${roomId}`);
                socket.join(`/game/${roomId}`);
                socket
                    .to(`/game/${roomId}`)
                    .emit("joinRoom", `${user.username} has joined ${roomId}`);
            });
            socket.on("/game/leave", () => {
                socket.leave("/game/room");
            });
        });
    }

    getRoom = async (req: Request, res: Response) => {
        try {
            let roomList = await this.game.getRoomList();
            res.status(200).json(roomList);
            return;
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "internal server error" });
            return;
        }
    };

    createRoom = async (req: Request, res: Response) => {
        let user = req.user;
        let { newRoom } = req.body;

        let newRoomId;

        try {
            // create room in DB
            newRoomId = await this.game.createRoom(newRoom);

            // inserting into DB to join room
            await this.game.joinRoom(user.id, newRoomId);

            //get updated room list
            let roomList = await this.game.getRoomList();
            this.io.to("/game/lobby").emit("roomUpdate", roomList);

            // check if number of player is enough in the room
            let isReady = await this.game.checkPlayer(newRoomId);
            if (isReady) {
                this.io.to(`/game/${newRoomId}`).emit("gameStart", newRoomId);
            }

            res.status(200).json(newRoomId);
            return;
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "internal server error" });
            return;
        }
    };

    joinRoom = async (req: Request, res: Response) => {
        let user = req.user;

        let { roomId } = req.body;
        try {
            //inserting sql to join room
            await this.game.joinRoom(user.id, roomId);

            // getting the updated list
            let roomList: Room[] = await this.game.getRoomList();
            this.io.to("/game/lobby").emit("roomUpdate", roomList);

            // check if number of player is enough in the room
            let isReady = await this.game.checkPlayer(roomId);
            if (isReady) {
                this.io.to(`/game/${roomId}`).emit("gameStart", roomId);
            }

            //response
            res.status(200).json({ message: "join room success" });
            return;
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "internal server error" });
        }
    };

    leaveRoom = async (req: Request, res: Response) => {
        let user = req.user;

        let userId = user.id;
        let roomId = parseInt(req.params.roomId);
        let row = { user_id: userId, game_room_id: roomId };
        try {
            await this.game.leaveRoom(row);
            let roomList = await this.game.getRoomList();
            this.io.to("/game/lobby").emit("roomUpdate", roomList);
            res.status(200).json({
                message: user.username + " leaved room #" + roomId,
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "internal server error" });
            return;
        }
    };

    checkInRoom = async (req: Request, res: Response) => {
        let user = req.user;
        console.log(user);

        try {
            let roomList = await this.game.checkInRoom(user.id);
            res.status(200).json(roomList);
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "internal server error" });
        }
    };

    async setActivePlayer(roomId: number, playerList: Player[]) {
        let increaseTurn = await this.game.changeTurn(roomId);
        let turn = increaseTurn[0];
        console.log(turn);

        return playerList[turn % playerList.length];
    }

    updateLocation(roomId: number, playerList: Player[], activePlayer: Player) {
        this.io
            .to(`/game/${roomId}`)
            .emit("updateGame", playerList, activePlayer);
    }

    initiateGame = async (req: Request, res: Response) => {
        let roomId = parseInt(req.params.roomId);

        try {
            let gameRecords = await this.game.getGameRecords(roomId);
            let playerList = await this.game.getPlayerList(roomId);

            if (gameRecords.length === 0) {
                // assign new location if there is no game record
                playerList.map((player) => {
                    (player.location = 1),
                        (player.answering_mc = false),
                        (player.coins = 0);
                    player.answering_mc = false;
                });

                // set active player
                let activePlayer = playerList[0];
                console.log(activePlayer);

                // emit new location to all users in the same room
                this.updateLocation(roomId, playerList, activePlayer);
                res.status(200).json({ playerList, activePlayer });
                return;
            } else {
                // getting the most updated records according to the number of player
                let newGameRecords: Player[] = [];

                for (let player of playerList) {
                    let record = await this.game.getGameRecord(
                        player.id,
                        roomId
                    );
                    if (record) {
                        newGameRecords.push(record);
                    } else {
                        newGameRecords.push({
                            location: 1,
                            coins: 0,
                            username: player.username,
                            profile_picture: player.profile_picture,
                            id: player.id,
                            answering_mc: false,
                        });
                    }
                }
                playerList = newGameRecords;

                // getting the turn number of the game
                let turnList = await this.game.getTurn(roomId);
                let { turn } = turnList[0];
                let activePlayer = playerList[turn % playerList.length];

                // update location
                this.updateLocation(roomId, playerList, activePlayer);
                res.status(200).json({ playerList, activePlayer });
                return;
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "unable to get players" });
            return;
        }
    };

    onDice = async (req: Request, res: Response) => {
        let user = req.user;
        let roomId = parseInt(req.params.roomId);
        let { playerState, step } = req.body;
        let goal = 90;

        for (let player of playerState) {
            if (player.id === user.id) {
                let destination = player.location + step;
                if (destination >= goal) {
                    // the player has won
                    player.location = 100;
                    player.coins += step;

                    // update the location
                    this.updateLocation(roomId, playerState, player);

                    // sort the ranking
                    const myList = [...playerState];
                    myList.sort((a, b) => {
                        if (a.location < b.location) {
                            return 1;
                        } else if (a.location > b.location) {
                            return -1;
                        }
                        return 0;
                    });

                    let losers = myList.slice(1);
                    let winner = myList[0];

                    // record the win and coins
                    await this.game.gameOver(winner, playerState);

                    // emit the result
                    this.io
                        .to(`/game/${roomId}`)
                        .emit("gameOver", winner, losers);

                    res.status(200).json({ message: "game over" });
                    return;
                } else {
                    // update the player location
                    player.location += step;
                    player.coins += step;
                }

                try {
                    // insert  game record
                    await this.game.insertGameRecord({
                        user_id: player.id,
                        game_room_id: roomId,
                        location: player.location,
                        coins: player.coins,
                        answering_mc: false,
                    });

                    // getting all the location of the special tiles
                    let specialTilesList =
                        await this.game.getSpecialTilesList();
                    let tileList = specialTilesList.map((tile) => {
                        return tile.origin;
                    });

                    // check if the destination is a special tile
                    if (tileList.includes(player.location)) {
                        let tile = await this.game.getSpecialTile(
                            player.location
                        );
                        //getting the questions
                        let questions = await this.game.getQuestions();

                        //pick a random question
                        let question: Question =
                            questions[
                                Math.floor(
                                    Math.random() * (questions.length - 1)
                                )
                            ];

                        //getting the corresponding answers
                        let answers: Answer[] = await this.game.getAnswers(
                            question.id
                        );

                        let quiz = {
                            question,
                            answers,
                        };

                        // emit to update player location
                        this.updateLocation(roomId, playerState, player);

                        // emit result
                        this.io
                            .to(`/game/${roomId}`)
                            .emit("diceResult", step, player);

                        // emit question set to players
                        this.io
                            .to(`/game/${roomId}`)
                            .emit("question", tile, quiz, player);
                        return;
                    } else {
                        //change turn
                        let activePlayer = await this.setActivePlayer(
                            roomId,
                            playerState
                        );

                        // emit to update player location
                        this.updateLocation(roomId, playerState, activePlayer);

                        res.status(200).json({
                            message: "movement completed",
                        });
                        return;
                    }
                } catch (e) {
                    console.log(e);
                    res.status(500).json({ message: "internal server error" });
                    return;
                }
            }
        }
    };

    // answering pop up quiz
    answerQuestion = async (req: Request, res: Response) => {
        const user = req.user;
        const roomId = parseInt(req.params.roomId);
        const { playerState, question, answer } = req.body;

        try {
            // insert the record
            let tile: Tile = {
                id: 0,
                origin: 0,
                destination: 0,
                reward: 0,
                is_reward: false,
            };

            for (let player of playerState) {
                if (player.id === user.id) {
                    // getting the tile information
                    tile = await this.game.getSpecialTile(player.location);

                    // insert the question record
                    let questionRecord = {
                        user_id: user.id,
                        question_id: question.id,
                        answer_id: answer.id,
                        game_room_id: roomId,
                        special_tile_id: tile.id,
                    };
                    await this.game.submitAnswer(questionRecord);
                    // console.log(player);

                    console.log(tile);

                    //check if the tile is reward or punishment
                    if (tile.is_reward) {
                        //reward
                        if (answer.is_correct) {
                            player.location = tile.destination;
                            player.coins += tile.reward;
                        }
                    } else {
                        if (!answer.is_correct) {
                            player.location = tile.destination;
                            let coin = player.coins + tile.reward;
                            if (coin <= 0) {
                                player.coins = 0;
                            }
                        }
                    }
                    // dismissing the question
                    this.io
                        .to(`/game/${roomId}`)
                        .emit("answer", player, answer);
                }
            }

            // change turn
            let activePlayer = await this.setActivePlayer(roomId, playerState);

            // emit to update player location
            this.updateLocation(roomId, playerState, activePlayer);

            res.status(200).json({
                message: "movement completed",
            });
            return;
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "internal server error" });
            return;
        }
    };
}
