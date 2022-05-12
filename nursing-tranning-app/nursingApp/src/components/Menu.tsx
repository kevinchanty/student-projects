import {
    IonButton,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
    bagCheckSharp,
    barbellOutline,
    barbellSharp,
    cartOutline,
    cartSharp,
    diceOutline,
    diceSharp,
    imageOutline,
    imageSharp,
    logInOutline,
    logInSharp,
    settingsOutline,
    settingsSharp,
} from "ionicons/icons";
import "./Menu.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { checkTokenThunk } from "../redux/auth/thunk";
import { FormEvent } from "react";
import { logout } from "../redux/auth/action";
import { removeUser } from "../redux/user/action";

interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

// const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
    const location = useLocation();
    const hasLogin = useSelector((state: RootState) => !!state.user);
    const id = useSelector((state: RootState) => state.user?.id);
    const user = useSelector((state: RootState) => state.user?.username);
    const token = useSelector((state: RootState) => state.auth.token);
    const dispatch = useDispatch();

    const appPages: AppPage[] = [
        {
            title: "Chess",
            url: "/Game/Lobby",
            iosIcon: diceOutline,
            mdIcon: diceSharp,
        },
        {
            title: "Photo Feed",
            url: "/PhotoFeed",
            iosIcon: imageOutline,
            mdIcon: imageSharp,
        },
        {
            title: "Supermarket",
            url: "/Game/SupermarketPage",
            iosIcon: cartOutline,
            mdIcon: cartSharp,
        },
        {
            title: "Gym",
            url: "/Game/GymPage",
            iosIcon: barbellOutline,
            mdIcon: barbellSharp,
        },
        {
            title: "Login",
            url: "/LoginPage",
            iosIcon: logInOutline,
            mdIcon: logInSharp,
        },
        {
            title: "Admin",
            url: "/Admin",
            iosIcon: settingsOutline,
            mdIcon: settingsSharp,
        },
        {
            title: "PopUpQuizTest",
            url: "/PopUpQuizTest",
            iosIcon: settingsOutline,
            mdIcon: settingsSharp,
        },
        {
            title: "Profile",
            url: "/Profile/" + id,
            iosIcon: settingsOutline,
            mdIcon: settingsSharp,
        },
        {
            title: "WEBSOCKET",
            url: "/WebsocketTest/",
            iosIcon: diceSharp,
            mdIcon: diceSharp,
        },
        {
            title: "Game",
            url: "/Game",
            iosIcon: diceSharp,
            mdIcon: diceSharp,
        },
        {
            title: "My Bag History",
            url: "/MyBag/" + id,
            iosIcon: bagCheckSharp,
            mdIcon: bagCheckSharp,
        },
    ];

    function doLogOut(event: FormEvent) {
        localStorage.removeItem("token");
        dispatch(checkTokenThunk());
        dispatch(removeUser());
        window.location.href = "/LoginPage";
    }

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                    <IonListHeader>Nurse Training App</IonListHeader>
                    {hasLogin ? (
                        <>
                            <IonNote>{user}</IonNote>
                            <IonNote>{token}</IonNote>
                        </>
                    ) : (
                        <IonNote>no user</IonNote>
                    )}
                    {appPages.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem
                                    className={
                                        location.pathname === appPage.url
                                            ? "selected"
                                            : ""
                                    }
                                    routerLink={appPage.url}
                                    routerDirection="none"
                                    lines="none"
                                    detail={false}
                                >
                                    <IonIcon
                                        slot="start"
                                        ios={appPage.iosIcon}
                                        md={appPage.mdIcon}
                                    />
                                    <IonLabel>{appPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>
            </IonContent>

            <IonButton onClick={doLogOut}>LogOut</IonButton>
        </IonMenu>
    );
};

export default Menu;
