import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { ChartCmp } from "../../components/chart/Chart";

const MapPage = () => {
  return (
    <>
      <div className="text-[28px] font-bold my-5">Trang chủ </div>
      <div className="flex items-center gap-8">
        <div className="w-1/3 shadow-md flex items-center p-12 justify-between rounded-md">
          <div>
            <p className="mb-4 text-[24px] font-semibold text-[#12372A]">
              Tổng số người dùng
            </p>
            <div className="flex items-center gap-4">
              <EmojiEmotionsIcon className="text-[#007F73]" />
              <span className="text-[#007F73]">+2.6%</span>
            </div>
          </div>
          <div className="text-[24px] font-semibold ">18,765</div>
        </div>
        <div className="w-1/3 shadow-md flex items-center p-12 justify-between rounded-md">
          <div>
            <p className="mb-4 text-[24px] font-semibold text-[#211C6A]">
              Tổng số đơn hàng
            </p>
            <div className="flex items-center gap-4">
              <KeyboardDoubleArrowUpIcon className="text-[#124076]" />
              <span className="text-[#124076]">+2.6%</span>
            </div>
          </div>
          <div className="text-[24px] font-semibold ">3765</div>
        </div>
        <div className="w-1/3 shadow-md flex items-center p-12 justify-between rounded-md">
          <div>
            <p className="mb-4 text-[24px] font-semibold text-[#E8751A]">
              Tổng số giao dịch
            </p>
            <div className="flex items-center gap-4">
              <KeyboardDoubleArrowDownIcon className="text-[#FFC374]" />
              <span className="text-[#FFC374]">+2.6%</span>
            </div>
          </div>
          <div className="text-[24px] font-semibold ">765</div>
        </div>
      </div>
      {/* biểu đồ */}
      <div className="my-4">
        <ChartCmp />
      </div>
    </>
  );
};

export default MapPage;
