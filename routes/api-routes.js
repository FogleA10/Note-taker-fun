const router = require('express').Router();
const fs =require('fs');
const {uuid} =require('uuidv4');

router.get('/notes', (req,res)=> {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))
    res.json(notes)
})

router.post('/notes', async (req, res) => {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))
    let newNote = req.body;
    newNote.id=uuid()
    let allNotes = [...notes, newNote];

    fs.writeFileSync("./db/db.json", JSON.stringify(allNotes))
    res.json(allNotes);
  
});
  
//   router.delete('/notes/:id', async (req, res) => {

//   });

  module.exports = router