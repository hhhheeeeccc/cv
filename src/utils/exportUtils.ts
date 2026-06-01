import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { CVData, Language } from '../types/cv';
import { translations } from './translations';

export const exportToPDF = () => {
  window.print();
};

export const exportToDocx = async (data: CVData & { language: Language }) => {
  const { personalInfo, experiences, education, projects, skills, language } = data;
  const t = translations[language];

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header
          new Paragraph({
            text: personalInfo.fullName || t.fullName,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: personalInfo.jobTitle || t.jobTitle,
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: personalInfo.email ? `${t.email}: ${personalInfo.email} | ` : '' }),
              new TextRun({ text: personalInfo.phone ? `${t.phone}: ${personalInfo.phone} | ` : '' }),
              new TextRun({ text: personalInfo.address ? `${t.address}: ${personalInfo.address}` : '' }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),

          // Summary
          ...(personalInfo.summary ? [
            new Paragraph({ text: t.summary, heading: HeadingLevel.HEADING_3 }),
            new Paragraph({ text: personalInfo.summary, spacing: { after: 200 } }),
          ] : []),

          // Experience
          ...(experiences.length > 0 ? [
            new Paragraph({ text: t.experience, heading: HeadingLevel.HEADING_3 }),
            ...experiences.flatMap(exp => [
              new Paragraph({
                children: [
                  new TextRun({ text: exp.position, bold: true }),
                  new TextRun({ text: ` (${exp.startDate} - ${exp.endDate})`, italics: true }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: exp.company, italics: true })
                ]
              }),
              new Paragraph({ text: exp.description, spacing: { after: 150 } }),
            ])
          ] : []),

          // Projects
          ...(projects.length > 0 ? [
            new Paragraph({ text: t.projects, heading: HeadingLevel.HEADING_3 }),
            ...projects.flatMap(p => [
              new Paragraph({
                children: [
                  new TextRun({ text: p.name, bold: true })
                ]
              }),
              new Paragraph({ text: p.description, spacing: { after: 150 } }),
            ])
          ] : []),

          // Education
          ...(education.length > 0 ? [
            new Paragraph({ text: t.education, heading: HeadingLevel.HEADING_3 }),
            ...education.flatMap(edu => [
              new Paragraph({
                children: [
                  new TextRun({ text: edu.degree, bold: true }),
                  new TextRun({ text: ` (${edu.startDate} - ${edu.endDate})`, italics: true }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: edu.school, italics: true })
                ]
              }),
              new Paragraph({ text: edu.fieldOfStudy, spacing: { after: 150 } }),
            ])
          ] : []),

          // Skills
          ...(skills.length > 0 ? [
            new Paragraph({ text: t.skills, heading: HeadingLevel.HEADING_3 }),
            new Paragraph({ text: skills.map(s => s.name).join(', '), spacing: { after: 150 } }),
          ] : []),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${personalInfo.fullName || 'CV'}.docx`);
};
