const data = {
    nodes: [
        {
            id: 'A', label: 'A',
            width: 50, height: 40,
            parent: 'G',
        },
        {
            id: 'B', label: 'B',
            width: 50, height: 40,
            parent: 'G',
        },
        {
            id: 'C', label: 'C',
            width: 50, height: 40,
            parent: 'G',
        },
        {
            id: 'X', label: 'X',
            width: 50, height: 40,
            parent: 'G',
        },
        {
            id: 'Y', label: 'Y',
            width: 50, height: 40,
            parent: 'G',
        },
        {
            id: 'D', label: 'D',
            width: 50, height: 40
        },
        {
            id: 'E', label: 'E',
            "width": 550, "height": 435,
            children: ['1', '2', '3', '4', '5', '6', '7']
        },
        {
            id: 'F', label: 'F',
            width: 50, height: 40
        },
        {
            id: 'G', label: 'G',
            "width": 725, "height": 200,
            children: ['A', 'B', 'C', 'X', 'Y']
        },
        {
            id: '1', label: '1',
            width: 50, height: 40,
            parent: 'E',
        },
        {
            id: '2', label: '2',
            width: 50, height: 40,
            parent: 'E',
        },
        {
            id: '3', label: '3',
            width: 50, height: 40,
            parent: 'E',
        },
        {
            id: '4', label: '4',
            width: 50, height: 40,
            parent: 'E',
        },
        {
            id: '5', label: '5',
            width: 50, height: 40,
            parent: 'E',
        },
        {
            id: '6', label: '6',
            width: 250, height: 140,
            parent: 'E',
        },
        {
            id: '7', label: '7',
            width: 50, height: 40,
            parent: 'E',
        },
    ],
    edges: [
        {source: 'A', target: 'B'},
        {source: 'A', target: 'C'},
        {source: 'C', target: 'X'},
        {source: 'X', target: 'Y'},
        {source: 'D', target: 'E'},
        {source: 'E', target: 'F'},
        {source: 'D', target: 'G'},
        {source: '1', target: '2'},
        {source: '1', target: '3'},
        {source: '4', target: '5'},
        {source: '4', target: '6'},
        {source: '6', target: '7'},
    ],
}

export default data
