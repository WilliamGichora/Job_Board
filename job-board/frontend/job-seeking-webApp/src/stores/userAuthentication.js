import { create } from "zustand";

const useAuthStore = create((set) => ({
    userType: localStorage.getItem("userType") || null,
    token: localStorage.getItem("token") || null,      

    setUserType: (type) => {
        localStorage.setItem("userType", type);          
        set({ userType: type });                         
    },

    setToken: (token) => {
        localStorage.setItem("token", token);
        set({ token });
    },

    clearAuthData: () => {
        localStorage.removeItem("userType");             
        localStorage.removeItem("token");                
        set({ userType: null, token: null });            
    },
}));

export default useAuthStore;
