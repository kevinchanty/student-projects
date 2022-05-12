import React, { useState, useEffect } from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea, IonThumbnail, IonToggle, useIonRouter } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { usePhotoGallery } from "../../../hooks/usePhotoGallery";
import styles from "./AddCard.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import '@beenotung/tslib/image'
import '@beenotung/tslib/file'
import { addPostThunk, getQuotaThunk } from "../../../redux/photoFeed/thunk";


const AddCard: React.FC = () => {
    const dispatch = useDispatch()
    const [caption, setCaption] = useState<string>("")
    const [visibility, setVisibility] = useState(false)
    const redirect = useSelector((state: RootState) => state.photoFeed.redirect)
    const router = useIonRouter();
    const { photos, takePhoto, resetPhotos } = usePhotoGallery();

    const quota = useSelector((state: RootState) => state.photoFeed.quota)

    function onFormReset() {
        setCaption("");
        setVisibility(false);
        resetPhotos();
    }

    async function upload() {
        dispatch(addPostThunk({
            caption,
            visibility,
            images: photos
        }));
    }

    useEffect(() => {
        dispatch(getQuotaThunk())
    }, []);

    useEffect(() => {
        if (redirect) {
            router.push("/PhotoFeed");

        }
    }, [redirect]);

    return (
        <IonCard className={styles.newPostCard}>

            {photos.map((photo, i) =>
                <div key={i} style={{
                    height: '300px', backgroundImage: 'url(' + photo.dataUrl + ')'
                    , backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} />
            )}

            <div className={styles.Camera} onClick={takePhoto}>
                <IonIcon icon={addOutline} className={styles.AddIcon} />
            </div>
            <IonCardContent>
                <IonItemGroup>
                    <IonList>
                        <IonItem>
                            <IonLabel color="primary" position="floating">Comments</IonLabel>
                            <IonInput
                                required
                                value={caption}
                                onIonChange={e => setCaption((e.target as HTMLTextAreaElement).value)}
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel color="primary">Meal</IonLabel>
                            {/* onIonChange={e => setGender(e.detail.value)} */}
                            <IonSelect value={"Meal"} placeholder="Select One" >
                                <IonSelectOption color="primary" value="breakfast">Breakfast</IonSelectOption>
                                <IonSelectOption color="primary" value="lunch">Lunch</IonSelectOption>
                                <IonSelectOption color="primary" value="dinner">Dinner</IonSelectOption>
                            </IonSelect>
                            {/* onIonChange={e => setSelected(e.detail.value)} */}
                        </IonItem>
                        {/* <IonItemDivider color="white">------------------</IonItemDivider> */}
                        <IonItem>
                            <IonLabel color="primary">Anonymous</IonLabel>
                            <IonToggle />
                        </IonItem>

                        <IonButton
                            className={styles.uploadButton}
                            fill="outline"
                            onClick={upload}>
                            Submit
                        </IonButton>
                        <IonText color="primary">
                            <h6>*Today Limit {quota}/3</h6></IonText>
                    </IonList>

                </IonItemGroup>

            </IonCardContent>
        </IonCard>
    )
}

export default AddCard