import { create } from "zustand/react";

import { EMPTY_VALUES } from "../config";
import type { FieldName, IContactValues } from "../config";

interface IContactStore {
  values: IContactValues;
  setValue: (field: FieldName, value: string) => void;
  reset: () => void;
}

// The form writes here and the code preview reads, so they stay in step without a shared parent.
export const useContactStore = create<IContactStore>()(set => ({
  values: EMPTY_VALUES,
  setValue: (field, value) =>
    set(state => ({ values: { ...state.values, [field]: value } })),
  reset: () => set({ values: EMPTY_VALUES })
}));

export const selectValues = (s: IContactStore) => s.values;
export const selectSetValue = (s: IContactStore) => s.setValue;
export const selectReset = (s: IContactStore) => s.reset;
