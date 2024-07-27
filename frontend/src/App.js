import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login'
import HomePage from './Pages/HomePage';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import PrivateRoutes from './components/routes/PrivateRoutes';
import PublicRoutes from './components/routes/PublicRoutes';
import ProfilePage from './Pages/ProfilePage';
import NotFound from './Pages/NotFound';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Settings from './Pages/Settings';
import SearchJobs from './Pages/SearchJobs';
import Jobs from './Pages/Jobs';
import MyApps from './Pages/MyApps';
import Help from './Pages/Help';
import Forgotpass from './Pages/forgotpass';
import ResetPass from './Pages/ResetPassword';
import Spinner from './components/shared/Spinner';


function App() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserFullname = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://baryoworkcopyapi.onrender.com/api/v1/user/get-user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFullname(response.data.user.fullname);
        setEmail(response.data.user.email);
      } catch (error) {
        console.error('Error fetching user fullname:', error);

      }
    };

    fetchUserFullname();

  }, []);


  const navigate = useNavigate()
  const handleLogout = () => {

    localStorage.clear();

    toast.success('Logout Successfully');

    navigate('/login');
    window.location.reload();
  };
  const location = useLocation();

  // Function to determine if the navigation should be hidden based on the current route
  const shouldHideNav = () => {
    return location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/Register' || location.pathname === '/' || location.pathname === '/forgotpass' || location.pathname.startsWith('/reset-password');
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLinkClick = () => {
    if (isNavOpen) {
      toggleNav(); // Close the navigation menu
    }
  };

  useEffect(() => {
    // Add or remove 'scroll-lock' class based on navigation state
    if (isNavOpen) {
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, [isNavOpen]);


  const [imageFilename, setImageFilename] = useState('place.png');
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://baryoworkcopyapi.onrender.com/api/v1/profile/get-profile',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const imageId = response.data.profile.image

        const imageResponse = await axios.get(
          `https://baryoworkcopyapi.onrender.com/api/v1/image/get-image/${imageId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        setImageFilename(imageResponse.data.image.image);

        // Extract experience IDs from the profile and fetch details

      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  return (
    <>
      {!shouldHideNav() && (
        <div className='hamburger-menu' onClick={toggleNav}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
          </svg>
          <div className='appnamenav'><p>BaryoWork</p></div>
          <div className='imgprof'>
            <Link to={'/profile'}><img src={`/assets/images/uploads/${imageFilename} `}></img></Link>
          </div>
        </div>
      )}
      <div className='flexy'>


        {(!shouldHideNav() || isNavOpen) && ( // Conditionally render the navigation
          <div className={`nav ${isNavOpen ? 'show' : ''}`}>
            <div className='upnav'>
              <div className='title'>
                <img src='/assets/images/navlogo.png' alt='logo'></img>
                <p>BaryoWork</p>
              </div>
              <div className='menu'>
                <Link to={'/dashboard'} onClick={handleLinkClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill icon" viewBox="0 0 16 16">
                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                  </svg>
                  Home
                </Link>
                <Link to={'/searchjobs'} onClick={handleLinkClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search icon" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                  Search
                </Link>
                <Link to={'/myapps'} onClick={handleLinkClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill icon" viewBox="0 0 16 16">
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                  </svg>
                  My Applications
                </Link>
                <Link to={'/hire'} onClick={handleLinkClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-briefcase-fill icon" viewBox="0 0 16 16">
                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5" />
                    <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z" />
                  </svg>
                  Hire
                </Link>
                <Link to={'/settings'} onClick={handleLinkClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-fill icon" viewBox="0 0 16 16">
                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                  </svg>
                  Settings
                </Link>
              </div>
            </div>
            <div className='downav'>
              <div className='menu'>
                <Link to={'/help'} onClick={handleLinkClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle-fill icon" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                  </svg>
                  Help
                </Link>
                <Link onClick={handleLogout}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-closed-fill icon" viewBox="0 0 16 16">
                    <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                  </svg>
                  Logout
                </Link>
              </div>
              <hr></hr>
              <div className='profd'>
                <Link to={'/profile'} onClick={handleLinkClick}>
                  <div className='imgprof'>
                    <img src={`/assets/images/uploads/${imageFilename} `}></img>
                  </div>
                  <div>{fullname && <p className='prof'>{fullname}</p>}
                    {email && <p className='prof emailt'>{email}</p>}</div>
                </Link>
              </div>


              <p className='textwicon dnav'>BaryoWork<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-c-circle icon" viewBox="0 0 16 16">
                <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512" />
              </svg> 2024</p>




            </div>
          </div>
        )}
        <div className={`content ${location.pathname === '/' ? 'no-padding' : ''}`}>
          <ToastContainer />
          <Routes>
            <Route path='/' element={<PublicRoutes><Login /></PublicRoutes>} />
            <Route path='/login' element={<PublicRoutes><Login /></PublicRoutes>} />
            <Route path='/register' element={<PublicRoutes><Register /></PublicRoutes>} />
            <Route path='/forgotpass' element={<PublicRoutes><Forgotpass /></PublicRoutes>} />
            <Route path='/reset-password/:id/:token' element={<PublicRoutes><ResetPass /></PublicRoutes>} />

            <Route path='/dashboard' element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />
            <Route path='/profile' element={<PrivateRoutes><ProfilePage /></PrivateRoutes>} />
            <Route path='/settings' element={<PrivateRoutes><Settings /></PrivateRoutes>} />

            <Route path='/notfound' element={<PrivateRoutes><NotFound /></PrivateRoutes>} />
            <Route path='/hire' element={<PrivateRoutes><Jobs /></PrivateRoutes>} />
            <Route path='/searchjobs' element={<PrivateRoutes><SearchJobs /></PrivateRoutes>} />
            <Route path='/myapps' element={<PrivateRoutes><MyApps /></PrivateRoutes>} />
            <Route path='/help' element={<PrivateRoutes><Help /></PrivateRoutes>} />

          </Routes>
        </div>
      </div >
    </>
  );
}

export default App;
