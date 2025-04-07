"use client";

import dynamic from "next/dynamic";

// Dynamically import FullLanding with SSR disabled
const FullLanding = dynamic(() => import("../app/Landing/Components/FullLanding"), {
  ssr: false,
});

export default function Home() {
  return <FullLanding />;
}
