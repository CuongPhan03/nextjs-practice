"use server"

import { revalidateTag } from "next/cache"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

const getPostsByPage = async (page: number, limit: number) => {
    try {
        const res = await fetch(
            `${baseUrl}/api/posts?page=${page}&limit=${limit}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                next: { tags: ['getDatesByPage'] }
            }
        )
        return await res.json()
    } catch(err) {
        console.log(err)
        return { status: 400, message: 'Fetch failed !', data: [] }
    }
}

const getNumPosts = async () => {
    try {
        const res = await fetch(
            `${baseUrl}/api/posts/count`, 
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                next: { tags: ['getNumPosts'] }
            }
        )
        return await res.json()
    } catch(err) {
        console.log(err)
        return { status: 400, message: 'Fetch failed !', data: 0 }
    }
}

const getPostsById = async (postId: number) => {
    try {
        const res = await fetch(
            `${baseUrl}/api/posts/${postId}`, 
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        )
        return await res.json()
    } catch(err) {
        console.log(err)
        const data = { author: 0, id: 0, title: '', body: ''}
        return { status: 400, message: 'Fetch failed !', data: data }
    }
}

const deletePost = async (postId: number) => {
    try {
        const res = await fetch(
            `${baseUrl}/api/posts/delete?postId=${postId}`, 
            {
                method: 'DELETE'
            }
        )
        revalidateTag('getDatesByPage')
        revalidateTag('getNumPosts')
        return await res.json()
    } catch(err) {
        console.log(err)
        return { status: 400, message: 'Fetch failed !', data: '' }
    }
}

export { getPostsByPage, getNumPosts, getPostsById, deletePost }

