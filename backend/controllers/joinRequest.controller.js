import JoinRequest from "../models/JoinRequest.js";
import asyncHandler from "../middleware/asyncHandler.js";

// POST — submit a join request (public)
export const createJoinRequest = asyncHandler(
  async (req, res) => {
    const { fullName, email, phone, role, message } =
      req.body;

    if (!fullName || !email || !phone || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const joinRequest = await JoinRequest.create({
      fullName,
      email,
      phone,
      role,
      message: message || "",
    });

    res.status(201).json({
      success: true,
      message: "Your request has been submitted successfully!",
      joinRequest,
    });
  }
);

// GET — list all join requests (admin only)
export const getJoinRequests = asyncHandler(
  async (req, res) => {
    const requests = await JoinRequest.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      requests,
    });
  }
);

// PUT — update status of a join request (admin only)
export const updateJoinRequestStatus = asyncHandler(
  async (req, res) => {
    const request = await JoinRequest.findById(
      req.params.id
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    request.status = req.body.status || request.status;

    await request.save();

    res.json({
      success: true,
      request,
    });
  }
);

// DELETE — remove a join request (admin only)
export const deleteJoinRequest = asyncHandler(
  async (req, res) => {
    await JoinRequest.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Request deleted",
    });
  }
);
