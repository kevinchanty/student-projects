import {
    IonButton,
    IonCard,
    IonCardContent,
    IonChip,
    IonCol,
    IonGrid,
    IonIcon,
    IonImg,
    IonItemGroup,
    IonRow,
    IonText,
    useIonModal,
} from "@ionic/react";
import {
    bagCheckOutline,
    barbellOutline,
    cartOutline,
    pulseOutline,
} from "ionicons/icons";
import { FormEvent, useEffect, useState } from "react";
import styles from "./Gym.module.scss";
import samplePhoto from "../../assets/img/plank.png";
import EquipmentModal from "./Equipment";
import { Stock } from "../Supermarket/Supermarket";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { API_SERVER } from "../../helpers/api";


export function Gym() {
    const [getStock, setGetStock] = useState<Stock[]>([]);
    const [currentStock, setCurrentStock] = useState<Stock>();
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const handleDismiss = () => {
        dismiss();
    };

    const [present, dismiss] = useIonModal(EquipmentModal, {
        onDismiss: handleDismiss,
        currentStock,
        user,
        dispatch
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    async function getStockItems() {
        let result = await fetch(
            `${API_SERVER}/gym/StockItems`
        );
        let items = await result.json();

        setGetStock(items);
    }

    useEffect(() => {
        getStockItems();
    }, []);

    function cardItem(stock: Stock) {
        setCurrentStock(stock);
        present({
            cssClass: "my-class",
        });
    }

    return (
        <IonItemGroup>

            <IonGrid>
                <IonRow className={styles.userDetails}>
                    <IonCol size="6" sizeMd="4">
                        <IonChip
                            color="primary"
                            disabled={true}
                        >
                            Coins: {user?.score}
                        </IonChip>
                    </IonCol>

                    <IonCol size="6" sizeMd="4">
                        <IonChip
                            color="primary"
                            disabled={true}
                        >
                            Glycemic: {user?.glycemic_index}
                        </IonChip>
                    </IonCol>

                    {getStock.map((item, index) => (
                        <IonCol key={index} size="12" sizeMd="3">
                            <IonCard className={styles.cardGroup}>
                                <img src={API_SERVER + "/uploads/" + item.item_pic} />
                                <IonCardContent>
                                    <IonText color="primary">
                                        <h5><IonIcon icon={barbellOutline} />
                                            {" "}{item.item_name}</h5>
                                    </IonText>
                                    <IonText color="primary">
                                        <h5><IonIcon icon={pulseOutline} />
                                            {" "}{item.glycemic_index} Glycemic</h5>
                                    </IonText>
                                </IonCardContent>
                                <IonCardContent>
                                    <IonButton
                                        expand="block"
                                        fill="outline"
                                        color="primary"
                                        onClick={() => {
                                            cardItem(item);
                                        }}
                                    >
                                        <IonIcon
                                            slot="start"
                                            icon={cartOutline}
                                        />
                                        Purchase
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

export default Gym;