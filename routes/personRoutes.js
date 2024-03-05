const express = require("express");
const router = express.Router();
const person = require("../models/Person");

router.post("/", async (req, res) => {
  try {
    const data = req.body; //req.body constains person data.
    // console.log(data);
    const NewPerson = new person(data);

    //save newPerson into the database
    const responce = await NewPerson.save();
    console.log("data saved");
    res.status(200).json(responce);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

//get the data of person
router.get("/", async (req, res) => {
  try {
    const data = await person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "internal server error" });
  }
});

//parametrised query
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const data = await person.find({ work: workType });
      console.log("fetched sucessesfully");
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Not found" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract the id from the url parameter
    const updatedPersonData = req.body; // updated data for the person

    const responce = await person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, //return the updated document
        runValidators: true, //run mangooes validation
      }
    );
    if (!responce) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("data updated");
    res.status(200).json(responce);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personID = req.params.id;

    const responce = await person.findByIdAndDelete(personID);
    if (!responce) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("deleted sucessuffyl");
    res.status(200).json({message:'person deleted sucsusu'});

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
