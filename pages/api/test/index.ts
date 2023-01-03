import { NextApiRequest, NextApiResponse } from "next"

import NotionService from "@/services/notion"

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const notionService = new NotionService(process.env.NOTION_TOKEN)

    const databases = await notionService.searchDatabase("Summary")

    res.status(200).json(databases)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
