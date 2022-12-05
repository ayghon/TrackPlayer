import {
  Button,
  ColorSchemePalette,
  Horizontal,
  ScreenContainer,
  SwitchInput
} from '../../ui';
import { Card, Text, makeStyles, useTheme } from '@rneui/themed';
import { ColorPaletteItem } from './components/ColorPaletteItem';
import { ColorPickerDialog } from './components/ColorPickerDialog';
import {
  ColorSchemeModel,
  RootStackScreenProps,
  Routes,
  createColorScheme,
  i18nKeys
} from '../../services';
import { FlatList } from 'react-native';
import { HsvColor } from 'react-native-color-picker/dist/typeHelpers';
import { colorSchemeModelItemToI18n } from './color-scheme.utils';
import { fromHsv, toHsv } from 'react-native-color-picker';
import { useTranslation } from 'react-i18next';
import React, { FC, useState } from 'react';

export const ColorSchemeCreateModal: FC<
  RootStackScreenProps<Routes.COLOR_SCHEME_CREATE>
> = ({ navigation: { goBack } }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useStyles();
  const [isColorPickerModalOpen, setColorPickerModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activePicker, setActivePicker] = useState<ColorSchemePalette>();
  const [colorScheme, setColorScheme] = useState<ColorSchemeModel>({
    [ColorSchemePalette.DARK]: theme.colors.black,
    [ColorSchemePalette.LIGHT]: theme.colors.white,
    [ColorSchemePalette.PRIMARY]: theme.colors.primary,
    [ColorSchemePalette.SECONDARY]: theme.colors.secondary,
    [ColorSchemePalette.BACKGROUND]: theme.colors.background
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
      mode: darkMode ? 'dark' : 'light',
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
        renderItem={({ item }) => (
          <Card>
            <Card.FeaturedTitle style={styles.title}>
              {t(colorSchemeModelItemToI18n[item])}
            </Card.FeaturedTitle>
            <Horizontal alignCenter style={styles.cardTitleContainer}>
              <Text>
                {colorScheme[item] ||
                  t(i18nKeys.modal.playlist.create.palette_color_item.empty)}
              </Text>
              <ColorPaletteItem color={colorScheme[item] || 'transparent'} />
            </Horizontal>
            <Button
              onPress={() => openColorPickerDialogHandler(item)}
              size="sm"
              style={styles.button}
            >
              {t(i18nKeys.modals.color_scheme_create.button.choose_color)}
            </Button>
          </Card>
        )}
      />
      <Button onPress={createColorSchemeHandler} style={styles.createButton}>
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

const useStyles = makeStyles((theme) => ({
  button: {
    alignSelf: 'flex-end'
  },
  cardTitleContainer: { justifyContent: 'space-between', marginBottom: 16 },
  createButton: {
    marginTop: 12
  },
  title: {
    color: theme.colors.black
  }
}));
