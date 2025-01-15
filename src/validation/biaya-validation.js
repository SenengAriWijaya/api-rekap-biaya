import Joi from "joi";

const createBiayaValidation = Joi.object({
  tanggal: Joi.string().max(50).required(),
  kebutuhan: Joi.array()
    .min(1)
    .items(
      Joi.object({
        tanggal: Joi.string().max(50).required(),
        nama: Joi.string().max(100),
        jumlah: Joi.number().integer().min(1).required(),
      })
    ),
  // user_id: Joi.number().integer().required(),
});

const getBiayaValidation = Joi.string().max(100).required();

const getBiayaByIDValidation = Joi.number().positive().required();

const deleteKebutuhanByBiayaValidation = Joi.object({
  biayaId: Joi.number().integer().required(),
  kebutuhanId: Joi.number().integer().required(),
});

const getKebutuhanByIDValidation = Joi.number().integer().positive().required();

export {
  createBiayaValidation,
  getBiayaValidation,
  getBiayaByIDValidation,
  deleteKebutuhanByBiayaValidation,
  getKebutuhanByIDValidation,
};
