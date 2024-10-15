import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import WorkPage from './pages/WorkPage';
import SheetsPage from './pages/SheetsPage';
import ProtectedRoute from './context/ProtectedRoutes';
import Invite from './pages/Invite';
import Notifications from './components/Notifications';
import Notification from './pages/Notification';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />

        <Route path="/:workId" element={
          <ProtectedRoute>
            <WorkPage />
          </ProtectedRoute>
        } />

        <Route path="/:workId/:sheetId" element={
          <ProtectedRoute>
            <SheetsPage />
          </ProtectedRoute>
        } />

        <Route path="/invite" element={
          <ProtectedRoute>
            <Invite />
          </ProtectedRoute>
        } />

        <Route path="/notifications" element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } />

        <Route path="/notifications/:notificationId" element={
          <ProtectedRoute>
            <Notification />
          </ProtectedRoute>
        } />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<Register />} />

        <Route path='/*' element={(
          <>Not Found 404</>
        )} />
      </Routes>
    </>
  );
}

export default App;
