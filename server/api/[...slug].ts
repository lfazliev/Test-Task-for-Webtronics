const router = createRouter()
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
// router.get('/users', defineEventHandler(async () => {
//   const src = path.join(process.cwd(), 'public', 'test.json')
//   const content = JSON.parse(fs.readFileSync(src, 'utf8'));
//   return content

// }))

router.get('/user', defineEventHandler(async (event) => {
  if (event.context.user === false) {
    setResponseStatus(event, 401)
    return
  }
  const id = getQuery(event)?.id as number
  if (!id) { setResponseStatus(event, 404); return }
  const src = path.join(process.cwd(), 'public', 'usersDB.json')
  const content = JSON.parse(fs.readFileSync(src, 'utf8'));
  const user = content.find((user: User) => user.id == id);

  if (user) { delete user.password; return user }
  else {
    setResponseStatus(event, 404); return
  }


}))

router.put('/user', defineEventHandler(async (event) => {
  if (event.context.user === false) {
    setResponseStatus(event, 401)
    return
  }
  const userId = event.context.user
  const newData = await readBody(event)
  const src = path.join(process.cwd(), 'public', 'usersDB.json')
  const content = JSON.parse(fs.readFileSync(src, 'utf8'));
  const userIndex = content.findIndex((user: User) => user.id == userId);
  if (userIndex >= 0) {
    Object.assign(content[userIndex], newData)
  }
  await fs.writeFile(src, JSON.stringify(content), 'utf8', (err) => {
    if (err) throw err;
  });
}))

router.get('/tickets', defineEventHandler(async (event) => {
  if (event.context.user === false) {
    setResponseStatus(event, 401)
    return
  }
  const src = path.join(process.cwd(), 'public', 'ticketsDB.json')
  const content = JSON.parse(fs.readFileSync(src, 'utf8'));
  return content
}



))

router.get('/ticket', defineEventHandler(async (event) => {
  if (event.context.user === false) {
    setResponseStatus(event, 401)
    return
  }
  const ticketId = getQuery(event)?.id as number
  if (!ticketId) return 0
  const src = path.join(process.cwd(), 'public', 'ticketsDB.json')
  const content = JSON.parse(fs.readFileSync(src, 'utf8'));
  const ticket = content.find((ticket: Ticket) => ticket.id == ticketId)
  if (ticket) return ticket
  else {
    setResponseStatus(event, 404); return
  }



}))

export default useBase('/api', router.handler)

