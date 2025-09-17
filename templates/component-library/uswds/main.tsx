// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '@trussworks/react-uswds/lib/uswds.css';
import '@trussworks/react-uswds/lib/index.css';
import App from './app';

// Root component.
function Root() {
  useEffect(() => {
    dispatchEvent(new Event('app-ready'));
  }, []);

  return <App />;
}

const rootNode = document.querySelector('#app-container')!;
const root = createRoot(rootNode);
root.render(<Root />);
