"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/shared/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log error to error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="fcol min-h-[calc(100vh-64px)] items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Had an error!</h2>
      <p className="text-muted-foreground">{error.message || "Had an error. Please try again."}</p>

      <div className="gap-4">
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Back to home
        </Button>

        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
