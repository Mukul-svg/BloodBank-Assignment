const express = require('express');
const router = express.Router();
const bloodBankController = require('./../controllers/bloodBankController');

// Create new entry
router.post('/', bloodBankController.createEntry);

// Get all entries with pagination
router.get('/', bloodBankController.getAllEntries);

// Search functionality
router.get('/search', bloodBankController.searchEntries);

// Get entry by ID
router.get('/:id', bloodBankController.getEntryById);

// Update entry
router.put('/:id', bloodBankController.updateEntry);

// Delete entry
router.delete('/:id', bloodBankController.deleteEntry);

module.exports = router;