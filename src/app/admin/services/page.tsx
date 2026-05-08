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
    await createService({ titleEn, titleAr, descriptionEn, descriptionAr, iconLink });
    setTitleEn("");
    setTitleAr("");
    setDescriptionEn("");
    setDescriptionAr("");
    setIconLink("");
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this service?")) {
      await deleteService(id);
      fetchServices();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Services</h1>

      <form onSubmit={handleCreate} className="mb-8 bg-white p-4 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold mb-2">Add New Service</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Service Title (English)</label>
            <input
              type="text"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Service Title (Arabic)</label>
            <input
              type="text"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border text-right"
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Icon Link (SVG URL or Lucide Icon Name)</label>
          <input
            type="text"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
            value={iconLink}
            onChange={(e) => setIconLink(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Description (English)</label>
            <textarea
              className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
              rows={3}
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description (Arabic)</label>
            <textarea
              className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border text-right"
              rows={3}
              value={descriptionAr}
              onChange={(e) => setDescriptionAr(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Service
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-4 rounded shadow relative">
            <div className="mb-2 p-2 bg-gray-50 inline-block rounded">
              <span className="text-sm font-mono text-gray-500">Icon: {service.iconLink}</span>
            </div>
            <h3 className="font-bold text-lg">{service.titleEn} | {service.titleAr}</h3>
            <p className="text-gray-700 mt-2 text-sm">{service.descriptionEn}</p>
            <p className="text-gray-700 mt-2 text-sm text-right" dir="rtl">{service.descriptionAr}</p>
            <button 
              onClick={() => handleDelete(service.id)} 
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
