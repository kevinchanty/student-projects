import {
    IonAvatar,
    IonButton,
    IonCard,
    IonCol,
    IonFabButton,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonItemDivider,
    IonLabel,
    IonRow,
    IonSegmentButton,
    IonText,
} from "@ionic/react";
import {
    personCircleSharp,
    cashSharp,
    pulseSharp,
    chatboxOutline,
    cashOutline,
    personCircleOutline,
    pulseOutline,
} from "ionicons/icons";
import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { API_SERVER } from "../../helpers/api";
import { checkTokenThunk } from "../../redux/auth/thunk";
import { RootState } from "../../redux/store";
import { getUserInfo } from "../../redux/user/thunk";
import HomeDetails from "./HomeDetails";
import HomeHealthCard from "./HomeHealthCard";
import HomeRanking from "./HomeRanking";

interface Props {}

export default function Home({}: Props): ReactElement {
    const dispatch = useDispatch();
    dispatch(checkTokenThunk());
    const hasLogin = useSelector((state: RootState) => !!state.auth.token);
    const user = useSelector((state: RootState) => state.user);

    return (
        <>
            <IonCard>
                {/* <HomeHealthCard/>
                    <HomeDetails />
                    <HomeRanking /> */}
                <IonGrid>
                    <IonText>Kevin's testing AWS.</IonText>
                    {hasLogin ? null : <Redirect to="/LoginPage"></Redirect>}
                    <IonRow color="primary">
                        <IonCol>
                            <IonImg
                                src={
                                    API_SERVER +
                                    "/uploads/" +
                                    user.profile_picture
                                }
                            ></IonImg>
                        </IonCol>
                        <IonItemDivider color="light">
                            <IonLabel color="primary">
                                <div>
                                    {" "}
                                    <IonIcon
                                        icon={personCircleOutline}
                                    /> Hello {user.username}
                                </div>
                                <div>
                                    {" "}
                                    <IonIcon icon={cashOutline} /> {user.score}
                                </div>
                                <div>
                                    {" "}
                                    <IonIcon icon={pulseOutline} />{" "}
                                    {user.glycemic_index}
                                </div>
                            </IonLabel>
                        </IonItemDivider>
                        <IonRow>
                            <IonButton routerLink={"/MyBag/" + user?.id}>
                                My Bag
                            </IonButton>
                            <IonButton routerLink={"/Game"}>
                                Play Chess
                            </IonButton>
                            <IonButton routerLink={"/PhotoFeed"}>
                                Photo Feed
                            </IonButton>
                        </IonRow>
                    </IonRow>
                </IonGrid>
            </IonCard>
        </>
    );
}
