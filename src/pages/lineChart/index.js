import React, { Component } from 'react';
import styles from './index.less';
import renderGraph from './render';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.graphNode = null;
    this.graphData = [
      { name: '1月', value: 489 },
      { name: '2月', value: 387 },
      { name: '3月', value: 623 },
      { name: '4月', value: 379 },
      { name: '5月', value: 540 },
      { name: '6月', value: 800 },
      { name: '7月', value: 674 },
      { name: '8月', value: 761 },
      { name: '9月', value: 489 },
      { name: '10月', value: 646 },
      { name: '11月', value: 812 },
      { name: '12月', value: 280 },
    ];
    this.upperLimit = [
      { name: '1月', value: 1000 },
      { name: '2月', value: 1000 },
      { name: '3月', value: 1000 },
      { name: '4月', value: 1000 },
      { name: '5月', value: 1000 },
      { name: '6月', value: 1000 },
      { name: '7月', value: 1000 },
      { name: '8月', value: 1000 },
      { name: '9月', value: 1000 },
      { name: '10月', value: 1000 },
      { name: '11月', value: 1000 },
      { name: '12月', value: 1000 },
    ];
    this.floorLimit = [
      { name: '1月', value: 100 },
      { name: '2月', value: 100 },
      { name: '3月', value: 100 },
      { name: '4月', value: 100 },
      { name: '5月', value: 100 },
      { name: '6月', value: 100 },
      { name: '7月', value: 100 },
      { name: '8月', value: 100 },
      { name: '9月', value: 100 },
      { name: '10月', value: 100 },
      { name: '11月', value: 100 },
      { name: '12月', value: 100 },
    ];
    this.graphNode = null;
  }

  componentDidMount() {
    renderGraph(this.graphNode, this.graphData, this.upperLimit, this.floorLimit);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.group}>
          <div className={styles.con}>
            <div className={styles.graph} ref={(node) => { this.graphNode = node; }}></div>
          </div>
        </div>
        {/* <svg width="0" height="0">
          <defs>
            <linearGradient id="rbGraphsColor" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0" stopColor="#379e48" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#14692e" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg> */}
      </div>
    );
  }
}
