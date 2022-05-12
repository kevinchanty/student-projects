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
    IonTitle,
    IonItem,
    IonItemGroup,
    IonText,
    IonItemDivider,
} from "@ionic/react";
import {
    checkmarkCircleOutline,
    closeCircleOutline,
    fileTrayFullOutline,
    informationCircle,
    informationOutline,
    listOutline,
    pulseOutline,
} from "ionicons/icons";
import { Stock } from "../Supermarket/Supermarket";
import { Users } from "../Supermarket/model";
import { confirmGymThunk } from "../../redux/user/thunk";
import samplePhoto from "../../assets/img/plank.png";
import { showToast } from 'stencil-lib/components/ion-toast'
import { API_SERVER } from "../../helpers/api";
import styles from "./Gym.module.scss";


const EquipmentModal: React.FC<{
    onDismiss: () => void;
    currentStock: Stock;
    user: Users;
    dispatch: Dispatch<any>;
}> = ({ onDismiss, currentStock, user, dispatch }) => {
    // const dispatch = useDispatch()

    function confirmPurchase() {
        dispatch(confirmGymThunk(user, currentStock));
        if (!currentStock.id || !user) {
            showToast({message:"item id or user id not match"})
        }
        // } else {
        //     showToast({ message: `Successful finished the sport event ${currentStock.item_name}.` })
        // }
    }

    return (

        <>
            <IonContent className={styles.gymModal}>
                <IonGrid>
                    <IonCardHeader className={styles.cardHeader}>
                        <IonButton fill="clear" color="danger" onClick={() => onDismiss()}>
                            <IonIcon icon={closeCircleOutline} />
                        </IonButton>
                        <IonTitle>
                            Gym Room
                        </IonTitle>
                    </IonCardHeader>
                    <IonRow>
                        <IonCol size="12" sizeSm="4">
                            <img src={API_SERVER + "/uploads/" + currentStock.item_pic} />
                            <IonText className={styles.itemName} color="primary"><h3>Sport Center: {currentStock.item_name}</h3></IonText>
                        </IonCol>

                        <IonCol size="12" sizeSm="8">
                            <IonItemGroup>
                                <IonItem><IonIcon color="primary" slot="start" icon={pulseOutline} /><IonText color="primary"><h5>{currentStock.glycemic_index} Glycemic</h5></IonText></IonItem>
                                <IonItem><IonIcon color="primary" slot="start" icon={listOutline} /><IonText color="primary"><h5>{currentStock.description}</h5></IonText></IonItem>
                            </IonItemGroup>
                        </IonCol>
                        {/* <IonText color="danger"><h5>Successful finished the sport event.</h5></IonText> */}

                    </IonRow>
                </IonGrid>
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
                    {/* <IonButton disabled={true} color="light">ViewBagBtn {'>'}</IonButton> */}
                </div>
            </IonContent>
        </>
    );
};

export default EquipmentModal;
