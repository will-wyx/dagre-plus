import {parse} from "../src/parser.js";
import {expect} from "chai";

describe('数据结构转换函数测试', () => {
    it('空结构', () => {
        expect(parse({nodes: [], edges: []}))
            .to.be.deep.equal({nodes: [], edges: []})
    })

    it('空对象', () => {
        expect(parse({}))
            .to.be.deep.equal({nodes: [], edges: []})
    })

    it('空参数', () => {
        // expect(parse())
        //     .to.be.deep.equal({nodes: [], edges: []})
        expect(() => parse()).to.throw(Error, '参数不合法')
    })

    it('二级嵌套', () => {
        const input = {
            nodes: [
                {id: 'A', children: ['A1', 'A2']},
                {id: 'B', children: ['B1', 'B2']},
                {id: 'A1', parent: 'A', children: ['A11', 'A12']},
                {id: 'A2', parent: 'A', children: []},
                {id: 'B1', parent: 'B', children: []},
                {id: 'B2', parent: 'B', children: ['B21', 'B22']},
                {id: 'A11', parent: 'A1', children: []},
                {id: 'A12', parent: 'A1', children: []},
                {id: 'B21', parent: 'B2', children: []},
                {id: 'B22', parent: 'B2', children: []},
            ],
            edges: [
                {source: 'A', target: 'B'},
                {source: 'A1', target: 'A2'},
                {source: 'B1', target: 'B2'},
                {source: 'A11', target: 'A12'},
                {source: 'B21', target: 'B22'},
            ]
        }
        const output = {
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
        expect(parse(input)).to.be.deep.equal(output)
    })

    it('二级嵌套，无 children 属性', () => {
        const input = {
            nodes: [
                {id: 'A', children: ['A1', 'A2']},
                {id: 'B', children: ['B1', 'B2']},
                {id: 'A1', parent: 'A', children: ['A11', 'A12']},
                {id: 'A2', parent: 'A'},
                {id: 'B1', parent: 'B', children: []},
                {id: 'B2', parent: 'B', children: ['B21', 'B22']},
                {id: 'A11', parent: 'A1', children: []},
                {id: 'A12', parent: 'A1', children: []},
                {id: 'B21', parent: 'B2', children: []},
                {id: 'B22', parent: 'B2', children: []},
            ],
            edges: [
                {source: 'A', target: 'B'},
                {source: 'A1', target: 'A2'},
                {source: 'B1', target: 'B2'},
                {source: 'A11', target: 'A12'},
                {source: 'B21', target: 'B22'},
            ]
        }
        const output = {
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
        expect(parse(input)).to.be.deep.equal(output)
    })

    it('折叠容器', () => {
        const input = {
            nodes: [
                {id: 'A', children: ['A1', 'A2']},
                {id: 'B', children: ['B1', 'B2'], collapsed: true},
                {id: 'A1', parent: 'A', children: ['A11', 'A12']},
                {id: 'A2', parent: 'A'},
                {id: 'B1', parent: 'B', children: []},
                {id: 'B2', parent: 'B', children: ['B21', 'B22']},
                {id: 'A11', parent: 'A1', children: []},
                {id: 'A12', parent: 'A1', children: []},
                {id: 'B21', parent: 'B2', children: []},
                {id: 'B22', parent: 'B2', children: []},
            ],
            edges: [
                {source: 'A', target: 'B'},
                {source: 'A1', target: 'A2'},
                {source: 'B1', target: 'B2'},
                {source: 'A11', target: 'A12'},
                {source: 'B21', target: 'B22'},
            ]
        }
        const output = {
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
                    }],
                    edges: [{source: 'A1', target: 'A2'}]
                }
            }, {
                id: 'B',
                children: ['B1', 'B2'],
                collapsed: true,
                part: {
                    nodes: [{
                        id: 'B1', parent: 'B', children: [], hide: true
                    }, {
                        id: 'B2',
                        parent: 'B',
                        children: ['B21', 'B22'],
                        hide: true,
                        part: {
                            nodes: [{
                                id: 'B21', parent: 'B2', children: [], hide: true
                            }, {
                                id: 'B22', parent: 'B2', children: [], hide: true
                            }],
                            edges: [{source: 'B21', target: 'B22'}]
                        }
                    }],
                    edges: [{source: 'B1', target: 'B2'}]
                }
            }],
            edges: [{source: 'A', target: 'B'}]
        }
        expect(parse(input)).to.be.deep.equal(output)
    })
})
