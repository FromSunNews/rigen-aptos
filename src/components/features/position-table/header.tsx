import HeaderFeatureTable from "@/components/shared/custom/header-feature-table";
import { Slots } from "@/components/shared/custom/header-feature-table/type";
import { Typography } from "@/components/shared/ui/typography";

interface HeaderProps {
  isLoading: boolean;
  count: number;
}

export default function Header({ isLoading, count }: HeaderProps) {
  const content = {
    start: {
      components: {
        title: {
          text: "My Positions",
        },
        count: {
          value: count,
        },
      },
    },
    end: {
      components: {
        title: {
          text: "Daily Earning",
        },
      },
      custom: <Typography className="text-primary">~$10.00</Typography>,
    },
  };

  const customSlots: Slots = {
    desktop: [content],
    mobile: [content],
  };

  return <HeaderFeatureTable slots={customSlots} isLoading={isLoading} className="px-4 md:px-0" />;
}
