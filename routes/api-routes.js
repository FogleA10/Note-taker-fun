const router = require('express').Router();
const { response } = require('express');
const fs = require('fs');
const { uuid } = require('uuidv4');

router.get('/notes', (req, res) => {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))
    res.json(notes)
})

router.post('/notes', async (req, res) => {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))
    let newNote = req.body;
    newNote.id = uuid()
    let allNotes = [...notes, newNote];

    fs.writeFileSync("./db/db.json", JSON.stringify(allNotes))
    res.json(allNotes);

});
//   const request = {
//       body: {
//           text: "text",
//           title: "title"
//       }
//   }
//   request["body"].text
router.delete('/notes/:id', async (req, res) => {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))
    let result = notes.filter(singleNote => singleNote.id !== req.params.id );
    fs.writeFileSync("./db/db.json", JSON.stringify(result))
    res.json({ok: true});
    

    


});

module.exports = router