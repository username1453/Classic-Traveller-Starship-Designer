/**
 * PDFGenerator Module
 * Encapsulates all logic for creating a professional Ship Manifest PDF.
 * Expects window.jspdf to be available.
 */
const PDFGenerator = (function() {
    // Configuration constants
    const MARGIN = 20;
    const PAGE_WIDTH = 210; // A4 Standard
    const COLORS = {
        PRIMARY: [44, 62, 80],   // Dark Blue/Slate
        SECONDARY: [100, 100, 100],
        ACCENT: [0, 86, 179]
    };

    /**
     * Internal helper to draw the page header
     */
    function drawHeader(doc, y) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(...COLORS.PRIMARY);
        doc.text("STARSHIP COMPUTER MANIFEST", MARGIN, y);
        
        y += 8;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...COLORS.SECONDARY);
        doc.text(`System Registry Date: ${new Date().toLocaleString()}`, MARGIN, y);
        
        y += 5;
        doc.setDrawColor(...COLORS.PRIMARY);
        doc.setLineWidth(0.5);
        doc.line(MARGIN, y, 190, y);
        return y + 15;
    }

    /**
     * Internal helper to draw section titles
     */
    function drawSectionHeader(doc, title, y) {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...COLORS.PRIMARY);
        doc.text(title, MARGIN, y);
        return y + 10;
    }

    return {
        /**
         * Main Generation entry point
         * @param {Object} data - The ship data object (JSON)
         * @param {Array} masterProgramList - Array of all possible programs for lookup
         */
        generate: function(data, masterProgramList) {
            // This checks both common locations for the library to ensure it works
            const { jsPDF } = window.jspdf || window.jspdf.jsPDF || window;
            
            if (!jsPDF) {
                console.error("jsPDF library not found on window object.");
                return;
            }
            const doc = new jsPDF();
            let yPos = 20;

            // 1. Branding Header
            yPos = drawHeader(doc, yPos);

            // 2. Hardware Specs Section
            yPos = drawSectionHeader(doc, "I. Hardware Configuration", yPos);
            doc.setFontSize(11);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(0, 0, 0);

            const comp = data.computer || {};
            const totalCap = (comp.cpu_capacity || 0) + (comp.storage_capacity || 0);
            
            const specs = [
                ["Model Identifier:", comp.model || "Standard Model"],
                ["Tech Level Rating:", `TL-${comp.tl || 'Unrated'}`],
                ["CPU Throughput:", `${comp.cpu_capacity || 0} Units`],
                ["Storage Volume:", `${comp.storage_capacity || 0} Units`],
                ["Max Unified Load:", `${totalCap} Capacity Units`]
            ];

            specs.forEach(pair => {
                doc.setFont("helvetica", "bold");
                doc.text(pair[0], MARGIN + 5, yPos);
                doc.setFont("helvetica", "normal");
                doc.text(pair[1], MARGIN + 60, yPos);
                yPos += 7;
            });

            yPos += 10;

            // 3. Software Manifest Section
            const currentLoad = (data.programs || []).reduce((acc, title) => {
                const p = masterProgramList.find(x => x.title === title);
                return acc + (p ? p.space : 0);
            }, 0);

            yPos = drawSectionHeader(doc, `II. Active Software Registry (${currentLoad} / ${totalCap} Capacity Used)`, yPos);
            
            if (!data.programs || data.programs.length === 0) {
                doc.setFont("helvetica", "italic");
                doc.text("No active software modules detected in storage.", MARGIN + 5, yPos);
            } else {
                // Table Headers
                doc.setFontSize(10);
                doc.setFont("helvetica", "bold");
                doc.text("Software Module", MARGIN + 5, yPos);
                doc.text("Load", MARGIN + 85, yPos);
                doc.text("Functional Description", MARGIN + 105, yPos);
                yPos += 4;
                doc.setDrawColor(...COLORS.SECONDARY);
                doc.setLineWidth(0.2);
                doc.line(MARGIN + 5, yPos, 190, yPos);
                yPos += 8;

                doc.setFont("helvetica", "normal");
                data.programs.forEach(title => {
                    const p = masterProgramList.find(x => x.title === title);
                    if (p) {
                        // Page Break Check
                        if (yPos > 275) { 
                            doc.addPage(); 
                            yPos = 20; 
                            doc.setFont("helvetica", "bold");
                            doc.text("Software Module (Cont.)", MARGIN + 5, yPos);
                            yPos += 10;
                            doc.setFont("helvetica", "normal");
                        }
                        
                        doc.setFont("helvetica", "bold");
                        doc.text(p.title, MARGIN + 5, yPos);
                        
                        doc.setFont("helvetica", "normal");
                        doc.text(p.space.toString(), MARGIN + 85, yPos);
                        
                        // Description text wrapping
                        const desc = doc.splitTextToSize(p.description, 80);
                        doc.text(desc, MARGIN + 105, yPos);
                        
                        // Increment yPos based on lines in description
                        yPos += (desc.length * 5) + 3;
                    }
                });
            }

            // 4. Financial Summary
            yPos += 15;
            if (yPos > 270) { doc.addPage(); yPos = 20; }
            doc.setDrawColor(...COLORS.PRIMARY);
            doc.setLineWidth(0.5);
            doc.line(MARGIN, yPos, 190, yPos);
            yPos += 10;
            
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            const cost = data.calculated_statistics?.total_final_cost || 0;
            doc.text(`Total System Valuation: MCr ${cost.toLocaleString()}`, MARGIN, yPos);

            // Trigger Download
            const fileName = `ShipManifest_${Date.now()}.pdf`;
            doc.save(fileName);
        }
    };
})();
