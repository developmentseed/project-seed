import React, { useEffect } from 'react';
import { render } from 'react-dom';

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

// project-seed does not use the latest React API introduced in version 18
// as commonly used modules might be incompatible with it (e.g. react-helmet v6.1.0).
render(<Root />, document.querySelector('#app-container'));
