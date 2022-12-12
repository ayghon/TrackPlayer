import { ConfirmDialog } from '../../dialog';
import { Icon, Text, makeStyles } from '@rneui/themed';
import { NumberInput } from '../../fields';
import { SleepTimerState, i18nKeys } from '../../../services';
import { UseSleepTimerResponse } from '../../../services/player/hooks/sleep-timer';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import React, { FC, useState } from 'react';

export type SleepTimerDialogProps = {
  onClose: () => void;
  isOpen: boolean;
  sleepTimer: UseSleepTimerResponse;
};

export const SleepTimerDialog: FC<SleepTimerDialogProps> = ({
  onClose,
  isOpen,
  sleepTimer
}) => {
  const [timeout, setTimeout] = useState<number>(15);
  const { t } = useTranslation();
  const styles = useStyles();
  const { startTimer, timerState, resetTimer } = sleepTimer;

  const isValueIsTooLow =
    !timeout || (typeof timeout !== 'undefined' && timeout < 0);

  const handleSleepTimer = () => {
    if (timerState === SleepTimerState.ACTIVE) {
      resetTimer();
    } else if (timeout) {
      startTimer(timeout);
    }

    onClose();
  };

  return (
    <ConfirmDialog
      close={onClose}
      confirmButton={{
        disabled: isValueIsTooLow,
        onPress: () => handleSleepTimer(),
        title: t(i18nKeys.ui.player.controls.dialog.confirm_set.actions.accept)
      }}
      isOpen={isOpen}
      title={t(i18nKeys.ui.player.controls.dialog.confirm_set.title)}
    >
      <Text style={styles.dialogIntroduction}>
        {t(i18nKeys.ui.player.controls.dialog.confirm_set.subtitle)}
      </Text>
      <View style={styles.dialogInputContainer}>
        <NumberInput
          error={
            isValueIsTooLow
              ? t(
                  i18nKeys.ui.player.controls.dialog.confirm_set.input.minutes
                    .error.too_low
                )
              : ''
          }
          label={t(
            i18nKeys.ui.player.controls.dialog.confirm_set.input.minutes.label
          )}
          onChange={(value) => setTimeout(value)}
          rightIcon={<Icon name="alarm" />}
          value={timeout}
        />
      </View>
    </ConfirmDialog>
  );
};

const useStyles = makeStyles({
  dialogInputContainer: {
    width: '100%'
  },
  dialogIntroduction: {
    marginBottom: 16
  }
});
