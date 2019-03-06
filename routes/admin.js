const express = require('express');
const router = express.Router();
const	upload = require("../middleware/upload")
const admin = require("../app/admin.controller")

router.get('/admin',function (req,res) {
  res.render("./admin");
});

router.get('/admin/createUser',function(req,res) {
  res.render('./admin/createUser');
});

router.get('/admin/updateUser',function(req,res) {
  res.render('./admin/updateUser');
});

router.get('/admin/readUser', admin.readUser);

router.delete('/admin/readUser', admin.deleteUser);

router.post('/admin/createUser', admin.createUser);

router.put('/admin/updateUser', admin.updateUser);

router.get('/admin/updateUser/:id', admin.goUpdateUser);

router.get('/admin/deleteUser',function(req,res) {
  res.render('./admin/deleteUser');
});

router.get('/admin/readPayment', admin.readPayment);
  
router.delete('/admin/readPayment', admin.deletePayment);

router.get('/admin/editPayment/:id', admin.goEditPayment);

router.put('/admin/editPayment', admin.editPayment);

router.get('/admin/searchSupport', admin.searchSupportGet);

router.post('/admin/searchSupport', admin.searchSupportPost);

router.get('/admin/handleSupport/:id', admin.handleSupportGet);

router.post("/admin/handleSupport/:id/reply", upload.default("ticket").any(), admin.handleSupportPost);

router.delete('/admin/searchSupport', admin.deleteSupport);

module.exports = router;
