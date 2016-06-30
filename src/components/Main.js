require('normalize.css/normalize.css');
require('styles/main.scss');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
	render() {
		return (
			<div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <span>hello</span>
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
		);
	}
}

AppComponent.defaultProps = {};

export default AppComponent;