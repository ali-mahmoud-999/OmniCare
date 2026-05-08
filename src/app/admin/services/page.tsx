"use client";

import { useState, useEffect } from "react";
import { getServices, createService, deleteService } from "./actions";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [iconLink, setIconLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [featuresEnText, setFeaturesEnText] = useState("");
  const [featuresArText, setFeaturesArText] = useState("");

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

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const featuresEn = featuresEnText.split(",").map(f => f.trim()).filter(f => f.length > 0);
    const featuresAr = featuresArText.split(",").map(f => f.trim()).filter(f => f.length > 0);
    
    await createService({ 
      titleEn, titleAr, descriptionEn, descriptionAr, iconLink, 
      imageUrl: imageUrl || undefined, 
      featuresEn, 
      featuresAr 
    });
    
    setTitleEn("");
    setTitleAr("");
    setDescriptionEn("");
    setDescriptionAr("");
    setIconLink("");
    setImageUrl("");
    setFeaturesEnText("");
    setFeaturesArText("");
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this service?")) {
      await deleteService(id);
      fetchServices();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-navy">Manage Services</h1>

      <form onSubmit={handleCreate} className="mb-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <h2 className="text-xl font-semibold mb-2 border-b pb-2">Add New Service</h2>
        
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
          <div>
            <label className="block text-sm font-medium mb-1">Icon Link (SVG or Lucide Name)</label>
            <input type="text" className="w-full rounded border-gray-300 p-2 border" value={iconLink} onChange={(e) => setIconLink(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL (For background)</label>
            <input type="text" className="w-full rounded border-gray-300 p-2 border" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
          </div>
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
          Add Service
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative flex flex-col">
            {service.imageUrl && (
              <img src={service.imageUrl} alt="Service" className="w-full h-32 object-cover" />
            )}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-bold text-lg mb-2">{service.titleEn} | {service.titleAr}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.descriptionEn}</p>
              
              {service.featuresEn && service.featuresEn.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-1">Features</h4>
                  <ul className="text-sm list-disc pl-4 text-gray-600">
                    {service.featuresEn.map((f: string, i: number) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              )}
              
              <button 
                onClick={() => handleDelete(service.id)} 
                className="mt-auto bg-red-50 text-red-600 px-4 py-2 rounded font-medium hover:bg-red-100 transition w-full"
              >
                Delete Service
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
