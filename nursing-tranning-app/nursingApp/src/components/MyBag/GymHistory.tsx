import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCol,
    IonGrid,
    IonIcon,
    IonImg,
    IonItemGroup,
    IonRow,
    IonTitle,
    useIonModal,
} from "@ionic/react";
import {
    bagCheckOutline,
    cartOutline, cashOutline, pulseOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import samplePhoto from "../../assets/img/plank.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { GymModal } from "./GymModal";
import styles from "./MyBag.module.scss";
import { get } from "../../helpers/api"
import { Purchased } from "./SupermarketHistory";
import { API_SERVER } from "../../helpers/api";

export function GymHistory() {

    const [getPurchased, setGetPurchased] = useState<Purchased[]>([]);
    const [currentPurchased, setCurrentPurchased] = useState<Purchased>();
    const user = useSelector((state: RootState) => state.user);
    // const token = useSelector((state: RootState) => state.auth.token)
    const dispatch = useDispatch();


    const handleDismiss = () => {
        dismiss();
    };

    const [present, dismiss] = useIonModal(GymModal, {
        onDismiss: handleDismiss,
        currentPurchased,
        user,
        dispatch,
    })

    function foodDetail(food: Purchased) {
        setCurrentPurchased(food);
        present({
            cssClass: "my-class",
        });
    }

    async function getGymPurchased() {
        const json = await get(`/MyBag/PurchasedItems/Gym`);
        setGetPurchased(json)
    }

    useEffect(() => { getGymPurchased() }, []);

    return (
        <IonItemGroup>
            <IonGrid>

                <IonRow>
                    {getPurchased.map((item, index) => (
                        <IonCol key={index} size="12" sizeMd="3">
                            <IonCard className={styles.cardGroup}>
                                <img src={API_SERVER + "/uploads/" + item.item_pic} />
                                <IonCardContent>
                                    <IonButton
                                        expand="block"
                                        fill="outline"
                                        color="primary"
                                        onClick={() => {
                                            foodDetail(item)
                                        }}
                                    >
                                        <IonIcon
                                            slot="start"
                                            icon={cartOutline}
                                        />
                                        {item.item_name}
                                    </IonButton>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    ))}

                </IonRow>
            </IonGrid>
        </IonItemGroup>
    );
}

export default GymHistory;
