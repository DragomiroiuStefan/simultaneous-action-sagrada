export default class DiceBag {
  constructor(difficulty) {
    let dicePerColor = difficulty * 2;
    this.bag = {
      red: dicePerColor,
      blue: dicePerColor,
      green: dicePerColor,
      purple: dicePerColor,
      yellow: dicePerColor
    }
  }

  drawDice(noOfDice) {
    const dice = [];
    for (let i = 1; i <= noOfDice; i++) {
      dice.push(this.drawDie());
    }
    return dice;
  }

// Function to randomly draw a die from the bag
  drawDie() {
    // Convert the object keys and values to arrays for easy random selection
    const dieColors = Object.keys(this.bag);
    const dieColorCounts = Object.values(this.bag);

    // Check if the bag is empty
    if (dieColors.length === 0) {
      throw new Error("The bag is empty");
    }

    // Calculate the total number of marbles in the bag
    const totalMarbles = dieColorCounts.reduce((total, count) => total + count, 0);

    // Generate a random index based on the total number of marbles
    const randomIndex = Math.floor(Math.random() * totalMarbles);

    // Find the corresponding color based on the random index
    let currentIndex = 0;
    let selectedColor;
    for (let i = 0; i < dieColors.length; i++) {
      currentIndex += dieColorCounts[i];
      if (randomIndex < currentIndex) {
        selectedColor = dieColors[i];
        break;
      }
    }

    // Reduce the count of the selected color in the bag
    this.bag[selectedColor]--;

    // If the count becomes zero, remove the color from the bag
    if (this.bag[selectedColor] === 0) {
      delete this.bag[selectedColor];
    }

    // Display the result
    console.log(`You drew a ${selectedColor} die from the bag.`);
    console.log("Remaining marbles in the bag:", this.bag);

    return {dieNumber: this.getRandomInteger(1, 6), dieColor: selectedColor};
  }

  getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
