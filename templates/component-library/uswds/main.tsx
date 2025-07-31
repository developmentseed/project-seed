// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '@trussworks/react-uswds/lib/uswds.css';
import '@trussworks/react-uswds/lib/index.css';
import App from './app';

// Root component.
function Root() {
  useEffect(() => {
    // Hide the welcome banner.
    const banner = document.querySelector('#welcome-banner')!;
    banner.classList.add('dismissed');
    setTimeout(() => banner.remove(), 500);
  }, []);

  return <App />;
}

const rootNode = document.querySelector('#app-container')!;
const root = createRoot(rootNode);
root.render(<Root />);
