/**
 * PDFGenerator Module
 * Encapsulates all logic for creating a professional Ship Manifest PDF.
 * Expects window.jspdf to be available.
 */
const PDFGenerator = (function() {
    // Configuration constants
    const MARGIN = 20;
    const PAGE_WIDTH = 210; // A4 Standard
    const PAGE_HEIGHT = 297; // A4 Standard
    const CONTENT_WIDTH = PAGE_WIDTH - (2 * MARGIN);
    const PAGE_BREAK_THRESHOLD = PAGE_HEIGHT - 25; // Leave 25mm margin at bottom
    
    const COLORS = {
        PRIMARY: [44, 62, 80],   // Dark Blue/Slate
        SECONDARY: [100, 100, 100],
        ACCENT: [0, 86, 179]
    };

    /**
     * Internal helper to draw the page header
     */
    function drawHeader(doc, y, data) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(...COLORS.PRIMARY);
        const shipClass = data.ship_class || "Starship";
        doc.text(`${shipClass.toUpperCase()} CLASS - SHIP MANIFEST`, MARGIN, y);
        
        y += 8;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...COLORS.SECONDARY);
        doc.text(`Type: ${data.ship_type || 'N/A'} | Hull: ${data.hull_tonnage || 0} tons | Generated: ${new Date().toLocaleString()}`, MARGIN, y);
        
        y += 5;
        doc.setDrawColor(...COLORS.PRIMARY);
        doc.setLineWidth(0.5);
        doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
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

    /**
     * Check if we need a page break and handle it
     */
    function checkPageBreak(doc, yPos, requiredSpace = 20) {
        if (yPos + requiredSpace > PAGE_BREAK_THRESHOLD) {
            doc.addPage();
            return 20; // Reset to top of new page
        }
        return yPos;
    }

    /**
     * Draw a key-value pair
     */
    function drawKeyValue(doc, key, value, yPos, keyX = MARGIN + 5, valueX = MARGIN + 60) {
        doc.setFont("helvetica", "bold");
        doc.text(key, keyX, yPos);
        doc.setFont("helvetica", "normal");
        doc.text(String(value), valueX, yPos);
        return yPos + 7;
    }

    return {
        /**
         * Main Generation entry point
         * @param {Object} data - The ship data object (JSON)
         * @param {Array} masterProgramList - Array of all possible programs for lookup
         */
        generate: function(data, masterProgramList) {
            // Validate inputs
            if (!data || typeof data !== 'object') {
                console.error("Invalid data object provided to PDFGenerator");
                alert("Error: Invalid ship data. Cannot generate PDF.");
                return;
            }

            if (!Array.isArray(masterProgramList)) {
                console.error("Invalid masterProgramList provided to PDFGenerator");
                alert("Error: Invalid program list. Cannot generate PDF.");
                return;
            }

            // Check for jsPDF library with proper fallback chain
            const jsPDF = window.jspdf?.jsPDF || window.jsPDF;
            
            if (!jsPDF) {
                console.error("jsPDF library not found. Please ensure the library is loaded.");
                alert("Error: PDF library not loaded. Please refresh the page and try again.");
                return;
            }

            try {
                const doc = new jsPDF();
                let yPos = 20;

                // 1. Ship Header
                yPos = drawHeader(doc, yPos, data);

                // 2. Hull & Configuration
                yPos = drawSectionHeader(doc, "I. Hull Configuration", yPos);
                doc.setFontSize(11);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(0, 0, 0);

                yPos = drawKeyValue(doc, "Hull Tonnage:", `${data.hull_tonnage || 0} tons`, yPos);
                yPos = drawKeyValue(doc, "Ship Class:", data.ship_class || "Unclassified", yPos);
                yPos = drawKeyValue(doc, "Ship Type:", data.ship_type || "N/A", yPos);
                yPos = drawKeyValue(doc, "Streamlined:", data.isStreamlined ? "Yes" : "No", yPos);
                if (data.armor && data.armor.armor_letter) {
                    yPos = drawKeyValue(doc, "Armor Rating:", `Type ${data.armor.armor_letter}`, yPos);
                }
                yPos += 8;

                // 3. Propulsion Systems
                yPos = checkPageBreak(doc, yPos, 40);
                yPos = drawSectionHeader(doc, "II. Propulsion Systems", yPos);
                
                if (data.jump_drive) {
                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(10);
                    doc.text("Jump Drive:", MARGIN + 5, yPos);
                    yPos += 6;
                    doc.setFontSize(11);
                    yPos = drawKeyValue(doc, "  Drive Letter:", data.jump_drive.drive_letter || "N/A", yPos);
                    yPos = drawKeyValue(doc, "  Rating:", `Jump-${data.jump_drive.drive_rating || 0}`, yPos);
                    yPos = drawKeyValue(doc, "  Mass:", `${data.jump_drive.mass_tons || 0} tons`, yPos);
                    yPos = drawKeyValue(doc, "  Cost:", `MCr ${data.jump_drive.cost_mcr || 0}`, yPos);
                    yPos += 3;
                }

                if (data.maneuver_drive) {
                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(10);
                    doc.text("Maneuver Drive:", MARGIN + 5, yPos);
                    yPos += 6;
                    doc.setFontSize(11);
                    yPos = drawKeyValue(doc, "  Drive Letter:", data.maneuver_drive.drive_letter || "N/A", yPos);
                    yPos = drawKeyValue(doc, "  Rating:", `M-Drive ${data.maneuver_drive.drive_rating || 0}`, yPos);
                    yPos = drawKeyValue(doc, "  Mass:", `${data.maneuver_drive.mass_tons || 0} tons`, yPos);
                    yPos = drawKeyValue(doc, "  Cost:", `MCr ${data.maneuver_drive.cost_mcr || 0}`, yPos);
                    yPos += 3;
                }

                if (data.power_plant) {
                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(10);
                    doc.text("Power Plant:", MARGIN + 5, yPos);
                    yPos += 6;
                    doc.setFontSize(11);
                    yPos = drawKeyValue(doc, "  Drive Letter:", data.power_plant.drive_letter || "N/A", yPos);
                    yPos = drawKeyValue(doc, "  Mass:", `${data.power_plant.mass_tons || 0} tons`, yPos);
                    yPos = drawKeyValue(doc, "  Cost:", `MCr ${data.power_plant.cost_mcr || 0}`, yPos);
                }
                yPos += 8;

                // 4. Computer System
                yPos = checkPageBreak(doc, yPos, 40);
                yPos = drawSectionHeader(doc, "III. Computer System", yPos);
                
                const comp = data.computer || {};
                const totalCap = (comp.cpu_capacity || 0) + (comp.storage_capacity || 0);
                
                yPos = drawKeyValue(doc, "Model:", comp.model || "Standard", yPos);
                yPos = drawKeyValue(doc, "Tech Level:", `TL-${comp.tl || 'Unrated'}`, yPos);
                yPos = drawKeyValue(doc, "CPU Capacity:", `${comp.cpu_capacity || 0} Units`, yPos);
                yPos = drawKeyValue(doc, "Storage Capacity:", `${comp.storage_capacity || 0} Units`, yPos);
                yPos = drawKeyValue(doc, "Total Capacity:", `${totalCap} Units`, yPos);
                yPos = drawKeyValue(doc, "Mass:", `${comp.tons || 0} tons`, yPos);
                yPos = drawKeyValue(doc, "Cost:", `MCr ${comp.mcr || 0}`, yPos);
                yPos += 8;

                // 5. Accommodations
                yPos = checkPageBreak(doc, yPos, 30);
                yPos = drawSectionHeader(doc, "IV. Crew Accommodations", yPos);
                
                yPos = drawKeyValue(doc, "Staterooms:", data.staterooms || 0, yPos);
                yPos = drawKeyValue(doc, "Low Berths:", data.low_berths || 0, yPos);
                
                if (data.crew_requirements && data.crew_requirements.length > 0) {
                    doc.setFont("helvetica", "bold");
                    doc.text("Required Crew:", MARGIN + 5, yPos);
                    yPos += 6;
                    doc.setFont("helvetica", "normal");
                    data.crew_requirements.forEach(role => {
                        doc.text(`  • ${role}`, MARGIN + 10, yPos);
                        yPos += 6;
                    });
                }
                yPos += 5;

                // 6. Armament
                yPos = checkPageBreak(doc, yPos, 30);
                yPos = drawSectionHeader(doc, "V. Armament", yPos);
                
                if (!data.armament || data.armament.length === 0) {
                    doc.setFont("helvetica", "italic");
                    doc.text("No weapons installed.", MARGIN + 5, yPos);
                    yPos += 10;
                } else {
                    data.armament.forEach((weapon, idx) => {
                        doc.setFont("helvetica", "bold");
                        doc.text(`Hardpoint ${idx + 1}:`, MARGIN + 5, yPos);
                        yPos += 6;
                        doc.setFont("helvetica", "normal");
                        yPos = drawKeyValue(doc, "  Mount:", weapon.mount || "N/A", yPos, MARGIN + 10, MARGIN + 60);
                        yPos = drawKeyValue(doc, "  Weapon:", weapon.weapon || "N/A", yPos, MARGIN + 10, MARGIN + 60);
                        yPos += 3;
                    });
                }
                yPos += 5;

                // 7. Software Manifest
                const currentLoad = (data.programs || []).reduce((acc, title) => {
                    const p = masterProgramList.find(x => x.title === title);
                    return acc + (p ? p.space : 0);
                }, 0);

                yPos = checkPageBreak(doc, yPos, 30);
                yPos = drawSectionHeader(doc, `VI. Installed Software (${currentLoad} / ${totalCap} Capacity Used)`, yPos);
                
                if (!data.programs || data.programs.length === 0) {
                    doc.setFont("helvetica", "italic");
                    doc.text("No software modules installed.", MARGIN + 5, yPos);
                    yPos += 10;
                } else {
                    // Table Headers
                    doc.setFontSize(10);
                    doc.setFont("helvetica", "bold");
                    doc.text("Program", MARGIN + 5, yPos);
                    doc.text("Space", MARGIN + 85, yPos);
                    doc.text("Description", MARGIN + 105, yPos);
                    yPos += 4;
                    doc.setDrawColor(...COLORS.SECONDARY);
                    doc.setLineWidth(0.2);
                    doc.line(MARGIN + 5, yPos, PAGE_WIDTH - MARGIN, yPos);
                    yPos += 8;

                    doc.setFont("helvetica", "normal");
                    data.programs.forEach(title => {
                        const p = masterProgramList.find(x => x.title === title);
                        if (p) {
                            const desc = doc.splitTextToSize(p.description, 80);
                            const linesNeeded = desc.length;
                            const spaceNeeded = (linesNeeded * 5) + 5;
                            
                            yPos = checkPageBreak(doc, yPos, spaceNeeded);
                            
                            doc.setFont("helvetica", "bold");
                            doc.text(p.title, MARGIN + 5, yPos);
                            
                            doc.setFont("helvetica", "normal");
                            doc.text(p.space.toString(), MARGIN + 85, yPos);
                            doc.text(desc, MARGIN + 105, yPos);
                            
                            yPos += spaceNeeded;
                        }
                    });
                }
                yPos += 8;

                // 8. Fuel & Cargo
                yPos = checkPageBreak(doc, yPos, 30);
                yPos = drawSectionHeader(doc, "VII. Storage & Fuel", yPos);
                
                doc.setFontSize(11);
                yPos = drawKeyValue(doc, "Fuel Capacity:", `${data.fuel_tons || 0} tons`, yPos);
                if (data.fuel_per_jump) {
                    yPos = drawKeyValue(doc, "Fuel per Jump:", `${data.fuel_per_jump} tons`, yPos);
                }
                yPos = drawKeyValue(doc, "Cargo Hold:", `${data.cargo_tons || 0} tons`, yPos);
                yPos += 8;

                // 9. Performance Statistics
                if (data.calculated_statistics) {
                    yPos = checkPageBreak(doc, yPos, 40);
                    yPos = drawSectionHeader(doc, "VIII. Performance Statistics", yPos);
                    
                    const stats = data.calculated_statistics;
                    yPos = drawKeyValue(doc, "Jump Rating:", `J-${stats.jump_drive_rating || 0}`, yPos);
                    yPos = drawKeyValue(doc, "Maneuver Rating:", `${stats.maneuver_drive_rating || 0}G`, yPos);
                    yPos = drawKeyValue(doc, "Speed (Hexes):", stats.speedHexes || 0, yPos);
                    yPos = drawKeyValue(doc, "Turn Radius:", `${stats.turnRadius || 0} hexes`, yPos);
                    yPos = drawKeyValue(doc, "Agility DM:", stats.aManeuverDM || "0", yPos);
                    yPos = drawKeyValue(doc, "Armor Points:", stats.armor_points || 0, yPos);
                    yPos += 8;
                }

                // 10. Financial Summary
                yPos = checkPageBreak(doc, yPos, 50);
                doc.setDrawColor(...COLORS.PRIMARY);
                doc.setLineWidth(0.5);
                doc.line(MARGIN, yPos, PAGE_WIDTH - MARGIN, yPos);
                yPos += 10;
                
                yPos = drawSectionHeader(doc, "IX. Financial Summary", yPos);
                
                if (data.calculated_statistics) {
                    const stats = data.calculated_statistics;
                    yPos = drawKeyValue(doc, "Hull Cost:", `MCr ${stats.hull_cost || 0}`, yPos);
                    yPos = drawKeyValue(doc, "Components Cost:", `MCr ${stats.total_component_cost || 0}`, yPos);
                    yPos = drawKeyValue(doc, "Design Fee:", `MCr ${stats.design_cost || 0}`, yPos);
                    if (stats.streamlining_cost && parseFloat(stats.streamlining_cost) > 0) {
                        yPos = drawKeyValue(doc, "Streamlining:", `MCr ${stats.streamlining_cost}`, yPos);
                    }
                    yPos += 5;
                    
                    doc.setFontSize(14);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor(...COLORS.ACCENT);
                    const totalCost = stats.total_final_cost || 0;
                    doc.text(`TOTAL VALUATION: MCr ${parseFloat(totalCost).toLocaleString()}`, MARGIN, yPos);
                }

                // 11. Notes (if any)
                if (data.notes && data.notes.trim()) {
                    yPos += 15;
                    yPos = checkPageBreak(doc, yPos, 30);
                    yPos = drawSectionHeader(doc, "X. Additional Notes", yPos);
                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(10);
                    const notesLines = doc.splitTextToSize(data.notes, CONTENT_WIDTH - 10);
                    doc.text(notesLines, MARGIN + 5, yPos);
                }

                // Trigger Download
                const shipName = data.ship_class || "Ship";
                const fileName = `${shipName}_Manifest_${Date.now()}.pdf`;
                doc.save(fileName);
                
                console.log(`PDF generated successfully: ${fileName}`);
                
            } catch (error) {
                console.error("Error generating PDF:", error);
                alert("An error occurred while generating the PDF. Please check the console for details.");
            }
        }
    };
})();
