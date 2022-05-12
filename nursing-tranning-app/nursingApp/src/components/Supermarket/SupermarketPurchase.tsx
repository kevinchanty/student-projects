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
    IonText,
    IonItemGroup,
    IonItem,
    IonTitle,
} from "@ionic/react";
import { Stock } from "./Supermarket";
import {
    cashOutline,
    checkmarkCircleOutline,
    closeCircleOutline,
    informationCircle,
    listOutline,
    pulseOutline,
} from "ionicons/icons";
import styles from "./Supermarket.module.scss";
import { Users } from "./model";
import { confirmSupermarketThunk } from "../../redux/user/thunk";
import samplePhoto from "../../assets/img/sandwich.png";
import { showToast } from "stencil-lib/components/ion-toast";
import { API_SERVER } from "../../helpers/api";

export const CartModal: React.FC<{
    onDismiss: () => void;
    currentStock: Stock;
    user: Users;
    dispatch: Dispatch<any>;
}> = ({ onDismiss, currentStock, user, dispatch }) => {
    // const dispatch = useDispatch()

    function confirmPurchase() {
        dispatch(confirmSupermarketThunk(user, currentStock));
        if (!currentStock.id || !user) {
            showToast({message:"item id or user id not match"})
        }
    }

    return (
        <IonContent className={styles.modal}>
            <IonGrid>
                <IonCardHeader className={styles.cardHeader}>
                    <IonButton fill="clear" color="primary" onClick={() => onDismiss()}>
                        <IonIcon icon={closeCircleOutline} />
                    </IonButton>
                    <IonTitle>
                        Supermarket
                    </IonTitle>
                </IonCardHeader>
                <IonRow>
                    <IonCol size="12" sizeSm="4">
                        <img
                            src={
                                API_SERVER + "/uploads/" + currentStock.item_pic
                            }
                        />
                        <IonText className={styles.itemName} color="primary">
                            <h3>Supermarket: {currentStock.item_name}</h3>
                        </IonText>
                    </IonCol>

                    <IonCol size="12" sizeSm="8">
                        <IonItemGroup>
                            <IonItem>
                                <IonIcon
                                    color="primary"
                                    slot="start"
                                    icon={cashOutline}
                                />
                                <IonText color="primary">
                                    <h5>{currentStock.price} Coins</h5>
                                </IonText>
                            </IonItem>
                            <IonItem>
                                <IonIcon
                                    color="primary"
                                    slot="start"
                                    icon={pulseOutline}
                                />
                                <IonText color="primary">
                                    <h5>
                                        {currentStock.glycemic_index} Glycemic
                                    </h5>
                                </IonText>
                            </IonItem>
                            <IonItem>
                                <IonIcon
                                    color="primary"
                                    slot="start"
                                    icon={listOutline}
                                />
                                <IonText color="primary">
                                    <h5>{currentStock.description}</h5>
                                </IonText>
                            </IonItem>
                        </IonItemGroup>
                    </IonCol>
                </IonRow>

                <div className={styles.buttonGroup}>
                    <IonButton
                        size="small"
                        color="primary"
                        type="submit"
                        fill="outline"
                        onClick={confirmPurchase}
                    >
                        <IonIcon slot="start" icon={checkmarkCircleOutline} />
                        Confirm
                    </IonButton>
                </div>
            </IonGrid>
        </IonContent>
    );
};

export default CartModal;
