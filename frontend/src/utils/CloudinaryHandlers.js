import axios from "axios";

export const UploadPicture = async (Picture) => {
    try {
        console.log(Picture)

        const data = new FormData();
        data.append("file", Picture);
        data.append("upload_preset", "test_preset")
        data.append("cloud_name", "dbc5dhyru")

        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dbc5dhyru/image/upload", data);
        return uploadRes.data.secure_url
    } catch (error) {
        return null
    }
}