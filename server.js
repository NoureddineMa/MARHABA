const express = require('express');
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000;
const { router  } = require('./routes/authRoutes')

const app = express();

app.use(express.json())


app.use('/api/auth', router)

app.use(express.urlencoded ({extended: false}))


app.listen(PORT, () => {
    console.log(`server Started at port ${PORT}`);
})

// connect base données:
require('./config/dbConfig').connect();