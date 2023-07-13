const data = {
    nodes: [
        {id: 'A', children: ['A1', 'A2', 'A3']},
        {id: 'B', children: ['B1', 'B2', 'B3']},
        {id: 'C', width: 100, height: 50},
        {id: 'A1', parent: 'A', children: ['A11', 'A12', 'A13']},
        {id: 'A2', parent: 'A', children: []},
        {id: 'A3', parent: 'A', children: []},
        {id: 'B1', parent: 'B', children: []},
        {id: 'B2', parent: 'B', children: ['B21', 'B22', 'B23']},
        {id: 'B3', parent: 'B', children: []},
        {id: 'A11', parent: 'A1', children: []},
        {id: 'A12', parent: 'A1', children: []},
        {id: 'A13', parent: 'A1', children: []},
        {id: 'B21', parent: 'B2', children: []},
        {id: 'B22', parent: 'B2', children: []},
        {id: 'B23', parent: 'B2', children: []},
    ],
    edges: [
        {source: 'A', target: 'B'},
        {source: 'A', target: 'C'},
        {source: 'A1', target: 'A2'},
        {source: 'A1', target: 'A3'},
        {source: 'B1', target: 'B2'},
        {source: 'A11', target: 'A12'},
        {source: 'B21', target: 'B22'},
        {source: 'B23', target: 'B22'},
    ]
}

export default data
