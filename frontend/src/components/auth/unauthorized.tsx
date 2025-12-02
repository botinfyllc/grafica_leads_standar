import React from 'react';
import Link from 'next/link';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        <svg
          className="w-16 h-16 text-custom-blue-300 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-black mb-2">
          Acceso no autorizado
        </h2>
        <p className="text-custom-blue-300 mb-4">
          No tienes permiso para ver esta página.
        </p>
        <Link
          href="/"
          className="bg-custom-blue-300 text-white px-4 py-2 rounded hover:bg-custom-blue-200 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
