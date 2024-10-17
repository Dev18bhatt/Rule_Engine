# Rule Engine Application

## Overview

The Rule Engine Application is a simple 3-tier system designed to evaluate user eligibility based on various attributes like age, department, income, and experience. This application leverages an Abstract Syntax Tree (AST) to dynamically create, combine, and modify conditional rules.

## Features

- **Create Rules**: Define eligibility rules using a flexible syntax.
- **Combine Rules**: Merge multiple rules into a single, efficient AST.
- **Evaluate Rules**: Check user eligibility against specified attributes.
- **Data Persistence**: Store rules and metadata in a MongoDB database.
- **API-Driven**: Interact with the rule engine through a RESTful API.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing rules and application metadata.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **AST**: Abstract Syntax Tree for representing and evaluating rules.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (>= 14.x)
- [MongoDB](https://www.mongodb.com/try/download/community) (>= 4.x)
- A code editor (e.g., Visual Studio Code)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/rule-engine.git
   cd rule-engine
