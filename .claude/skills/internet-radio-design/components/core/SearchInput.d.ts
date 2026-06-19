import * as React from "react";

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** @default "Search…" */
  placeholder?: string;
  style?: React.CSSProperties;
}

/** Glass search field with leading icon and violet focus ring. 16px font (no iOS zoom). */
export function SearchInput(props: SearchInputProps): JSX.Element;
