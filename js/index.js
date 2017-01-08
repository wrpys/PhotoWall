$(function(){

	PhotoWall.init();

});

var PhotoWall={
	imagesDatas : [],
	init:function(){
		// 自执行函数 添加图片URL
		PhotoWall.imagesDatas = (function(imageDatasArr){
			for(var i=0, len=imageDatasArr.length; i<len; i++) {
				var singleImageData = imageDatasArr[i];
				singleImageData.imageURL = "../iamges/" + singleImageData.fileName;
				imageDatasArr[i] = singleImageData;
			}
			return imageDatasArr;
		})(imagesDatas);

		console.log(PhotoWall.imagesDatas);
	}
}