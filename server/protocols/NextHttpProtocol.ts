import { NextRequest } from "next/server"
import { NextApiRequest, NextApiResponse } from "next"

export type RawApiHandler = (request: NextApiRequest, response: NextApiResponse) => Promise<void>

export type RawMiddlewareHandler  = (request: NextRequest) => Promise<void>
