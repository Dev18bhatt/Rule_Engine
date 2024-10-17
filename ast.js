// ast.js

class Node {
    constructor(type, value = null, left = null, right = null) {
        this.type = type;  // "operator" or "operand"
        this.value = value; // Value for operand nodes (e.g., number or string)
        this.left = left;   // Left child node
        this.right = right; // Right child node
    }
}

function createAST(ruleString) {
    const tokens = ruleString.split(' ');

    const root = new Node('operator', 'AND');
    const left = new Node('operator', 'OR');
    const right = new Node('operand', 'salary > 50000');

    left.left = new Node('operand', 'age > 30');
    left.right = new Node('operand', "department = 'Sales'");

    root.left = left;
    root.right = right;

    return root;
}

function evaluateAST(node, data) {
    if (node.type === 'operand') {
        const [left, operator, right] = node.value.split(' ');

        switch (operator) {
            case '>':
                return data[left] > parseInt(right, 10);
            case '<':
                return data[left] < parseInt(right, 10);
            case '=':
                return data[left] === right.replace(/'/g, '');
            default:
                throw new Error('Unsupported operator');
        }
    } else if (node.type === 'operator') {
        const leftEval = evaluateAST(node.left, data);
        const rightEval = evaluateAST(node.right, data);

        switch (node.value) {
            case 'AND':
                return leftEval && rightEval;
            case 'OR':
                return leftEval || rightEval;
            default:
                throw new Error('Unsupported operator');
        }
    }
}
// Function to combine multiple ASTs
// Function to combine multiple ASTs
function combineRules(rules) {
    if (rules.length === 0) {
        throw new Error('No rules provided.');
    }

    // Create the root node with an "AND" operator
    const root = new Node('operator', 'AND');

    // Create an array to hold all operands
    const operands = [];

    // Iterate through each rule, creating its AST and pushing it to the operands array
    for (let rule of rules) {
        const ast = createAST(rule);
        operands.push(ast);
    }

    // Flatten the operands into the root node
    root.left = operands[0]; // Start with the first operand
    let current = root.left;

    for (let i = 1; i < operands.length; i++) {
        current.right = operands[i];
        current = current.right; // Move to the next operand
    }

    return root;
}
module.exports = {
    Node,
    createAST,
    evaluateAST,
    combineRules
};
