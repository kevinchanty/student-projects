import { IonCard, IonCardHeader, IonButtons, IonSegmentButton, IonCardContent } from "@ionic/react";
import { useState } from "react";
import Gym from "../Gym/Gym";
import Supermarket from "./Supermarket";
import styles from "./Supermarket.module.scss"

export type ShopTab = "supermarket" | "gym"

const ShopTab: React.FC = () => {

    const [tab, setTab] = useState<ShopTab>("supermarket")

    function showTab() {
        switch (tab) {
            case "supermarket":
                return <Supermarket />;
            case "gym":
                return <Gym />;
        }
    }

    return (
        <div>
            <IonCardHeader>
                <IonButtons color="primary">
                    <IonSegmentButton onClick={() => setTab("supermarket")} className={tab === "supermarket" ? styles.Selected : styles.DeSelected}>Supermarket</IonSegmentButton>
                    <IonSegmentButton onClick={() => setTab("gym")} className={tab === "gym" ? styles.Selected : styles.DeSelected}>Gym</IonSegmentButton>
                </IonButtons>
            </IonCardHeader>
            <IonCardContent>
                {showTab()}
            </IonCardContent>
        </div>
    )
}

export default ShopTab;