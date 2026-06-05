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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-slate-100 pb-2">
        <h2 className="text-lg font-bold text-slate-800">{t.personalInfo}</h2>
        <p className="text-xs text-slate-500 mt-1">Enter your contact details and summary.</p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <div>
          <label className="form-label">{t.fullName}</label>
          <input
            name="fullName"
            value={personalInfo.fullName}
            onChange={handleChange}
            placeholder={t.fullName}
            className="input-field"
          />
        </div>

        <div>
          <label className="form-label">{t.jobTitle}</label>
          <input
            name="jobTitle"
            value={personalInfo.jobTitle}
            onChange={handleChange}
            placeholder={t.jobTitle}
            className="input-field"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label">{t.email}</label>
            <input
              name="email"
              type="email"
              value={personalInfo.email}
              onChange={handleChange}
              placeholder={t.email}
              className="input-field"
            />
          </div>
          <div>
            <label className="form-label">{t.phone}</label>
            <input
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              placeholder={t.phone}
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="form-label">{t.address}</label>
          <input
            name="address"
            value={personalInfo.address}
            onChange={handleChange}
            placeholder={t.address}
            className="input-field"
          />
        </div>

        <div>
          <label className="form-label">{t.website}</label>
          <input
            name="website"
            value={personalInfo.website}
            onChange={handleChange}
            placeholder={t.website}
            className="input-field"
          />
        </div>

        <div>
          <label className="form-label">{t.summary}</label>
          <textarea
            name="summary"
            value={personalInfo.summary}
            onChange={handleChange}
            placeholder={t.summary}
            rows={5}
            className="input-field resize-none"
          />
        </div>
      </div>
    </div>
  );
};
