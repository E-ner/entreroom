import { Home, Search, ArrowBigDownDash, PersonStanding, ArrowBigLeftDash } from "lucide-react";

const Sidebar = () => {
  const items = [
    { icon: <Home />, label: "Home" },
    { icon: <Search />, label: "Search" },
    { icon: <ArrowBigDownDash />, label: "Notifications" },
    { icon: <PersonStanding />, label: "Profile" },
    { icon: <ArrowBigLeftDash />, label: "Logout" },
  ];

  return (
    <div>
      
      <nav className="bg-orange-700/90 h-screen w-24 hover:w-60 transition-all duration-300 overflow-hidden fixed top-0 left-0 hidden md:flex flex-col group">
        <ul className="flex flex-col py-20 space-y-10">
          {items.map((item, idx) => (
            <li key={idx}className="flex items-center space-x-4 px-6  cursor-pointer  ">
            
              <div className="text-white">{item.icon}</div>

              <span className="text-white opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile bottom bar */}
      <nav className="bg-orange-700/90 w-full fixed bottom-0 left-0 flex md:hidden justify-around py-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-white">
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;