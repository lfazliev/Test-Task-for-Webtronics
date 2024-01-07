import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event)
    const src = path.join(process.cwd(), 'public', 'usersDB.json')
    const content = JSON.parse(fs.readFileSync(src, 'utf8'));


    const user = content.find((user: User) => user.username == data.username)
    if (!user) {
      setResponseStatus(event, 401); return

    }
    else {
      if (user.password == data.password) {
        const token = jwt.sign({ userId: user.id }, '123key', { expiresIn: '7d' })
        appendResponseHeaders(event, {
          'Access-Control-Expose-Headers': 'Authorization',
          'Authorization': token
        }
        )
        delete user.password
        return (user)
      }
      else {
        setResponseStatus(event, 401);
        return
      }
    }

  } catch (e) {
    return { result: 'error', data: e }
  }
})