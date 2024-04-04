import {useCallback, useEffect, useRef, useState} from 'react';

const DEFAULT_DELAY = 1000;

interface timeResult {
  totalSeconds: number;
  seconds: string;
  minutes: string;
  hours: string;
  days: string;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  restart: (newExpiryTimestamp: Date, autoStart?: boolean) => void;
}

const getDelayFromExpiryTimestamp = (expiryTimestamp: Date) => {
  if (!Validate.expiryTimestamp(expiryTimestamp)) {
    return null;
  }

  const seconds = Time.getSecondsFromExpiry(expiryTimestamp);
  const extraMilliSeconds = Math.floor((seconds - Math.floor(seconds)) * 1000);
  return extraMilliSeconds > 0 ? extraMilliSeconds : DEFAULT_DELAY;
};

/**
 *
 * @param expirationTime
 * 만료 시간
 * @param onExpire
 * 종료시 실행할 함수
 * @param autoStart
 * 자동 시작
 * @returns {*} - totalSeconds: number;
 * - seconds: number; 초
 * - minutes: number; 분
 * - hours: number; 시간
 * - days: number; 일
 * - isRunning: boolean; 타이머 실행 여부
 * - start: () => void; 실항함수 * autoStart 가 false 일때 or puase 일때 다시 시작하는 함수
 * - pause: () => void; 정지
 * - resume: () => void; 다시 시작
 * - restart: (newExpiryTimestamp: Date, autoStart?: boolean) => void; 새로운 타임을 받아 시작
 */
const useTimer = (
  expirationTime: Date,
  onExpire?: () => void,
  autoStart: boolean | undefined = false,
): timeResult => {
  const [expiryTimestamp, setExpiryTimestamp] = useState(expirationTime);
  const [seconds, setSeconds] = useState(
    Time.getSecondsFromExpiry(expiryTimestamp),
  );
  const [isRunning, setIsRunning] = useState(autoStart);
  const [didStart, setDidStart] = useState(autoStart);
  const [delay, setDelay] = useState(
    getDelayFromExpiryTimestamp(expiryTimestamp),
  );

  const handleExpire = useCallback(() => {
    Validate.onExpire(onExpire) && onExpire && onExpire();
    setIsRunning(false);
    setDelay(null);
  }, [onExpire]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const restart = useCallback(
    (newExpiryTimestamp: Date, newAutoStart = true) => {
      setDelay(getDelayFromExpiryTimestamp(newExpiryTimestamp));
      setDidStart(newAutoStart);
      setIsRunning(newAutoStart);
      setExpiryTimestamp(newExpiryTimestamp);
      setSeconds(Time.getSecondsFromExpiry(newExpiryTimestamp));
    },
    [],
  );

  const resume = useCallback(() => {
    const time = new Date();
    time.setMilliseconds(time.getMilliseconds() + seconds * 1000);
    restart(time);
  }, [seconds, restart]);

  const start = useCallback(() => {
    if (didStart) {
      setSeconds(Time.getSecondsFromExpiry(expiryTimestamp));
      setIsRunning(true);
    } else {
      resume();
    }
  }, [expiryTimestamp, didStart, resume]);

  useInterval(
    () => {
      if (delay !== DEFAULT_DELAY) {
        setDelay(DEFAULT_DELAY);
      }
      const secondsValue = Time.getSecondsFromExpiry(expiryTimestamp);
      setSeconds(secondsValue);
      if (secondsValue <= 0) {
        handleExpire();
      }
    },
    isRunning ? delay : null,
  );

  return {
    ...Time.getTimeFromSeconds(seconds),
    start,
    pause,
    resume,
    restart,
    isRunning,
  };
};

export default useTimer;

const useInterval = (callback: Function, delay: number | null) => {
  const callbacKRef = useRef<Function>();

  useEffect(() => {
    callbacKRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (delay) {
          callbacKRef.current && callbacKRef.current();
        }
      },
      delay ? delay : undefined,
    );
    if (!delay) {
      clearInterval(interval);
      return () => {};
    }
    return () => clearInterval(interval);
  }, [delay]);
};

class Time {
  static getTimeFromSeconds(secs: number) {
    const totalSeconds = Math.ceil(secs);
    const days = Math.floor(totalSeconds / (60 * 60 * 24)).toString();
    const hours =
      Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60)) < 10
        ? '0' + Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
        : Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60)).toString();
    const minutes =
      Math.floor((totalSeconds % (60 * 60)) / 60) < 10
        ? '0' + Math.floor((totalSeconds % (60 * 60)) / 60)
        : Math.floor((totalSeconds % (60 * 60)) / 60).toString();
    const seconds =
      Math.floor(totalSeconds % 60) < 10
        ? '0' + Math.floor(totalSeconds % 60)
        : Math.floor(totalSeconds % 60).toString();
    return {
      totalSeconds,
      seconds,
      minutes,
      hours,
      days,
    };
  }

  static getSecondsFromExpiry(expiry: Date, shouldRound?: boolean) {
    const now = new Date().getTime();
    const milliSecondsDistance = expiry.getTime() - now;
    if (milliSecondsDistance > 0) {
      const val = milliSecondsDistance / 1000;
      return shouldRound ? Math.round(val) : val;
    }
    return 0;
  }

  static getSecondsFromPrevTime(prevTime: Date, shouldRound?: boolean) {
    const now = new Date().getTime();
    const milliSecondsDistance = now - prevTime.getTime();
    if (milliSecondsDistance > 0) {
      const val = milliSecondsDistance / 1000;
      return shouldRound ? Math.round(val) : val;
    }
    return 0;
  }

  static getSecondsFromTimeNow() {
    const now = new Date();
    const currentTimestamp = now.getTime();
    const offset = now.getTimezoneOffset() * 60;
    return currentTimestamp / 1000 - offset;
  }
}

class Validate {
  static expiryTimestamp(expiryTimestamp: Date) {
    const isValid = new Date(expiryTimestamp).getTime() > 0;
    if (!isValid) {
      console.warn(
        '[hooks - useTimer] Invalid expiryTimestamp settings',
        expiryTimestamp,
      );
    }
    return isValid;
  }

  static onExpire(onExpire?: Function) {
    const isValid = onExpire && typeof onExpire === 'function';
    if (onExpire && !isValid) {
      console.warn(
        '[hooks - useTimer] Invalid onExpire settings function',
        onExpire,
      );
    }
    return isValid;
  }
}
