const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

const NoteModel = mongoose.model('notes', noteSchema);
NoteModel.createIndexes({}).then(() => {
    console.log("Note indexes created");
});

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.get('/notes', async (req, res) => {
    try {
        let notes = await NoteModel.find({});
        res.send(notes);
    } catch (err) {
        res.send(err);
    }
})

app.post('/notes', async (req, res) => {
    try {
        let note = await NoteModel.create(req.body);
        NoteModel.save(note);
        res.send("Note created successfully.");
    } catch (err) {
        res.send(err);
    }
})

const startServer = async () => {
    await mongoose.connect("mongodb+srv://nashtefison:yFRkzhl3fOL9OCyC@cluster0.h7yx1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected to MongoDB server");

    app.listen(3000, '0.0.0.0', () => console.log("Server is running on port 3000"));
}

startServer();