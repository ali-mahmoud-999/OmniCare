"use client";

import { useState, useEffect, useRef } from "react";
import { getServices, createService, deleteService, updateService } from "./actions";
import { ImageUploader } from "@/components/ImageUploader";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [iconLink, setIconLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [featuresEnText, setFeaturesEnText] = useState("");
  const [featuresArText, setFeaturesArText] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data || []);
    } catch (error) {
      console.error("Failed to fetch Services:", error);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitleEn("");
    setTitleAr("");
    setDescriptionEn("");
    setDescriptionAr("");
    setIconLink("");
    setImageUrl("");
    setFeaturesEnText("");
    setFeaturesArText("");
  };

  const handleEdit = (service: any) => {
    setEditingId(service.id);
    setTitleEn(service.titleEn);
    setTitleAr(service.titleAr);
    setDescriptionEn(service.descriptionEn);
    setDescriptionAr(service.descriptionAr);
    setIconLink(service.iconLink || "");
    setImageUrl(service.imageUrl || "");
    setFeaturesEnText(service.featuresEn ? service.featuresEn.join(", ") : "");
    setFeaturesArText(service.featuresAr ? service.featuresAr.join(", ") : "");
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const featuresEn = featuresEnText.split(",").map(f => f.trim()).filter(f => f.length > 0);
    const featuresAr = featuresArText.split(",").map(f => f.trim()).filter(f => f.length > 0);
    
    const payload = { 
      titleEn, titleAr, descriptionEn, descriptionAr, iconLink, 
      imageUrl: imageUrl || "", 
      featuresEn, 
      featuresAr 
    };

    if (editingId) {
      await updateService(editingId, payload);
    } else {
      await createService(payload);
    }
    
    resetForm();
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this service?")) {
      await deleteService(id);
      if (editingId === id) resetForm();
      fetchServices();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-navy">Manage Services</h1>

      <form ref={formRef} onSubmit={handleSubmit} className="mb-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div className="flex justify-between items-center mb-2 border-b pb-2">
          <h2 className="text-xl font-semibold">{editingId ? "Edit Service" : "Add New Service"}</h2>
          {editingId && (
            <button type="button" onClick={resetForm} className="text-sm text-blue-600 hover:underline">
              Cancel Edit
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Service Title (English)</label>
            <input type="text" className="w-full rounded border-gray-300 p-2 border" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Service Title (Arabic)</label>
            <input type="text" className="w-full rounded border-gray-300 p-2 border text-right" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-1">Service Image</label>
            <div className="flex-grow">
              <ImageUploader value={imageUrl} onChange={setImageUrl} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Icon Link (SVG or Lucide Name)</label>
            <input type="text" className="w-full rounded border-gray-300 p-2 border mb-4" value={iconLink} onChange={(e) => setIconLink(e.target.value)} placeholder="e.g. Activity, Heart" />
            
            <label className="block text-sm font-medium mb-1">Description (English)</label>
            <textarea className="w-full rounded border-gray-300 p-2 border mb-4" rows={3} value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} required />
            
            <label className="block text-sm font-medium mb-1">Description (Arabic)</label>
            <textarea className="w-full rounded border-gray-300 p-2 border text-right" rows={3} value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Features (English) - Comma separated</label>
            <textarea className="w-full rounded border-gray-300 p-2 border" rows={2} value={featuresEnText} onChange={(e) => setFeaturesEnText(e.target.value)} placeholder="Vital signs, Post-surgical care..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Features (Arabic) - Comma separated</label>
            <textarea className="w-full rounded border-gray-300 p-2 border text-right" rows={2} value={featuresArText} onChange={(e) => setFeaturesArText(e.target.value)} placeholder="متابعة المؤشرات الحيوية, رعاية بعد الجراحة..." />
          </div>
        </div>

        <button type="submit" className="bg-navy text-white px-6 py-3 rounded font-bold hover:bg-navy/90 transition">
          {editingId ? "Update Service" : "Add Service"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative flex flex-col">
            {service.imageUrl && (
              <img src={service.imageUrl} alt="Service" className="w-full h-40 object-cover" />
            )}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-bold text-lg mb-2">{service.titleEn} | {service.titleAr}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.descriptionEn}</p>
              
              <div className="mt-auto flex gap-2 pt-4 border-t border-gray-50">
                <button 
                  onClick={() => handleEdit(service)} 
                  className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded font-medium hover:bg-blue-100 transition"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(service.id)} 
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
