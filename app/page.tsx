import { Connection, ConnectionPromises } from 'msnodesqlv8/types'
import dbConnect from '../utils/dbConnect'
import { Task } from '../models/Task'
import { TodoList } from './TodoList'

async function getTasks(): Promise<Task[]> {
  const sql = dbConnect()
  console.log(`[home] opening connection`)
  const con: Connection = await sql.driver.promises.open(sql.connStr)
  const promises: ConnectionPromises = con.promises
  const sqlQuery = 'select _id, task, completed from Task'
  console.log(sqlQuery)
  const q = await promises.query(sqlQuery)
  const tasks: Task[] = q.first
  console.log(tasks)
  await promises.close()
  return tasks
}

export const dynamic = 'force-dynamic'

export default async function Home() {
  const tasks = await getTasks()
  return <TodoList initialTasks={tasks} />
}
