import { promises as fs } from 'fs';

export async function GET (req: Request) {
    try {
        const file_data = await fs.readFile(process.cwd() + '/src/data/data.json', 'utf8')
        const allPosts = JSON.parse(file_data).posts

        const { searchParams } = new URL(req.url)
        const page = parseInt(searchParams.get('page') ?? '0')
        const limit = parseInt(searchParams.get('limit') ?? '0')
        const offset: number = (page - 1) * limit 
        
        const posts = allPosts.slice(offset, offset + limit)
        return Response.json({ status: 200, message: 'Get successfully !', data: posts })
    }
    catch (error) {
        console.log(error)
        return Response.json({ status: 500, message: 'Error !', data: [] })
    }
}