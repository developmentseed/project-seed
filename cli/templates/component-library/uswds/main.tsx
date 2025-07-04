// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-expect-error React import needed for JSX
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Header, Grid, GridContainer, Title } from '@trussworks/react-uswds';
import '@trussworks/react-uswds/lib/uswds.css';
import '@trussworks/react-uswds/lib/index.css';

// Root component.
function Root() {
  useEffect(() => {
    // Hide the welcome banner.
    const banner = document.querySelector('#welcome-banner')!;
    banner.classList.add('dismissed');
    setTimeout(() => banner.remove(), 500);
  }, []);

  return (
    <>
      <Header>
        <div className='usa-nav-container'>
          <div className='usa-navbar'>
            <div className='usa-logo'>
              <em className='usa-logo__text'>
                <a href='/' title='Home' aria-label='Home'>
                  My App
                </a>
              </em>
            </div>
          </div>
        </div>
      </Header>
      <main id='main-content'>
        <GridContainer>
          <Grid row>
            <Grid col={12}>
              <Title>Hello World</Title>
              <p className='usa-intro'>
                Welcome to your React USWDS-powered application!
              </p>
            </Grid>
          </Grid>
        </GridContainer>
      </main>
    </>
  );
}

const rootNode = document.querySelector('#app-container')!;
const root = createRoot(rootNode);
root.render(<Root />);
