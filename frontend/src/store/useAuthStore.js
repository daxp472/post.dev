import { create } from "zustand";
import { UserProfileStorageGetter } from "../utils/localStorageEncrypter";

export const useUserStore = create((set) => ({
    user: null,
    setUser: async () => {
        const updatedUser = (set.user)?JSON.parse((await UserProfileStorageGetter("postDevUserConfigs")).data):null;
        set({ user: updatedUser });
    },
    logout: () => set({ user: null }),
}));

// To use setUser function in another file
// import { useUserStore } from "../store/useAuthStore";
// const { setUser } = useUserStore();

