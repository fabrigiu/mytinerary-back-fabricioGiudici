import itineraryController from '../controllers/itinerary.controller.js'; 
import express from 'express';

const router = express.Router();
const { getItineraries, createItinerary, getItineraryById, updateItinerary, deleteItinerary } = itineraryController;

router.get('/', getItineraries);
router.get('/:id', getItineraryById);
router.post('/', createItinerary);
router.put('/:id', updateItinerary);
router.delete('/:id', deleteItinerary);

export default router;