"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminProfilePage() {
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/admin/adminlogin");
        return;
      }
      setAdminName(localStorage.getItem("adminUserName") || "Admin");
      setAdminEmail(localStorage.getItem("adminUserEmail") || "admin@example.com");
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 mb-2">
            <Image
              src="/avter.png"
              alt="Admin Avatar"
              width={128}
              height={128}
              className="rounded-full border-4 border-blue-400 shadow-lg object-cover"
              priority
            />
          </div>
          <h2 className="mt-2 text-2xl font-bold text-gray-800">{adminName}</h2>
          <p className="text-gray-500">Administrator</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Name</label>
            <div className="mt-1 p-2 bg-gray-100 rounded">{adminName}</div>
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <div className="mt-1 p-2 bg-gray-100 rounded">{adminEmail}</div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("adminToken");
                localStorage.removeItem("adminUserName");
                localStorage.removeItem("adminUserEmail");
                router.push("/admin/adminlogin");
              }
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
