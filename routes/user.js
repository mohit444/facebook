const { home } = require("../controllers/user");

const router = require("express").Router();

router.get("/", home);

module.exports = router;
