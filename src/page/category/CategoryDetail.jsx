import { useEffect, useState } from "react";
import { useCategoryId, useCategoryUpdate } from "../../useQuery/useCategory";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "./schema";
import FormInput from "../../components/form/FormInput";
import FormTextarea from "../../components/form/FormTextarea";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import CardHoriCmp from "../../components/cardHori/CardHoriCmp";
import img from "../../assets/phamacy/1.webp";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

const CategoryDetail = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(categorySchema),
    mode: "onSubmit",
  });
  const [file, setFile] = useState("");
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoadingMethod, setIsLoadingMethod] = useState(false);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const { data, refetch } = useCategoryId(location.pathname.split("/")[2]);
  useEffect(() => {
    if (data) {
      setValue("name", data?.name || "");
      setValue("description", data?.description || "");
    }
  }, [data]);
  const { mutate, status } = useCategoryUpdate();
  useEffect(() => {
    if (status === "pending") {
      setIsLoadingMethod(true);
    } else {
      setIsLoadingMethod(false);
    }
  }, [status]);
  return (
    <>
      <div className="text-[20px] font-bold ml-5">
        Màn hình danh mục chi tiết{" "}
      </div>
      <div className="block md:flex md:gap-4">
        <div>
          {isEdit ? (
            <>
              <form className="max-w-sm p-6">
                <FormInput
                  id={"name"}
                  label={"Tên thư mục"}
                  placeholder={"Nhập tên thư mục"}
                  register={register("name")}
                  error={errors?.name}
                />
                {!watch("image") ? (
                  <input
                    onChange={(e) => {
                      setFile(e.target.files);
                    }}
                    id="image"
                    type="file"
                    name="image"
                  />
                ) : (
                  <strong>{watch("image")[0].name}</strong>
                )}
                {!file && (
                  <p className={`text-red-300 ml-3`}>{"Vui lòng chọn ảnh"}</p>
                )}

                <FormTextarea
                  id={"description"}
                  label={"Mô tả"}
                  rows={6}
                  placeholder={"Nhập mô tả"}
                  register={register("description")}
                  error={errors?.description}
                />
              </form>
            </>
          ) : (
            <form className="ml-5 mt-8">
              <div className="flex items-center gap-4">
                <div className="text-[16px] font-medium">Mã thư mục:</div>
                <div>{data?._id}</div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="text-[16px] font-medium">Tên thư mục:</div>
                <div>{data?.name}</div>
              </div>
              <div className="mt-4">
                <div className="text-[16px] mb-4 font-medium ">
                  Ảnh thư mục:
                </div>
                <img
                  className="w-[400px] h-[360px] rounded-md shadow-md object-cover"
                  src={data?.image}
                  alt=""
                />
              </div>
            </form>
          )}
          <button
            onClick={() => navigate("/danh-muc")}
            type="submit"
            className="text-white bg-yellow-500 hover:bg-yellow-600   font-medium rounded-lg text-sm px-5 py-2.5 text-center  ml-5 mt-6"
          >
            Quay lại
          </button>
          {isEdit ? (
            <button
              onClick={handleSubmit(async (dataForm) => {
                if (file && isEdit) {
                  const formData = new FormData();
                  formData.append("image", file[0]);
                  formData.append("name", dataForm.name);
                  formData.append("description", dataForm.description);
                  formData.append("_id", data._id);
                  formData.append("imageName", data.imageName);
                  mutate(formData, {
                    onSuccess: () => {
                      setIsEdit(false);
                      refetch();
                    },
                  });
                  reset();
                }
              })}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center  ml-5 mt-6"
            >
              Lưu thông tin
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center  ml-5 mt-6"
            >
              Chỉnh sửa
            </button>
          )}
        </div>
        <div className="font-semibold">
          Sản phẩm liên quan
          <div>
            {Array.from({ length: 3 })
              .fill("1")
              .map((item) => {
                return (
                  <div key={item}>
                    <CardHoriCmp
                      text={
                        "Đây là một phương thức của mongoose (thư viện JavaScript cho MongoDB)"
                      }
                      img={img}
                      title={
                        "Đây là một phương thức của mongoose (thư viện JavaScript cho MongoDB)"
                      }
                    />
                  </div>
                );
              })}
          </div>
          <div className="flex justify-center">
            <Typography>Page: {page}</Typography>
            <Pagination
              count={10}
              page={page}
              onChange={handleChange}
              variant="outlined"
              shape="rounded"
            />
          </div>
        </div>
      </div>
      <CommonLoadingModal isLoadingModalOpen={isLoadingMethod} />
    </>
  );
};

export default CategoryDetail;
