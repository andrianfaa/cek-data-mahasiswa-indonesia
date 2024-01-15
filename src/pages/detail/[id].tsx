import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Heading, Text } from "@/components/typography";
import { tw } from "@/lib/helpers";
import MahasiswaServices, { type TDetailMahasiswa } from "@/services/mahasiswa";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface PageProps {
  id?: string;
  data?: TDetailMahasiswa;
}

interface TDataStudi {
  id: string;
  data: TDetailMahasiswa["datastudi"];
}

const DetailMahasiswaPage: NextPage<PageProps> = ({ data }: PageProps) => {
  const router = useRouter();

  const [dataStudi, setDataStudi] = useState<TDataStudi[]>();
  const [activeDropdownIndex, setActiveDropdownIndex] = useState<number>(0);

  const biodataMahasiswa = [
    {
      key: "Nama",
      value: data?.dataumum.nm_pd.toLowerCase()
    },
    {
      key: "Jenis Kelamin",
      value: data?.dataumum && (data?.dataumum.jk === "L" ? "Laki-laki" : "Perempuan")
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
      value: parseOddEven(data?.dataumum.mulai_smt)
    }
  ];

  function parseOddEven(value?: string) {
    const semester = value ? (Number(value.charAt(4)) % 2 === 0 ? "Genap" : "Ganjil") : "?????";
    const year = value ? Number(value.slice(0, 4)) : "????";

    return `${semester} ${year}`;
  }

  useEffect(() => {
    if (data && data.datastudi.length > 0) {
      const arr: TDataStudi[] = [];
      const set: Set<string> = new Set();

      for (let i = 0; i < data.datastudi.length; i += 1) {
        set.add(data.datastudi[i].id_smt);
      }

      for (let i = 0; i < Array.from(set).length; i += 1) {
        const key = Array.from(set)[i];
        const dataStudi: TDataStudi["data"] = [];

        for (let j = 0; j < data.datastudi.length; j += 1) {
          if (data.datastudi[j].id_smt === key) {
            dataStudi.push(data.datastudi[j]);
          }
        }

        arr.push({
          id: key,
          data: dataStudi
        });
      }

      setDataStudi(arr);
    }
  }, [data]);

  return (
    <>
      <div className={tw("container mx-auto p-6 lg:py-32")}>
        <button
          type="button"
          onClick={() => router.back()}
          title="Back"
          className={tw(
            Button({
              size: "normal",
              style: "primary",
              className: ["flex flex-row items-center gap-2", "rounded-md", "mb-6"]
            })
          )}
        >
          <FiChevronDown className={tw("rotate-90")} />
          Back
        </button>

        <div id="biodata-mahasiswa">
          <div className={tw("overflow-hidden", "mb-4 py-0.5")}>
            <Heading.h2
              animated
              transition={{
                delay: 0.1
              }}
            >
              Biodata Mahasiswa
            </Heading.h2>
          </div>

          <div className={tw("flex flex-col gap-6 md:flex-row md:flex-wrap")}>
            {biodataMahasiswa.map(({ key, value }, index) => {
              const loopKey = `${index}`;

              return (
                <div className={tw("w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333333%-48px)]")} key={loopKey}>
                  <div className={tw("overflow-hidden", "py-0.5")}>
                    <Text.p
                      animated
                      size={"small"}
                      className={tw(["font-medium text-gray-2", "mb-1"])}
                      transition={{
                        delay: 0.2
                      }}
                    >
                      {key}
                    </Text.p>
                  </div>

                  <div className={tw("overflow-hidden", "py-0.5")}>
                    <Text.p
                      animated
                      className={tw("text-black", key === "Nama" && "capitalize")}
                      transition={{
                        delay: 0.3
                      }}
                    >
                      {value || "Loading..."}
                    </Text.p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={tw("pt-12")}>
          <div className={tw("overflow-hidden", "mb-4 py-0.5")}>
            <Heading.h2
              animated
              transition={{
                delay: 0.1
              }}
            >
              Riwayat Status Kuliah
            </Heading.h2>
          </div>

          <div className={tw("flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-6")}>
            {data?.datastatuskuliah.map(({ id_smt, sks_smt, nm_stat_mhs }) => {
              const isActive = nm_stat_mhs.toLowerCase() === "aktif";
              const dataStatus = [
                {
                  key: "Semester",
                  value: parseOddEven(id_smt)
                },
                {
                  key: "Total SKS",
                  value: `${sks_smt}`
                },
                {
                  key: "Status",
                  value: nm_stat_mhs
                }
              ];

              return (
                <div className={tw("w-full md:w-[calc(50%-16px)]", "overflow-hidden")} key={id_smt}>
                  <div className={tw("w-full", "p-4", "rounded border", "flex flex-col flex-wrap gap-4 lg:flex-row")}>
                    {dataStatus.map(({ key, value }) => (
                      <div className="w-full last:mb-0 lg:w-[calc(50%-16px)]" key={key}>
                        <div className={tw("overflow-hidden", "py-0.5")}>
                          <Text.p
                            animated
                            size={"small"}
                            transition={{
                              delay: 0.3
                            }}
                          >
                            {key}
                          </Text.p>
                        </div>

                        <div className={tw("overflow-hidden", "py-0.5")}>
                          <Text.p
                            animated
                            className={tw(
                              key === "Status"
                                ? Badge({
                                    variant: isActive ? "success" : "error",
                                    size: "small",
                                    className: ["inline-block", "font-medium"]
                                  })
                                : Text.Variant({
                                    className: ["text-black"]
                                  })
                            )}
                            transition={{
                              delay: 0.4
                            }}
                          >
                            {value || "Loading..."}
                          </Text.p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={tw("pt-12")}>
          <div className={tw("overflow-hidden", "mb-4 py-0.5")}>
            <Heading.h2
              animated
              transition={{
                delay: 0.1
              }}
            >
              Riwayat Studi
            </Heading.h2>
          </div>

          <div className={tw("flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-6")}>
            {dataStudi && dataStudi.length > 0 ? (
              <>
                {dataStudi?.map(({ id, data: subDataStudi }, index) => {
                  const isActive = activeDropdownIndex === index;

                  return (
                    <div
                      className={tw(
                        "w-full",
                        "rounded-md border",
                        "transition-all duration-300 ease-in-out",
                        isActive ? "" : "h-[56px]",
                        "overflow-hidden"
                      )}
                      key={id}
                    >
                      <div
                        className={tw(
                          "w-full",
                          isActive ? "cursor-not-allowed" : "cursor-pointer",
                          "p-4",
                          "rounded-t-md",
                          "bg-black text-white",
                          "flex items-center justify-between"
                        )}
                        onMouseDown={() => setActiveDropdownIndex(index)}
                      >
                        <Text.span className={tw("font-bold")}>{parseOddEven(id)}</Text.span>
                        <FiChevronDown
                          className={tw("transition-all duration-200 ease-in-out", isActive ? "rotate-180" : "")}
                        />
                      </div>

                      <div className="overflow-auto p-4">
                        <table
                          className={tw(
                            Text.Variant({
                              size: "small"
                            }),
                            "w-full table-auto",
                            "whitespace-nowrap"
                          )}
                        >
                          <thead className={tw("text-left font-bold text-black")}>
                            <tr>
                              <th className={tw("w-[60px]", "text-center", "px-4 py-2")}>No</th>
                              <th className={tw("w-[160px]", "px-4 py-2")}>Kode Mata Kuliah</th>
                              <th className={tw("px-4 py-2")}>Nama Mata Kuliah</th>
                              <th className={tw("px-4 py-2", "text-center")}>SKS</th>
                            </tr>
                          </thead>

                          <tbody>
                            {subDataStudi.map(({ kode_mk, nm_mk, sks_mk }, index) => (
                              <tr key={kode_mk}>
                                <td className={tw("w-[60px]", "text-center", "px-4 py-2")}>{index + 1}</td>
                                <td className={tw("w-[160px]", "px-4 py-2")}>{kode_mk}</td>
                                <td className={tw("px-4 py-2")}>{nm_mk}</td>
                                <td className={tw("px-4 py-2", "text-center")}>{sks_mk}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* <pre
                        className={Text.Variant({
                          size: "small",
                          className: "overflow-auto"
                        })}
                      >
                        {JSON.stringify(subDataStudi, null, 2)}
                      </pre> */}
                    </div>
                  );
                })}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<PageProps, { id: string }> = async ({ params }) => {
  const id = params?.id;
  const response = await MahasiswaServices.getDetailMahasiswa(id || "");

  console.log(response);

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
