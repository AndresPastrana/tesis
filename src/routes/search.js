const { Router } = require("express");
const ControllerSearch = require("../controllers");

const router = new Router();
router.get('/:collection', ControllerSearch.getDocs)


module.exports = router;