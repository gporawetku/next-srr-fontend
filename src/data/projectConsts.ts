const status: any[] = [
  { name: "โครงการพร้อมอยู่", value: "ready" },
  { name: "โครงการใหม่", value: "new" },
];

const types: any[] = [
  { name: "โครงการปัจจุบัน", value: "present" },
  { name: "โครงการในอนาคต", value: "future" },
];

const homeTypes: any[] = [
  { name: "บ้านแฝด / ทาวน์โฮม 1 ชั้น" },
  { name: "บ้านเดี่ยว 1 ชั้น" },
  { name: "บ้านเดี่ยว 2 ชั้น" },
  { name: "พลูวิลล่า" },
  { name: "อาคารพาณิชย์" },
  { name: "ทาวน์โฮม 2 ชั้น" },
  { name: "คอนโดมิเนียม" },
];

const roomTypes: any[] = [
  { name: "ห้องนอน", icon: "fa-regular fa-bed" },
  { name: "ห้องน้ำ", icon: "fa-regular fa-shower" },
  { name: "ห้องนั่งเล่น", icon: "fa-regular fa-loveseat" },
  { name: "ห้องครัว", icon: "fa-regular fa-hat-chef" },
  { name: "ห้องเก็บของ", icon: "fa-regular fa-box" },
  { name: "ห้องพักผ่อน", icon: "fa-regular fa-face-smile-relaxed" },
  { name: "ห้องรับประทานอาหาร", icon: "fa-regular fa-plate-utensils" },
  { name: "ห้องอเนกประสงค์", icon: "fa-regular fa-square-question" },
  { name: "ที่จอดรถ", icon: "fa-regular fa-car-side" },
  { name: "ลานซักล้าง", icon: "fa-regular fa-sink" },
  { name: "ห้องแต่งตัว (Walk-in Closet)", icon: "fa-regular fa-shirt" },
  { name: "สระว่ายน้ำ", icon: "fa-regular fa-water-ladder" },
  { name: "พื้นที่สวน", icon: "fa-regular fa-flower-daffodil" },
  { name: "พื้นที่เพื่อการพาณิชย์", icon: "fa-regular fa-building" },
  { name: "ระเบียง", icon: "fa-regular fa-window-frame" },
  { name: "เคาน์เตอร์ครัว", icon: "fa-regular fa-kitchen-set" },
];

const projectConsts = {
  status,
  types,
  homeTypes,
  roomTypes,
};

export default projectConsts;
