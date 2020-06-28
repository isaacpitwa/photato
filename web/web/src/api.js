const API_URL = 'http://localhost:3001';

export async function getPhotos () {
    const response = await fetch(`${API_URL}/photo`);
    return response.json();
};

export async function uploadPhoto (file) {
    if (!file)
        return null; 

    const photoFormData = new FormData();

    photoFormData.append("photo", file);
    
    const response = await fetch(`${API_URL}/photo`, {
        method: 'POST',
        body: photoFormData,
    });

    return response.json();
};