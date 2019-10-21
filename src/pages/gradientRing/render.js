import * as d3 from 'd3';
export default function graphs(node) {
  (() => {
    d3.select(node).selectAll('svg').remove();
  })();

  // ***************数据初始化*******************
  const width = node.offsetWidth; // width包括 paddingLeft 和 paddingRight
  const height = node.offsetHeight;

//   const colorConfig = ['#76c0ff', '#6ce6a2', '#6ff8c6'];
  const colorConfig = '#76c0ff';
  const circleR = [66, 80, 114];
  // 绘制
  const svg = d3.select(node).append('svg')
    .attr('width', width)
    .attr('height', height);

  // 画圆
  const circleGroup = svg.append('g').attr('class', 'circleGroup');
  circleGroup.selectAll('.circleItem')
    .data(circleR)
    .enter()
    .append('circle')
    .attr('class', 'circleItem')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('fill', 'none')
    .attr('r', (d) => d)
    .attr('stroke-width', 2)
    .attr('stroke', (d, i) => {
      const rgb = d3.rgb(colorConfig);
      const opacity = !i ? 0.3 : 0.9;
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity}`;
    });

  // 渐变弧形
  svg.append('circle')
    .attr('class', 'gradientCircle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('fill', 'none')
    .attr('r', 97)
    .attr('stroke-width', 34)
    .attr('stroke', 'url(#gradientRing)')
    .attr('clip-path', 'url(#circle-clip)');

  svg.append('clipPath') // 过渡显示效果 .attr({ 'clip-path': 'url(#circle-clip)' })
    .attr('id', 'circle-clip')
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width / 2)
    .attr('height', (height / 2) + 20);
}
