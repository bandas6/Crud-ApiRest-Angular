const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
    
        await mongoose.connect( process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Data base online');

    } catch (error) {
        console.log(error);
        throw new Error('Data base initialization failed');
    }


}



module.exports = {
    dbConnection
}
