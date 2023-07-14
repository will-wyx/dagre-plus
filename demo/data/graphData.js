const data = {
    nodes: [
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
        {"id": "D", "label": "D"}
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
        {source: 'C1', target: 'C2'},
        {source: 'C1', target: 'C3'},
        {source: 'C', target: 'D'},
    ]
}

export default data
