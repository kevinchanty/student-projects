import { useState } from 'react';
import { isPlatform } from '@ionic/react';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { compressMobilePhoto, dataURItoBlob, dataURItoMimeType, toImage } from '@beenotung/tslib/image';
import { selectImage } from '@beenotung/tslib/file';

export interface UserPhoto {
  dataUrl: string;
  file: File
}

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);
  const takePhoto = async () => {
    // const cameraPhoto = await Camera.getPhoto({
    //   resultType: CameraResultType.DataUrl,
    //   source: CameraSource.Camera,
    //   quality: 100,

    // });

    let files = await selectImage({ multiple: true, capture: true })

    for (let file of files) {
      // alert(JSON.stringify(file))
      let dataUrl = await compressMobilePhoto({ image: file })
      let mimeType = dataURItoMimeType(dataUrl)
      let ext = '.' + mimeType.split('/').pop()
      const filename = new Date().getTime() + '-' + file.name + ext;
      let blob = dataURItoBlob(dataUrl)
      file = new File([blob], filename, { lastModified: file.lastModified, type: mimeType })
      setPhotos([...photos, { dataUrl, file }])
    }
  };

  const resetPhotos = () => {
    setPhotos([])
  }

  return {
    photos,
    takePhoto,
    resetPhotos
  };
}

export function usePhotoGalleryOne() {
  const [photos, setPhotos] = useState<UserPhoto>();
  const takePhoto = async () => {

    let files = await selectImage({ multiple: true, capture: true })

    for (let file of files) {
      // alert(JSON.stringify(file))
      let dataUrl = await compressMobilePhoto({ image: file })
      let mimeType = dataURItoMimeType(dataUrl)
      let ext = '.' + mimeType.split('/').pop()
      const filename = new Date().getTime() + '-' + file.name + ext;
      let blob = dataURItoBlob(dataUrl)
      file = new File([blob], filename, { lastModified: file.lastModified, type: mimeType })
      setPhotos({ dataUrl, file })
    }
  };

  const resetPhotos = () => {
    setPhotos(undefined)
  }

  return {
    photos,
    takePhoto,
    resetPhotos
  };
}
