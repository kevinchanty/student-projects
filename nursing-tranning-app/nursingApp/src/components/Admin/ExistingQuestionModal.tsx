import { FormEvent, useState } from "react";
import styles from "./ExistingQuestionModal.module.scss";
import {
    IonButton,
    IonButtons,
    IonCardHeader,
    IonCheckbox,
    IonContent,
    IonFab,
    IonFabButton,
    IonGrid,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonText,
    IonTextarea,
    IonTitle,
    useIonToast,
} from "@ionic/react";
import {
    addCircleOutline,
    addOutline,
    checkmarkCircleOutline,
    closeCircleOutline,
    informationCircle,
    trashOutline,
} from "ionicons/icons";
import { Answer, Question } from "./model";
import { API_SERVER } from "../../helpers/api";

export const ExistingQuestionModal: React.FC<{
    onDismiss: () => void;
    currentQuestion: Question;
    currentAnswer: Answer[];
    getQuestions: () => void;
}> = ({ onDismiss, currentQuestion, currentAnswer, getQuestions }) => {
    const [question, setQuestion] = useState(currentQuestion);
    const [present, dismiss] = useIonToast();
    const [answer, setAnswer] = useState(currentAnswer);

    function changeQuestion(value: string) {
        let newQuestion = { id: question.id, content: value, is_active: true };
        setQuestion(newQuestion);
    }

    async function save(event: FormEvent) {
        event.preventDefault();
        const postBody = { question, answer };
        const res = await fetch(`${API_SERVER}/admin/updateQuestion`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postBody),
        });
        present({
            message: "question has been updated!",
            duration: 2 * 1000,
        });
        onDismiss();
    }

    function changeAnswer(value: string, id: number) {
        let newAnsList = [];
        for (let item of answer) {
            if (item.id === id) {
                let changedAns = {
                    id: item.id,
                    question_id: item.question_id,
                    content: value,
                    is_correct: item.is_correct,
                    is_active: true,
                };
                newAnsList.push(changedAns);
            } else {
                newAnsList.push(item);
            }
        }
        setAnswer(newAnsList);
    }

    function checkbox(answerId: number) {
        let newAnsList = [];
        for (let item of answer) {
            if (item.id === answerId) {
                let changedAns = {
                    id: item.id,
                    question_id: item.question_id,
                    content: item.content,
                    is_correct: item.is_correct ? false : true,
                    is_active: true,
                };
                newAnsList.push(changedAns);
            } else {
                newAnsList.push(item);
            }
        }
        setAnswer(newAnsList);
    }

    function removeAnswer(id: number) {
        if (answer.length === 1) {
            return;
        }

        let newAnswerList = [];
        for (const item of answer) {
            if (item.id === id) {
                item.is_active = false;
                newAnswerList.push(item);
            } else {
                newAnswerList.push(item);
            }
        }

        setAnswer(newAnswerList);
    }

    function addAnswer() {
        // id need to reset when inputting to DB
        let newAns = {
            id: answer[answer.length - 1].id + 1,
            question_id: answer[0].question_id,
            content: "",
            is_correct: false,
            is_active: true,
        };
        setAnswer([...answer, newAns]);
    }

    async function deleteQuestion(id: number) {
        //TODO delete question
        const result = await fetch(`${API_SERVER}/admin/deleteQuestion/${id}`, {
            method: "DELETE",
        });
        let output = await result.json();
        getQuestions();
        present({
            message: "question has been removed",
            duration: 2 * 1000,
        });
        onDismiss();
    }

    return (
        <IonContent>
            <IonGrid>
                <IonCardHeader className={styles.cardHeader}>
                    <IonButton color="primary" onClick={() => onDismiss()}>
                        <IonIcon icon={closeCircleOutline} />
                    </IonButton>
                    <IonButton fill="default" disabled={true} color="dark">
                        Update Question
                    </IonButton>
                    <IonButton
                        onClick={() => {
                            addAnswer();
                        }}
                    >
                        <IonIcon icon={addOutline} />
                    </IonButton>
                </IonCardHeader>
                <div style={{ height: "10vh" }}>
                    <IonItem>
                        <IonLabel color="primary" position="floating">
                            Question:
                        </IonLabel>
                        <IonTextarea
                            value={question.content}
                            onIonChange={(e) =>
                                changeQuestion(e.detail.value || "")
                            }
                            rows={4}
                            required
                        />
                    </IonItem>
                </div>
                <IonItem lines="none">
                    <IonText color="primary">
                        <h5>check the box for the correct answer(s)</h5>
                    </IonText>
                </IonItem>
                <div style={{ height: "55vh", overflow: "scroll" }}>
                    {answer
                        .filter((answer) => answer.is_active === true)
                        .map((answer, index) => (
                            <IonItem key={index}>
                                <IonTextarea
                                    value={answer.content}
                                    contentEditable={true}
                                    suppressContentEditableWarning={true}
                                    onIonChange={(e) => {
                                        changeAnswer(
                                            e.detail.value || "",
                                            answer.id
                                        );
                                    }}
                                    rows={2}
                                    required
                                />
                                <IonCheckbox
                                    onClick={() => checkbox(answer.id)}
                                    checked={answer.is_correct}
                                ></IonCheckbox>
                                <IonButton
                                    color="danger"
                                    onClick={() => removeAnswer(answer.id)}
                                >
                                    Remove
                                </IonButton>
                            </IonItem>
                        ))}
                </div>
            </IonGrid>
            <div className={styles.btn}>
                <IonButton
                    color="success"
                    fill="solid"
                    expand="full"
                    onClick={save}
                >
                    <IonIcon icon={checkmarkCircleOutline} />
                    SAVE CHANGE
                </IonButton>

                {/* <IonButton
                    color="primary"
                    fill="solid"
                    expand="full"
                    onClick={() => onDismiss()}
                >
                    <IonIcon icon={closeCircleOutline} />
                    DISCARD CHANGE
                </IonButton> */}

                <IonButton
                    color="primary"
                    fill="solid"
                    expand="full"
                    onClick={() => deleteQuestion(question.id)}
                >
                    <IonIcon icon={trashOutline} />
                    DELETE QUESTION
                </IonButton>
            </div>
        </IonContent>
    );
};

export default ExistingQuestionModal;
