#!/usr/bin/env node

import inquirer from "inquirer";

const answer = await inquirer.prompt([
  { 
    message: "Enter first number", 
    type: "number", 
    name: "firstNumber",
    validate: (input) => {
      if (!isNaN(input)) return true;
      return "Please enter a valid number";
    }
  },
  { 
    message: "Enter second number", 
    type: "number", 
    name: "secondNumber",
    validate: (input) => {
      if (!isNaN(input)) return true;
      return "Please enter a valid number";
    }
  },
  {
    message: "Select one of the operators to perform action",
    type: "list",
    name: "operator",
    choices: ["Addition", "Subtraction", "Multiplication", "Division"],
  },
]);

// Function to perform calculation with edge case handling
function calculate(num1, num2, operator) {
  switch (operator) {
    case "Addition":
      return num1 + num2;
      
    case "Subtraction":
      return num1 - num2;
      
    case "Multiplication":
      return num1 * num2;
      
    case "Division":
      // Handle division by zero
      if (num2 === 0) {
        throw new Error("Cannot divide by zero");
      }
      return num1 / num2;
      
    default:
      throw new Error("Invalid operator");
  }
}

// Main execution with error handling
try {
  const result = calculate(
    answer.firstNumber, 
    answer.secondNumber, 
    answer.operator
  );
  
  // Format result for better display
  console.log("\n" + "=".repeat(40));
  console.log(`📊 Calculation Result:`);
  console.log(`${answer.firstNumber} ${getOperatorSymbol(answer.operator)} ${answer.secondNumber} = ${result}`);
  console.log("=".repeat(40) + "\n");
  
} catch (error) {
  // Handle specific errors gracefully
  if (error.message === "Cannot divide by zero") {
    console.error("\n❌ Error:", error.message);
    console.log("💡 Tip: Division by zero is mathematically undefined.");
  } else {
    console.error("\n❌ An error occurred:", error.message);
  }
  process.exit(1);
}

// Helper function to get operator symbol for display
function getOperatorSymbol(operator) {
  const symbols = {
    "Addition": "+",
    "Subtraction": "-", 
    "Multiplication": "×",
    "Division": "÷"
  };
  return symbols[operator] || operator;
}
