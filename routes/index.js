const router = require('express').router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.send("<h1>This is the wrong route</h1>")
});

module.exports = router;