import { Users } from '../../../generated/prisma/client'

declare global {
  namespace Express {
    interface Request {
      Users?: {
        id: string
      }
    }
  }
}


