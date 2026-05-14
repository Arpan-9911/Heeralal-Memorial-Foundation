import Settings from "../models/Settings.js";
import asyncHandler from "../middleware/asyncHandler.js";

const initialSettings = {
  general: [
    { key: "orgName", label: "Organisation Name", value: "Heeralal Memorial Foundation" },
    { key: "taglineEn", label: "Tagline (EN)", value: "Committed to Equality, Empowerment, and Sustainable Change" },
    { key: "taglineHi", label: "Tagline (HI)", value: "स्वतंत्रता, उपयोगीता और संरक्षित बदलाव के लिये" },
    { key: "copyright", label: "Copyright Text", value: "© 2023-2024 Heeralal Memorial Foundation. All rights reserved." },
    { key: "managedBy", label: "Managed By", value: "Website Content Managed by SurPanix" },
  ],
  registration: [
    { key: "cin", label: "CIN", value: "U88900DL2023NPL416329" },
    { key: "regDate", label: "Registration Date", value: "June 29, 2023" },
    { key: "pan", label: "PAN", value: "AACH0000F" },
    { key: "rocNo", label: "ROC No.", value: "ITRA/DXM/S/ROC/..." },
    { key: "ngoReg", label: "NGO Reg No", value: "DL/2023/..." },
  ],
  contact: [
    { key: "email", label: "Email", value: "admin@hlmf.org.in" },
    { key: "phone", label: "Phone", value: "+91 11-2345XXXX" },
    { key: "addressEn", label: "Address (EN)", value: "12/4B Institutional Area, New Delhi - 110001" },
    { key: "addressHi", label: "Address (HI)", value: "12/4B संस्थागत क्षेत्र, नई दिल्ली - 110001" },
    { key: "officeEn", label: "Office Label (EN)", value: "Central Delhi Office:" },
    { key: "officeHi", label: "Office Label (HI)", value: "मध्य दिल्ली कार्यालय:" },
  ],
};

export const getSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create(initialSettings);
  }
  res.status(200).json({ success: true, settings });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const { general, registration, contact } = req.body;

  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create(initialSettings);
  }

  if (general) settings.general = general;
  if (registration) settings.registration = registration;
  if (contact) settings.contact = contact;

  await settings.save();

  res.status(200).json({ success: true, settings });
});
