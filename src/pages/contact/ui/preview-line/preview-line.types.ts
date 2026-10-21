import type { FieldName, IContactValues } from "@/pages/contact/config";
import type { IToken } from "@/pages/contact/lib";
import type { IContactEdit } from "@/pages/contact/model";

export interface IPreviewLineProps {
  line: IToken[];
  /** 1-based, shown in the gutter. */
  number: number;
  values: IContactValues;
  edit: IContactEdit | null;
  focused: FieldName | null;
  /** The `form.send(message)` row, which glows while sending. */
  send: boolean;
}
