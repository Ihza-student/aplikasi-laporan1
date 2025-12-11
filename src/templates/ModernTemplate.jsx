import React from 'react';

const ModernTemplate = ({ formData, logo, signature, themeColor }) => {
    const attendancePercentage = formData.registrants > 0
        ? ((formData.attendees / formData.registrants) * 100).toFixed(1)
        : 0;

    // Function to convert hex to rgba for opacity
    const hexToRgba = (hex, alpha) => {
        let r = 0, g = 0, b = 0;
        if (!hex || typeof hex !== 'string') return `rgba(0,0,0,${alpha})`; // Default to black if hex is invalid

        // Handle shorthand hex codes
        if (hex.length === 4) {
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
        } else if (hex.length === 7) {
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
        } else {
            return `rgba(0,0,0,${alpha})`; // Default to black if hex format is unexpected
        }
        return `rgba(${+r},${+g},${+b},${alpha})`;
    }

    return (
        <div className="print-area bg-white w-[210mm] min-h-[297mm] relative flex flex-col text-sm font-sans overflow-hidden">

            {/* Elegant Header Background */}
            <div className="absolute top-0 right-0 w-[70%] h-[350px] z-0 overflow-hidden bg-white">
                <div
                    className="absolute top-[-100px] right-[-50px] w-[500px] h-[500px] rounded-full opacity-100"
                    style={{ backgroundColor: themeColor }}
                ></div>
                <div
                    className="absolute top-[-20px] right-[280px] w-[300px] h-[300px] rounded-full opacity-60 mix-blend-multiply"
                    style={{ backgroundColor: hexToRgba(themeColor, 0.7) }}
                ></div>
                <div
                    className="absolute top-[180px] right-[320px] flex gap-3"
                >
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
            </div>

            {/* Content Wrapper */}
            <div className="relative z-10 px-[15mm] py-[10mm]">

                {/* Header Content */}
                <div className="flex justify-between items-start mb-12 pt-4">
                    {/* Logo Area - Clean and Independent */}
                    <div className="flex gap-4 items-center w-1/3">
                        {logo ?
                            <img src={logo} alt="Logo" className="h-24 w-auto object-contain bg-white p-2 rounded-lg shadow-sm" />
                            : <div className="h-24 w-24 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">Logo Here</div>
                        }
                    </div>

                    {/* Title & Tag Area - Right Aligned overlaying the graphics */}
                    <div className="text-right w-2/3 pt-4">
                        <div className="bg-black text-white px-5 py-1.5 text-xs font-bold uppercase inline-block mb-3 tracking-widest">Report Document</div>
                        <h1 className="text-3xl font-bold text-white tracking-wide leading-tight drop-shadow-md">
                            {formData.title || 'Training Activity Title'}
                        </h1>
                        <p className="mt-2 text-white/80 font-medium tracking-widest uppercase text-xs">
                            {formData.companyName || 'Company Name'}
                        </p>
                    </div>
                </div>

                {/* Info Text */}
                <div className="mb-12 max-w-lg">
                    <p className="text-xl font-light text-gray-600 italic leading-relaxed">
                        "Overview of training effectiveness, participation metrics, and strategic improvements for <span className="font-bold text-gray-900 not-italic">{formData.companyName || 'the company'}</span>."
                    </p>
                </div>

                {/* 01. General Info & Stats grid */}
                <div className="mb-12">
                    <div className="flex items-baseline gap-4 mb-6 border-b-2 border-gray-100 pb-2">
                        <span className="text-4xl font-bold text-gray-900">01</span>
                        <h2 className="text-lg font-bold uppercase tracking-wider text-gray-600">Metric Summary</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-12">
                        <div>
                            <h3 className="font-bold text-xl mb-4 text-blue-600">Project Data</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between border-b border-dashed border-gray-300 pb-1">
                                    <span className="text-gray-500">PIC</span>
                                    <span className="font-bold">{formData.picName}</span>
                                </div>
                                <div className="flex justify-between border-b border-dashed border-gray-300 pb-1">
                                    <span className="text-gray-500">Title</span>
                                    <span className="font-bold">{formData.title}</span>
                                </div>
                                <div className="flex justify-between border-b border-dashed border-gray-300 pb-1">
                                    <span className="text-gray-500">Date</span>
                                    <span className="font-bold">{formData.date ? new Date(formData.date).toLocaleDateString() : '-'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            {/* Decorative Circle BG */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full -z-10 blur-xl"></div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-xl text-center">
                                    <div className="text-3xl font-black text-gray-900">{formData.registrants}</div>
                                    <div className="text-[10px] uppercase font-bold text-gray-400">Registrants</div>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-xl text-center">
                                    <div className="text-3xl font-black text-blue-600">{attendancePercentage}%</div>
                                    <div className="text-[10px] uppercase font-bold text-blue-400">Rate</div>
                                </div>
                                <div className="col-span-2 bg-gray-900 text-white p-4 rounded-xl flex justify-between items-center">
                                    <span className="text-xs font-bold uppercase opacity-70">Score Feedback</span>
                                    <span className="text-2xl font-bold text-green-400">{formData.attendanceScore || '-'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 02. Issues & Solutions */}
                <div className="mb-12">
                    <div className="flex items-baseline gap-4 mb-6 border-b-2 border-gray-100 pb-2">
                        <span className="text-4xl font-bold text-gray-900">02</span>
                        <h2 className="text-lg font-bold uppercase tracking-wider text-gray-600">Challenges & Solutions</h2>
                    </div>

                    <div className="space-y-8">
                        <ModernIssueBlock title="Technical" icon="T" issue={formData.technicalIssues} solution={formData.solTechnical} color="blue" />
                        <ModernIssueBlock title="Non-Technical" icon="N" issue={formData.nonTechnicalIssues} solution={formData.solNonTechnical} color="orange" />
                        {(formData.majorIssues || formData.solMajor) && (
                            <ModernIssueBlock title="Before / Major" icon="!" issue={formData.majorIssues} solution={formData.solMajor} color="red" />
                        )}
                    </div>
                </div>

                {/* 03. Evaluation */}
                <div className="mb-12">
                    <div className="flex items-baseline gap-4 mb-6 border-b-2 border-gray-100 pb-2">
                        <span className="text-4xl font-bold text-gray-900">03</span>
                        <h2 className="text-lg font-bold uppercase tracking-wider text-gray-600">Evaluation</h2>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-tr-3xl border-l-4 border-black italic text-gray-700">
                        {formData.evaluation || 'No evaluation provided.'}
                    </div>
                </div>

                {/* Footer / Signatures */}
                <div className="mt-12 flex justify-between items-end pb-8 pt-8 border-t border-gray-200">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">PIC</div>
                            <span className="text-[10px] items-center font-bold uppercase text-gray-400">Project Leader</span>
                        </div>
                        <div className="h-12">
                            {signature && <img src={signature} alt="Sig" className="h-full object-contain" />}
                        </div>
                        <p className="font-bold text-lg text-gray-900">{formData.picName}</p>
                    </div>

                    {/* Decorative Bottom Corner */}
                    <div className="absolute bottom-0 right-0 w-[200px] h-[200px] overflow-hidden pointer-events-none">
                        <div className="absolute bottom-[-50px] right-[-50px] w-[150px] h-[150px] border-[20px] border-yellow-400 rounded-full opacity-50"></div>
                        <div className="absolute bottom-[20px] right-[80px] w-4 h-4 bg-black rounded-full"></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

// Modern Helper
const ModernIssueBlock = ({ title, icon, issue, solution, color }) => {
    if (!issue && !solution) return null;
    const colors = {
        blue: 'bg-blue-100 text-blue-800',
        orange: 'bg-orange-100 text-orange-800',
        red: 'bg-red-100 text-red-800',
        green: 'bg-green-100 text-green-800'
    };

    return (
        <div className="flex gap-6">
            <div className={`w-12 h-12 flex-shrink-0 ${colors[color] || colors.blue} rounded-2xl flex items-center justify-center font-bold text-lg`}>
                {icon}
            </div>
            <div className="flex-grow grid grid-cols-2 gap-8 border-b border-gray-100 pb-6">
                <div>
                    <h4 className="font-bold text-gray-900 uppercase text-xs tracking-wider mb-2">Observation</h4>
                    <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">{issue}</p>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 uppercase text-xs tracking-wider mb-2">Action Taken</h4>
                    <p className="text-gray-800 font-medium text-sm whitespace-pre-line leading-relaxed">{solution}</p>
                </div>
            </div>
        </div>
    )
}

export default ModernTemplate;
