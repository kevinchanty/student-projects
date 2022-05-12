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
    IonItem,
    IonLabel,
    IonText,
    IonTextarea,
    IonTitle,
    useIonToast,
} from "@ionic/react";
import {
    addOutline,
    checkmarkCircleOutline,
    closeCircleOutline,
} from "ionicons/icons";
import { FormEvent, useState } from "react";
import { API_SERVER } from "../../helpers/api";
import styles from "./NewQuestionModal.module.scss";

type Question = {
    id: number;
    content: string;
    is_active: boolean;
    pool: string;
};

export const QuestionModal: React.FC<{
    onDismiss: () => void;
    getQuestions: () => void;
}> = ({ onDismiss, getQuestions }) => {
    const [answer, setAnswer] = useState({
        AnsList: [
            { id: 1, content: "", is_correct: false },
            { id: 2, content: "", is_correct: false },
            { id: 3, content: "", is_correct: false },
            { id: 4, content: "", is_correct: false },
        ],
        nextId: 5,
    });
    const [present, dismiss] = useIonToast();

    const [question, setQuestion] = useState("");

    function addEmptyAnswer(): void {
        let oldAnsList = answer.AnsList;
        let newAns = {
            id: answer.nextId,
            content: "",
            is_correct: false,
        };
        setAnswer({
            AnsList: [...oldAnsList, newAns],
            nextId: answer.nextId + 1,
        });
    }

    function removeAnswer(delAnswer: number): void {
        let newAnsList = answer.AnsList.filter((item) => item.id !== delAnswer);
        setAnswer({ AnsList: newAnsList, nextId: answer.nextId });
    }

    function setText(value: string, id: number) {
        for (let item of answer.AnsList) {
            if (item.id === id) {
                item.content = value;
            }
        }
        setAnswer({ AnsList: answer.AnsList, nextId: answer.nextId });
    }

    async function saveQuestion() {
        const postBody = {
            question,
            answerList: answer.AnsList,
        };
        const result = await fetch(`${API_SERVER}/admin/question`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postBody),
        });
        getQuestions();
        present({
            message: "new question has been created!",
            duration: 2 * 1000,
        });
        onDismiss();
    }

    function setCorrect(id: number) {
        for (let item of answer.AnsList) {
            if (item.id === id) {
                item.is_correct
                    ? (item.is_correct = false)
                    : (item.is_correct = true);
            }
        }

        setAnswer({ AnsList: answer.AnsList, nextId: answer.nextId });
    }

    return (
        <IonContent>
            <IonGrid>
                <IonCardHeader className={styles.cardHeader}>
                    <IonButton color="primary" onClick={() => onDismiss()}>
                        <IonIcon icon={closeCircleOutline} />
                    </IonButton>
                    <IonButton fill="default" disabled={true} color="dark">
                        Add New Question
                    </IonButton>
                    <IonButton
                        onClick={() => {
                            addEmptyAnswer();
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
                            value={question}
                            onIonChange={(e) =>
                                setQuestion(e.detail.value || "")
                            }
                            rows={4}
                            required
                        />
                    </IonItem>
                </div>
                <IonItem>
                    <IonText color="primary">
                        <h5>check the box for the correct answer(s)</h5>
                    </IonText>
                </IonItem>
                <div style={{ height: "60vh", overflow: "scroll" }}>
                    {answer.AnsList.map((answer, index) => (
                        <IonItem key={index}>
                            <IonTextarea
                                value={answer.content}
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                                onIonChange={(e) => {
                                    setText(e.detail.value || "", answer.id);
                                }}
                                rows={2}
                                required
                            />
                            <IonCheckbox
                                onClick={() => setCorrect(answer.id)}
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
                    onClick={saveQuestion}
                >
                    <IonIcon icon={checkmarkCircleOutline} />
                    SAVE CHANGE
                </IonButton>

                <IonButton
                    color="primary"
                    fill="solid"
                    expand="full"
                    onClick={() => onDismiss()}
                >
                    <IonIcon icon={closeCircleOutline} />
                    DISCARD CHANGE
                </IonButton>
            </div>
            {/* <IonTitle>Adding New Question</IonTitle>
            <form id={styles["new-question-modal"]} onSubmit={saveQuestion}>
                <textarea
                    placeholder="Input Question Here"
                    id={styles["new-question"]}
                    name="Question Text"
                    onChange={(e) => setQuestionText(e.target.value)}
                    required
                />
                <div>check the box for the correct answer(s)</div>
                {answer.AnsList.map((answer, index) => (
                    <div key={index} className={styles["new-answer-container"]}>
                        <textarea
                            placeholder="Input Answer Here"
                            value={answer.content}
                            onChange={(e) => setText(e.target.value, answer.id)}
                            className={styles["new-answers"]}
                            required
                        />
                        <IonCheckbox
                            // type="checkbox"
                            className={styles.checkbox}
                            checked={answer.is_correct}
                            onClick={() => setCorrect(answer.id)}
                        ></IonCheckbox>
                        <IonButton
                            color="primary"
                            onClick={() => removeAnswer(answer.id)}
                        >
                            Remove
                        </IonButton>
                    </div>
                ))}
                <div id={styles["save-container"]}>
                    <div>
                        <IonButtons
                            id={styles["new-question-button-container"]}
                        >
                            <IonButton
                                expand="block"
                                color="primary"
                                type="submit"
                                fill="solid"
                            >
                                SAVE
                            </IonButton>
                            <IonButton
                                expand="block"
                                color="primary"
                                fill="solid"
                                onClick={onDismiss}
                            >
                                Discard
                            </IonButton>
                        </IonButtons>
                    </div>
                </div>
            </form>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton
                    onClick={() => {
                        addEmptyAnswer();
                    }}
                >
                    <IonIcon icon={addOutline} />
                </IonFabButton>
            </IonFab> */}
        </IonContent>
    );
};
