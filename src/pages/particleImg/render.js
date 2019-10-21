export default function render() {
  const img = document.createElement('img');
  img.src = require('../../assets/laiang.jpg');
  img.onload = () => {
    console.log('img.onload')
    const canvas = document.getElementById('particleImg');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    // const imgData = ctx.getImageData(0, 0, img.width, img.height);
    const imgData = ctx.getImageData(0, 0, img.width, img.height);  //RGBA的一维数组数据
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var Dot = function (centerX, centerY, radius, fillStyle) {
      this.x = centerX;
      this.y = centerY;
      this.radius = radius;
      this.fillStyle = fillStyle;
    }
    Dot.prototype = {
      paint: function () {
        ctx.save();
        ctx.beginPath();
        // arc(x, y, r, startAngle, endAngle, anticlockwise) 以x,y为圆心，以r为半径，从startAngle弧度开始到endAngle弧度结束，anticlosewise是布尔值，true表示逆时针，false表示顺时针，默认是顺时针
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        console.log(this.fillStyle)
        ctx.fillStyle = this.fillStyle;
        ctx.fill()
        ctx.restore();
      }
    }

    var dots = [];
    for (var x = 0; x < imgData.width; x += 4) {
      for (var y = 0; y < imgData.height; y += 4) {
        var i = (y * imgData.width + x) * 4;   // y为行，x为列  每个像素点由RGBA四个数据组成
        if (!(imgData.data[i] >= 200 && imgData.data[i + 1] >= 200 && imgData.data[i + 2] >= 200) && imgData.data[i + 3] >= 128) {  // 有颜色值就渲染
          var dot = new Dot(x - 3, y - 3, 2, `rgba(${imgData.data[i]},${imgData.data[i + 1]},${imgData.data[i + 2]},${imgData.data[i + 3]})`);
          dots.push(dot);
        }
      }
    }
    dots.forEach(function (item) {
      item.paint();
    })


  }
}

