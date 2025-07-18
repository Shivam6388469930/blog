"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Users, FileText, MessageSquare } from "lucide-react";

export default function Page() {
  const [userName, setUserName] = useState("");
  const [userCount, setUserCount] = useState(0);
  const [articleCount, setArticleCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/admin/adminlogin");
        return false;
      }
      const name = localStorage.getItem("adminUserName");
      setUserName(name || "Admin");
      return true;
    };

    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const usersRes = await fetch("/api/adminuser");
        const usersData = await usersRes.json();
        if (usersRes.ok && usersData.users) {
          setUserCount(usersData.users.length);
        }

        const articlesRes = await fetch("/api/allarticle");
        const articlesData = await articlesRes.json();
        if (articlesRes.ok && articlesData.articles) {
          setArticleCount(articlesData.articles.length);
        }

        const commentsRes = await fetch("/api/allcomment");
        const commentsData = await commentsRes.json();
        if (commentsRes.ok) {
          setCommentCount(Array.isArray(commentsData) ? commentsData.length : 0);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      const isAuthenticated = checkAuth();
      if (isAuthenticated) {
        fetchDashboardData();
      }
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Hero Banner */}
        <div className="mb-10 bg-gradient-to-r from-blue-500 to-green-400 text-white p-8 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
            <p className="text-sm">Monitor your platform, manage content, and stay in control.</p>
          </div>
          <Image
            src="/bblog.webp"
            alt="Dashboard Illustration"
            width={224}
            height={160}
            className="w-40 mt-4 md:mt-0 md:w-56"
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome back, <span className="text-emerald-600">{userName}</span> 👋
        </h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Total Users" value={userCount} color="bg-blue-100" />
          <Card title="Total Articles" value={articleCount} color="bg-green-100" />
          <Card title="Total Comments" value={commentCount} color="bg-yellow-100" />
        </div>

        {/* Quick Links */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickLink href="/admin/alluser" title="Manage Users" />
            <QuickLink href="/admin/allarticle.js" title="Manage Articles" />
            <QuickLink href="/admin/allcomment" title="Manage Comments" />
            <QuickLink href="/admin/adminDashboard" title="Blog Dashboard" />
          </div>
        </div>

        {/* Visual Summary Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500">📊 Coming Soon: Graphical overview of platform activity.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Card Component with Icons
function Card({ title, value, color }) {
  const iconMap = {
    "Total Users": <Users className="w-6 h-6 text-blue-600" />,
    "Total Articles": <FileText className="w-6 h-6 text-green-600" />,
    "Total Comments": <MessageSquare className="w-6 h-6 text-yellow-600" />,
  };

  return (
    <div className={`rounded-xl shadow-md ${color} p-6 flex items-center space-x-4`}>
      <div>{iconMap[title]}</div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="mt-1 text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

// Quick Link Component
function QuickLink({ href, title }) {
  return (
    <a
      href={href}
      className="block p-4 bg-white rounded-lg shadow hover:shadow-md hover:scale-105 transition-transform border border-gray-200 hover:border-blue-300"
    >
      <p className="font-medium text-gray-800">{title}</p>
    </a>
  );
}
