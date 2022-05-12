import { IonContent, IonPage } from '@ionic/react'
import 'react-router-dom'
import { Link, useLocation } from 'react-router-dom'


function NotFound() {
    const location = useLocation().pathname

    return (
        <IonPage>
            <IonContent>
            <div>
                <h2>404</h2>
                <p>Path <code>{location}</code> is not found.</p>
                <p>Happy Debugging!</p>
                <Link to="/">
                    Back To Home
                </Link>
            </div>
            </IonContent>
        </IonPage>
    )
}

export default NotFound