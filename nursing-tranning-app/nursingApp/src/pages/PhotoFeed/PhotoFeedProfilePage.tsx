import { IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import FeedDetails from '../../components/PhotoFeed/FeedDetails';
import ProfileFeed from '../../components/PhotoFeed/ProfileFeed';

// NAME THE COMPONENT
const PhotoFeedProfilePage: React.FC = () => {
    const TITLE = "My Posts" 

    const user_id = +useParams<any>().searchId

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        {/* <IonMenuButton /> */}
                        <IonBackButton defaultHref="/PhotoFeed"/>
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
                <FeedDetails/>
                <ProfileFeed user_id={user_id}/>
            </IonContent>
        </IonPage>
    );
};

export default PhotoFeedProfilePage;
