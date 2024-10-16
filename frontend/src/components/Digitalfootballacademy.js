
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Instructors = () => {

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []); // Empty dependency array means this effect runs once on mount
  const navigate = useNavigate();
  const coursesData = [
    {
      title: "The Basics",
      description: "Learn:",
      topics: ["Ball Control", "Ball Coordination", "First Touch", "Finishing and more"],
      price: "Start for Free",
      priceType: "button",
    },
    {
      title: "Passing",
      description: "Learn:",
      topics: ["Basic Techniques", "Mid-range Passing", "Creative Passing", "and more"],
      price: "₹800.00",
      priceType: "button",
    },
    {
      title: "Aerial Control",
      description: "Learn:",
      topics: ["Body Positioning", "Using Your Feet", "Using Your Chest", "Heading, and more"],
      price: "₹800.00",
      priceType: "button",
    },
    {
      title: "Aerial Control",
      description: "Learn:",
      topics: ["Body Positioning", "Using Your Feet", "Using Your Chest", "Heading, and more"],
      price: "₹800.00",
      priceType: "button",
    },
    {
      title: "Aerial Control",
      description: "Learn:",
      topics: ["Body Positioning", "Using Your Feet", "Using Your Chest", "Heading, and more"],
      price: "₹800.00",
      priceType: "button",
    },
    {
      title: "Aerial Control",
      description: "Learn:",
      topics: ["Body Positioning", "Using Your Feet", "Using Your Chest", "Heading, and more"],
      price: "₹800.00",
      priceType: "button",
    },
    {
      title: "Aerial Control",
      description: "Learn:",
      topics: ["Body Positioning", "Using Your Feet", "Using Your Chest", "Heading, and more"],
      price: "₹800.00",
      priceType: "button",
    },
    {
      title: "Aerial Control",
      description: "Learn:",
      topics: ["Body Positioning", "Using Your Feet", "Using Your Chest", "Heading, and more"],
      price: "₹800.00",
      priceType: "button",
    },

  ];

  const instructorsData = [
    {
      name: "Gavin Araujo",
      title: "Head Coach",
      teams: ["FC Goa U18s"],
      licenses: ["AFC A License", "FIFA certified"],
    },
    {
      name: "Shane Temudo",
      title: "Head Coach",
      teams: ["FC Goa U15s"],
      licenses: ["AFC B License", "FIFA certified"],
    },
    {
      name: "Gavin Araujo",
      title: "Head Coach",
      teams: ["FC Goa U18s"],
      licenses: ["AFC A License", "FIFA certified"],
    },

  ];

  const handlePayNow = async (course) => {
    if (course.price === "₹800.00") {
      const amountInPaise = 800 * 100; // Razorpay expects amount in paise

      try {
        // Call backend to create the Razorpay order
        const response = await fetch("http://localhost:5000/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amountInPaise }),
        });

        const orderData = await response.json();

        // Open Razorpay payment modal
        const options = {
          key: "rzp_test_iVFlHfIHXJjTX9", // Replace with your Razorpay key
          amount: amountInPaise,
          currency: "INR",
          name: "Football Training",
          description: `Payment for ${course.title}`,
          order_id: orderData.id,
          handler: function (response) {
            console.log("Payment successful!", response);
            alert("Payment successful!");
            navigate("/registration"); // Redirect on success
          },
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Payment failed", error);
        alert("Something went wrong with the payment.");
      }
    }
  };



  return (

    <div className="flex flex-col items-center py-10 bg-black">
      {/* Courses Section */}
      <h1 className="text-4xl font-bold mb-6 text-white">Browse Courses</h1>
      <p className="text-sm mb-10 text-gray-400">ALL COURSES HAVE LIFETIME ACCESS</p>
      <div className="flex space-x-6 flex-wrap justify-center">
        {coursesData.map((course, index) => (
          <div key={index} className="border border-gray-600 p-6 w-80 h-96 flex flex-col justify-between bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <div>
              <h2 className="text-xl font-bold mb-3 text-white">{course.title}</h2>
              <p className="text-sm text-gray-300 mb-2">{course.description}</p>
              <ul className="text-sm text-gray-300 list-disc list-inside mb-4">
                {course.topics.map((topic, topicIndex) => (
                  <li key={topicIndex}>{topic}</li>
                ))}
              </ul>
            </div>
            <button
  onClick={() => {
    if (course.price === "₹800.00") {
      handlePayNow(course);  // Call Razorpay payment handler for paid courses
    } else {
      navigate("/registration");  // For free courses
    }
  }}
  className="bg-orange-600 text-white py-2 px-5 rounded mt-4 hover:bg-orange-500 transition duration-300"
>
  {course.price}
</button>

          </div>
        ))}
      </div>

      {/* Instructors Section */}
      <h1 className="text-4xl font-bold mb-4 text-white">Our Instructors</h1>
      <p className="text-sm mb-8 text-white">Meet our coaches</p>
      <div className="flex space-x-4 mb-8">
        {instructorsData.map((instructor, index) => (
          <div key={index} className="border border-gray-400 p-4 w-80 h-96 flex flex-col justify-between bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform">
            <div>
              <h2 className="text-xl font-bold mb-2">{instructor.name}</h2>
              <p className="text-sm">{instructor.title}</p>
              <ul className="text-sm list-disc list-inside">
                {instructor.teams.map((team, teamIndex) => (
                  <li key={teamIndex}>{team}</li>
                ))}
                {instructor.licenses.map((license, licenseIndex) => (
                  <li key={licenseIndex}>{license}</li>
                ))}
              </ul>
            </div>
            <button className="bg-orange-500 text-white py-2 px-4 rounded mt-4 hover:bg-orange-400 transition duration-300">Contact Us</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
