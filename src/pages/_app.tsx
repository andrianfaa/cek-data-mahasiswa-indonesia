import { tw } from "@/lib/helpers";
import type { AppProps } from "next/app";
import { Archivo } from "next/font/google";

import "@/styles/globals.css";

const archivo = Archivo({
  weight: ["300", "400", "500"],
  subsets: ["latin"]
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={tw(archivo.className)}>
      <Component {...pageProps} />
    </main>
  );
}
