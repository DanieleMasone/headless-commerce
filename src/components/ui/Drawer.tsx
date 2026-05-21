"use client";

import { useEffect, useId, useRef, type KeyboardEvent, type ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/format";

export interface DrawerProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly footer?: ReactNode;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title: string;
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

/**
 * Accessible side drawer with Escape handling and focus containment.
 */
export function Drawer({
  children,
  className,
  footer,
  isOpen,
  onClose,
  title,
}: DrawerProps): ReactNode {
  const titleId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElement = useRef<Element | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previouslyFocusedElement.current = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = "";

      if (previouslyFocusedElement.current instanceof HTMLElement) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>): void {
    if (event.key === "Escape") {
      onClose();
      return;
    }

    if (event.key !== "Tab" || !panelRef.current) {
      return;
    }

    const focusableElements = getFocusableElements(panelRef.current);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (!firstElement || !lastElement) {
      return;
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  return (
    <div className="fixed inset-0 z-50" role="presentation">
      <button
        aria-label="Chiudi carrello"
        className="absolute inset-0 cursor-default bg-stone-950/45"
        onClick={onClose}
        type="button"
      />
      <aside
        ref={panelRef}
        aria-labelledby={titleId}
        aria-modal="true"
        className={cx(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl outline-none",
          className,
        )}
        onKeyDown={handleKeyDown}
        role="dialog"
      >
        <header className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-stone-950" id={titleId}>
            {title}
          </h2>
          <Button
            ref={closeButtonRef}
            aria-label="Chiudi carrello"
            onClick={onClose}
            size="sm"
            variant="ghost"
          >
            Chiudi
          </Button>
        </header>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
        {footer ? <footer className="border-t border-stone-200 p-5">{footer}</footer> : null}
      </aside>
    </div>
  );
}
