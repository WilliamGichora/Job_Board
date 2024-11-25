import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/userAuthentication";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuthStore();
    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
