const express = require('express');
const axios = require('axios');
const app = express();

// Replace with your Telegram bot token and chat ID
const TELEGRAM_BOT_TOKEN = 'AAFjImXQQ7mGgx7471qWg_1jUgW2i8rJYNo';
const TELEGRAM_CHAT_ID = '8003728001';

app.use(express.urlencoded({ extended: true }));

// Handle form submission
app.post('/submit', async (req, res) => {
    const { name, email, message } = req.body;

    // Construct the message to send to Telegram
    const telegramMessage = `New Form Submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

    try {
        // Send the message to Telegram
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage,
        });

        res.send('Form submitted successfully!');
    } catch (error) {
        console.error('Error sending message to Telegram:', error.response?.data || error.message);
        res.status(500).send('Error submitting form.');
    }
});

// Serve the HTML form
app.get('/', (req, res) => {
    res.send(`
        <form action="/submit" method="POST">
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name" required><br><br>

            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email" required><br><br>

            <label for="message">Message:</label><br>
            <textarea id="message" name="message" required></textarea><br><br>

            <button type="submit">Submit</button>
        </form>
    `);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});