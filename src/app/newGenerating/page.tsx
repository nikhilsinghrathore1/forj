'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the component without SSR
const FullBackend = dynamic(() => import('./Component/FullBackend'), {
  ssr: false,
});

const Page = () => {
  return <FullBackend />;
};

export default Page;
