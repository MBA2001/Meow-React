import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import './index.css';
import './responsive.css';
import NotFound from './pages/404';
import NavBar from './helpers/NavBar';
import AddCustomer from './pages/AddCustomer';
import ViewCustomers from './pages/ViewCustomers';
import ViewTransactions from './pages/ViewTransactions';
import Customer from './pages/Customer';
import CreateAccount from './pages/CreateAccount';
import CreateTransaction from './pages/CreateTransaction';
import AddEmployee from './pages/AddEmployee';
import ViewEmployees from './pages/ViewEmployees';
function App() {

  
  let allRoutes = ['','customers','addcustomer','transactions','customer','createaccount','createtransaction','addemployee','employees'];
  return (
    <div>
      
      <BrowserRouter>
      {allRoutes.includes(window.location.href.split('/')[3]) ? <NavBar/> : ""}
          <Routes>
            <Route path ='/' element={<HomePage/>} />
            <Route path ='/login' element={<Login/>} />
            <Route path ='/addcustomer' element={<AddCustomer/>} />
            <Route path ='/customers' element={<ViewCustomers/>} />
            <Route path ='/customer' element={<Customer/>} />
            <Route path ='/createaccount' element={<CreateAccount/>} />
            <Route path ='/addemployee' element={<AddEmployee/>} />
            <Route path ='/createtransaction' element={<CreateTransaction/>} />
            <Route path ='/employees' element={<ViewEmployees/>} />

            <Route path ='/transactions' element={<ViewTransactions/>} />
            <Route path ='*' element={NotFound()} />

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
