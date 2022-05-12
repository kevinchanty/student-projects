import { IonCard, IonCardContent, IonCardHeader, IonCol, IonGrid, IonImg, IonRow, IonText } from '@ionic/react';
import React, { ReactElement } from 'react';
import styles from ".//DietCard.module.scss"
import { DietPost } from './DietTab';
import RatingStar from './RatingStar';

export default function DietCard(props: DietPost): ReactElement {
    const averageRating = props.ratings.reduce((temp,rate,_,array) => {
        temp += rate/array.length
        return temp
    },0)

    return (
        <IonCard className={styles.DietCard}>
            <IonCardHeader>{new Date(props.day).toDateString()}</IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                    {props.images.map((item, index) => 
                        <IonCol key={index} size="12" sizeSm="4">
                        <IonImg src={item} />
                        </IonCol>)
                    }
                    </IonRow>
                    {/* TODO: caption */}
                    <IonRow>
                        <IonCol className={styles.End}>
                            <IonText>Rating of the day:</IonText>
                            <RatingStar rating={averageRating}/>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    )
}
