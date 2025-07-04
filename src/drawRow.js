import styled from "styled-components";
import { BONUS_VALUES } from "./types";

const RowContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Tile = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5em;
  font-weight: 700;
  text-align: center;
  color: black;
  background-color: white;
  border-radius: 3px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  outline: ${(props) =>
    props.bonus === BONUS_VALUES.DOUBLE_WORD
      ? "6px solid #fdc52d"
      : props.bonus === BONUS_VALUES.DOUBLE_LETTER
      ? "6px solid #1f9a1d"
      : props.bonus === BONUS_VALUES.TRIPLE_LETTER
      ? "6px solid #1675c1"
      : props.bonus === BONUS_VALUES.TRIPLE_WORD
      ? "6px solid #f10d1a"
      : ""};
  margin: 8px;
  width: 128px;
  height: 96px;
`;
export const DrawRow = ({ rowData }) => {
  console.log("rowdata = ", rowData);
  return (
    <RowContainer>
      {rowData.map((item, index) => (
        <Tile key={index} bonus={item.bonus}>
          {item.character}
        </Tile> // Remember to add a unique 'key' prop
      ))}
    </RowContainer>
  );
};
