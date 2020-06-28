import React ,{ useState,useEffect }from 'react';
import PhotoGallery from 'react-photo-gallery';
import { uploadPhoto } from './api';
import Header from './header.component';


function AppContainer() {
    const photos = [{
            src: 'http://placekitten.com/200/300',
            width: 3,
            height: 4,
        },
        {
            src: 'http://placekitten.com/200/200',
            width: 1,
            height: 1,
        },
        {
            src: 'http://placekitten.com/300/400',
            width: 3,
            height: 4,
        },
    ];

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