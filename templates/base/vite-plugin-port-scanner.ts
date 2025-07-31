// @ts-expect-error No types
import portscanner from 'portscanner';
import { PluginOption } from 'vite';

export default function vitePortScanner() {
  return {
    name: 'vite-port-scanner-plugin',

    // Vite config hooks
    async config(config, { command }) {
      if (command === 'serve') {
        const startPort = config.server?.port || 9000;
        const port = await portscanner.findAPortNotInUse(
          startPort,
          startPort + 100,
          'localhost'
        );
        if (port !== startPort) {
          // eslint-disable-next-line no-console
          console.warn(
            `  Port ${startPort} is busy. Using port ${port} instead.`
          );
        }
        config.server = { ...(config.server || {}), port };
      }
    }
  } as PluginOption;
}
