"use client";

import { useRouter } from "next/navigation";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";

const LeftSidebar = () => {
  // const toast = useRef<Toast>(null);
//   const router = useRouter();
  const items: MenuItem[] = [
    {
      label: "Documents",
      items: [
        {
          label: "New",
          icon: "pi pi-plus",
        },
        {
          label: "Search",
          icon: "pi pi-search",
        },
      ],
    },
    {
      label: "Profile",
      items: [
        {
          label: "Settings",
          icon: "pi pi-cog",
        },
        {
          label: "Logout",
          icon: "pi pi-sign-out",
        },
      ],
    },
  ];

  return (
    <div className="card flex justify-content-center border">
      {/* <Toast ref={toast} /> */}
      <Menu model={items} />
    </div>
  );
};

export { LeftSidebar };
