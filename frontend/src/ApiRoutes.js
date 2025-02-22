export const REGISTER_NEW_USER_URL = `${import.meta.env.VITE_API_BASE_URL}api/users/register/newuser` 
export const LOGIN_USER_URL = `${import.meta.env.VITE_API_BASE_URL}api/users/login`

export const GET_PROFILE_BY_ID_URL = (uid) => {
    return `${import.meta.env.VITE_API_BASE_URL}api/users/${uid}/profile`
}

export const UPDATE_USER_PROFILE_URL = (uid) => {
    return `${import.meta.env.VITE_API_BASE_URL}api/users/${uid}/profile/update`
}

export const GET_ALL_POST_URL = `${import.meta.env.VITE_API_BASE_URL}api/posts/allPosts`

export const UPLOAD_POST_URL = `${import.meta.env.VITE_API_BASE_URL}api/posts/newPost`
