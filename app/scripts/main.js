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

render(<Root />, document.querySelector('#app-container'));
