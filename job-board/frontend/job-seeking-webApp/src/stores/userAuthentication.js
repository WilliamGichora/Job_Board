import { create } from 'zustand';

const useAuthStore = create((set) => ({
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
    userType: localStorage.getItem('userType') || null,
    email:localStorage.getItem('email')||null,

    login: (userType,email) => {
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('userType', userType);
        localStorage.setItem('email', email);
        set({ isLoggedIn: true, userType,email });
    },

    logout: () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userType');
        localStorage.removeItem('email')
        set({ isLoggedIn: false, userType: null,email:null});
    },
}));

export default useAuthStore;
