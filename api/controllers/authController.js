const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

const User = mongoose.model('User');

exports.signupValidators = [
  body('name').notEmpty().isLength({ min: 4, max: 10 }),
  body('email').notEmpty().isEmail().normalizeEmail(),
  body('password').notEmpty().isLength({ min: 4, max: 10 }),
];

exports.signinValidators = [
  body('email').notEmpty().isEmail().normalizeEmail(),
  body('password').notEmpty().isLength({ min: 4, max: 10 }),
];

exports.validateSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // check to see if user already exists
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).send({ errors: [{ msg: 'User already exists' }] });
  }

  next();
};

// add new user and send token
exports.signup = async (req, res, next) => {
  const { email, name, password } = req.body;

  const user = await new User({ name, email, password });

  // encrypt password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  req.user = user;

  next();
};

exports.validateSignin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // make sure user exists
  if (!user) {
    return res.status(401).send({ errors: [{ msg: 'Invaild credentials' }] });
  }

  // make sure password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send({ errors: [{ msg: 'Invalid credentials' }] });
  }

  req.user = user;

  next();
};

exports.signin = async (req, res) => {
  const payload = {
    user: {
      id: req.user.id,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 360000 },
    (error, token) => {
      if (error) throw error;
      res.json({ token, user: req.user });
    }
  );
};

exports.checkAuth = async (req, res, next) => {
  const token = await req.header('x-auth-token');
  // check for token
  if (!token) {
    return res.status(401).send({ msg: 'No token, authorization denied' });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
