import { create } from 'zustand';

const useAuthStore = create((set) => ({
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
    userType: localStorage.getItem('userType') || null,

    login: (userType) => {
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('userType', userType);
        set({ isLoggedIn: true, userType });
    },

    logout: () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userType');
        set({ isLoggedIn: false, userType: null });
    },
}));

export default useAuthStore;
