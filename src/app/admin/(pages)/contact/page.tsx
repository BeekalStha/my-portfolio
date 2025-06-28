'use client';
import React, { useEffect, useState } from "react";
import { publicApi } from "../../../../../libs/api/axios";

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchContact = async () => {
    try {
      const response = await publicApi.get("contact");
      setContacts(response.data?.data || []);
    } catch (err) {
      setError("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <div className="min-h-screen w-full bg-bg p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-fg mb-6">Contact Messages</h2>

        {loading && !contacts.length ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-accent"></div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-lg">
            {error}
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400 text-center py-12 text-lg">
            No messages yet
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((item) => (
              <div
                key={item.id}
                className="border-l-4 border-accent p-5 bg-card dark:bg-gray-900/50 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 h-full flex flex-col"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-fg">{item.name}</h3>
                  {item.created_at && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <p className="text-sm text-accent mb-3">{item.email}</p>
                <p className="text-gray-700 dark:text-gray-300 text-base flex-grow whitespace-pre-wrap">
                  {item.message}
                </p>
                {/* <div className="mt-4 pt-2 border-t border-bd dark:border-gray-700">
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Received: {new Date(item.created_at || '').toLocaleString()}
                  </p>
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;