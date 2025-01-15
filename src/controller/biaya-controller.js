import biayaService from "../service/biaya-service.js";

const createBiayaController = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await biayaService.createBiayaService(user, request);
    res.status(201).json({
      message: "Biaya created successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getAllBiayaController = async (req, res, next) => {
  try {
    const result = await biayaService.getAllBiayaService(req.user.username);
    res.status(200).json({
      data: result,
      message: "Biaya retrieved successfully",
    });
  } catch (e) {
    next(e);
  }
};

const getBiayaByIdController = async (req, res, next) => {
  try {
    const user = req.user;
    const biayaId = req.params.biayaId;
    const result = await biayaService.getBiayaByIdService(user, biayaId);
    res.status(200).json({
      data: result,
      message: "Biaya retrieved successfully",
    });
  } catch (e) {
    next(e);
  }
};

const removeBiayaController = async (req, res, next) => {
  try {
    const user = req.user;
    const { biayaId, kebutuhanId } = req.params;
    const result = await biayaService.removeBiayaService(
      user,
      biayaId,
      kebutuhanId
    );
    res.status(200).json({
      message: "Biaya deleted successfully",
      // deletedKebutuhan: result.deletedKebutuhan,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  createBiayaController,
  getAllBiayaController,
  getBiayaByIdController,
  removeBiayaController,
};
