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
	imgsArrangeDOM : {},
	controllerDOM : {},
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
			controllerUnits.push(PhotoWall.generatorController(data, i));
		}

		$(".img-sec").append(imgFigures.join(""));
		$(".controller-nav").append(controllerUnits.join(""));

		PhotoWall.computeImageRange();

		PhotoWall.rearrange(0);

		$(".img-figure").on("click", function() {
			var me = $(this);
			var isCenter = me.attr("isCenter");
			if (isCenter && isCenter == 1) {
				PhotoWall.inverse(me.attr("index"));
			} else {
				PhotoWall.rearrange(me.attr("index"));
			}
		});
		$(".img-back").on("click", function() {
			var me = $(this);
			var isCenter = me.attr("isCenter");
			if (isCenter && isCenter == 1) {
				PhotoWall.inverse(me.attr("index"));
			}
		});

		$(".controller-unit").on("click", function() {
			var me = $(this);
			var index = me.attr("index");
			var img = $("#imgFigure" + index);
			var isCenter = img.attr("isCenter");
			if (isCenter && isCenter == 1) {
				PhotoWall.inverse(index);
			} else {
				PhotoWall.rearrange(index);
			}
		});

	},
	// 生成每张图片及其信息
	generatorFigure: function(data, index) {
		if(!PhotoWall.imgsArrangeArr[index]) {
			PhotoWall.imgsArrangeArr[index] = {
				pos: {
					left: 0,
					right: 0
				},
				rotate: 0,
				isInverse: false
			}
		}

		var _html = [];
		_html.push('<figure class="img-figure" id="imgFigure' + index + '">');
		_html.push('	<img src="' + data.imageURL + '" alt="' + data.title + '"/>');
		_html.push('	<figcaption>');
		_html.push('		<h2 class="img-title">' + data.title + '</h2>');
		_html.push('		<div class="img-back"');
		_html.push('			<p>' + data.desc + '</p>');
		_html.push('		</div>');
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

		// 一个imgFigure的大小
		var imgFigureDOM = $("#imgFigure0"),
			imgW = imgFigureDOM.width(),
			imgH = imgFigureDOM.height(),
			halfImgW = Math.ceil(imgW/2),
			halfImgH = Math.ceil(imgH/2);

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
		PhotoWall.Constant.vPosRange.x[0] = halfStageW - imgW;
		PhotoWall.Constant.vPosRange.x[1] = halfImgW;
	},
	rearrange: function(centerIndex) {
		var imgsArrangeArr = PhotoWall.imgsArrangeArr,
			Constant = PhotoWall.Constant,
			centerPos = Constant.centerPos,
			hPosRange = Constant.hPosRange,
			vPosRange = Constant.vPosRange,
			hPosRangeLeftSecX = hPosRange.leftSecX,
 			hPosRangeRightSecX = hPosRange.rightSecX,
 			hPosRangeY = hPosRange.y,
 			vPosRangeTopY = vPosRange.topY,
 			vPosRangeX = vPosRange.x,

 			imgsArrangeTopArr = [],
 			topImgNum = Math.floor(Math.random() * 2),
 			topImgSpliceIndex = 0,
 			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

		imgsArrangeCenterArr[0].pos = centerPos;

		imgsArrangeCenterArr[0].rotate = 0;



		topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum))
		imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);


		for(var i=0, len=imgsArrangeTopArr.length; i<len; i++) {
			
			imgsArrangeTopArr[i] = {
				pos: {
					top: PhotoWall.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
					left: PhotoWall.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
				},
				rotate: PhotoWall.get30DegRandom()
			}
		}

		for(var i=0, len=imgsArrangeArr.length, k=len/2; i < len; i++) {
			var hPosRangeLORX = null;
			if(i < k) {
				hPosRangeLORX = hPosRangeLeftSecX;
			} else {
				hPosRangeLORX = hPosRangeRightSecX;
			}

			imgsArrangeArr[i] = {
				pos: {
					top: PhotoWall.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
					left: PhotoWall.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
				},
				rotate: PhotoWall.get30DegRandom()
			}
		}

		if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
			imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
		}

		imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

		PhotoWall.renderDit(centerIndex);

	},
	// 获取区间内的随机值
	getRangeRandom: function(low, hight) {
		return Math.ceil(Math.random() * (hight - low) + low);
	},
	// 获取30°之间的正负值
	get30DegRandom() {
		return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
	},
	inverse: function(index) {
		PhotoWall.imgsArrangeArr[index].isInverse = !PhotoWall.imgsArrangeArr[index].isInverse;
		var id = "imgFigure" + index;
		var ctr = "#ctr" + index;
		if(PhotoWall.imgsArrangeArr[index].isInverse) {
			PhotoWall.imgsArrangeDOM[id].addClass("is-inverse");
			$(ctr).addClass("is-inverse");
		} else {
			PhotoWall.imgsArrangeDOM[id].removeClass("is-inverse");
			$(ctr).removeClass("is-inverse");
		}
	},
	renderDit: function(centerIndex) {
		// TODO 重新渲染
		var hacks = ['-moz-', '-ms-', '-webkit-', ''];
		for(var i=0, len=PhotoWall.imagesDatas.length; i<len; i++) {
				var styleObj = {};
			if(PhotoWall.imgsArrangeArr[i]) {
				styleObj = PhotoWall.imgsArrangeArr[i];
			}
			var id = "imgFigure" + i;
			if (!PhotoWall.imgsArrangeDOM || !PhotoWall.imgsArrangeDOM[id]) {
				PhotoWall.imgsArrangeDOM[id] = $("#" + id);
				PhotoWall.imgsArrangeDOM[id].attr("index", i);
			}

			if (!styleObj.pos) {
				styleObj.pos = {};
				styleObj.pos.top = 0;
				styleObj.pos.left = 0;
			}

			var domStyle = {
				top: styleObj.pos.top + 'px',
				left: styleObj.pos.left + 'px'
			}
			if(i == centerIndex) {
				domStyle["z-index"] = "1001";
			} else if (styleObj.rotate) {
				for (var n = 0; n < hacks.length; n++) {
					domStyle[hacks[n] + 'transform'] = 'rotate(' + styleObj.rotate + 'deg';
				}
			}
			
			PhotoWall.imgsArrangeDOM[id].removeAttr("style").css(domStyle);
			if(styleObj.isInverse) {
				PhotoWall.imgsArrangeDOM[id].addClass("is-inverse");
			}

			if (i == centerIndex) {
				PhotoWall.imgsArrangeDOM[id].attr("isCenter", 1);
				$("#ctr" + centerIndex).addClass('is-center');
			} else {
				PhotoWall.imgsArrangeDOM[id].attr("isCenter", 0);
				PhotoWall.imgsArrangeDOM[id].removeClass('is-inverse');
				$("#ctr" + i).removeClass('is-center');
				$("#ctr" + i).removeClass('is-inverse');
			}

		}
	},
	generatorController:function(data, index) {
		var _html= [];
		_html.push('<span class="controller-unit" id="ctr' + index + '" index="' + index + '"></span>');
		return _html.join("");
	}
}