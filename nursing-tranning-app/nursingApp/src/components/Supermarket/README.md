

 <IonCol key={index} sizeMd="3">
     <IonCard className={styles.cardGroup}>
         <IonImg src={samplePhoto} />
         <IonCardContent>
             <IonText color="dark">
                 <h5>
                     <IonIcon
                         slot="start"
                         icon={fastFoodOutline}
                     />{" "}
                     {item.item_name}
                 </h5>
             </IonText>
             <IonText color="dark">
                 <h5>
                     <IonIcon
                         slot="start"
                         icon={cashOutline}
                     />{" "}
                     {item.price}.00
                 </h5>
             </IonText>
         </IonCardContent>
         <IonCardContent>
             <IonButton
                 expand="block"
                 fill="outline"
                 color="primary"
                 onClick={() => {
                     cardItem(item);
                 }}
             >
                 <IonIcon
                     slot="start"
                     icon={cartOutline}
                 />
                 Purchase
             </IonButton>
         </IonCardContent>
     </IonCard>
 </IonCol>