"use client";

import { useRouter } from "next/navigation";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";

const LeftSidebar = () => {
  // --- router
  const router = useRouter();

  // --- items
  const items: MenuItem[] = [
    {
      label: "หน้าหนัก",
      className: "font-medium",
      items: [
        {
          label: "แดชบอร์ด",
          icon: "fa-regular fa-gauge-simple font-bold",
          className: "font-bold",
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
          className: "font-bold",
          command: () => {
            router.push("/banners");
          },
        },
        {
          label: "แบรนด์สิรารมย์",
          icon: "fa-regular fa-house-blank",
          className: "font-bold",
          command: () => {
            router.push("/brands");
          },
        },
        {
          label: "โครงการและแบบบ้าน",
          icon: "fa-sharp fa-regular fa-house-building",
          className: "font-bold",
          command: () => {
            router.push("/");
          },
        },
        {
          label: "จัดการอัตราดอกเบี้ย",
          icon: "fa-regular fa-coins",
          className: "font-bold",
          command: () => {
            router.push("/interests");
          },
        },
        {
          label: "โปรโมชัน",
          icon: "fa-regular fa-bullhorn",
          className: "font-bold",
          command: () => {
            router.push("/promotions");
          },
        },
        {
          label: "กิจกรรมและข่าวสาร",
          icon: "fa-regular fa-newspaper",
          className: "font-bold",
          command: () => {
            router.push("/activities");
          },
        },
        {
          label: "ร่วมงานกับเรา",
          icon: "fa-sharp fa-regular fa-user-tie",
          className: "font-bold",
          command: () => {
            router.push("/");
          },
        },
        {
          label: "ข้อมูลเว็บไซต์",
          icon: "fa-sharp fa-regular fa-browser",
          className: "font-bold",
          command: () => {
            router.push("/");
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
          className: "font-bold",
          command: () => {
            router.push("/");
          },
        },
        {
          label: "จัดการสิทธิ์ผู้ใช้งาน",
          icon: "fa-regular fa-user-gear",
          className: "font-bold",
          command: () => {
            router.push("/roles");
          },
        },
        {
          label: "ประวัติการเข้าใช้งาน",
          icon: "fa-regular fa-file-shield",
          className: "font-bold",
          command: () => {
            router.push("/logs");
          },
        },
      ],
    },
  ];

  return <Menu model={items} className="w-full h-screen" />;
};

export { LeftSidebar };
