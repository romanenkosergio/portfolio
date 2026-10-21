import { create } from "zustand/react";

import { EMPTY_VALUES } from "../config";
import type { FieldName, IContactValues } from "../config";

/** The last edit: the field and where its new run starts (after the part both texts share). */
export interface IContactEdit {
  field: FieldName;
  from: number;
}

interface IContactStore {
  values: IContactValues;
  edit: IContactEdit | null;
  /** The field holding focus, so the preview puts its caret on that line. */
  focused: FieldName | null;
  sending: boolean;
  setValue: (field: FieldName, value: string) => void;
  setFocused: (field: FieldName | null) => void;
  setSending: (sending: boolean) => void;
  reset: () => void;
}

const sharedLength = (a: string, b: string): number => {
  let at = 0;
  while (at < a.length && at < b.length && a[at] === b[at]) at += 1;
  return at;
};

// The form writes here and the code preview reads, so they stay in step without a shared parent.
export const useContactStore = create<IContactStore>()(set => ({
  values: EMPTY_VALUES,
  edit: null,
  focused: null,
  sending: false,
  setValue: (field, value) =>
    set(state => ({
      values: { ...state.values, [field]: value },
      edit: { field, from: sharedLength(state.values[field], value) }
    })),
  setFocused: focused => set({ focused }),
  setSending: sending => set({ sending }),
  reset: () => set({ values: EMPTY_VALUES, edit: null })
}));

export const selectValues = (s: IContactStore) => s.values;
export const selectSetValue = (s: IContactStore) => s.setValue;
export const selectReset = (s: IContactStore) => s.reset;
export const selectEdit = (s: IContactStore) => s.edit;
export const selectFocused = (s: IContactStore) => s.focused;
export const selectSending = (s: IContactStore) => s.sending;
export const selectSetFocused = (s: IContactStore) => s.setFocused;
export const selectSetSending = (s: IContactStore) => s.setSending;
