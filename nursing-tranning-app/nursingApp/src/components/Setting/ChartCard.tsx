import React, { ReactElement, useState, useEffect } from 'react'
import { IonList, IonItem, IonCol, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonLabel, IonDatetime, IonItemGroup, IonText } from '@ionic/react';
import { Bar } from 'react-chartjs-2'
import { ChartData } from 'chart.js'
import { get } from '../../helpers/api';

interface Props {
    type?: string
    children?: React.ReactNode
}

const dataDefault: ChartData<"bar", number[], unknown> = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Cyan'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3, 7],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(1, 235, 255, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(1, 235, 255, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

export default function ChartCard(props: Props): ReactElement {
    const [mode, setMode] = useState<"day" | "week" | "month">("day");
    const [startDate, setStartDate] = useState<Date>(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    const [endDate, setEndDate] = useState<Date>(new Date(Date.now()));
    const [data, setData] = useState<ChartData<"bar", number[], unknown>>(dataDefault);
    const modeArr: ["day", "week", "month"] = ["day", "week", "month"];

    function switcher() {
        const original = modeArr.indexOf(mode)
        setMode(modeArr[(original + 1) % 3])
    };

    async function fetchData() {
        const result = await get(`/analytics/barChart/login?sd=${startDate.toISOString()}&ed=${endDate.toISOString()}`);

        if (!result.error) {
            setData(result);
        }
    };

    useEffect(() => {
        fetchData()
    }, [startDate, endDate])

    // new Date().toISOString().slice(0,10)

    return (
        <IonCol size="12">
            <IonCard>
                <IonCardContent>
                    <IonItemGroup>
                        <IonItem className="ion-no-padding" lines='none'>
                            <IonCardTitle>
                                <IonText color="primary"><h2><b>No. of Logins: </b></h2></IonText>
                            </IonCardTitle>
                        </IonItem>
                        <IonItem className="ion-no-padding">
                            <IonCol size="6">
                                <IonText><h5>Start Date:</h5></IonText>
                                <IonText><h5><IonDatetime slot="start" displayFormat="DD-MM-YY" placeholder="Select Date" value={startDate.toString()} onIonChange={e => setStartDate(new Date(e.detail.value!))} /></h5></IonText>
                            </IonCol>

                            <IonCol size="6">
                                <IonText><h5>End Date:</h5></IonText>
                                <IonText><h5><IonDatetime slot="start" displayFormat="DD-MM-YY" placeholder="Select Date" value={endDate.toString()} onIonChange={e => setEndDate(new Date(e.detail.value!))} /></h5></IonText>
                            </IonCol>
                        </IonItem>
                    </IonItemGroup>
                    <Bar data={data} />
                </IonCardContent>
            </IonCard>
        </IonCol>
    )
};
