import axios from 'axios';
import {create} from 'zustand';

const useAuthStore = create((set) => ({
  // Initialize the secretKey from local storage (if present)
  secretKey: localStorage.getItem('POST.dev@accessToken') || null,
  profile: null,
  loading: false,
  error: null,

  // Action: Login (simulate API call and save secretKey)
  login: async (loginData) => {
    const loginRes = await axios.post("http://localhost:8080/api/users/login", loginData);
    console.log(loginRes);
    if(loginRes.data.success){
      localStorage.setItem("POST.dev@accessToken", loginRes.data.data.uid);
      return {...loginRes.data.data, status:loginRes.status};
    }else{
      console.log(loginRes.data.success)
      return {...loginRes.data.success, status:loginRes.status};
    } 
  },

  // Action: Logout
  logout: () => {
    localStorage.removeItem('secretKey');
    set({ secretKey: null, profile: null });
  },

  // Action: Fetch profile data using the stored secret key
  fetchProfile: async () => {
    const key = localStorage.getItem('secretKey');
    if (!key) return; // no secretKey, so don't fetch
    set({ loading: true, error: null });
    try {
      // Replace with your actual API call
      const profileData = await fakeFetchProfileApi(key);
      set({ profile: profileData });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));


export default useAuthStore;
