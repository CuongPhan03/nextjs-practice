"use client";

import { useEffect, useState } from "react";
import { Post } from "@/types/backend";
import PostCard from "./PostCard";
import Paginate from "./Paginate";

import { Spin } from "antd";

interface Props {
  listPosts: Post[];
  page: number;
  limit: number;
}

const ListPosts = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (props.listPosts) setLoading(false);
  }, [props.listPosts]);

  return (
    <Spin spinning={loading}>
      <div className="grid grid-cols-3 gap-5 mt-10 mb-6 mx-24">
        {props.listPosts.map((post, key) => (
          <PostCard
            key={key}
            id={post.id}
            author={post.author}
            title={post.title}
            body={post.body}
          />
        ))}
      </div>
      <Paginate
        currPage={props.page}
        pageSize={props.limit}
        setPageLoading={setLoading}
      />
    </Spin>
  );
};

export default ListPosts;
