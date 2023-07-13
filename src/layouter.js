import dagre from '@dagrejs/dagre'

/**
 * 布局算法计算嵌套图的宽高和元素的相对位置，渲染图的时候需要计算各级节点的绝对位置
 * @param nestedGraph
 * @param config
 * @return {*}
 */
export function layout(nestedGraph, config) {
    if (!nestedGraph) {
        throw new Error('参数不合法');
    }

    const {nodes, edges} = nestedGraph;

    // 需要递归对子元素进行布局算法的调用，为了计算 width、height
    // 遍历 nodes 递归 layout
    nodes.forEach(node => {
        if (node.part) {
            layout(node.part, config);
        }
    })

    const g = initGraph(config);

    addElementsToGraph(nestedGraph, g);

    dagre.layout(g);

    updateLayoutAttributes(nestedGraph, g);

    const graph = g.graph();
    nestedGraph.graph = {width: graph.width, height: graph.height};
    return nestedGraph;
}

/**
 * 布局并返回扁平化数据
 * @param nestedGraph
 * @param config
 * @return {{nodes: *[], edges: *[]}}
 */
export function layoutAndFlattenNestedGraph(nestedGraph, config) {
    layout(nestedGraph, config);
    return flattenNestedGraphAndConvertPosition(nestedGraph);
}

/**
 * 将节点和边加入到用于布局的图上
 * @param nodes
 * @param edges
 * @param g
 */
function addElementsToGraph({nodes, edges}, g) {
    nodes.forEach(node => {
        let width = node.width || 50, height = node.height || 50;
        if (node.part && node.part.graph) {
            width = node.part.graph.width;
            height = node.part.graph.height;
        }
        g.setNode(node.id, {width, height});
    });

    edges.forEach(edge => {
        g.setEdge(edge.source, edge.target);
    });
}

/**
 * 将计算完的布局属性更新到图数据上
 * @param nodes
 * @param edges
 * @param g
 */
function updateLayoutAttributes({nodes, edges}, g) {
    // 将计算完的布局属性更新到节点上
    nodes.forEach(node => {
        Object.assign(node, g.node(node.id));
    })

    // 将计算完的布局属性更新到边上
    edges.forEach(edge => {
        const {source: v, target: w} = edge;
        Object.assign(edge, g.edge({v, w}));
    })
}

/**
 * 将嵌套的数据做扁平化处理，并且计算节点的绝对位置
 * @param nestedGraph
 * @param offset
 * @return {{nodes: *[], edges: *[]}}
 */
function flattenNestedGraphAndConvertPosition(nestedGraph, offset) {
    const flatGraph = {nodes: [], edges: []};
    const {nodes, edges} = nestedGraph;
    offset = offset ?? {x: 0, y: 0};
    nodes.forEach(node => {
        // 转换坐标
        const x = node.x + offset.x, y = node.y + offset.y;
        flatGraph.nodes.push({
            id: node.id,
            width: node.width, height: node.height,
            x, y,
            parent: node.parent, children: node.children
        });
        if (node.part) {
            const partNestedGraph = flattenNestedGraphAndConvertPosition(node.part, {x, y});
            flatGraph.nodes.push(...partNestedGraph.nodes);
            flatGraph.edges.push(...partNestedGraph.edges);
        }
    });
    flatGraph.edges.push(...edges);
    return flatGraph;
}

function initGraph(config) {
    const g = new dagre.graphlib.Graph();

    g.setGraph({
        rankdir: config.direction,
        nodesep: config.spacing,
        edgesep: config.spacing,
        ranksep: config.spacing,
        acyclicer: config.acyclicer,
        ranker: config.ranker,

    }).setDefaultEdgeLabel(() => ({}));
    return g;
}
