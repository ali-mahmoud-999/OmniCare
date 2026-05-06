"use client";

import { useState, useEffect } from "react";
import { saveSettings, getSettings } from "./actions";

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettings().then((data) => {
      if (data) setSettings(data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await saveSettings(settings);
    alert("Settings saved successfully!");
    setSaving(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl bg-white p-6 rounded shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Primary Phone</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            value={settings?.primaryPhone || ""}
            onChange={(e) => setSettings({ ...settings, primaryPhone: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">WhatsApp Link</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            value={settings?.whatsappLink || ""}
            onChange={(e) => setSettings({ ...settings, whatsappLink: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Support Email</label>
          <input
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            value={settings?.supportEmail || ""}
            onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Office Address (English)</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            value={settings?.officeAddressEn || ""}
            onChange={(e) => setSettings({ ...settings, officeAddressEn: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Office Address (Arabic)</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-right"
            value={settings?.officeAddressAr || ""}
            onChange={(e) => setSettings({ ...settings, officeAddressAr: e.target.value })}
            dir="rtl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Promo Banner Text (English)</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            value={settings?.promoBannerTextEn || ""}
            onChange={(e) => setSettings({ ...settings, promoBannerTextEn: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Promo Banner Text (Arabic)</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-right"
            value={settings?.promoBannerTextAr || ""}
            onChange={(e) => setSettings({ ...settings, promoBannerTextAr: e.target.value })}
            dir="rtl"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 shadow-sm"
            checked={settings?.promoBannerActive || false}
            onChange={(e) => setSettings({ ...settings, promoBannerActive: e.target.checked })}
          />
          <label className="ml-2 text-sm font-medium text-gray-700">Promo Banner Active</label>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
