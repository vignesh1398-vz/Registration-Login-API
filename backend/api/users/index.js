const userRouter = require('express').Router();
const userController = require('./user.controller');

userRouter.post('/signup', userController.addUser);
userRouter.post('/login', userController.login);
userRouter.put('/:userId/modify', userController.modifyUser);
userRouter.put('/:userId/logout', userController.logout);

module.exports = userRouter;