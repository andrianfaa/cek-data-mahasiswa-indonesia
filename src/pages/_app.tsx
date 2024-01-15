import { Text } from "@/components/typography";
import { tw } from "@/lib/helpers";
import "@/styles/globals.css";
import { DefaultSeo, type DefaultSeoProps } from "next-seo";
import type { AppProps } from "next/app";
import { Archivo } from "next/font/google";
import Link from "next/link";
import { FiGithub } from "react-icons/fi";

const archivo = Archivo({
  weight: ["300", "400", "500"],
  subsets: ["latin"]
});

export default function App({ Component, pageProps }: AppProps) {
  const defaultSeoConfig: DefaultSeoProps = {
    title: "Cek Data Mahasiswa Indonesia",
    description: "",
    openGraph: {
      type: "website",
      locale: "id_ID",
      // url: 'https://www.url.ie/',
      siteName: "Cek Data Mahasiswa Indonesia"
    },
    twitter: {
      handle: "@handle",
      site: "@site",
      cardType: "summary_large_image"
    }
  };

  return (
    <main className={tw(archivo.className)}>
      <DefaultSeo {...defaultSeoConfig} />

      <Component {...pageProps} />

      <footer>
        <div className={tw("container mx-auto p-4 md:p-6", "flex flex-row flex-wrap items-center justify-center")}>
          <Text.p className={tw("text-center")}>
            Created with &hearts; by{" "}
            <Link
              href="https://www.anfa.my.id"
              title="Andrian Fadhilla"
              className={tw(
                Text.Variant({
                  size: "normal",
                  className: "text-black"
                })
              )}
            >
              Andrian Fadhilla
            </Link>
          </Text.p>

          <div className={tw("flex flex-row items-center justify-center", "ml-4 pl-4", "border-l")}>
            <Link
              href="https://github.com/andrianfaa/cek-data-mahasiswa-indonesia"
              title="GitHub Source code"
              className={tw("inline text-black")}
              // className={tw("h-10 w-10", "rounded-full", "flex items-center justify-center", "bg-black text-white")}
            >
              <FiGithub />
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
