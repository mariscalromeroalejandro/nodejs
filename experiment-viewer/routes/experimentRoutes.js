const express = require("express");
const Experiment = require("../models/Experiment");
const router = express.Router();

router.get("/experiments", async (req, res) => {
  try {
    const experiments = await Experiment.findAll();
    res.json(experiments);
  } catch (err) {
    res.status(500).json({
      error: "Error getting experiments",
    });
  }
});

router.post("/experiments", async (req, res) => {
  try {
    const { name, description, date } = req.body;
    const newExp = await Experiment.create({
      name,
      description,
      date,
    });
    res.status(201).json(newExp);
  } catch (err) {
    res.status(500).json({
      error: "Error al crear experimento",
    });
  }
});

router.put("/experiments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, date } = req.body;
    const experiment = await Experiment.findByPk(id);
    if (experiment) {
      experiment.name = name;
      experiment.description = description;
      experiment.date = date;
      await experiment.save();
      res.json(experiment);
    } else {
      res.status(404).json({
        error: "Experiment not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Error updating experiment",
    });
  }
});

router.delete("/experiments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const experiment = await Experiment.findByPk(id);
    if (experiment) {
      await experiment.destroy();
      res.json({
        message: `Experiment ${experiment.name} deleted`,
      });
    } else {
      res.status(404).json({
        error: "Experiment not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Error deleting experiment",
    });
  }
});

module.exports = router;
