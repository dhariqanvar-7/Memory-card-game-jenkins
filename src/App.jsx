import { useState } from "react";

const emojis = [
  "🍎", "🍌", "🍇", "🍒",
  "🍍", "🥝", "🍉", "🍓"
];

function App() {
  const createCards = () => {
    return [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji: emoji,
        flipped: false,
        matched: false
      }));
  };

  const [cards, setCards] = useState(createCards);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [lock, setLock] = useState(false);

  const handleCardClick = (index) => {
    if (lock) return;

    if (cards[index].flipped || cards[index].matched) return;

    const updatedCards = [...cards];
    updatedCards[index].flipped = true;

    setCards(updatedCards);

    if (firstCard === null) {
      setFirstCard(index);
    } else {
      setSecondCard(index);
      setLock(true);

      if (cards[firstCard].emoji === cards[index].emoji) {

        updatedCards[firstCard].matched = true;
        updatedCards[index].matched = true;

        setCards([...updatedCards]);

        setFirstCard(null);
        setSecondCard(null);
        setLock(false);

      } else {

        setTimeout(() => {
          updatedCards[firstCard].flipped = false;
          updatedCards[index].flipped = false;

          setCards([...updatedCards]);

          setFirstCard(null);
          setSecondCard(null);
          setLock(false);

        }, 800);
      }
    }
  };

  const restartGame = () => {
    setCards(createCards());
    setFirstCard(null);
    setSecondCard(null);
    setLock(false);
  };

  const won = cards.every((card) => card.matched);

  return (
    <div className="container">

      <h1>🧠 Memory Card Game</h1>

      <div className="board">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${
              card.flipped || card.matched ? "flipped" : ""
            } ${card.matched ? "matched" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            {card.flipped || card.matched ? card.emoji : "?"}
          </div>
        ))}
      </div>

      {won && <h2>🎉 You Won!</h2>}

      <button onClick={restartGame}>
        Restart Game
      </button>

    </div>
  );
}

export default App;