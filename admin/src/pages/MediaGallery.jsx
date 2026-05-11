import React, { useEffect, useState } from "react";

import {
  getGalleryImages,
  uploadGalleryImage,
  deleteGalleryImage,
  saveGalleryVideo,
  deleteGalleryVideo,
} from "../api/media.api";

import { toast } from "sonner";

const MediaGallery = () => {
  const [images, setImages] = useState([]);

  const [video, setVideo] = useState(null);

  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] = useState(false);

  const [showImgForm, setShowImgForm] = useState(false);

  const [editingVideo, setEditingVideo] = useState(false);

  const [imgForm, setImgForm] = useState({
    file: null,
    alt: "",
    preview: "",
  });

  const [videoForm, setVideoForm] = useState({
    file: null,
    preview: "",
    captionEn: "",
    captionHi: "",
  });

  const inp =
    "w-full px-3 py-2.5 text-sm border border-[var(--admin-border)] rounded-xl outline-none focus:border-[var(--admin-accent)] bg-white";

  // ================= FETCH =================

  const fetchData = async () => {
    try {
      setLoading(true);

      const data = await getGalleryImages();
      setImages(data?.media?.images || []);

      setVideo(data?.media?.video || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= IMAGE =================

  const addImage = async () => {
    try {
      if (!imgForm.file) {
        alert("Please select image");

        return;
      }

      setUploading(true);

      const formData = new FormData();

      formData.append("image", imgForm.file);

      formData.append("alt", imgForm.alt);

      const data = await uploadGalleryImage(formData);

      setImages((prev) => [data.image, ...prev]);

      setImgForm({
        file: null,
        alt: "",
        preview: "",
      });

      setShowImgForm(false);

      toast.success("Image uploaded");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const delImage = async (id) => {
    const confirmDelete = window.confirm("Delete this image?");

    if (!confirmDelete) return;

    try {
      await deleteGalleryImage(id);

      setImages((prev) => prev.filter((i) => i._id !== id));
      toast.success("Image deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete image");
    }
  };

  // ================= VIDEO =================

  const saveVideoHandler = async () => {
    try {
      if (!videoForm.file && !video) {
        alert("Please upload video");

        return;
      }

      setUploading(true);

      const formData = new FormData();

      if (videoForm.file) {
        formData.append("video", videoForm.file);
      }

      formData.append("captionEn", videoForm.captionEn);

      formData.append("captionHi", videoForm.captionHi);

      const data = await saveGalleryVideo(formData);

      setVideo(data.video);

      setEditingVideo(false);

      toast.success("Video saved");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save video");
    } finally {
      setUploading(false);
    }
  };

  const removeVideo = async () => {
    const confirmDelete = window.confirm("Delete this video?");

    if (!confirmDelete) return;

    try {
      await deleteGalleryVideo();

      setVideo(null);
      toast.success("Video deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete video");
    }
  };

  return (
    <div className="space-y-6">
      {/* ================= IMAGES ================= */}

      <div className="bg-white rounded-3xl border border-[var(--admin-border)] shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--admin-border)]">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Press Gallery</h2>

            <p className="text-xs text-[var(--admin-muted)] mt-1">
              {images.length} uploaded images
            </p>
          </div>

          <button
            onClick={() => setShowImgForm(!showImgForm)}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-[var(--admin-maroon)] text-white hover:opacity-90 transition-all"
          >
            {showImgForm ? "Close" : "+ Add Image"}
          </button>
        </div>

        {/* Form */}
        {showImgForm && (
          <div className="p-5 border-b border-[var(--admin-border)] bg-gray-50/70">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Left */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Upload Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];

                      if (file) {
                        setImgForm({
                          ...imgForm,
                          file,
                          preview: URL.createObjectURL(file),
                        });
                      }
                    }}
                    className={`${inp} mt-2`}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Caption / Alt
                  </label>

                  <input
                    value={imgForm.alt}
                    onChange={(e) =>
                      setImgForm({
                        ...imgForm,
                        alt: e.target.value,
                      })
                    }
                    placeholder="Enter image caption"
                    className={`${inp} mt-2`}
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={addImage}
                    disabled={uploading}
                    className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-[var(--admin-accent)] hover:opacity-90 transition-all"
                  >
                    {uploading ? "Uploading..." : "Save Image"}
                  </button>

                  <button
                    onClick={() => setShowImgForm(false)}
                    className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-gray-200 hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Preview
                </label>

                <div className="mt-2 h-64 rounded-2xl overflow-hidden border border-dashed border-[var(--admin-border)] bg-white flex items-center justify-center">
                  {imgForm.preview ? (
                    <img
                      src={imgForm.preview}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-sm text-gray-400">Image preview</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="p-5">
          {loading ? (
            <div className="py-14 text-center text-sm text-gray-400">
              Loading gallery...
            </div>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {images.map((img) => (
                <div
                  key={img._id}
                  className="group relative rounded-2xl overflow-hidden border border-[var(--admin-border)] bg-white"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/uploads/media/images/${
                        img.image
                      }`}
                      alt={img.alt}
                      className="w-full h-52 object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                      <button
                        onClick={() => delImage(img._id)}
                        className="px-4 py-2 text-xs font-semibold rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="p-3">
                    <p className="text-xs text-gray-700 line-clamp-2">
                      {img.alt || "No caption"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-[var(--admin-border)] rounded-2xl py-16 text-center">
              <p className="text-sm text-gray-400">No images uploaded</p>
            </div>
          )}
        </div>
      </div>

      {/* ================= VIDEO ================= */}

      <div className="bg-white rounded-3xl border border-[var(--admin-border)] shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--admin-border)]">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Video Resource</h2>

            <p className="text-xs text-[var(--admin-muted)] mt-1">
              Only one video allowed
            </p>
          </div>

          <div className="flex gap-2">
            {video && (
              <button
                onClick={removeVideo}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all"
              >
                Delete
              </button>
            )}

            <button
              onClick={() => {
                setEditingVideo(!editingVideo);

                if (video) {
                  setVideoForm({
                    file: null,
                    preview: "",
                    captionEn: video.caption?.en || "",
                    captionHi: video.caption?.hi || "",
                  });
                }
              }}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 transition-all"
            >
              {video ? (editingVideo ? "Cancel" : "Edit Video") : "Add Video"}
            </button>
          </div>
        </div>

        {/* Form */}
        {editingVideo ? (
          <div className="p-5 space-y-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Upload Video
              </label>

              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file) {
                    setVideoForm({
                      ...videoForm,
                      file,
                      preview: URL.createObjectURL(file),
                    });
                  }
                }}
                className={`${inp} mt-2`}
              />
            </div>

            {videoForm.preview && (
              <video
                src={videoForm.preview}
                controls
                className="w-full max-w-xl h-64 rounded-2xl border border-[var(--admin-border)] object-cover"
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Caption English
                </label>

                <input
                  value={videoForm.captionEn}
                  onChange={(e) =>
                    setVideoForm({
                      ...videoForm,
                      captionEn: e.target.value,
                    })
                  }
                  className={`${inp} mt-2`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Caption Hindi
                </label>

                <input
                  value={videoForm.captionHi}
                  onChange={(e) =>
                    setVideoForm({
                      ...videoForm,
                      captionHi: e.target.value,
                    })
                  }
                  className={`${inp} mt-2`}
                />
              </div>
            </div>

            <button
              onClick={saveVideoHandler}
              disabled={uploading}
              className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-[var(--admin-accent)] hover:opacity-90 transition-all"
            >
              {uploading ? "Saving..." : "Save Video"}
            </button>
          </div>
        ) : video ? (
          <div className="p-5">
            <div className="flex flex-col xl:flex-row gap-5">
              {/* Video */}
              <div className="xl:w-[420px]">
                <video
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/media/video/${
                    video.file
                  }`}
                  controls
                  className="w-full h-64 rounded-2xl object-cover border border-[var(--admin-border)]"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="space-y-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-gray-400">
                      English Caption
                    </p>

                    <h3 className="text-lg font-bold text-gray-900 mt-1">
                      {video.caption?.en}
                    </h3>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-gray-400">
                      Hindi Caption
                    </p>

                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {video.caption?.hi}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-10">
            <div className="border border-dashed border-[var(--admin-border)] rounded-2xl py-16 text-center">
              <p className="text-sm text-gray-400">No video uploaded</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;
