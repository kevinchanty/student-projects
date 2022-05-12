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
    IonCardTitle,
    IonTitle,
} from "@ionic/react";
import {
    calendarClearOutline,
    calendarOutline,
    cashOutline,
    closeCircleOutline, informationCircle, informationCircleOutline, listOutline, pulseOutline,
} from "ionicons/icons";
import { Users } from "../Supermarket/model";
import samplePhoto from "../../assets/img/sandwich.png";
import { Purchased } from "./SupermarketHistory";
import { API_SERVER } from "../../helpers/api";
import styles from "./MyBag.module.scss";

export const SupermarketModal: React.FC<{
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
                        <IonTitle color="primary">Supermarket History</IonTitle>
                </IonCardHeader>
                <IonRow>
                    <IonCol size="12" sizeSm="4">
                        <img src={API_SERVER + "/uploads/" + currentPurchased.item_pic} />
                        <IonText className={styles.itemName} color="primary"><h3>{currentPurchased.item_name}</h3></IonText>

                    </IonCol>

                    <IonCol size="12" sizeSm="8">
                        <IonItemGroup>
                            <IonItem><IonIcon color="primary" slot="start" icon={calendarOutline} /><IonText color="primary"><h5>{new Date(currentPurchased.purchase_at).toDateString()}</h5></IonText></IonItem>
                            <IonItem><IonIcon color="primary" slot="start" icon={pulseOutline} /><IonText color="primary"><h5>+{currentPurchased.glycemic_index} Glycemic</h5></IonText></IonItem>
                            <IonItem><IonIcon color="primary" slot="start" icon={cashOutline} /><IonText color="primary"><h5>-{currentPurchased.price} Coins</h5></IonText></IonItem>
                            <IonItem><IonIcon color="primary" slot="start" icon={listOutline} /><IonText color="primary"><h5>{currentPurchased.description}</h5></IonText></IonItem>
                        </IonItemGroup>

                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>

    )
}