
import React, { useState, useRef } from 'react';
import { FileText, Download, AlertTriangle, CheckCircle, Lightbulb, ClipboardList, Upload, PenTool, List, ListOrdered, Layout } from 'lucide-react';
import StandardTemplate from './templates/StandardTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ConstructionTemplate from './templates/ConstructionTemplate';

function App() {
  const [logo, setLogo] = useState(null);
  const [signature, setSignature] = useState(null);
  const [template, setTemplate] = useState('standard'); // 'standard', 'modern', 'construction'
  const [themeColor, setThemeColor] = useState('#2596be'); // Default modern blue

  const [formData, setFormData] = useState({
    companyName: '',
    picName: '',
    title: '',
    date: '',
    registrants: 0,
    attendees: 0,
    attendanceScore: '', // string to allow float input more easily

    // Issues
    technicalIssues: '',
    nonTechnicalIssues: '',
    minorIssues: '',
    majorIssues: '',

    // Solutions (Split)
    solTechnical: '',
    solNonTechnical: '',
    solMajor: '',
    solMinor: '',

    evaluation: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => { window.print(); };

  // Rich Text Helper
  const insertText = (name, textToInsert) => {
    const textarea = document.getElementById(`textarea-${name}`);
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = formData[name] || '';
      const before = text.substring(0, start);
      const after = text.substring(end, text.length);

      // If it's a list item, add newline if not at start
      const prefix = (start > 0 && text[start - 1] !== '\n') ? '\n' : '';
      const newText = before + prefix + textToInsert + after;

      setFormData(prev => ({ ...prev, [name]: newText }));

      // Restore focus (timeout needed for React render cycle)
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + prefix.length + textToInsert.length, start + prefix.length + textToInsert.length);
      }, 0);
    }
  };

  return (
    <div id="app-root" className="flex h-screen overflow-hidden text-gray-800 bg-gray-100 font-sans">
      {/* LEFT COLUMN: Editor */}
      <div className="w-1/2 h-full overflow-y-auto bg-gray-50 border-r border-gray-200 p-6 md:p-8 no-print scrollbar-thin scrollbar-thumb-gray-300">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 text-blue-900">
            <FileText className="w-8 h-8 text-blue-600" />
            Report Editor
          </h1>
          <p className="text-gray-500">Real-time A4 training activity report builder.</p>
        </div>

        {/* Template Selector */}
        <div className="mb-8 p-4 bg-white rounded-xl shadow-sm border border-blue-100">
          <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Layout className="w-4 h-4" /> Select Template
          </h2>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button
              onClick={() => setTemplate('standard')}
              className={`p-3 rounded-lg border-2 text-center transition-all ${template === 'standard' ? 'border-blue-600 bg-blue-50 text-blue-800 font-bold' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
            >
              Standard
            </button>
            <button
              onClick={() => setTemplate('modern')}
              className={`p-3 rounded-lg border-2 text-center transition-all ${template === 'modern' ? 'border-blue-600 bg-blue-50 text-blue-800 font-bold' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
            >
              Modern
            </button>
            <button
              onClick={() => setTemplate('construction')}
              className={`p-3 rounded-lg border-2 text-center transition-all ${template === 'construction' ? 'border-blue-600 bg-blue-50 text-blue-800 font-bold' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
            >
              Construction
            </button>
          </div>

          {/* Theme Color Picker */}
          {(template === 'modern' || template === 'construction') && (
            <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
              <label className="text-sm font-medium text-gray-600">Theme Color:</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="h-8 w-12 cursor-pointer border-0 rounded p-0 overflow-hidden"
                />
                <span className="text-xs text-gray-400 font-mono hidden md:inline">{themeColor}</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8 pb-32">
          {/* 1. General Info */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <ClipboardList className="w-4 h-4" /> General Information
            </h2>
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
                <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-gray-400 rounded-lg hover:bg-blue-50 transition-colors bg-white h-12">
                  <Upload className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-gray-600">Upload Logo</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setLogo)} className="hidden" />
                </label>
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Digital Signature</label>
                <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-gray-400 rounded-lg hover:bg-blue-50 transition-colors bg-white h-12">
                  <PenTool className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-gray-600">Upload Sig</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setSignature)} className="hidden" />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className="input-field" placeholder="Company Name" />
              <input type="text" name="picName" value={formData.picName} onChange={handleInputChange} className="input-field" placeholder="PIC Name" />
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="input-field" placeholder="Training Title" />
              <input type="datetime-local" name="date" value={formData.date} onChange={handleInputChange} className="input-field" />
            </div>
          </section>

          {/* 2. Participation */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Participation Data
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="label">Registrants</label>
                <input type="number" name="registrants" value={formData.registrants} onChange={handleInputChange} className="input-field" />
              </div>
              <div>
                <label className="label">Attendees</label>
                <input type="number" name="attendees" value={formData.attendees} onChange={handleInputChange} className="input-field" />
              </div>
              <div>
                <label className="label">Feedback Score</label>
                <input type="number" name="attendanceScore" value={formData.attendanceScore} onChange={handleInputChange} className="input-field" step="0.1" placeholder="e.g. 4.8" />
              </div>
            </div>
          </section>

          {/* 3. Detailed Issues & Solutions */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Issues & Solutions
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-3 border-b pb-1">Technical Aspects</h3>
                <div className="space-y-4">
                  <RichTextarea label="Technical Issues" name="technicalIssues" value={formData.technicalIssues} placeholder="Connection drops, audio issues..." onChange={handleInputChange} onInsert={insertText} />
                  <RichTextarea label="Solution (Technical)" name="solTechnical" value={formData.solTechnical} placeholder="How was it fixed?" color="green" onChange={handleInputChange} onInsert={insertText} />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-3 border-b pb-1">Non-Technical Aspects</h3>
                <div className="space-y-4">
                  <RichTextarea label="Non-Technical Issues" name="nonTechnicalIssues" value={formData.nonTechnicalIssues} placeholder="Timing, engagement..." onChange={handleInputChange} onInsert={insertText} />
                  <RichTextarea label="Solution (Non-Technical)" name="solNonTechnical" value={formData.solNonTechnical} placeholder="How was it addressed?" color="green" onChange={handleInputChange} onInsert={insertText} />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-3 border-b pb-1">Minor / Other Aspects</h3>
                <div className="space-y-4">
                  <RichTextarea label="Minor Issues" name="minorIssues" value={formData.minorIssues} placeholder="Typos, small delays..." onChange={handleInputChange} onInsert={insertText} />
                  <RichTextarea label="Solution (Minor)" name="solMinor" value={formData.solMinor} placeholder="Correction made..." color="green" onChange={handleInputChange} onInsert={insertText} />
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-800 mb-3 border-b border-red-200 pb-1">Major / Critical Aspects</h3>
                <div className="space-y-4">
                  <RichTextarea label="Major Issues" name="majorIssues" value={formData.majorIssues} placeholder="System failure, cancellation..." color="red" onChange={handleInputChange} onInsert={insertText} />
                  <RichTextarea label="Solution (Major)" name="solMajor" value={formData.solMajor} placeholder="Emergency response..." color="red" onChange={handleInputChange} onInsert={insertText} />
                </div>
              </div>
            </div>
          </section>

          {/* 4. Evaluation */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" /> Overall Evaluation
            </h2>
            <RichTextarea label="Evaluation & Next Steps" name="evaluation" value={formData.evaluation} rows={5} placeholder="Overall summary and future improvements..." onChange={handleInputChange} onInsert={insertText} />
          </section>
        </div>

        <div className="fixed bottom-8 left-8 z-50">
          <button onClick={handlePrint} className="flex items-center gap-3 bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-full shadow-2xl transition-all font-semibold tracking-wide">
            <Download className="w-5 h-5" /> Download PDF
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Preview */}
      <div id="preview-pane" className="w-1/2 h-full overflow-y-auto bg-gray-300 p-8 flex justify-center items-start">
        {/* Render Active Template */}
        {template === 'standard' && <StandardTemplate formData={formData} logo={logo} signature={signature} />}
        {template === 'modern' && <ModernTemplate formData={formData} logo={logo} signature={signature} themeColor={themeColor} />}
        {template === 'construction' && <ConstructionTemplate formData={formData} logo={logo} signature={signature} themeColor={themeColor} />}
      </div>
    </div>
  );
}

const RichTextarea = ({ label, name, value, rows = 3, placeholder, color = 'blue', onChange, onInsert }) => (
  <div>
    <div className="flex justify-between items-end mb-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-1">
        <button onClick={() => onInsert(name, '• ')} className="p-1 hover:bg-gray-200 rounded text-gray-600" title="Bullet List"><List size={14} /></button>
        <button onClick={() => onInsert(name, '1. ')} className="p-1 hover:bg-gray-200 rounded text-gray-600" title="Numbered List"><ListOrdered size={14} /></button>
      </div>
    </div>
    <textarea
      id={`textarea-${name}`}
      name={name}
      rows={rows}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${color}-500 focus:border-${color}-500 outline-none transition-all text-sm font-sans`}
      placeholder={placeholder}
    />
  </div>
);

// Sub-components for cleaner code
const SectionHeader = ({ title }) => (
  <h3 className="text-xs font-bold uppercase text-white bg-gray-900 px-3 py-1.5 inline-block mb-2 rounded-sm tracking-wider">
    {title}
  </h3>
);

const InfoRow = ({ label, value }) => (
  <tr className="border-b border-gray-200 last:border-0">
    <td className="py-2 w-1/3 font-semibold text-gray-600">{label}</td>
    <td className="py-2 w-2/3 text-gray-900">{value || '________________________'}</td>
  </tr>
);

const StatBox = ({ value, label }) => (
  <div className="border border-gray-200 p-3 text-center rounded bg-gray-50">
    <div className="text-2xl font-bold text-gray-900">{value}</div>
    <div className="text-[10px] text-gray-500 uppercase font-bold mt-1">{label}</div>
  </div>
);

const IssueBlock = ({ title, issue, solution, isMajor }) => {
  // Only render if there is content or to keep structure
  const hasContent = issue || solution;

  return (
    <div className={`border ${isMajor ? 'border-red-100 bg-red-50/30' : 'border-gray-200'} rounded overflow-hidden break-inside-avoid`}>
      <div className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${isMajor ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'}`}>
        {title}
      </div>
      <div className="p-3 grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-[10px] text-gray-400 uppercase font-bold mb-1">Issue / Observation</h4>
          <p className="text-sm whitespace-pre-line text-gray-800">{issue || '-'}</p>
        </div>
        <div>
          <h4 className="text-[10px] text-gray-400 uppercase font-bold mb-1">Action / Solution</h4>
          <p className={`text-sm whitespace-pre-line ${isMajor ? 'text-red-700 font-medium' : 'text-green-700'}`}>{solution || '-'}</p>
        </div>
      </div>
    </div>
  );
}

export default App;

