import './App.css';
import Login from './components/login';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import ChatRoom from './components/ChatRoom';
import AuthProvider from './context/AuthProvider';
import AppProvider from './context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModal from './components/Modals/InviteMemberModal';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route element={<Login />} path='/login' />
            <Route element={<ChatRoom />} path='/' />
          </Routes>
          <AddRoomModal />
          <InviteMemberModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  )

}

export default App;

/**
 * run firebase emulator: firebase emulators:start
 */