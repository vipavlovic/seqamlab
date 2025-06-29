import React from "react";

export default function Card({ title, children, footer }) {
  return (
    <div className="border rounded-2xl p-4 shadow-xl bg-white space-y-2">
      {title && <h3 className="font-semibold text-base text-gray-900">{title}</h3>}
      <div className="text-sm text-gray-700">{children}</div>
      {footer && <div className="text-sm text-blue-600">{footer}</div>}
    </div>
  );
}
