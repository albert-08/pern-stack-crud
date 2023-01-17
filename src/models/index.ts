export interface DBVariables {
  user: string | undefined,
  password: string | undefined,
  host: string | undefined,
  port: number | undefined,
  database: string | undefined
}

export interface Task {
  title: string,
  description: string
}