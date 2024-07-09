import { Post } from '@/types/backend';
import { promises as fs } from 'fs';

export async function DELETE (req: Request) {
    try {
        const file_data = await fs.readFile(process.cwd() + '/src/data/data.json', 'utf8')
        const allPosts = JSON.parse(file_data).posts

        const { searchParams } = new URL(req.url)
        const postId = parseInt(searchParams.get('postId') ?? '0')

        const newPosts = allPosts.filter((post: Post) => post.id !== postId)
        const newJson = JSON.stringify({ posts: newPosts})

        await fs.writeFile(process.cwd() + '/src/data/data.json', newJson, 'utf8')
        return Response.json({ status: 200, message: 'Delete successfully !', data: '' })
    }
    catch (error) {
        console.log(error)
        return Response.json({ status: 500, message: 'Error !', data: '' })
    }
}