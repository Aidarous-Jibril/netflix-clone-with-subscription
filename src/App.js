
import { Routes, Route} from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import Profile from './screens/Profile';
import SingUp from './screens/SingUp';


function App() {
  return (
    <>
  <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/signup' element={<SingUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
      <Footer />
  </AuthContextProvider>
    </>
  );
}

export default App;
