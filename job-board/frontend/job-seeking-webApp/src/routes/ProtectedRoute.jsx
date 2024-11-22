import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/userAuthentication";

function ProtectedRoute({ children, allowedUserTypes }) {
    const userType = useAuthStore((state) => state.userType);
    const token = useAuthStore((state) => state.token);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedUserTypes.includes(userType)) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
