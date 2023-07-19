<script>
    import {onMount} from "svelte";
    import {Graph} from "@antv/x6";
    import {layoutAndFlattenNestedGraph, parse} from "dagre-plus"
    import {data1, data2} from "../../data/graphData.js";

    function layout(graphData) {
        const parsedGraph = parse(graphData)
        const config = {direction: 'LR', spacing: 40, ranker: 'network-simplex'}
        return layoutAndFlattenNestedGraph(parsedGraph, config)
    }

    let container;
    let x6Graph;

    function createX6Graph(data) {
        x6Graph = new Graph({
            container,
            width: 1200,
            height: 800,
            background: {color: '#efefef'},
        });

        x6Graph.fromJSON(data);
        x6Graph.centerContent();
    }

    onMount(() => {
        const layoutData = layout(data1)
        const dimension = layoutData.nodes.length;
        const nodes = layoutData.nodes.map(node => {
            console.log({id: node.id, rank: node.rank, order: node.order, sort: node.rank * dimension + node.order})
            const {id, label, width, height, parent, children} = node;
            const x = node.x - width / 2;
            const y = node.y - height / 2;
            return {id, label, x, y, width, height, parent, children};
        });

        const edges = layoutData.edges.map(edge => {
            const source = edge.points.shift();
            const target = edge.points.pop();
            const vertices = edge.points;
            return {source, target, vertices};
        });

        createX6Graph({nodes, edges});
    });

    let dataIdx = 0;

    function handleToggle() {
        const data = dataIdx++ % 2 === 0 ? data2 : data1;
        const layoutData = layout(data)

        const nodes = layoutData.nodes.map(node => {
            const {id, label, width, height, parent, children} = node;
            const x = node.x - width / 2;
            const y = node.y - height / 2;
            return {id, label, x, y, width, height, parent, children};
        });

        const edges = layoutData.edges.map(edge => {
            const source = edge.points.shift();
            const target = edge.points.pop();
            const vertices = edge.points;
            return {source, target, vertices};
        });

        x6Graph.fromJSON({nodes, edges});
        // x6Graph.centerContent();
    }
</script>
<div class="tool-bar">
    <button on:click={handleToggle}>toggle</button>
</div>
<div bind:this={container} class="container">

</div>
<style>
    .tool-bar {
        padding: 8px 0;
        display: flex;
        justify-content: flex-end;
    }

    .tool-bar button {
        display: block;
    }

    .container {

    }
</style>
