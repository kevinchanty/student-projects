import { ReactElement } from 'react'
import { IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Analytics from '../../components/Setting/Analytics';

interface Props {

}
const AnalyticsPage = ({ }: Props): ReactElement => {
    const TITLE = "Analytics" // INSERT YOUR TITLE

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/AdminPanel"/>
                    </IonButtons>
                    <IonTitle>{TITLE}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{TITLE}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {/* YOUR COMPONENTS: */}
                <Analytics/>
            </IonContent>
        </IonPage>
    );
};

export default AnalyticsPage;