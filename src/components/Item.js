import styled from "styled-components";

const Item = ({ name, cost, value, numOwned, handleClick }) => {
  return (
    <ItemContainer onClick={handleClick}>
      <ItemInfo>
        <Name>{name}</Name>
        <Small> Cost: {cost} cookies(s).</Small>
        <Small> Produces {value} cookies/second.</Small>
      </ItemInfo>
      <Counter> {numOwned} </Counter>
    </ItemContainer>
  );
};

export default Item;

const ItemContainer = styled.button`
  display: flex;
  align-items: center;
  padding: 5px;
  border: none;
  border-bottom: 1px solid #666;
  background: none;
  cursor: pointer;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const Name = styled.h3`
  display: flex;
  justify-content: left;
  color: white;
  margin: 0;
`;
const Small = styled.p`
  display: inline-flex;
  justify-content: left;
  font-size: 10px;
  color: grey;
`;
const Counter = styled.h3`
  margin-left: 10px;
  color: white;
  font-size: 24px;
`;
