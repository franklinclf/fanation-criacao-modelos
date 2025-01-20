"use client";
import Image from "next/image";
import Footer from "./components/Footer";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <>
      <main className="flex h-screen w-full flex-col items-center justify-center bg-dark-purple">
        <div className="mx-10 flex flex-col items-center justify-center">
          <Image
            className="w-[476]"
            src="/fanation-full-logo.svg"
            alt="Logo da Fanation"
            width={0}
            height={0}
            priority={true}
          />

          <a onClick={() => router.push('/login')} className="border-current group relative inline-flex cursor-pointer items-center overflow-hidden rounded-lg border px-8 py-3 text-white hover:bg-light-purple active:bg-light-purple active:text-dark-purple">
            <span className="absolute -end-full transition-all group-hover:end-4">
              <svg
                className="size-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>

            <span className="text-sm font-medium transition-all group-hover:me-4">
              Acessar plataforma
            </span>
          </a>
        </div>
      </main>
      <Footer opacity="20" />
    </>
  );
}
