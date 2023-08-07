# dagre-plus - 扩展 [dagre](https://github.com/dagrejs/dagre) 嵌套布局

## 使用 dagre-plus

### 示例

```javascript
import {layoutAndFlattenNestedGraph, parse} from "dagre-plus"

const graphData = {
    nodes: [
        {id: "A", label: "A", children: ["A1", "A2"]},
        {id: "A1", label: "A1", parent: "A"},
        {id: "A2", label: "A2", parent: "A"},
        {id: "B", label: "B", width: 100},
        {id: "C", label: "C", height: 100},
    ],
    edges: [
        {source: 'A', target: 'C'},
        {source: 'A', target: 'B'},
        {source: 'A1', target: 'A2'},
    ]
}
const parsedGraph = parse(graphData)

const config = {direction: 'LR', spacing: 40, containerHeader: 40, ranker: 'network-simplex'}
const graph = layoutAndFlattenNestedGraph(parsedGraph, config)
```

### 配置

#### Graph
* `direction`：方向，可选值 `TB`|`BT`|`LR`|`RL`，默认 `TB`
* `spacing`：间隔，数值类型，默认 `40`
* `nodesep`：节点间距，数值类型，如果未设定就取 `spacing` 值
* `edgesep`：边间距，数值类型，如果未设定就取 `spacing` 值
* `ranksep`：rank 间距，数值类型，如果未设定就取 `spacing` 值
* `containerHeader`：容器头部高度，数值类型，默认 `0`
* `ranker`：ranker 算法，可选值 `network-simplex`|`tight-tree`|`longest-path`，默认 `network-simplex`
* `prevGraph`：保持节点顺序的参照图，可以设定为上次布局结果
* `keepOriginalNode` 保留节点附加的原始数据，布尔类型

### 数据结构

#### Node
* `id`：主键，字符串
* `label`：标签，字符串
* `width`：宽度，数值
* `height`：高度，数值
* `parent`：父节点 id，字符串
* `children`：子节点集合，数组
* `collapsed`：是否折叠，布尔

#### Edge

* `source`：源节点 id，字符串
* `target`：目标节点 id，字符串
