const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// Live updates of user budget changes. Save to db every 10 secs.
const liveUserBudgets = {}; // { userID: {budgets: [budget1]} } 

setInterval(async () => {

    if (!(liveUserBudgets && typeof liveUserBudgets === 'object' && Object.keys(liveUserBudgets).length > 0)) return;

    console.log("Before save: ", JSON.stringify(liveUserBudgets));

    for (const id of Object.keys(liveUserBudgets)) {
        if (liveUserBudgets[id].budgets.length === 0) {
            console.log('Nothing to save. return!');
            continue;
        }

        const user = await User.findById(id);
        const budgets = user.budgets;

        for (const budget of liveUserBudgets[id].budgets) {
            const index = budgets.findIndex((b) => b.id === budget.id);
            budgets[index] = budget;
        }

        await user.save();
        liveUserBudgets[id].budgets = [];

        console.log("After save: ", liveUserBudgets);
    }
}, 10000);



router.post('/changebudget', authToken, async (req, res) => {
    try {
        const user = req.body.user;
        const budget = req.body.budget;

        // Sends change to server memory data, 10sec interval saves to db
        if (!liveUserBudgets[user._id]) {
            liveUserBudgets[user._id] = {budgets: []};
        }
        const index = liveUserBudgets[user._id].budgets.findIndex((b) => b.id == budget.id);
        console.log('index ', index); // Keeps getting -1 for somereason
        if (index > -1) {
            liveUserBudgets[user._id].budgets[index] = budget;
        } else {
            liveUserBudgets[user._id].budgets.push(budget);
        }

        res.json({
            status: 'success',
        });




    } catch(err) {
        console.error(err);
    }
});

router.post('/saveallbudgets', authToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const budgets = req.body.budgets;

        liveUserBudgets[user._id].budgets = [];

        user.budgets = budgets;
        await user.save(); 


        res.json({
            status: 'success',
        });
    } catch(err) {
        console.error(err);
    }
});

router.post('/addbudget', authToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const budget = req.body.newBudget;

        const budgets = user.budgets;
        budgets.unshift(budget);
        await user.save();

        res.json({
            status: 'success',
        });
    } catch(err) {
        console.error(err);
    }
});

function authToken(req, res, next) {
    const token = req.cookies['auth-token'];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.userId = user.userId;
        next();
    });
}


module.exports = router;