import React, { Component } from 'react';
import styles from './index.less';
import renderGraph from './render';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.graphNode = null;
        this.graphData = [
            { name: '数据一', value: 2345 },
            { name: '数据二', value: 4467 },
            { name: '数据三', value: 2356 },
            { name: '数据四', value: 3895 },
            { name: '数据五', value: 3495 },
            { name: '数据六', value: 3895 },
            { name: '数据七', value: 2597 },
            { name: '数据八', value: 2997 },
        ]
    }

    componentDidMount() {
        renderGraph(this.graphNode, this.graphData);
    }

    render() {
        return ( <
            div className = { styles.barGraphContainer } >
            <
            div className = { styles.group } >
            <
            div className = { styles.barGraphCon } >
            <
            div className = { styles.graph }
            ref = {
                (node) => { this.graphNode = node; }
            } > < /div> < /
            div > <
            /div> <
            svg width = "0"
            height = "0" >
            <
            defs >
            <
            linearGradient id = "rbGraphsColor"
            x1 = "0%"
            y1 = "0%"
            x2 = "0%"
            y2 = "100%" >
            <
            stop offset = "0"
            stopColor = "#379e48"
            stopOpacity = "0.6" / >
            <
            stop offset = "100%"
            stopColor = "#14692e"
            stopOpacity = "0.6" / >
            <
            /linearGradient> < /
            defs > <
            /svg> < /
            div >
        );
    }
}