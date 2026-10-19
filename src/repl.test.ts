import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";


describe.each([
    {
        input: "    hello  world    ",
        expected: ["hello", "world"],
    },
    {
        input: "",
        expected: [],
    },
    {
        input: "        ",
        expected: [],
    },
    {
        input: "test1      Test2     tESt3      4TEST",
        expected: ["test1", "test2", "test3", "4test"],
    },
    // TODO: more testcases here
])("cleanInput($input)", ({input, expected}) => {
    test(`Expected: ${expected}`, () => {
        const actual = cleanInput(input)
        expect(actual).toHaveLength(expected.length);
        for(const i in expected) {
            expect(actual[i]).toBe(expected[i]);
        }
    });
});