const { Router } = require('express');
const Post = require('../models/post');

const router = Router();

/**
 * get /all
 * get /:id
 * put /
 * delete /:id
 * post /:id
 */

router.get('/all', async(req, res) => {
    try {
        const post = Post.find({});

        res.status(302).json(post);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Что-то пошло не так...' })
    }
})

router.put('/', async(req, res) => {
    const { header, body, images } = req.body;

    try {
        const newPost = await new Post({
            author: req.userId,
            header,
            body,
            images
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Что-то пошло не так...' })
    }
})

router.get('/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        res.status(302).json(post)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Что-то пошло не так...' })
    }
})

router.post('/:id', async(req, res) => {
    const { id, header, body } = req.params;

    try {
        const post = await Post.findByIdAndUpdate(id, {$set: {header, body}});

        res.status(302).json(post)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Что-то пошло не так...' })
    }
})

router.delete('/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByIdAndRemove(id, (err) => {
            if(err) {
                console.log(err);
                return res.status(403).json({ message: 'Ошибка при удалении поста' })
            }
            res.status(200).json({ message: 'Пост успешно удален' })
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Что-то пошло не так...' })
    }
}) 