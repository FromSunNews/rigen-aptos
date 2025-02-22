import { Typography } from "@/components/shared/ui/typography";

export const SimpleBorrow = () => {
  return (
    <div className="fcol gap-2">
      <Typography variant="h4" color="primary">
        Borrow
      </Typography>
      <div className="fcenter w-full gap-4 rounded-3xl border p-5">
        <Typography variant="small" color="embossed">
          Add collateral to borrow
        </Typography>
      </div>
    </div>
  );
};
