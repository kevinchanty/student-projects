import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
} from "@ionic/react";
import {
    bagCheckOutline,
    informationCircle,
    informationCircleOutline,
} from "ionicons/icons";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import Supermarket from "../components/Supermarket/Supermarket";
import { RootState } from "../redux/store";
import PopUpQuizPage from "./PopUpQuizPage";
import ShopTab from "../components/Supermarket/ShopTab";
import styles from "../components/Supermarket/Supermarket.module.scss";
import { useEffect } from "react";
import PopUpQuiz from "../components/PopUpQuizTest/PopUpQuiz";

const SupermarketPage: React.FC = () => {
    // const is_answering_question = useSelector(
    //     (state: RootState) => !!state.user.active_question
    // );

    const user = useSelector((state: RootState) => state.user);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Shop</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Shop</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {/* {is_answering_question ? <PopUpQuiz /> : <ShopTab />} */}
                <ShopTab />
            </IonContent>
        </IonPage>
    );
};

export default SupermarketPage;
