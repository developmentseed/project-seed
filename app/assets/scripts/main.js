import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from 'react-dom';

import GlobalStyles from './styles/global';

// Root component.
function Root() {
  useEffect(() => {
    // Hide the welcome banner.
    const banner = document.querySelector('#welcome-banner');
    banner.classList.add('dismissed');
    setTimeout(() => banner.remove(), 500);
  }, []);

  return (
    <ThemeProvider theme={{}}>
      <GlobalStyles />
      <p>Hello from Starter</p>
    </ThemeProvider>
  );
}

render(<Root />, document.querySelector('#app-container'));
