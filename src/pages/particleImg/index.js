import React, { Component } from 'react';
import styles from './index.less';
// import renderGraph from './render';
import renderGraph from './render';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    renderGraph();
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.group}>
          <div className={styles.con}>
            <canvas className={styles.graph} id='particleImg'></canvas>
          </div>
        </div>
      </div>
    );
  }
}
