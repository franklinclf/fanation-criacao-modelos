import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({subsets: ['latin-ext'], weight: ['400', '500', '600', '700']});

export const metadata = {
  title: "Fanation",
  description: "Sistema de Criação de Modelos de Produto com Montagem de Imagens",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={' ' + poppins.className}>
        {children}
      </body>
    </html>
  );
}
