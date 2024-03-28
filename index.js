const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation
const Users = require('./models/User');

app.use(cors());
app.use(express.json());

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/QrCode')
    .then(()=>{
        console.log('It"s connected');
    }).catch((err)=>{
        console.log(err);
    });
}

// Endpoint for user login
app.post('/Login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await Users.findOne({ email });

        if (user) {
            // Compare the provided password with the hashed password stored in the database
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                // If the password matches, generate a JWT token
                const token = jwt.sign({ email: user.email }, 'your_secret_key', { expiresIn: '1h' });
                res.json({ token: token });
            } else {
                res.json({ error: "Incorrect Password" });
            }
        } else {
            res.json({ error: "Account Not Found" });
        }
    } catch (error) {
        console.error(error);
        res.json({ error: "Internal Server Error" });
    }
});

// Endpoint for user registration
app.post('/Signup' , async (req, res) => {
    try {
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        
        const user = await Users.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Other endpoints and configurations...

main().catch((err) => console.log(err));

app.get('/', (req, res) =>{
    res.send('Database connection is established');
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
