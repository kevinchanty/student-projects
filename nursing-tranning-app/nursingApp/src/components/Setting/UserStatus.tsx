import React, { ReactElement, useState, useEffect } from 'react'
import { IonList, IonItem, IonLabel, IonIcon, IonButton, IonInput, IonNote, IonText } from '@ionic/react';
import { checkmarkOutline, closeOutline, newspaperOutline, star } from 'ionicons/icons';
import { useParams } from 'react-router';
import { get } from '../../helpers/api';
import backgroundPic from "../../assets/img/43071.jpg"
import styles from "../Admin/Admin.module.scss"


export default function UserStatus(): ReactElement {
    const [stats, setStats] = useState<{ postCount: string, starCount: string, correctCount: string, wrongCount: string }>()
    const userId = parseInt(useParams<{ userId: string }>().userId)

    const fetchStatus = async () => {
        const result = await get(`/analytics/UserStats/${userId}`)
        setStats(result)
    }

    useEffect(() => {
        fetchStatus();
    }, [])

    return (
        <>
            <IonList>
                <IonItem>
                    <IonIcon color="primary" icon={newspaperOutline}></IonIcon>
                    <IonText color="primary"><IonLabel className="ion-margin-start">No. of posts:</IonLabel></IonText>
                    <IonNote slot="end">{stats?.postCount || "0"}</IonNote>
                </IonItem>
                <IonItem>
                    <IonIcon color="primary" icon={star}></IonIcon>
                    <IonText color="primary"><IonLabel className="ion-margin-start">No. of Stars:</IonLabel></IonText>
                    <IonNote slot="end">{stats?.starCount || "0"}</IonNote>
                </IonItem>
                <IonItem>
                    <IonIcon color="primary" icon={checkmarkOutline}></IonIcon>
                    <IonText color="primary"><IonLabel className="ion-margin-start">No. of Correct Answers:</IonLabel></IonText>
                    <IonNote slot="end">{stats?.correctCount || "0"}</IonNote>
                </IonItem>
                <IonItem>
                    <IonIcon color="primary" icon={closeOutline}></IonIcon>
                    <IonText color="primary"><IonLabel className="ion-margin-start">No. of Wrong Answers:</IonLabel></IonText>
                    <IonNote slot="end">{stats?.wrongCount || "0"}</IonNote>
                </IonItem>
            </IonList>
            <div className={styles.backgroundAdmin}>
                <img src={backgroundPic} />
            </div>
        </>
    )
}