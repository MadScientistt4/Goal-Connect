import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Instructors = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

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
      title: "Advanced Passing",
      description: "Learn:",
      topics: ["Mid-range Passing", "Creative Passing", "One-touch Passing"],
      price: "₹800.00",
      priceType: "button",
    },
    {
      title: "Finishing Techniques",
      description: "Learn:",
      topics: ["Striking Accuracy", "Volleys", "Headers", "Finishing Under Pressure"],
      price: "₹800.00",
      priceType: "button",
    },
    {
      title: "Defensive Skills",
      description: "Learn:",
      topics: ["Tackling", "Positioning", "Marking", "Intercepting Passes"],
      price: "₹800.00",
      priceType: "button",
    },
    {
      title: "Goalkeeping",
      description: "Learn:",
      topics: ["Diving", "Catching", "One-on-One Situations", "Commanding the Box"],
      price: "₹800.00",
      priceType: "button",
    },
    {
      title: "Defensive Skills",
      description: "Learn:",
      topics: ["Tackling", "Positioning", "Marking", "Intercepting Passes"],
      price: "₹800.00",
      priceType: "button",
    },
    {
      title: "Defensive Skills",
      description: "Learn:",
      topics: ["Tackling", "Positioning", "Marking", "Intercepting Passes"],
      price: "₹800.00",
      priceType: "button",
    },
    {
      title: "Defensive Skills",
      description: "Learn:",
      topics: ["Tackling", "Positioning", "Marking", "Intercepting Passes"],
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
      contact: {
        phone: "123-456-7890",
        email: "gavin@example.com",
      },
    },
    {
      name: "Shane Temudo",
      title: "Head Coach",
      teams: ["FC Goa U15s"],
      licenses: ["AFC B License", "FIFA certified"],
      contact: {
        phone: "987-654-3210",
        email: "shane@example.com",
      },
    },
    {
      name: "Asdf Tyre",
      title: "Head Coach",
      teams: ["FC Goa U15s"],
      licenses: ["AFC B License", "FIFA certified"],
      contact: {
        phone: "787-483-7484",
        email: "asdf@example.com",
      },
    },
  ];

  const [showContactInfo, setShowContactInfo] = useState(
    Array(instructorsData.length).fill(false)
  );

  const handlePayNow = async (course) => {
    if (course.price === "₹800.00") {
      const amountInPaise = 800 * 100;

      try {
        const response = await fetch("http://localhost:5000/razorpay/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amountInPaise }),
        });

        const orderData = await response.json();

        const options = {
          key: "rzp_test_iVFlHfIHXJjTX9",
          amount: amountInPaise,
          currency: "INR",
          name: "Football Training",
          description: `Payment for ${course.title}`,
          order_id: orderData.id,
          handler: function (response) {
            console.log("Payment successful!", response);
            alert("Payment successful!");
            navigate("/sessions");
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

  const toggleContactInfo = (index) => {
    setShowContactInfo((prev) =>
      prev.map((show, i) => (i === index ? !show : show))
    );
  };

  return (
    <div className="w-[100vw] flex flex-col items-center py-10 bg-black">
      {/* Courses Section */}
      <h1 className="text-4xl font-bold mb-6 text-white">Browse Courses</h1>
      <p className="text-sm mb-10 text-gray-400">ALL COURSES HAVE LIFETIME ACCESS</p>

      <div className="flex flex-wrap justify-center gap-8">
        {coursesData.map((course, index) => (
          <div
            key={index}
            className="border border-gray-600 p-6 w-80 h-auto flex flex-col justify-between bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
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
                  handlePayNow(course);
                } else {
                  navigate("/registration");
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
      <h1 className="text-4xl font-bold mb-4 text-white mt-5">Our Instructors</h1>
      <p className="text-sm mb-8 text-white">Meet our coaches</p>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {instructorsData.map((instructor, index) => (
          <div
            key={index}
            className="border border-gray-400 p-4 w-80 h-96 flex flex-col justify-between bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform"
          >
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
            <button
              className="bg-orange-500 text-white py-2 px-4 rounded mt-4 hover:bg-orange-400 transition duration-300"
              onClick={() => toggleContactInfo(index)}
            >
              Contact Us
            </button>
            {showContactInfo[index] && (
              <div className="mt-4 bg-gray-100 p-2 rounded">
                <p className="text-sm text-black">Phone: {instructor.contact.phone}</p>
                <p className="text-sm text-black">Email: {instructor.contact.email}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
