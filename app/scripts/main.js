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

// React legacy API is used because react-helmet is not compatible with the
// new one introduced in React v18. See:
// https://github.com/nfl/react-helmet/issues/669#issuecomment-1134228545
render(<Root />, document.querySelector('#app-container'));
