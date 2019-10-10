import  * as d3 from 'd3';

export default function graphs(node, dataset, idName = 'liquidBall') {
  (() => {
    d3.select(node).selectAll('svg').remove();
  })();

  // ***************数据初始化*******************
  const width = node.offsetWidth;
  const height = node.offsetHeight;
  const outerCR1 = 126;
  const outerCR2 = 121;
  const outerCR3 = 116;
  const strokeColor = '#64c260';

  const innerCR1 = 106;
  const innerCR2 = 103;
  const innerCR3 = 93;

  const waveConfig = {
    level: dataset.ratio, // 水位高低 [0-100]
    fluct: 14, // 水位起伏大小
  }

  // *********************************** 添加 svg ***********************************
  const svg = d3.select(node).append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'test');

  // *********************************** 外侧圆 ***********************************
  const outerCircle = svg.append('g').attr('class', 'outerCircle');
  outerCircle.append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', outerCR1)
    .attr('fill', 'none')
    .attr('stroke', ()=>{
      const color = d3.color(strokeColor).darker(1);
      return d3.rgb(color.r, color.g, color.b, 0.4)
    })
    .attr('stroke-width', 2)
    .attr('stroke-dasharray', `${((outerCR1 * 2 * Math.PI) / 6 / 7)*6} ${(outerCR1 * 2 * Math.PI) / 6 / 7}`)
  outerCircle.append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', outerCR2)
    .attr('fill', 'none')
    .attr('stroke', strokeColor)
    .attr('stroke-width', 2)
    .attr('stroke-dasharray', `${((outerCR2 * 2 * Math.PI) / 6 / 7)*6} ${(outerCR2 * 2 * Math.PI) / 6 / 7}`)
  outerCircle.append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', outerCR3)
    .attr('fill', 'none')
    .attr('stroke', ()=>{
      const color = d3.color(strokeColor).darker(1);
      return d3.rgb(color.r, color.g, color.b, 0.4)
    })
    .attr('stroke-width', 2)
    .attr('stroke-dasharray', `${((outerCR3 * 2 * Math.PI) / 6 / 7)*6} ${(outerCR3 * 2 * Math.PI) / 6 / 7}`)

  // *********************************** 内侧圆 **************************************
  const innerCircle = svg.append('g').attr('class', 'innerCircle');
  innerCircle.append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', innerCR1)
    .attr('fill', 'none')
    .attr('stroke', strokeColor)
    .attr('stroke-width', 2);
  innerCircle.append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', innerCR2)
    .attr('fill', 'none')
    .attr('stroke', ()=>{
      const color = d3.color(strokeColor).darker(0.6);
      return d3.rgb(color.r, color.g, color.b)
    })
    .attr('stroke-width', 6)
    .attr('stroke-dasharray', `${(innerCR2 * 2 * Math.PI) / 2 / 3} ${((innerCR2 * 2 * Math.PI) / 2 / 3) * 2}`);
  innerCircle.append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', innerCR3)
    .attr('fill', ()=>{
      const color = d3.color(strokeColor).darker(0.5);
      return d3.rgb(color.r, color.g, color.b, 0.5)
    })
    .attr('stroke', 'none');




    // *********************************** 水波球 ***********************************
    const waveGroup = svg.append('g').attr('class', 'waveGroup');

    let start = -200;
    let start2 = -240;

    d3.timer(animation);
    d3.timer(animation2);

    function animation() {
      start += 2; // 移速
      waveGroup.selectAll(`.${idName}`).remove();
      waveGroup.append('clipPath')
      .attr('class', idName)
        .attr('id', idName)
        .append('path')
        .attr('d', `M0,${(1 - (waveConfig.level/100))*innerCR3*2} q50,-${waveConfig.fluct+8} 100,0 t100,0 t100,0 t100,0 t100,0 t100,0  V400 H0 Z`)
        .attr('transform', `translate(${start}, ${height/2 - innerCR3})`);
      if (start > -1) {
        start = -200;
      }
    }

    function animation2() {
      start2 += 2; // 移速
      waveGroup.selectAll(`.${idName}-2`).remove();
      waveGroup.append('clipPath')
        .attr('class', `${idName}-2`)
        .attr('id', `${idName}-2`)
        .append('path')
        .attr('d', `M0,${(1 - (waveConfig.level/100))*innerCR3*2} q50,-${waveConfig.fluct} 100,0 t100,0 t100,0 t100,0 t100,0 t100,0  V400 H0 Z`)
        .attr('transform', `translate(${start2},${height/2 - innerCR3})`);
      if (start2 > -41) {
        start2 = -240;
      }
    }
    waveGroup.append('g')
      .append('circle')
      .attr('r', innerCR3)
      .attr('cx', width / 2) // x轴位置
      .attr('cy', height / 2)
      // .attr('fill', 'url(#waterFill)')
      .attr('fill', 'green')
      .attr('clip-path', `url(#${idName})`); // y轴位置;

    waveGroup.append('g')
      .append('circle')
      .attr('r', innerCR3)
      .attr('cx', width / 2) // x轴位置
      .attr('cy', height / 2)
      // .attr('fill', 'url(#waterFill)')
      .attr('fill', ()=>{
        const color = d3.color('#64ff34');
        return d3.rgb(color.r, color.g, color.b, 0.6)
      })
      .attr('clip-path', `url(#${idName}-2)`); // y轴位置;

    // *********************************** 文字信息 ***********************************
    const textGroup = svg.append('g').attr('class', 'textGroup');
    textGroup.append('text')
      .attr('class', 'textValue')
      .attr('dx', width / 2)
      .attr('dy', (height / 2) - 22)
      .attr('text-anchor', 'middle')
      .attr('font-size', '38px')
      .attr('fill', '#b8ffa5')
      .attr('font-family', 'FFDINPro-Medium')
      .text(dataset.value);
    textGroup.append('text')
      .attr('class', 'textRatio')
      .attr('dx', width / 2)
      .attr('dy', (height / 2) + 60)
      .attr('text-anchor', 'end')
      .attr('font-size', '25px')
      .attr('fill', '#91ff71')
      .attr('font-family', 'FFDINPro-Medium')
      .text(`${dataset.ratio}`);
    textGroup.append('text')
      .attr('class', 'textRatioUnit')
      .attr('dx', width / 2 + 2)
      .attr('dy', (height / 2) + 60)
      .attr('text-anchor', 'start')
      .attr('font-size', '16px')
      .attr('fill', '#91ff71')
      .attr('font-family', 'FFDINPro-Medium')
      .text('%');

      class Test {
        a = 1
        constructor() {
          this.b = 2;
          console.log(this.a, 'constructor');
        }

        static draw(){
          console.log(this);
          console.log(Test.a)
          console.log(this.b)
        }
        sum() {
          console.log(this.a)
        }
      }

      Test.draw()
}
