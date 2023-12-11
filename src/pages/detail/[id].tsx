import { Heading, Text } from "@/components/typography";
import { tw } from "@/lib/helpers";
import MahasiswaServices, { type TDetailMahasiswa } from "@/services/mahasiswa";
import { motion, type AnimationProps } from "framer-motion";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

interface PageProps {
  id?: string;
  data?: TDetailMahasiswa;
}

const DetailMahasiswaPage: NextPage<PageProps> = ({ data }: PageProps) => {
  const framerMotionAnimation: AnimationProps = {
    initial: {
      translateY: "115%"
    },
    animate: {
      translateY: 0
    },
    transition: {
      // duration: 0.2
    }
  };

  const biodataMahasiswa = [
    {
      key: "Nama",
      value: data?.dataumum.nm_pd.toLowerCase()
    },
    {
      key: "Jenis Kelamin",
      value: data?.dataumum.jk === "L" ? "Laki-laki" : "Perempuan"
    },
    {
      key: "Perguruan Tinggi",
      value: data?.dataumum.namapt
    },
    {
      key: "Program Studi",
      value: data?.dataumum.namaprodi
    },
    {
      key: "Jenjang",
      value: data?.dataumum.namajenjang
    },
    {
      key: "Nomor Induk Mahasiswa",
      value: data?.dataumum.nipd
    },
    {
      key: "Semester Awal",
      value: getStartSemester(data?.dataumum.mulai_smt)
    }
  ];

  function getStartSemester(value?: string) {
    const semester = value ? (Number(value.charAt(4)) % 2 === 0 ? "Genap" : "Ganjil") : "_SEMESTER_";
    const year = value ? Number(value.slice(0, 4)) : "_TAHUN_";

    return `${semester} ${year}`;
  }

  return (
    <>
      <div className={tw("container mx-auto p-6")}>
        <div id="biodata-mahasiswa" className={tw("lg:pt-32")}>
          <div className={tw("overflow-hidden", "mb-4 py-1")}>
            <motion.h2
              className={Heading({
                type: "h2"
              })}
              {...framerMotionAnimation}
              transition={{
                ...framerMotionAnimation.transition,
                delay: 0.5
              }}
            >
              Biodata Mahasiswa
            </motion.h2>
          </div>

          <div className={tw("flex flex-col gap-6 md:flex-row md:flex-wrap")}>
            {biodataMahasiswa.map(({ key, value }, index) => {
              const loopKey = `${index}`;

              return (
                <div className={tw("w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333333%-48px)]")} key={loopKey}>
                  <div className={tw("overflow-hidden")}>
                    <motion.p
                      className={Text({
                        size: "small",
                        className: ["font-medium text-gray-2", "mb-1"]
                      })}
                      {...framerMotionAnimation}
                      transition={{
                        ...framerMotionAnimation.transition,
                        delay: 0.6
                      }}
                    >
                      {key}
                    </motion.p>
                  </div>

                  <div className={tw("overflow-hidden")}>
                    <motion.p
                      className={Text({
                        size: "normal",
                        className: [value || "opacity-25", "text-black", key === "Nama" && "capitalize"]
                      })}
                      {...framerMotionAnimation}
                      transition={{
                        ...framerMotionAnimation.transition,
                        delay: 0.7
                      }}
                    >
                      {value || "Loading..."}
                    </motion.p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <pre
          className={Text({
            size: "small",
            className: "overflow-auto"
          })}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<PageProps, { id: string }> = async ({ params }) => {
  const id = params?.id;
  const response = await MahasiswaServices.getDetailMahasiswa(id || "");

  if (response.status === 200) {
    return {
      props: {
        data: response.data
      }
    };
  }

  return {
    notFound: true
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: false
  };
};

export default DetailMahasiswaPage;
