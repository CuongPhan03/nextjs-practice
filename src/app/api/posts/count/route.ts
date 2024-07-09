import { promises as fs } from 'fs';

export async function GET (req: Request) {
    try {
        const file_data = await fs.readFile(process.cwd() + '/src/data/data.json', 'utf8')
        const allPosts = JSON.parse(file_data).posts
        
        return Response.json({ status: 200, message: 'Get successfully !', data: allPosts.length })
    }
    catch (error) {
        console.log(error)
        return Response.json({ status: 500, message: 'Error !', data: [] })
    }
}