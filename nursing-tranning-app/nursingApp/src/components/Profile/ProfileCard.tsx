import { IonCard, IonCardHeader, IonButton, IonCardContent, IonButtons, IonSegmentButton } from "@ionic/react";
import { FC, useState } from "react";
import DietTab from "./DietTab/DietTab";
import PurchaseTab from "./PurchaseTab/PurchaseTab";
import IndexTab from "./IndexTab/IndexTab";
import MyBagTab from "../MyBag/MyBagTab";
import PhotoFeed from "../PhotoFeed/PhotoFeed";
import ProfileFeed from "../PhotoFeed/ProfileFeed";
import GymHistory from "../MyBag/GymHistory";
import SupermarketHistory from "../MyBag/SupermarketHistory";
import styles from "./ProfileCard.module.scss"


type Tab = "diet" | "supermarketHistory" | "gymHistory"



const ProfileCard = (props:{user_id:number}) => {

    const [tab, setTab] = useState<Tab>("diet")


    // Deside which tab to be display
    function showTab() {
        switch (tab) {
            case "diet":
                return <ProfileFeed user_id={props.user_id} />;
            case "supermarketHistory":
                return <SupermarketHistory />;
            case "gymHistory":
                return <GymHistory />;
        }
    }

    return (
        <div className={styles.FullWidth}>
            <IonCardHeader>
                <IonButtons className={styles.Center}>
                    <IonButton onClick={() => setTab("diet")} className={tab === "diet" ? styles.Selected : styles.DeSelected}>Diet</IonButton>
                    <IonButton onClick={() => setTab("supermarketHistory")} className={tab === "supermarketHistory" ? styles.Selected : styles.DeSelected}>Supermarket</IonButton>
                    <IonButton onClick={() => setTab("gymHistory")} className={tab === "gymHistory" ? styles.Selected : styles.DeSelected}>Gym</IonButton>
                </IonButtons>
            </IonCardHeader>
            <IonCardContent>
                {showTab()}
            </IonCardContent>
        </div>

    )
}

export default ProfileCard;