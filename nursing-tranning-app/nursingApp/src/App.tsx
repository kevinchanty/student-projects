import {
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
    IonIcon,
    IonLabel,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import PhotoFeedPage from "./pages/PhotoFeed/PhotoFeedPage";
import GymPage from "./pages/GymPage";
import SupermarketPage from "./pages/SupermarketPage";

// import 'swiper/scss';

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "rc-rate/assets/index.css";

/* Theme variables */
import "./theme/variables.css";

// Page Components
import HomePage from "./pages/HomePage";
import ChessPage from "./pages/ChessPage";
import NotFound from "./components/NotFound";
import ManageQuestionsPage from "./pages/AdminPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import PopUpQuizPage from "./pages/PopUpQuizPage";
import LoginPage from "./pages/LoginPage";
import PhotoFeedAddPage from "./pages/PhotoFeed/PhotoFeedAddPage";
import ProfilePage from "./pages/ProfilePage";
import GamePage from "./pages/GamePage";
import { checkTokenThunk } from "./redux/auth/thunk";
import RegisterPage from "./pages/RegisterPage";
import GameLobbyPage from "./pages/GameLobbyPage";
import NewRoomPage from "./pages/NewRoomPage";
import EnterRoomPage from "./pages/EnterRoomPage";
import MyBagPage from "./pages/MyBagPage";
import PhotoFeedProfilePage from "./pages/PhotoFeed/PhotoFeedProfilePage";
import { Capacitor } from "@capacitor/core";
import ActivationPage from "./pages/ActivationPage";
import { useEffect, useState } from "react";
import { getQuestion, getUserInfo } from "./redux/user/thunk";
import RegisterSuccessPage from "./pages/RegisterSuccessPage";
import SettingPage from "./pages/Setting/SettingPage";
import LoginLandingPage from "./pages/LoginLandingPage";
import {
    cameraOutline,
    cartOutline,
    diceOutline,
    personOutline,
    settingsOutline,
} from "ionicons/icons";
import AdminPanelPage from "./pages/Setting/AdminPanelPage";
import AnalyticsPage from "./pages/Setting/AnalyticsPage";
import EditQuestionPage from "./pages/EditQuestionPage";
import UserStatusPage from "./pages/Setting/UserStatusPage";
import PrivateRoute from "./components/PrivateRoute";
import { saveDestination } from "./redux/user/action";
import jwt_decode from "jwt-decode";
import MyProfilePage from "./pages/MyProfilePage";
import Information from "./components/Setting/Information";

// console.log(Capacitor.getPlatform());

//prettier-ignore

const App: React.FC = () => {
    console.log("version 0.8.3 02:15");
    
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const token = localStorage.getItem('token')
    // const [payload, setPayLoad] = useState<{id?:number, email?:string}>({});

    // if (token) {
    //     setPayLoad(jwt_decode(token!));
    // }

    useEffect(() => {
        dispatch(checkTokenThunk());
        dispatch(getUserInfo());
    }, []);


    function activateQuestion(destination: string) {
        
        if (!user.finished_all_mc) {
            dispatch(getQuestion(token!));
            dispatch(saveDestination(destination));
        } else {
            // console.log("all mc is finished");
        }
    }

    return (
        <IonApp>
            <IonReactRouter>
                <IonSplitPane contentId="main">
                    {/* <Menu /> */}
                    <IonRouterOutlet id="main" animated={true}>
                        <IonTabs>
                            <IonRouterOutlet>
                                <Route path="/" exact={true}>
                                    <Redirect to={`/MyProfile`} />
                                </Route>
                                <Route
                                    exact={true}
                                    path="/Game/Room/:roomId"
                                    component={ChessPage}
                                />
                                <Route
                                    exact={true}
                                    path="/HomePage"
                                    component={HomePage}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path="/Game/Lobby"
                                    component={GameLobbyPage}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path="/PhotoFeed"
                                    component={PhotoFeedPage}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path="/PhotoFeed/Add"
                                    component={PhotoFeedAddPage}
                                />
                                {/* <Route exact={true} path="/PhotoFeed/Profile/"> <Redirect to={"/PhotoFeed/Profile/" + username}/> </Route> */}
                                <PrivateRoute
                                    exact={true}
                                    path="/PhotoFeed/Profile/:searchId"
                                    component={PhotoFeedProfilePage}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path="/MyProfile"
                                    component={MyProfilePage}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path="/Profile/:searchId"
                                    component={ProfilePage}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path="/Game/GymPage"
                                    component={GymPage}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path="/Game/SupermarketPage"
                                    component={SupermarketPage}
                                />
                                <Route
                                    exact={true}
                                    path="/LoginPage/:passcode"
                                    component={LoginLandingPage}
                                />
                                <Route
                                    exact={true}
                                    path="/LoginPage"
                                    component={LoginPage}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path="/PopUpQuizPage"
                                    component={PopUpQuizPage}
                                />
                                <Route
                                    exact={true}
                                    path="/Register"
                                    component={RegisterPage}
                                />
                                <Route
                                    exact={true}
                                    path="/RegisterSuccess"
                                    component={RegisterSuccessPage}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path="/Game"
                                    component={GamePage}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path="/Game/SelectMode"
                                    component={GameLobbyPage}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path="/Game/NewRoom"
                                    component={NewRoomPage}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path="/Game/Room/:RoomId"
                                    component={EnterRoomPage}
                                />
                                <Route
                                    exact={true}
                                    path="/user/ActivationPage/:passcode"
                                    component={ActivationPage}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path="/MyBag/:UserId"
                                    component={MyBagPage}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path='/game/room/:roomId'
                                    component={ChessPage}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path="/Setting"
                                    component={SettingPage}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path="/AdminPanel"
                                    component={AdminPanelPage}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path="/AdminPanel/ManageQuestions"
                                    component={ManageQuestionsPage}
                                />
                               <PrivateRoute
                                    exact={true}
                                    path="/AdminPanel/ManageQuestions/:questionId"
                                    component={EditQuestionPage}
                                /> 
                                <PrivateRoute
                                    exact={true}
                                    path="/AdminPanel/Analytics"
                                    component={AnalyticsPage}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path="/AdminPanel/Analytics/UserStatus/:userId"
                                    component={UserStatusPage}
                                />
                                <PrivateRoute
                                    exact={true}
                                    path="/AdminPanel/Info"
                                    component={Information}
                                />
                                {/* 404 catch all route */}
                                <Route component={NotFound} />
                            </IonRouterOutlet>
                            <IonTabBar slot="bottom">
                                <IonTabButton
                                    tab="New"
                                    href={`/MyProfile`}
                                >
                                    <IonIcon icon={personOutline} />
                                    <IonLabel>Profile</IonLabel>
                                </IonTabButton>
                                <IonTabButton
                                    tab="Photo Feed"
                                    href="/PhotoFeed"
                                >
                                    <IonIcon icon={cameraOutline} />
                                    <IonLabel>Photo Feed</IonLabel>
                                </IonTabButton>
                                <IonTabButton tab="Chess" href="/Game/Lobby">
                                    <IonIcon icon={diceOutline} />
                                    <IonLabel>Chess</IonLabel>
                                </IonTabButton>
                                <IonTabButton
                                    tab="Supermarket"
                                    href="/PopUpQuizPage"
                                >
                                    <IonIcon icon={cartOutline} />
                                    <IonLabel>Shop</IonLabel>
                                </IonTabButton>
                                <IonTabButton tab="Settings" href="/Setting">
                                    <IonIcon icon={settingsOutline} />
                                    <IonLabel>Setting</IonLabel>
                                </IonTabButton>
                            </IonTabBar>
                        </IonTabs>
                    </IonRouterOutlet>
                    
                </IonSplitPane>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
