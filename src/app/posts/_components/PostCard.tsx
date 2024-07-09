"use client";

import { useRouter } from "next/navigation";
import { deletePost } from "@/actions/http";

import { Card, Popconfirm, message } from "antd";
import {
  DeleteOutlined,
  EllipsisOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

interface Props {
  id: number;
  author: string;
  title: string;
  body: string;
}

function PostCard(props: Props) {
  const router = useRouter();

  const handleDeletePost = async (postId: number) => {
    const res = await deletePost(postId);
    if (res.status === 200) message.success(res.message);
    else message.error(res.message);
  };

  return (
    <Card
      actions={[
        <EllipsisOutlined
          style={{ color: "#46f", fontSize: "1rem" }}
          onClick={() => router.push(`/posts/${props.id}`)}
        />,
        <Popconfirm
          title=""
          description="Delete this post ?"
          icon={
            <QuestionCircleOutlined
              style={{ color: "red", marginTop: "8px" }}
            />
          }
          onConfirm={() => handleDeletePost(props.id)}
        >
          <DeleteOutlined style={{ color: "#f55", fontSize: "0.9rem" }} />
        </Popconfirm>,
      ]}
    >
      <Card.Meta
        avatar={props.id}
        title={`Title: ${props.title}`}
        description={
          <>
            <p>Author: {props.author}</p>
            <p className="line-clamp-2">Content: {props.body}</p>
          </>
        }
      />
    </Card>
  );
}

export default PostCard;
