import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
export default defineEventHandler((event) => {
  try {

    const token = event.node.req.headers.authorization
    if (token) {
      jwt.verify(token, '123key', (err: VerifyErrors | null, decoded) => {
        if (err) {
          event.context.user = false
        } else {
          if (!decoded || typeof decoded === 'string') {
            event.context.user = false;
            return;
          }

          event.context.user = decoded.userId;
        }
      })
    } else {
      event.context.user = false
    }
  }
  catch (e) {
    console.log(e)
  }
})
interface DecodedToken {
  userId: string;
  // Добавьте другие поля вашего объекта, если они присутствуют
}