import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import {Provider} from "react-redux";
// import reduxStore from "./redux/ReduxStore";
import {BrowserRouter as Router} from 'react-router-dom';
import './assets/custom_fonts/InterVariable.ttf'
import './assets/custom_fonts/Lato-Regular.ttf'
import './assets/custom_fonts/InterDisplay-Regular.ttf'
import './assets/custom_fonts/InterDisplay-SemiBold.ttf'
import './assets/custom_fonts/InterDisplay-Bold.ttf'
import './assets/custom_fonts/AlegreyaSans-Bold.ttf'
import App from './App';
import { Provider } from 'react-redux';
import reduxStore from './redux/ReduxStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={reduxStore}>
      <Router>
        <App />
      </Router>
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
