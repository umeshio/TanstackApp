import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server'
import { runWithWorkerEnv } from './cloudflare-context'
import type { WorkerEnv } from './cloudflare-context'

const startHandler = createStartHandler(defaultStreamHandler)

export default {
  fetch(request: Request, env: WorkerEnv, _ctx: unknown): Promise<Response> {
    return runWithWorkerEnv(env, () =>
      startHandler(request),
    ) as Promise<Response>
  },
}
