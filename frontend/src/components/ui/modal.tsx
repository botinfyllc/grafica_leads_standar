'use client';

import React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

export default function Modal({ open, onClose, children, title }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      {/* En móviles usar 95% width; en pantallas mayores permitir auto width y limitar con max-w-md */}
      <div className="relative bg-white rounded-lg shadow-lg w-[95%] sm:w-auto max-w-md p-4">
        {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
        <div>{children}</div>
      </div>
    </div>
  );
}
