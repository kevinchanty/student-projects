/* Using with useIonModal Hook */

import React, { FormEvent, useEffect, useState } from "react";
import {
    IonButton,
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
    IonTitle,
    useIonModal,
} from "@ionic/react";
import PopUpQuizModalBody from "./PopUpQuizModal";
import { Answer, Question, User } from "./model";
import { API_SERVER } from "../../helpers/api";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const PopUpQuizTest: React.FC = () => {
    const [question, setQuestion] = useState<Question>();
    const [answers, setAnswers] = useState<Answer[]>();
    const userId = useSelector((state: RootState) => state.user?.id);
    const token = useSelector((state: RootState) => state.auth.token);

    const handleDismiss = () => {
        dismiss();
    };

    const [present, dismiss] = useIonModal(PopUpQuizModalBody, {
        onDismiss: handleDismiss,
        question,
        answers,
    });

    let selectedQuestion;
    useEffect(() => {
        if (userId) {
            selectedQuestion = randomQuestion();
        }
    }, []);

    async function randomQuestion() {
        if (token) {
            let res = await fetch(`${API_SERVER}/popUpQuiz/question`, {
                method: "GET",
                headers: new Headers({
                    Authorization: "Bearer " + token,
                }),
            });
            let questions = await res.json();

            if (questions.length === 0) {
                return false;
            } else {
                let number = Math.floor(Math.random() * questions.length);
                let selectedQuestion = questions[number];
                setQuestion(selectedQuestion);
                return selectedQuestion;
            }
        }
    }

    async function getAnswers(questionId: number) {
        let result = await fetch(
            `${API_SERVER}/popUpQuiz/answer/${questionId}`
        );
        let answers = await result.json();
        setAnswers(answers);
    }

    async function cardOnClick() {
        let selectedQuestion;
        if (token) {
            selectedQuestion = await randomQuestion();
        }
        if (selectedQuestion) {
            await getAnswers(selectedQuestion.id);
            present({
                cssClass: "my-class",
            });
        } else {
            alert("all questions have been answered");
        }
    }

    return (
        <>
            <IonButton
                expand="block"
                onClick={() => {
                    cardOnClick();
                }}
            >
                Show Pop Up Quiz Modal
            </IonButton>
            <IonButton onClick={() => randomQuestion()}>
                get random question
            </IonButton>
        </>
    );
};

export default PopUpQuizTest;
