/**
* ------------------------------------------
* gulp配置文件
* @version  1.0
* @update   2016/07/22
* @author   小木瓜Kimi(mrgaonju@gmail.com)
* ------------------------------------------
*/
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
var pngquant = require('imagemin-pngquant');
var imagemagick = require('imagemagick');
var graphicsmagick2 = require('graphicsmagick2');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var imageminOptipng = require('imagemin-optipng');

// 调整大小+压缩图片(横幅图片)
gulp.task('compress', function () {
    var srcImage = 'imgInput/*.+(jpeg|jpg|png)';
    var dstImage = 'img/';
    var jpgmin = imageminJpegRecompress({
            accurate: true,//高精度模式
            quality: "high",//图像质量:low, medium, high and veryhigh;
            method: "smallfry",//网格优化:mpe, ssim, ms-ssim and smallfry;
            min: 80,//最低质量
            loops: 0,//循环尝试次数, 默认为6;
            progressive: false,//基线优化
            subsample: "default"//子采样:default, disable;
        });
    var  pngmin = imageminOptipng({
            optimizationLevel: 4
        });
    gulp.src(srcImage)
        .pipe(imageResize({
            width: 1280
        }))
        .pipe(imagemin({
            verbose: true,
            use: [jpgmin, pngmin]
        }))
        .pipe(gulp.dest(dstImage));
});


