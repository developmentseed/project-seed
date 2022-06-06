import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

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

const container = document.getElementById('app-container');
const root = createRoot(container);
root.render(<Root />);
