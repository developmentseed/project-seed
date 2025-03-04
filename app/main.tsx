import { ChakraProvider } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import system from './styles/theme';

// If using a router add the public url to the base path.
// const publicUrl = process.env.BASE_URL || '';

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
