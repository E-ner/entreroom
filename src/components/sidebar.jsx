import { Link } from "react-router-dom";
import React from "react";
import { Home, Search, Bell, User, LogOut, Send } from "lucide-react";

const Sidebar = () => {
  const items = [
    { icon: <Home size={26} />, label: "Home", path: "/" },
    { icon: <Search size={26} />, label: "Search", path: "/search" },
    { icon: <Bell size={26} />, label: "Notifications", path: "/notifications" },
    { icon: <Send size={26} />, label: "Message", path: "/chat" },
    { icon: <User size={26} />, label: "Profile", path: "/profile" },
    { icon: <LogOut size={26} />, label: "Logout", path: "/logout" },
  ];

  return (
    <div>
      {/* Desktop sidebar */}
      <nav className="fixed bg-[#1f1c17] h-screen w-20 hover:w-64 transition-all duration-300 ease-in-out overflow-hidden top-0 left-0 hidden md:flex flex-col group border-r border-orange-800 z-50">
        <ul className="flex flex-col mt-10 space-y-4">
          {items.map((item, idx) => (
            <li key={idx} className="px-3">
              <Link 
                to={item.path} 
                className="flex items-center h-12 px-3 rounded-lg hover:bg-orange-600/50 transition-colors duration-200"
              >
                {/* Icon Container: Fixed width ensures icon doesn't move */}
                <div className="text-white min-w-[40px] flex justify-center items-center">
                  {item.icon}
                </div>
                
                {/* Text: Hidden by default, slides in on group-hover */}
                <span className="text-white text-md font-medium ml-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 whitespace-nowrap overflow-hidden">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile bottom bar */}
      <nav className="bg-[#e7d7c4]w-full fixed bottom-0 left-0 flex md:hidden justify-around py-3 border-t border-orange-800 z-50">
        {items.map((item, idx) => (
          <Link key={idx} to={item.path} className="flex flex-col items-center text-white opacity-80 hover:opacity-100">
            {React.cloneElement(item.icon, { size: 22 })}
            <span className="text-[10px] mt-1">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;