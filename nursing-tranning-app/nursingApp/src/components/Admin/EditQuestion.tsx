// not in use
import {
    IonButton,
    IonButtons,
    IonCheckbox,
    IonCol,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList,
    IonListHeader,
    IonRow,
    IonTextarea,
    IonTitle,
    useIonRouter,
    useIonToast,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_SERVER } from "../../helpers/api";
import { get } from "../../helpers/api";

type Question = {
    id: number;
    content: string;
    is_active: boolean;
    pool: string;
};

type Answer = {
    id: number;
    question_id: number;
    content: string;
    is_correct: boolean;
    is_active: boolean;
};

export const EditQuestion = () => {
    const [question, setQuestion] = useState<Question | null>(null);
    const [answers, setAnswers] = useState<Answer[] | null>(null);
    const router = useIonRouter();
    const [present, dismiss] = useIonToast();
    const { questionId } = useParams<{ questionId: string }>();

    // getting the question
    async function getQuestionAndAnswers() {

        // let res = await fetch(`${API_SERVER}/admin/question/${questionId}`);
        // let { question, answers } = await res.json();
        let { question, answers } = await get(`/admin/question/${questionId}`);
        setQuestion(question);
        setAnswers(answers);
    }

    useEffect(() => {
        getQuestionAndAnswers();
    }, []);

    function checkbox(answerId: number) {
        let newAnsList = [];
        for (let item of answers!) {
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
        setAnswers(newAnsList);
    }

    function changeAnswer(value: string, id: number) {
        let newAnsList = [];
        for (let item of answers!) {
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
        setAnswers(newAnsList);
    }

    function removeAnswer(id: number) {
        if (answers?.length === 1) {
            return;
        }

        let newAnswerList = [];
        for (const item of answers!) {
            if (item.id === id) {
                item.is_active = false;
                newAnswerList.push(item);
            } else {
                newAnswerList.push(item);
            }
        }

        setAnswers(newAnswerList);
    }

    function changeQuestion(content: string) {
        let newQuestion = { ...question, content };
        setQuestion(newQuestion as Question);
    }

    function addAnswer() {
        let ansListLength = answers!.length - 1;
        let id = answers![ansListLength].id + 1;
        // id need to reset when inputting to DB
        let newAns = {
            id,
            question_id: question?.id as number,
            content: "",
            is_correct: false,
            is_active: true,
        };
        setAnswers([...answers!, newAns]);
    }

    async function deleteQuestion(id: number) {
        const result = await fetch(`${API_SERVER}/admin/deleteQuestion/${id}`, {
            method: "DELETE",
        });
        let output = await result.json();
        present({
            message: output,
            duration: 2 * 1000,
        });
        leave();
    }

    async function save(event: FormEvent) {
        event.preventDefault();
        const postBody = { question, answers };
        const res = await fetch(`${API_SERVER}/admin/updateQuestion`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postBody),
        });
        leave();
    }

    function leave() {
        setQuestion(null);
        setAnswers(null);
        router.push("/adminpanel/managequestions");
    }

    return (
        <>
            <IonList>
                <IonTitle>Question: </IonTitle>
                <IonItem lines="none">
                    <IonTextarea
                        value={question?.content}
                        onIonChange={(e) =>
                            changeQuestion(e.detail.value as string)
                        }
                    ></IonTextarea>
                </IonItem>

                <IonTitle>Answers:</IonTitle>
                <IonItemDivider></IonItemDivider>
                {answers
                    ?.filter((answer) => answer.is_active === true)
                    .map((answer, index) => (
                        <IonItem lines="full" key={index}>
                            <IonRow>
                                <IonCol size="1">
                                    <IonCheckbox
                                        onClick={() => checkbox(answer.id)}
                                        checked={answer.is_correct}
                                    ></IonCheckbox>
                                </IonCol>
                                <IonCol size="8">
                                    <IonTextarea
                                        value={answer.content}
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onIonChange={(e) => {
                                            changeAnswer(
                                                e.detail.value as string,
                                                answer.id
                                            );
                                        }}
                                        required
                                    />
                                </IonCol>
                                <IonCol size="3">
                                    <IonButtons>
                                        <IonButton
                                            color="danger"
                                            onClick={() =>
                                                removeAnswer(answer.id)
                                            }
                                        >
                                            Remove
                                        </IonButton>
                                    </IonButtons>
                                </IonCol>
                            </IonRow>
                        </IonItem>
                    ))}
            </IonList>
            <IonRow>
                <IonCol size="6">
                    <IonButton
                        color="success"
                        fill="solid"
                        onClick={save}
                        expand="full"
                    >
                        Save Change
                    </IonButton>
                </IonCol>
                <IonCol size="6">
                    <IonButton
                        color="primary"
                        fill="solid"
                        expand="full"
                        onClick={leave}
                    >
                        Discard Change
                    </IonButton>
                </IonCol>
            </IonRow>

            <IonButton
                color="primary"
                fill="solid"
                onClick={() => deleteQuestion(question!.id)}
                expand="full"
            >
                DELETE QUESTION
            </IonButton>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton
                    onClick={() => {
                        addAnswer();
                    }}
                >
                    <IonIcon icon={addOutline} />
                </IonFabButton>
            </IonFab>
        </>
    );
};

export default EditQuestion;
