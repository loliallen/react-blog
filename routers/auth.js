const { Router } = require('express');
const { HmacSHA512 } = require('crypto-js');
const User = require('../models/user')

const router = Router();
// /api/auth + ...

router.post('/signin', async (req, res) => {
    // Обращение к базе данных  => Boolean
    const { login, password} = req.body 

    try {
        // { login: login } <=> { login }
        const user = await User.findOne({ login, password: HmacSHA512(password).toString() })

        if( !user ) {
            return res.status(403).json({ message: 'Неверный логин или пароль!' })
        }
        res.cookie('token', user.token)
        
        res.status(200).json({ message: 'Авторизация успешна!' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Что-то пошло не так...' })
    }
})

router.post('/signup', async (req, res) => {
    const { name, login, password } = req.body
    
    try {
        const newUser = await new User({
            name, login, password: HmacSHA512(password).toString()
        })

        newUser.save();

        res.status(201).json({ message: 'Пользователь был успешно создан' })
    
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Что-то пошло не так...' })
    }
})
