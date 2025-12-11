import React from 'react';

const ConstructionTemplate = ({ formData, logo, signature, themeColor }) => {

    // Function to create light background tint
    const getLightTint = (hex) => {
        // Simple fallback if invalid hex
        if (!hex || hex.length < 4) return '#f4f4f4';

        // Parse hex
        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
        } else if (hex.length === 7) {
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
        }

        // Mix with white (90% white, 10% color)
        r = Math.round((+r * 0.1) + (255 * 0.9));
        g = Math.round((+g * 0.1) + (255 * 0.9));
        b = Math.round((+b * 0.1) + (255 * 0.9));

        return `rgb(${r},${g},${b})`;
    };

    return (
        <div
            className="print-area w-[210mm] min-h-[297mm] relative flex flex-col text-xs font-sans overflow-visible p-[10mm]"
            style={{ backgroundColor: getLightTint(themeColor) }}
        >

            {/* Header Block - Solid Theme Color */}
            <div
                className="text-white p-6 rounded-t-xl flex justify-between items-center shadow-lg mb-4"
                style={{ backgroundColor: themeColor }}
            >
                <div>
                    <h1 className="text-3xl font-extrabold tracking-wider mb-1 uppercase">Daily Report</h1>
                    <h2 className="text-lg opacity-90 tracking-widest">TRAINING ACTIVITY</h2>
                </div>
                <div className="text-center">
                    {/* Logo handled as pure white or inverted if needed */}
                    {logo ?
                        <img src={logo} className="h-12 w-auto object-contain brightness-0 invert opacity-90" alt="Logo" /> :
                        <div className="border border-white/50 px-2 py-1 uppercase text-xs">Logo Here</div>
                    }
                    <p className="mt-2 text-[10px] uppercase tracking-widest opacity-80 font-semibold">{formData.companyName}</p>
                </div>
            </div>

            {/* Date / Address Bar */}
            <div className="bg-white/60 rounded-full px-6 py-2 mb-6 flex justify-between items-center text-gray-700 font-bold shadow-sm border border-white">
                <div className="flex gap-2">
                    <span className="uppercase text-[10px] tracking-widest opacity-60">DATE:</span>
                    <span>{formData.date ? new Date(formData.date).toLocaleDateString() : '........................'}</span>
                </div>
                <div className="flex gap-2">
                    <span className="uppercase text-[10px] tracking-widest opacity-60">TITLE:</span>
                    <span>{formData.title || '........................................'}</span>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 gap-4 flex-grow content-start">

                {/* Project Info (Left) */}
                <ConstructionCard title="Project Info" themeColor={themeColor}>
                    <div className="space-y-2">
                        <div className="flex justify-between border-b border-gray-200 pb-1">
                            <span className="opacity-50 uppercase text-[10px]">PIC Name</span>
                            <span className="font-bold">{formData.picName}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-1">
                            <span className="opacity-50 uppercase text-[10px]">Company</span>
                            <span className="font-bold">{formData.companyName}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-1">
                            <span className="opacity-50 uppercase text-[10px]">Registrants</span>
                            <span className="font-bold">{formData.registrants}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-1">
                            <span className="opacity-50 uppercase text-[10px]">Attendees</span>
                            <span className="font-bold">{formData.attendees}</span>
                        </div>
                    </div>
                </ConstructionCard>

                {/* Score / Stats (Right) */}
                <ConstructionCard title="Performance Data" themeColor={themeColor}>
                    <div className="flex h-full items-center justify-around" style={{ color: themeColor }}>
                        <div className="text-center">
                            <div className="text-4xl font-extrabold">{formData.attendanceScore || '-'}</div>
                            <div className="text-[9px] uppercase tracking-widest opacity-70 font-semibold">Feedback Score</div>
                        </div>
                        <div className="w-px h-12 bg-gray-300"></div>
                        <div className="text-center">
                            <div className="text-4xl font-extrabold opacity-80">
                                {formData.registrants > 0 ? Math.round((formData.attendees / formData.registrants) * 100) : 0}%
                            </div>
                            <div className="text-[9px] uppercase tracking-widest opacity-70 font-semibold">Turnout</div>
                        </div>
                    </div>
                </ConstructionCard>

                {/* Technical Report (Full Width) */}
                <div className="col-span-2">
                    <ConstructionCard title="Technical & Non-Technical Report" themeColor={themeColor}>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h4 className="opacity-70 uppercase font-bold text-[10px] mb-2 border-b border-gray-200" style={{ color: themeColor }}>Technical Issues</h4>
                                <p className="min-h-[40px] whitespace-pre-line text-gray-700">{formData.technicalIssues || '-'}</p>

                                <h4 className="uppercase font-bold text-[10px] mb-2 mt-4 border-b border-gray-200" style={{ color: themeColor }}>Solution</h4>
                                <p className="whitespace-pre-line text-gray-900 font-medium">{formData.solTechnical || '-'}</p>
                            </div>
                            <div>
                                <h4 className="opacity-70 uppercase font-bold text-[10px] mb-2 border-b border-gray-200" style={{ color: themeColor }}>Non-Technical Issues</h4>
                                <p className="min-h-[40px] whitespace-pre-line text-gray-700">{formData.nonTechnicalIssues || '-'}</p>

                                <h4 className="uppercase font-bold text-[10px] mb-2 mt-4 border-b border-gray-200" style={{ color: themeColor }}>Solution</h4>
                                <p className="whitespace-pre-line text-gray-900 font-medium">{formData.solNonTechnical || '-'}</p>
                            </div>
                        </div>
                    </ConstructionCard>
                </div>

                {/* Major Issues (Full Width) */}
                {(formData.majorIssues || formData.solMajor) && (
                    <div className="col-span-2">
                        <ConstructionCard title="Critical Incidents (Major)" themeColor={themeColor}>
                            <div className="grid grid-cols-2 gap-6 text-[#9e463a]">
                                <div>
                                    <h4 className="uppercase font-bold text-[10px] mb-1 opacity-70">Incident</h4>
                                    <p className="whitespace-pre-line font-bold">{formData.majorIssues}</p>
                                </div>
                                <div>
                                    <h4 className="uppercase font-bold text-[10px] mb-1 opacity-70">Action Required</h4>
                                    <p className="whitespace-pre-line font-bold">{formData.solMajor}</p>
                                </div>
                            </div>
                        </ConstructionCard>
                    </div>
                )}

                {/* Evaluation (Full Width) */}
                <div className="col-span-2">
                    <ConstructionCard title="Evaluation & Notes" themeColor={themeColor}>
                        <p className="whitespace-pre-line italic text-gray-600">{formData.evaluation || 'No additional notes recorded.'}</p>
                    </ConstructionCard>
                </div>

                {/* Signatures */}
                <div className="col-span-2 mt-4 flex justify-between px-8">
                    <div className="text-center bg-white p-2 rounded shadow-sm border border-gray-200">
                        <div className="h-16 flex items-end justify-center w-40">
                            {signature && <img src={signature} alt="Sig" className="max-h-14 mix-blend-multiply" />}
                        </div>
                        <div className="border-t-2 border-current w-full mt-1 pt-1 font-bold uppercase" style={{ color: themeColor }}>{formData.picName}</div>
                        <div className="text-[9px] uppercase tracking-widest opacity-60 font-semibold">Reported By</div>
                    </div>

                    <div className="text-center bg-white p-2 rounded shadow-sm border border-gray-200">
                        <div className="h-16 w-40"></div>
                        <div className="border-t-2 border-current w-full mt-1 pt-1 font-bold uppercase" style={{ color: themeColor }}>__________________</div>
                        <div className="text-[9px] uppercase tracking-widest opacity-60 font-semibold">Approved By</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const ConstructionCard = ({ title, children, themeColor }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-white/50 h-full ring-1 ring-black/5">
        <h3
            className="font-extrabold uppercase tracking-widest text-[10px] mb-3 border-b-2 border-gray-100 inline-block pb-0.5"
            style={{ color: themeColor }}
        >
            {title}
        </h3>
        <div className="text-gray-700 leading-relaxed font-medium">
            {children}
        </div>
    </div>
);

export default ConstructionTemplate;
