import fs from "node:fs/promises";
import { calculate, type CalculatorExports } from "./2023-01-1";

let instanceExports: undefined | CalculatorExports;

beforeAll(async () => {
  const buffer = await fs.readFile(__filename.replace(".test.ts", ".wasm"));
  const module = await WebAssembly.instantiate(buffer);
  instanceExports = module.instance.exports as unknown as CalculatorExports;
});

const testCase = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;

test("problem example gives 142", () => {
  expect(
    calculate(testCase, instanceExports!.mem, instanceExports!.calculate),
  ).toEqual(142);
});
