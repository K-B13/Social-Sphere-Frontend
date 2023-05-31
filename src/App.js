import './App.css';
import { Route, Routes } from'react-router-dom';
import StartPage from './components/frontscreen/StartPage';
import MainSite from './components/mainsite/MainSite';
import HomePage from './components/mainsite/HomePage';
import FindFriends from './components/mainsite/FindFriends';
import MyProfile from './components/mainsite/MyProfile';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/MainSite" element={<MainSite />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/FindFriends" element={<FindFriends />} />
        <Route path="/MyProfile" element={<MyProfile />} />
      </Routes>
    </div>
  );
}

export default App;
