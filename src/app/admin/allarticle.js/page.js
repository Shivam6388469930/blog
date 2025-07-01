'use client';
import { useEffect, useState } from 'react';

export default function AllArticlesPage() {
  if(!localStorage.getItem('adminToken')){
     window.location.href = "/admin/adminlogin";
  }
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    const res = await fetch('/api/allarticle');
    const data = await res.json();
    console.log("Fetched Articles:", data);

    if (Array.isArray(data)) {
      setArticles(data);
    } else if (Array.isArray(data.articles)) {
      setArticles(data.articles);
    } else {
      console.error("Unexpected response format:", data);
      setArticles([]);
    }
  };

  const deleteArticle = async (id) => {
    const res = await fetch('/api/allarticle', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });

    if (res.ok) fetchArticles(); // Refresh
  };

  const getShortDescription = (text) => {
    const words = text.split(' ');
    return words.slice(0, 70).join(' ') + (words.length > 70 ? '...' : '');
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/bblog.webp')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <h1 className="relative z-10 text-white text-4xl md:text-5xl font-bold">Manage All Articles</h1>
      </div>

      {/* Admin Actions */}
      <div className="max-w-6xl mx-auto mt-8 px-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Post Blog by Users</h3>
          <p className="text-gray-500">Manage your content and track your reach</p>
        </div>
        <a href="/new_article">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition">
            + New Article
          </button>
        </a>
      </div>

      {/* Articles Table */}
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">All Blogs: {articles.length}</h2>
        <div className="overflow-auto rounded-lg shadow">
          <table className="min-w-full bg-white text-sm rounded-xl overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">User Email</th>
                <th className="p-4">Title</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(articles) && articles.length > 0 ? (
                articles.map(article => (
                  <tr key={article._id} className="hover:bg-gray-50 transition">
                    <td className="p-4 border-t text-gray-700">{article._id}</td>
                    <td className="p-4 border-t text-gray-700">{article.userEmail}</td>
                    <td className="p-4 border-t font-medium text-gray-800">{article.title}</td>
                    <td className="p-4 border-t text-gray-600">
                      {getShortDescription(article.description)}
                    </td>
                    <td className="p-4 border-t text-center">
                      <button
                        onClick={() => deleteArticle(article._id)}
                        className="text-red-500 hover:text-red-700 font-medium transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
