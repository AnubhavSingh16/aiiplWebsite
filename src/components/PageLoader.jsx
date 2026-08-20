import React from "react";
import Spinner from "./Spinner";

export default function PageLoader({ label = "Loading...", className = "" }) {
  return (
    <div
      className={`flex items-center justify-center gap-2 py-16 text-sm font-medium text-slate-500 ${className}`}
    >
      <Spinner className="h-5 w-5" />
      {label}
    </div>
  );
}
