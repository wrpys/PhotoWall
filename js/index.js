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

		//

		var controllerUnits = [],
			imgFigures = [];

		for(var i=0, len=PhotoWall.imagesDatas.length; i<len; i++) {
			var data = PhotoWall.imagesDatas[i];
			imgFigures.push(PhotoWall.generatorFigure(data));
		}

		var imgSec = $(".img-sec");
		imgSec.append(imgFigures.join(""));

	},
	generatorFigure: function(data) {
		var _html = [];
		_html.push('<figure class="img-figure">');
		_html.push('	<img src="' + data.imageURL + '" alt="' + data.title + '"/>');
		_html.push('	<figcaption>');
		_html.push('		<h2 class="img-title">' + data.title + '</h2>');
		_html.push('	</figcaption>');
		_html.push('</figure>');
		return _html.join("");
	}
}