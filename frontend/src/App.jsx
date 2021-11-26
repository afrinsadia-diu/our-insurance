import React, { createContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin/Admin';
import EventTasks from './components/Orders/MyOrders';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Order from './components/Login/Order';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AuthProvider from './Context/AuthProvider';

export const UserContext = createContext();

function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <PrivateRoute path="/order/:id">
                            <Order />
                        </PrivateRoute>
                        <PrivateRoute exact path="/my-order">
                            <EventTasks />
                        </PrivateRoute>
                        <PrivateRoute path="/admin">
                            <Admin />
                        </PrivateRoute>
                    </Switch>
                    <Footer />
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
