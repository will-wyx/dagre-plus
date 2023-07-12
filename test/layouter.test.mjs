import {layout} from "../src/layouter.js";
import {expect} from "chai";
import {parse} from "../src/parser.js";

describe('布局函数测试', () => {

    const config = {
        direction: 'LR',
        spacing: 40,
        acyclicer: undefined,
        ranker: 'network-simplex'
    }

    it('空结构', () => {
        expect(() => layout({nodes: [], edges: [], part: {}}, config)).to.throw()
    })

    it('二级嵌套', () => {
        const data = {
            nodes: [{
                id: 'A',
                children: ['A1', 'A2'],
                part: {
                    nodes: [{
                        id: 'A1',
                        parent: 'A',
                        children: ['A11', 'A12'],
                        part: {
                            nodes: [{
                                id: 'A11', parent: 'A1', children: [],
                            }, {
                                id: 'A12', parent: 'A1', children: []
                            }],
                            edges: [{source: 'A11', target: 'A12'}]
                        }
                    }, {
                        id: 'A2',
                        parent: 'A',
                        children: [],
                    }],
                    edges: [{source: 'A1', target: 'A2'}]
                }
            }, {
                id: 'B',
                children: ['B1', 'B2'],
                part: {
                    nodes: [{
                        id: 'B1', parent: 'B', children: []
                    }, {
                        id: 'B2',
                        parent: 'B',
                        children: ['B21', 'B22'],
                        part: {
                            nodes: [{
                                id: 'B21', parent: 'B2', children: []
                            }, {
                                id: 'B22', parent: 'B2', children: []
                            }],
                            edges: [{source: 'B21', target: 'B22'}]
                        }
                    }],
                    edges: [{source: 'B1', target: 'B2'}]
                }
            }],
            edges: [{source: 'A', target: 'B'}]
        }
        const layoutGraph = layout(data, config);
        expect(layoutGraph).to.eql(data, layoutGraph);
    })
})
