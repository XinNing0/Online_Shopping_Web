import './App.scss';
import NewProduct from "./mainPage/NewProduct";
import Header from "./Header";
import Footer from "./mainPage/Footer";
import feedback from './assets/images/feedback.jpeg'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SingleProduct} from "./singleProductPage/SingleProduct";
import {useSelector} from "react-redux";
import ShoppingCartContent from "./singleProductPage/ShoppingCartContent";
import {PaypalSuccess} from "./myBag/PaypalSuccess";
import {Checkout} from "./loginPage/Checkout";

function App() {
    const viewZoomIn = useSelector(state=>state.fetchOneProductReducer.zoom)
    return (
        <BrowserRouter>
            <div className="App">
                <div className='Feedback'>
                    <img src={feedback} alt='Feedback image'  className='FeedbackBtn'/>
                </div>

                {!viewZoomIn && <Header/>}


                <Routes>
                    <Route path="/" element={<NewProduct/>} />
                    <Route path="/single-product/:productId" element={<SingleProduct />} />
                    <Route path='/cart' element={<ShoppingCartContent/>} />
                    <Route path='/paymentSuccess' element={<PaypalSuccess/>} />
                    <Route path='/checkout' element={<Checkout />}/>
                </Routes>

                {!viewZoomIn && <Footer/>}


            </div>
        </BrowserRouter>
    );
}

export default App;
