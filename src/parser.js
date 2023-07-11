/**
 * 图的扁平的数据结构转成布局需要的树型
 * @param graphData
 * @return {{}}
 */
export function parse(graphData) {
    const {nodes, edges} = graphData;

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
                childNodes.push(childNode)
            });
            node.part = parseNodesToTree(childNodes, nodeMap, edgeSet);
        }
    })
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
    })
    return nodeMap;
}
