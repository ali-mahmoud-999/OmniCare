"use client";

import { useState, useEffect, useRef } from "react";
import { getSpecialties, createSpecialty, deleteSpecialty, updateSpecialty } from "./actions";
import { ImageUploader } from "@/components/ImageUploader";

export default function SpecialtiesPage() {
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

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

  const resetForm = () => {
    setEditingId(null);
    setTitleEn("");
    setTitleAr("");
    setDescriptionEn("");
    setDescriptionAr("");
    setImageUrl("");
  };

  const handleEdit = (specialty: any) => {
    setEditingId(specialty.id);
    setTitleEn(specialty.titleEn);
    setTitleAr(specialty.titleAr);
    setDescriptionEn(specialty.descriptionEn);
    setDescriptionAr(specialty.descriptionAr);
    setImageUrl(specialty.imageUrl || "");
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { 
      titleEn, titleAr, descriptionEn, descriptionAr, 
      imageUrl: imageUrl || undefined, 
    };

    if (editingId) {
      await updateSpecialty(editingId, payload);
    } else {
      await createSpecialty(payload);
    }
    
    resetForm();
    fetchSpecialties();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this specialty?")) {
      await deleteSpecialty(id);
      if (editingId === id) resetForm();
      fetchSpecialties();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-navy">Manage Medical Specialties</h1>

      <form ref={formRef} onSubmit={handleSubmit} className="mb-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div className="flex justify-between items-center mb-2 border-b pb-2">
          <h2 className="text-xl font-semibold">{editingId ? "Edit Specialty" : "Add New Specialty"}</h2>
          {editingId && (
            <button type="button" onClick={resetForm} className="text-sm text-blue-600 hover:underline">
              Cancel Edit
            </button>
          )}
        </div>
        
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-1">Specialty Image</label>
            <div className="flex-grow">
              <ImageUploader value={imageUrl} onChange={setImageUrl} />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Description (English)</label>
              <textarea className="w-full rounded border-gray-300 p-2 border" rows={3} value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description (Arabic)</label>
              <textarea className="w-full rounded border-gray-300 p-2 border text-right" rows={3} value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} required />
            </div>
          </div>
        </div>

        <button type="submit" className="bg-navy text-white px-6 py-3 rounded font-bold hover:bg-navy/90 transition">
          {editingId ? "Update Specialty" : "Add Specialty"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialties.map((specialty) => (
          <div key={specialty.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative flex flex-col">
            {specialty.imageUrl && (
              <img src={specialty.imageUrl} alt="Specialty" className="w-full h-40 object-cover" />
            )}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-bold text-lg mb-2">{specialty.titleEn} | {specialty.titleAr}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{specialty.descriptionEn}</p>
              
              <div className="mt-auto flex gap-2 pt-4 border-t border-gray-50">
                <button 
                  onClick={() => handleEdit(specialty)} 
                  className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded font-medium hover:bg-blue-100 transition"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(specialty.id)} 
                  className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded font-medium hover:bg-red-100 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
