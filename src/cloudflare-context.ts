import { AsyncLocalStorage } from 'node:async_hooks'
import type { AnyD1Database } from 'drizzle-orm/d1'

export interface WorkerEnv {
  my_database: AnyD1Database
}

const envStorage = new AsyncLocalStorage<WorkerEnv>()

export function runWithWorkerEnv<T>(env: WorkerEnv, fn: () => T): T {
  return envStorage.run(env, fn)
}

export function getWorkerEnv(): WorkerEnv {
  const env = envStorage.getStore()
  if (!env) throw new Error('Worker env not available outside request context')
  return env
}
