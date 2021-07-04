import React from 'react';
import ReactDOM from 'react-dom';
// import Router from './router';

import App from './app/App';

if (document.getElementById('app')) {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('app')
    );
}
