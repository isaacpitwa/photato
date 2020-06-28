import React ,{ useState,useEffect }from 'react';
import PhotoGallery from 'react-photo-gallery';
import { uploadPhoto ,getPhotos} from './api';
import Header from './header.component';


function AppContainer() {

    const [isUploading, setIsUploading] = useState(false);
    const [photos, setPhotos] = useState([]);
    
    useEffect(() => {
        if (!isUploading)
            getPhotos().then(setPhotos);
    }, [isUploading]);
    async function handlePhotoSelect (file) {
        setIsUploading(true);
        await uploadPhoto(file);
        setIsUploading(false);
    };

    return (
        <>
            <Header onPhotoSelect={handlePhotoSelect}    isUploading={isUploading}/>
            <PhotoGallery
                photos={photos}
            />
        </>
    );
}

export default AppContainer;