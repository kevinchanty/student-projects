import { IonBackButton, IonButtons, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import Bio from '../components/Profile/Bio';
import ProfileCard from '../components/Profile/ProfileCard';

const ProfilePage: React.FC = () => {
    const paras = useParams<{ userId: string }>();
    const history = useHistory()
 
    
    const user_id = parseInt(paras.userId);
    const TITLE = user_id // INSERT YOUR TITLE

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonGrid>
                    <IonRow>
                        <Bio />
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <ProfileCard user_id={user_id}/>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ProfilePage;
