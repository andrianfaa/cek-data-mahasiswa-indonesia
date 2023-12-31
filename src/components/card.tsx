import { tw } from "@/lib/helpers";
import type { TMahasiswa } from "@/services/mahasiswa";

interface CardProps extends TMahasiswa {
  className?: string;
}

function Card({ nama, nim, prodi, univ, className }: CardProps) {
  const data = [
    {
      key: "Nama",
      value: nama
    },
    {
      key: "NIM",
      value: nim
    },
    {
      key: "Kampus",
      value: univ
    },
    {
      key: "Prodi",
      value: prodi
    }
  ];

  return (
    <div
      className={tw(
        className,
        "rounded border border-gray-4 hover:border-black-1 focus:border-black-1",
        "cursor-pointer",
        "hover:shadow-lg focus:shadow-lg",
        "group transition-all duration-300 ease-in-out"
      )}
    >
      <div id={`card-body-${nim}`} className={tw("p-4", "flex flex-col items-start justify-start", "w-full")}>
        <table>
          <tbody>
            {data.map(({ key, value }, index) => {
              const loopKey = `${index}`;

              return (
                <tr key={loopKey} className={tw("w-full", "text-sm md:text-base")}>
                  <td className={tw("px-4 py-2")}>{key}</td>
                  <td>:</td>
                  <td
                    className={tw("px-4 py-2", key === "Nama" && "group-hover:text-black-1 group-focus:text-black-1")}
                  >
                    {value}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Card;
