/* Using with useIonModal Hook */

import React, { FormEvent, useCallback, useEffect, useState } from "react";
import {
    IonButton,
    IonButtons,
    IonCard,
    IonContent,
    IonHeader,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonText,
    IonTextarea,
    IonTitle,
    useIonAlert,
    useIonModal,
    useIonRouter,
    useIonToast,
} from "@ionic/react";
import PopUpQuizModalBody from "./PopUpQuizModal";
import { Answer, Question, User } from "./model";
import { API_SERVER, get } from "../../helpers/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getQuestion } from "../../redux/user/thunk";
import { removeActiveQuestion, updateCoin } from "../../redux/user/action";
import styles from "./PopUpQuiz.module.scss";

const PopUpQuiz: React.FC = () => {
    type Status = "not answered" | "correct" | "incorrect";
    type Question = {
        id: number;
        content: string;
    };

    type Answer = {
        id: number;
        content: string;
        is_active: boolean;
        is_correct: boolean;
        question_id: number;
        option?: string;
    };

    const [status, setStatus] = useState<Status>("not answered");
    const [correctAns, setCorrectAns] = useState<Answer>();
    const [question, setQuestion] = useState<Question | null>();
    const [answers, setAnswers] = useState<Answer[] | null>(null);
    const token = localStorage.getItem("token");
    // const [selectedAns, setSelectedAns] = useState<number>();
    // const [answerMap, setAnswerMap] = useState(answerMapping);
    // const [isFinishedSubmit, setIsFinishedSubmit] = useState(false);
    // const [present] = useIonAlert();
    const router = useIonRouter();

    const initQuiz = useCallback(async function() {
        //getting the question
        let questions = await get("/popUpQuiz/questions");

        if (questions.length === 0) {
            router.push("/game/supermarketpage");
            return;
        }
        let random = await Math.floor(Math.random() * questions.length);

        let question = questions[random];


        //getting the answers
        let answers = await get("/popUpQuiz/answers/" + question.id);

        // mapping the answers to alphabet
        let alphabet = ["A", "B", "C", "D"];
        for (let i = 0; i < answers.length; i++) {
            answers[i].option = alphabet[i];
        }

        // get the correct answer
        let correctAns = answers.filter(
            (answer: Answer) => answer.is_correct === true
        );

        //setting the question and answer to state
        setQuestion(question);
        setAnswers(answers);
        setCorrectAns(correctAns);
    }, [router, setQuestion, setAnswers, setCorrectAns]);

    useEffect(() => {
        initQuiz();
    }, [initQuiz]);
    const dispatch = useDispatch();

    async function submitAnswer(event: FormEvent, selected_answer: Answer) {
        event.preventDefault();
        let postBody = {
            question_id: question?.id,
            is_correct: selected_answer.is_correct,
            selected_answer: selected_answer.id,
        };
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        if (token) {
            myHeaders.append("Authorization", "Bearer " + token);
        }
        let res = await fetch(`${API_SERVER}/popUpQuiz/answer`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(postBody),
        });

        let result = await res.json();
        dispatch(updateCoin(result));

        selected_answer.is_correct
            ? setStatus("correct")
            : setStatus("incorrect");
    }

    function onClose() {
        router.push("/game/SupermarketPage");
    }

    return (
        <IonContent>
            <div className="ion-padding">
                <div className={styles["head-container"]}>
                    <IonText
                        color="primary"
                        className={
                            styles["question-container"] +
                            " " +
                            "ion-text-center"
                        }
                    >
                        {question?.content}
                    </IonText>
                </div>
                <div className={styles["answer-container"]}>
                    {answers?.map((answer) => (
                        <IonButton
                            color="light"
                            size="large"
                            key={answer.id}
                            onClick={(e) => submitAnswer(e, answer)}
                            className={styles.answer + " " + "ion-text-wrap"}
                            disabled={status === "not answered" ? false : true}
                        >
                            {answer.option}: {answer.content}
                        </IonButton>
                    ))}
                </div>
                <div className={styles["tail-container"]}>
                    <IonText>Coins +50 if answer is correct;</IonText>
                    <IonText>otherwise, -30 if times up / wrong answer</IonText>
                </div>
                {status === "not answered" ? null : status === "correct" ? (
                    <IonCard className={styles.resultCard}>
                        <div className="ion-margin">
                            You are{" "}
                            <span
                                style={{
                                    color: "green",
                                    textDecoration: "underline 1px green",
                                    fontWeight: "bold",
                                }}
                            >
                                correct
                            </span>
                            .
                        </div>
                        <div>
                            The correct answer is {""}
                            <span
                                style={{
                                    color: "green",
                                    fontWeight: "bold",
                                }}
                            >
                                {correctAns?.option}
                            </span>
                        </div>
                        <div className="ion-margin">coins + 50</div>
                        <div className={styles.closeBtn}>
                            <IonButtons>
                                <IonButton onClick={onClose}>Close</IonButton>
                            </IonButtons>
                        </div>
                    </IonCard>
                ) : (
                    <IonCard className="ion-padding">
                        <div className="ion-margin">
                            You are{" "}
                            <span
                                style={{
                                    color: "red",
                                    textDecoration: "underline 1px red",
                                    fontWeight: "bold",
                                }}
                            >
                                incorrect
                            </span>
                            . The correct answer is{" "}
                            <span
                                style={{
                                    color: "green",
                                    fontWeight: "bold",
                                }}
                            >
                                {correctAns?.option}
                            </span>
                        </div>
                        <div className="ion-margin">coins - 30</div>
                        <IonButtons className={styles.closeBtn}>
                            <IonButton onClick={onClose}>Close</IonButton>
                        </IonButtons>
                    </IonCard>
                )}
            </div>
        </IonContent>
    );
};

export default PopUpQuiz;
