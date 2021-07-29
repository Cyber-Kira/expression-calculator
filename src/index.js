function eval() {
  // Do not use eval!!!
  return;
}

const calculate = (expr) => {
  if (expr.length === 1) {
    return expr[0];
  }

  if (typeof expr === "string") {
    expr = expr.replace(/\s+/g, " ").trim();
  }
  let str = "";
  let value = 0;
  for (let i = 0; i < expr.length; i += 1) {
    switch (expr[i]) {
      case "*":
        str = `${expr[i - 1]} ${expr[i]} ${expr[i + 1]}`;
        value = expr[i - 1] * expr[i + 1];
        expr = expr.join(" ").trim();
        expr = expr.replace(str, value);
        expr = expr.split(" ");
        return calculate(expr);
      case "/":
        str = `${expr[i - 1]} ${expr[i]} ${expr[i + 1]}`;
        value = expr[i - 1] / expr[i + 1];
        if (value === Infinity) {
          throw new Error("TypeError: Division by zero.");
        }
        expr = expr.join(" ").trim();
        expr = expr.replace(str, value);
        expr = expr.split(" ");
        return calculate(expr);
    }
  }
  for (let i = 0; i < expr.length; i += 1) {
    switch (expr[i]) {
      case "+":
        str = `${expr[i - 1]} ${expr[i]} ${expr[i + 1]}`;
        value = +expr[i - 1] + +expr[i + 1];
        expr = expr.join(" ").trim();
        expr = expr.replace(str, value);
        expr = expr.split(" ");
        return calculate(expr);
      case "-":
        str = `${expr[i - 1]} ${expr[i]} ${expr[i + 1]}`;
        value = expr[i - 1] - expr[i + 1];
        expr = expr.join(" ").trim();
        expr = expr.replace(str, value);
        expr = expr.split(" ");
        return calculate(expr);
    }
  }
};

function expressionCalculator(expr) {
  let originalExpr = expr.replace(/(?:^|\s|$)/gm, " ").trim();
  let bracketsString = expr.match(/(.)+/gm);

  originalExpr = originalExpr.replace(/(\s+)/g, " ").trim();

  if (originalExpr.includes(")") || originalExpr.includes("(")) {
    bracketsString = expr.match(/\(([^()]+)\)/gm);
    if (bracketsString === null) {
      throw new Error("ExpressionError: Brackets must be paired");
    }
    originalExpr = bracketsString[bracketsString.length - 1];
    originalExpr = originalExpr.slice(1, originalExpr.length - 1).trim();
  }

  if (!originalExpr.includes(" ")) {
    originalExpr = calculate(originalExpr.split(""));
  }

  originalExpr = calculate(originalExpr.split(" "));

  originalExpr = expr.replace(bracketsString[bracketsString.length - 1], originalExpr);

  if (+originalExpr || originalExpr === "0") {
    return +originalExpr;
  }

  return expressionCalculator(originalExpr);
}

module.exports = {
  expressionCalculator,
};
