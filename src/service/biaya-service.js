import { validate } from "../validation/validation.js";
import {
  createBiayaValidation,
  getBiayaByIDValidation,
  getBiayaValidation,
  getKebutuhanByIDValidation,
} from "../validation/biaya-validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import moment from "moment-timezone";

const createBiayaService = async (user, request) => {
  // Validasi data masuk
  const validateBiaya = validate(createBiayaValidation, request);

  if (!validateBiaya) {
    throw new ResponseError(400, "Invalid request");
  }

  validateBiaya.username = user.username;

  // Cek apakah ada data Biaya dengan tanggal yang sama untuk user ini
  const biaya = await prismaClient.biaya.findFirst({
    where: {
      user_id: user.id,
      tanggal: validateBiaya.tanggal,
    },
    include: {
      kebutuhan: true, // Ambil data kebutuhan yang sudah ada
    },
  });

  if (!biaya) {
    // Jika tidak ada Biaya dengan tanggal tersebut, buat Biaya baru
    const createBiaya = await prismaClient.biaya.create({
      data: {
        tanggal: validateBiaya.tanggal,
        user_id: user.id,
        kebutuhan: {
          create: validateBiaya.kebutuhan.map((kebutuhan) => ({
            nama: kebutuhan.nama,
            jumlah: kebutuhan.jumlah,
          })),
        },
      },
      include: {
        kebutuhan: true,
      },
    });
    console.log(createBiaya);
    return createBiaya;
  }

  // Jika ada Biaya dengan tanggal tersebut, cek apakah ada Kebutuhan dengan nama yang sama
  for (let i = 0; i < validateBiaya.kebutuhan.length; i++) {
    const kebutuhan = validateBiaya.kebutuhan[i];

    const findKebutuhan = biaya.kebutuhan.find(
      (existingKebutuhan) => existingKebutuhan.nama === kebutuhan.nama
    );

    if (findKebutuhan) {
      // Jika Kebutuhan dengan nama yang sama ditemukan, update jumlahnya
      const updatedKebutuhan = await prismaClient.kebutuhan.update({
        where: {
          id: findKebutuhan.id, // Update berdasarkan ID Kebutuhan yang ada
        },
        data: {
          jumlah: findKebutuhan.jumlah + kebutuhan.jumlah, // Tambahkan jumlah yang baru
        },
      });

      console.log("Updated Kebutuhan:", updatedKebutuhan);
    } else {
      // Jika Kebutuhan dengan nama yang sama tidak ditemukan, buat Kebutuhan baru
      const newKebutuhan = await prismaClient.kebutuhan.create({
        data: {
          nama: kebutuhan.nama,
          jumlah: kebutuhan.jumlah,
          biaya_id: biaya.id, // Hubungkan dengan Biaya yang ada
        },
      });

      console.log("New Kebutuhan:", newKebutuhan);
    }
  }

  // Setelah melakukan update atau create, kembalikan Biaya yang telah terupdate
  const updatedBiaya = await prismaClient.biaya.findUnique({
    where: {
      id: biaya.id,
    },
    include: {
      kebutuhan: true,
    },
  });

  return updatedBiaya;
};

const getAllBiayaService = async (username) => {
  username = validate(getBiayaValidation, username);
  // validateBiaya.username = user.username;
  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
  });

  console.log(user);
  // return user;

  if (!user) {
    throw new ResponseError(404, "user not found");
  }
  const biaya = await prismaClient.biaya.findMany({
    where: {
      user_id: user.id,
    },
    include: {
      kebutuhan: true,
    },
  });

  if (!biaya || biaya.length === 0) {
    throw new ResponseError(404, "No biaya data found for the user");
  }
  console.log(biaya);
  return biaya;
};

const getBiayaByIdService = async (user, biayaId) => {
  biayaId = validate(getBiayaByIDValidation, biayaId);
  const biaya = await prismaClient.biaya.findUnique({
    where: {
      id: biayaId,
      user_id: user.id,
    },
    include: {
      kebutuhan: true,
    },
  });

  if (!biaya || biaya.length === 0) {
    throw new ResponseError(404, "No biaya data found for the user");
  }
  return biaya;
};

const removeBiayaService = async (user, biayaId, kebutuhanId) => {
  biayaId = validate(getBiayaByIDValidation, biayaId);
  kebutuhanId = validate(getKebutuhanByIDValidation, kebutuhanId);
  // kebutuhanId = validate(getBiayaByIDValidation, kebutuhanId);
  const biaya = await prismaClient.biaya.findUnique({
    where: {
      id: biayaId,
      user_id: user.id,
    },
    include: {
      kebutuhan: true,
    },
  });

  if (!biaya) {
    throw new ResponseError(404, "No biaya data found for the user");
  }

  const kebutuhan = biaya.kebutuhan.find((item) => item.id === kebutuhanId);
  console.log(kebutuhan);

  if (!kebutuhan) {
    throw new ResponseError(404, "No kebutuhan data found for the user");
  }
  await prismaClient.kebutuhan.delete({
    where: {
      id: kebutuhanId,
    },
  });

  // return {
  //   message: "Kebutuhan deleted successfully",
  //   deletedKebutuhan: kebutuhan,
  // };
  return kebutuhan;
};

export default {
  createBiayaService,
  getAllBiayaService,
  getBiayaByIdService,
  removeBiayaService,
};
