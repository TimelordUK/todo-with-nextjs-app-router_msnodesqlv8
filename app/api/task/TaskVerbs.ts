import { Task } from '../../../models/Task'
import { Connection, ConnectionPromises } from 'msnodesqlv8/types'
import dbConnect from '../../../utils/dbConnect'

export class TaskVerbs {

  async getConnection(): Promise<ConnectionPromises> {
    const sql = dbConnect()
    console.log(`[index] opening connection`)
    const con: Connection = await sql.driver.promises.open(sql.connStr)
    return con.promises
  }

  public async GET(): Promise<Task[]> {
    const promises: ConnectionPromises = await this.getConnection()
    const sqlQuery = 'select _id, task, completed from Task'
    console.log(sqlQuery)
    const q = await promises.query(sqlQuery)
    const tasks: Task[] = q.first
    console.log(tasks)
    await promises.close()
    return tasks
  }

  public async POST(body: Partial<Task>): Promise<Task> {
    const promises: ConnectionPromises = await this.getConnection()
    await promises.beginTransaction()
    const q1 = `insert into Task (task, completed) values ('${body.task}', 0)`
    console.log(q1)
    await promises.query(q1)
    const q2 = 'select max(_id) as id from Task'
    console.log(q2)
    const queryRes = await promises.query(q2)
    const lastId = queryRes.first[0].id
    const q3 = `select _id, task, completed from Task where _id = ${lastId}`
    console.log(q3)
    const fetched = await promises.query(q3)
    const added = fetched.first[0] as Task
    await promises.commit()
    await promises.close()
    return added
  }

  public async DELETE(id: string): Promise<void> {
    const promises: ConnectionPromises = await this.getConnection()
    const q = `delete from Task where _id = ${id}`
    console.log(q)
    await promises.query(q)
    await promises.close()
  }

  public async PUT(id: string, body: Partial<Task>): Promise<Task> {
    const promises: ConnectionPromises = await this.getConnection()
    console.log(JSON.stringify(body))
    const q = `update Task set task='${body.task}', completed='${body.completed ? 1 : 0}' where _id = ${id}`
    console.log(q)
    await promises.query(q)
    const result = await promises.query(`select _id, task, completed from Task where _id = ${id}`)
    await promises.close()
    return result.first[0] as Task
  }
}
