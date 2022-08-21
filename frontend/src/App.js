
import './App.css';
import Cart from './Components/cart/Cart';
import Navbar from './Components/Navbar';
import ProductsList from './products/ProductsList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SingleProduct from './products/SingleProduct';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/products/:id' element={<SingleProduct />} />
            <Route exact path='/' element={<ProductsList />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>



  );
}

export default App;
