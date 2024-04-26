import rolesConsts from "@/data/rolesConsts";

const RoleFilterMenu = (roles: any, menuItems: any) => {
  try {
    if (roles?.some((role: any) => role?.role_id === 1)) {
      return menuItems;
    }
    const roleMenus: any[] = rolesConsts?.roleMenus || [];
    const allowedMenu: any = roleMenus?.filter((menu: any) => roles?.some((role: any) => role?.role_id === menu?.id));

    const combinedMenu: any = allowedMenu?.reduce((acc: any, curr: any) => {
      acc.mains = acc?.mains || [];
      acc.items = acc?.items || [];

      curr?.menu?.mains?.forEach((main: any) => {
        if (!acc?.mains?.includes(main)) {
          acc.mains.push(main);
        }
      });

      curr?.menu?.items?.forEach((item: any) => {
        if (!acc?.items?.includes(item)) {
          acc.items.push(item);
        }
      });

      return acc;
    }, {});

    const filteredMenuItems: any = menuItems?.filter((menu: any) => combinedMenu?.mains?.includes(menu?.label));

    const finalFilteredMenuItems: any = filteredMenuItems?.map((menu: any) => ({
      ...menu,
      items: menu?.items?.filter((item: any) => combinedMenu?.items?.includes(item?.label)),
    }));

    return finalFilteredMenuItems || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { RoleFilterMenu };
