import { useCallback, useEffect, useState } from "react";

// A new OTP can be requested at most once every 2 minutes. The time of the last request is kept in
// sessionStorage (this tab only, cleared when the tab is closed), so reloading the OTP page does
// not reset the countdown: it shows the time that is really left since the last code was sent.
export const OTP_COOLDOWN_SECONDS = 120;

const STORAGE_KEY = "frafoldashboard_otp_sent_at";

// Call when a code has been sent (forgot-password submit, "Click to resend").
export const markOtpSent = () => {
  try {
    sessionStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // storage blocked (private mode): the countdown just starts from this page's state
  }
};

const readSecondsLeft = () => {
  let sentAt = 0;
  try {
    sentAt = Number(sessionStorage.getItem(STORAGE_KEY)) || 0;
  } catch {
    return 0;
  }
  const left = Math.ceil((sentAt + OTP_COOLDOWN_SECONDS * 1000 - Date.now()) / 1000);
  // A wrong system clock must not lock the button for longer than the cooldown.
  return Math.min(Math.max(left, 0), OTP_COOLDOWN_SECONDS);
};

// 95 → "1:35"
export const formatCooldown = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

export const useOtpCooldown = () => {
  const [secondsLeft, setSecondsLeft] = useState(readSecondsLeft);

  useEffect(() => {
    const timer = window.setInterval(() => setSecondsLeft(readSecondsLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const restart = useCallback(() => {
    markOtpSent();
    setSecondsLeft(OTP_COOLDOWN_SECONDS);
  }, []);

  return { secondsLeft, canResend: secondsLeft === 0, restart, label: formatCooldown(secondsLeft) };
};
