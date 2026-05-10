import React, {
  useEffect,
  useState,
} from "react";

import {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncements,
  updateAnnouncement,
} from "../api/announcement.api";

const typeLabels = {
  event: "Event",

  press_release:
    "Press Release",
};

const typeColors = {
  event:
    "bg-blue-100 text-blue-700",

  press_release:
    "bg-purple-100 text-purple-700",
};

const Announcements = () => {
  const [items, setItems] =
    useState([]);

  const [editing, setEditing] =
    useState(null);

  const [showForm, setShowForm] =
    useState(false);

  const [filter, setFilter] =
    useState("all");

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      type: "event",

      title: {
        en: "",
        hi: "",
      },

      excerpt: {
        en: "",
        hi: "",
      },

      date: "",

      active: true,
    });

  /* FETCH */

  const fetchAnnouncements =
    async () => {
      const res =
        await getAnnouncements();

      setItems(
        res.announcements ||
          []
      );
    };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  /* RESET */

  const resetForm = () => {
    setForm({
      type: "event",

      title: {
        en: "",
        hi: "",
      },

      excerpt: {
        en: "",
        hi: "",
      },

      date: "",

      active: true,
    });

    setEditing(null);

    setShowForm(false);
  };

  /* EDIT */

  const handleEdit = (
    item
  ) => {
    setEditing(item._id);

    setShowForm(true);

    setForm({
      type: item.type,

      title: {
        en:
          item.title?.en ||
          "",

        hi:
          item.title?.hi ||
          "",
      },

      excerpt: {
        en:
          item.excerpt?.en ||
          "",

        hi:
          item.excerpt?.hi ||
          "",
      },

      date:
        item.date?.split(
          "T"
        )[0],

      active:
        item.active,
    });
  };

  /* SAVE */

  const handleSave =
    async () => {
      try {
        setLoading(true);

        const payload = {
          type: form.type,

          titleEn:
            form.title.en,

          titleHi:
            form.title.hi,

          excerptEn:
            form.excerpt.en,

          excerptHi:
            form.excerpt.hi,

          date: form.date,

          active:
            form.active,
        };

        if (editing) {
          await updateAnnouncement(
            editing,
            payload
          );
        } else {
          await createAnnouncement(
            payload
          );
        }

        fetchAnnouncements();

        resetForm();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  /* DELETE */

  const handleDelete =
    async (id) => {
      await deleteAnnouncement(
        id
      );

      fetchAnnouncements();
    };

  /* ACTIVE */

  const toggleActive =
    async (item) => {
      await updateAnnouncement(
        item._id,
        {
          type: item.type,

          titleEn:
            item.title?.en,

          titleHi:
            item.title?.hi,

          excerptEn:
            item.excerpt?.en,

          excerptHi:
            item.excerpt?.hi,

          date:
            item.date,

          active:
            !item.active,
        }
      );

      fetchAnnouncements();
    };

  const filtered =
    items.filter(
      (i) =>
        filter === "all" ||
        i.type === filter
    );

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">
            Announcements
          </h1>

          <p className="text-sm text-[var(--admin-muted)] mt-1">
            Manage news,
            notices &
            events
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();

            setShowForm(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-[var(--admin-maroon)] text-white text-sm font-semibold"
        >
          + Add Announcement
        </button>
      </div>

      {/* FILTERS */}

      <div className="flex gap-2 flex-wrap">
        {[
          "all",
          "event",
          "press_release",
        ].map((f) => (
          <button
            key={f}
            onClick={() =>
              setFilter(f)
            }
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f
                ? "bg-[var(--admin-maroon)] text-white"
                : "bg-white border border-[var(--admin-border)]"
            }`}
          >
            {f === "all"
              ? "All"
              : typeLabels[f]}
          </button>
        ))}
      </div>

      {/* FORM */}

      {showForm && (
        <div className="bg-white rounded-2xl border border-[var(--admin-border)] p-6 space-y-5">
          <h2 className="font-bold">
            {editing
              ? "Edit Announcement"
              : "Create Announcement"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={
                form.type
              }
              onChange={(e) =>
                setForm({
                  ...form,

                  type: e
                    .target
                    .value,
                })
              }
              className="px-4 py-3 rounded-xl border border-[var(--admin-border)]"
            >
              <option value="event">
                Event
              </option>

              <option value="press_release">
                Press Release
              </option>
            </select>

            <input
              type="date"
              value={
                form.date
              }
              onChange={(e) =>
                setForm({
                  ...form,

                  date: e
                    .target
                    .value,
                })
              }
              className="px-4 py-3 rounded-xl border border-[var(--admin-border)]"
            />

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={
                  form.active
                }
                onChange={(
                  e
                ) =>
                  setForm({
                    ...form,

                    active:
                      e
                        .target
                        .checked,
                  })
                }
              />

              Active
            </label>
          </div>

          {/* TITLES */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Title English"
              value={
                form.title.en
              }
              onChange={(e) =>
                setForm({
                  ...form,

                  title: {
                    ...form.title,

                    en: e
                      .target
                      .value,
                  },
                })
              }
              className="px-4 py-3 rounded-xl border border-[var(--admin-border)]"
            />

            <input
              placeholder="Title Hindi"
              value={
                form.title.hi
              }
              onChange={(e) =>
                setForm({
                  ...form,

                  title: {
                    ...form.title,

                    hi: e
                      .target
                      .value,
                  },
                })
              }
              className="px-4 py-3 rounded-xl border border-[var(--admin-border)]"
            />
          </div>

          {/* EXCERPTS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea
              rows={4}
              placeholder="Excerpt English"
              value={
                form.excerpt.en
              }
              onChange={(e) =>
                setForm({
                  ...form,

                  excerpt:
                    {
                      ...form.excerpt,

                      en: e
                        .target
                        .value,
                    },
                })
              }
              className="px-4 py-3 rounded-xl border border-[var(--admin-border)] resize-none"
            />

            <textarea
              rows={4}
              placeholder="Excerpt Hindi"
              value={
                form.excerpt.hi
              }
              onChange={(e) =>
                setForm({
                  ...form,

                  excerpt:
                    {
                      ...form.excerpt,

                      hi: e
                        .target
                        .value,
                    },
                })
              }
              className="px-4 py-3 rounded-xl border border-[var(--admin-border)] resize-none"
            />
          </div>

          {/* ACTIONS */}

          <div className="flex gap-3">
            <button
              disabled={loading}
              onClick={
                handleSave
              }
              className="px-5 py-2.5 rounded-xl bg-[var(--admin-accent)] font-semibold"
            >
              {loading
                ? "Saving..."
                : editing
                  ? "Update"
                  : "Create"}
            </button>

            <button
              onClick={
                resetForm
              }
              className="px-5 py-2.5 rounded-xl bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* LIST */}

      <div className="space-y-4">
        {filtered.map(
          (item) => (
            <div
              key={item._id}
              className={`bg-white rounded-2xl border p-5 ${
                item.active
                  ? "border-[var(--admin-border)]"
                  : "border-dashed border-gray-300 opacity-70"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* CONTENT */}

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${typeColors[item.type]}`}
                    >
                      {
                        typeLabels[
                          item
                            .type
                        ]
                      }
                    </span>

                    <span className="text-xs text-[var(--admin-muted)]">
                      {new Date(
                        item.date
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  {/* ENGLISH */}

                  <div className="mb-4">
                    <h2 className="text-lg font-bold">
                      {
                        item.title
                          ?.en
                      }
                    </h2>

                    <p className="text-sm text-gray-600">
                      {
                        item
                          .excerpt
                          ?.en
                      }
                    </p>
                  </div>

                  {/* HINDI */}

                  <div className="mt-1">
                    <h3 className="font-semibold">
                      {
                        item.title
                          ?.hi
                      }
                    </h3>

                    <p className="text-sm text-gray-500">
                      {
                        item
                          .excerpt
                          ?.hi
                      }
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="flex lg:flex-col gap-2">
                  <button
                    onClick={() =>
                      toggleActive(
                        item
                      )
                    }
                    className={`px-3 py-2 rounded-xl text-xs font-bold ${
                      item.active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.active
                      ? "Active"
                      : "Inactive"}
                  </button>

                  <button
                    onClick={() =>
                      handleEdit(
                        item
                      )
                    }
                    className="px-3 py-2 rounded-xl bg-gray-100 text-xs"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        item._id
                      )
                    }
                    className="px-3 py-2 rounded-xl bg-red-50 text-red-600 text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Announcements;