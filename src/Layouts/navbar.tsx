"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { useState } from "react";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const start = <Image width={138} height={44} alt="logo" src="/images/header-logo.svg" className="mr-2" />;

  const end = (
    <div className="flex items-center gap-2">
      <Avatar size="normal" image="/images/user.png" shape="circle" onClick={() => setVisible(!visible)} />
      {visible && (
        <div style={{ position: "absolute", right: 10, top: 50 }}>
          <div style={{ border: "1px solid", padding: "10px", minWidth: "150px", borderRadius: "8px", background: "white" }}>
            <button
              style={{ background: "#EF4036", borderRadius: "8px", color: "white", padding: "5px" }}
              onClick={() => {
                signOut({ callbackUrl: "/signin" });
              }}
            >
              sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="card">
      <Menubar start={start} end={end} />
    </div>
  );
};

export { Navbar };
