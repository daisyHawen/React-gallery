require('normalize.css/normalize.css');
require('styles/main.scss');

import React from 'react';

// let yeomanImage = require('../images/yeoman.png');
//获取图片路径
// let imageDatas = require('../data/imageDatas.json');

let imageDatas = require('json!../data/imageDatas.json');
// 只调用一次的函数，可以采用自执行的方式来执行
// 把所有的图片名转换为图片路径
function genImageURL(imageDataArr) {
	for (var i = 0, j = imageDataArr.length; i < j; i++) {
		var singleImageData = imageDataArr[i];
		singleImageData.imageURL = require('../images/' + singleImageData.fileName);

		imageDataArr[i] = singleImageData;
	}
	return imageDataArr; // body...
};
imageDatas = genImageURL(imageDatas);
// console.log(imageDatas);

var ImgFigure = React.createClass({
	render() {
		return (
			<figure className='img-figure'>
			<img src={this.props.data.imageURL} alt={this.props.data.tittle}/>
			<figcaption>
			<h2 className='img-tittle'>{this.props.data.title}</h2>
			</figcaption>
			</figure>
		);
	}
})
class AppComponent extends React.Component {
	render() {
		let controllerUnits = [],
			imgFigures = [];
		imageDatas.forEach((item, index) => {
			imgFigures.push(<ImgFigure data={item} key={index}/>);

		});
		return (
			<section className="stage">
		<section className="img-sec">
		{imgFigures}
		</section>
		<nav className="controller-nav">
		{controllerUnits}
		</nav>
		</section>
		);
	}
}

AppComponent.defaultProps = {};

export default AppComponent;