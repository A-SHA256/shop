import {Routes, Route } from 'react-router-dom';
import ShopProvider from './providers/ShopProvider';
import Home from './pages/Home'
import Basket from './pages/Basket'
import Payment from './pages/Payment'

function App() {
  return (
    <ShopProvider>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/basket' element={<Basket />}/>
        <Route path='/payment' element={<Payment />}/>
      </Routes>
    </ShopProvider>
  );
}

export default App;
