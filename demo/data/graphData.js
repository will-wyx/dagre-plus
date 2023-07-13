const data = {
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

export default data
