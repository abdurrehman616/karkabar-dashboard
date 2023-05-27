import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {AppHeader} from "./components/AppHeader";
import {SideBar} from "./components/SideBar.jsx";
import {Provider, useSelector} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './store/auth/authSlice.js';

const queryClient = new QueryClient();


const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    {/*<AppHeader className/>*/}
                    {/*<SideBar />*/}
                    <div className="absolute flex flex-col h-screen w-full max-h-screen max-w-screen" data-theme="light">
                            <App />
                    </div>
                </QueryClientProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);