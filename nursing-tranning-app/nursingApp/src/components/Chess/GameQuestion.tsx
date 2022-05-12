import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    useIonToast,
} from "@ionic/react";
import React, { useState } from "react";
import { Answer, Player, Question, Quiz, Tile } from "./Chess";
import styles from "./Chess.module.scss";

type Props = {
    quiz: Quiz;
    isActive: boolean;
    answerer: Player;
    tile: Tile;
    submitAnswer: (question: Question, answer: Answer) => void;
};

export const GameQuiz = (props: Props) => {
    return (
        <IonCard className={styles["question-card"]}>
            <IonCardTitle className="ion-text-center">
                Question: {props.quiz.question.content}
            </IonCardTitle>
            <IonCardSubtitle className="ion-margin ion-text-center">
                {props.isActive ? "You are " : props.answerer.username + " is "}
                answering...
            </IonCardSubtitle>
            <IonCardContent>
                {props.quiz.answers.map((answer, i) => (
                    <IonButtons className="ion-margin">
                        <IonButton
                            disabled={!props.isActive}
                            onClick={() =>
                                props.submitAnswer(props.quiz.question, answer)
                            }
                            key={i}
                        >
                            {answer.content}
                        </IonButton>
                    </IonButtons>
                ))}
            </IonCardContent>
        </IonCard>
    );
};

export default GameQuiz;
