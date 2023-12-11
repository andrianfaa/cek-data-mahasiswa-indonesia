import { FetchAPI } from "@/lib/utils";
import { escape } from "html-escaper";

interface TKemdikbudMahasiswaResponse {
  text: string;
  "website-link": string;
}

export interface TMahasiswa {
  id: string;
  nama: string;
  nim: string;
  univ: string;
  prodi: string;
}

export interface TDetailMahasiswa {
  datastatuskuliah: {
    id_smt: string;
    sks_smt: number;
    nm_stat_mahasiswa: string;
  }[];
  datastudi: {
    kode_mk: string;
    nama_mk: string;
    sks_mk: string;
    id_smt: string;
    nilai_huruf: null;
  }[];
  dataumum: {
    nm_pd: string;
    jk: string;
    nipd: string;
    namapt: string;
    namajenjang: string;
    namaprodi: string;
    reg_pd: string;
    mulai_smt: string;
    nm_jns_daftar: string;
    nm_pt_asal: null;
    nm_prodi_asal: null;
    ket_keluar: null;
    tgl_keluar: null;
    no_seri_ijazah: null;
    sert_prof: null;
    link_pt: string;
    link_prodi: string;
  };
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
      `${process.env.NEXT_APP_KEMDIKBUD_API_URL || ""}/hit_mhs/${escapedQuery}`,
      {
        method: "GET"
      }
    );

    const { mahasiswa = [] } = response.data;
    const formattedData: TMahasiswa[] = [];

    for (let i = 0; i < mahasiswa.length; i++) {
      const splittedData = mahasiswa[i].text.split(",");
      const id = mahasiswa[i]["website-link"].split(/\//gi)[2];

      const [nama, nim] = splittedData[0].split(/\(|\)/gi) || ["_NAME_", "_NIM_"];
      const univ = splittedData[1].split(": ")[1]?.trim() || "_UNIV_";
      const prodi = splittedData[2].split(": ")[1]?.trim() || "_PRODI_";

      formattedData.push({
        id,
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
      data_length: formattedData.length
    };
  }

  /**
   * Get detail of Mahasiswa
   * @param {String} id Mahasiswa detail ID
   * @returns {Promise<ResponseAPI<TDetailMahasiswa>>}
   */
  static async getDetailMahasiswa(id: string): Promise<ResponseAPI<TDetailMahasiswa>> {
    const escapedQuery = escape(id);
    const response = await FetchAPI<TDetailMahasiswa>(
      `${process.env.NEXT_APP_KEMDIKBUD_API_URL || ""}/detail_mhs/${escapedQuery}`,
      {
        method: "GET"
      }
    );

    if (response.data?.dataumum.nm_pd) {
      return {
        status: response.status,
        message: response.statusText,
        data: response.data
      };
    }

    return {
      status: 404,
      message: "Not Found"
    };
  }
}

export default MahasiswaServices;
