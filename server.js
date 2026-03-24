const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    next();
});

let poll = {
    question: "",
    options: [],
    votes: []
};

// Create Poll
app.post('/create', (req, res) => {
    const { question, options } = req.body;

    if (!question || options.length < 2) {
        return res.status(400).send("Invalid input");
    }

    poll = {
        question,
        options,
        votes: new Array(options.length).fill(0)
    };

    res.send("Poll Created");
});

// Get Poll
app.get('/poll', (req, res) => {
    res.json(poll);
});

// Vote
app.post('/vote', (req, res) => {
    const { optionIndex } = req.body;

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
        return res.status(400).send("Invalid vote");
    }

    poll.votes[optionIndex]++;
    res.send("Vote Recorded");
});

// Results
app.get('/results', (req, res) => {
    const total = poll.votes.reduce((a, b) => a + b, 0);

    const results = poll.options.map((opt, i) => ({
        option: opt,
        percent: total === 0 ? 0 : ((poll.votes[i] / total) * 100).toFixed(2)
    }));

    res.json({ results });
});

// Reset Poll
app.post('/reset', (req, res) => {
    poll = { question: "", options: [], votes: [] };
    res.send("Reset Done");
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));