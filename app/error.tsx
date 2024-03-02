"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3">
      <h2>{error.message ? error.message : "Something went wrong!"}</h2>
      <button className="btn" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
