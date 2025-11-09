import { createUser, findUserByEmail } from '../dao/user.dao.js';
import AppError from '../utils/appError.utils.js';
import { comparePassword, hashPassword, signToken } from '../utils/helper.utils.js';

export const registerUserService = async (name, email, password ) => {
    const user = await findUserByEmail(email);
    if (user) throw AppError.conflict('User already exists');

     const hashedPassword = await hashPassword(password);
    // * new User
    const newUser = await createUser(name, email, hashedPassword);
    const token = signToken({id: newUser._id});
    return {token, user};
}

export const loginUserService = async (email, password) => {
    const user = await findUserByEmail(email);
    const isPassMatch = await comparePassword(password, user.password);
    if (!user || !isPassMatch) throw AppError.unauthorized('Invalid credentials');
    const token = signToken({id: user._id});
    return {token, user};
}