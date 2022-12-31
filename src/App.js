import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ManageCategoryView from "./manage-categories/manage-category-view";
import NavbarLayout from "./components/navbar-layout";
import {Route, Routes} from "react-router-dom";
import ManageProductsView from "./manage-products/manage-products-view";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className={"min-vh-100 bg-light"}>
        <NavbarLayout/>
        <div className={"container mt-5"}>
            <Routes>
                <Route path="/" element={<ManageCategoryView/>}/>
                <Route path="/manage-products" element={<ManageProductsView/>}/>
            </Routes>
        </div>
        <ToastContainer />
    </div>
  );
}

export default App;
