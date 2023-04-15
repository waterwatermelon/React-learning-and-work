import React, { useEffect, useRef } from 'react';
import RNEChartsPro from 'react-native-echarts-pro';

function TreeChart() {

    const handlePress = result => {
        console.log('[press]', result);
    }

    return (
        <RNEChartsPro
            backgroundColor='#f0f0f0'
            option={{
                title: {
                    show: true,
                    text: 'tree',
                },
                series: [{
                    type: 'tree',
                    orient: 'TB',
                    expandAndCollapse: false,
                    data: [{
                        name: 'internet',
                        value: 'internet',
                        children: [{
                            name: 'root',
                            value: 'root',
                            lineStyle: {
                                color: '#fafa80',
                            },
                            children: [{
                                name: 'child1',
                            }, {
                                name: 'child2',
                            }, {
                                name: 'child3',
                            }, {
                                name: 'child4',
                            }, {
                                name: '',
                                collapsed: true,
                                children: [{
                                    name: 'child9',
                                }, {
                                    name: 'child10',
                                },]
                            }, {
                                name: 'child5',
                            }, {
                                name: 'child6',
                            }, {
                                name: 'child7',
                            }, {
                                name: 'child8',
                            },]
                        }],
                    }]
                }]
            }}
            onPress={handlePress} />
    );
}

export default TreeChart;