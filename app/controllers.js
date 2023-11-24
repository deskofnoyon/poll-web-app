exports.getHealth = (_req, res) => {
    res.status(200).json({
        status: true,
        message: "OK"
    })
}

exports.homeRoute = (_req, res) => {
    res.status(200).render('index')
}