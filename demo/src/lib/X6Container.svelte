<script>
    import {onMount} from "svelte";
    import {Graph} from "@antv/x6";
    import {parse, layoutAndFlattenNestedGraph} from "dagre-plus"
    import data from "../../data/graphData.js";

    const parsedGraph = parse(data)
    const layoutData = layoutAndFlattenNestedGraph(parsedGraph, {
        direction: 'LR',
        spacing: 40,
        ranker: 'network-simplex'
    })


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
        const nodes = layoutData.nodes.map(node => {
            const {id, label, width, height} = node;
            const x = node.x - width / 2;
            const y = node.y - height / 2;
            return {id, label, x, y, width, height};
        });

        const edges = layoutData.edges.map(edge => {
            const source = edge.points.shift();
            const target = edge.points.pop();
            const vertices = edge.points;
            return {source, target, vertices};
        });

        createX6Graph({nodes, edges});
    });
</script>
<div bind:this={container} class="container">

</div>
<style>
    .container {

    }
</style>
