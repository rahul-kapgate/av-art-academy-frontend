"use client";

import type { FormEvent } from "react";

const WHATSAPP_NUMBER = "919325217691";

const inputClassName = `
  w-full rounded-xl
  border border-white/10
  bg-[#0B142B]
  px-4 py-3.5
  text-sm text-white
  placeholder:text-slate-500
  outline-none
  transition-colors duration-200
  hover:border-white/20
  focus:border-cyan-400
  focus:ring-2 focus:ring-cyan-400/10
`;

const labelClassName = "mb-2 block text-sm font-medium text-slate-200";

const enquiryTypes = [
  "MAH AAC CET Coaching",
  "Course Fees & Enrollment",
  "Mock Tests & PYQs",
  "Study Materials",
  "Technical Support",
  "Other Enquiry",
];

function ContactForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const whatsappMessage = [
      "Hello AV Art Academy! ",
      "",
      "I would like to make an enquiry.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      ...(phone ? [`Phone: ${phone}`] : []),
      `Enquiry: ${subject}`,
      "",
      "Message:",
      message,
      "",
      "Thank you!",
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    window.location.assign(url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name and Email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClassName}>
            Full Name <span className="text-cyan-400">*</span>
          </label>

          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            maxLength={80}
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClassName}>
            Email Address <span className="text-cyan-400">*</span>
          </label>

          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={120}
            required
            className={inputClassName}
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="contact-phone" className={labelClassName}>
          Phone Number
          <span className="ml-2 text-xs font-normal text-slate-500">
            (Optional)
          </span>
        </label>

        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+91 98765 43210"
          maxLength={20}
          className={inputClassName}
        />
      </div>

      {/* Enquiry Type */}
      <div>
        <label htmlFor="contact-subject" className={labelClassName}>
          What Can We Help You With?
          <span className="ml-1 text-cyan-400">*</span>
        </label>

        <select
          id="contact-subject"
          name="subject"
          defaultValue=""
          required
          className={inputClassName}
        >
          <option value="" disabled>
            Select an enquiry type
          </option>

          {enquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelClassName}>
          Your Message <span className="text-cyan-400">*</span>
        </label>

        <textarea
          id="contact-message"
          name="message"
          rows={5}
          minLength={5}
          maxLength={800}
          required
          placeholder="Tell us about your enquiry..."
          className={`${inputClassName} resize-y`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="
          flex w-full items-center
          justify-center gap-3
          rounded-xl bg-cyan-400
          px-6 py-4
          text-sm font-bold text-[#061426]
          transition-all duration-200
          hover:bg-cyan-300
          focus-visible:outline-2
          focus-visible:outline-offset-2
          focus-visible:outline-cyan-400
        "
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m22 2-7 20-4-9-9-4 20-7Z" />
          <path d="M22 2 11 13" />
        </svg>
        Continue to WhatsApp
      </button>

      <p className="text-center text-xs leading-6 text-slate-400">
        Your details will be included in a WhatsApp message draft. You can
        review the message before sending it to AV Art Academy. No enquiry is
        submitted to our website server by this form.
      </p>
    </form>
  );
}

export default ContactForm;
