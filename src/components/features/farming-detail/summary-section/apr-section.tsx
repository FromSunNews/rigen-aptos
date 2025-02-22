import { Typography } from "@/components/shared/ui/typography";

import { HiOutlineArrowSmDown } from "react-icons/hi";

export const APRSection = ({ label, value, newValue }: { label: string; value: string; newValue: string }) => (
  <div className="fcol-center f1 gap-1">
    <Typography variant="small" color="submerged" weight="medium">
      {label}
    </Typography>
    <div className="inline-flex items-center justify-start gap-0.5 xs:flex-col xs:items-start">
      <Typography variant="small" color="embossed" weight="medium">
        {value}
      </Typography>

      <div className="fcenter w-full">
        <HiOutlineArrowSmDown size={16} />
      </div>
      <Typography variant="small" color="primary" weight="medium" className="underline decoration-dotted">
        {newValue}
      </Typography>
    </div>
  </div>
);
