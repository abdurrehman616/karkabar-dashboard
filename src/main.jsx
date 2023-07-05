import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {Provider, useSelector} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './store/auth/authSlice.js';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";

const client =new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({
        uri: 'http://localhost:8000/graphql'
    }),
})

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
                    <ApolloProvider client={client}>
                        <div className="absolute flex flex-col h-screen w-full max-h-screen max-w-screen" data-theme="light">
                            <App />
                        </div>
                    </ApolloProvider>
                </QueryClientProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);