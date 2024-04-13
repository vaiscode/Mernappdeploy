const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./DB/connection');
const userRoute = require('./Routes/userRoutes');
const employeeformRoute = require('./Routes/employeeformRoutes');
const path = require('path');


const PORT = process.env.PORT;
const app = express();

app.use(express.static(path.join(__dirname,'/build')));

app.use(morgan('dev'));
app.use(cors());
app.use('/api',userRoute);
app.use('/api',employeeformRoute);

app.get('/*', function(req, res) { res.sendFile(path.join(__dirname ,'/build/index.html')); });

app.listen(PORT,()=>{
    console.log(`${PORT} is running`);
})