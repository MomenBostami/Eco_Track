var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const authRoutes = require('./Auth/auth');
const locationsRouter = require('./Data/locationsRouter');

const educationalResourcesRouter = require('./EducationalResources/educationalResourcesRouter')
const communityRouter = require('./Community Reporting/communityRouter');
app.use('/auth', authRoutes);
app.use('/dataCOll', locationsRouter);
app.use('/edResource', educationalResourcesRouter);
app.use('/community', communityRouter);

app.listen(3080, () => {
    console.log(`Server running in port ${3080}/`);
    
});



