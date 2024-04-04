import {forwardRef, useImperativeHandle, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import useTimer from 'hooks/useTimer';
import Text from './Text';

type TimerProps = {
  duration?: number;
  autoStart?: boolean;
  onExpire?: () => void;
};

const Timer = forwardRef(
  (
    {duration = 30000, autoStart = false, onExpire, ...props}: TimerProps,
    ref: any,
  ) => {
    const {minutes, seconds, isRunning, restart, start, pause} = useTimer(
      new Date(new Date().getTime() + duration),
      onExpire,
      autoStart,
    );

    useImperativeHandle(
      ref,
      () => ({
        isRunning: isRunning,
        start: start,
        restart: () => restart(new Date(new Date().getTime() + duration)),
        pause: pause,
      }),
      [isRunning, start, pause, restart, duration],
    );

    return (
      <View {...props}>
        <Text style={styles.text}>{`${minutes}:${seconds}`}</Text>
      </View>
    );
  },
);

Timer.displayName = 'Timer';
export default Timer;

const styles = StyleSheet.create({
  text: {
    color: '#eb4343',
  },
});
