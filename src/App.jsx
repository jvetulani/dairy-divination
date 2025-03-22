
import React, { useState, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import "./App.css";

const cheeseCards = [
  {
    name: "🧀 The Babybel",
    archetype: "The Fool",
    upright: "Innocence, spontaneous joy, stepping into the unknown. Babybel asks you to embrace fresh starts with childlike wonder. Don’t fear what you don’t understand — unwrap it.",
    inverted: "Naivety, poor planning, being unprepared. The shell is still on — are you really ready to leap into the melty void, or are you just pretending it’s cheese time?"
  },
  {
    name: "🫕 The Fondue",
    archetype: "The Magician",
    upright: "Creation, manifestation, transformation. All ingredients are present — it’s your skill that melts them into something divine. Time to stir the pot with intent.",
    inverted: "Deception, distraction, chaotic energy. You’re mixing too fast or ignoring what’s curdling beneath the surface. Manipulating the melt leads to spiritual indigestion."
  },
  {
    name: "🌕 The Ricotta",
    archetype: "The High Priestess",
    upright: "Subtle intuition, soft power, mystery. Ricotta holds secrets in her folds. Listen to your gut — even if it's whispering through cream.",
    inverted: "Disconnection, ignored instincts, mental fog. You're not listening to your inner dairy voice. Step back. Breathe. Stop pretending you don’t feel it."
  },
  {
    name: "🧈 The Parmigiana",
    archetype: "The Empress",
    upright: "Fertility, nourishment, abundance. Parmesan rules over a lush kitchen kingdom. She grates blessings on all below. Creativity flows — so cook something with love.",
    inverted: "Creative blocks, smothering, burnout. You’re over-cheesing or forcing flavor where simplicity would suffice. Let the sauce simmer."
  },
  {
    name: "🟨 The Grater",
    archetype: "The Emperor",
    upright: "Authority, structure, discipline. The Grater sets boundaries — not out of cruelty, but to shape potential. Embrace form. Rules can be empowering.",
    inverted: "Oppression, rigidity, control issues. The structure that once served you now feels like a cage. You’re shredding under someone else’s expectations."
  },
  {
    name: "📚 The Cultured Whey",
    archetype: "The Hierophant",
    upright: "Tradition, sacred teachings, lineage. The Whey speaks of old rituals passed through kitchens and hearts. Look to the ancestors — what recipes did they leave behind?",
    inverted: "Rebellion, stagnation, blind belief. Are you following traditions that no longer nourish you? Update the recipe — or risk spiritual lactose intolerance."
  },
  {
    name: "🍽️ The Cheeseboard",
    archetype: "The Lovers",
    upright: "Union, partnership, choices with heart. The Cheeseboard is where contrast becomes harmony — Brie with fig, Gouda with walnut. Love what's different.",
    inverted: "Misalignment, indecision, disconnection. The pairings aren’t vibing. Are you forcing a flavor match? Step back and taste what’s really on offer."
  },
  {
    name: "🛞 The Brie-Wheel",
    archetype: "The Chariot",
    upright: "Momentum, direction, gooey determination. This Brie is rolling — nothing will stop its creamy quest. Assert your will and move forward.",
    inverted: "Drift, loss of control, emotional disarray. You're slipping on your own rind. Recenter. You’re still in motion, just not in control."
  },
  {
    name: "🧵 The String Cheese",
    archetype: "Strength",
    upright: "Gentle perseverance, quiet resolve. True power is in patience, in peeling the strands rather than tearing them.",
    inverted: "Fraying nerves, bottled frustration. You’re unraveling — but pretending you’re fine. Stop. Rest. Re-string."
  },
  {
    name: "🧫 The Cave-Aged Blue",
    archetype: "The Hermit",
    upright: "Introspection, wisdom, funky solitude. Enter the aging cave — there’s treasure in the mold. Time alone is not time wasted.",
    inverted: "Loneliness, avoidance, overthinking. You're hiding, not healing. Light a candle. Ask the mold what it’s really teaching you."
  },
  {
    name: "🧀 The Wheel of Cheese",
    archetype: "Wheel of Fortune",
    upright: "Fate, cycles, the cheese wheel turns. Embrace the shifts — what melts may resolidify again.",
    inverted: "Resistance to change, bad timing, stuck in a rind. You’re trying to stop the wheel mid-spin — let it rotate."
  },
  {
    name: "🔪 The Cheese Knife",
    archetype: "Justice",
    upright: "Fairness, truth, clean cuts. The Knife slices evenly — even if it stings. Balance must be restored.",
    inverted: "Bias, dishonesty, messy slicing. You're cutting corners or letting others skew the blade."
  },
  {
    name: "🪂 The Inverted Slice",
    archetype: "The Hanged Man",
    upright: "Surrender, new perspectives, flipping your slice. Wisdom comes when you melt with purpose.",
    inverted: "Stagnation, refusal to let go, overthinking the melt. You’re holding too tight to a rigid shape."
  },
  {
    name: "💀 The Spoilage",
    archetype: "Death",
    upright: "Transformation, endings, compost and rebirth. This cheese has run its course — but what it feeds will thrive.",
    inverted: "Fear of change, clinging to the old cheese. Stop sniffing it. Throw it out."
  },
  {
    name: "♨️ The Melt",
    archetype: "Temperance",
    upright: "Balance, harmony, perfect cheese-to-heat ratio. Blend the flavors with intention.",
    inverted: "Overindulgence, chaos, curdling vibes. You're burning the cheese trying to rush the toast."
  },
  {
    name: "🧲 The Greasy Craving",
    archetype: "The Devil",
    upright: "Obsession, indulgence, delicious entrapments. Midnight cheese calling your name? That’s the Craving.",
    inverted: "Breaking free, recovery, resisting the binge. You’ve still got time to walk away from the nacho edge."
  },
  {
    name: "💥 The Microwave Explosion",
    archetype: "The Tower",
    upright: "Sudden upheaval, messy revelations. Something is popping — and it’s gonna get hot.",
    inverted: "Delayed disaster, ignoring warning smells. You smelled the smoke. Why didn’t you open the door?"
  },
  {
    name: "✨ The Spray Cheese",
    archetype: "The Star",
    upright: "Hope, quirky inspiration, unconventional joy. Sometimes the weirdest cheese brings the most delight.",
    inverted: "Lost faith, artificial dreams, empty can. Stop pretending that fake joy is real cheese."
  },
  {
    name: "🌫️ The Mold",
    archetype: "The Moon",
    upright: "Illusions, dreams, the funk beneath the surface. Lean into the mystery, let it bloom.",
    inverted: "Clarity breaking through, shadows exposed. The veil lifts — and the cheese is still safe to eat."
  },
  {
    name: "🍰 The Cheesecake",
    archetype: "The Sun",
    upright: "Joy, success, radiant dairy celebration. The oven is warm, and the filling is perfect. Shine on.",
    inverted: "Ego, over-sweetened illusions, burnt crust. You're trying too hard to look tasty — check the recipe."
  },
  {
    name: "🥄 The Taste Test",
    archetype: "Judgment",
    upright: "Awakening, self-reflection, accountability. Time to taste what you've created and accept the flavor.",
    inverted: "Denial, guilt, fear of what you’ll taste. You're refusing to try your own dish — why?"
  },
  {
    name: "🌍 The Dairyverse",
    archetype: "The World",
    upright: "Completion, wholeness, cheese achieved. The board is full, the pairings complete. You are the cheese.",
    inverted: "Unfinished business, lactose loops, lessons still unchewed. You're almost there — don’t leave the last bite."
  }
];

function drawCards(num) {
  const shuffled = [...cheeseCards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num).map(card => {
    const isInverted = Math.random() < 0.5;
    return {
      ...card,
      orientation: isInverted ? "Inverted" : "Upright",
      meaning: isInverted ? card.inverted : card.upright
    };
  });
}

export default function DairyDivination() {
  const [reading, setReading] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [forceFrontView, setForceFrontView] = useState(false);

  useEffect(() => {
    const todayKey = new Date().toDateString();
    const stored = localStorage.getItem("daily-cheese");
    if (!stored || JSON.parse(stored).date !== todayKey) {
      const dailyCard = drawCards(1)[0];
      localStorage.setItem("daily-cheese", JSON.stringify({ card: dailyCard, date: todayKey }));
      setReading([dailyCard]);
      setFlippedCards([]);
    } else {
      const storedCard = JSON.parse(stored).card;
      setReading([storedCard]);
      setFlippedCards([]);
    }
  }, []);

  const drawOne = () => {
    setReading(drawCards(1));
    setFlippedCards([]);
  };

  const drawThree = () => {
    setReading(drawCards(3));
    setFlippedCards([]);
  };

  const handleScreenshot = () => {
    setForceFrontView(true);

    setTimeout(() => {
      const readingArea = document.getElementById("reading-area");
      if (readingArea) {
        htmlToImage.toPng(readingArea).then(dataUrl => {
          download(dataUrl, "cheese-reading.png");
          setForceFrontView(false);
        });
      }
    }, 400);
  };

  const toggleFlip = (index) => {
    setFlippedCards(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white p-6 pl-10 max-w-4xl mx-auto font-serif">
      <h1 className="text-5xl font-bold mb-6 text-center text-yellow-300 tracking-widest drop-shadow-md">🧀 Dairy Divination</h1>
      <p className="text-center text-lg mb-8 italic">The celestial cheeses whisper... Which slice shall reveal your fate?</p>

      <div className="flex gap-6 justify-center mb-10">
        <button onClick={drawOne} className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-full shadow-lg transition">Draw One Card</button>
        <button onClick={drawThree} className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-full shadow-lg transition">Draw Three Cards</button>
      </div>

      <div className="text-center">
        <button onClick={handleScreenshot} className="mt-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-full shadow-md transition">📸 Save This Reading</button>
      </div>

      <div id="reading-area" className="flex flex-col md:flex-row gap-6 mt-8 justify-center">
        {reading.map((card, index) => (
          <div key={index} className="card-container" onClick={() => toggleFlip(index)}>
            <div className={`card-flip animate-fade-in ${
              forceFrontView ? 'force-front' : flippedCards.includes(index) ? 'flipped' : ''
            }`}>
              <div className="card-front">
                {card.name.split(" ")[0]}
              </div>
              <div className="card-back">
                <h2 className="text-xl font-bold text-yellow-300 mb-1">{card.name}</h2>
                <h3 className="text-lg font-semibold mb-2 text-yellow-200">{card.archetype} • {card.orientation}</h3>
                <p className="text-md leading-relaxed text-gray-100">{card.meaning}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-4 text-yellow-300 border-b border-yellow-500 pb-2">
          🧀 Cheesewiki
        </h2>
        <ul className="space-y-6">
          {cheeseCards.map((card, index) => (
            <li key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-md">
              <strong className="text-xl text-yellow-200">{card.name}</strong>{" "}
              <span className="italic text-yellow-100">({card.archetype})</span>
              <div className="mt-2 text-gray-200">
                <em className="text-yellow-400">Upright:</em> {card.upright}
              </div>
              <div className="mt-1 text-gray-300">
                <em className="text-yellow-400">Inverted:</em> {card.inverted}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
