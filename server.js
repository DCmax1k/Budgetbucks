
const express = require('express');
const app = express();

// Imports
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/client/build'));
app.use(cookieParser());

// DB models
const User = require('./models/User');

// Main route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
});

// Routes
const loginRoute = require('./routes/login');
app.use('/login', loginRoute);

const dashboardRoute = require('./routes/dashboard');
app.use('/dashboard', dashboardRoute.router);

app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
});

app.get('/agreements/:page', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
});

app.post('/auth', authToken, async (req, res) => {

    try {
        const user = await User.findOne({_id: req.userId});

        // Get any recent unsaved changes from ram on server and replace the db ones with them.
        const recentBudgets = dashboardRoute.getLiveUserBudgets(user._id);
        console.log('recent budgets ', recentBudgets);
        if (recentBudgets) {
            recentBudgets.forEach(budget => {
                const index = user.budgets.findIndex(b => b.id === budget.id);
                user.budgets[index] = budget;
            });
        }
        

        res.json({
            status: 'success',
            user,
        });
    } catch(err) {
        console.error(err);
    }
    
});


// Sitemap
let sitemap;
app.get('/sitemap.xml', async (req, res) => {
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');

    if (sitemap) {
        res.send(sitemap);
        return;
    }

    try {
      const smStream = new SitemapStream({ hostname: 'https://www.budgetbucks.app/' });
      const pipeline = smStream.pipe(createGzip());

      smStream.write({ url: '/login'});
      smStream.write({ url: '/signup'});
      smStream.write({ url: '/agreements/termsofuse'});
      smStream.write({ url: '/agreements/privacypolicy'});

      // cache the response
      streamToPromise(pipeline).then(sm => sitemap = sm);
      
      smStream.end();

      // Show errors and response
      pipeline.pipe(res).on('error', (e) => {throw e});
    } catch (e) {
        console.log(e);
    }
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () => {
        console.log('Server started on port 3000');
    });
});

function authToken(req, res, next) {
    const token = req.cookies['auth-token'];
    if (!token) return res.status(401).json({message: 'No authentication provided! Redirecting to login...'});
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({message: 'Error logging in. Incorrect information provided.'})
        req.userId = user.userId;
        next();
    });
}