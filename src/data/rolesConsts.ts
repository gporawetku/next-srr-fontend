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

const rolesConsts = {
  roles,
  rolePaths,
};

export default rolesConsts;
