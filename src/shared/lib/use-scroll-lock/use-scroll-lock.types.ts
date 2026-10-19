export interface IUseScrollLockOptions {
  autoLock?: boolean;
  lockTarget?: HTMLElement | string;
  widthReflow?: boolean;
}

export interface IUseScrollLockReturn {
  isLocked: boolean;
  lock: () => void;
  unlock: () => void;
}

export interface IOriginalStyle {
  overflow: CSSStyleDeclaration["overflow"];
  paddingRight: CSSStyleDeclaration["paddingRight"];
}
