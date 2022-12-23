import { ColorSchemePalette, ConfirmDialog } from '../../../ui';
import { HsvColor } from 'react-native-color-picker/dist/typeHelpers';
import { StyleSheet } from 'react-native';
import { TriangleColorPicker } from 'react-native-color-picker';
import { colorSchemeModelItemToI18n } from '../color-scheme.utils';
import { i18nKeys } from '../../../services';
import { useTranslation } from 'react-i18next';
import React, { FC, useState } from 'react';

export type ColorPickerDialogProps = {
  onClose: () => void;
  isOpen: boolean;
  paletteItem: ColorSchemePalette;
  pickColorHandler: (color: HsvColor) => void;
  defaultColor?: HsvColor;
  pickColor: HsvColor;
};

export const ColorPickerDialog: FC<ColorPickerDialogProps> = ({
  onClose,
  paletteItem,
  pickColorHandler,
  isOpen,
  defaultColor
}) => {
  const { t } = useTranslation();
  const [color, setColor] = useState<HsvColor>();

  const closeHandler = () => {
    if (color) {
      pickColorHandler(color);
    }
    onClose();
  };

  const resetHandler = () => {
    if (defaultColor) {
      setColor(defaultColor);
    }
  };

  return (
    <ConfirmDialog
      cancelButton={{
        onPress: resetHandler,
        title: t(
          i18nKeys.modals.color_scheme_create.dialog.color_picker.actions.reset
        )
      }}
      close={closeHandler}
      confirmButton={{
        onPress: closeHandler,
        title: t(
          i18nKeys.modals.color_scheme_create.dialog.color_picker.actions.accept
        )
      }}
      isOpen={isOpen}
      title={t(i18nKeys.modals.color_scheme_create.dialog.color_picker.title, {
        label: t(colorSchemeModelItemToI18n[paletteItem])
      })}
    >
      <TriangleColorPicker
        color={color}
        defaultColor={defaultColor}
        hideControls
        onColorChange={setColor}
        rotationHackFactor={0}
        style={styles.colorPicker}
      />
    </ConfirmDialog>
  );
};

const styles = StyleSheet.create({
  colorPicker: {
    height: 250
  }
});
