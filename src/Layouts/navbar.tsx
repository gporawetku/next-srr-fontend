"use client";

import Image from "next/image";
import { Avatar } from "primereact/avatar";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { Menu } from "primereact/menu";

const Navbar = () => {
  const start = <Image width={138} height={44} alt="logo" src="/images/header-logo.svg" className="mr-2" />;

  const end = (
    <div className="flex align-items-center gap-2">
      <Avatar size="normal" image="/images/user.png" shape="circle" />
    </div>
  );

  return (
    <div className="card">
      <Menubar start={start} end={end} />
    </div>
  );
};

export { Navbar };
