"use client";
import { ReactNode } from "react";

export interface CardProps {
  children?: ReactNode;
  header?: ReactNode;
  title?: string;
}

const Card = ({ children, header, title }: CardProps) => {
  return (
    <>
      <div className="p-5 bg-white rounded-md">
        <div className="pb-2">{title ? <h4 className="font-bold text-xl">{title}</h4> : header}</div>
        {children}
      </div>
    </>
  );
};

export default Card;
