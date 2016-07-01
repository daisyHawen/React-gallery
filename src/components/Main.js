require('normalize.css/normalize.css');
require('styles/main.scss');

import React from 'react';

// let yeomanImage = require('../images/yeoman.png');
//获取图片路径
// let imageDatas = require('../data/imageDatas.json');
var ReactDOM = require('react-dom');
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
	// class AppComponent extends React.Component
var GalleryByReactApp = React.createClass({
	/*用于定位*/
	Constant: {
		centerPos: {
			left: 0,
			right: 0
		},
		hPosRange: { // 水平方向的取值范围
			leftSecX: [0, 0],
			rightSecX: [0, 0],
			y: [0, 0]
		},
		vPosRange: { // 垂直方向的取值范围
			x: [0, 0],
			topY: [0, 0]
		}
	},
	//组建加载后，为每个图片计算其位置的范围
	componentDidMount: function() {
		var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
			stageW = stageDOM.scrollWidth,
			stageH = stageDOM.scrollHeight,
			halfStageW = Math.ceil(stageW / 2),
			halfStageH = Math.ceil(stageH / 2);
		//拿到一个imageFigure的大小
		var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
			imgW = imgFigureDOM.scrollWidth,
			imgH = imgFigureDOM.scrollHeight,
			halfImgW = Math.ceil(imgW / 2),
			halfImgH = Math.ceil(imgH / 2);
		//计算中心图片的位置点
		this.Constant.centerPros = {
			left: halfStageH - halfImgW,
			top: halfStageH - halfImgH
		}
		this.Constant.hPosRange.leftSecX[0] = -halfImgH;

	},
	render() {
		let controllerUnits = [],
			imgFigures = [];
		imageDatas.forEach((item, index) => {
			imgFigures.push(<ImgFigure data={item} key={index} ref={'imgFigure'+index}/>);

		});
		return (
			<section className="stage" refs="stage">
		<section className="img-sec">
		{imgFigures}
		</section>
		<nav className="controller-nav">
		{controllerUnits}
		</nav>
		</section>
		);
	}
})

GalleryByReactApp.defaultProps = {};

export default GalleryByReactApp;