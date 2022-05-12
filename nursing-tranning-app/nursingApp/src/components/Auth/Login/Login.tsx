import {
    IonCard,
    IonCardHeader,
} from "@ionic/react";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Redirect } from "react-router";
import backgroundPic from "../../../assets/img/43071.jpg"
import styles from "./Login.module.scss"

export default function LoginMain() {
    const hasLogin = useSelector((state: RootState) => !!state.user);
    const id = useSelector((state: RootState) => state.auth.user?.id);

    return (
        <div>
            <img className={styles.backgroundPic} src={backgroundPic} />
                <IonCard className={styles.loginForm}>
                    {!hasLogin ? <Redirect to="/HomePage"></Redirect> : null}
                    <LoginForm />
                </IonCard>
        </div>
    );
}
