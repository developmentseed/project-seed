import { ChakraProvider } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import system from './styles/theme';

// If using a router add the public url to the base path.
const publicUrl = import.meta.env.VITE_BASE_URL || '';
// The ds.io prefix is used just to get the base path when no public url is set.
const baseName = new URL(
  publicUrl.startsWith('http')
    ? publicUrl
    : `https://ds.io/${publicUrl.replace(/^\//, '')}`
  ).pathname;

// Root component.
function Root() {
  useEffect(() => {
    // Hide the welcome banner.
    const banner = document.querySelector('#welcome-banner')!;
    banner.classList.add('dismissed');
    setTimeout(() => banner.remove(), 500);
  }, []);

  return (
    <ChakraProvider value={system}>
      <p>Hello World</p>
    </ChakraProvider>
  );
}

const rootNode = document.querySelector('#app-container')!;
const root = createRoot(rootNode);
root.render(<Root />);
