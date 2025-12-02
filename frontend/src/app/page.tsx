'use client';

import useLogin from '@/hooks/login';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

export default function Home() {
  const { login } = useLogin();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    try {
      await login({ email, password });
      router.push('/dashboard');
    } catch (error) {
      setErrorMsg('Correo o contraseña incorrectos.');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative">
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-4 pt-8">
        {/* Imágenes superiores */}
        <div className="flex justify-center gap-4 w-full">
          <img
            src="/webp/logo_webp.webp"
            alt="Logo Te Lo Compro en USA"
            className="rounded-lg object-contain p-2 max-w-[150px]"
          />
        </div>
        {/* Alerta de error */}
        {errorMsg && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 text-center">
            {errorMsg}
          </div>
        )}
        {/* Formulario de login */}
        <form
          className="bg-white rounded-xl shadow-lg p-8 w-[90%] flex flex-col gap-6 mx-4 sm:mx-0"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-zinc-800 text-center mb-2">
            Iniciar sesión
          </h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-zinc-800">
              Correo electrónico
            </label>
            <Input
              type="email"
              id="email"
              placeholder="usuario@correo.com"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-zinc-800">
              Contraseña
            </label>
            <Input
              type="password"
              id="password"
              placeholder="••••••••"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full py-2 bg-custom-blue-300 text-white font-semibold hover:bg-custom-blue-200 transition-colors rounded-lg cursor-pointer"
          >
            Entrar
          </Button>
        </form>
        <div className="flex items-center justify-center mt-4 absolute bottom-2">
          <span className="font-bold text-sm text-zinc-800">Develop by</span>{' '}
          <img src="/webp/botinfy_logo.webp" className="w-18 mb-[5px]" />
        </div>
      </div>
    </main>
  );
}
