const express= require("express");
const mongoose = require("mongoose");
const path = require("path");
const port=3000;

const app = express();

const uri = "mongodb+srv://nupurmehlawat:TLRU9b5Gs1KcJg6M@cluster0.dkxps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB Atlas");
})
.catch((err) => {
    console.error("Error connecting to MongoDB Atlas", err);
});

// Define schema
const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: String,
    message: String
});

const Contact = mongoose.model("Contact", contactSchema);

// Middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Handle form submission to MongoDB
app.post("/contact", async (req, res) => {
    try {
        const { name, number, email, message } = req.body;
        const newContact = new Contact({
            name,
            number,
            email,
            message
        });

        await newContact.save();
        res.status(200).send("Contact information saved to the MONGODB database successfully!");
    } catch (error) {
        console.error("Error saving contact information:", error);
        res.status(500).send("Error saving contact information.");
    }
});

app.listen(port, () => {
    console.log("Server started");
});
