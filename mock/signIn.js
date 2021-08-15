module.exports = (req, res) => {
    console.log(req.query);
    console.log(req.params)
    res.json({account: 'zhangsan', userId: 1});
}
