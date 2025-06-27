import styled, { css } from "styled-components";

import type { NotificationThemeType } from "../../types";

function hexToRgba(hex: string, alpha: number) {
  const cleaned = hex.replace(/^#/, "");
  const bigint = parseInt(cleaned, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const NotificationWrapper = styled.div<{
  $theme: NotificationThemeType;
  $index: number;
  $isExiting: boolean;
  $mounted: boolean;
  $isClickable: boolean;
  $canClose: boolean;
  $veticalAlign: "top" | "bottom";
  $horizontalAlign: "left" | "middle" | "right";
}>`
  position: fixed;
  z-index: ${({ $index }) => 9999 - $index};
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ $veticalAlign, $index }) => {
    const step = Math.max(4, 16 - $index * 2);
    const offset = step * $index;
    if ($veticalAlign === "top") {
      return css`
        top: calc(1rem + ${offset}px);
      `;
    } else {
      return css`
        bottom: calc(1rem + ${offset}px);
      `;
    }
  }}

  ${({ $horizontalAlign }) => {
    switch ($horizontalAlign) {
      case "left":
        return css`
          left: 1rem;
          transform: translateX(0);
        `;
      case "right":
        return css`
          right: 1rem;
          transform: translateX(0);
        `;
      default:
        return css`
          left: 50%;
          transform: translateX(-50%);
        `;
    }
  }}

  max-width: 90%;
  padding: 12px 20px;
  padding-right: ${({ $canClose }) => ($canClose ? "34px" : "20px")};
  border-radius: 8px;

  user-select: ${({ $isClickable }) => ($isClickable ? "auto" : "none")};
  cursor: ${({ $isClickable }) => ($isClickable ? "pointer" : "default")};

  background: ${({ $theme }) => hexToRgba($theme.backgroundColor, 0.6)};
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid ${({ $theme }) => hexToRgba($theme.borderColor, 0.6)};
  color: ${({ $theme }) => $theme.fontColor};

  ${({ $mounted, $isExiting, $index }) => {
    const base = 1 - $index * 0.02;
    const entryTranslateY = "-50px";
    const exitTranslateY = "-50px";
    const translateY = $isExiting
      ? exitTranslateY
      : $mounted
      ? "0"
      : entryTranslateY;
    const scale = $isExiting ? base * 0.975 : $mounted ? base : base * 0.975;
    const opacity = $isExiting ? 0 : $mounted ? 1 : 0;

    return css`
      transform: translateY(${translateY}) scale(${scale});
      opacity: ${opacity};

      transition: transform 0.2s ease, opacity 0.2s ease;
    `;
  }}

  .column {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .message {
    font: 14px sans-serif;
  }
  .submessage {
    font: 12px sans-serif;
    opacity: 0.8;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ $theme }) => hexToRgba($theme.borderColor, 0.25)};
    color: ${({ $theme }) => $theme.fontColor};
  }

  .close-icon-container {
    position: absolute;
    top: 4px;
    right: 4px;

    .close-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      color: ${({ $theme }) => $theme.fontColor};
      cursor: pointer;
      transition: background 0.25s ease;
      &:hover {
        background: ${({ $theme }) => hexToRgba($theme.borderColor, 0.25)};
      }
    }
  }
`;
