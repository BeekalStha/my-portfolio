'use client';
import React, { useState } from "react";
import { publicApi } from "../../../../../libs/api/axios";


const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitSuccess(false);

    if (!form.name || !form.email || !form.message) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await publicApi.post("contact", form);

      // optional: handle response success more precisely
      setForm({ name: '', email: '', message: '' });
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 4000);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg p-8 rounded-2xl border border-bd shadow-xl max-w-lg w-full mx-auto">
      <h2 className="text-2xl font-semibold text-fg mb-6">Send a Message</h2>

      {submitSuccess && (
        <div className="flex items-center gap-2 mb-4 px-4 py-3 bg-green-100 text-green-700 border border-green-200 rounded-lg">
          
          <span>Message sent successfully!</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 mb-4 px-4 py-3 bg-red-100 text-red-700 border border-red-200 rounded-lg">
         
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-bd rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-bd rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-bd rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Write your message..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 font-medium text-white rounded-lg transition duration-200 ${
            loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
