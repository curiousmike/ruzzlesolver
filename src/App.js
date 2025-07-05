import { DrawBoard } from "./drawBoard";
import { Background, SolveButton } from "./MainStyles";
import { traverseBoard } from "./TraverseBoard";
import { testValues } from "./testData";

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
