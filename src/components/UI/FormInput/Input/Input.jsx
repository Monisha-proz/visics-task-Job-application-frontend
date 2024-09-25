// ReusableInput.js
import React from 'react';

const Input = ({ label, register, validation, errors, name, type = "text", optionList }) => {
  return (
    <div className="mb-4">
      {type !== "select" && (
        <>
          <label className="block text-gray-700 text-sm font-bold mb-2 text-left">{label}</label>
          <input
            type={type}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors[name] ? 'border-red-500' : ''
            }`}
            {...register(name, validation)}
          />
          {errors[name] && <p className="text-red-500 text-xs italic text-left">{errors[name]?.message}</p>}
        </>
      )}
      {type === "select" && (
        <>
          <label className="block text-gray-700 text-sm font-bold mb-2 text-left">{label}</label>
          <select
            {...register(name, validation)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors[name] ? 'border-red-500' : ''
            }`}
          >
            <option disabled defaultValue="">
              Select status
            </option>
            {optionList.map((list) => (
              <option key={list?.id} value={list.value}>
                {list.label}
              </option>
            ))}
          </select>
          {errors[name] && <p className="text-red-500 text-xs italic text-left">{errors[name]?.message}</p>}
        </>
      )}
    </div>
  );
};

export default Input;
