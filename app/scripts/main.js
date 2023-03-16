import React, { useEffect } from 'react';
import { createRoot } from 'react-dom';

// Root component.
function Root() {
  useEffect(() => {
    // Hide the welcome banner.
    const banner = document.querySelector('#welcome-banner');
    banner.classList.add('dismissed');
    setTimeout(() => banner.remove(), 500);
  }, []);

  return <p>Hello from Starter</p>;
}

const rootNode = document.querySelector('#app-container');
const root = createRoot(rootNode);
root.render(<Root />);
