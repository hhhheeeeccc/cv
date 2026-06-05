import React from 'react';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';

export const PersonalInfoForm: React.FC = () => {
  const { personalInfo, updatePersonalInfo, language } = useCVStore();
  const t = translations[language];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-foreground">{t.personalInfo}</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">{t.appTagline}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="field-label">{t.fullName}</label>
          <input
            name="fullName"
            value={personalInfo.fullName}
            onChange={handleChange}
            placeholder={t.fullName}
            className="field-input"
          />
        </div>

        <div>
          <label className="field-label">{t.jobTitle}</label>
          <input
            name="jobTitle"
            value={personalInfo.jobTitle}
            onChange={handleChange}
            placeholder={t.jobTitle}
            className="field-input"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="field-label">{t.email}</label>
            <input
              name="email"
              value={personalInfo.email}
              onChange={handleChange}
              placeholder={t.email}
              className="field-input"
            />
          </div>
          <div>
            <label className="field-label">{t.phone}</label>
            <input
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              placeholder={t.phone}
              className="field-input"
            />
          </div>
        </div>

        <div>
          <label className="field-label">{t.address}</label>
          <input
            name="address"
            value={personalInfo.address}
            onChange={handleChange}
            placeholder={t.address}
            className="field-input"
          />
        </div>

        <div>
          <label className="field-label">{t.website}</label>
          <input
            name="website"
            value={personalInfo.website}
            onChange={handleChange}
            placeholder={t.website}
            className="field-input"
          />
        </div>

        <div>
          <label className="field-label">{t.summary}</label>
          <textarea
            name="summary"
            value={personalInfo.summary}
            onChange={handleChange}
            placeholder={t.summary}
            rows={4}
            className="field-input resize-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
