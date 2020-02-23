const express = require('express');

const Schemes = require('./scheme-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const schemes = await Schemes.find();
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get schemes' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const scheme = await Schemes.findById(id);

    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get schemes' });
  }
});

router.get('/:id/steps', async (req, res) => {
  const { id } = req.params;

  try {
    const scheme = await Schemes.findById(id);
    if (!scheme) {
      return res.status(404).json({ message: `Could not find scheme with the id of ${id}` });
    }
    const steps = await Schemes.findSteps(id);

    if (steps.length) {
      res.json(steps);
    } else {
      res.status(404).json({ message: 'Could not find steps for given scheme' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get steps' });
  }
});

router.post('/', async (req, res) => {
  const schemeData = req.body;

  try {
    const [schemeId] = await Schemes.add(schemeData);
    if (schemeId) {
      const newlyInsertedScheme = await Schemes.findById(schemeId);
      res.status(201).json(newlyInsertedScheme);
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new scheme' });
  }
});

router.post('/:id/steps', async (req, res) => {
  const stepData = req.body;
  const { id } = req.params;

  try {
    const scheme = await Schemes.findById(id);

    if (scheme) {
      const step = await Schemes.addStep(stepData, id);
      res.status(201).json(step);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Failed to create new step' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const scheme = await Schemes.findById(id);

    if (scheme) {
      const count = await Schemes.update(changes, id);
      if (count) {
        res.json({ message: 'Update successful.' });
      } else {
        res.status(500).json({ message: 'Failed to update scheme' });
      }
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update scheme' });
  }
});

router.put('/:id/steps/:stepId', async (req, res) => {
  const { id, stepId } = req.params;
  const changes = req.body;
  try {
    const scheme = await Schemes.findById(id);
    if (scheme) {
      const step = await Schemes.findStepById(stepId);
      if (step) {
        const count = await Schemes.updateStep(changes, stepId);
        if (count) {
          return res.status(200).json({ message: 'Update successful.' });
        } else {
          return res.status(500).json({ message: 'Failed to update step.' });
        }
      } else {
        return res.status(404).json({ message: `Could not find a step matching the id ${stepId}` });
      }
    } else {
      return res.status(404).json({ message: `Could not find a scheme matching the id ${id}` });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'Failed to update step' });
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Schemes.remove(id);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete scheme' });
  }
});

router.delete('/:id/steps/:stepId', async (req, res) => {
  const { id, stepId } = req.params;

  try {
    const scheme = await Schemes.findById(id);
    if (!scheme) {
      return res.status(404).json({ message: `Could not find scheme with the id of ${id}` });
    }
    const deleted = await Schemes.removeStep(stepId);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: `Could not find step with id ${stepId}` });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete scheme' });
  }
});

module.exports = router;
