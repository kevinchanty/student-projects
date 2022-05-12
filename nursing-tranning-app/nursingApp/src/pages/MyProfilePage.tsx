import { IonBackButton, IonButtons, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import Bio from '../components/Profile/Bio';
import ProfileCard from '../components/Profile/ProfileCard';

const MyProfilePage: React.FC = () => {
    const paras = useParams<{ userId: string }>();
    const history = useHistory()
    const token = localStorage.getItem('token')

    let user_id:number;
    if (token) {
        let payload:{id:number} = jwtDecode(token)
        user_id = payload.id
        
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>My Profile</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">My Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonGrid>
                    <IonRow>
                        <Bio />
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <ProfileCard user_id={user_id!}/>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default MyProfilePage;
