import { Stock } from "../../components/Supermarket/Supermarket";
import { showToast } from "stencil-lib/components/ion-toast";
import { loginFailed } from "../auth/action";
import { RootDispatch, RootState } from "../store";
import { API_SERVER, get, post } from "../../helpers/api";
import {
    loggingIn,
    purchase,
    saveDestination,
    setActiveQuestion,
} from "./action";
import { PopUpQuestion, UserState } from "./state";

export function getUserInfo() {
    return async (dispatch: RootDispatch, getState: () => RootState) => {
        let token = getState().auth.token;
        if (!token) {
            return;
        }

        try {
            let json = await get("/user/info");
            let userInfo: UserState = json.userInfo;
            dispatch(loggingIn(userInfo));
        } catch (e) {
            dispatch(loginFailed("please activate account first"));
        }
    };
}

export function confirmSupermarketThunk(user: any, currentStock: Stock) {
    return async (dispatch: RootDispatch) => {
        if (user && user.score) {
            if (user.score < currentStock.price) {
                alert("Not enough coins!!");
                return;
            }
        }

        let token = localStorage.getItem("token");
        let userResult = await fetch(
            `${API_SERVER}/SupermarketPage/PurchaseItems/${currentStock.id}`,
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
        let result: any = await userResult.json();

        if (!result.error) {
            showToast({
                message: `Successful added ${currentStock.item_name} in your bag.`,
                duration: 3500,
            });
            dispatch(purchase(result));
        } else {
            showToast({
                message: result.error,
                duration: 3500,
            });
        };
    }

}

export function confirmGymThunk(user: any, currentStock: Stock) {
    return async (dispatch: RootDispatch) => {
        if (user && user.score) {
            if (user.glycemic_index < currentStock.glycemic_index) {
                alert("Not enough glycemic index!!");
                return;
            }
        }

        let token = localStorage.getItem("token");
        let userResult = await fetch(
            `${API_SERVER}/gym/PurchaseItems/${currentStock.id}`,
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
        let result: any = await userResult.json();

        if (!result.error) {
            showToast({
                message: `Successful finished the sport event ${currentStock.item_name}.`,
                duration: 3500,
            });
            dispatch(purchase(result));
        } else {
            showToast({
                message: result.error,
                duration: 3500,
            });
        }

    };
}

// only being called when the 'finished_all_mc' in user state is false
export function getQuestion(token: string, questionId?: number | null) {
    return async (dispatch: RootDispatch) => {
        let selectedQuestion;
        //get question that is not yet answered by the user
        let res = await fetch(`${API_SERVER}/popUpQuiz/question`, {
            method: "GET",
            headers: new Headers({
                Authorization: "Bearer " + token,
            }),
        });
        let questions = await res.json();
        if (questions.length === 0) {
            // all questions is being answered, fetch to the server to change the state
            await fetch(`${API_SERVER}/popUpQuiz/finished`, {
                method: "GET",
                headers: new Headers({
                    Authorization: "Bearer " + token,
                }),
            });
            return;
        } else {
            let number = Math.floor(Math.random() * questions.length);
            selectedQuestion = questions[number];
        }

        //get the answers according to the question
        let result = await fetch(
            `${API_SERVER}/popUpQuiz/answer/${selectedQuestion.id}`
        );
        let answersList = await result.json();
        let alphabet = ["A", "B", "C", "D"];
        for (let i = 0; i < answersList.length; i++) {
            answersList[i]["option"] = alphabet[i];
        }

        let popUpQuiz: PopUpQuestion = {
            question: selectedQuestion,
            answers: answersList,
        };

        dispatch(setActiveQuestion(popUpQuiz));
    };
}
