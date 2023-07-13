import dagre from '@dagrejs/dagre';

/**
 * 图的扁平的数据结构转成布局需要的树型
 * @param graphData
 * @return {{}}
 */
function parse(graphData) {
    if (!graphData) {
        throw new Error('参数不合法')
    }

    let {nodes, edges} = graphData ?? {};
    nodes = nodes ?? [];
    edges = edges ?? [];

    const edgeSet = new Set(edges);
    const nodeMap = convertNodesToMap(nodes);

    // 找到根节点
    const rootNodes = nodes.filter(node => !node.parent);

    return parseNodesToTree(rootNodes, nodeMap, edgeSet);
}

function parseNodesToTree(rootNodes, nodeMap, edgeSet) {
    const rootPart = {nodes: [], edges: []};
    rootNodes.forEach(node => {
        rootPart.nodes.push(node);
        rootPart.edges.push(...filterEdgesFromEdgeSetByNodeId(edgeSet, node.id));

        const children = node.children;
        if (children && children.length) {
            const childNodes = [];
            children.forEach(childNodeId => {
                const childNode = nodeMap.get(childNodeId);
                nodeMap.delete(childNodeId);
                childNodes.push(childNode);
            });
            node.part = parseNodesToTree(childNodes, nodeMap, edgeSet);
        }
    });
    return rootPart;
}

// 从 edge 集合里边筛选节点相关的边并从集合中移除
function filterEdgesFromEdgeSetByNodeId(edgeSet, nodeId) {
    const result = [];
    for (let edge of edgeSet) {
        if (edge.source === nodeId || edge.target === nodeId) {
            result.push(edge);
            edgeSet.delete(edge);
        }
    }
    return result;
}

/**
 * 节点列表转成 map
 * @param nodes
 * @return {Map<any, any>}
 */
function convertNodesToMap(nodes) {
    const nodeMap = new Map();

    nodes.forEach(node => {
        nodeMap.set(node.id, node);
    });
    return nodeMap;
}

/**
 * 布局算法计算嵌套图的宽高和元素的相对位置，渲染图的时候需要计算各级节点的绝对位置
 * @param nestedGraph
 * @param config
 * @return {*}
 */
function layout(nestedGraph, config) {
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
    });

    const g = initGraph(config);

    addElementsToGraph(nestedGraph, g);

    dagre.layout(g);

    updateLayoutAttributes(nestedGraph, g);

    const graph = g.graph();
    nestedGraph.graph = {width: graph.width + config.spacing, height: graph.height + config.spacing};
    return nestedGraph;
}

/**
 * 布局并返回扁平化数据
 * @param nestedGraph
 * @param config
 * @return {{nodes: *[], edges: *[]}}
 */
function layoutAndFlattenNestedGraph(nestedGraph, config) {
    layout(nestedGraph, config);
    return flattenNestedGraphAndConvertPosition(nestedGraph, config);
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
    });

    // 将计算完的布局属性更新到边上
    edges.forEach(edge => {
        const {source: v, target: w} = edge;
        Object.assign(edge, g.edge({v, w}));
    });
}

/**
 * 将嵌套的数据做扁平化处理，并且计算节点的绝对位置
 * @param nestedGraph
 * @param offset
 * @return {{nodes: *[], edges: *[]}}
 */
function flattenNestedGraphAndConvertPosition(nestedGraph, config, offset) {
    const flatGraph = {nodes: [], edges: []};
    const {nodes, edges} = nestedGraph;
    offset = offset ?? {x: 0, y: 0};
    nodes.forEach(node => {
        // 转换坐标
        const x = node.x + offset.x, y = node.y + offset.y;
        const width = node.width, height = node.height;
        flatGraph.nodes.push({
            id: node.id,
            width: node.width, height: node.height,
            x, y,
            parent: node.parent, children: node.children
        });
        if (node.part) {
            const parentOffset = {
                x: x - width / 2 + config.spacing / 2,
                y: y - height / 2 + config.spacing / 2
            };
            const partNestedGraph = flattenNestedGraphAndConvertPosition(node.part, config, parentOffset);
            flatGraph.nodes.push(...partNestedGraph.nodes);
            flatGraph.edges.push(...partNestedGraph.edges);
        }
    });

    edges.forEach(edge => {
        if (edge.points) {
            edge.points.forEach(point => {
                point.x += offset.x;
                point.y += offset.y;
            });
        }
        flatGraph.edges.push(edge);
    });
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

export { layout, layoutAndFlattenNestedGraph, parse };
//# sourceMappingURL=dagre-plus.es.js.map
