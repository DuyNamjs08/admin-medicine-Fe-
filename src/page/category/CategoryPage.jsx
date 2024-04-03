import Button from "../../components/button/Button";
import SearchCmp from "../../components/search/SearchCmp";
import { Table } from "../../components/table/Table";
import { TableHeader } from "../../components/table/TableHeader";
import CategoryTable from "./CategoryTable";
import { Link } from "react-router-dom";
import { useCategory, useCategoryDelete } from "../../useQuery/useCategory";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const { data, isLoading, refetch } = useCategory();
  const { mutate, status } = useCategoryDelete();
  const [isLoadingMethod, setIsLoadingMethod] = useState(false);
  useEffect(() => {
    if (status === "pending") {
      setIsLoadingMethod(true);
    } else {
      setIsLoadingMethod(false);
    }
  }, [status]);
  return (
    <>
      <div className="text-xl font-semibold">Danh sách thư mục sản phẩm</div>
      <div className="flex justify-between items-center pr-8 mb-4">
        <SearchCmp text="Tìm kiếm" component={true} />
        <Link to={"/danh-muc/tao-thu-muc"}>
          <Button text={"Thêm danh mục"} className={"mt-4"} />
        </Link>
      </div>
      <Table
        tableHeader={
          <TableHeader
            headers={[
              {
                label: "Số thứ tự",
              },
              {
                label: "id",
              },
              {
                label: "Tên danh mục",
              },
              {
                label: "Ngày tạo",
              },
              {
                label: "Image",
              },
              {
                label: "",
              },
            ]}
          />
        }
        tableBody={
          <CategoryTable data={data} mutate={mutate} refetch={refetch} />
        }
        isEmpty={data?.length === 0}
      />
      <CommonLoadingModal isLoadingModalOpen={isLoading || isLoadingMethod} />
    </>
  );
};

export default CategoryPage;
