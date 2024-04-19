"use client"

import Image from "next/image";
import { Avatar } from "primereact/avatar";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { Menu } from 'primereact/menu';

const Navbar = () => {
  const start = <Image width={50} height={40} alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" className="mr-2" />;

  const end = (
    <div className="flex align-items-center gap-2">
      <Avatar size="normal" image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
    </div>
  );

  return (
    <div className="card">
      <Menubar start={start} end={end} />
    </div>
  );
};

export { Navbar };
