const { Router } = require('express');
const router = Router();

// Mocks estables para la suite de QA
const adoptionsMock = [
    { id: 1, petId: 10, userId: 5 },
    { id: 2, petId: 11, userId: 6 }
];

router.get('/', (req, res) => {
    res.status(200).json(adoptionsMock);
});

router.get('/:aid', (req, res) => {
    const id = parseInt(req.params.aid);
    const adoption = adoptionsMock.find(a => a.id === id);
    if (!adoption) {
        return res.status(404).json({ error: 'Adoption not found' });
    }
    res.status(200).json(adoption);
});

router.post('/', (req, res) => {
    const { petId, userId } = req.body;
    if (!petId || !userId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const newAdoption = { id: adoptionsMock.length + 1, petId, userId };
    adoptionsMock.push(newAdoption);
    res.status(201).json(newAdoption);
});

// ⚠️ LA LÍNEA CLAVE: Si falta esto, app.use rompe al instante
module.exports = router;