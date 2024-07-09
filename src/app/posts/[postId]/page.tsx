import type { IResponse, Post } from "@/types/backend";
import { getPostsById } from "@/actions/http";

const Post = async ({ params }: { params: { postId: number } }) => {
  const postId = params.postId;
  const res: IResponse<Post> = await getPostsById(postId);

  if (+res.status !== 200) return <p>Error !</p>;

  return (
    <div className="mx-36 mt-10">
      <h3 className="text-yellow-400">Post {res.data.id}</h3>
      <h2 className="mt-2">Title: {res.data.title}</h2>
      <p className="mt-2 text-gray-500">Author: {res.data.author}</p>
      <p className="mt-5 whitespace-break-spaces">
        Content: <br />
        {res.data.body}
      </p>
    </div>
  );
};

export default Post;
