import React from 'react';

const StandardTemplate = ({ formData, logo, signature }) => {
    const attendancePercentage = formData.registrants > 0
        ? ((formData.attendees / formData.registrants) * 100).toFixed(1)
        : 0;

    return (
        <div className="print-area bg-white shadow-2xl w-[210mm] min-h-[297mm] p-[15mm] md:p-[20mm] relative flex flex-col text-sm leading-relaxed text-gray-800 font-sans">

            {/* Header */}
            <div className="border-b-4 border-gray-900 pb-4 mb-6 flex justify-between items-start">
                <div className="flex items-center gap-5">
                    {/* Logo */}
                    {logo ? (
                        <img src={logo} alt="Logo" className="h-16 w-auto object-contain max-w-[120px]" />
                    ) : (
                        <div className="w-16 h-16 bg-gray-900 text-white flex items-center justify-center font-bold text-xs rounded">LOGO</div>
                    )}
                    <div>
                        <h1 className="text-3xl font-bold uppercase tracking-tighter text-gray-900 leading-none">Report Document</h1>
                        <h2 className="text-lg font-medium tracking-wide text-gray-600 mt-1 uppercase">{formData.title || 'Training Activity Title'}</h2>
                    </div>
                </div>
                <div className="text-right pt-1">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Document ID</p>
                    <p className="font-mono text-gray-900 font-bold mb-2">RPT-{new Date().getFullYear()}-{Math.floor(Math.random() * 1000)}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Report Date</p>
                    <p className="font-medium text-sm">{new Date().toLocaleDateString()}</p>
                </div>
            </div>

            {/* Content Container */}
            <div className="flex-grow space-y-6">

                {/* A. Info */}
                <div>
                    <SectionHeader title="A. General Information" />
                    <table className="w-full border-collapse text-sm">
                        <tbody>
                            <InfoRow label="Company Name" value={formData.companyName} />
                            <InfoRow label="PIC Name" value={formData.picName} />
                            <InfoRow label="Training Title" value={formData.title} />
                            <InfoRow label="Date & Schedule" value={formData.date ? new Date(formData.date).toLocaleString() : ''} />
                        </tbody>
                    </table>
                </div>

                {/* B. Stats */}
                <div>
                    <SectionHeader title="B. Participation Data" />
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        <StatBox value={formData.registrants} label="Total Registrants" />
                        <StatBox value={formData.attendees} label="Actual Attendees" />
                        <div className="border border-blue-200 bg-blue-50 p-3 text-center rounded">
                            <div className="flex justify-around items-center">
                                <div>
                                    <div className="text-2xl font-bold text-blue-700">{attendancePercentage}%</div>
                                    <div className="text-[10px] text-blue-600 uppercase font-bold">Attendance</div>
                                </div>
                                <div className="h-8 w-px bg-blue-200"></div>
                                <div>
                                    <div className="text-2xl font-bold text-blue-700">{formData.attendanceScore || '-'}</div>
                                    <div className="text-[10px] text-blue-600 uppercase font-bold">Score Feedback</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* C. Issues & Solutions (Combined Side-by-Side or Stacked Block) */}
                <div>
                    <SectionHeader title="C. Issues & Solutions" />

                    <div className="space-y-4 mt-2">
                        {/* Technical */}
                        <IssueBlock title="Technical Aspects" issue={formData.technicalIssues} solution={formData.solTechnical} />

                        {/* Non-Technical */}
                        <IssueBlock title="Non-Technical Aspects" issue={formData.nonTechnicalIssues} solution={formData.solNonTechnical} />

                        {/* Minor */}
                        <IssueBlock title="Minor Issues" issue={formData.minorIssues} solution={formData.solMinor} />

                        {/* Major */}
                        <IssueBlock title="Major Issues" issue={formData.majorIssues} solution={formData.solMajor} isMajor={true} />
                    </div>
                </div>

                {/* D. Evaluation */}
                <div>
                    <SectionHeader title="D. Overall Evaluation" />
                    <div className="mt-2 p-4 bg-gray-50 border border-gray-200 rounded min-h-[4rem] text-sm text-gray-800 whitespace-pre-line">
                        {formData.evaluation || 'Pending evaluation...'}
                    </div>
                </div>

            </div>

            {/* Footer Signatures - Natural Flow */}
            <div className="mt-12 flex justify-between items-end pb-8">
                <div className="text-center w-40">
                    <p className="text-[10px] text-gray-500 uppercase mb-4 font-bold tracking-wider">Created By</p>

                    <div className="h-16 flex items-end justify-center mb-1">
                        {signature && <img src={signature} alt="Sig" className="max-h-14 max-w-full object-contain" />}
                    </div>

                    <p className="font-bold text-gray-900 border-t-2 border-gray-900 pt-1 text-sm">{formData.picName || 'PIC Name'}</p>
                    <p className="text-[10px] text-gray-500 uppercase mt-0.5">Project In-Charge</p>
                </div>
                <div className="text-center w-40">
                    <p className="text-[10px] text-gray-500 uppercase mb-4 font-bold tracking-wider">Acknowledged By</p>
                    <div className="h-16 mb-1"></div> {/* Spacer for Manager Sig */}
                    <p className="font-bold text-gray-900 border-t-2 border-gray-900 pt-1 text-sm">________________</p>
                    <p className="text-[10px] text-gray-500 uppercase mt-0.5">Manager / Supervisor</p>
                </div>
            </div>
        </div>
    );
};

// Helpers (Internal to this template for self-containment)
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
};

export default StandardTemplate;
