import { Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Static route - always allow access
  return <Outlet />;
};

export default ProtectedRoute;