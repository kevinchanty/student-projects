import {
    IonButton,
    IonCardSubtitle,
    IonCol,
    IonFooter,
    IonGrid,
    IonIcon,
    IonItemGroup,
    IonRow,
    IonText,
    useIonToast,
} from "@ionic/react";
import { FormEvent, useState } from "react";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { checkmarkCircleOutline } from "ionicons/icons";
import { RootState } from "../../../redux/store";
import { logInWithEmail } from "../../../redux/auth/thunk";

export default function LoginTab() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const [submitted, setSubmitted] = useState(false);

    const error = useSelector((state: RootState) => state.auth.error);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        dispatch(logInWithEmail(email));
        setEmail("");
        // setSubmitted(true);
    }

    return (
        <>
            {!submitted ? (
                <>
                    <IonItemGroup className={styles.formContainer}>
                        <form onSubmit={submit}>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="12">
                                        <IonCardSubtitle
                                            className={styles.titleMargin}
                                        >
                                            <IonText color="primary">
                                                Welcome to Nursing Training App
                                            </IonText>
                                        </IonCardSubtitle>
                                        <input
                                            className={styles.inputDiv}
                                            placeholder="E-mail address"
                                            type="text"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                        />
                                    </IonCol>
                                    <IonCol size="12">
                                        <IonButton
                                            className={styles.loginButton}
                                            fill="outline"
                                            color="primary"
                                            type="submit"
                                        >
                                            <IonIcon
                                                icon={checkmarkCircleOutline}
                                                slot="start"
                                            />
                                            Log In
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                            {error}
                        </form>
                        <IonFooter>
                            <IonText color="primary">
                                New to us? Please sign up
                            </IonText>
                        </IonFooter>
                    </IonItemGroup>
                </>
            ) : (
                <IonItemGroup>
                    Login email has been sent, please check your mailbox and
                    login with the link provided
                </IonItemGroup>
            )}
        </>
    );
}
