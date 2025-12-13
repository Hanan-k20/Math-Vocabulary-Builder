const express = require('express');

const router = express.Router();
const Terms = require('../models/terms.js');

const CATEGORIES = [
        'Algebra',
        'Geometry',
        'Calculus',
        'Statistics',
        'Probability',
        'Trigonometry',
        'Number Theory',
        'Discrete Math'
        ]


module.exports = router;


router.get('/', async (req, res) => {
  try {
    const terms = await Terms.find().populate('userId');
    console.log(terms);

    res.render('terms/index.ejs', { terms });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

router.get('/new', async (req, res) => {
  try {
    res.render('terms/new.ejs',{ categories: CATEGORIES });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const currentTerms = await Terms.findById(req.params.id);
    res.render('terms/edit.ejs', {terms: currentTerms,categories: CATEGORIES});
    
  } catch (error) {
     console.error(error);
    res.redirect('/terms');
  }
});

router.post('/', async (req, res) => {
  try {
    req.body.userId = req.session.user._id;
    const terms= await Terms.create(req.body);
    res.redirect('/terms');
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});


router.put('/:id', async (req, res) => {
  try {
    const terms = await Terms.findById(req.params.id);
    const isOwner = terms.userId.equals(req.session.user._id);
    if (isOwner) {
      await terms.updateOne(req.body);
      res.redirect(`/terms/${req.params.id}`);
    } else {
      res.redirect(`/terms/${req.params.id}`);
    }
  } catch (error) {
    console.error(error);
    res.redirect('/terms');
  }
});


router.get('/:id', async (req, res) => {
  try {
    const terms = await Terms.findById(req.params.id).populate('userId');
   if (!terms) {
      return res.send(`No term found with ID = ${req.params.id}`);
    }
    res.render('terms/show.ejs', { terms });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const terms = await Terms.findById(req.params.id);
    const isOwner=terms.userId.equals(req.session.user._id)
    if (isOwner) {
     await terms.deleteOne()
      res.redirect("/terms")

    } else {
        throw new Error (`permission denied to ${req.params.id}`);
    
    }
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


