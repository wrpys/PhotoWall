$(function(){

	PhotoWall.init();

});

var PhotoWall={
	imagesDatas : [],
	Constant: {
		centerPos: {
			left: 0,
			right: 0
		},
		hPosRange: {
			leftSecX: [0, 0],
			rightSecX: [0, 0],
			y: [0, 0]
		},
		vPosRange: {
			topY: [0, 0],
			x: [0, 0]
		}
	},
	imgsArrangeArr: [],
	init:function(){
		// 自执行函数 添加图片URL
		PhotoWall.imagesDatas = (function(imageDatasArr){
			for(var i=0, len=imageDatasArr.length; i<len; i++) {
				var singleImageData = imageDatasArr[i];
				singleImageData.imageURL = "images/" + singleImageData.fileName;
				imageDatasArr[i] = singleImageData;
			}
			return imageDatasArr;
		})(imagesDatas);

		var controllerUnits = [],
			imgFigures = [];

		for(var i=0, len=PhotoWall.imagesDatas.length; i<len; i++) {
			var data = PhotoWall.imagesDatas[i];
			imgFigures.push(PhotoWall.generatorFigure(data, i));
		}

		var imgSec = $(".img-sec");
		imgSec.append(imgFigures.join(""));

		PhotoWall.computeImageRange();

	},
	// 生成每张图片及其信息
	generatorFigure: function(data, index) {

		if(!PhotoWall.imgsArrangeArr[index]) {
			PhotoWall.imgsArrangeArr[index] = {
				{
					pos: {
						left: 0,
						right: 0
					}
				}
			}
		}

		var _html = [];
		_html.push('<figure class="img-figure" id="imgFigure' + index + '">');
		_html.push('	<img src="' + data.imageURL + '" alt="' + data.title + '"/>');
		_html.push('	<figcaption>');
		_html.push('		<h2 class="img-title">' + data.title + '</h2>');
		_html.push('	</figcaption>');
		_html.push('</figure>');
		return _html.join("");
	},
	// 计算图片位置范围
	computeImageRange: function(){
		// 舞台大小
		var stageDOM = $(".stage"),
			stageW = stageDOM.width(),
			stageH = stageDOM.height(),
			halfStageW = Math.ceil(stageW/2),
			halfStageH = Math.ceil(stageH/2);

		console.log(stageDOM);

		// 一个imgFigure的大小
		var imgFigureDOM = $("#imgFigure0"),
			imgW = imgFigureDOM.width(),
			imgH = imgFigureDOM.height(),
			halfImgW = Math.ceil(imgW/2),
			halfImgH = Math.ceil(imgH/2);

		console.log(imgFigureDOM);

		PhotoWall.Constant.centerPos = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		}

		PhotoWall.Constant.hPosRange.leftSecX[0] = -halfImgW;
		PhotoWall.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW*3;
		PhotoWall.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
		PhotoWall.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
		PhotoWall.Constant.hPosRange.y[0] = -halfImgH;
		PhotoWall.Constant.hPosRange.y[1] = stageH - halfImgH;

		PhotoWall.Constant.vPosRange.topY[0] = -halfImgH;
		PhotoWall.Constant.vPosRange.topY[1] = halfStageH - halfImgH*3;
		PhotoWall.Constant.vPosRange.x[0] = halfImgW - imgW;
		PhotoWall.Constant.vPosRange.x[1] = halfImgW;




		console.log(PhotoWall.Constant);
	}
}