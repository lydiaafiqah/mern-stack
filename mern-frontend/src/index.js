import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css'
import App from './App';
import { BookingsContextProvider } from './context/BookingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<BookingsContextProvider>
			<App />
		</BookingsContextProvider>
	</React.StrictMode>
);