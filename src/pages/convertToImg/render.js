export default function render() {
  console.log(window.onload);
  const wo = window.onload;
  window.onload = function () {
    wo && wo.call(null);
    // Get the image
    var sampleImage = document.getElementById("ringoImage"),
      canvas = convertImageToCanvas(sampleImage);

    // Actions
    document.getElementById("canvasHolder").appendChild(canvas);
    document.getElementById("pngHolder").appendChild(convertCanvasToImage(canvas));
  }

}
function convertImageToCanvas(image) {
  var canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height);

  return canvas;
}
// 将画布保存成图片格式
function convertCanvasToImage(canvas) {
  var image = new Image();
  image.src = canvas.toDataURL("image/png");
  return image;
}
