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

    let {nodes, edges} = nestedGraph;

    // 需要递归对子元素进行布局算法的调用，为了计算 width、height
    // 遍历 nodes 递归 layout
    nodes.forEach(node => {
        if (node.part) {
            layout(node.part, config);
        }
    })

    const g = initGraph(config);
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

    dagre.layout(g);

    nodes.forEach(node => {
        bindNodeLayoutProperties(node, g.node(node.id));
    })

    const graph = g.graph();
    nestedGraph.graph = {width: graph.width, height: graph.height};
    return nestedGraph;
}

/**
 * 将计算完的布局属性更新到节点上
 * @param targetNode
 * @param layoutProperties
 */
function bindNodeLayoutProperties(targetNode, layoutProperties) {
    for (let key of Object.keys(layoutProperties)) {
        targetNode[key] = layoutProperties[key];
    }
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
