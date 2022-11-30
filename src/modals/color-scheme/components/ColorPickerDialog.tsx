import { Button, ButtonVariant, ColorSchemePalette } from '../../../ui';
import { Dialog, makeStyles, useTheme } from '@rneui/themed';
import { HsvColor } from 'react-native-color-picker/dist/typeHelpers';
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
  const styles = useStyles();
  const { t } = useTranslation();
  const { theme } = useTheme();
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
    <Dialog
      isVisible={isOpen}
      onBackdropPress={closeHandler}
      onRequestClose={closeHandler}
      overlayStyle={{
        backgroundColor: theme.colors.background
      }}
      style={styles.flex}
    >
      <Dialog.Title
        title={t(
          i18nKeys.modals.color_scheme_create.dialog.color_picker.title,
          {
            label: t(colorSchemeModelItemToI18n[paletteItem])
          }
        )}
        titleStyle={{ color: theme.colors.black }}
      />
      <TriangleColorPicker
        color={color}
        defaultColor={defaultColor}
        hideControls
        onColorChange={setColor}
        rotationHackFactor={0}
        style={styles.coloPicker}
      />
      <Dialog.Actions>
        <Button onPress={closeHandler} size="sm" style={styles.button}>
          {t(
            i18nKeys.modals.color_scheme_create.dialog.color_picker.actions
              .accept
          )}
        </Button>
        {!!defaultColor && (
          <Button
            onPress={resetHandler}
            size="sm"
            variant={ButtonVariant.BORDERLESS}
          >
            {t(
              i18nKeys.modals.color_scheme_create.dialog.color_picker.actions
                .reset
            )}
          </Button>
        )}
      </Dialog.Actions>
    </Dialog>
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
