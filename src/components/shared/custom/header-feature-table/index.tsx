import { cn } from "@/libs/utils/taildwind";
import { HeaderFeatureTableProps, RowContent, PositionContent } from "./type";
import { useHeaderComponents } from "./hooks/use-header-component";

export default function HeaderFeatureTable({ slots, isLoading, className }: HeaderFeatureTableProps) {
  const { renderComponent } = useHeaderComponents(isLoading);

  const renderPosition = (position: PositionContent) => {
    return (
      <>
        {position.components &&
          Object.entries(position.components).map(([key, value]) => (
            <div key={key}>{renderComponent({ [key]: value })}</div>
          ))}
        {position.custom}
      </>
    );
  };

  const renderRowContent = (content: RowContent) => {
    if (content.full) {
      return <div className="w-full">{renderPosition(content.full)}</div>;
    }

    return (
      <div className="flex w-full items-center justify-between">
        {content.start && <div className="flex items-center gap-2">{renderPosition(content.start)}</div>}
        {content.center && <div className="flex items-center gap-2">{renderPosition(content.center)}</div>}
        {content.end && <div className="flex items-center gap-2">{renderPosition(content.end)}</div>}
      </div>
    );
  };

  // Desktop view
  const desktopView = slots?.desktop && (
    <div className="hidden w-full flex-col gap-3 md:flex">
      {slots.desktop.map((content, index) => (
        <div key={index} className="w-full">
          {renderRowContent(content)}
        </div>
      ))}
    </div>
  );

  // Mobile view
  const mobileView = slots?.mobile && (
    <div className="flex w-full flex-col gap-3 md:hidden">
      {slots.mobile.map((content, index) => (
        <div key={index} className="w-full">
          {renderRowContent(content)}
        </div>
      ))}
    </div>
  );

  return (
    <div className={cn("w-full", className)}>
      {desktopView}
      {mobileView}
    </div>
  );
}
