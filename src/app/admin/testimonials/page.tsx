"use client";

import { useState, useEffect } from "react";
import { getTestimonials, createTestimonial, deleteTestimonial } from "./actions";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [clientName, setClientName] = useState("");
  const [feedbackEn, setFeedbackEn] = useState("");
  const [feedbackAr, setFeedbackAr] = useState("");
  const [areaEn, setAreaEn] = useState("");
  const [areaAr, setAreaAr] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error("Database connection failed on testimonials page:", error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTestimonial({ clientName, feedbackEn, feedbackAr, areaEn, areaAr, rating });
    setClientName("");
    setFeedbackEn("");
    setFeedbackAr("");
    setAreaEn("");
    setAreaAr("");
    setRating(5);
    fetchTestimonials();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this testimonial?")) {
      await deleteTestimonial(id);
      fetchTestimonials();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Testimonials</h1>

      <form onSubmit={handleCreate} className="mb-8 bg-white p-4 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold mb-2">Add New Testimonial</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Client Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Area (English)</label>
            <input
              type="text"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
              value={areaEn}
              onChange={(e) => setAreaEn(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Area (Arabic)</label>
            <input
              type="text"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border text-right"
              value={areaAr}
              onChange={(e) => setAreaAr(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Feedback (English)</label>
            <textarea
              className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
              rows={3}
              value={feedbackEn}
              onChange={(e) => setFeedbackEn(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Feedback (Arabic)</label>
            <textarea
              className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border text-right"
              rows={3}
              value={feedbackAr}
              onChange={(e) => setFeedbackAr(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Testimonial
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((test) => (
          <div key={test.id} className="bg-white p-4 rounded shadow relative">
            <h3 className="font-bold">{test.clientName}</h3>
            <p className="text-sm text-gray-500 mb-2">{test.areaEn} | {test.areaAr} - {test.rating} Stars</p>
            <p className="text-gray-700 italic">"{test.feedbackEn}"</p>
            <p className="text-gray-700 italic text-right" dir="rtl">"{test.feedbackAr}"</p>
            <button 
              onClick={() => handleDelete(test.id)} 
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
