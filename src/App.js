import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
// import './assets/css/main.css';
import './assets/scss/main.scss'

import ToyIndex from './views/toy-index';
import ToyEdit from './views/toy-edit';
import ToyDashboard from './views/toy-dashboard.jsx';
import AppHeader from './cmps/app-header';
import HomePage from './views/home-page.jsx'
import AboutUs from './views/about-us.jsx'


function App() {
  return (
    <Provider store={store}>
    <Router>
        <section className="main-layout app">
            <AppHeader />
            <main>
                <Routes>
                    <Route element={<HomePage />} path="/" />
                    <Route element={<AboutUs />} path="/about" />
                    <Route element={<ToyIndex />} path="/toy" />
                    <Route element={<ToyEdit />} path="/toy" />
                    <Route element={<ToyEdit />} path="/toy/:toyId" />
                    <Route element={<ToyDashboard />} path="/dashboard" />
                </Routes>
            </main>
        </section>
    </Router>
</Provider>
  );
}

export default App;
