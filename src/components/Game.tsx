import { useState } from "react";
import { Card, type CardData } from "./Card";

function Game() {
  const [cardList, setCardList] = useState<CardData[]>(getInitCardData());
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);

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

    if (cardClicked && !cardClicked.isClicked) {
      setScore(score + 1);
      // Update clicked state of clicked card
      setCardList(newCardList.map((newCard) => {
        if (newCard.id === cardId) {
          return { ...newCard, isClicked: true };
        }
        return newCard;
      }));
    } else {
      if (score > bestScore) setBestScore(score);
      setScore(0);
      // Reset clicked state of all cards
      setCardList(newCardList.map((newCard) => {
        return { ...newCard, isClicked: false };
      }));
    }
  };

  return (
    <>
      <div className="my-2 md:my-4 lg:my-8">
        <h1 className="text-2xl leading-6
                       text-center text-balance tracking-tight
                       md:text-4xl lg:text-6xl font-semibold">
          Pixel Art Avatar Memory Game
        </h1>
        <p className="text-sm text-center md:text-2xl leading-4 max-w-prose mx-auto
                      md:leading-6 lg:leading-7 text-pretty my-4 lg:my-8">
          Click/tap a character to start the game. To increase your score, try to only
          click on characters you have <b className="underline decoration-wavy">not</b> clicked yet. If you click on a character more than
          once, your score will reset. Try to get a score of <b>12 / 12</b>. Good luck!
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2 lg:grid-cols-6 md:gap-4">
        {cardList.map((card) => {
          return <Card
            key={card.id}
            id={card.id}
            imageURL={card.imageURL}
            setIsClicked={handleClick}
          />;
        })}
      </div>
      <div className="mt-2 lg:mt-4 flex w-full justify-between ">
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
          {`Score: ${score} / ${cardList.length}`}
        </p>
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
          {`Best Score: ${bestScore} / ${cardList.length}`}
        </p>
      </div>
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
    initCardData.push({
      id: crypto.randomUUID(),
      isClicked: false,
      imageURL: `https://api.dicebear.com/9.x/pixel-art/svg?seed=${avatars[i]}`
    });
  }
  return initCardData;
}

export { Game };