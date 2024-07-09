"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IResponse } from "@/types/backend";
import { getNumPosts } from "@/actions/http";
import { Pagination, Spin } from "antd";

interface Props {
  currPage: number;
  pageSize: number;
  setPageLoading: (value: boolean) => void;
}

const Paginate = (props: Props) => {
  const router = useRouter();
  const onChange = (page: number) => {
    props.setPageLoading(true);
    router.push(`/posts?page=${page}`);
  };

  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res: IResponse<number> = await getNumPosts();
      if (res.status === 200) setTotal(res.data);
      else setTotal(-1);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="w-max mx-auto mb-10">
      {total === -1 ? (
        <p>Error</p>
      ) : (
        <Spin spinning={loading}>
          <Pagination
            current={props.currPage}
            total={total}
            pageSize={props.pageSize}
            showSizeChanger={false}
            onChange={onChange}
          />
        </Spin>
      )}
    </div>
  );
};

export default Paginate;
