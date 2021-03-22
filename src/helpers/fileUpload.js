

export const fileUpload = async (file) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/bastvai/upload'

    // Configurando el form Data para realizar el fetch, como en postman
    const formData = new FormData();
    formData.append('upload_preset','react-journal');
    formData.append('file',file);

    try {
        const resp = await fetch(cloudUrl,{
            method: 'POST',
            body: formData
        });

        if ( resp.ok ){
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }else {
            // si no es ok se levanta un error
            throw await resp.json();
        }
    } catch (error) {
        throw error;
    }


}