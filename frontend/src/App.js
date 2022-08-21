
import './App.css';
import Cart from './Components/cart/Cart';
import Navbar from './Components/Navbar';
import ProductsList from './Components/products/ProductsList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SingleProduct from './Components/products/SingleProduct';
import LoginForm from './Components/LoginForm';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path='/login' element={<LoginForm />} />
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
