//import logo from './logo.svg';
import { LoginPage } from './pages/backOffice/login'
import { HomePage } from './pages/backOffice/home/home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './redux';
import { Provider } from 'react-redux';
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<LoginPage/>}/>
            <Route exact path='/admin' element={<LoginPage/>}/>
            <Route exact path='/admin/home' element={<HomePage/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
