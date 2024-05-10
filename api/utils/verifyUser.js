import { errorHandler } from './error.js';
import jwt from 'jsonwebtoken';
// güncelleme işlemi gibi işlemlerde kullanıcıyı doğrulamak gerekir bunun çin cookideki veriyi kullanıcaz cookideki veriyi kullanabilmemiz için cookieParser paketini ekledik yoksa veriyi çekip kullanamayız.
export const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(403, 'Forbidden'));
        }
        req.user = user;
        next();
    })
}
