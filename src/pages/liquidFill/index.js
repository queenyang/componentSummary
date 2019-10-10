import React, { Component } from 'react';
import styles from './index.less';
import renderGraph from './render';

/* export default function() {
  return (
    <div className={styles.liquid}>
      <h1>liquid fill page</h1>
    </div>
  );
} */

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.graphNode = null;
    this.graphData = {
      value: 3560,
      ratio: 35,
    }
  }

  componentDidMount() {
    renderGraph(this.graphNode, this.graphData);
  }

  render() {
    return (
      <div className={styles.liquidContainer}>
        <div className={styles.group}>
          <div className={styles.liquidCon}>
            <div className={styles.graph} ref={(node) => { this.graphNode = node; }}></div>
          </div>
        </div>
      </div>
    );
  }
}
