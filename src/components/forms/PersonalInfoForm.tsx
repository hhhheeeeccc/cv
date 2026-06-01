import React from 'react';
import { useCVStore } from '../../store/useCVStore';

export const PersonalInfoForm: React.FC = () => {
  const { personalInfo, updatePersonalInfo } = useCVStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          name="fullName"
          value={personalInfo.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border rounded"
        />
        <input
          name="jobTitle"
          value={personalInfo.jobTitle}
          onChange={handleChange}
          placeholder="Professional Title"
          className="w-full p-2 border rounded"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 border rounded"
          />
          <input
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="p-2 border rounded"
          />
        </div>
        <input
          name="address"
          value={personalInfo.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border rounded"
        />
        <input
          name="website"
          value={personalInfo.website}
          onChange={handleChange}
          placeholder="Website/LinkedIn"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="summary"
          value={personalInfo.summary}
          onChange={handleChange}
          placeholder="Professional Summary"
          rows={4}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};
