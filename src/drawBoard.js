import styled from "styled-components";
import { DrawRow } from "./drawRow";

const BoardBackground = styled.div`
  background-color: #34a6e5;
`;

export const DrawBoard = ({ boardData }) => {
  return (
    <BoardBackground>
      <div>
        {boardData.map((item, index) => (
          <DrawRow key={index} rowData={boardData[index]} />
        ))}
      </div>
    </BoardBackground>
  );
};
