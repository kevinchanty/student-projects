import { IonButton, IonButtons, IonContent, IonTitle } from "@ionic/react";
import { FormEvent, useState } from "react";
import { API_SERVER } from "../../helpers/api";
import { Answer, Question } from "./model";
import styles from "./PopUpQuiz.module.scss";

export const PopUpQuizModalBody: React.FC<{
    count: number;
    onDismiss: () => void;
    onIncrement: () => void;
    question: Question;
    answers: Answer[];
}> = ({ onDismiss, question, answers }) => {
    type Status = "not answered" | "correct" | "incorrect";
    let correctAnsList: Answer[] = answers.filter(
        (item) => item.is_correct === true
    );
    let answerIdList = answers.map((answer) => answer.id);
    let alphabet = ["A", "B", "C", "D"];
    let answerMapping: {
        [T: string]: string;
    } = {};
    answerIdList.forEach(function (id, i) {
        answerMapping[id] = alphabet[i];
    });

    const [status, setStatus] = useState<Status>("not answered");
    const [correctAns, setCorrectAns] = useState(correctAnsList[0].id);
    const [selectedAns, setSelectedAns] = useState<number>();
    const [answerMap, setAnswerMap] = useState(answerMapping);
    const [isFinishedSubmit, setIsFinishedSubmit] = useState(false);

    async function submitAnswer(event: FormEvent, selected_answer: Answer) {
        event.preventDefault();

        // getting the correct answer

        setSelectedAns(selected_answer.id);

        let correctAnsId = correctAnsList[0].id;

        correctAnsId === selected_answer.id
            ? setStatus("correct")
            : setStatus("incorrect");

        let token;
        try {
            token = localStorage.getItem("token");
        } catch (e) {
            console.error("unauthorized", e);
            return;
        }

        let postBody = {
            question_id: question.id,
            is_correct: status === "correct" ? true : false,
            selected_answer: selected_answer.id,
        };

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        if (token) {
            myHeaders.append("token", token);
        }

        await fetch(`${API_SERVER}/popUpQuiz/answer`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(postBody),
        });
    }

    return (
        <IonContent>
            <div className="ion-padding">
                <div className={styles["head-container"]}>
                    <div>
                        <div>health value +1 if answer is correct;</div>
                        <div>otherwise, -1 if times up / wrong answer</div>
                    </div>
                    <div> Timer</div>
                </div>
                <div className={styles["question-container"]}>
                    {question.content}
                </div>
                <div className={styles["answer-container"]}>
                    {answers.map((answer, index) => (
                        <IonButton
                            key={answer.id}
                            onClick={(e) => submitAnswer(e, answer)}
                            className={styles.answer}
                            color={
                                answer.id === selectedAns
                                    ? status === "not answered"
                                        ? "light"
                                        : status === "correct"
                                        ? "success"
                                        : "danger"
                                    : "light"
                            }
                            disabled={status === "not answered" ? false : true}
                        >
                            {(answerMap as any)[answer.id]}: {answer.content}
                        </IonButton>
                    ))}
                </div>
                <div className={styles["tail-container"]}>
                    <div className={styles["result-container"]}>
                        {status === "not answered" ? null : status ===
                          "correct" ? (
                            <>
                                <div>
                                    You are correct. The correct answer is{" "}
                                    {(answerMap as any)[correctAns]}
                                </div>
                                <div>health value + 1</div>
                            </>
                        ) : (
                            <>
                                <div>
                                    You are incorrect. The correct answer is{" "}
                                    {(answerMap as any)[correctAns]}
                                </div>
                                <div>health value - 1</div>
                            </>
                        )}
                    </div>
                    {status === "not answered" ? null : (
                        <IonButtons>
                            <IonButton onClick={onDismiss}>Close</IonButton>
                        </IonButtons>
                    )}
                </div>
            </div>
        </IonContent>
    );
};

export default PopUpQuizModalBody;
