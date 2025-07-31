import React from 'react';

import { Header, Grid, GridContainer, Title } from '@trussworks/react-uswds';

function App() {
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

export default App;
