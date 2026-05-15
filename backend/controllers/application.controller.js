import Application from "../models/Application.js";

// GET ALL (admin) — supports ?formType=volunteer filter
export const getApplications = async (req, res) => {
  try {
    const filter = {};
    if (req.query.formType) filter.formType = req.query.formType;

    const applications = await Application.find(filter).sort({ createdAt: -1 });

    res.json({ success: true, applications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE (public form submit)
export const createApplication = async (req, res) => {
  try {
    const {
      formType, name, aadharNo, dob, address,
      mobileNo, emailId, occupation, reference,
      department, membershipFees,
    } = req.body;

    const photo = req.file ? req.file.filename : "";

    const application = await Application.create({
      formType, name, aadharNo, dob, address,
      mobileNo, emailId, occupation, reference,
      department, membershipFees, photo,
    });

    res.status(201).json({ success: true, application });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE STATUS (admin)
export const updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, application });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE (admin)
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
