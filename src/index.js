import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <div className='m-0 p-0 bg-gray-200 w-screen h-screen'>
            <App />
        </div>
    </React.StrictMode>
);
