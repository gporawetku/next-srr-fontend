const months: any = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthTh: any = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

const addZero = (i: number) => {
  let index: string = "";
  if (i < 10) {
    index = "0" + i;
  } else {
    index = "" + i;
  }
  return index;
};

const ConvertDay = (date: string) => {
  let newdate: any = new Date();
  if (date && date !== "NaN-NaN-NaN") {
    newdate = new Date(date);
    return newdate.getFullYear() + "-" + addZero(newdate.getMonth() + 1) + "-" + addZero(newdate.getDate());
  }
  return "-";
};

const ConvertDays = (date: string, type: string = "dd/mm/yy", onlyDate?: boolean) => {
  if (!date || date === "NaN-NaN-NaN" || date === "-") {
    if (onlyDate) {
      return null;
    } else {
      return "-";
    }
  }

  const newdate = new Date(date);

  switch (type) {
    case "dd/mm/yy":
      return `${addZero(newdate.getDate())}/${addZero(newdate.getMonth() + 1)}/${newdate.getFullYear()}`;
    case "dd-mm-yy":
      return `${addZero(newdate.getDate())}-${addZero(newdate.getMonth() + 1)}-${newdate.getFullYear()}`;
    case "dd/mm/yy hh:mm:ss":
      return `${addZero(newdate.getDate())}/${addZero(newdate.getMonth() + 1)}/${newdate.getFullYear()} ${addZero(newdate.getHours())}:${addZero(newdate.getMinutes())}:${addZero(
        newdate.getSeconds()
      )}`;
    case "dd/mm/yy hh:mm":
      return `${addZero(newdate.getDate())}/${addZero(newdate.getMonth() + 1)}/${newdate.getFullYear()} ${addZero(newdate.getHours())}:${addZero(newdate.getMinutes())}`;
    case "dd-mm-yy hh:mm:ss":
      return `${addZero(newdate.getDate())}/${addZero(newdate.getMonth() + 1)}/${newdate.getFullYear()} ${addZero(newdate.getHours())}:${addZero(newdate.getMinutes())}:${addZero(
        newdate.getSeconds()
      )}`;
    case "dd-mm-yy hh:mm":
      return `${addZero(newdate.getDate())}/${addZero(newdate.getMonth() + 1)}/${newdate.getFullYear()} ${addZero(newdate.getHours())}:${addZero(newdate.getMinutes())}`;
    case "yy/mm/dd":
      return `${newdate.getFullYear()}/${addZero(newdate.getMonth() + 1)}/${addZero(newdate.getDate())}`;
    case "yy-mm-dd":
      return `${newdate.getFullYear()}-${addZero(newdate.getMonth() + 1)}-${addZero(newdate.getDate())}`;
    case "yy-mm-dd hh:mm:ss":
      return `${newdate.getFullYear()}-${addZero(newdate.getMonth() + 1)}-${addZero(newdate.getDate())} ${addZero(newdate.getHours())}:${addZero(newdate.getMinutes())}:${addZero(
        newdate.getSeconds()
      )}`;
    case "yy/mm/dd hh:mm:ss":
      return `${addZero(newdate.getDate())}/${addZero(newdate.getMonth() + 1)}/${newdate.getFullYear()} ${addZero(newdate.getHours())}:${addZero(newdate.getMinutes())}:${addZero(
        newdate.getSeconds()
      )}`;
    case "yy/mm/dd hh:mm":
      return `${addZero(newdate.getDate())}/${addZero(newdate.getMonth() + 1)}/${newdate.getFullYear()} ${addZero(newdate.getHours())}:${addZero(newdate.getMinutes())}`;
    case "hh:mm":
      return `${addZero(newdate.getHours())}:${addZero(newdate.getMinutes())}`;
    case "hh:mm:ss":
      return `${addZero(newdate.getHours())}:${addZero(newdate.getMinutes())}:${addZero(newdate.getSeconds())}`;
    default:
      return "-";
  }
};

const ConvertDays2 = (date: any, type: string) => {
  if (!date || date === "NaN-NaN-NaN" || date === "-") {
    return "-";
  }
  const newdate = new Date(date);

  const formatDatePart = (value: any) => addZero(value);

  const formatDate = (format: any) => {
    const formatTokens: any = {
      dd: formatDatePart(newdate.getDate()),
      mm: formatDatePart(newdate.getMonth() + 1),
      yy: String(newdate.getFullYear()),
      h: formatDatePart(newdate.getHours()),
      m: formatDatePart(newdate.getMinutes()),
      s: formatDatePart(newdate.getSeconds()),
    };

    return format.replace(/dd|mm|yy|h|m|s/g, (match: any) => formatTokens[match] || match);
  };

  switch (type) {
    case "dd-mm-yy":
    case "yy/mm/dd":
    case "yy-mm-dd":
    case "h:m":
    case "h:m:s":
    case "dd/mm/yy h:m:s":
    case "dd/mm/yy h:m":
    case "yy/mm/dd h:m:s":
    case "yy/mm/dd h:m":
    case "dd-mm-yy h:m:s":
    case "dd-mm-yy h:m":
      return formatDate(type);
    default:
      return "-";
  }
};

const IsNotDate = (date: any) => {
  if (!date || date === "NaN-NaN-NaN") {
    return null;
  } else {
    return new Date(date);
  }
};

const getMonthEng = (date: any) => {
  let newdate: any = new Date();
  if (date && date !== "NaN-NaN-NaN") {
    newdate = new Date(date);
    return months[newdate.getMonth()];
  }
  return null;
};

const getDateSingle = (date: any) => {
  let newdate: any = new Date();
  if (date && date !== "NaN-NaN-NaN") {
    newdate = new Date(date);
    return addZero(newdate.getDate());
  }
  return null;
};

const ConvertEra = (date: any, from: "be" | "ce" | string, to: "be" | "ce" | string) => {
  let newDate = new Date(date);

  if (from === "be" && to === "ce") {
    newDate.setFullYear(newDate.getFullYear() - 543);
  } else if (from === "ce" && to === "be") {
    newDate.setFullYear(newDate.getFullYear() + 543);
  }

  return {
    originalDate: date,
    convertedDate: newDate,
  };
};

const ConvertNewDate = (str: any) => {
  if (typeof str === "string" && str.includes("/")) {
    const [year, month, date] = str.split("/").map(Number);
    const newDate = new Date(year, month - 1, date);

    return newDate;
  } else {
    return null;
  }
};

const ConvertThaiDate = (date: any) => {
  let newdate = new Date(date);

  if (!date || date === "NaN-NaN-NaN") {
    return null;
  }

  return `${newdate.getDate()} ${monthTh[newdate.getMonth()]} ${newdate.getFullYear() + 543}`;
};

export { ConvertDay, ConvertDays, ConvertDays2, IsNotDate, getMonthEng, getDateSingle, ConvertEra, ConvertNewDate, ConvertThaiDate };
