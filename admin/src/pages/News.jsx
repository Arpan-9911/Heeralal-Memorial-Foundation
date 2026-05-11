import React, { useEffect, useState } from "react";

import {
  getNewsPosts,
  createNewsPost,
  updateNewsPost,
  deleteNewsPost,
} from "../api/news.api";
import { toast } from "sonner";

const News = () => {
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] = useState(false);

  const [editing, setEditing] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const empty = {
    tag: "Press Release",
    date: "",
    titleEn: "",
    titleHi: "",
    image: null,
    preview: "",
  };

  const [form, setForm] = useState(empty);

  const inp =
    "w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]";

  // FETCH
  const fetchNews = async () => {
    try {
      setLoading(true);

      const data = await getNewsPosts();

      setItems(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // RESET
  const reset = () => {
    setForm(empty);

    setEditing(null);

    setShowForm(false);
  };

  // SAVE
  const save = async () => {
    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("tag", form.tag);

      formData.append("date", form.date);

      formData.append("titleEn", form.titleEn);

      formData.append("titleHi", form.titleHi);

      if (form.image) {
        formData.append("image", form.image);
      }

      // UPDATE
      if (editing) {
        const updated = await updateNewsPost(editing, formData);

        setItems((prev) => prev.map((i) => (i._id === editing ? updated : i)));
      }

      // CREATE
      else {
        const created = await createNewsPost(formData);

        setItems((prev) => [created, ...prev]);
      }

      reset();
      toast.success(`Post ${editing ? "updated" : "created"}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save post");
    } finally {
      setUploading(false);
    }
  };

  // DELETE
  const del = async (id) => {
    const confirmDelete = window.confirm("Delete this post?");

    if (!confirmDelete) return;

    try {
      await deleteNewsPost(id);

      setItems((prev) => prev.filter((i) => i._id !== id));
      toast.success("Post deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post");
    }
  };

  return (
    <div className="space-y-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--admin-muted)]">
          {items.length} post
          {items.length !== 1 && "s"}
        </p>

        <button
          onClick={() => {
            reset();
            setShowForm(true);
          }}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-maroon)] text-white"
        >
          + Add Post
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white rounded-xl border border-[var(--admin-border)] p-5 space-y-4">
          <h3 className="text-sm font-bold">{editing ? "Edit" : "New"} Post</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--admin-muted)]">
                Tag
              </label>

              <select
                value={form.tag}
                onChange={(e) =>
                  setForm({
                    ...form,
                    tag: e.target.value,
                  })
                }
                className={inp}
              >
                <option>Press Release</option>

                <option>Event</option>

                <option>Update</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--admin-muted)]">
                Date
              </label>

              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({
                    ...form,
                    date: e.target.value,
                  })
                }
                className={inp}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--admin-muted)]">
                Upload Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file) {
                    setForm({
                      ...form,
                      image: file,
                      preview: URL.createObjectURL(file),
                    });
                  }
                }}
                className={inp}
              />
            </div>
          </div>

          {form.preview && (
            <img
              src={form.preview}
              alt=""
              className="w-40 h-28 rounded-lg object-cover border"
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--admin-muted)]">
                Title (EN)
              </label>

              <input
                value={form.titleEn}
                onChange={(e) =>
                  setForm({
                    ...form,
                    titleEn: e.target.value,
                  })
                }
                className={inp}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--admin-muted)]">
                Title (HI)
              </label>

              <input
                value={form.titleHi}
                onChange={(e) =>
                  setForm({
                    ...form,
                    titleHi: e.target.value,
                  })
                }
                className={inp}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={save}
              disabled={uploading}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-accent)] text-black"
            >
              {uploading ? "Saving..." : editing ? "Update" : "Add"}
            </button>

            <button
              onClick={reset}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-100 text-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* POSTS */}
      {loading ? (
        <div className="py-10 text-center text-sm text-gray-400">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl border border-[var(--admin-border)] overflow-hidden"
            >
              <div className="relative h-40">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/news/${p.image}`}
                  alt=""
                  className="w-full h-full object-cover"
                />

                <span className="absolute top-2 left-2 text-[10px] font-bold bg-[var(--admin-accent-light)] text-black px-2 py-0.5 rounded">
                  {p.tag}
                </span>
              </div>

              <div className="p-4">
                <p className="text-[10px] text-[var(--admin-muted)] uppercase tracking-wide">
                  {p.date}
                </p>

                <h4 className="text-sm font-bold mt-1">{p.title?.en}</h4>

                <p className="text-xs text-[var(--admin-muted)]">
                  {p.title?.hi}
                </p>

                <div className="flex gap-1.5 mt-3">
                  <button
                    onClick={() => {
                      setEditing(p._id);

                      setShowForm(true);

                      setForm({
                        tag: p.tag,
                        date: p.date,
                        titleEn: p.title?.en,
                        titleHi: p.title?.hi,
                        image: null,
                        preview: `${import.meta.env.VITE_BACKEND_URL}/uploads/news/${p.image}`,
                      });
                    }}
                    className="px-2.5 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => del(p._id)}
                    className="px-2.5 py-1 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
