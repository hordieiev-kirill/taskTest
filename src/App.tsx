import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import NavigateMenu from './components/NavigateMenu';
import TopMenu from './components/TopMenu';
import Orders from './components/Orders';
import Products from './components/Products';

function App() {
  return (
    <Router>
      <div className="app">
        <TopMenu />
        <div className="main">
          <NavigateMenu />
          <main className="main-view">
            <Routes>
              <Route path="/" element={<Navigate to="/orders" replace />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
