import { IonIcon } from '@ionic/react'
import { airplane, star, starOutline } from 'ionicons/icons'
import React, { ReactElement } from 'react'
import Rate from 'rc-rate'


interface Props {
    rating: number
}

export default function RatingStar(props: Props): ReactElement {
    const roundedRating = Math.floor(props.rating * 2) / 2 ;

    return (
            // <IonIcon icon={star}></IonIcon>
            <Rate value={roundedRating}  allowHalf={true} disabled={true}/>
    )
}
