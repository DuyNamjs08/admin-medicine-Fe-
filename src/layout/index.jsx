import Header from "./Header";
import Sidebar from "./Sidebar";

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <div>
      <Sidebar />
      <Header />
      <div className="mt-[80px] ml-[200px] p-4">{children}</div>
    </div>
  );
}

export default Layout;
