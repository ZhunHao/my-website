import { shuffle } from "./utils.ts";

const quotes: string[] = [
  `Mankind was born on Earth. It was never meant to die here.`,
  `We used to look up at the sky and wonder at our place in the stars. Now we just look down and worry about our place in the dirt.`,
  `Do not go gentle into that good night. Old age should burn and rave at close of day. Rage, rage against the dying of the light.`,
  `Love is the one thing we're capable of perceiving that transcends time and space.`,
  `I'm not afraid of death. I'm an old physicist. I'm afraid of time.`,
  `We've always defined ourselves by the ability to overcome the impossible.`,
  `Once you're a parent, you're the ghost of your children's future.`,
  `This world's a treasure, but it's been telling us to leave for a while now.`,
  `My father. He was a farmer. I'm gonna be a farmer.`,
  `TARS, what's your honesty parameter? Ninety percent. Absolute honesty isn't always the most diplomatic nor the safest form of communication with emotional beings.`,
  `It's not possible. No. It's necessary.`,
  `We must reach far beyond our own lifespans. We must think not as individuals but as a species.`,
];

let shuffledQuotes: string[] = [];
let currentIndex = 0;

function getNextQuote(): string {
  if (currentIndex === 0 || currentIndex === shuffledQuotes.length) {
    shuffledQuotes = shuffle(quotes);
    currentIndex = 0;
  }
  return shuffledQuotes[currentIndex++];
}

function fitTextToContainer(
  quoteElement: HTMLElement,
  containerElement: HTMLElement,
): void {
  let fontSize = 24;
  quoteElement.style.fontSize = `${fontSize}px`;

  while (
    quoteElement.scrollHeight > containerElement.clientHeight &&
    fontSize > 12
  ) {
    fontSize--;
    quoteElement.style.fontSize = `${fontSize}px`;
  }
}

function setAndFitQuote(): void {
  const quoteElement = document.getElementById("quote");
  if (!quoteElement?.parentElement) return;
  quoteElement.textContent = getNextQuote();
  fitTextToContainer(quoteElement, quoteElement.parentElement);
}

function initializeQuote(): void {
  const quoteBtn = document.getElementById("getQuoteBtn");
  if (!quoteBtn) return;

  setAndFitQuote();

  // Clone+replace to remove any stale listeners from previous navigation
  const freshBtn = quoteBtn.cloneNode(true) as HTMLElement;
  quoteBtn.replaceWith(freshBtn);
  freshBtn.addEventListener("click", setAndFitQuote);
}

document.addEventListener("astro:page-load", initializeQuote);
