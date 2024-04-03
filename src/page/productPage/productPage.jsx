import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import { CommonLoadingModal } from "../../components/model/LoadingModel";
import SearchCmp from "../../components/search/SearchCmp";
import { Table } from "../../components/table/Table";
import { TableHeader } from "../../components/table/TableHeader";
import { useProduct, useProductDelete } from "../../useQuery/useProducts";
import ProductTable from "./productTable";
import { Link } from "react-router-dom";
import { useCategory } from "../../useQuery/useCategory";

const ProductPage = () => {
  const { data, isLoading, refetch } = useProduct();
  const { data: dataCategory, isLoading: isisLoadingCategory } = useCategory();
  const [isLoadingMethod, setIsLoadingMethod] = useState(false);
  const { mutate, status } = useProductDelete();
  useEffect(() => {
    if (status === "pending") {
      setIsLoadingMethod(true);
    } else {
      setIsLoadingMethod(false);
    }
  }, [status]);
  return (
    <>
      <div className="text-xl font-semibold">Danh sách sản phẩm</div>
      <div className="flex justify-between items-center pr-8">
        <SearchCmp text="Tìm kiếm" component={true} />
        <Link to={"/san-pham/tao-san-pham"}>
          <Button text={"Thêm sản phẩm"} className={"mt-4"} />
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
                label: "Mã sản phẩm",
              },
              {
                label: "Tên Sản Phẩm",
              },
              {
                label: "Giá",
              },
              {
                label: "Danh mục sản phẩm",
              },
              {
                label: "Tên Sản Phẩm",
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
        tableBody={
          <ProductTable
            dataCategory={dataCategory}
            data={data?.product}
            mutate={mutate}
            refetch={refetch}
          />
        }
        isEmpty={data?.product?.length === 0}
      />
      <CommonLoadingModal
        isLoadingModalOpen={isLoading || isLoadingMethod || isisLoadingCategory}
      />
    </>
  );
};

export default ProductPage;
