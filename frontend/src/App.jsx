import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import Articles from './pages/Articles';
import Profile from './pages/Profile';
import ArticlePage from './pages/ArticlePage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signin' element={<SignIn />}/>
          <Route path='/articles' element={<Articles />} />
          <Route path='/profile' element={<Profile />}/>
          <Route path='/article/:id' element={<ArticlePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
