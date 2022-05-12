import React, { ReactElement, useState, useEffect } from 'react'
import { IonList, IonItem, IonLabel, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonInput, IonText } from '@ionic/react';
import { ChartOptions } from 'chart.js';
import ChartCard from './ChartCard';
import NewSignUp from './AnalyticsCard/NewSignUp';
import { get } from '../../helpers/api'


interface Props {

}

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Logins',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};


const options: ChartOptions = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
}

export default function Analytics({ }: Props): ReactElement {
    const [username, setUsername] = useState<string>("")
    const [resultList, setResultList] = useState<{ username: string, id: number }[]>([]);

    const fetchSearch = async () => {
        const result = await get(`/analytics/UserByName?name=${username}`)
        setResultList(result);
    }

    useEffect(() => {
        if (username) {
            fetchSearch();
        } else {
            setResultList([])
        }
    }, [username])
    return (
        <IonGrid>
            <IonRow>

                <IonCol size="12">
                    <IonCard>
                        <IonCardContent>
                            <IonItem lines="none" className="ion-no-padding">
                                <IonLabel position="floating">
                                   <IonText color="primary"><b>Check Specific User: </b></IonText> 
                                </IonLabel >
                                <IonButton fill="outline" size="default" slot="end" onClick={() => setUsername("")}>Clear</IonButton>
                                <IonInput color="tertiary" placeholder="Username" value={username} onIonChange={(e) => setUsername(e.detail.value!)}></IonInput>
                            </IonItem>
                            {/* <IonItem className="ion-no-padding">
                            </IonItem> */}
                            {resultList.map(result => (
                                <IonItem className="ion-no-padding" routerLink={`/AdminPanel/Analytics/UserStatus/${result.id}`} key={result.id}>
                                    <IonLabel><IonText color="primary">{result.username}</IonText></IonLabel>
                                    <IonLabel slot="end"><IonText color="primary">{String(result.id).padStart(5, '0')}</IonText></IonLabel>
                                </IonItem>
                            ))}
                        </IonCardContent>

                    </IonCard>
                </IonCol>

                <NewSignUp />

                <ChartCard type="login" />

                {/* <IonCol size="12">
                    <IonCard>
                        <IonCardContent>
                            <IonItem className="ion-no-padding">
                                <IonCardTitle>
                                <IonText color="primary"><h2><b>Summary of Photo Feed Usage:</b></h2></IonText> 
                                </IonCardTitle>
                                <IonButton fill="outline" slot="end">Total</IonButton>
                            </IonItem>
                            <div style={{ display: 'flex' }}>
                                <div style={{ flex: 1, textAlign: 'center' }}>
                                    <div><p>Total No. of Post:</p>
                                        <p>500</p>
                                    </div>
                                </div>
                                <div style={{ flex: 1, textAlign: 'center' }}>
                                    <div><p>Total No. of Stars:</p>
                                        <p>500</p>
                                    </div>
                                </div>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonCol> */}




            </IonRow>
        </IonGrid>
    )
}

