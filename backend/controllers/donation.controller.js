import DonateConfig from "../models/DonateConfig.js";
import Donation from "../models/Donation.js";
import asyncHandler from "../middleware/asyncHandler.js";

/* ───────── DONATE CONFIG (singleton) ───────── */

// GET — public: fetch QR + bank details
export const getDonateConfig = asyncHandler(
  async (req, res) => {
    let config = await DonateConfig.findOne();
    if (!config) {
      config = await DonateConfig.create({});
    }
    res.json({ success: true, config });
  }
);

// PUT — admin: update QR + bank details
export const updateDonateConfig = asyncHandler(
  async (req, res) => {
    let config = await DonateConfig.findOne();
    if (!config) {
      config = await DonateConfig.create({});
    }

    const fields = [
      "upiId",
      "accountName",
      "bankName",
      "accountNo",
      "ifscCode",
      "branch",
    ];

    fields.forEach((f) => {
      if (req.body[f] !== undefined) {
        config[f] = req.body[f];
      }
    });

    if (req.file) {
      config.qrImage = req.file.filename;
    }

    await config.save();
    res.json({ success: true, config });
  }
);

/* ───────── DONATIONS (submissions) ───────── */

// POST — public: donor submits payment confirmation
export const createDonation = asyncHandler(
  async (req, res) => {
    const { fullName, email, phone, amount, utrNumber, paymentMode, message } =
      req.body;

    if (!fullName || !email || !phone || !amount || !utrNumber) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const donation = await Donation.create({
      fullName,
      email,
      phone,
      amount,
      utrNumber,
      paymentMode: paymentMode || "upi",
      message: message || "",
      screenshot: req.file ? req.file.filename : "",
    });

    res.status(201).json({
      success: true,
      message: "Donation recorded successfully!",
      donation,
    });
  }
);

// GET — admin: list all donations
export const getDonations = asyncHandler(
  async (req, res) => {
    const donations = await Donation.find().sort({
      createdAt: -1,
    });
    res.json({ success: true, donations });
  }
);

// PUT — admin: update donation status
export const updateDonationStatus = asyncHandler(
  async (req, res) => {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }
    donation.status = req.body.status || donation.status;
    await donation.save();
    res.json({ success: true, donation });
  }
);

// DELETE — admin: remove a donation record
export const deleteDonation = asyncHandler(
  async (req, res) => {
    await Donation.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Donation deleted" });
  }
);
