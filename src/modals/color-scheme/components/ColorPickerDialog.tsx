import { ColorSchemePalette, ConfirmDialog } from '../../../ui';
import { HsvColor } from 'react-native-color-picker/dist/typeHelpers';
import { TriangleColorPicker } from 'react-native-color-picker';
import { colorSchemeModelItemToI18n } from '../color-scheme.utils';
import { i18nKeys } from '../../../services';
import { makeStyles } from '@rneui/themed';
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
  const styles = useStyles();
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
        style={styles.coloPicker}
      />
    </ConfirmDialog>
  );
};

const useStyles = makeStyles({
  button: {
    marginStart: 4
  },
  coloPicker: {
    height: 250
  },
  flex: { flex: 1 }
});
