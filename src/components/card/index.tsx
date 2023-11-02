import React, { FC, ReactNode } from "react";

export interface ICardItem {
  title?: any;
  subTitle?: string;
  icon?: ReactNode;
}

interface IProps {
  title?: string | number;
  subTitle?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  longCard?: boolean;
  items?: ICardItem[];
  fullWidth?: boolean;
  iconContainerClassName?: string;
  titleContainerClassName?: string;
}
// w-[${100/items.length}%]
export const HvCard: FC<IProps> = ({
  icon,
  subTitle,
  title,
  children,
  className,
  items,
  longCard,
  fullWidth = true,
  iconContainerClassName,
  titleContainerClassName,
}) => {
  if (longCard) {
    return (
      <div
        className={
          className ||
          `bg-white h-full border py-8 px-6 gap-8 items-center rounded-lg grid grid-cols-2 md:flex md:justify-between`
        }
      >
        {items?.map((item, i) => (
          <div
            className={`${fullWidth ? "w-full" : "md:max-w-[250px] w-full"}  ${
              items.length == i + 1 ? "" : "border-r pr-10 border-r-gray-200"
            }`}
            key={i}
          >
            <div className="flex gap-10 items-center justify-between mb-0.5">
              <h1 className="font-bold text-xl md:text-2xl">{item.title}</h1>
              <div className="bg-white rounded-lg shadow-lg  p-2">
                {item.icon}
              </div>
            </div>

            <p className="text-alt-dark">{item.subTitle}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={
        `bg-white h-full ${className} rounded-lg shadow-md ${
          children ? "w-full" : "md:max-w-[250px] w-full h-full flex items-center justify-center"
        }  
        ${children ? "sm:p-5 p-3" : "sm:py-10 sm:px-6 py-5 px-3"}`
      }
    >
      {children || (
        <div className="w-full">
          <div
            className={
              titleContainerClassName
                ? titleContainerClassName
                : "flex gap-12 w-full justify-between items-start mb-0.5 cus-xs:mb-1"
            }
          >
            <h1 className="font-bold text-2xl cus-xs:text-xl">{title}</h1>

            <div
              className={
                iconContainerClassName
                  ? iconContainerClassName
                  : "bg-white rounded-lg borde pt-1 cus-xs:shadow-md cus-xs:p-1 cus-xs:-mt-0.5"
              }
            >
              {icon}
            </div>
          </div>

          <p className="text-alt-dark text-sm cus-xs:text-[11px]">{subTitle}</p>
        </div>
      )}
    </div>
  );
};