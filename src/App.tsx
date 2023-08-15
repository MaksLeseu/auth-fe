import React, {useEffect} from 'react';
import './App.css';
import {Content} from "./Content";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./Login";
import {Registration} from "./Registration";
import {Header} from "./Header";
import {checkToken} from "./common/localStorage/localStorage";
import {changeIsLoggedInAC, refreshTC,} from "./store/reducers/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import {Loading} from "./Loading";

const App = () => {
    const loading = useSelector<AppStateType, boolean>(state => state.auth.loading)
    const dispatch = useDispatch()
    useEffect(() => {
        checkToken() && dispatch(refreshTC())
    }, [])

  return (
    <div className="App">
      <Header />
        {
            loading
            ?
            <Loading />
            :
            <Routes>
                <Route path={'/'} element={<Content />} />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/registration'} element={<Registration />} />
                <Route path='*' element={<Navigate to={'/404'} />} />
                <Route path={'/404'} element={<h1>404: Page Not Found!</h1>} />
            </Routes>
        }
    </div>
  );
}

export default App;
