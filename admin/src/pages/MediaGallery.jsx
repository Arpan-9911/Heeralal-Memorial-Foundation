import React, { useState } from "react";

const mockImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=400", alt: "City skyline" },
  { id: 2, src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400", alt: "Nature landscape" },
  { id: 3, src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=400", alt: "Urban architecture" },
  { id: 4, src: "https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=400", alt: "Road through mountains" },
];

const mockVideo = { thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400", captionEn: "Documentary: Journey of Change (2023-24)", captionHi: "डॉक्यूमेंट्री: बदलाव की यात्रा (2023-24)", videoUrl: "" };

const MediaGallery = () => {
  const [images, setImages] = useState(mockImages);
  const [video, setVideo] = useState(mockVideo);
  const [showImgForm, setShowImgForm] = useState(false);
  const [imgForm, setImgForm] = useState({ src: "", alt: "" });
  const [editingVideo, setEditingVideo] = useState(false);

  const addImage = () => { if (imgForm.src) { setImages(p => [...p, { ...imgForm, id: Date.now() }]); setImgForm({ src: "", alt: "" }); setShowImgForm(false); } };
  const delImage = (id) => setImages(p => p.filter(i => i.id !== id));
  const inp = "w-full px-3 py-2 text-sm border border-[var(--admin-border)] rounded-lg outline-none focus:border-[var(--admin-accent)]";

  return (
    <div className="space-y-6">
      {/* Gallery Section */}
      <div className="bg-white rounded-xl border border-[var(--admin-border)] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold">Press Gallery ({images.length} images)</h3>
          <button onClick={() => setShowImgForm(!showImgForm)} className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-maroon)] text-white hover:bg-[var(--admin-maroon-light)]">+ Add Image</button>
        </div>
        {showImgForm && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg flex flex-col sm:flex-row gap-3">
            <input value={imgForm.src} onChange={e => setImgForm({ ...imgForm, src: e.target.value })} placeholder="Image URL" className={inp + " flex-1"} />
            <input value={imgForm.alt} onChange={e => setImgForm({ ...imgForm, alt: e.target.value })} placeholder="Alt text" className={inp + " sm:w-48"} />
            <button onClick={addImage} className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-accent)] text-black">Add</button>
          </div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map(img => (
            <div key={img.id} className="relative group rounded-lg overflow-hidden border border-[var(--admin-border)]">
              <img src={img.src} alt={img.alt} className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => delImage(img.id)} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 text-white">Delete</button>
              </div>
              <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] px-2 py-1 truncate">{img.alt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-white rounded-xl border border-[var(--admin-border)] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold">Video Resource</h3>
          <button onClick={() => setEditingVideo(!editingVideo)} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-gray-200">{editingVideo ? "Cancel" : "Edit"}</button>
        </div>
        {editingVideo ? (
          <div className="space-y-3">
            <div className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">Thumbnail URL</label><input value={video.thumbnail} onChange={e => setVideo({ ...video, thumbnail: e.target.value })} className={inp} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">Caption (EN)</label><input value={video.captionEn} onChange={e => setVideo({ ...video, captionEn: e.target.value })} className={inp} /></div>
              <div className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">Caption (HI)</label><input value={video.captionHi} onChange={e => setVideo({ ...video, captionHi: e.target.value })} className={inp} /></div>
            </div>
            <div className="space-y-1"><label className="text-xs font-medium text-[var(--admin-muted)]">Video URL (YouTube/Embed)</label><input value={video.videoUrl} onChange={e => setVideo({ ...video, videoUrl: e.target.value })} className={inp} /></div>
            <button onClick={() => setEditingVideo(false)} className="px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--admin-accent)] text-black">Save</button>
          </div>
        ) : (
          <div className="flex gap-4 items-start">
            <img src={video.thumbnail} alt="" className="w-48 h-28 rounded-lg object-cover border border-[var(--admin-border)]" />
            <div>
              <p className="text-sm font-medium">{video.captionEn}</p>
              <p className="text-xs text-[var(--admin-muted)]">{video.captionHi}</p>
              {video.videoUrl && <p className="text-xs text-blue-600 mt-2 break-all">{video.videoUrl}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;
