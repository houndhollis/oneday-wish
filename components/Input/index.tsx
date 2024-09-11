"use client";

import FormControl from "components/FormControl";

export default function Input({ label, value, onChange, id }) {
  return (
    <FormControl className="mt-4 gap-2" label={label} htmlFor={id}>
      <input
        className="py-2 px-1 border-b border-gray-200 focus:outline-none"
        id={id}
        placeholder="제목을 입력해주세요"
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
}
