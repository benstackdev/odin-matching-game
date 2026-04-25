import { useState } from "react";
import { Card, type CardData } from "./Card";

function Game() {
  const [cardList, setCardList] = useState<CardData[]>(getInitCardData());
  const [score, setScore] = useState<number>(0);

  const handleClick = (cardId: string) => {
    // Get deep copy of cardList
    const newCardList: CardData[] = JSON.parse(JSON.stringify(cardList));

    // Shuffle card order in newCardList
    for (let i = 0; i < cardList.length - 1; i++) {
      const j = i + Math.floor(Math.random() * (cardList.length - i));
      const temp = newCardList[i];
      newCardList[i] = newCardList[j];
      newCardList[j] = temp;
    }

    // Check if the card just clicked was clicked before
    const cardClicked = newCardList.find((newCard) => newCard.id === cardId);

    if (!cardClicked.isClicked) {
      setScore(score + 1);
      // Update clicked state of clicked card
      setCardList(newCardList.map((newCard) => {
        if (newCard.id === cardId) {
          return { ...newCard, isClicked: true };
        }
        return newCard;
      }));
    } else {
      setScore(0);
      // Reset clicked state of all cards
      setCardList(newCardList.map((newCard) => {
        return { ...newCard, isClicked: false };
      }));
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2 lg:grid-cols-6 lg:gap-4">
        {cardList.map((card) => {
          return <Card
            key={card.id}
            id={card.id}
            isClicked={card.isClicked}
            imageURL={card.imageURL}
            setIsClicked={handleClick}
          />;
        })}
      </div>
      <p className="flex justify-center mt-8 text-2xl">
        {`Score: ${score} / ${cardList.length}`}
      </p>
    </>
  );
}

function getInitCardData(): CardData[] {
  const initCardData: CardData[] = [];
  const avatars: string[] = [
    "Christian", "Avery", "Mason", "Liliana", "Jocelyn", "Jade",
    "Brian", "Ryan", "Nolan", "Jude", "Andrea", "Brooklynn"
  ];


  for (let i = 0; i < 12; i++) {
    initCardData.push({ id: crypto.randomUUID(), isClicked: false, imageURL: `https://api.dicebear.com/9.x/pixel-art/svg?seed=${avatars[i]}` });
  }
  return initCardData;
}

export { Game };