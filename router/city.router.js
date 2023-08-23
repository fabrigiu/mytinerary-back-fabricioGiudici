import cityController from '../controllers/city.controller.js'; 
import express from 'express';

const router = express.Router();
const { getCities, createCity, getCityById, updateCity, deleteCity } = cityController;

router.get('/', getCities);
router.get('/:id', getCityById);
router.post('/', createCity);
router.put('/:id', updateCity);
router.delete('/:id', deleteCity);

export default router;