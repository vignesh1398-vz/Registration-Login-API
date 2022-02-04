const userRouter = require('express').Router();
const userController = require('./user.controller');

userRouter.post('/signup', userController.addUser);
userRouter.put('/:userId/modify', userController.modifyUser);

module.exports = userRouter;