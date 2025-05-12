'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/alluser');
      const data = await res.json();

      if (Array.isArray(data.users)) {
        setUsers(data.users);
      } else if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error('Invalid user data format:', data);
        setUsers([]);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setUsers([]);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch('/api/alluser', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (res.ok) {
        fetchUsers();
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/bblog.webp')" }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold drop-shadow-lg">
          User Management Dashboard
        </h1>
      </div>

      {/* User Table Section */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">All Registered Users</h2>
          <p className="text-lg text-gray-600">
            Total Registered Users: <span className="font-bold text-indigo-600">{users.length}</span>
          </p>
        </div>

        <div className="overflow-auto shadow-xl rounded-xl">
          <table className="min-w-full bg-white rounded-xl overflow-hidden text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">User ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Registered At</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 border-t">{user._id}</td>
                    <td className="px-4 py-3 border-t">{user.userName}</td>
                    <td className="px-4 py-3 border-t">{user.email}</td>
                    <td className="px-4 py-3 border-t">{formatDate(user.createdAt)}</td>
                    <td className="px-4 py-3 border-t text-center">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-full transition"
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
