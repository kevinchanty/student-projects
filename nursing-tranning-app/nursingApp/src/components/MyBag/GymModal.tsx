import React, { Dispatch } from "react";
import {
    IonButton,
    IonIcon,
    IonGrid,
    IonCardHeader,
    IonRow,
    IonCol,
    IonCardSubtitle,
    IonContent,
    IonItem,
    IonItemGroup,
    IonText,
    IonTitle,
} from "@ionic/react";
import {
    calendarOutline,
    closeCircleOutline, informationCircleOutline, listOutline, pulseOutline,
} from "ionicons/icons";
import { Users } from "../Supermarket/model";
import samplePhoto from "../../assets/img/plank.png";
import { Purchased } from "./SupermarketHistory";
import styles from "./MyBag.module.scss";
import { API_SERVER } from "../../helpers/api";

export const GymModal: React.FC<{
    onDismiss: () => void;
    currentPurchased: Purchased;
    user: Users;
    dispatch: Dispatch<any>
}> = ({ onDismiss, currentPurchased, user, dispatch }) => {

    return (
        <IonContent className={styles.modal}>
            <IonGrid>
                <IonCardHeader className={styles.cardHeader}>
                    <IonButton fill="clear" color="danger" onClick={() => onDismiss()}>
                        <IonIcon icon={closeCircleOutline} />
                    </IonButton>
                    <IonTitle>
                        Gym History
                    </IonTitle>
                </IonCardHeader>
                <IonRow>
                    <IonCol size="12" sizeSm="4">
                        <img src={API_SERVER + "/uploads/" + currentPurchased.item_pic} />
                        <IonText className={styles.itemName} color="primary"><h3>{currentPurchased.item_name}</h3></IonText>

                    </IonCol>

                    <IonCol size="12" sizeSm="8">
                        <IonItemGroup>
                            <IonItem><IonIcon color="primary" slot="start" icon={calendarOutline} /><IonText color="primary"><h5>{new Date(currentPurchased.purchase_at).toDateString()}</h5></IonText></IonItem>
                            <IonItem><IonIcon color="primary" slot="start" icon={pulseOutline} /><IonText color="primary"><h5>-{currentPurchased.glycemic_index} Glycemic</h5></IonText></IonItem>
                            <IonItem><IonIcon color="primary" slot="start" icon={listOutline} /><IonText color="primary"><h5>{currentPurchased.description}</h5></IonText></IonItem>
                        </IonItemGroup>

                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>

    )
}