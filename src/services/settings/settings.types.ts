export enum SettingOptionName {
  MODE = 'mode',
  COLOR_SCHEME = 'color-scheme'
}

export type SettingOption = Record<
  SettingOptionName,
  {
    name: SettingOptionName;
    title: string;
    enabled?: boolean;
    value?: string;
  }
>;

export enum ColorSchemeSetting {
  DEFAULT_LIGHT = 'default-light',
  DEFAULT_DARK = 'default-dark'
}
