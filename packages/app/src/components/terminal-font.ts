import {
  type Config,
  TERMINAL_DEFAULT_FONT_FAMILY,
  TERMINAL_DEFAULT_FONT_SIZE,
  TERMINAL_FONT_SIZE_MAX,
  TERMINAL_FONT_SIZE_MIN,
} from '@inkeep/open-knowledge-core/config/schema';

export interface TerminalFont {
  fontFamily: string;
  fontSize: number;
}

export function resolveTerminalFont(config: Config | null | undefined): TerminalFont {
  const family = config?.terminal?.fontFamily?.trim() ?? '';
  const size = config?.terminal?.fontSize;
  return {
    fontFamily:
      family === '' ? TERMINAL_DEFAULT_FONT_FAMILY : `${family}, ${TERMINAL_DEFAULT_FONT_FAMILY}`,
    fontSize:
      typeof size === 'number' &&
      Number.isInteger(size) &&
      size >= TERMINAL_FONT_SIZE_MIN &&
      size <= TERMINAL_FONT_SIZE_MAX
        ? size
        : TERMINAL_DEFAULT_FONT_SIZE,
  };
}
