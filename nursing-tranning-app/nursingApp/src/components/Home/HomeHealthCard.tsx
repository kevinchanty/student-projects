import { IonCol, IonGrid, IonIcon, IonImg, IonItemDivider, IonLabel, IonRow } from '@ionic/react'
import { cashSharp, personCircleOutline, personCircleSharp, pulseSharp } from 'ionicons/icons'
import React, { ReactElement } from 'react'

interface Props {

}

export default function HomeHealthCard({ }: Props): ReactElement {
    return (
        <div></div>
        // <IonGrid>
        //     <IonRow color="primary">
        //         <IonCol>
        //             <IonImg src="https://picsum.photos/300"></IonImg>
        //         </IonCol>

        //         <IonItemDivider color="light">
        //             <IonLabel color="primary">
        //                 <div> <IonIcon icon={personCircleSharp} /> sandiegirl</div>
        //                 <div> <IonIcon icon={cashSharp} /> 10000</div>
        //                 <div> <IonIcon icon={pulseSharp} /> 100</div>
        //             </IonLabel>
        //         </IonItemDivider>

        //     </IonRow>
        // </IonGrid>
    )
}

// {
//     username: "sandiegirl",
//     email: "sandiegirl@tecky.io",
//     is_active: true,
//     score: 13999,
//     glycemic_index: 99,
//     finished_all_mc: false,
//     biography: "Hello, I am programmer.\nYou are not programmer.",
//     is_poly: true,
//     profile_picture: "https://picsum.photos/300",
//     gym_quota: 2,
// },