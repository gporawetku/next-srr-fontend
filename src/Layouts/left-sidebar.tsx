"use client";

import { ActiveMenu } from "@/libs/utils/ActiveMenu";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";

const LeftSidebar = () => {
  // --- router
  const router = useRouter();
  const pathName = usePathname();

  // --- items
  const items: MenuItem[] = [
    {
      label: "หน้าหนัก",
      className: "font-medium",
      items: [
        {
          label: "แดชบอร์ด",
          icon: "fa-regular fa-gauge-simple font-bold",
          className: `font-bold rounded-md ${ActiveMenu(pathName, "dashboard")}`,
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
          className: `font-bold rounded-md ${ActiveMenu(pathName, "/banners")}`,
          command: () => {
            router.push("/banners");
          },
        },
        {
          label: "แบรนด์สิรารมย์",
          icon: "fa-regular fa-house-blank",
          className: `font-bold rounded-md ${ActiveMenu(pathName, "/brands")}`,
          command: () => {
            router.push("/brands");
          },
        },
        {
          label: "โครงการและแบบบ้าน",
          icon: "fa-sharp fa-regular fa-house-building",
          className: `font-bold rounded-md ${ActiveMenu(pathName, "/projects")}`,
          command: () => {
            router.push("/projects");
          },
        },
        {
          label: "จัดการอัตราดอกเบี้ย",
          icon: "fa-regular fa-coins",
          className: `font-bold rounded-md ${ActiveMenu(pathName, "/interests")}`,
          command: () => {
            router.push("/interests");
          },
        },
        {
          label: "โปรโมชัน",
          icon: "fa-regular fa-bullhorn",
          className: `font-bold rounded-md ${ActiveMenu(pathName, "/promotions")}`,
          command: () => {
            router.push("/promotions");
          },
        },
        {
          label: "กิจกรรมและข่าวสาร",
          icon: "fa-regular fa-newspaper",
          className: `font-bold rounded-md ${ActiveMenu(pathName, "/activities")}`,
          command: () => {
            router.push("/activities");
          },
        },
        {
          label: "ร่วมงานกับเรา",
          icon: "fa-sharp fa-regular fa-user-tie",
          className: `font-bold rounded-md ${ActiveMenu(pathName, "/jobs")}`,
          command: () => {
            router.push("/jobs");
          },
        },
        {
          label: "ข้อมูลเว็บไซต์",
          icon: "fa-sharp fa-regular fa-browser",
          className: `font-bold rounded-md ${ActiveMenu(pathName, "/setting-general")}`,
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
          className: `font-bold rounded-md ${ActiveMenu(pathName, "/seo")}`,
          command: () => {
            router.push("/seo");
          },
        },
        {
          label: "จัดการสิทธิ์ผู้ใช้งาน",
          icon: "fa-regular fa-user-gear",
          className: `font-bold rounded-md ${ActiveMenu(pathName, "/roles")}`,
          command: () => {
            router.push("/roles");
          },
        },
        {
          label: "ประวัติการเข้าใช้งาน",
          icon: "fa-regular fa-file-shield",
          className: `font-bold rounded-md ${ActiveMenu(pathName, "/logs")}`,
          command: () => {
            router.push("/logs");
          },
        },
      ],
    },
  ];

  return <Menu model={items} className="w-full h-screen p-2" style={{ border: "none" }} />;
};

export { LeftSidebar };
