import { defineConfig } from 'wuchale';
import { adapter } from 'wuchale/adapter-vanilla';

export default defineConfig({
    locales: ['en', 'es'],
    adapters: {
        main: adapter({
            files: 'src/**/*.{ts,tsx}',
            // Permissive heuristic to catch all natural language
            heuristic: (msg) => {
                const text = msg.msgStr.join('\n').trim();
                // Ignore hex colors and very short strings
                if (text.length < 2 || /^#[0-9A-F]{3,6}$/i.test(text)) return false;
                return 'message';
            },
            patterns: [
                {
                    name: '_',
                    args: ['message'],
                },
            ],
        }),
    },
});
