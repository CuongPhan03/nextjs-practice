interface Post {
    id: number;
    author: string;
    title: string;
    body: string
}

interface IResponse<T> {
    status: number;
    message: string;
    data: T;
}

export type { Post, IResponse }