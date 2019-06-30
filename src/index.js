import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';

import App from './frontend/App';
import * as serviceWorker from './frontend/serviceWorker';
import store from './store';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/*  
    Sirve para recargar un trozo de pagina
    al modificar un componente, y no tener
    que reiniciar todo el servidor por cambios
    pequenios.
*/
if (module.hot) {
  module.hot.accept();
}
