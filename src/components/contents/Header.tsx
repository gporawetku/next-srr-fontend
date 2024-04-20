"use client";
import { ReactNode } from "react";
import Breadcrumb, { BreadcrumbItemProps } from "./Breadcrumb";
import { Button } from "primereact/button";

export interface HeaderProps {
  children?: ReactNode;
  breadcrumb?: BreadcrumbItemProps[];
  title?: string;
}

const Header = ({ children, title, breadcrumb = [] }: HeaderProps) => {
  return (
    <>
      <div className="grid grid-cols-12 gap-2 mb-5">
        <div className="col-span-12 md:col-span-6">
          {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
          <Breadcrumb item={breadcrumb} />
        </div>
        <div className="col-span-12 md:col-span-6">{children}</div>
      </div>
    </>
  );
};

export default Header;
