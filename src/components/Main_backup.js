require('normalize.css/normalize.css');
require('styles/main.scss');

import React from 'react';
import ReactDOM from 'react-dom'
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
}
imageDatas = genImageURL(imageDatas);

/*
 * 获取区间内的一个随机值
 */
function getRangeRandom(low, high) {
	return Math.ceil(Math.random() * (high - low) + low);
}
var ImgFigure = React.createClass({
		render() {
			var styObj = {};
			/*如果props属性中指定了这张图片的位置，则使用*/
			if (this.props.arrange.pos) {
				styObj = this.props.arrange.pos;

			}
			return (
				<figure className='img-figure' styles={styObj}>
			<img src={this.props.data.imageURL} alt={this.props.data.tittle}/>
			<figcaption>
			<h2 className='img-tittle'>{this.props.data.title}</h2>
			</figcaption>
			</figure>
			);
		}
	})
	// class AppComponent extends React.Component
var testArray = {}
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

	/*重新布局所有图片
	指定居中哪个图片*/
	rearrange: function(centerIndex) {
		var imgsArrangeArr = this.state.imgsArrangeArr,
			Constant = this.Constant,
			centerPos = Constant.centerPos,
			hPosRange = Constant.hPosRange,
			vPosRange = Constant.vPosRange,
			hPosRangeLeftSecX = hPosRange.leftSecX,
			hPosRangeRightSecX = hPosRange.rightSecX,
			hPosRangeY = hPosRange.y,
			vPosRangeTopY = vPosRange.topY,
			vPosRangeX = vPosRange.x,

			imgsArrangeTopArr = [],
			topImgNum = Math.floor(Math.random() * 2), // 取一个或者不取
			topImgSpliceIndex = 0,

			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

		// 首先居中 centerIndex 的图片, 居中的 centerIndex 的图片不需要旋转
		imgsArrangeCenterArr[0] = {
			pos: centerPos,
			rotate: 0,
			isCenter: true
		};

		// 取出要布局上侧的图片的状态信息
		topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
		imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

		// 布局位于上侧的图片
		imgsArrangeTopArr.forEach(function(value, index) {
			imgsArrangeTopArr[index] = {
				pos: {
					top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
					left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
				},
				rotate: get30DegRandom(),
				isCenter: false
			};
		});

		// 布局左右两侧的图片
		for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
			var hPosRangeLORX = null;

			// 前半部分布局左边， 右半部分布局右边
			if (i < k) {
				hPosRangeLORX = hPosRangeLeftSecX;
			} else {
				hPosRangeLORX = hPosRangeRightSecX;
			}

			imgsArrangeArr[i] = {
				pos: {
					top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
					left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
				},
				rotate: get30DegRandom(),
				isCenter: false
			};

		}

		if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
			imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
		}

		imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
		console.log('test');
		this.setState({
			imgsArrangeArr: imgsArrangeArr,
		}).bind(this);
		// this.state.imgsArrageArr=imgsArrageArr;
		/*随意生成的值设置完毕*/
	},
	getInitialState: function() {
		return {
			imgsArrageArr: [
				// {
				// 	pos: {
				// 		left: '5',
				// 		top: '0'
				// 	}
				// }
			]
		}
	},
	//组建加载后，为每个图片计算其位置的范围
	componentDidMound() {
		// 首先拿到舞台的大小
		var stageDOM = ReactDOM.findDOMNode(this.refs.stage);
		var stageW = stageDOM.scrollWidth,
			stageH = stageDOM.scrollHeight,
			halfStageW = Math.ceil(stageW / 2),
			halfStageH = Math.ceil(stageH / 2);


		// 拿到一个imageFigure的大小
		var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
			imgW = imgFigureDOM.scrollWidth,
			imgH = imgFigureDOM.scrollHeight,
			halfImgW = Math.ceil(imgW / 2),
			halfImgH = Math.ceil(imgH / 2);

		// 计算中心图片的位置点
		this.Constant.centerPos = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		};

		// 计算左侧，右侧区域图片排布位置的取值范围
		this.Constant.hPosRange.leftSecX[0] = -halfImgW;
		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
		this.Constant.hPosRange.y[0] = -halfImgH;
		this.Constant.hPosRange.y[1] = stageH - halfImgH;

		// 计算上侧区域图片排布位置的取值范围
		this.Constant.vPosRange.topY[0] = -halfImgH;
		this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
		this.Constant.vPosRange.x[0] = halfStageW - imgW;
		this.Constant.vPosRange.x[1] = halfStageW;

		this.rearrange(0);

	},
	render() {
		let controllerUnits = [],
			imgFigures = [];
		imageDatas.forEach(function(item, index) {
			if (!this.state.imgsArrageArr[index]) {
				this.state.imgsArrageArr[index] = {
					pos: {
						left: '0',
						top: '0'
					}
				}
			}
			/*把图片的状态信息传递给imgFigure*/
			imgFigures.push(<ImgFigure data={item} key={index} ref={'imgFigure'+index} arrange={this.state.imgsArrageArr[index]}/>);
		}.bind(this));
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