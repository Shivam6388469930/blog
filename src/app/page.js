// // "use client";

// // import React, { useState, useEffect, useCallback } from "react";
// // import { motion } from "framer-motion";
// // import { useRouter } from "next/navigation";
// // import Image from "next/image";
// // import Navbar from "./component/Navbars";
// // import Footer from "./component/Footer";

// // const Page = () => {
// //   const [allArticles, setAllArticles] = useState([]);
// //   const [cards, setCards] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [totalPages, setTotalPages] = useState(1);

// //   const router = useRouter();

// //   useEffect(() => {
// //     const fetchArticles = async () => {
// //       try {
// //         const res = await fetch("/api/new_article");
// //         const data = await res.json();
// //         setAllArticles(data.articles || []);
// //       } catch (error) {
// //         console.error("Failed to fetch articles:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchArticles();
// //   }, []);

// //   const updateVisibleArticles = useCallback(
// //     (page = 1, query = "") => {
// //       const filtered = allArticles.filter(
// //         (card) =>
// //           card.title.toLowerCase().includes(query.toLowerCase()) ||
// //           card.description.toLowerCase().includes(query.toLowerCase())
// //       );

// //       setTotalPages(Math.ceil(filtered.length / 10));
// //       const paginated = filtered.slice((page - 1) * 10, page * 10);
// //       setCards(paginated);
// //     },
// //     [allArticles]
// //   );

// //   useEffect(() => {
// //     updateVisibleArticles(currentPage, searchQuery);
// //   }, [currentPage, searchQuery, updateVisibleArticles]);

// //   const handleRead = useCallback(
// //     (card) => {
// //       const encodedId = encodeURIComponent(card._id);
// //       router.push(`/comment?id=${encodedId}`);
// //     },
// //     [router]
// //   );

// //   const handleSearch = (e) => {
// //     setSearchQuery(e.target.value);
// //     setCurrentPage(1);
// //   };

// //   const handlePagination = (direction) => {
// //     if (direction === "next" && currentPage < totalPages) {
// //       setCurrentPage(currentPage + 1);
// //     } else if (direction === "prev" && currentPage > 1) {
// //       setCurrentPage(currentPage - 1);
// //     }
// //   };

// //   const handleClearSearch = () => {
// //     setSearchQuery("");
// //     setCurrentPage(1);
// //   };

// //   return (
// //     <main>
// //       <Navbar/>
// //       {/* Hero Section */ }
// //       <div
// //         className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center bg-center bg-cover"
// //         style={{ backgroundImage: "url('/bblog.webp')" }}
// //       >
// //         <div className="absolute inset-0 bg-black opacity-60"></div>
// //         <div className="relative text-center z-10 text-white">
// //           <motion.h1
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.8, ease: "easeOut" }}
// //             className="text-4xl md:text-5xl font-bold"
// //           >
// //             Welcome to Our Website
// //           </motion.h1>
// //           <p className="mt-2 text-lg md:text-xl">Discover amazing features and offers!</p>
// //           <button className="mt-4 px-6 py-2 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-200 transition">
// //             <a href="/user/articles"> Get Started</a>
           
// //           </button>
// //         </div>
// //       </div>

// //       {/* Blog Section */ }
// //       <section className="flex flex-col items-center p-6 bg-gray-100 mt-4">
// //         <motion.h1
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.8, ease: "easeOut" }}
// //           className="text-emerald-700 text-4xl md:text-5xl font-bold opacity-80"
// //         >
// //           Welcome to My Blog
// //         </motion.h1>
// //       </section> 

// //       {loading ? (
// //         <div className="flex justify-center items-center h-64">
// //           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
// //         </div>
// //       ) : cards.length === 0 ? (
// //         <div className="text-center text-gray-600">No articles found.</div>
// //       ) : (
// //         <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full mx-auto p-6">
// //           {cards.map((card, index) => (
// //             <motion.article
// //               key={card._id}
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
// //               className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
// //             >
// //               <div className="relative w-full h-40">
// //                 <Image
// //                   src={card.image || "https://via.placeholder.com/300x200"}
// //                   alt={card.title}
// //                   fill
// //                   className="object-cover rounded-lg"
// //                   sizes="(max-width: 768px) 100vw, 33vw"
// //                   priority={index < 6} // Optimize LCP for first few images
// //                 />
// //               </div>
// //               <h2 className="text-lg font-semibold text-gray-900 mt-4">
// //                 {card.title}
// //               </h2>
// //               <p className="text-gray-600 mt-2">
// //                 {card.description.length > 100
// //                   ? card.description.slice(0, 100) + "..."
// //                   : card.description}
// //               </p>
// //               <button
// //                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
// //                 onClick={() => handleRead(card)}
// //               >
// //                 Read More
// //               </button>
// //             </motion.article>
// //           ))}
         
// //         </section>
// //       )}
// //        <div className="flex justify-center mb-6">
// //        <a href="/user/articles">
// //         <button className="mt-4 px-4 py-2 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
// //            See All Articles
// //           </button>
// //         </a>
// //       </div>
// //       <Footer/>
     
// //     </main>
// //   );
// // };

// // export default Page;
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Navbar from "./component/Navbars";
// import Footer from "./component/Footer";

// const Page = () => {
//   const [allArticles, setAllArticles] = useState([]);
//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [totalPages, setTotalPages] = useState(1);

//   const router = useRouter();

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const res = await fetch("/api/new_article");
//         const data = await res.json();
//         setAllArticles(data.articles || []);
//       } catch (error) {
//         console.error("Failed to fetch articles:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchArticles();
//   }, []);

//   const updateVisibleArticles = useCallback(
//     (page = 1, query = "") => {
//       const filtered = allArticles.filter(
//         (card) =>
//           card.title.toLowerCase().includes(query.toLowerCase()) ||
//           card.description.toLowerCase().includes(query.toLowerCase())
//       );

//       setTotalPages(Math.ceil(filtered.length / 10));
//       const paginated = filtered.slice((page - 1) * 10, page * 10);
//       setCards(paginated);
//     },
//     [allArticles]
//   );

//   useEffect(() => {
//     updateVisibleArticles(currentPage, searchQuery);
//   }, [currentPage, searchQuery, updateVisibleArticles]);

//   const handleRead = useCallback(
//     (card) => {
//       const encodedId = encodeURIComponent(card._id);
//       router.push(`user/comment?id=${encodedId}`);
//     },
//     [router]
//   );

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1);
//   };

//   const handlePagination = (direction) => {
//     if (direction === "next" && currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     } else if (direction === "prev" && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleClearSearch = () => {
//     setSearchQuery("");
//     setCurrentPage(1);
//   };

//   return (
//     <main>
//       <Navbar/>
//       {/* Hero Section */ }
//       <div
//         className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center bg-center bg-cover"
//         style={{ backgroundImage: "url('/bblog.webp')" }}
//       >
//         <div className="absolute inset-0 bg-black opacity-60"></div>
//         <div className="relative text-center z-10 text-white">
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="text-4xl md:text-5xl font-bold"
//           >
//             Welcome to Our Website
//           </motion.h1>
//           <p className="mt-2 text-lg md:text-xl">Discover amazing features and offers!</p>
//           <button className="mt-4 px-6 py-2 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-200 transition">
//             <a href="/user/articles"> Get Started</a>
           
//           </button>
//         </div>
//       </div>

//       {/* Blog Section */ }
//       <section className="flex flex-col items-center p-6 bg-gray-100 mt-4">
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="text-emerald-700 text-4xl md:text-5xl font-bold opacity-80"
//         >
//           Welcome to My Blog
//         </motion.h1>
//       </section> 

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : cards.length === 0 ? (
//         <div className="text-center text-gray-600">No articles found.</div>
//       ) : (
//         <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full mx-auto p-6">
//           {cards.map((card, index) => (
//             <motion.article
//               key={card._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
//               className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
//             >
//               <div className="relative w-full h-40">
//                 <Image
//                   src={card.image || "https://via.placeholder.com/300x200"}
//                   alt={card.title}
//                   fill
//                   className="object-cover rounded-lg"
//                   sizes="(max-width: 768px) 100vw, 33vw"
//                   priority={index < 6} // Optimize LCP for first few images
//                 />
//               </div>
//               <h2 className="text-lg font-semibold text-gray-900 mt-4">
//                 {card.title}
//               </h2>
//               <p className="text-gray-600 mt-2">
//                 {card.description.length > 100
//                   ? card.description.slice(0, 100) + "..."
//                   : card.description}
//               </p>
//               <button
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                 onClick={() => handleRead(card)}
//               >
//                 Read More
//               </button>
//             </motion.article>
//           ))}
         
//         </section>
//       )}
//        <div className="flex justify-center mb-6">
//        <a href="/user/articles">
//         <button className="mt-4 px-4 py-2 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//            See All Articles
//           </button>
//         </a>
//       </div>
//       <Footer/>
     
//     </main>
//   );
// };

// export default Page;

"use client"
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "./component/Navbars";
import Footer from "./component/Footer";
import { ZoomIn } from "lucide-react";

const Page = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  const pageSize = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/new_article");
        const data = await res.json();
        setAllArticles(data.articles || []);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const updateVisibleArticles = useCallback(() => {
    let filtered = allArticles;

    if (searchQuery) {
      filtered = filtered.filter(
        (card) =>
          card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (card) => (card.category || "Uncategorized") === selectedCategory
      );
    }

    setTotalPages(Math.ceil(filtered.length / pageSize));
    const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    setCards(paginated);
  }, [allArticles, searchQuery, selectedCategory, currentPage]);

  useEffect(() => {
    updateVisibleArticles();
  }, [searchQuery, selectedCategory, currentPage, updateVisibleArticles]);

  const handleRead = (card) => {
    const encodedId = encodeURIComponent(card._id);
    router.push(`/user/comment?id=${encodedId}`);
  };

  const handlePagination = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Get all unique categories
  const categories = ["All", ...new Set(allArticles.map((a) => a.category || "Uncategorized"))];

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <div
        className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center bg-center bg-cover"
        style={{ backgroundImage: "url('/bblog.webp')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative text-center z-0 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold"
            
          >
            Welcome to Our Website
          </motion.h1>
          <p className="mt-2 text-lg md:text-xl">Discover amazing features and offers!</p>
          <a href="/user/articles">
            <button className="mt-4 px-6 py-2 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-200 transition">
              Get Started
            </button>
          </a>
        </div>
      </div>

      {/* Filter Controls */}
      <section className="flex flex-col items-center p-6 bg-gray-100 mt-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-emerald-700 text-4xl md:text-5xl font-bold opacity-80 mb-4"
        >
          Explore Our Blogs
        </motion.h1>

        {/* Search & Filter UI */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl justify-between items-center">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md"
          />

          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-1/4 p-2 border border-gray-300 rounded-md"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Blog Cards */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : cards.length === 0 ? (
        <div className="text-center text-gray-600 mt-6">No articles found.</div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full mx-auto p-6">
          {cards.map((card, index) => (
            <motion.article
              key={card._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform flex flex-col justify-between h-full"
            >
              <div>
                <div className="relative w-full h-40">
                  <Image
                    src={card.image || "https://via.placeholder.com/300x200"}
                    alt={card.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mt-4">{card.title}</h2>
                <p className="text-sm text-gray-500 italic">{card.category || "Uncategorized"}</p>
                <p className="text-gray-600 mt-2">
                  {card.description.length > 100
                    ? card.description.slice(0, 100) + "..."
                    : card.description}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-4 justify-end mt-auto">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={() => handleRead(card)}
                >
                  Read More
                </button>
              </div>
            </motion.article>
          ))}
        </section>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4 mb-8">
          <button
            onClick={() => handlePagination("prev")}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePagination("next")}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <Footer />
    </main>
  );
};

export default Page;
