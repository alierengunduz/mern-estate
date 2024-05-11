import {errorHandler} from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import UserModel from '../models/user.model.js';

const updateUser = async (req, res,next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'Your can only update your own account'));
    }
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        // $set : Kullanıcı illa tüm verileri güncellicek diye birşey yok sadece resminide güncelleyebilir yada daha farklı bu şekilde işlermlerde kullanılır. $set 'ten sonra req.body yapma veritabanını hackleyen bir kişi kendini admin yapabilir bu şekilde yap.
        const updateUser = await UserModel.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, {new: true});
        //şifreyi görmek istemiyoruz veritabanımız hacklenebilir
        const {password, ...rest} = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res,next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'Your can only delete your own account'));
    }
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted')
    } catch (error) {
        next(error)
    }
}


export {
    updateUser,
    deleteUser
}