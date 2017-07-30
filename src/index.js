import React from 'react';
import ReactDOM from 'react-dom';

import './assets/css/main.css';
import 'semantic-ui-css/semantic.min.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
