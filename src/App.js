import './style/App.scss';
import { useLocation } from 'react-router-dom';
import { Route, Routes } from'react-router-dom';
import StartPage from './components/frontscreen/StartPage';
import MainSite from './components/mainsite/MainSite';
import FindFriends from './components/mainsite/FindFriends';
import MyProfile from './components/mainsite/MyProfile';
import Nav from './components/mainsite/Nav';
import EditUser from './components/mainsite/EditUser';
import ProfilePage from './components/mainsite/ProfilePage'
import RequestPage from './components/mainsite/RequestPage';
import AllFriends from './components/mainsite/AllFriends';


function App() {
  const location = useLocation()
  return (
    <div className="App">
      {location.pathname === '/' ? null: <Nav />}
      {location.pathname === '/' ? null: 
      <h1>The Social Sphere</h1>}
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/MainSite" element={<MainSite />} />
        <Route path="/FindFriends" element={<FindFriends />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/EditUser" element={<EditUser />} />
        <Route path="/Requests" element={<RequestPage />} />
        <Route path="/AllFriends/:id" element={<AllFriends />} />
        <Route path="/:userId" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
