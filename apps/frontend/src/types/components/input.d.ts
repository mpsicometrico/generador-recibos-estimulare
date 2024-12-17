import { InputHTMLAttributes } from "react";

export interface InputProps {
  id: string;
  label: string;
  className?: string;
  placeholder?: string;
  props?: InputHTMLAttributes<HTMLInputElement>;
}