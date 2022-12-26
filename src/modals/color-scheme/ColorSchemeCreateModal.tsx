import {
  Button,
  FlatList,
  Row,
  Text,
  useColorMode,
  useTheme
} from 'native-base';
import {
  Card,
  ColorSchemePalette,
  ScreenContainer,
  SwitchInput,
  ThemeMode
} from '../../ui';
import { ColorPaletteItem } from './components/ColorPaletteItem';
import { ColorPickerDialog } from './components/ColorPickerDialog';
import {
  ColorSchemeModel,
  RootStackScreenProps,
  Routes,
  createColorScheme,
  i18nKeys
} from '../../services';
import { HsvColor } from 'react-native-color-picker/dist/typeHelpers';
import { colorSchemeModelItemToI18n } from './color-scheme.utils';
import { fromHsv, toHsv } from 'react-native-color-picker';
import { useTranslation } from 'react-i18next';
import React, { FC, useState } from 'react';

export const ColorSchemeCreateModal: FC<
  RootStackScreenProps<Routes.COLOR_SCHEME_CREATE>
> = ({ navigation: { goBack } }) => {
  const { t } = useTranslation();
  const [isColorPickerModalOpen, setColorPickerModalOpen] = useState(false);
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [darkMode, setDarkMode] = useState(colorMode === ThemeMode.DARK);
  const [activePicker, setActivePicker] = useState<ColorSchemePalette>();
  const [colorScheme, setColorScheme] = useState<ColorSchemeModel>({
    [ColorSchemePalette.PRIMARY_NORMAL]: theme.colors.primary.normal,
    [ColorSchemePalette.PRIMARY_DARK]: theme.colors.primary.dark,
    [ColorSchemePalette.PRIMARY_LIGHT]: theme.colors.primary.light,
    [ColorSchemePalette.PRIMARY_OPAQUE]: theme.colors.primary.opaque,
    [ColorSchemePalette.SECONDARY_DARK]: theme.colors.secondary.dark,
    [ColorSchemePalette.SECONDARY_NORMAL]: theme.colors.secondary.normal,
    [ColorSchemePalette.SECONDARY_LIGHT]: theme.colors.secondary.light
  });

  const colorSelectedHandler = (color: HsvColor, item: ColorSchemePalette) =>
    setColorScheme((state) => ({
      ...state,
      [item]: fromHsv(color)
    }));

  const openColorPickerDialogHandler = (item: ColorSchemePalette) => {
    setActivePicker(item);
    setColorPickerModalOpen(true);
  };

  const createColorSchemeHandler = async () => {
    await createColorScheme({
      mode: darkMode ? ThemeMode.DARK : ThemeMode.LIGHT,
      palette: colorScheme
    });

    goBack();
  };

  return (
    <ScreenContainer>
      {/* TODO uncomment when multiple custom color schemes creation is implemented */}
      {/*<TextInput*/}
      {/*  error={error}*/}
      {/*  onChange={setColorSchemeName}*/}
      {/*  placeholder={t(*/}
      {/*    i18nKeys.modals.color_scheme_create.input.color_scheme_name*/}
      {/*      .placeholder*/}
      {/*  )}*/}
      {/*  value={colorSchemeName}*/}
      {/*/>*/}
      <SwitchInput
        helperText={t(
          i18nKeys.modals.color_scheme_create.switch.dark_mode.helper_text
        )}
        label={t(i18nKeys.modals.color_scheme_create.switch.dark_mode.label)}
        onChange={(value) => setDarkMode(value)}
        value={darkMode}
      />
      <FlatList
        data={Object.values(ColorSchemePalette)}
        keyExtractor={(item) => item}
        marginY={4}
        renderItem={({ item }) => (
          <Card marginBottom={4} paddingBottom={4}>
            <Text>{t(colorSchemeModelItemToI18n[item])}</Text>
            <Row
              alignItems="center"
              justifyContent="space-between"
              marginBottom={4}
            >
              <Text>
                {colorScheme[item] ||
                  t(i18nKeys.modal.playlist.create.palette_color_item.empty)}
              </Text>
              <ColorPaletteItem color={colorScheme[item] || 'transparent'} />
            </Row>
            <Button
              alignSelf="flex-end"
              onPress={() => openColorPickerDialogHandler(item)}
              size="sm"
            >
              {t(i18nKeys.modals.color_scheme_create.button.choose_color)}
            </Button>
          </Card>
        )}
      />
      <Button onPress={createColorSchemeHandler}>
        {t(i18nKeys.button.create)}
      </Button>
      {activePicker && (
        <ColorPickerDialog
          defaultColor={toHsv(colorScheme[activePicker])}
          isOpen={isColorPickerModalOpen}
          onClose={() => setColorPickerModalOpen(false)}
          paletteItem={activePicker}
          pickColor={toHsv(colorScheme[activePicker])}
          pickColorHandler={(color) =>
            colorSelectedHandler(color, activePicker)
          }
        />
      )}
    </ScreenContainer>
  );
};
