const prevData = {
    nodes: [
        {"id": "D", "label": "D"},
        {"id": "A", "children": ["A1", "A2", "A3"], "label": "A"},
        {"id": "B", "children": ["B1", "B2", "B3"], "label": "B"},
        {"id": "A1", "parent": "A", "children": ["A11", "A12", "A13"], "label": "A1"},
        {"id": "A2", "parent": "A", "children": [], "label": "A2"},
        {"id": "A3", "parent": "A", "children": [], "label": "A3"},
        {"id": "B1", "parent": "B", "children": [], "label": "B1"},
        {"id": "B2", "parent": "B", "children": ["B21", "B22", "B23"], "label": "B2"},
        {"id": "B3", "parent": "B", "children": [], "label": "B3"},
        {"id": "A11", "parent": "A1", "children": [], "label": "A11"},
        {"id": "A12", "parent": "A1", "children": [], "label": "A12"},
        {"id": "A13", "parent": "A1", "children": [], "label": "A13"},
        {"id": "B21", "parent": "B2", "children": [], "label": "B21"},
        {"id": "B22", "parent": "B2", "children": [], "label": "B22"},
        {"id": "B23", "parent": "B2", "children": [], "label": "B23"},
        {"id": "C", "children": ["C1", "C2", "C3"], "label": "C"},
        {"id": "C1", "parent": "C", "width": 300, "height": 100, "label": "C1"},
        {"id": "C2", "parent": "C", "children": [], "label": "C2"},
        {"id": "C3", "parent": "C", "children": [], "label": "C3"},
    ],
    edges: [
        {source: 'A', target: 'C'},
        {source: 'A', target: 'B'},
        // {source: 'A', target: 'D'},
        // {source: 'D', target: 'B'},
        {source: 'A1', target: 'A2'},
        {source: 'A1', target: 'A3'},
        {source: 'B1', target: 'B2'},
        {source: 'A11', target: 'A12'},
        {source: 'B21', target: 'B22'},
        {source: 'B23', target: 'B22'},
        {source: 'C1', target: 'C2'},
        {source: 'C1', target: 'C3'},
    ]
}

const data = {
    nodes: [
        {"id": "D", "label": "D"},
        {"id": "A", "children": ["A1", "A2", "A3"], "label": "A"},
        {"id": "B", "children": ["B1", "B2", "B3"], "label": "B"},
        {"id": "A1", "parent": "A", "children": ["A11", "A12", "A13"], "label": "A1"},
        {"id": "A2", "parent": "A", "children": [], "label": "A2"},
        {"id": "A3", "parent": "A", "children": [], "label": "A3"},
        {"id": "B1", "parent": "B", "children": [], "label": "B1"},
        {"id": "B2", "parent": "B", "children": ["B21", "B22", "B23"], "label": "B2"},
        {"id": "B3", "parent": "B", "children": [], "label": "B3"},
        {"id": "A11", "parent": "A1", "children": [], "label": "A11"},
        {"id": "A12", "parent": "A1", "children": [], "label": "A12"},
        {"id": "A13", "parent": "A1", "children": [], "label": "A13"},
        {"id": "B21", "parent": "B2", "children": [], "label": "B21"},
        {"id": "B22", "parent": "B2", "children": [], "label": "B22"},
        {"id": "B23", "parent": "B2", "children": [], "label": "B23"},
        {"id": "C", "children": ["C1", "C2", "C3"], "label": "C", "collapsed": true},
        {"id": "C1", "parent": "C", "width": 300, "height": 100, "label": "C1"},
        {"id": "C2", "parent": "C", "children": [], "label": "C2"},
        {"id": "C3", "parent": "C", "children": [], "label": "C3"},
    ],
    edges: [
        {source: 'A', target: 'B'},
        {source: 'A', target: 'C'},
        // {source: 'A', target: 'D'},
        // {source: 'D', target: 'B'},
        {source: 'A1', target: 'A2'},
        {source: 'A1', target: 'A3'},
        {source: 'B1', target: 'B2'},
        {source: 'A11', target: 'A12'},
        {source: 'B21', target: 'B22'},
        {source: 'B23', target: 'B22'},
        {source: 'C1', target: 'C2'},
        {source: 'C1', target: 'C3'},
    ]
}

const data1 = {
    nodes: [
        {"id": "A", "label": "A"},
        {"id": "B", "label": "B", width: 100},
        {"id": "C", "label": "C", height: 100},
    ],
    edges: [
        {source: 'A', target: 'C'},
        {source: 'A', target: 'B'},
    ]
}

const data2 = {
    nodes: [
        {"id": "A", "label": "A"},
        {"id": "B", "label": "B", width: 100},
        {"id": "C", "label": "C", height: 100},
        {"id": "D", "label": "D"},
    ],
    edges: [
        {source: 'A', target: 'C'},
        {source: 'A', target: 'B'},
        {source: 'C', target: 'D'},
    ]
}

const data3 = {
    "nodes": [
        {
            "revision": 1,
            "createBy": null,
            "createTime": "2023-05-24 08:47:58",
            "updateBy": null,
            "updateTime": "2023-05-24 08:47:58",
            "dataStatus": 1,
            "modelId": "d6cf9d28906d2fdebd9f9bb6c9a8d3e4",
            "id": "a0c286a79cfd97ba23b5d7a7eaa96534",
            "label": "开始",
            "nodeCode": "START",
            "nodeType": "START",
            "nodeX": null,
            "nodeY": null,
            "parent": null,
            "nodeLeftVal": null,
            "nodeLeftValCodePath": null,
            "nodeLeftObjId": null,
            "nodeRightVal": null,
            "nodeRightValStr": null,
            "nodeRightValCodeStr": null,
            "nodeRightValInCodePath": null,
            "nodeRightValType": null,
            "nodeOp": null,
            "nodeGroupBoolOp": null,
            "nodeConditionType": null,
            "isRoot": "Y",
            "data": {"foo":"bar"}
        },
        {
            "revision": 4,
            "createBy": "1",
            "createTime": "2023-05-26 14:15:49",
            "updateBy": "1",
            "updateTime": "2023-07-25 10:50:17",
            "dataStatus": 1,
            "modelId": "d6cf9d28906d2fdebd9f9bb6c9a8d3e4",
            "id": "68fbddbc53495c0459cfea9ba816de3a",
            "label": "条件",
            "nodeCode": "CONDITION",
            "nodeType": "CONDITION",
            "nodeX": null,
            "nodeY": null,
            "parent": null,
            "nodeLeftVal": null,
            "nodeLeftValCodePath": null,
            "nodeLeftObjId": null,
            "nodeRightVal": null,
            "nodeRightValStr": null,
            "nodeRightValCodeStr": null,
            "nodeRightValInCodePath": null,
            "nodeRightValType": null,
            "nodeOp": null,
            "nodeGroupBoolOp": null,
            "nodeConditionType": null,
            "isRoot": "N",
            "children": [
                "ef8937fa447c0bc9b5ee5815df3a28bd",
                "3173147364a12361d53ddf170a737e54"
            ],
        },
        {
            "revision": 4,
            "createBy": "1",
            "createTime": "2023-05-26 14:15:49",
            "updateBy": "1",
            "updateTime": "2023-07-25 10:50:17",
            "dataStatus": 1,
            "modelId": "d6cf9d28906d2fdebd9f9bb6c9a8d3e4",
            "id": "ef8937fa447c0bc9b5ee5815df3a28bd",
            "label": "条件",
            "nodeCode": "CONDITION",
            "nodeType": "CONDITION",
            "nodeX": null,
            "nodeY": null,
            "parent": "68fbddbc53495c0459cfea9ba816de3a",
            "nodeLeftVal": null,
            "nodeLeftValCodePath": null,
            "nodeLeftObjId": null,
            "nodeRightVal": null,
            "nodeRightValStr": null,
            "nodeRightValCodeStr": null,
            "nodeRightValInCodePath": null,
            "nodeRightValType": null,
            "nodeOp": null,
            "nodeGroupBoolOp": null,
            "nodeConditionType": null,
            "isRoot": "Y",
        },
        {
            "revision": 4,
            "createBy": "1",
            "createTime": "2023-05-26 14:15:54",
            "updateBy": "1",
            "updateTime": "2023-07-25 10:50:17",
            "dataStatus": 1,
            "modelId": "d6cf9d28906d2fdebd9f9bb6c9a8d3e4",
            "id": "3173147364a12361d53ddf170a737e54",
            "label": "条件",
            "nodeCode": "CONDITION",
            "nodeType": "CONDITION",
            "nodeX": null,
            "nodeY": null,
            "parent": "68fbddbc53495c0459cfea9ba816de3a",
            "nodeLeftVal": "6f3aad92422941254db4bfc3d6e55c03",
            "nodeLeftValCodePath": "formula_test.forIndicator",
            "nodeLeftObjId": null,
            "nodeRightVal": null,
            "nodeRightValStr": null,
            "nodeRightValCodeStr": null,
            "nodeRightValInCodePath": null,
            "nodeRightValType": "VARIABLE",
            "nodeOp": "=",
            "nodeGroupBoolOp": null,
            "nodeConditionType": null,
            "isRoot": "N",
        }
    ],
    "edges": [
        {
            "revision": 1,
            "createBy": "1",
            "createTime": "2023-05-26 14:15:49",
            "updateBy": null,
            "updateTime": "2023-05-26 14:15:49",
            "dataStatus": 1,
            "source": "a0c286a79cfd97ba23b5d7a7eaa96534",
            "target": "68fbddbc53495c0459cfea9ba816de3a",
            "vertices": null,
            "modelId": "d6cf9d28906d2fdebd9f9bb6c9a8d3e4",
            "parentNodeId": null,
            "shape": "edge"
        },
        {
            "revision": 1,
            "createBy": "1",
            "createTime": "2023-05-26 14:15:54",
            "updateBy": null,
            "updateTime": "2023-05-26 14:15:54",
            "dataStatus": 1,
            "source": "ef8937fa447c0bc9b5ee5815df3a28bd",
            "target": "3173147364a12361d53ddf170a737e54",
            "vertices": null,
            "modelId": "d6cf9d28906d2fdebd9f9bb6c9a8d3e4",
            "parentNodeId": "68fbddbc53495c0459cfea9ba816de3a",
            "shape": "edge"
        }
    ]
}

export {prevData, data, data1, data2, data3}
