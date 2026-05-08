"use client";

import { useState, useEffect } from "react";
import { getFAQs, createFAQ, deleteFAQ } from "./actions";

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [questionEn, setQuestionEn] = useState("");
  const [questionAr, setQuestionAr] = useState("");
  const [answerEn, setAnswerEn] = useState("");
  const [answerAr, setAnswerAr] = useState("");

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    let faqs: any[] = [];
  try {
    faqs = await prisma.fAQ.findMany({
      orderBy: { id: "asc" }
    });
  } catch (error) {
    console.error("Database connection failed on faqs page:", error);
  };
    setFaqs(data);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createFAQ({ questionEn, questionAr, answerEn, answerAr });
    setQuestionEn("");
    setQuestionAr("");
    setAnswerEn("");
    setAnswerAr("");
    fetchFAQs();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this FAQ?")) {
      await deleteFAQ(id);
      fetchFAQs();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage FAQs</h1>

      <form onSubmit={handleCreate} className="mb-8 bg-white p-4 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold mb-2">Add New FAQ</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Question (English)</label>
            <input
              type="text"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
              value={questionEn}
              onChange={(e) => setQuestionEn(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Question (Arabic)</label>
            <input
              type="text"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border text-right"
              value={questionAr}
              onChange={(e) => setQuestionAr(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Answer (English)</label>
            <textarea
              className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
              rows={3}
              value={answerEn}
              onChange={(e) => setAnswerEn(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Answer (Arabic)</label>
            <textarea
              className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border text-right"
              rows={3}
              value={answerAr}
              onChange={(e) => setAnswerAr(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add FAQ
        </button>
      </form>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div className="w-full mr-4">
              <h3 className="font-bold">{faq.questionEn}</h3>
              <p className="text-gray-600 text-sm mb-2">{faq.answerEn}</p>
              <h3 className="font-bold text-right" dir="rtl">{faq.questionAr}</h3>
              <p className="text-gray-600 text-sm text-right" dir="rtl">{faq.answerAr}</p>
            </div>
            <button onClick={() => handleDelete(faq.id)} className="text-red-500 hover:text-red-700 shrink-0">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
