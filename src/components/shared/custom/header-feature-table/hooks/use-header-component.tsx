import React from "react";
import { HeaderTitle, HeaderCount, HeaderSort, HeaderSearch } from "../prebuilt-component";
import { PreBuiltComponent, SlotItem } from "../type";
import HeaderTabs from "../prebuilt-component/tabs";

const isPreBuiltItem = (item: SlotItem): item is PreBuiltComponent => {
  return typeof item === "object" && item !== null;
};

export const useHeaderComponents = (isLoading?: boolean) => {
  const renderComponent = (item: SlotItem) => {
    // If item is React element, return it directly
    if (React.isValidElement(item)) return item;

    // If type key of prebuiltComponents
    if (isPreBuiltItem(item)) {
      // You can add more cases here if you want to add more prebuilt components

      // Title component to render title
      if (item?.title) return <HeaderTitle text={item.title?.text} className={item.title?.className} />;
      // Count component to render number of items or number of anything else based on the value
      else if (item?.count)
        return <HeaderCount value={item.count?.value} className={item.count?.className} isLoading={isLoading} />;
      // Sort component to render sort options
      else if (item?.sort)
        return (
          <HeaderSort
            className={item.sort?.className}
            options={item.sort?.options}
            onChange={item.sort?.onChange}
            isLoading={isLoading}
          />
        );
      // Search component to render search input
      else if (item?.search)
        return (
          <HeaderSearch
            className={item.search?.className}
            placeholder={item.search?.placeholder}
            onChange={item.search?.onChange}
            isLoading={isLoading}
          />
        );
      // Tabs component to render tabs
      else if (item?.tabs)
        return (
          <HeaderTabs
            options={item.tabs?.options}
            onChange={item.tabs?.onChange}
            isLoading={isLoading}
            variant={item.tabs?.variant}
          />
        );
      else return null;
    }

    // If item is not a string or not a key of prebuiltComponents, return null
    return null;
  };

  return { renderComponent };
};
