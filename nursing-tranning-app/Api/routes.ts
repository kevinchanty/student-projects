import express from "express";
import {
    photoFeedController,
    manageQuizController,
    popUpQuizController,
    userController,
    gymController,
    supermarketController,
    guardMiddleware,
    myBagController,
    upload,
    gameController,
    analyticsController,
} from "./index";

export const routes = express.Router();

// admin
routes.get("/admin/questions", manageQuizController.getQuestions);
routes.get("/admin/answers/:id", manageQuizController.getAnswers);
routes.delete("/admin/deleteQuestion/:id", manageQuizController.deleteQuestion);
routes.post("/admin/question", manageQuizController.postQuestion);
routes.put("/admin/updateQuestion", manageQuizController.updateQuestion); //TODO: patch
routes.get("/admin/question/:questionId", manageQuizController.manageQuestion)

// pop up quiz
routes.get(
    "/popUpQuiz/questions",
    guardMiddleware.getUserInfo,
    popUpQuizController.getQuestions
);
routes.get("/popUpQuiz/answers/:id", popUpQuizController.getAnswers);
routes.post(
    "/popUpQuiz/answer",
    guardMiddleware.getUserInfo,
    popUpQuizController.submitAnswer
);
routes.get('/popUpQuiz/finished', guardMiddleware.getUserInfo, popUpQuizController.finishedAllQuestions)

// photo feed
routes.get(
    "/post/quota",
    guardMiddleware.getUserInfo,
    photoFeedController.getPostQuota
);
routes.get(
    "/photoFeed",
    guardMiddleware.getUserInfo,
    photoFeedController.getPhotoFeed
);
routes.get("/post/profile", guardMiddleware.getUserInfo, photoFeedController.getProfile)
routes.post("/post",guardMiddleware.getUserInfo,upload.array('images'),photoFeedController.addPost);
routes.post("/rating",guardMiddleware.getUserInfo,photoFeedController.postRating);

// user
routes.post("/user/SignUp",upload.single('images'), userController.postNewUser);
routes.get("/user/activation/:passcode", userController.activateUser);
routes.get("/user/sendLink", userController.sendLoginEmail);
routes.get("/user/login/:passcode", userController.logInWithLink);
routes.get(
    "/user/info",
    guardMiddleware.getUserInfo,
    userController.getUserInfo
);
routes.get("/user/profile/:userId", userController.getUserProfile);

// GET  /stock/:type       || GET /stock/gym    GET /stock/supermarket
// POST /stock/:id 

// gym
routes.get("/gym/StockItems", gymController.getStockItems);
routes.post("/gym/PurchaseItems/:item_id", guardMiddleware.getUserInfo, gymController.postPurchaseItems);

// supermarket
routes.get("/SupermarketPage/StockItems", supermarketController.getStockItems);
routes.post("/SupermarketPage/PurchaseItems/:item_id", guardMiddleware.getUserInfo, supermarketController.postPurchaseItems);

// my bag history
routes.get("/MyBag/PurchasedItems/Supermarket", guardMiddleware.getUserInfo, myBagController.getSupermarketPurchased);
routes.get("/MyBag/PurchasedItems/Gym", guardMiddleware.getUserInfo, myBagController.getGymPurchased);

// game lobby
routes.get('/game/room', gameController.getRoom)
routes.get('/game/inRoom', guardMiddleware.getUserInfo, gameController.checkInRoom)
routes.post('/game/room', guardMiddleware.getUserInfo, gameController.createRoom)
routes.post('/game/join', guardMiddleware.getUserInfo, gameController.joinRoom)
routes.delete('/game/leave/:roomId', guardMiddleware.getUserInfo, gameController.leaveRoom)

// //game
routes.get('/game/room/:roomId', guardMiddleware.getUserInfo, gameController.initiateGame)
routes.post('/game/dice/:roomId', guardMiddleware.getUserInfo, gameController.onDice)
routes.post('/game/answer/:roomId', guardMiddleware.getUserInfo, gameController.answerQuestion)

// analytics
routes.get('/analytics/newUser',guardMiddleware.getUserInfo, analyticsController.getNewUser)
routes.get('/analytics/barChart/:type',guardMiddleware.getUserInfo, analyticsController.getBarChart)
routes.get('/analytics/UserByName',guardMiddleware.getUserInfo, analyticsController.getUserByName)
routes.get('/analytics/UserStats/:userId',guardMiddleware.getUserInfo, analyticsController.getUserStats)