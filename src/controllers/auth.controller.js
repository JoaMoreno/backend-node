const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const authCtrl = {};

// DEV
authCtrl.getData = async (req, res) => {
    const data = await User.find()
    res.json(data)
}

authCtrl.profile = async (req, res) => {
    const  userId  = req.userId;
    //console.log(userId)
    const user = await User.findById(userId, { password: 0});

    /* ![ NO USER FOUND ]! */
    if(!user) return res.status(404).json({message:"No user found"});

    res.json(user)
}

authCtrl.singUp = async (req, res, next) => {

    const { name, username, email, password } = req.body;
    // Another way is User.create({... , ...}), this saves directly
    const newUser = new User({ name, username, email, password });

    // Encriptando la contraseña a traves del metodo de la instancia "User"
    newUser.password = await newUser.encryptPassword(newUser.password);
    await newUser.save();

    // jwt.sing admite un objeto de configuracion ej:  {expiresIn: 60*60*24}
    const token = await jwt.sign({_id: newUser._id}, process.env.SECRET_KEY);

    res.status(200).json({
        message:"User Created",
        //user: newUser,
        auth: true,
        token
    });
};

authCtrl.singIn = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({email});

    /* ![ WRONG EMAIL ]! */
    if(!user) return res.status(401).json({message:"The email doesn't exists"});

    // Validacion de contraseña a traves de metodo bcrypt in User Schema
    const passwordIsValid = await user.validatePassword(password);
    //console.log("Is Valid?: " + passwordIsValid)

    /* ![ WRONG PASSWORD ]! */
    if(!passwordIsValid) return res.status(401).json({message:"Wrong Password", auth: false, token: null});

    const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY)

    return res.status(200).json({
        message:"User Logged",
        auth: true,
        token
    });
};

module.exports = authCtrl;
