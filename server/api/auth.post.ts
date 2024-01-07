import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
export default defineEventHandler(async (event) => {


  if (event.context.user === false) {
    setResponseStatus(event, 401)
    return
  }
  const userId = event.context.user
  const src = path.join(process.cwd(), 'public', 'usersDB.json')
  const content = JSON.parse(fs.readFileSync(src, 'utf8'));
  const user = content.find((user: User) => user.id == userId);
  delete user.password
  if (user) return user
  else { setResponseStatus(event, 401); return }

})
