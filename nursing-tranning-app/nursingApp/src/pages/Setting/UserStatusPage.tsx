import { ReactElement, useState, useEffect } from 'react'
import { IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import UserStatus from '../../components/Setting/UserStatus';
import { get } from '../../helpers/api'
import { useParams } from 'react-router';

interface Props {

}
const UserStatusPage = ({ }: Props): ReactElement => {
    const userId = useParams<{userId: string}>().userId ;
    const [user, setUserName] = useState<{username:string}>({username:""}); // INSERT YOUR TITLE

    const fetchName = async () => {
        const result = await get(`/user/profile/${userId}`) ;
        if (result) {
            setUserName(result)
        }
    };


    useEffect(() => {
        fetchName();
    }, [])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/AdminPanel/Analytics" />
                    </IonButtons>
                    <IonTitle>User Status of {user!.username}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">User Status of {user!.username}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {/* YOUR COMPONENTS: */}
                <UserStatus />
            </IonContent>
        </IonPage>
    );
};

export default UserStatusPage;