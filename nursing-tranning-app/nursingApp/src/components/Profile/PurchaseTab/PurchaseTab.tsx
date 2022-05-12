import { FC, useEffect, useState } from "react";
import React from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonIcon, IonGrid, IonRow, IonCol, IonItem, IonButton } from '@ionic/react';
import { pricetagsOutline, pulseOutline, cashOutline, calendarClearOutline, fileTrayFullOutline } from 'ionicons/icons';
import { API_SERVER } from "../../../helpers/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import styles from "./PurchaseTab.module.scss"

export type Purchased = {
    item_id: number;
    user_id: number;
    glycemic_index: number;
    item_name: string;
    price: number;
    is_gym: boolean;
    is_supermarket: boolean;
    purchase_at: Date;
    info_about: string
}

export function PurchaseTab() {

    const [getPurchased, setGetPurchased] = useState<Purchased[]>([]);
    const user = useSelector((state: RootState) => state.user);

    async function getPurchasedItems() {
        let result = await fetch(
            `${API_SERVER}/Profile/myBagHistory`
        );
        let items = await result.json();

        setGetPurchased(items);
    }

    useEffect(() => { getPurchasedItems() }, [])

    return (
        <>
            <IonCard>
                <IonCardContent>
                    <IonGrid>
                        <IonCardHeader className={styles.cardHeader}>
                            <IonButton color="light">ExitBtn</IonButton>
                            Nurse Training App
                            <IonButton color="light">InfoBtn</IonButton>
                        </IonCardHeader>
                        
                        {/* {getPurchased.map((item, index) => (
                            <IonRow>
                                <>
                                    <IonCol key={index} size="12" sizeSm="4">
                                        <IonCardSubtitle>Supermarket - {item.item_name}</IonCardSubtitle>
                                        <img src="https://picsum.photos/300" />
                                    </IonCol>
                                    <IonCol key={index} size="12" sizeSm="8">

                                        <ul>
                                            <li>{item.purchase_at}</li>
                                            <li>{item.glycemic_index} Calories</li>
                                            <li>{item.info_about}</li>
                                        </ul>
                                    </IonCol>
                                </>
                            </IonRow>
                        ))} */}

                    </IonGrid>
                </IonCardContent>
            </IonCard>
        </>
    )
}

export default PurchaseTab;