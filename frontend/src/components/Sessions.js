// // components/Sessions.js
// const Sessions = () => {
//     const sessionsData = [
//       {
//         language: "English",
//         subject: "Ball control",
//         title: "Ball control and live practice",
//         instructor: "Gavin Araujo",
//         image: "https://www.indiansuperleague.com/static-assets/images/players/2920.png?v=101.38",
//         videoUrl: "https://www.youtube.com/embed/l6h-mXA-LSc"
//       },
//       {
//         language: "English",
//         subject: "Ball control",
//         title: "Ball control and live practice",
//         instructor: "Gavin Araujo",
//         image: "https://www.indiansuperleague.com/static-assets/images/players/2920.png?v=101.38",
//         videoUrl: "https://www.youtube.com/embed/l6h-mXA-LSc"
//       },
//       {
//         language: "English",
//         subject: "Ball control",
//         title: "Ball control and live practice",
//         instructor: "Gavin Araujo",
//         image: "https://www.indiansuperleague.com/static-assets/images/players/2920.png?v=101.38",
//         videoUrl: "https://www.youtube.com/embed/l6h-mXA-LSc"
//       },
//       {
//         language: "English",
//         subject: "Ball control",
//         title: "Ball control and live practice",
//         instructor: "Gavin Araujo",
//         image: "https://www.indiansuperleague.com/static-assets/images/players/2920.png?v=101.38",
//         videoUrl: "https://www.youtube.com/embed/l6h-mXA-LSc"
//       },
//       {
//         language: "English",
//         subject: "Ball control",
//         title: "Ball control and live practice",
//         instructor: "Gavin Araujo",
//         image: "https://www.indiansuperleague.com/static-assets/images/players/2920.png?v=101.38",
//         videoUrl: "https://www.youtube.com/embed/l6h-mXA-LSc"
//       },
//       {
//         language: "English",
//         subject: "Ball control",
//         title: "Ball control and live practice",
//         instructor: "Gavin Araujo",
//         image: "https://www.indiansuperleague.com/static-assets/images/players/2920.png?v=101.38",
//         videoUrl: "https://www.youtube.com/embed/l6h-mXA-LSc"
//       },
//       {
//         language: "English",
//         subject: "Ball control",
//         title: "Ball control and live practice",
//         instructor: "Gavin Araujo",
//         image: "https://www.indiansuperleague.com/static-assets/images/players/2920.png?v=101.38",
//         videoUrl: "https://www.youtube.com/embed/l6h-mXA-LSc"
//       },
//       {
//         language: "English",
//         subject: "Ball control",
//         title: "Ball control and live practice",
//         instructor: "Gavin Araujo",
//         image: "https://www.indiansuperleague.com/static-assets/images/players/2920.png?v=101.38",
//         videoUrl: "https://www.youtube.com/embed/l6h-mXA-LSc"
//       },
      
//     ];
  
//     return (
//       <div className="fixed inset-0 flex flex-col items-center justify-center bg-black">
//         {/* Sessions Section */}
//         <h1 className="text-5xl font-bold mb-6 text-white">Sessions</h1>
//         <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {sessionsData.map((session, index) => (
//             <div key={index} className="bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
//               <div className="relative">
//                 <img src={session.image} alt="Instructor" className="w-full h-48 object-cover" />
//                 <a href={session.videoUrl} className="absolute inset-0 flex items-center justify-center transition duration-300 hover:bg-opacity-70">
//                   <i className="fas fa-play text-white text-4xl"></i>
//                 </a>
//               </div>
//               <div className="p-4">
//                 <div className="flex space-x-2 mb-2">
//                   <span className="bg-gray-700 text-gray-300 text-xs font-semibold px-2 py-1 rounded">{session.language}</span>
//                   <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded">{session.subject}</span>
//                 </div>
//                 <h2 className="text-white font-semibold text-lg">{session.title}</h2>
//                 <p className="text-gray-400 mt-1">{session.instructor}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };
  
//   export default Sessions;
  