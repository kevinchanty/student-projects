import React, { ReactElement } from "react";
import {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonToggle,
    IonRadio,
    IonCheckbox,
    IonItemSliding,
    IonItemOption,
    IonItemOptions,
    IonContent,
    IonIcon,
    IonButton,
    IonButtons,
    IonText,
    useIonRouter,
} from "@ionic/react";
import {
    chevronForwardOutline,
    hammerOutline,
    informationCircleOutline,
    logOutOutline,
    personOutline,
} from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { checkTokenThunk } from "../../redux/auth/thunk";
import { removeUser } from "../../redux/user/action";
import backgroundPic from "../../assets/img/43071.jpg";
import styles from "../Admin/Admin.module.scss";
import { RootState } from "../../redux/store";

interface Props {}

export default function Setting({}: Props): ReactElement {
    const dispatch = useDispatch();
    const router = useIonRouter();
    const isAdmin = useSelector((state: RootState) => state.user.is_admin);

    function doLogOut() {
        localStorage.removeItem("token");
        dispatch(checkTokenThunk());
        dispatch(removeUser());
        router.push("/LoginPage");
    }

    return (
        <>
            <IonList>
                {/* <IonItem>
                    <IonIcon color="primary" icon={personOutline}></IonIcon>
                    <IonText color="primary">
                        <IonLabel className="ion-margin-start">
                            Change Username
                        </IonLabel>
                    </IonText>
                </IonItem> */}
                {isAdmin ? (
                    <IonItem routerLink="/AdminPanel">
                        <IonIcon color="primary" icon={hammerOutline}></IonIcon>
                        <IonText color="primary">
                            <IonLabel className="ion-margin-start">
                                Admin Portal
                            </IonLabel>
                        </IonText>
                    </IonItem>
                ) : null}
                <IonItem routerLink="/AdminPanel/Info">
                    <IonIcon
                        color="primary"
                        icon={informationCircleOutline}
                    ></IonIcon>
                    <IonText color="primary">
                        <IonLabel className="ion-margin-start">
                            Information About the App
                        </IonLabel>
                    </IonText>
                </IonItem>
                <IonItem>
                    <IonIcon color="primary" icon={logOutOutline}></IonIcon>
                    <IonText color="primary">
                        <IonLabel
                            className="ion-margin-start"
                            onClick={doLogOut}
                        >
                            Logout
                        </IonLabel>
                    </IonText>
                </IonItem>
            </IonList>
            <div className={styles.backgroundAdmin}>
                <img src={backgroundPic} />
            </div>
        </>
    );
}
