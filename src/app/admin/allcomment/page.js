'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkedAuth, setCheckedAuth] = useState(false);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const fetchComments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/allcomment');
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to fetch comments');
      if (Array.isArray(data)) {
        setComments(data);
      } else {
        throw new Error('Comments are not in the expected format');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/allcomment', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        if (!res.ok) throw new Error('Failed to delete comment');
        fetchComments();
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    // Only check localStorage on client
    if (typeof window !== "undefined") {
      if (!localStorage.getItem('adminToken')) {
        window.location.href = "/admin/adminlogin";
        return;
      }
      setCheckedAuth(true);
      fetchComments();
    }
  }, []);

  if (!checkedAuth) return null;
  return (
    <>
      {/* Hero Section */}
      <div
        className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/bblog.webp')" }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white drop-shadow">
          Manage Blog Comments
        </h1>
      </div>

      {/* Comments Table */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">All Comments</h2>

        {/* State Messages */}
        {isLoading && <p className="text-center text-lg text-indigo-600">Loading...</p>}
        {error && <p className="text-center text-red-600 font-medium">{error}</p>}

        <div className="overflow-auto shadow-md rounded-xl mt-4">
          <table className="min-w-full bg-white text-sm rounded-xl overflow-hidden">
            <thead className="bg-indigo-600 text-white text-left">
              <tr>
                <th className="px-4 py-3">Comment ID</th>
                <th className="px-4 py-3">Blog ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Comment</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No comments found.
                  </td>
                </tr>
              ) : (
                comments.map((c) => (
                  <tr key={c._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 border-t">{c._id}</td>
                    <td className="px-4 py-3 border-t">{c.product_id}</td>
                    <td className="px-4 py-3 border-t">{c.name}</td>
                    <td className="px-4 py-3 border-t">{c.text}</td>
                    <td className="px-4 py-3 border-t">{formatDate(c.createdAt)}</td>
                    <td className="px-4 py-3 border-t text-center">
                      <button
                        onClick={() => deleteComment(c._id)}
                        disabled={isLoading}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-full transition disabled:opacity-50"
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
    </>
  );
}
