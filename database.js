module.exports = () => {
    const mongoose = require('mongoose');
    const url = require('./url');
    
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }, (err) => {
        if(err){
            console.log(err);
        }

        console.log('Database connected')
    })
}

