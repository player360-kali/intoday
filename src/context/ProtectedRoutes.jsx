import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const pageLoading = false;

    if (pageLoading) {
        return <Loading />;
    }

    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;