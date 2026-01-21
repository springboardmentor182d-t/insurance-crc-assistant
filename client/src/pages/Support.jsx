import { useState } from "react";
import { Mail, HelpCircle, User, AtSign, MessageSquare, Send } from "lucide-react";

export default function ContactSupport() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mailto =
      "mailto:insureassist1@gmail.com" +
      "?subject=" +
      encodeURIComponent(form.subject || "Support Request") +
      "&body=" +
      encodeURIComponent(
        "Name: " +
          form.name +
          "\nEmail: " +
          form.email +
          "\n\nMessage:\n" +
          form.message
      );

    window.location.href = mailto;
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="max-w-3xl mx-auto">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
            <HelpCircle size={30} className="text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Contact Support
          </h1>
          <p className="text-gray-600 mt-2">
            Need help with policies, payments, or your account?  
            Our support team is here for you.
          </p>
        </div>

        {/* ===== FORM CARD ===== */}
        <div className="bg-white rounded-2xl border shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <User size={14} className="text-indigo-600" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <AtSign size={14} className="text-indigo-600" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <MessageSquare size={14} className="text-indigo-600" />
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Policy issue / Payment / Account help"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Mail size={14} className="text-indigo-600" />
                Your Message
              </label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Describe your issue or question in detail..."
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2 font-medium"
            >
              <Send size={16} />
              Send Message to Support
            </button>
          </form>

          {/* Footer */}
          <p className="text-xs text-gray-500 text-center mt-6">
            Your message will open your email app and be sent to{" "}
            <span className="font-medium text-indigo-600">
              insureassist1@gmail.com
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
