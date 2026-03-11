import { Link } from "react-router-dom";
import { Home, Search, ArrowBigDownDash, PersonStanding, ArrowBigLeftDash, Send } from "lucide-react";

const Sidebar = () => {
  const items = [
    { icon: <Home />, label: "Home", path: "/" },
    { icon: <Search />, label: "Search", path: "/search" },
    { icon: <ArrowBigDownDash />, label: "Notifications", path: "/notifications" },
    { icon: <Send />, label: "Message", path: "./pages/chat.jsx" },
    { icon: <PersonStanding />, label: "Profile", path: "/profile" },
    { icon: <ArrowBigLeftDash />, label: "Logout", path: "/logout" },
  ];

  return (
    <div>
      {/* Desktop sidebar */}
      <nav className="bg-orange-700/90 h-screen w-24 hover:w-60 transition-all duration-300 overflow-hidden fixed top-0 left-0 hidden md:flex flex-col group">
        <ul className="flex flex-col py-20 space-y-10">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center space-x-4 px-6 cursor-pointer">
              <Link to={item.path} className="flex items-center space-x-4 w-full">
                <div className="text-white">{item.icon}</div>
                <span className="text-white opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile bottom bar */}
      <nav className="bg-orange-700/90 w-full fixed bottom-0 left-0 flex md:hidden justify-around py-2">
        {items.map((item, idx) => (
          <Link key={idx} to={item.path} className="flex flex-col items-center text-white">
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;