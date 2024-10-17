const express = require('express');
const mongoose = require('mongoose');
const RuleModel = require('./models/Rule'); // Ensure your Rule model is correctly defined
const { createAST, evaluateAST, combineRules } = require('./ast'); // Import AST functions
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/rule-engine'; // Replace this with your MongoDB URI

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit if MongoDB connection fails
    });

// Test route to check server status
app.get('/', (req, res) => {
    res.send('Hello, Rule Engine Backend with MongoDB!');
});

// Route to create a new rule
app.post('/api/rules', async (req, res) => {
    try {
        const { ruleString } = req.body;

        if (!ruleString || typeof ruleString !== 'string') {
            return res.status(400).json({ success: false, message: 'Invalid ruleString: Expected a non-empty string.' });
        }

        const newRule = new RuleModel({ ruleString });
        await newRule.save();

        // Create AST from the ruleString
        const ast = createAST(ruleString);
        res.json({
            success: true,
            message: 'Rule saved successfully',
            ast
        });
    } catch (err) {
        console.error('Error saving rule:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Route to evaluate the rule against provided data
app.post('/api/evaluate', (req, res) => {
    try {
        const { ruleString, data } = req.body;

        if (!ruleString || typeof ruleString !== 'string') {
            return res.status(400).json({ success: false, message: 'Invalid ruleString: Expected a non-empty string.' });
        }

        const ast = createAST(ruleString); // Create the AST
        const result = evaluateAST(ast, data); // Evaluate the AST
        res.json({ success: true, result });
    } catch (err) {
        console.error('Error evaluating rule:', err.message);
        res.status(500).json({ success: false, message: 'Error evaluating rule', error: err.message });
    }
});

// Combine multiple rules and return the combined AST
app.post('/api/combineRules', async (req, res) => {
    try {
        const { rules } = req.body;  // Expecting an array of rule strings
        if (!Array.isArray(rules) || rules.length === 0 || !rules.every(rule => typeof rule === 'string')) {
            return res.status(400).json({ success: false, message: "Invalid input: Provide an array of valid rule strings." });
        }

        const combinedAST = combineRules(rules);  // Call the combineRules function from ast.js
        res.json({ success: true, combinedAST });
    } catch (err) {
        console.error('Error combining rules:', err.message);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
