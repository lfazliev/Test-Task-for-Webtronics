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
  const token = event.node.req.headers.authorization
  if (!token) return 0
  jwt.verify(token, '123key', (err: any, decoded: any) => {
    if (err) {
      return 0
    } else {
      const userId = getQuery(event)?.id as number
      if (!userId) return 0
      const src = path.join(process.cwd(), 'public', 'usersDB.json')
      const content = JSON.parse(fs.readFileSync(src, 'utf8'));
      const user = content.find((user: User) => user.id == userId);

      if (user) { delete user.password; return user }
      else return 0
    }
  });

}))

router.put('/user', defineEventHandler(async (event) => {
  const token = event.node.req.headers.authorization
  let userId: number
  if (!token) return 0
  jwt.verify(token, '123key', (err: any, decoded: any) => {
    if (err) {
      return 0
    } else {
      return userId = decoded.userId
    }
  })
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
  const token = event.node.req.headers.authorization
  if (!token) return 0
  jwt.verify(token, '123key', (err: any, decoded: any) => {
    if (err) {
      return 0
    } else {
      const src = path.join(process.cwd(), 'public', 'ticketsDB.json')
      const content = JSON.parse(fs.readFileSync(src, 'utf8'));
      return content
    }
  })


}))

router.get('/ticket', defineEventHandler(async (event) => {
  const token = event.node.req.headers.authorization
  if (!token) return 0
  jwt.verify(token, '123key', (err: any, decoded: any) => {
    if (err) {
      return 0
    } else {
      const ticketId = getQuery(event)?.id as number
      if (!ticketId) return 0
      const src = path.join(process.cwd(), 'public', 'ticketsDB.json')
      const content = JSON.parse(fs.readFileSync(src, 'utf8'));
      const ticket = content.find((ticket: Ticket) => ticket.id == ticketId)
      if (ticket) return ticket
      else return 0

    }
  })


}))

export default useBase('/api', router.handler)

