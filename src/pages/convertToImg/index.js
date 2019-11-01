import React, { Component } from 'react';
import styles from './index.less';
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
          <div className={styles.con} id="con">
            <p> <img id="ringoImage" style={{ width: '282px', height: '312px' }} alt="" src={require("../../assets/laiang.jpg")} /> </p>
            <h2>图片 -&gt; 画布图像</h2>
            <div id="canvasHolder"></div>
            <h2>画布 -&gt; PNG图片</h2>
            <div id="pngHolder"></div>
          </div>
        </div>
      </div>
    );
  }
}
