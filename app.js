const express = require('express');
const app = express();
const path = require('path');

// Middleware to check working hours
function checkWorkingHours(req, res, next) {
    const currentDateTime = new Date();
    const currentDay = currentDateTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const currentHour = currentDateTime.getHours(); // 0-23

    // Check if the day is Monday to Friday and the time is 9 AM to 5 PM
    if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
        next(); // Continue to the next middleware or route handler
    } else {
        res.send('The web application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
    }
}

// Use the middleware
app.use(checkWorkingHours);

// Set static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'services.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});