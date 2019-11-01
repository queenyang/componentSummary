export default function render() {
  const textStr = "冷不冷";
  const dots = [];
  // 生成 canvas 对象
  const canvas = document.getElementById('particleText');
  if (!canvas.getContext) return;
  const ctx = canvas.getContext('2d');

  const Dot = function (centerX, centerY, radius, fillStyle) {
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
      ctx.fillStyle = this.fillStyle;
      ctx.fill()
      ctx.restore();
    }
  }

  createText();
  getTextData();
  drawData();

  /******** canvas 添加文字 *****/
  function createText() {
    ctx.save();
    ctx.font = "140px 微软雅黑 bold"
    ctx.fillStyle = "rgba(168,168,168,1)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(textStr, canvas.width / 2, canvas.height / 2); // fillText(text, x, y [, maxWidth]) 在指定的 (x,y) 位置填充指定的文本，绘制的最大宽度是可选的
    ctx.restore();
  }
  // 获取 canvas 像素数据
  function getTextData() {
    const textData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < textData.width; x += 6) {
      for (let y = 0; y < textData.height; y += 6) {
        const i = (y * textData.width + x) * 4;
        if (textData.data[i] > 128) {
          const dot = new Dot(x - 3, y - 3, 3);
          dots.push(dot);
        }
      }
    }
  }

  function drawData() {
    dots.forEach(function (item) {
      item.paint();
    })
  }
}
