const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');

//routes
router.get('/api/test', (req, res) => {
    const data = {
        "id": "1",
        "name": "API is working"
    }
    res.json(data);
});

router.get('/api/users', userController.list);

router.get('/api/users/stats', userController.getStats);

router.get('/api/users/id=:id', userController.show);

router.post('/api/users', userController.add);

router.put('/api/users/:id', userController.update);

router.delete('/api/users/:id', userController.delete);

module.exports = router;