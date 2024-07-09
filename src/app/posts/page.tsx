import type { Post, IResponse } from "@/types/backend";
import { getPostsByPage } from "@/actions/http";
import ListPosts from "./_components/ListPosts";

const LIMIT = 6;

const Posts = async ({ searchParams }: { searchParams: { page?: number } }) => {
  const page = searchParams.page ?? "1";
  const res: IResponse<Post[]> = await getPostsByPage(+page, LIMIT);

  if (+res.status !== 200) return <p>Error !</p>;

  return <ListPosts listPosts={res.data} page={+page} limit={LIMIT} />;
};

export default Posts;
