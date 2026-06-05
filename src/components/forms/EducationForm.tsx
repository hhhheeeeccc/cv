import React from 'react';
import { useCVStore } from '../../store/useCVStore';
import { translations } from '../../utils/translations';
import { Plus, Trash2, GraduationCap, Calendar, School } from 'lucide-react';

export const EducationForm: React.FC = () => {
  const { education, addEducation, updateEducation, removeEducation, language } = useCVStore();
  const t = translations[language];

  const handleAdd = () => {
    addEducation({
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <div>
          <h2 className="text-lg font-bold text-slate-800">{t.education}</h2>
          <p className="text-xs text-slate-500 mt-1">Your academic background.</p>
        </div>
        <button
          onClick={handleAdd}
          className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transition-all hover:scale-110"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="p-5 bg-white border border-slate-200 rounded-xl relative space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <button
              onClick={() => removeEducation(edu.id)}
              className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>

            <div className="space-y-4">
              <div>
                <label className="form-label flex items-center gap-2">
                  <School size={14} className="text-indigo-500" />
                  {t.school}
                </label>
                <input
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                  placeholder={t.school}
                  className="input-field"
                />
              </div>

              <div>
                <label className="form-label flex items-center gap-2">
                  <GraduationCap size={14} className="text-indigo-500" />
                  {t.degree}
                </label>
                <input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                  placeholder={t.degree}
                  className="input-field"
                />
              </div>

              <div>
                <label className="form-label">{t.fieldOfStudy}</label>
                <input
                  value={edu.fieldOfStudy}
                  onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                  placeholder={t.fieldOfStudy}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label flex items-center gap-2">
                    <Calendar size={14} className="text-indigo-500" />
                    {t.startDate}
                  </label>
                  <input
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                    placeholder="YYYY"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="form-label flex items-center gap-2">
                    <Calendar size={14} className="text-indigo-500" />
                    {t.endDate}
                  </label>
                  <input
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                    placeholder="YYYY"
                    className="input-field text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
