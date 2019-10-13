import * as d3 from 'd3';
const linearGradientFunc = (name, id, color1, color2) => {
    const linearGradient = name.append('linearGradient')
        .attr('id', id)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');
    linearGradient.append('stop')
        .attr('offset', '0%')
        .attr('style', `stop-color: ${color1}; stop-opacity: 0.8`);
    linearGradient.append('stop')
        .attr('offset', '100%')
        .attr('style', `stop-color: ${color2}; stop-opacity: 0`);
};
export default function graphs(node, dataset, upperLimit, floorLimit, colorConfig) {
    (() => {
        d3.select(node).selectAll('svg').remove();
    })();

    // ***************数据初始化*******************
    const width = node.offsetWidth; // width包括 paddingLeft 和 paddingRight
    const height = node.offsetHeight;
    const paddingTop = 30;
    const paddingBottom = 90;
    const paddingLeft = 82;
    const paddingRight = 40;
    const colorData = colorConfig || ['#4ff9fe', '#71e5a6', '#ffa637'];
    // const delay = 0;
    // const duration = 2000;
    const max = Math.max(...upperLimit.map((item) => item.value));

    const xData = dataset.map((item) => item.name); // 对接数据时根据name名创建

    // 比例尺
    const xScale = d3.scalePoint()
        .domain(xData)
        .range([0, width - paddingLeft - paddingRight]);
    // .padding(1);
    // console.log(xScale.step(), 'step')
    // console.log(xScale.padding(), 'padding')


    const yScale = d3.scaleLinear()
        .domain([0, max * 1.3])
        .range([height - paddingTop - paddingBottom, 0]);
    const yScaleAxis = d3.scaleLinear()
        .domain([0, max * 1.3])
        .range([0, height - paddingTop - paddingBottom]);
    // 绘制
    const svg = d3.select(node).append('svg')
        .attr('width', width)
        .attr('height', height);

    const defs = svg.append('defs'); // 渐变色
    linearGradientFunc(defs, 'area', '#40b8bc', '#40b8bc');
    // 坐标轴
    const xAxis = d3.axisBottom(xScale)
        .ticks(0)
        .tickPadding(12);
    const yAxis = d3.axisLeft(yScaleAxis)
        .ticks(5)
        .tickPadding(8)
        .tickFormat(d3.format('d'));
    // 线段生成器
    const linePath = d3.line()
        // .interpolate('cardinal')
        .x((d) => xScale(d.name))
        .y((d) => yScale(d.value));
    // 区域生成器
    const areaPath = d3.area()
        // .interpolate('cardinal')
        .x((d) => xScale(d.name))
        .y0(() => height - paddingTop - paddingBottom)
        .y1((d) => yScale(d.value));
    // ***************坐标轴***************
    svg.append('g')
        .attr('class', 'r-xAxis')
        .attr('transform', `translate(${paddingLeft},${height - paddingBottom})`)
        .call(xAxis);

    yScaleAxis.range([height - paddingTop - paddingBottom, 0]);
    svg.append('g')
        .attr('class', 'r-yAxis')
        .attr('transform', `translate(${paddingLeft},${paddingTop})`)
        .call(yAxis);

    //* ********************* 绘制区域 **********************
    svg.append('g')
        .attr('class', 'areaGroup')
        .attr('transform', `translate(${paddingLeft},${paddingTop})`)
        .append('path')
        .attr('class', 'areaItem')
        .attr('d', areaPath(dataset))
        .attr('stroke', 'none')
        .attr('fill', 'url(#area)');
    // .attr({ 'clip-path': 'url(#line-clip)' });
    //* ********************* 绘制折线 **********************
    // 数据线
    svg
        .append('path')
        .attr('transform', `translate(${paddingLeft},${paddingTop})`)
        .attr('d', linePath(dataset))
        .attr('fill', 'none')
        .attr('stroke-width', 1)
        .attr('stroke', colorData[0]);
    // .attr({ 'clip-path': 'url(#line-clip)' });
    // 上限
    svg
        .append('path')
        .attr('transform', `translate(${paddingLeft},${paddingTop})`)
        .attr('d', linePath(upperLimit))
        .attr('fill', 'none')
        .attr('stroke-width', 1)
        .attr('stroke', colorData[1]);
    // 下限
    svg
        .append('path')
        .attr('transform', `translate(${paddingLeft},${paddingTop})`)
        .attr('d', linePath(floorLimit))
        .attr('fill', 'none')
        .attr('stroke-width', 1)
        .attr('stroke', colorData[2]);

    // x y轴
    const xyLine = svg.append('g')
        .attr('class', 'lineGroup');
    // x
    xyLine.append('line')
        .attr('class', 'xyLine')
        .attr('x1', paddingLeft - 1)
        .attr('x2', width - paddingRight)
        .attr('y1', height - paddingBottom)
        .attr('y2', height - paddingBottom);
    // y
    xyLine.append('line')
        .attr('class', 'xyLine')
        .attr('x1', paddingLeft)
        .attr('x2', paddingLeft)
        .attr('y1', paddingTop)
        .attr('y2', (height - paddingBottom) + 1);
}