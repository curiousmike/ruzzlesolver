import styled from "styled-components";
import { DrawBoard } from "./drawBoard";
import { BONUS_VALUES } from "./types";
import { Background, SolveButton } from "./MainStyles";
import { traverseBoard } from "./TraverseBoard";
const testValues = [
  [
    { character: "W", bonus: BONUS_VALUES.NONE },
    { character: "Y", bonus: BONUS_VALUES.NONE },
    { character: "P", bonus: BONUS_VALUES.TRIPLE_WORD },
    { character: "R", bonus: BONUS_VALUES.DOUBLE_WORD },
  ],
  [
    { character: "E", bonus: BONUS_VALUES.NONE },
    { character: "T", bonus: BONUS_VALUES.DOUBLE_LETTER },
    { character: "E", bonus: BONUS_VALUES.NONE },
    { character: "R", bonus: BONUS_VALUES.NONE },
  ],
  [
    { character: "L", bonus: BONUS_VALUES.NONE },
    { character: "N", bonus: BONUS_VALUES.NONE },
    { character: "E", bonus: BONUS_VALUES.DOUBLE_WORD },
    { character: "S", bonus: BONUS_VALUES.NONE },
  ],
  [
    { character: "A", bonus: BONUS_VALUES.NONE },
    { character: "W", bonus: BONUS_VALUES.TRIPLE_LETTER },
    { character: "E", bonus: BONUS_VALUES.TRIPLE_LETTER },
    { character: "T", bonus: BONUS_VALUES.NONE },
  ],
];
function getLetterDefaultValue(letter) {
  const singlePoint = "aeilmnorstuy";
  const twoPoint = "du";
  const threePoint = "gm";
  const fourPoint = "bcfhpwy";
  const fivePoint = "k";
  const unknownPoint = "jvxz"; // 4 or 5 ?
  const tenPoint = "q";
}
function App() {
  const doSolve = () => {
    traverseBoard(testValues, 0, 0);
  };

  return (
    <Background>
      <DrawBoard boardData={testValues} />
      <SolveButton onClick={doSolve}>Solve</SolveButton>
    </Background>
  );
}

export default App;
