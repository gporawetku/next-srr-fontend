"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAvatar } from "@/hooks/queries/useUser";
import { ConvertImages } from "@/libs/utils/ConvertImage";
import { IsLoadingCircle } from "@/components/IsLoadingSkeleton";
import { MenuItem } from "primereact/menuitem";
import { usePathname, useRouter } from "next/navigation";
import { ActiveMenu } from "@/libs/utils/ActiveMenu";

const Navbar = () => {
  // --- session
  const { data }: any = useSession();

  // --- router
  const router = useRouter();
  const pathName = usePathname();

  // --- state
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // --- query data
  const avatar = useAvatar(data?.user?.id);

  // --- start
  const start = <Image width={138} height={44} alt="logo" src="/images/header-logo.svg" className="mr-2" />;

  // --- end
  const end = (
    <div className="flex items-center gap-2">
      <IsLoadingCircle isLoading={avatar?.isLoading}>
        <>
          <Avatar size="normal" image={ConvertImages(avatar?.data?.images, 0, "/images/user.png")} shape="circle" onClick={() => setVisible(!visible)} />
          {visible && (
            <div style={{ position: "absolute", right: 10, top: 50 }}>
              <div className="border p-5 rounded-md bg-white" style={{ minWidth: "250px" }}>
                <ul>
                  <li>
                    <strong>ชื่อผู้ใช้: </strong>
                    <span>{avatar?.data?.username || ""}</span>
                  </li>
                  <li>
                    <strong>Email: </strong>
                    <span>{avatar?.data?.email || ""}</span>
                  </li>
                  <li className="text-center">
                    <Button
                      size="small"
                      severity="danger"
                      onClick={() => {
                        signOut({ callbackUrl: "/signin" });
                      }}
                    >
                      Sign Out
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </>
      </IsLoadingCircle>
    </div>
  );

  // --- items
  const items: MenuItem[] = [
    {
      label: "หน้าหนัก",
      className: "font-medium",
      items: [
        {
          label: "แดชบอร์ด",
          icon: "fa-regular fa-gauge-simple font-bold",
          className: `font-bold ${ActiveMenu(pathName, "dashboard")}`,
          command: () => {
            router.push("/");
          },
        },
      ],
    },
    {
      label: "เมนูจัดการหน้าเว็บไซต์",
      className: "font-medium",
      items: [
        {
          label: "แบนเนอร์",
          icon: "fa-regular fa-images",
          className: `font-bold ${ActiveMenu(pathName, "/banners")}`,
          command: () => {
            router.push("/banners");
          },
        },
        {
          label: "แบรนด์สิรารมย์",
          icon: "fa-regular fa-house-blank",
          className: `font-bold ${ActiveMenu(pathName, "/brands")}`,
          command: () => {
            router.push("/brands");
          },
        },
        {
          label: "โครงการและแบบบ้าน",
          icon: "fa-sharp fa-regular fa-house-building",
          className: `font-bold ${ActiveMenu(pathName, "/projects")}`,
          command: () => {
            router.push("/projects");
          },
        },
        {
          label: "จัดการอัตราดอกเบี้ย",
          icon: "fa-regular fa-coins",
          className: `font-bold ${ActiveMenu(pathName, "/interests")}`,
          command: () => {
            router.push("/interests");
          },
        },
        {
          label: "โปรโมชัน",
          icon: "fa-regular fa-bullhorn",
          className: `font-bold ${ActiveMenu(pathName, "/promotions")}`,
          command: () => {
            router.push("/promotions");
          },
        },
        {
          label: "กิจกรรมและข่าวสาร",
          icon: "fa-regular fa-newspaper",
          className: `font-bold ${ActiveMenu(pathName, "/activities")}`,
          command: () => {
            router.push("/activities");
          },
        },
        {
          label: "ร่วมงานกับเรา",
          icon: "fa-sharp fa-regular fa-user-tie",
          className: `font-bold ${ActiveMenu(pathName, "/jobs")}`,
          command: () => {
            router.push("/jobs");
          },
        },
        {
          label: "ข้อมูลเว็บไซต์",
          icon: "fa-sharp fa-regular fa-browser",
          className: `font-bold ${ActiveMenu(pathName, "/setting-general")}`,
          command: () => {
            router.push("/setting-general");
          },
        },
      ],
    },
    {
      label: "เมนูจัดการสิทธิ์",
      className: "font-medium",
      items: [
        {
          label: "จัดการ SEO",
          icon: "fa-regular fa-globe",
          className: `font-bold ${ActiveMenu(pathName, "/seo")}`,
          command: () => {
            router.push("/seo");
          },
        },
        {
          label: "จัดการสิทธิ์ผู้ใช้งาน",
          icon: "fa-regular fa-user-gear",
          className: `font-bold ${ActiveMenu(pathName, "/roles")}`,
          command: () => {
            router.push("/roles");
          },
        },
        {
          label: "ประวัติการเข้าใช้งาน",
          icon: "fa-regular fa-file-shield",
          className: `font-bold ${ActiveMenu(pathName, "/logs")}`,
          command: () => {
            router.push("/logs");
          },
        },
      ],
    },
  ];

  // --- resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{isMobile ? <Menubar model={items} start={start} end={end} /> : <Menubar start={start} end={end} />}</>;
};

export { Navbar };
