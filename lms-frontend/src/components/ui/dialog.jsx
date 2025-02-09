// src/components/ui/dialog.jsx
import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = DialogPrimitive.Content;
export const DialogOverlay = DialogPrimitive.Overlay;

export const DialogHeader = ({ children }) => (
  <div className="dialog-header">{children}</div>
);
export const DialogTitle = ({ children }) => (
  <h2 className="dialog-title">{children}</h2>
);
export const DialogFooter = ({ children }) => (
  <div className="dialog-footer">{children}</div>
);
export const DialogClose = DialogPrimitive.Close;
