import React, { Component } from 'react';
import styles from './index.less';
// import renderGraph from './render';
import renderGraph from './render';
import renderText from './renderText';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    renderGraph();
    renderText();
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.group}>
          <div className={styles.con}>
            <canvas className={styles.graph} id='particleImg'></canvas>
            <canvas className={styles.graph} width="600" height="300" id='particleText'></canvas>
          </div>
        </div>
      </div>
    );
  }
}
