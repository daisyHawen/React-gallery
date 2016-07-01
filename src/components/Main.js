require('normalize.css/normalize.css');
require('styles/main.scss');

import React from 'react';

// let yeomanImage = require('../images/yeoman.png');
//获取图片路径
let imageDatas = require('../data/imageDatas.json')
	/*只调用一次的函数，可以采用自执行的方式来执行
	把所有的图片名转换为图片路径*/
imageDatas = (function genImageURL(imageDataArr) {
	for (var i = 0, j = imageDataArr.length; i < j; i++) {
		var singleImageData = imageDataArr[i];
		singleImageData.imageURL = require('../images/' + singleImageData.fileName);

		imageDataArr[i] = singleImageData;
	}
	return imageDataArr; // body...
})(imageDatas);
// imageDatas = genImageURL(imageDatas);
// console.log(imageDatas);

// class AppComponent extends React.Component {
// 	render() {
// 		return (
// 			<div className="index">
//         <img src={yeomanImage} alt="Yeoman Generator" />
//         <span>hello React</span>


//         <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
//       </div>
// 		);
// 	}
// }
class AppComponent extends React.Component {
	render() {
		return (
			<section className="stage">
		<section className="img-sec">
		</section>
		<nav className="controller-nav">
		</nav>
		</section>
		);
	}
}

AppComponent.defaultProps = {};

export default AppComponent;