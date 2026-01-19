export interface AlertOptions {
  title?: string;
  message: string;
  confirmText?: string;
}

export interface AlertState {
  isVisible: boolean;
  title: string;
  message: string;
  confirmText: string;
}