const User = require("../models/users");

exports.list = async (req, res) => {
    try {
        const users = await User.find({}).sort({ id: 'asc' });
        res.json(users);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};


exports.getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({});

        const stats = {
            totalUsers: totalUsers,
        };

        res.json(stats);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error when obtaining stats",
        });
    }
};

exports.show = async (req, res, next) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (!user) {
            res.status(404).json({ message: "Item not finded" });
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error" });
        next();
    }
};

exports.add = async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.json({ message: "Added new user" });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

exports.update = async (req, res, next) => {
    try {
        const user = await User.findOneAndUpdate(
            { id: req.params.id },
            req.body
        );
        res.json({ message: "Updated user" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error" });
        next();
    }
};

exports.delete = async (req, res, next) => {
    try {
        const user = await User.findOneAndDelete({
            id: req.params.id,
        });
        res.json({ message: "Deleted user" });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "El Cliente no existe",
        });
        next();
    }
};
