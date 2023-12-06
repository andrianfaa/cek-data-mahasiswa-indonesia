import { FetchAPI } from "@/lib/utils";
import { escape } from "html-escaper";

interface TKemdikbudMahasiswaResponse {
  text: string;
  "website-link": string;
}

export interface TMahasiswa {
  nama: string;
  nim: string;
  univ: string;
  prodi: string;
}

class MahasiswaServices {
  /**
   * Function to search for Mahasiswa by name or NIM/NPM
   * @param {String} query
   * @returns {ResponseAPI<TMahasiswa[]>}
   * @example
   * ```ts
   * try {
   *   const { data } = await Mahasiswa.search("Andrian");
   *
   *   data.map(({ nama, nim, univ, prodi }) => {
   *     console.log(nama, nim, univ, prodi);
   *   })
   * } catch (error) {
   *   ...
   * }
   * ```
   */
  static async search(query: string, sortBy?: keyof TMahasiswa): Promise<ResponseAPI<TMahasiswa[]>> {
    const escapedQuery = escape(query);
    const response = await FetchAPI<{ mahasiswa: TKemdikbudMahasiswaResponse[] }>(
      `${process.env.NEXT_APP_KEMDIKBUD_API_URL || "https://api-frontend.kemdikbud.go.id"}/hit_mhs/${escapedQuery}`,
      {
        method: "GET"
      }
    );

    const { mahasiswa = [] } = response.data;
    const formattedData: TMahasiswa[] = [];

    for (let i = 0; i < mahasiswa.length; i++) {
      const splittedData = mahasiswa[i].text.split(",");

      const [nama, nim] = splittedData[0].split(/\(|\)/gi) || ["_NAME_", "_NIM_"];
      const univ = splittedData[1].split(": ")[1]?.trim() || "_UNIV_";
      const prodi = splittedData[2].split(": ")[1]?.trim() || "_PRODI_";

      formattedData.push({
        nama,
        nim,
        univ,
        prodi
      });
    }

    if (sortBy) {
      formattedData.sort((data1, data2) => {
        if (data1[sortBy] < data2[sortBy]) return -1;
        if (data1[sortBy] > data2[sortBy]) return 1;
        return 0;
      });
    }

    return {
      status: response.status,
      message: response.statusText,
      data: formattedData,
      data_length: Array.isArray(formattedData) ? formattedData.length : undefined
    };
  }

  static async getDetailMahasiswa() {}
}

export default MahasiswaServices;
