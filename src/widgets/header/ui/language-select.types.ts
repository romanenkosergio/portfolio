export interface ILanguageSelectProps {
  /** The visitor already asked for the list on the stand-in: open it as soon as it is ready. */
  defaultOpen: boolean;
  /** The stand-in had focus when it was swapped out: the trigger takes it. */
  focusTrigger: boolean;
}
