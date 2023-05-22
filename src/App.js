import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import './assets/css/main.css';

import ToyIndex from './views/toy-index';
import ToyEdit from './views/toy-edit';
// import AppHeader from './cmps/app-header';



function App() {
  return (
    <Provider store={store}>
    <Router>
        <section className="main-layout app">
            {/* <AppHeader /> */}
            <main>
                <Routes>
                    {/* <Route element={<HomePage />} path="/" />
                    <Route element={<AboutUs />} path="/about" /> */}
                    <Route element={<ToyIndex />} path="/toy" />
                    <Route element={<ToyEdit />} path="/toy" />
                    <Route element={<ToyEdit />} path="/toy/:toyId" />
                </Routes>
            </main>
        </section>
    </Router>
</Provider>
  );
}

export default App;
