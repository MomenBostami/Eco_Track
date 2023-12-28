var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const authRoutes = require('./Auth/auth');



app.use('/auth', authRoutes);



app.listen(3080, () => {
    console.log(`Server running in port ${3080}/`);
    
});



