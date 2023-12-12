import './App.css'
import Home from './routes/home'
import Nav from './components/layout/nav';
import '@ionic/react/css/core.css';

import { setupIonicReact } from '@ionic/react';

setupIonicReact();

function App() {
  return (
    <>
      <Nav/>
      <Home/>
    </>
  )
}

export default App
