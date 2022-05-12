import { IonButton, IonCard, IonCardContent, IonCardTitle, IonCol, IonItem, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import { useState, useEffect } from 'react'
import { get } from '../../../helpers/api';

export default function NewSignUp() {
    const [mode, setMode] = useState<"day" | "week" | "month">("day")
    const [data, setData] = useState<{ day: number, week: number, month: number }>({
        "day": 0,
        "week": 0,
        "month": 0
    })
    const modeArr:["day" , "week" , "month"] = ["day" , "week" , "month"];
    const currentMonth = new Date().toLocaleDateString([], { month: 'short' });

    const modeText = {
        day: "last 24 hours",
        week: "last 7 days",
        month: currentMonth,
    }

    async function fetchData() {
        const result = await get('/analytics/newUser');
        setData(result);
    }

    function switcher() {
        const original = modeArr.indexOf(mode)
        setMode(modeArr[(original+1)%3])
    }

    useEffect(() => {
        fetchData();
    }, [])


    return <IonCol size="12">
        <IonCard>
            <IonCardContent>
            <IonItem className="ion-no-padding">
                <IonCardTitle>
                   <IonText color="primary"><h2><b>No. of New User Sign Up:</b></h2></IonText> 
                </IonCardTitle>
                <IonButton fill="outline" slot="end" style={{ textTransform: 'uppercase' }}
                    onClick={()=> switcher() }>
                    {mode}
                </IonButton>
            </IonItem>
                <div style={{ textAlign: 'center' }}>
                    <IonText color="primary"><p style={{fontSize:"2.5rem", fontWeight:"bold"}}>{data[mode]}</p></IonText>
                    <IonText color="primary"><p>New User in {modeText[mode]}</p></IonText>
                </div>
            </IonCardContent>
        </IonCard>
    </IonCol >;
}
