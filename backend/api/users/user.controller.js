const { validatePassword, hashPassword } = require('../../helper/password.helper');
const _ = require('lodash');
const { logger } = require('../../logger/logger');
const users = require('./user.model');

/* Step 1 registration: Mobile and Name */
exports.addUser = async (request, response, next) => {
    try{
        let { mobile, name } = request.body;
        if(!mobile || !name) 
            throw new Error('Mobile number and name is required for signup');
        let insertObject = {
            ...request.body,
            created_date: new Date().toISOString(),
            modified_date: new Date().toISOString()
        }
        let userRecord = new users(insertObject);
        await userRecord.save();
        logger.info('User added');
        response.status(200).json({
            description: 'User added',
            _id: userRecord._id
        });
    }
    catch(error){
        logger.error(error.message);
        response.status(400).json({message: error.message });
    }
}

/* Step 2 & 3 registration */
exports.modifyUser = async (request, response, next) => {
    try{
        let userId = request.params.userId;
        let {name, mobile, email, password, pan, fatherName, DOB} = request.body;
        if(!request.body || !Object.keys(request.body).length)
            throw new Error("Request body is either empty or missing");

        let userRecord = await users.findById(userId);
        if(!userRecord) 
            throw new Error("User not found");
        
        // Password Validation.
        if(password) {
            var passwordViolations = validatePassword(password);
            if(passwordViolations.length) 
                throw {
                    code: 'pwd_violation',
                    status:400,
                    violations: passwordViolations,
                    message: 'Password too weak'
                }
        }

        userRecord.name = name ? name : userRecord.name;
        userRecord.DOB = DOB ? new Date(DOB).toISOString() : userRecord.DOB;
        userRecord.email = email ? email : userRecord.email;
        userRecord.password = password ? await hashPassword(password) : userRecord.password;
        userRecord.fatherName = fatherName ? fatherName : userRecord.fatherName;
        userRecord.pan = pan ? pan : userRecord.pan;
        await userRecord.save();

        logger.info('User modified');
        response.status(200).json({
            description: "User modified",
            _id: userRecord._id
        });
    }
    catch(error){
        logger.error(error.message);
        response.status(400).json({ message: error.message, violations: error.violations });
    }
}