import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { CVData } from '../types/cv';

export const exportToPDF = () => {
  window.print();
};

export const exportToDocx = async (data: CVData) => {
  const { personalInfo, experiences, education, projects, skills } = data;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header
          new Paragraph({
            text: personalInfo.fullName || 'CV',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: personalInfo.jobTitle || '',
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: personalInfo.email ? `Email: ${personalInfo.email} | ` : '' }),
              new TextRun({ text: personalInfo.phone ? `Phone: ${personalInfo.phone} | ` : '' }),
              new TextRun({ text: personalInfo.address ? `Address: ${personalInfo.address}` : '' }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),

          // Summary
          ...(personalInfo.summary ? [
            new Paragraph({ text: 'Professional Summary', heading: HeadingLevel.HEADING_3 }),
            new Paragraph({ text: personalInfo.summary, spacing: { after: 200 } }),
          ] : []),

          // Experience
          ...(experiences.length > 0 ? [
            new Paragraph({ text: 'Experience', heading: HeadingLevel.HEADING_3 }),
            ...experiences.flatMap(exp => [
              new Paragraph({
                children: [
                  new TextRun({ text: exp.position, bold: true }),
                  new TextRun({ text: ` at ${exp.company} (${exp.startDate} - ${exp.endDate})`, italics: true }),
                ],
              }),
              new Paragraph({ text: exp.description, spacing: { after: 150 } }),
            ])
          ] : []),

          // Projects
          ...(projects.length > 0 ? [
            new Paragraph({ text: 'Projects', heading: HeadingLevel.HEADING_3 }),
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
            new Paragraph({ text: 'Education', heading: HeadingLevel.HEADING_3 }),
            ...education.flatMap(edu => [
              new Paragraph({
                children: [
                  new TextRun({ text: edu.degree, bold: true }),
                  new TextRun({ text: ` from ${edu.school} (${edu.startDate} - ${edu.endDate})`, italics: true }),
                ],
              }),
              new Paragraph({ text: edu.fieldOfStudy, spacing: { after: 150 } }),
            ])
          ] : []),

          // Skills
          ...(skills.length > 0 ? [
            new Paragraph({ text: 'Skills', heading: HeadingLevel.HEADING_3 }),
            new Paragraph({ text: skills.map(s => s.name).join(', '), spacing: { after: 150 } }),
          ] : []),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${personalInfo.fullName || 'CV'}.docx`);
};
