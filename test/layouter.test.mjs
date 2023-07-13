import {layout, layoutAndFlattenNestedGraph} from "../src/layouter.js";
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
        const result = layout(data, config);
        const layoutGraph = {
            "nodes": [{
                "id": "A",
                "children": ["A1", "A2"],
                "part": {
                    "nodes": [{
                        "id": "A1",
                        "parent": "A",
                        "children": ["A11", "A12"],
                        "part": {
                            "nodes": [{
                                "id": "A11",
                                "parent": "A1",
                                "children": [],
                                "width": 50,
                                "height": 50,
                                "x": 25,
                                "y": 25,
                                "rank": 0
                            }, {
                                "id": "A12",
                                "parent": "A1",
                                "children": [],
                                "width": 50,
                                "height": 50,
                                "x": 115,
                                "y": 25,
                                "rank": 2
                            }],
                            "edges": [{
                                "source": "A11",
                                "target": "A12",
                                "points": [{"x": 50, "y": 25}, {"x": 70, "y": 25}, {"x": 90, "y": 25}]
                            }],
                            "graph": {"width": 140, "height": 50}
                        },
                        "width": 140,
                        "height": 50,
                        "x": 70,
                        "y": 25,
                        "rank": 0
                    }, {
                        "id": "A2",
                        "parent": "A",
                        "children": [],
                        "width": 50,
                        "height": 50,
                        "x": 205,
                        "y": 25,
                        "rank": 2
                    }],
                    "edges": [{
                        "source": "A1",
                        "target": "A2",
                        "points": [{"x": 140, "y": 25}, {"x": 160, "y": 25}, {"x": 180, "y": 25}]
                    }],
                    "graph": {"width": 230, "height": 50}
                },
                "width": 230,
                "height": 50,
                "x": 115,
                "y": 25,
                "rank": 0
            }, {
                "id": "B",
                "children": ["B1", "B2"],
                "part": {
                    "nodes": [{
                        "id": "B1",
                        "parent": "B",
                        "children": [],
                        "width": 50,
                        "height": 50,
                        "x": 25,
                        "y": 25,
                        "rank": 0
                    }, {
                        "id": "B2",
                        "parent": "B",
                        "children": ["B21", "B22"],
                        "part": {
                            "nodes": [{
                                "id": "B21",
                                "parent": "B2",
                                "children": [],
                                "width": 50,
                                "height": 50,
                                "x": 25,
                                "y": 25,
                                "rank": 0
                            }, {
                                "id": "B22",
                                "parent": "B2",
                                "children": [],
                                "width": 50,
                                "height": 50,
                                "x": 115,
                                "y": 25,
                                "rank": 2
                            }],
                            "edges": [{
                                "source": "B21",
                                "target": "B22",
                                "points": [{"x": 50, "y": 25}, {"x": 70, "y": 25}, {"x": 90, "y": 25}]
                            }],
                            "graph": {"width": 140, "height": 50}
                        },
                        "width": 140,
                        "height": 50,
                        "x": 160,
                        "y": 25,
                        "rank": 2
                    }],
                    "edges": [{
                        "source": "B1",
                        "target": "B2",
                        "points": [{"x": 50, "y": 25}, {"x": 70, "y": 25}, {"x": 90, "y": 25}]
                    }],
                    "graph": {"width": 230, "height": 50}
                },
                "width": 230,
                "height": 50,
                "x": 385,
                "y": 25,
                "rank": 2
            }],
            "edges": [{
                "source": "A",
                "target": "B",
                "points": [{"x": 230, "y": 25}, {"x": 250, "y": 25}, {"x": 270, "y": 25}]
            }],
            "graph": {"width": 500, "height": 50}
        }
        expect(result).to.eql(layoutGraph, result);
    })

    it('布局并返回扁平化数据', () => {
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
        const result = layoutAndFlattenNestedGraph(data, config);
        const flatGraph = {
            "nodes": [{
                "id": "A", "width": 230, "height": 50, "x": 115, "y": 25,
                parent: undefined,
                "children": ["A1", "A2"]
            }, {
                "id": "A1",
                "width": 140,
                "height": 50,
                "x": 70,
                "y": 25,
                "parent": "A",
                "children": ["A11", "A12"]
            }, {"id": "A11", "width": 50, "height": 50, "x": 25, "y": 25, "parent": "A1", "children": []}, {
                "id": "A12",
                "width": 50,
                "height": 50,
                "x": 115,
                "y": 25,
                "parent": "A1",
                "children": []
            }, {"id": "A2", "width": 50, "height": 50, "x": 205, "y": 25, "parent": "A", "children": []}, {
                "id": "B",
                "width": 230,
                "height": 50,
                "x": 385,
                "y": 25,
                parent: undefined,
                "children": ["B1", "B2"]
            }, {"id": "B1", "width": 50, "height": 50, "x": 25, "y": 25, "parent": "B", "children": []}, {
                "id": "B2",
                "width": 140,
                "height": 50,
                "x": 160,
                "y": 25,
                "parent": "B",
                "children": ["B21", "B22"]
            }, {"id": "B21", "width": 50, "height": 50, "x": 25, "y": 25, "parent": "B2", "children": []}, {
                "id": "B22",
                "width": 50,
                "height": 50,
                "x": 115,
                "y": 25,
                "parent": "B2",
                "children": []
            }],
            "edges": [{
                "source": "A11",
                "target": "A12",
                "points": [{"x": 50, "y": 25}, {"x": 70, "y": 25}, {"x": 90, "y": 25}]
            }, {
                "source": "A1",
                "target": "A2",
                "points": [{"x": 140, "y": 25}, {"x": 160, "y": 25}, {"x": 180, "y": 25}]
            }, {
                "source": "B21",
                "target": "B22",
                "points": [{"x": 50, "y": 25}, {"x": 70, "y": 25}, {"x": 90, "y": 25}]
            }, {
                "source": "B1",
                "target": "B2",
                "points": [{"x": 50, "y": 25}, {"x": 70, "y": 25}, {"x": 90, "y": 25}]
            }, {
                "source": "A",
                "target": "B",
                "points": [{"x": 230, "y": 25}, {"x": 250, "y": 25}, {"x": 270, "y": 25}]
            }]
        }
        expect(result).to.eql(flatGraph);
    })
})
