import React from 'react';
import { useCVStore } from '../../store/useCVStore';
import { Plus, Trash2 } from 'lucide-react';

export const EducationForm: React.FC = () => {
  const { education, addEducation, updateEducation, removeEducation } = useCVStore();

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Education</h2>
        <button
          onClick={handleAdd}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          <Plus size={20} />
        </button>
      </div>
      {education.map((edu) => (
        <div key={edu.id} className="p-4 border rounded relative space-y-4">
          <button
            onClick={() => removeEducation(edu.id)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
          <input
            value={edu.school}
            onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
            placeholder="School"
            className="w-full p-2 border rounded"
          />
          <input
            value={edu.degree}
            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
            placeholder="Degree"
            className="w-full p-2 border rounded"
          />
          <input
            value={edu.fieldOfStudy}
            onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
            placeholder="Field of Study"
            className="w-full p-2 border rounded"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              value={edu.startDate}
              onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
              placeholder="Start Date"
              className="p-2 border rounded"
            />
            <input
              value={edu.endDate}
              onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
              placeholder="End Date"
              className="p-2 border rounded"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
