"use client";

import { useState, useEffect } from "react";
import { getSpecialties, createSpecialty, deleteSpecialty } from "./actions";

export default function SpecialtiesPage() {
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchSpecialties = async () => {
    try {
      const data = await getSpecialties();
      setSpecialties(data || []);
    } catch (error) {
      console.error("Failed to fetch Specialties:", error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createSpecialty({ 
      titleEn, titleAr, descriptionEn, descriptionAr, 
      imageUrl: imageUrl || undefined, 
    });
    
    setTitleEn("");
    setTitleAr("");
    setDescriptionEn("");
    setDescriptionAr("");
    setImageUrl("");
    fetchSpecialties();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this specialty?")) {
      await deleteSpecialty(id);
      fetchSpecialties();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-navy">Manage Medical Specialties</h1>

      <form onSubmit={handleCreate} className="mb-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <h2 className="text-xl font-semibold mb-2 border-b pb-2">Add New Specialty</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Specialty Title (English)</label>
            <input type="text" className="w-full rounded border-gray-300 p-2 border" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Specialty Title (Arabic)</label>
            <input type="text" className="w-full rounded border-gray-300 p-2 border text-right" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input type="text" className="w-full rounded border-gray-300 p-2 border" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Description (English)</label>
            <textarea className="w-full rounded border-gray-300 p-2 border" rows={3} value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description (Arabic)</label>
            <textarea className="w-full rounded border-gray-300 p-2 border text-right" rows={3} value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} required />
          </div>
        </div>

        <button type="submit" className="bg-navy text-white px-6 py-3 rounded font-bold hover:bg-navy/90 transition">
          Add Specialty
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialties.map((specialty) => (
          <div key={specialty.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative flex flex-col">
            {specialty.imageUrl && (
              <img src={specialty.imageUrl} alt="Specialty" className="w-full h-32 object-cover" />
            )}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-bold text-lg mb-2">{specialty.titleEn} | {specialty.titleAr}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{specialty.descriptionEn}</p>
              
              <button 
                onClick={() => handleDelete(specialty.id)} 
                className="mt-auto bg-red-50 text-red-600 px-4 py-2 rounded font-medium hover:bg-red-100 transition w-full"
              >
                Delete Specialty
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
