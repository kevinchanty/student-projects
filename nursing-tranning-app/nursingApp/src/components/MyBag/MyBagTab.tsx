import { IonCard, IonCardHeader, IonButtons, IonCardContent, IonSegmentButton } from "@ionic/react";
import { useState } from "react";
import GymHistory from "./GymHistory";
import SupermarketHistory from "./SupermarketHistory";
import styles from "./MyBag.module.scss"

export type Tab =  "supermarketHistory" | "gymHistory"

const MyBagTab: React.FC = () => {
    const [tab, setTab] = useState<Tab>("supermarketHistory")

    function showTab() {
        switch (tab) {
            case "supermarketHistory":
                return <SupermarketHistory />
            case "gymHistory":
                return <GymHistory />
        }
    }

    return (
        <div>
        <IonCardHeader>
            <IonButtons color="primary">
                <IonSegmentButton onClick={() => setTab("supermarketHistory")} className={tab === "supermarketHistory"? styles.Selected : styles.DeSelected}>Supermarket History</IonSegmentButton>
                <IonSegmentButton onClick={() => setTab("gymHistory")} className={tab === "gymHistory"? styles.Selected : styles.DeSelected}>Gym History</IonSegmentButton>
            </IonButtons>
        </IonCardHeader>
        <IonCardContent>
            {showTab()}
        </IonCardContent>
    </div>

    )
} 

export default MyBagTab;