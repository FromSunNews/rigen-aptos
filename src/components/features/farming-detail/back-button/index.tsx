import { Button } from "@/components/shared/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button variant="ghost" className="ms-10 text-submerged" onClick={() => router.back()}>
      <IoIosArrowBack className="size-6" />
      Back
    </Button>
  );
};
