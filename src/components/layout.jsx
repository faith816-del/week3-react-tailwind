import Navbar from "./navbar";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
      <Navbar />
      <main className="flex-1 p-6">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

