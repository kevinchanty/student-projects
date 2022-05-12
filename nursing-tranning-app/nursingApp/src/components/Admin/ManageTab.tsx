import {
    IonButton,
    IonButtons,
    IonCard,
    IonCheckbox,
    IonContent,
    IonFab,
    IonFabButton,
    IonFooter,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonNav,
    IonPage,
    IonText,
    useIonModal,
    useIonRouter,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";

import React, { FormEvent, useEffect, useState } from "react";
import { API_SERVER } from "../../helpers/api";
import styles from "./Admin.module.scss";
import ExistingQuestionModal from "./ExistingQuestionModal";
import { Answer, Question } from "./model";
import { QuestionModal } from "./NewQuestionModal";

const ManageTab = () => {
    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const [currentAnswer, setCurrentAnswer] = useState<Answer[]>([]);
    const [question, setQuestion] = useState<Question[]>([]);
    const router = useIonRouter();

    const handleDismiss = () => {
        dismiss();
    };

    const handleDismissNewQuestionModal = () => {
        dismissNewQuestionModal();
    };

    const [present, dismiss] = useIonModal(ExistingQuestionModal, {
        onDismiss: handleDismiss,
        currentQuestion,
        currentAnswer,
        getQuestions,
    });

    async function getQuestions() {
        const result = await fetch(`${API_SERVER}/admin/questions`);
        let questions = await result.json();
        let activeQuestions = questions.filter(
            (question: Question) => question.is_active === true
        );
        setQuestion(activeQuestions);
    }

    async function getAnswers(questionId: number) {
        const result = await fetch(`${API_SERVER}/admin/answers/${questionId}`);
        let answers = await result.json();
        let activeAnswers = answers.filter(
            (answer: Answer) => answer.is_active === true
        );
        setCurrentAnswer(activeAnswers);
    }

    function setSelectedQuestion(question: Question) {
        setCurrentQuestion(question);
    }

    async function cardOnClick(question: Question) {
        setSelectedQuestion(question);
        await getAnswers(question.id);
        present({ cssClass: "my-class" });
    }

    const [presentNewQuestionModal, dismissNewQuestionModal] = useIonModal(
        QuestionModal,
        {
            onDismiss: handleDismissNewQuestionModal,
            getQuestions,
        }
    );

    function moveToQuestion(questionId: number) {
        router.push("/adminpanel/ManageQuestions/" + questionId);
    }

    useEffect(() => {
        getQuestions();
    }, []);

    return (
        <IonContent>
            <IonList>
                <IonListHeader className="ion-text-center">
                    <IonText><h2>Managing the Question Set</h2></IonText>

                </IonListHeader>
                {question.map((question, index) => {
                    return (
                        <IonItem key={index} lines="inset">
                            <IonLabel
                                onClick={() => {
                                    cardOnClick(question);
                                }}
                                className="ion-text-wrap ion-padding"
                                style={{ fontSize: "1em" }}
                            >
                                {question.content}
                            </IonLabel>
                        </IonItem>
                    );
                })}
            </IonList>
            
            <div className={styles.mcFabBtn}>
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton
                        onClick={() => {
                            presentNewQuestionModal({
                                cssClass: "my-class",
                            });
                        }}
                    >
                        <IonIcon icon={addOutline} />
                    </IonFabButton>
                </IonFab>
            </div>
        </IonContent>
    );
};

export default ManageTab;

/*
1. getting all the questions from DB
2. getting the related answers from DB upon click
3. pass both the questions and answers into the modal as state
*/
