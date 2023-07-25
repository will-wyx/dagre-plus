<script>
    import {onMount} from "svelte";
    import {Graph} from "@antv/x6";
    import {layoutAndFlattenNestedGraph, parse} from "dagre-plus"
    import {prevData, data, data1, data2, data3} from "../../data/graphData.js";

    const config = {direction: 'LR', spacing: 40, containerHeader: 40, ranker: 'network-simplex'}

    function layout(graphData, config) {
        const parsedGraph = parse(graphData)
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
            connecting: {
                // router: {
                //     name: 'er',
                //     args: {
                //         // offset: 'center',
                //     },
                // },
                router: {
                    name: 'normal',
                },
            }
        });

        x6Graph.fromJSON(data);
        x6Graph.centerContent();
    }

    onMount(() => {
        // const prevGraph = layout(prevData, config)
        // console.log(prevGraph);
        const layoutData = layout(data3, {...config})
        const dimension = layoutData.nodes.length;
        const nodes = layoutData.nodes.map(node => {
            // console.log({id: node.id, rank: node.rank, order: node.order, sort: node.rank * dimension + node.order})
            const {id, label, width, height, parent, children} = node;
            const x = node.x - width / 2;
            const y = node.y - height / 2;
            return {id, label, x, y, width, height, parent, children};
        });

        const edges = layoutData.edges.map(edge => {
            // const source = edge.points.shift();
            // const target = edge.points.pop();
            // const vertices = edge.points;
            // return {source, target, vertices};
            const {source, target} = edge;
            return {source, target};

            // edge.points.shift();
            // edge.points.pop();
            // const {source, target} = edge;
            // const vertices = edge.points;
            // return {source, target, vertices};
        });

        createX6Graph({nodes, edges});
    });

    let dataIdx = 0;

    function handleToggle() {
        // todo 更新布局用 cell.translate(0, 0, {transition: true}) 设定位移动画
        const data = dataIdx++ % 2 === 0 ? data2 : data1;
        const layoutData = layout(data, config)

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
