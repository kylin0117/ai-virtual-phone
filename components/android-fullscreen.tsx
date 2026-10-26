"use client";

import { useEffect } from "react";

import { shouldRequestPwaFullscreen } from "@/lib/pwa-display-mode";

/**
 * 安卓全屏兜底：已关闭点击屏幕自动全屏，防止安卓 Chrome 反复弹出全屏安全提示框。
 */
export function AndroidFullscreen() {
  useEffect(() => {
    const isMobile = window.matchMedia(
      "(max-width: 500px) and (hover: none) and (pointer: coarse)"
    ).matches;
    if (!isMobile) return;

    function tryFullscreen() {
      if (!shouldRequestPwaFullscreen()) return;
      // 下面这行自动全屏已被禁用，不再触发烦人的弹窗
      return;
    }
    
    document.addEventListener("click", tryFullscreen);
    return () => {
      document.removeEventListener("click", tryFullscreen);
    };
  }, []);

  return null;
}
