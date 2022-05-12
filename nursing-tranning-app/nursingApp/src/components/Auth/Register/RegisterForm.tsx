//prettier-ignore
import { IonButton, IonCheckbox, IonCol, IonGrid, IonIcon, IonItem, IonInput, IonItemDivider, IonItemGroup, IonLabel, IonList, IonRow, IonTitle, IonText, IonButtons, useIonToast, IonAvatar } from "@ionic/react";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkmarkCircleOutline } from "ionicons/icons";
import { RootState } from "../../../redux/store";
import { signupFailed as signUpFailed } from "../../../redux/auth/action";
import { SignUp } from "../../../redux/auth/thunk";
import { emailRegex } from "../../../helpers/regex";
import styles from "../Login/Login.module.scss";
import { API_SERVER } from "../../../helpers/api";
import { usePhotoGalleryOne } from "../../../hooks/usePhotoGallery";

export default function RegisterTab() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [reenterEmail, setReEnterEmail] = useState("");
    const [present, dismiss] = useIonToast();
    const dispatch = useDispatch();
    const { photos, takePhoto, resetPhotos } = usePhotoGalleryOne();



    const error = useSelector((state: RootState) => state.auth.error);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!emailRegex.test(email)) {
            present({
                message: "incorrect email format",
                duration: 2 * 1000,
                color: "danger",
            });
            return;
        }
        if(!name || !photos) {
            present({
                message: "Please insert all details and upload a picture.",
                duration: 2 * 1000,
                color: "danger",
            });
            return;
        }
        dispatch(SignUp(email, name,bio, photos!));
    }

    return (
        <>
            <IonItemGroup className={styles.formContainer}>
                <form onSubmit={submit}>
                    <IonList>
                        <IonItemDivider color="white">
                            <IonText color="primary">Registration</IonText>
                        </IonItemDivider>
                        <IonItem>
                            {/* <IonLabel color="primary" position="floating">
                                Profile Picture
                            </IonLabel> */}
                            {photos
                                ? (<div className="ion-text-center" style={{ margin: "0 0.5em" }}>
                                    <IonAvatar>
                                        <img
                                            src={
                                                photos?.dataUrl
                                            }
                                        />
                                    </IonAvatar>
                                </div>)
                                : ""}
                            {photos
                                ? (<IonButton onClick={() => takePhoto()}>
                                    Retake
                                </IonButton>)
                                : (<IonButton onClick={() => takePhoto()}>
                                    Upload Profile
                                </IonButton>)
                            }
                        </IonItem>
                        <IonItem>
                            <IonLabel color="primary" position="floating">
                                Username
                            </IonLabel>
                            <IonInput
                                className={styles.inputDiv}
                                onIonChange={(e) =>
                                    setName(e.detail.value as string)
                                }
                                required
                            ></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonLabel color="primary" position="floating">
                                First Name
                            </IonLabel>
                            <IonInput required></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonLabel color="primary" position="floating">
                                Last Name
                            </IonLabel>
                            <IonInput required></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonLabel color="primary" position="floating">
                                Email
                            </IonLabel>
                            <IonInput
                                required
                                onIonChange={(e) => {
                                    setEmail(e.detail.value as string);
                                }}
                            ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel color="primary" position="floating">
                                Bio
                            </IonLabel>
                            <IonInput
                                required
                                onIonChange={(e) => {
                                    setBio(e.detail.value as string);
                                }}
                            ></IonInput>
                        </IonItem>


                        <IonButton
                            className={styles.signUpButton}
                            fill="outline"
                            color="primary"
                            type="submit"
                        >
                            <IonIcon icon={checkmarkCircleOutline} slot="end" />
                            Sign Up
                        </IonButton>
                    </IonList>
                </form>
                {error ? error : null}
            </IonItemGroup>
        </>
    );
}
