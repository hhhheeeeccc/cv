import React from 'react';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';

export const PersonalInfoForm: React.FC = () => {
  const { personalInfo, updatePersonalInfo, language } = useCVStore();
  const t = translations[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">{t.personalInfo}</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          name="fullName"
          value={personalInfo.fullName}
          onChange={handleChange}
          placeholder={t.fullName}
          aria-label={t.fullName}
          className="w-full p-2 border rounded"
        />
        <input
          name="jobTitle"
          value={personalInfo.jobTitle}
          onChange={handleChange}
          placeholder={t.jobTitle}
          aria-label={t.jobTitle}
          className="w-full p-2 border rounded"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
            placeholder={t.email}
            aria-label={t.email}
            className="p-2 border rounded"
          />
          <input
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            placeholder={t.phone}
            aria-label={t.phone}
            className="p-2 border rounded"
          />
        </div>
        <input
          name="address"
          value={personalInfo.address}
          onChange={handleChange}
          placeholder={t.address}
          aria-label={t.address}
          className="w-full p-2 border rounded"
        />
        <input
          name="website"
          value={personalInfo.website}
          onChange={handleChange}
          placeholder={t.website}
          aria-label={t.website}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="summary"
          value={personalInfo.summary}
          onChange={handleChange}
          placeholder={t.summary}
          aria-label={t.summary}
          rows={4}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};
