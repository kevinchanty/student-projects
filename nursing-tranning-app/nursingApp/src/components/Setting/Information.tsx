import { IonCard, IonCardSubtitle, IonCardTitle, IonItemGroup, IonText } from "@ionic/react";


export function Information() {

    return (
        <IonItemGroup>
            <IonCard className="ion-padding ion-text-center" >
                <IonCardTitle color="primary" className="ion-margin">
                    Information
                </IonCardTitle>
                <IonCardSubtitle
                    className="ion-margin"
                    style={{ fontSize: "1em" }}
                    color="dark"
                >
                </IonCardSubtitle>
                <IonText color="black">
                    <h4>This project is funded by a University for enhancing the understanding of diabetes of students studying in the School of Nursing. As per their requirement, there will be 4 main features in the application including: a multi-player chess game, virtual marketplace, ig-like photo feed and pop-up quiz. Besides, there will be an admin panel for professors / TA to input questions for pop-up quiz and reviewing the performance of individual student.
            </h4>
            </IonText>
            </IonCard>
        </IonItemGroup>
    );
}

export default Information;
