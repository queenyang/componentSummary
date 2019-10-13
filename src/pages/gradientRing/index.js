import React, { Component } from 'react';
import styles from './index.less';
import renderGraph from './render';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.graphNode = null;
    }

    componentDidMount() {
        renderGraph(this.graphNode);
    }

    render() {
        return (
            <div className={styles.container} >
                <div className={styles.group} >
                    <div className={styles.con} >
                        <div className={styles.dashLine} >
                            <p></p><p></p><p></p>
                        </div >
                        <div className={styles.graphWrp} ref={(node) => { this.graphNode = node; }}></div>
                        <div className={styles.icon}>
                            <img src={require('../../assets/plant.svg')} alt="" />
                        </div>
                        <div className={styles.outerLine}></div>
                    </div>
                </div >
                <svg width="0" height="0" >
                    <defs >
                        <linearGradient x1="1" y1="0" x2="0" y2="1" id='gradientRing'>
                            <stop offset="0%" stopColor='#76c0ff' stopOpacity="1"> </stop>
                            <stop offset="40%" stopColor='#76c0ff' stopOpacity="0.5"> </stop>
                            <stop offset="74%" stopColor='#76c0ff' stopOpacity="0"> </stop>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        );
    }
}