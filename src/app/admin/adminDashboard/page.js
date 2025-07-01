'use client';

import { useEffect, useState } from "react";

export default function Page() {
  const [articles, setArticles] = useState([]);
  const [views, setViews] = useState(1500); // Placeholder for views
  const [comments, setComments] = useState(12); // Placeholder for comments

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      const userEmail = localStorage.getItem("adminUserEmail");
      if (!userEmail) return;

      try {
        const res = await fetch(`/api/admin_detail?userEmail=${userEmail}`);
        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          if (res.ok) {
            setArticles(data.articles || []);
            setViews(data.totalViews || 1500);
            setComments(data.totalComments || 12);
            setError(null);
          } else {
            setError(`Failed to fetch articles: ${data.message || "Unknown error"}`);
          }
        } else {
          const text = await res.text();
          setError("Unexpected response from server.");
        }
      } catch (error) {
        setError(`Error fetching articles: ${error.message}`);
      }
    };

    fetchArticles();
  }, []);

  const handleEdit = (article) => {
    setCurrentArticle(article);
    setEditModalOpen(true);
  };

  const handleDelete = (article) => {
    setCurrentArticle(article);
    setDeleteModalOpen(true);
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    const updatedArticle = {
      title: currentArticle.title,
      description: currentArticle.description,
    };

    try {
      const res = await fetch(`/api/admin_detail/?id=${currentArticle._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedArticle),
      });

      const data = await res.json();

      if (res.ok) {
        setArticles((prev) =>
          prev.map((article) =>
            article._id === currentArticle._id ? data.article : article
          )
        );
        setEditModalOpen(false);
        setError(null);
      } else {
        setError(`Update failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      setError(`Error updating article: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/admin_detail/?id=${currentArticle._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        setArticles((prev) =>
          prev.filter((article) => article._id !== currentArticle._id)
        );
        setDeleteModalOpen(false);
        setError(null);
      } else {
        setError(`Delete failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      setError(`Error deleting article: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { name: "Total Articles", number: articles.length, growth: "+6 From Last Month" },
    { name: "Total Comments", number: comments, growth: "+4 From Last Month" },
    { name: "Total Views", number: views, growth: "+200 From Last Month" },
  ];

  return (
    <div className="p-6 w-full mb-5 bg-gray-50">
      <div className="p-6 border-2 border-gray-200 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between mb-3 gap-3">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Admin Blog Dashboard</h3>
            <p className="text-gray-600">Manage your content and analytics</p>
          </div>
          <a href="/admin/adminblog">
            <button className="px-6  cursor-pointer py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 w-full sm:w-auto">
              New +
            </button>
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <p className="text-lg font-semibold text-gray-800">{card.name}</p>
              <p className="text-2xl font-bold text-gray-700">{card.number}</p>
              <p className="text-green-500 text-sm">{card.growth}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                {["Title", "Status", "Comments", "Date", "Actions"].map((head) => (
                  <th key={head} className="py-3 px-6 text-sm text-left">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No articles found.
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article._id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-6">{article.title}</td>
                    <td className="py-3 px-6 text-green-600">Published</td>
                    <td className="py-3 px-6">--</td>
                    <td className="py-3 px-6">{new Date(article.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => handleEdit(article)}
                        className="text-blue-500 hover:text-blue-700 font-semibold"
                      >
                        Edit
                      </button>{" "}
                      |{" "}
                      <button
                        onClick={() => handleDelete(article)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500 text-white p-4 mt-6 rounded-lg shadow-md">
          {error}
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold mb-4">Edit Article</h3>
            <input
              type="text"
              value={currentArticle.title}
              onChange={(e) =>
                setCurrentArticle((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 rounded mb-4"
              placeholder="Title"
            />
            <textarea
              value={currentArticle.description}
              onChange={(e) =>
                setCurrentArticle((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 rounded mb-4"
              placeholder="Description"
              rows="4"
            ></textarea>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this article?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
