import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from 'react-dom';

import GlobalStyles from './styles/global';

import { createDbWorker } from 'sql.js-httpvfs';

// Root component.
function Root() {
  const [text, setText] = useState(null);

  useEffect(() => {
    // Hide the welcome banner.
    const banner = document.querySelector('#welcome-banner');
    banner.classList.add('dismissed');
    setTimeout(() => banner.remove(), 500);

    // Create SQLite worked
    createDbWorker(
      [
        {
          from: 'inline',
          config: {
            serverMode: 'full',
            url: '/example.sqlite3',
            requestChunkSize: 4096
          }
        }
      ],
      './sqlite.worker.js',
      './sql-wasm.wasm'
    ).then((worker) => {
      // Do a query
      worker.db
        .query(`select * from mytable`)
        .then((result) => setText(JSON.stringify(result)));
    });
  }, []);

  return (
    <ThemeProvider theme={{}}>
      <GlobalStyles />
      <p>{text || 'Loading...'}</p>
    </ThemeProvider>
  );
}

render(<Root />, document.querySelector('#app-container'));
