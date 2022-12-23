import { ConfirmDialog } from '../../dialog';
import { Icon, Stack, Text } from 'native-base';
import { NumberInput } from '../../fields';
import { SleepTimerState, i18nKeys } from '../../../services';
import { UseSleepTimerResponse } from '../../../services/player/hooks/sleep-timer';
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
      <Stack space={2}>
        <Text>
          {t(i18nKeys.ui.player.controls.dialog.confirm_set.subtitle)}
        </Text>
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
          rightElement={<Icon name="alarm" />}
          value={timeout}
        />
      </Stack>
    </ConfirmDialog>
  );
};
