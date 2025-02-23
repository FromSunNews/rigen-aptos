import { useMobile } from "@/hooks/shared/use-mobile";
import Image from "next/image";
import Link from "next/link";

export function Logo() {
  const isMobile = useMobile();

  return (
    <Link href="/" className="frow relative items-center justify-start gap-4">
      {isMobile ? (
        <>
          <Image src="/logo/rigen-shortcut.png" alt="rigen logo" width={35} height={35} />
          <span className="text-2xl font-semibold tracking-[0.2em]">RIGEN</span>
        </>
      ) : (
        <>
          <Image src="/logo/rigen.png" alt="rigen logo" width={35} height={35} className="object-contain" />
          <span className="text-2xl font-semibold tracking-[0.2em]">RIGEN</span>
        </>
      )}
    </Link>
  );
}
