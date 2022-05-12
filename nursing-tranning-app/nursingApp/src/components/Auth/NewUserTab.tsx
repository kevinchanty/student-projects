import { IonCardHeader, IonButtons, IonSegmentButton, IonCardContent, IonCard } from "@ionic/react"
import { useState } from "react"
import LoginMain from "./Login/Login"
import Register from "./Register/Register"
import styles from "./Login/Login.module.scss"

export type UserTab = "login" | "register"

const NewUserTab: React.FC = () => {

    const [tab, setTab] = useState<UserTab>("login")

    function showTab() {
        switch (tab) {
            case "login":
                return <LoginMain />;
            case "register":
                return <Register />
        }
    }

    return (
        <div>
            <IonCardHeader>
                <IonButtons color="primary">
                    <IonSegmentButton onClick={() => setTab("login")} className={tab === "login" ? styles.Selected : styles.DeSelected}>Login</IonSegmentButton>
                    <IonSegmentButton onClick={() => setTab("register")} className={tab === "register" ? styles.Selected : styles.DeSelected}>Register</IonSegmentButton>
                </IonButtons>
            </IonCardHeader>
            <IonCardContent>
                {showTab()}
            </IonCardContent>
        </div>
    )
}

export default NewUserTab;