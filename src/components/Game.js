import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Item";
import { useState, useEffect } from "react";

import cookieSrc from "../cookie.svg";
import useInterval from "../hooks/use-interval";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies] = useState(100);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  const handlePurchase = (item) => {
    if (numCookies >= item.cost) {
      setNumCookies(numCookies - item.cost);

      setPurchasedItems({
        ...purchasedItems,
        [item.id]: purchasedItems[item.id] + 1,
      });
    } else {
      window.alert("Not enough cookies to purchase this item.");
    }
  };

  const calculateCookiesPerTick = (purchasedItems) => {
    return items.reduce((total, item) => {
      return total + purchasedItems[item.id] * item.value;
    }, 0);
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  useEffect(() => {
    document.title = `${numCookies} cookies - Cookie Clicker Workshop`
  
    return () => {
      document.title = `Cookie Clicker Workshop`
    }
  }, [numCookies])

  const handleKeydown = (event) => {
    if (event.code === "Space"){
      setNumCookies(numCookies + 1)
    }
  }
  useEffect (() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown)
    }
  }, [handleKeydown]);

  console.log(numCookies)
  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <BoldSpan>{calculateCookiesPerTick(purchasedItems)}</BoldSpan> cookies
          per second
        </Indicator>
        <Button onClick={() => setNumCookies(numCookies + 1)}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {/* TODO: Add <Item> instances here, 1 for each item type. */}
        {items.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            cost={item.cost}
            value={item.value}
            numOwned={purchasedItems[item.id]}
            handleClick={() => handlePurchase(item)}
          />
        ))}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const BoldSpan = styled.span`
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
