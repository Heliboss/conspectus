const quotes = [
  "As it happened in Rome, with the wild hordes unconscious bearers of a distant but greater revolution, the curators of the greatest contributions of man, we wish for a powerful barbarian wave to come crashing through the gates of this bourgeois world.",
  "This victory puts an end to all fear of personal death and with it every cult of the living and the dead, society being organized for the first time around well-being and joy and the reduction of sorrow, suffering, and sacrifice to a rational minimum, removing every mysterious and sinister character from the harmonious course of the succession of generations, a natural condition of the prosperity of the species.",
  'While preserving as much of the incidental democratic mechanism that can be used, we will eliminate the use of the term "democracy", which is dear to the worst demagogues but tainted with irony for the exploited, oppressed and cheated, abandoning it to the exclusive usage of the bourgeoisie and the champions of liberalism in their diverse guises and sometimes extremist poses.',
  "The class originates from an immediate homogeneity of economic conditions which appear to us as the primary motive force of the tendency to destroy and go beyond the present mode of production. But in order to assume this great task, the class must have its own thought, its own critical method, its own will bent on the precise ends defined by research and criticism, and its own organisation of struggle channelling and utilising with the utmost efficiency its collective efforts and sacrifices. All this constitutes the Party.",
  "To precisely define the economy of contemporary Russia, we on the first day of this dispute with Stalin’s “answers” to our Marxist inquiries and demonstrations mainly concerned ourselves emphasizing the incommensurateness of commodity production and socialist economy. For us, every system of commodity production in the modern world, a world of associated labour, that is the aggregation of workers in production plants, is defined as capitalist economy.",
  "For the capitalists are well aware that the old type of family, where the woman is a slave and where the husband is responsible for the well-being of his wife and children, constitutes the best weapon in the struggle to stifle the desire of the working class for freedom and to weaken the revolutionary spirit of the working man and working woman.",
  "The traditional view recognizes only monogamy, with, in addition, polygamy on the part of individual men, and at the very most polyandry on the part of individual women; being the view of moralizing philistines, it conceals the fact that in practice these barriers raised by official society are quietly and calmly ignored. The study of primitive history, however, reveals conditions where the men live in polygamy and their wives in polyandry at the same time, and their common children are therefore considered common to them all.",
  "First come instinct and intuition, then comes science, not the science of today, which is inferior to instinct itself, but the science of tomorrow, which will unite all the 'categories' that bourgeois knowledge divides today. As long as there is no new science, intuition and instinct will still underpin human actions as something separate, mainly in terms of social movement.",
  "Bourgeois society does not so much produce its murderer as its gravedigger. On the other hand, capital is already dead, it is a corpse that still walks, it is not a question of killing it but of burying it. The inevitable end of bourgeois rule is not a mere hope, but is decreed by laws of nature, those described by Marx and studied by our current in the post-World War II period.",
  "Wanting the future would be too much, but in the developed West, capitalism has reached such a level that, as we have seen, it already contains within itself forms of activity without mercantile exchange and without competition, not aimed, in short, at achieving maximum profit, activities generally carried out by the State, but also by organized groups of volunteers etc.",
];
const quoteElement = document.getElementById("quote");
let i = 0;
let j = 0;
let reverse = false;
function typeQuote() {
  const quote = quotes[i];
  if (!reverse) {
    quoteElement.textContent = quote.substring(0, j + 1) + "|";
    j++;
    if (j === quote.length) {
      setTimeout(() => {
        reverse = true;
        typeQuote();
      }, 2000); // delay before reversing
      return;
    }
  } else {
    quoteElement.textContent = quote.substring(0, j - 1) + "|";
    j--;
    if (j === 0) {
      reverse = false;
      i = (i + 1) % quotes.length;
    }
  }
  // delay between characters
  setTimeout(typeQuote, reverse ? 10 : 20);
}
typeQuote();
