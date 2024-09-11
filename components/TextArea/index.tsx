"use client";

import FormControl from "components/FormControl";

export default function TextArea({ id, value, onChange, placeholder = "" }) {
  return (
    <FormControl className="mt-6" htmlFor="content">
      <textarea
        className="h-[300px] py-2 px-1 border rounded border-gray-200 focus:outline-none resize-none"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
}
