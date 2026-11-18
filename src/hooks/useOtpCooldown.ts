import { useCallback, useEffect, useState } from "react";

// A new OTP can be requested at most once every 2 minutes. The time of the last request is kept in
// sessionStorage (this tab only, cleared when the tab is closed), so reloading the OTP page does
// not reset the countdown: it shows the time that is really left since the last code was sent.
export const OTP_COOLDOWN_SECONDS = 120;

const STORAGE_KEY = "frafoldashboard_otp_sent_at";

// Same time kept in memory too. Some browsers block site storage (strict privacy settings, some
// private windows): sessionStorage then throws, and the countdown used to vanish at once. The
// forgot-password form and the OTP page are one client-side navigation, so this copy survives
// the page change; only a full reload loses it there.
let memorySentAt = 0;

// Call when a code has been sent (forgot-password submit, "Click to resend").
export const markOtpSent = () => {
  memorySentAt = Date.now();
  try {
    sessionStorage.setItem(STORAGE_KEY, String(memorySentAt));
  } catch {
    // storage blocked: the in-memory time above is used
  }
};

const readSecondsLeft = () => {
  let stored = 0;
  try {
    stored = Number(sessionStorage.getItem(STORAGE_KEY)) || 0;
  } catch {
    // storage blocked: use the in-memory time only
  }
  const sentAt = Math.max(stored, memorySentAt);
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
    const tick = () => setSecondsLeft(readSecondsLeft());
    const timer = window.setInterval(tick, 1000);
    // Browsers slow timers down in background tabs; refresh at once when the tab is shown again.
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);

  const restart = useCallback(() => {
    markOtpSent();
    setSecondsLeft(OTP_COOLDOWN_SECONDS);
  }, []);

  return { secondsLeft, canResend: secondsLeft === 0, restart, label: formatCooldown(secondsLeft) };
};
