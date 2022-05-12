import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonInput,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Redirect } from "react-router";
import backgroundPic from "../../../assets/img/43071.jpg"
import RegisterForm from "./RegisterForm";
import styles from "../Login/Login.module.scss";

export default function Register() {
    const hasLogin = useSelector((state: RootState) => !!state.user);
    const id = useSelector((state: RootState) => state.auth.user?.id);
    const dispatch = useDispatch();

    return (
        <div >
            <img className={styles.backgroundPic} src={backgroundPic} />
        <IonCard className={styles.signUpForm}>
            {!hasLogin ? <Redirect to="/HomePage"></Redirect> : null}
            <IonCardHeader></IonCardHeader>
            <IonBackButton />
            <RegisterForm />
        </IonCard>
        </div>
    );
}
