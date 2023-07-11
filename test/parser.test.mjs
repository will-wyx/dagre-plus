import {parse} from "../src/parser.js";
import {expect} from "chai";

describe('数据结构转换函数测试', () => {
    it('空结构', () => {
        expect(parse({nodes: [], edges: []}))
            .to.be.deep.equal({nodes: [], edges: []})
    })
})
