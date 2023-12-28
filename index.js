var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const locationsRouter = require('./Data/locationsRouter');
const authRoutes = require('./Auth/auth');
const communityRouter = require('./Community Reporting/communityRouter'); 
const environmentalAlertRouter = require('./EnvironmentalAlert/EnvironmentalAlertRouter')
const educationalResourcesRouter = require('./EducationalResources/educationalResourcesRouter')

app.use('/community', communityRouter);
app.use('/auth', authRoutes);
app.use('/dataCOll', locationsRouter);
app.use('/envir', environmentalAlertRouter);
app.use('/edResource', educationalResourcesRouter);


app.listen(3080, () => {
    console.log(`Server running in port ${3080}/`);
});



