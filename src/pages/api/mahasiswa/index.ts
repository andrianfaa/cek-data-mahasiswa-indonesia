/* eslint-disable @typescript-eslint/no-explicit-any */
import MahasiswaServices, { type TMahasiswa } from "@/services/mahasiswa";
import { escape } from "html-escaper";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseAPI<TMahasiswa[]>>) {
  if (req.method === "POST") {
    const { query } = req.body;

    if (!query) {
      res.status(400).send({
        message: "NIM/NPM, Prodi or Mahasiswa Name is required!",
        status: 400
      });
      return;
    }

    try {
      const { status, message, data, data_length } = await MahasiswaServices.search(escape(query));

      res.status(status).send({
        status,
        message,
        data,
        data_length
      });
    } catch (error: any) {
      console.log(error);
      res.status(error.response.status || 500).send({
        status: error.response.status || 500,
        message: error.response.statusText || "error"
      });
    }
  }
}
