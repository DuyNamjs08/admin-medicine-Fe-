import { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
// import HTMLReactParser from "html-react-parser";
import { Table } from "../../components/table/Table";
import { TableHeader } from "../../components/table/TableHeader";
import PostTable from "./PostTable";
import {
  usePosts,
  usePostsDelete,
  usePostsPost,
} from "../../useQuery/usePosts";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import FormInput from "../../components/form/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "./postSchema";
import { useDispatch } from "react-redux";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";

const InforPage = () => {
  const dispatch = useDispatch();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(postSchema),
    mode: "onSubmit",
  });

  const [isLoadingMethod, setIsLoadingMethod] = useState(false);
  const { data, isLoading, refetch } = usePosts();
  const { mutate, status } = usePostsDelete();
  const { mutate: mutatePost, status: statusPost } = usePostsPost();
  useEffect(() => {
    if (status === "pending" || statusPost === "pending") {
      setIsLoadingMethod(true);
    } else {
      setIsLoadingMethod(false);
    }
  }, [status, statusPost]);
  return (
    <>
      <div className="text-[28px] font-bold my-5">Màn hình tạo tin tức </div>
      <FormInput
        id={"name"}
        label={"Tên tiêu đề"}
        placeholder={"Nhập tên tiêu đề"}
        register={register("name")}
        error={errors?.name}
      />
      <JoditEditor
        ref={editor}
        value={content}
        tabIndex={1}
        onChange={(newContent) => setContent(newContent)}
      />

      {/* <div>{HTMLReactParser(content)}</div> */}
      <button
        onClick={handleSubmit((data) => {
          mutatePost(
            { ...data, description: content },
            {
              onSuccess: async () => {
                refetch();
                setContent("");
                await reset();
                dispatch(showMessageSuccesss("Tạo thành công!"));
              },
              onError: () => {
                dispatch(showMessageError("Tạo thất bại!"));
              },
            }
          );
        })}
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-6"
      >
        Tạo bài viết
      </button>
      <Table
        tableHeader={
          <TableHeader
            headers={[
              {
                label: "id",
              },
              {
                label: "Tên bài viết",
              },
              {
                label: "Ngày tạo",
              },
              {
                label: "",
              },
            ]}
          />
        }
        tableBody={<PostTable data={data} mutate={mutate} refetch={refetch} />}
        isEmpty={data?.length === 0}
      />
      <CommonLoadingModal isLoadingModalOpen={isLoading || isLoadingMethod} />
    </>
  );
};

export default InforPage;
