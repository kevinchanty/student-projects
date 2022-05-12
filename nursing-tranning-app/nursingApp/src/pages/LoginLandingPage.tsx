import {
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { API_SERVER } from "../helpers/api";
import { loginFailed } from "../redux/auth/action";
import { checkTokenThunk } from "../redux/auth/thunk";
import { RootState } from "../redux/store";
import { getUserInfo } from "../redux/user/thunk";

// NAME THE COMPONENT
const LoginLandingPage: React.FC = () => {
    const TITLE = "Login Landing Page"; // INSERT YOUR TITLE
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");
    const router = useIonRouter();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        login();
    }, []);

    let { passcode } = useParams<{ passcode: string }>();
    async function login() {
        let res = await fetch(`${API_SERVER}/user/login/${passcode}`);

        if (res.status === 200) {
            let token = await res.json();
            localStorage.setItem("token", token);
            dispatch(checkTokenThunk());
            dispatch(getUserInfo());

            setStatus("login success");
            router.push("/MyProfile");
            return;
        } else if (res.status === 400) {
            dispatch(loginFailed("Incorrect Token"));
            setStatus("login failed");
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start"></IonButtons>
                    <IonTitle>{TITLE}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{TITLE}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {status === "login success"
                    ? "login success, you will be redirected to your homepage"
                    : status === "login failed"
                    ? "login failed, please double check if you have registered or the passcode has been expired"
                    : null}
            </IonContent>
        </IonPage>
    );
};

export default LoginLandingPage;
