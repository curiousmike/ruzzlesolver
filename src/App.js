import styled from "styled-components";
import { DrawBoard } from "./drawBoard";
import { BONUS_VALUES } from "./types";
const Background = styled.div`
  height: 100vh;
  background-color: #34a6e5;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
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
  return (
    <Background>
      <header>
        <p>
          <DrawBoard boardData={testValues} />
        </p>
      </header>
    </Background>
  );
}

export default App;
