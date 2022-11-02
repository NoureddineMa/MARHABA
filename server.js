const express = require('express');
require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT || 5000;
const { router  } = require('./routes/authRoutes')
const  ClientRouter  = require('./routes/ClientRouter')
const  livreurRouter = require('./routes/LivreurRouter')
const  managerRouter = require('./routes/ManagerRouter')


const app = express();
app.use(cors({origin:true,credentials:true}));
app.use(express.urlencoded ({extended: false}))
app.use(express.json())

// authentification route:
app.use('/api/auth', router)
// client route : 
app.use('/api/user', ClientRouter)
// Livreur route:
app.use('/api/user', livreurRouter)
// Manager route: 
app.use('/api/user', managerRouter)

app.listen(PORT, () => {
    console.log(`server Started at port ${PORT}`);
})
// connect base données:
require('./config/dbConfig').connect();