
const Order = require('../models/Order');

const isAuthor = async(req, res, next) => {
    try {
        const order = await Order.findById(req.params._id);
        if (order.userId.toString() !== req.user._id.toString()) { 
            return res.status(403).send({ message: `Post with id ${req.params._id} is not yours`});
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'There was a problem verifying the authorship of the post' })
    }
};

module.exports = { isAuthor };