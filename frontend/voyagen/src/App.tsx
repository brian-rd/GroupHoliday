import { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

// Import pages
import Register from './pages/Register';


function App() {

  const location = useLocation();

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.style.scrollBehavior = 'auto';
      window.scroll({ top: 0 });
      htmlElement.style.scrollBehavior = '';
    }
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;