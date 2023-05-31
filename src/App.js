import './App.css';
import { useLocation } from 'react-router-dom';
import { Route, Routes } from'react-router-dom';
import StartPage from './components/frontscreen/StartPage';
import MainSite from './components/mainsite/MainSite';
import FindFriends from './components/mainsite/FindFriends';
import MyProfile from './components/mainsite/MyProfile';
import Nav from './components/mainsite/Nav';


function App() {
  const location = useLocation()
  return (
    <div className="App">
      {location.pathname === '/' ? null: <Nav />}
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/MainSite" element={<MainSite />} />
        <Route path="/FindFriends" element={<FindFriends />} />
        <Route path="/MyProfile" element={<MyProfile />} />
      </Routes>
    </div>
  );
}

export default App;
