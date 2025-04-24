import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className='grid place-items-center h-dvh'>{children}</div>;
}
