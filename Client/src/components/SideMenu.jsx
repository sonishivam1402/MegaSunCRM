import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "/Logo.png";

const SideMenu = () => {
  const { menus } = useAuth();
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Define the order of sections as per image
  const sectionOrder = ['Analytics', 'Sales', 'Management'];

  // Group menus by type
  const groupedMenus = menus?.reduce((acc, menu) => {
    const type = menu.Type || 'Other';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(menu);
    return acc;
  }, {}) || {};

  // Sort menus within each group by OrderBy
  Object.keys(groupedMenus).forEach(type => {
    groupedMenus[type].sort((a, b) => (a.OrderBy || 0) - (b.OrderBy || 0));
  });

  // Create ordered sections based on sectionOrder
  const orderedSections = sectionOrder.filter(type => groupedMenus[type]);

  useEffect(() => {
    if (menus && menus.length > 0 && !selectedMenu) {
      // Find the first menu item from the ordered sections
      if (orderedSections.length > 0 && groupedMenus[orderedSections[0]]?.length > 0) {
        const firstMenuItem = groupedMenus[orderedSections[0]][0];
        setSelectedMenu(firstMenuItem.PermissionId);
      }
    }
  }, [menus, selectedMenu, orderedSections, groupedMenus]);

  return (
    <div 
      className={`bg-background-color h-screen flex flex-col transition-all duration-300 border-r border-b-color ${
        isCollapsed ? 'w-[80px]' : 'w-[280px]'
      }`}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      {/* Header with Logo */}
      <div className="p-6 flex items-center">
        <img 
          src={Logo} 
          alt="MEGASUN" 
          className={`transition-all duration-300 ${
            isCollapsed ? 'w-[40px]' : 'w-[150px]'
          }`} 
        />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4">
        {orderedSections.map((type) => (
          <div key={type} className="mb-6">
            {/* Section Header - only show when expanded */}
            {!isCollapsed && (
              <div className="px-6 mb-3">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {type}
                </h3>
              </div>
            )}

            {/* Menu Items */}
            <ul className={isCollapsed ? 'space-y-1' : 'space-y-0.5'}>
              {groupedMenus[type].map((menu, index) => {
                const isSelected = selectedMenu === menu.PermissionId;
                return (
                  <li key={menu.PermissionId || index} className="relative">
                    <a
                      href={menu.NavigationPath}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedMenu(menu.PermissionId);
                        if (menu.NavigationPath) {
                          navigate(menu.NavigationPath);
                        }
                      }}
                      className={`flex items-center transition-colors duration-150 relative ${
                        isCollapsed 
                          ? 'px-5 py-3 justify-center' 
                          : 'px-5 py-2 gap-3'
                      } ${
                        isSelected
                          ? 'bg-green-900/15 text-green-900'
                          : 'text-gray-700 hover:bg-green-900/15 hover:text-green-900'
                      }`}
                      title={isCollapsed ? menu.Name : ''}
                    >
                      {/* Left green border indicator */}
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-900"></div>
                      )}
                      
                      {menu.IconPath && (
                        <img 
                          src={menu.IconPath} 
                          alt={menu.Name}
                          className={`w-4 h-4 ${
                            isSelected ? 'opacity-100' : 'opacity-70'
                          }`} 
                        />
                      )}
                      {!isCollapsed && (
                        <span className="font-medium text-sm">{menu.Name}</span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default SideMenu;