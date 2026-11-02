import {
  TERMINAL_DEFAULT_FONT_FAMILY,
  TERMINAL_DEFAULT_FONT_SIZE,
} from '@inkeep/open-knowledge-core/config/schema';
import { describe, expect, test } from 'vitest';
import { resolveTerminalFont } from './terminal-font';

type ConfigArg = Parameters<typeof resolveTerminalFont>[0];

function withTerminal(terminal: { fontFamily?: string; fontSize?: number }): ConfigArg {
  return { terminal } as ConfigArg;
}

describe('resolveTerminalFont', () => {
  test('uses the defaults when config is missing', () => {
    expect(resolveTerminalFont(null)).toEqual({
      fontFamily: TERMINAL_DEFAULT_FONT_FAMILY,
      fontSize: TERMINAL_DEFAULT_FONT_SIZE,
    });
  });

  test('puts a configured family first and keeps the default stack as fallback', () => {
    expect(
      resolveTerminalFont(withTerminal({ fontFamily: '  "JetBrainsMono Nerd Font Mono" ' }))
        .fontFamily,
    ).toBe(`"JetBrainsMono Nerd Font Mono", ${TERMINAL_DEFAULT_FONT_FAMILY}`);
  });

  test('treats a blank family as unset', () => {
    expect(resolveTerminalFont(withTerminal({ fontFamily: '   ' })).fontFamily).toBe(
      TERMINAL_DEFAULT_FONT_FAMILY,
    );
  });

  test('uses a configured size in range', () => {
    expect(resolveTerminalFont(withTerminal({ fontSize: 16 })).fontSize).toBe(16);
  });

  test('falls back for an out-of-range or fractional size', () => {
    expect(resolveTerminalFont(withTerminal({ fontSize: 99 })).fontSize).toBe(
      TERMINAL_DEFAULT_FONT_SIZE,
    );
    expect(resolveTerminalFont(withTerminal({ fontSize: 12.5 })).fontSize).toBe(
      TERMINAL_DEFAULT_FONT_SIZE,
    );
  });
});
