'use client';

import React from 'react';
import ValidateToken from '@/components/auth/validateToken';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <ValidateToken>
        {(user) => (
          <>
            <header className="px-4 py-1 bg-white flex justify-between items-center">
              <img
                src="/webp/logo_webp.webp"
                alt="Logo Te Lo Compro en USA"
                className="rounded-lg object-contain p-2 max-w-[100px]"
              />
              <div>
                <h3 className="text-2xl font-bold text-custom-blue-300">
                  Dashboard
                </h3>
                {/* <p className='text-gray-400'>Bienvenido, {user}</p> */}
              </div>
            </header>
            <main className="pt-10 container mx-auto flex justify-center">
              {children}
            </main>
          </>
        )}
      </ValidateToken>
      <footer className="p-4 bg-zinc-900 text-white text-center">
        <span className="text-white-500">
          &copy; 2025 Te Lo Compro en USA & Botinfy LLC
        </span>
      </footer>
    </div>
  );
}
