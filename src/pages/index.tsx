import { Card } from "@/components";
import { Input } from "@/components/forms";
import { Heading, Text } from "@/components/typography";
import { tw } from "@/lib/helpers";
import { FetchAPI } from "@/lib/utils";
import type { TMahasiswa } from "@/services/mahasiswa";
import { motion, type AnimationProps } from "framer-motion";
import { escape } from "html-escaper";
import { useRef, useState, type FormEvent } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";

type Mahasiswa = TMahasiswa;

function Home() {
  const [data, setData] = useState<Mahasiswa[]>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState({
    isError: false,
    message: ""
  });

  const headerContentRef = useRef<HTMLDivElement | null>(null);

  const framerMotionAnimation: AnimationProps = {
    initial: {
      translateY: "110%"
    },
    animate: {
      translateY: 0
    }
  };

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchValue) {
      setError({
        isError: true,
        message: "Nama Mahasiswa, NIM/NPM, atau Prodi di butuhkan!"
      });
      return;
    }

    setIsLoading(true);

    const escapedQuery = escape(searchValue);

    await FetchAPI<ResponseAPI<Mahasiswa[]>>("/api/mahasiswa", {
      method: "POST",
      data: {
        query: escapedQuery
      }
    })
      .then((res) => {
        if (res.status === 200) {
          setError({
            isError: false,
            message: ""
          });
          setData(res.data.data || []);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={tw("container mx-auto")}>
      <header
        className={tw("p-6", "w-full", "transition-[height] duration-300 ease-in-out", "flex items-center")}
        style={{
          height: typeof data !== "undefined" ? `300px` : "100vh"
        }}
      >
        <div ref={headerContentRef} className={tw("py-20")}>
          <div className="mb-2 overflow-hidden py-0.5">
            <Heading.h1 animated>Cek data Mahasiswa</Heading.h1>
          </div>

          <div className="mb-6 overflow-hidden py-0.5">
            <Text.p
              animated
              transition={{
                delay: 0.1
              }}
            >
              Cek data Mahasiswa seluruh Indonesia berdasarkan Nama, NIM/NPM atau Prodi.
            </Text.p>
          </div>

          <div className="overflow-hidden py-0.5">
            <motion.form
              onSubmit={handleOnSubmit}
              className={tw("max-w-md", "flex flex-row items-center", "relative")}
              {...framerMotionAnimation}
              transition={{
                type: "spring",
                delay: 0.5,
                duration: 0.3,
                bounce: 0.25
              }}
            >
              <input
                type="search"
                name="input-mahasiswa"
                id="input-mahasiswa"
                title="Masukkan Nama/NIM/Prodi"
                placeholder="Masukkan Nama/NIM/Prodi"
                onChange={(event) => {
                  setSearchValue(event.target.value);
                }}
                className={Input({
                  inputType: "text",
                  className: [
                    "bg-white",
                    "text-black-1",
                    "w-full",
                    "!pr-16 md:!pr-20",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    error.isError && "!border-state-error"
                  ]
                })}
                disabled={isLoading}
              />

              <button
                type="submit"
                title="Cari mahasiswa"
                className={tw(
                  "bg-black-1 hover:bg-black-2 focus:bg-black-2",
                  "text-white",
                  "p-3 md:p-4",
                  "rounded",
                  "absolute right-2 z-[1]",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className={tw("animate-spin")}>
                    <BiLoaderAlt />
                  </div>
                ) : (
                  <FiSearch />
                )}
              </button>
            </motion.form>
          </div>

          {error.isError && <Text.span>{error.message}</Text.span>}
        </div>
      </header>

      <div
        id="result"
        className={tw("transition-[height] duration-300 ease-in-out")}
        style={{
          height: typeof data !== "undefined" ? "auto" : 0
        }}
      >
        {data && (
          <div className={tw("flex flex-row flex-wrap items-stretch justify-start gap-4", "p-6", "w-full")}>
            {data.map(({ id, nama, nim, univ, prodi }, index) => {
              return (
                <Card
                  key={`${index}`}
                  id={id}
                  nama={nama}
                  nim={nim}
                  univ={univ}
                  prodi={prodi}
                  isMatched={searchValue.toLowerCase() === nama.toLowerCase()}
                  className={tw("w-full md:w-[calc(50%-8px)]")}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
