import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import ProtectedRoute from './pages/ProtectedRoute';
import PageLoading from './pages/PageLoading';
import Feed from './pages/Feed/Feed';
import Explore from './pages/Explore/Explore';
import Notifications from './pages/Notifications/Notifications';
import Messages from './pages/Messages/Messages';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import Lists from './pages/Lists/Lists';
import Profile from './pages/Profile/Profile';
import More from './pages/More/More';
import LiveStream from './pages/Live-stream/LiveStream';
import Room from './pages/Live-stream/Room';
import WeatherApp from './pages/DynamicTheme/index.js';
import Subscriptions from './pages/Subcriptions/index.js';
import Payment from './pages/Subcriptions/payment.js';

function App() {
  return (
    <div className="App">
      <WeatherApp />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}>
            <Route index element={<Feed />} />
          </Route>
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>}>
            <Route path='feed' element={<Feed />} />
            <Route path='explore' element={<Explore />} />
            <Route path='notifications' element={<Notifications />} />
            <Route path='messages' element={<Messages />} />
            <Route path='bookmarks' element={<Bookmarks />} />
            <Route path='lists' element={<Lists />} />
            <Route path='profile' element={<Profile />} />
            <Route path='more' element={<More />} />
            <Route path='live-stream' element={<Room />} />
            <Route path='subscription' element={<Subscriptions />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/page-loading' element={<PageLoading />} />
          <Route path='/live/:roomId' element={<LiveStream />} />
          <Route path='/payment/:plan/:price' element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
