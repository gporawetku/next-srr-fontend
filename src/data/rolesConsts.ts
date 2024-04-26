const roles: any[] = [
  { id: 1, label: "อนุญาตทุกสิทธิ์" },
  { id: 2, label: "หน้าแรก" },
  { id: 3, label: "จัดการโครการ" },
  { id: 4, label: "โปรโมรชัน" },
  { id: 5, label: "กิจกรรม" },
  { id: 6, label: "ร่วมงานกับเรา" },
];

const rolePaths: any[] = [
  { id: 1, path: "" },
  { id: 2, path: "/" },
  { id: 3, path: "/projects" },
  { id: 4, path: "/promotions" },
  { id: 5, path: "/activities" },
  { id: 6, path: "/jobs" },
];

const roleMenus: any[] = [
  { id: 1, menu: {} },
  { id: 2, menu: { mains: ["หน้าหลัก"], items: ["แดชบอร์ด"] } },
  {
    id: 3,
    menu: { mains: ["เมนูจัดการหน้าเว็บไซต์", "หน้าหลัก"], items: ["แดชบอร์ด", "โครงการและแบบบ้าน"] },
  },
  {
    id: 4,
    menu: { mains: ["หน้าหลัก", "เมนูจัดการหน้าเว็บไซต์"], items: ["แดชบอร์ด", "โปรโมชัน"] },
  },
  {
    id: 5,
    menu: { mains: ["หน้าหลัก", "เมนูจัดการหน้าเว็บไซต์"], items: ["แดชบอร์ด", "กิจกรรมและข่าวสาร"] },
  },
  {
    id: 6,
    menu: { mains: ["หน้าหลัก", "เมนูจัดการหน้าเว็บไซต์"], items: ["แดชบอร์ด", "ร่วมงานกับเรา"] },
  },
];

const rolesConsts = {
  roles,
  rolePaths,
  roleMenus,
};

export default rolesConsts;
