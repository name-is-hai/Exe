import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthenticationPage from './pages/Authentication/signin/page';
import RegisterPage from './pages/Authentication/signup/page';
import ChatPage from './pages/Chat/page';
import ContactPage from './pages/ContactPage/page';
import HomePage from './pages/HomePage/page';
import { RoomDetail } from './pages/RoomDetail/page';
import RoomPage from './pages/RoomPage/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/room"
            element={<RoomPage />}
          />
          <Route
            path="/room-detail"
            element={<RoomDetail />}
          />
          <Route
            path="/contact"
            element={<ContactPage />}
          />
          <Route
            path="/signin"
            element={<AuthenticationPage />}
          />
          <Route
            path="/signup"
            element={<RegisterPage />}
          />
          <Route
            path="/chat"
            element={<ChatPage />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
