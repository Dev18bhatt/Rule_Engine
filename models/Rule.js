const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the rule schema
const RuleSchema = new Schema({
    ruleString: {
        type: String,    // This will store the rule as a string
        required: true   // Rule string is mandatory, it must be provided
    },
    createdAt: {
        type: Date,      // A timestamp to keep track of when the rule was created
        default: Date.now   // Automatically set the date when the rule is created
    }
});

// Export the model
module.exports = mongoose.model('Rule', RuleSchema);
