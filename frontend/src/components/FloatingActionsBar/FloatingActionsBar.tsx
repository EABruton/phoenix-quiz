import type { ReactNode } from "react";
import "./FloatingActionsBar.css";

type FloatingActionsBarProps = {
  children: ReactNode;
};

export default function FloatingActionsBar({
  children,
}: FloatingActionsBarProps) {
  return <div className="floating-actions-bar">{children}</div>;
}
