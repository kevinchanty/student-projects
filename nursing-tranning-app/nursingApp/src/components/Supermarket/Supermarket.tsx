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
    IonSlide,
    IonSlides,
    IonText,
    useIonModal,
} from "@ionic/react";
import {
    bagCheckOutline,
    cartOutline,
    cashOutline,
    fastFoodOutline,
    pulseOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { CartModal } from "./SupermarketPurchase";
import styles from "./Supermarket.module.scss";
import samplePhoto from "../../assets/img/sandwich.png";
import { API_SERVER } from "../../helpers/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export type Stock = {
    id: number;
    glycemic_index: number;
    item_name: string;
    price: number;
    is_gym: boolean;
    is_supermarket: boolean;
    description: string;
    item_pic: string;
};

export function Supermarket() {
    const [getStock, setGetStock] = useState<Stock[]>([]);
    const [currentStock, setCurrentStock] = useState<Stock>();
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const handleDismiss = () => {
        dismiss();
    };

    const [present, dismiss] = useIonModal(CartModal, {
        onDismiss: handleDismiss,
        currentStock,
        user,
        dispatch,
    });

    async function getStockItems() {
        let result = await fetch(`${API_SERVER}/SupermarketPage/StockItems`);
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

    const slideOptions = {
        initialSlide: 1,
        speed: 300,
    };

    return (
        <IonItemGroup>
            <IonGrid>
                <IonRow className={styles.userDetails}>
                    <IonCol size="6">
                        <IonChip disabled={true} color="primary">
                            Coins: {user?.score}
                        </IonChip>
                    </IonCol>

                    <IonCol size="6">
                        <IonChip disabled={true} color="primary">
                            Glycemic: {user?.glycemic_index}
                        </IonChip>
                    </IonCol>

                    {/* <IonCol size="4" sizeMd="4">
                        <IonButton fill="outline" size="small" routerLink={"/MyBag/" + user?.id}>
                            <IonIcon slot="start" icon={bagCheckOutline} />{" "}
                            History
                        </IonButton>
                    </IonCol> */}

                    {getStock.map((item, index) => (
                        <IonCol key={index} size="12" sizeMd="3">
                            <IonCard className={styles.cardGroup}>
                                <img
                                    src={
                                        API_SERVER + "/uploads/" + item.item_pic
                                    }
                                />
                                <IonCardContent>
                                    <IonText color="primary">
                                        <h5>
                                            <IonIcon
                                                slot="start"
                                                icon={fastFoodOutline}
                                            />{" "}
                                            {item.item_name}
                                        </h5>
                                    </IonText>
                                    <IonText color="primary">
                                        <h5>
                                            <IonIcon
                                                slot="start"
                                                icon={cashOutline}
                                            />{" "}
                                            {item.price}.00
                                        </h5>
                                    </IonText>
                                    <IonText color="primary">
                                        <h5>
                                            <IonIcon
                                                color="primary"
                                                slot="start"
                                                icon={pulseOutline}
                                            />{" "}
                                            {item.glycemic_index} Glycemic
                                        </h5>
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

export default Supermarket;
