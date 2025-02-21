import axios from "axios";
import { UserProfileStorageGetter, UserProfileStorageSetter } from "./localStorageEncrypter";
import { useUserStore } from "../store/useAuthStore";



export const LoginUser = async (loginData) => {
    try {
        const loginRes = await axios.post("http://localhost:8080/api/users/login", loginData);
        console.log(loginRes);
        if (loginRes.data.success) {
            localStorage.setItem("POST.dev@accessToken", loginRes.data.data.uid);
            return { ...loginRes.data.data, status: loginRes.status };
        } else {
            console.log(loginRes.data.success);
            return { ...loginRes.data.success, status: loginRes.status };
        }
    } catch (error) {
        console.log({ status: 500, message: error.response.data.message.replace("Firebase: ", "") });
        return { status: 500, message: error.response.data.message};
    }
}


export const FetchUserProfile = async () => {
    const { setUser } = useUserStore.getState();
    const uid = localStorage.getItem('POST.dev@accessToken');
    try {
        const response = await axios.get(
            `https://post-dev.onrender.com/api/users/${uid}/profile`,
            {
                headers: { Authorization: uid },
            }
        );
        const profileData = response.data.data;

        // Construct the new profile object
        const newProfile = {
            username: profileData.username || '',
            fullName: `${profileData.firstname || ''} ${profileData.lastname || ''}`.trim(),
            email: profileData.email || '',
            avatar: profileData.avatar || generateAvatar(profileData.username),
            bio: profileData.bio || '',
            title: profileData.title || '',
            followersCount: profileData.followers_count || 0,
            followingCount: profileData.following_count || 0,
            socialLinks: {
                twitter: profileData.socialLinks?.twitter || '',
                github: profileData.socialLinks?.github || '',
                portfolio: profileData.socialLinks?.portfolio || ''
            }
        };

        // Return the new profile object with a status
        setUser(newProfile);
        UserProfileStorageSetter("postDevUserConfigs", { ...newProfile, status:201 })
        return { ...newProfile, status: 201 };
        
    } catch (error) {
        console.error('Profile fetch error:', error);
        return { ...error, status: 500 };
    }
}