const { Router } = require('express');
const User = require('../models/user')


const router = Router();
/**
 * current => /id
 * 
 */
// /api/users

router.get('/:id', async(req, res) => {
    
    const { id } = req.params;

    try {
        const user = await User.findById(id)

        res.status(302).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Что-то пошло не так...' })
    }

})
