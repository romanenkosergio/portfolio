export interface IPreviewValueProps {
  value: string;
  className: string;
  /** Where the newly typed run starts; omitted when nothing is to fade in (idle, or a paste). */
  from?: number;
  /** The field holds focus: the caret sits at the end of the value. */
  caret: boolean;
}
