const express = require('express');
const multer = require('multer');
const uploadconfig = require('./config/upload');

const Sessioncontroller = require('./controllers/SessionController');
const Spotcontroller = require('./controllers/SpotController');
const Dashboardcontroller = require('./controllers/dashboardcontroller');
const Aprovalcontroller = require('./controllers/approvalcontroller');
const Rejectiocontroller = require('./controllers/Rejectioncontroller');
const Bookingcontroller = require('./controllers/Bookingcontroller');


const routes = express.Router();
const upload = multer(uploadconfig);

routes.post('/Sessions', Sessioncontroller.store);

routes.get('/Spots', Spotcontroller.index);

routes.post('/Spots',upload.single('thumbnail'), Spotcontroller.store);

routes.get('/dashboard', Dashboardcontroller.show);

routes.post('/spots/:spot_id/Bookings',Bookingcontroller.store);

routes.post('/bookings/:booking_id/approvals', Aprovalcontroller.store);
routes.post('/bookings/:booking_id/rejections', Rejectiocontroller.store);

module.exports = routes;