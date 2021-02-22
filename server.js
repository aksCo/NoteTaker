const fs = require("fs");
const express = require("express");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static('public'));
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));

});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));

});

/* app.post("/api/notes", function(req, res) 
{
    fs.readFile(__dirname + "/db/db.json", 'utf8', function(error, notes) {
        if (error) {
            return console.log(error)
        }
        notes = JSON.parse(notes)
        var id = notes[notes.length - 1].id + 1
        var newNote = { title: req.body.title, text: req.body.text, id: id }
        var activeNote = notes.concat(newNote);
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(activeNote), function(error, data) {
            if (error) {
                return error
            }
            console.log(activeNote)
            res.json(activeNote);

        })
    })
}) */

app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    let noteLength = (noteList.length).toString();
    newNote.id = noteLength;
    noteList.push(newNote);

    fs.writeFileSync("./db/db.json", json.stringify(noteList));
    res.json(noteList);
})


/* app.delete("/api/notes/:id", function(req, res) {
    const noteid = JSON.parse(req.params.id)
    console.log(noteid)
    fs.readFile(__dirname + "/db/db.json", "utf8", function(error, notes) {
        if (error) {
            return console.log(error)
        }
        notes = JSON.parse(notes)
        notes = notes.filter(val => val.id !== noteid)

        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function(error, data) {
            if (error) {
                return error
            }
            res.json(notes)
        })
    })
}) */

app.delete("/api/notes/:id", function(req, res) {
    let noteList = json.parse(fs.readFileSync("./db/db.json", "utf-8"));
    let noteId = req.params.id.toString();
    noteList = noteList.filter(selected => {
        return selected.id != noteId;
    })

    fs.writeFileSync("./db/db.json", json.stringify(noteList));
    res.json(noteList);
});


app.listen(PORT, function() {
    console.log("Listening on PORT" + PORT);
});