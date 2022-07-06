const { Router } = require("express");
const activitiesRouter = require("./Activities.js");
const countriesRouter = require("./Countries.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", countriesRouter, activitiesRouter);
// router.use("/activities", activitiesRouter);

module.exports = router;
