import React from 'react';
import { render } from 'react-dom';

import Main from './containers/Main';

const App = () => <Main />;

export default App;

render(<App />, document.getElementById('app'));