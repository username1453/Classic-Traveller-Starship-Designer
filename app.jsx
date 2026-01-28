// IMPORTANT: This file is designed to run directly in the browser using global React and ReactDOM.
// Therefore, 'import' statements for React and ReactDOM are intentionally omitted.
// They are loaded via CDN in index.html.

const hullCosts = {
  100: 2,
  200: 8,
  400: 16,
  600: 48,
  800: 80,
  1000: 100
};

const shipDatabase = {
  "drives": {
    "jump_drives": [
      { "drive_letter": "A", "mass_tons": 10, "cost_mcr": 10 },
      { "drive_letter": "B", "mass_tons": 15, "cost_mcr": 20 },
      { "drive_letter": "C", "mass_tons": 20, "cost_mcr": 30 },
      { "drive_letter": "D", "mass_tons": 25, "cost_mcr": 40 },
      { "drive_letter": "E", "mass_tons": 30, "cost_mcr": 50 },
      { "drive_letter": "F", "mass_tons": 35, "cost_mcr": 60 },
      { "drive_letter": "G", "mass_tons": 40, "cost_mcr": 70 },
      { "drive_letter": "H", "mass_tons": 45, "cost_mcr": 80 },
      { "drive_letter": "J", "mass_tons": 50, "cost_mcr": 90 },
      { "drive_letter": "K", "mass_tons": 55, "cost_mcr": 100 },
      { "drive_letter": "L", "mass_tons": 60, "cost_mcr": 110 },
      { "drive_letter": "M", "mass_tons": 65, "cost_mcr": 120 },
      { "drive_letter": "N", "mass_tons": 70, "cost_mcr": 130 },
      { "drive_letter": "P", "mass_tons": 75, "cost_mcr": 140 },
      { "drive_letter": "Q", "mass_tons": 80, "cost_mcr": 150 },
      { "drive_letter": "R", "mass_tons": 85, "cost_mcr": 160 },
      { "drive_letter": "S", "mass_tons": 90, "cost_mcr": 170 },
      { "drive_letter": "T", "mass_tons": 95, "cost_mcr": 180 },
      { "drive_letter": "U", "mass_tons": 100, "cost_mcr": 190 },
      { "drive_letter": "V", "mass_tons": 105, "cost_mcr": 200 },
      { "drive_letter": "W", "mass_tons": 110, "cost_mcr": 210 },
      { "drive_letter": "X", "mass_tons": 115, "cost_mcr": 220 },
      { "drive_letter": "Y", "mass_tons": 120, "cost_mcr": 230 },
      { "drive_letter": "Z", "mass_tons": 125, "cost_mcr": 240 }
    ],
    "maneuver_drives": [
      { "drive_letter": "A", "mass_tons": 1, "cost_mcr": 4 },
      { "drive_letter": "B", "mass_tons": 3, "cost_mcr": 8 },
      { "drive_letter": "C", "mass_tons": 5, "cost_mcr": 12 },
      { "drive_letter": "D", "mass_tons": 7, "cost_mcr": 16 },
      { "drive_letter": "E", "mass_tons": 9, "cost_mcr": 20 },
      { "drive_letter": "F", "mass_tons": 11, "cost_mcr": 24 },
      { "drive_letter": "G", "mass_tons": 13, "cost_mcr": 28 },
      { "drive_letter": "H", "mass_tons": 15, "cost_mcr": 32 },
      { "drive_letter": "J", "mass_tons": 17, "cost_mcr": 36 },
      { "drive_letter": "K", "mass_tons": 19, "cost_mcr": 40 },
      { "drive_letter": "L", "mass_tons": 21, "cost_mcr": 44 },
      { "drive_letter": "M", "mass_tons": 23, "cost_mcr": 48 },
      { "drive_letter": "N", "mass_tons": 25, "cost_mcr": 52 },
      { "drive_letter": "P", "mass_tons": 27, "cost_mcr": 56 },
      { "drive_letter": "Q", "mass_tons": 29, "cost_mcr": 60 },
      { "drive_letter": "R", "mass_tons": 31, "cost_mcr": 64 },
      { "drive_letter": "S", "mass_tons": 33, "cost_mcr": 68 },
      { "drive_letter": "T", "mass_tons": 35, "cost_mcr": 72 },
      { "drive_letter": "U", "mass_tons": 37, "cost_mcr": 76 },
      { "drive_letter": "V", "mass_tons": 39, "cost_mcr": 80 },
      { "drive_letter": "W", "mass_tons": 41, "cost_mcr": 84 },
      { "drive_letter": "X", "mass_tons": 43, "cost_mcr": 88 },
      { "drive_letter": "Y", "mass_tons": 45, "cost_mcr": 92 },
      { "drive_letter": "Z", "mass_tons": 47, "cost_mcr": 96 }
    ],
    "power_plants": [
      { "drive_letter": "A", "mass_tons": 4, "cost_mcr": 8 },
      { "drive_letter": "B", "mass_tons": 7, "cost_mcr": 16 },
      { "drive_letter": "C", "mass_tons": 10, "cost_mcr": 24 },
      { "drive_letter": "D", "mass_tons": 13, "cost_mcr": 32 },
      { "drive_letter": "E", "mass_tons": 16, "cost_mcr": 40 },
      { "drive_letter": "F", "mass_tons": 19, "cost_mcr": 48 },
      { "drive_letter": "G", "mass_tons": 22, "cost_mcr": 56 },
      { "drive_letter": "H", "mass_tons": 25, "cost_mcr": 64 },
      { "drive_letter": "J", "mass_tons": 28, "cost_mcr": 72 },
      { "drive_letter": "K", "mass_tons": 31, "cost_mcr": 80 },
      { "drive_letter": "L", "mass_tons": 34, "cost_mcr": 88 },
      { "drive_letter": "M", "mass_tons": 37, "cost_mcr": 96 },
      { "drive_letter": "N", "mass_tons": 40, "cost_mcr": 104 },
      { "drive_letter": "P", "mass_tons": 43, "cost_mcr": 112 },
      { "drive_letter": "Q", "mass_tons": 46, "cost_mcr": 120 },
      { "drive_letter": "R", "mass_tons": 49, "cost_mcr": 128 },
      { "drive_letter": "S", "mass_tons": 52, "cost_mcr": 136 },
      { "drive_letter": "T", "mass_tons": 55, "cost_mcr": 144 },
      { "drive_letter": "U", "mass_tons": 58, "cost_mcr": 152 },
      { "drive_letter": "V", "mass_tons": 61, "cost_mcr": 160 },
      { "drive_letter": "W", "mass_tons": 64, "cost_mcr": 168 },
      { "drive_letter": "X", "mass_tons": 67, "cost_mcr": 176 },
      { "drive_letter": "Y", "mass_tons": 70, "cost_mcr": 184 },
      { "drive_letter": "Z", "mass_tons": 73, "cost_mcr": 192 }
    ]
  },
  "computers": [
    { "model": "1", "mcr": 2, "tons": 1, "cpu_capacity": 2, "storage_capacity": 4, "tl": 5 },
    { "model": "1bis", "mcr": 4, "tons": 1, "cpu_capacity": 4, "storage_capacity": 0, "tl": 6 },
    { "model": "2", "mcr": 9, "tons": 2, "cpu_capacity": 3, "storage_capacity": 6, "tl": 7 },
    { "model": "2bis", "mcr": 18, "tons": 2, "cpu_capacity": 6, "storage_capacity": 0, "tl": 8 },
    { "model": "3", "mcr": 18, "tons": 3, "cpu_capacity": 5, "storage_capacity": 9, "tl": 9 },
    { "model": "3bis", "mcr": 36, "tons": 3, "cpu_capacity": 10, "storage_capacity": 0, "tl": "A" },
    { "model": "4", "mcr": 30, "tons": 4, "cpu_capacity": 8, "storage_capacity": 15, "tl": "A" },
    { "model": "5", "mcr": 45, "tons": 5, "cpu_capacity": 12, "storage_capacity": 25, "tl": "B" },
    { "model": "6", "mcr": 55, "tons": 7, "cpu_capacity": 15, "storage_capacity": 35, "tl": "C" },
    { "model": "7", "mcr": 80, "tons": 9, "cpu_capacity": 20, "storage_capacity": 50, "tl": "D" }
  ],
  "drive_potential_by_tonnage": [
    { "hull_tons": 100, "drive_letter_to_level_mapping": { "A": 2, "B": 4, "C": 6 } },
    { "hull_tons": 200, "drive_letter_to_level_mapping": { "A": 1, "B": 2, "C": 3, "D": 4, "E": 5, "F": 6 } },
    { "hull_tons": 400, "drive_letter_to_level_mapping": { "B": 1, "C": 1, "D": 2, "E": 2, "F": 3, "G": 3, "H": 4, "J": 4, "K": 5, "L": 5, "M": 6, "N": 6 } },
    { "hull_tons": 600, "drive_letter_to_level_mapping": { "C": 1, "D": 1, "E": 1, "F": 2, "G": 2, "H": 2, "J": 3, "K": 3, "L": 3, "M": 4, "N": 4, "P": 4, "Q": 5, "R": 5, "S": 5, "T": 6, "U": 6, "V": 6 } },
    { "hull_tons": 800, "drive_letter_to_level_mapping": { "D": 1, "E": 1, "F": 1, "G": 1, "H": 2, "J": 2, "K": 2, "L": 2, "M": 3, "N": 3, "P": 3, "Q": 3, "R": 4, "S": 4, "T": 4, "U": 4, "V": 5, "W": 5, "X": 6, "Y": 6, "Z": 6 } },
    { "hull_tons": 1000, "drive_letter_to_level_mapping": { "E": 1, "F": 1, "G": 1, "H": 1, "J": 1, "K": 2, "L": 2, "M": 2, "N": 2, "P": 2, "Q": 3, "R": 3, "S": 3, "T": 3, "U": 3, "V": 4, "W": 5, "X": 6, "Y": 6, "Z": 6 } },
    { "hull_tons": 2000, "drive_letter_to_level_mapping": { "J": 1, "K": 1, "L": 1, "M": 1, "N": 1, "P": 1, "Q": 1, "R": 1, "S": 1, "T": 1, "U": 1, "V": 2, "W": 2, "X": 3, "Y": 4, "Z": 6 } },
    { "hull_tons": 3000, "drive_letter_to_level_mapping": { "Q": 1, "R": 1, "S": 1, "T": 1, "U": 1, "V": 1, "W": 1, "X": 2, "Y": 2, "Z": 4 } },
    { "hull_tons": 4000, "drive_letter_to_level_mapping": { "V": 1, "W": 1, "X": 1, "Y": 2, "Z": 3 } },
    { "hull_tons": 5000, "drive_letter_to_level_mapping": { "W": 1, "X": 1, "Y": 1, "Z": 2 } }
  ],
  "armament": {
    "mounts": [
      { "item": "Hardpoint", "mass_tons": 1, "cost_mcr": 0.1, "description": "Requires one ton for fire control" },
      { "item": "Single Turret", "mass_tons": null, "cost_mcr": 0.2 },
      { "item": "Double Turret", "mass_tons": null, "cost_mcr": 0.5 },
      { "item": "Triple Turret", "mass_tons": null, "cost_mcr": 1 }
    ],
    "weapons": [
      { "item": "Pulse Laser", "mass_tons": null, "cost_mcr": 0.5 },
      { "item": "Beam Laser", "mass_tons": null, "cost_mcr": 1 },
      { "item": "Missile Rack", "mass_tons": null, "cost_mcr": 0.75 },
      { "item": "Sandcaster", "mass_tons": null, "cost_mcr": 0.25 },
      { "item": "None", "mass_tons": null, "cost_mcr": 0 }
    ]
  },
  "fittings": [
    { "item": "Stateroom", "mass_tons": 4, "cost_mcr": 0.5 },
    { "item": "Low Berth", "mass_tons": 0.5, "cost_mcr": 0.05 },
    { "item": "Emergency Low Berth", "mass_tons": 1, "cost_mcr": 0.1 },
    { "item": "Small Craft Stateroom", "mass_tons": 2, "cost_mcr": 0.05 },
    { "item": "Small Craft Couch", "mass_tons": 0.5, "cost_mcr": 0.025 },
    { "item": "Cargo", "mass_tons": "as required", "cost_mcr": "as required" },
    { "item": "Fuel", "mass_tons": "as required", "cost_mcr": "as required" }
  ],
  "bridge": {
    "mass_tons": "max(2% of {hull_tonnage}, 20 tons)",
    "cost_mcr": "0.5 * {hull_tonnage}/100"
  },
  "armament_capacity": {
    "hardpoints": "One per 100 tons of ship",
    "turrets": "Each hardpoint can mount one turret"
  }
};

const crewRequirements = {
  pilot: { min: 1, tonnage: 100 },
  navigator: { min: 1, tonnage: 200 },
  engineer: { min: 1, tonnage: 35 }, // Tonnage per engineer
  steward: { min: 1, highPassengers: 8 },
  medic: { min: 1, tonnage: 200, passengers: 120 },
};

const getComponent = (list, key, value) => list.find(item => item[key] == value);

const getWeaponCount = (mountType) => {
  if (mountType === "Single Turret") return 1;
  if (mountType === "Double Turret") return 2;
  if (mountType === "Triple Turret") return 3;
  return 0; // Hardpoint with no turret
};
  
// Access React and ReactDOM from the global scope
const { useState, useEffect } = React;

function App() {
  const [ship, setShip] = useState({
    hull_tonnage: 100,
    jump_drive: shipDatabase.drives.jump_drives[0],
    maneuver_drive: shipDatabase.drives.maneuver_drives[0],
    power_plant: shipDatabase.drives.power_plants[0],
    computer: shipDatabase.computers[0],
    staterooms: 2,
    low_berths: 0, // Initialize low berths
    armament: [],
    fuel_tons: 20,
    cargo_tons: 0,
    isStreamlined: false,
    notes: ""
  });

    const [stats, setStats] = useState({
    allocated_mass: 0,
    unallocated_mass: 0,
    total_component_cost: 0,
    hull_cost: 0,
    design_cost: 0,
    streamlining_cost: 0,
    total_final_cost: 0,
    bridge_mass: 0,
    bridge_cost: 0
  });

  const [crew, setCrew] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const getDriveRating = (hullTonnage, driveLetter) => {
    const potentialEntry = shipDatabase.drive_potential_by_tonnage.find(entry => entry.hull_tons >= hullTonnage);
    if (potentialEntry) {
      return potentialEntry.drive_letter_to_level_mapping[driveLetter] || "N/A";
    }
    return "N/A";
  };
  
  const getValidDriveLetters = (hullTonnage) => {
    let validLetters = [];
    const potentialEntry = shipDatabase.drive_potential_by_tonnage.find(entry => entry.hull_tons >= hullTonnage);

    if (potentialEntry) {
      validLetters = Object.keys(potentialEntry.drive_letter_to_level_mapping);
    } else {
      validLetters = shipDatabase.drives.jump_drives.map(drive => drive.drive_letter);
    }
    return validLetters;
  };

  const calculateStats = () => {
    // Fixed hull cost calculation
    const baseHullCost = hullCosts[ship.hull_tonnage] || (ship.hull_tonnage * 0.1);
    const bridgeMass = Math.max(ship.hull_tonnage * 0.02, 20);
    const bridgeCostMcr = (ship.hull_tonnage / 100) * 0.5;
  
    let allocatedMass = bridgeMass;
    let totalComponentCostMcr = baseHullCost + bridgeCostMcr;
    
    if (ship.jump_drive) {
      allocatedMass += ship.jump_drive.mass_tons;
      totalComponentCostMcr += ship.jump_drive.cost_mcr;
    }
    if (ship.maneuver_drive) {
      allocatedMass += ship.maneuver_drive.mass_tons;
      totalComponentCostMcr += ship.maneuver_drive.cost_mcr;
    }
    if (ship.power_plant) {
      allocatedMass += ship.power_plant.mass_tons;
      totalComponentCostMcr += ship.power_plant.cost_mcr;
    }
  
    if (ship.computer) {
      allocatedMass += ship.computer.tons;
      totalComponentCostMcr += ship.computer.mcr;
    }
  
    const stateroomDetails = shipDatabase.fittings.find(f => f.item === "Stateroom");
    if (stateroomDetails) {
      allocatedMass += stateroomDetails.mass_tons * ship.staterooms;
      totalComponentCostMcr += stateroomDetails.cost_mcr * ship.staterooms;
    }
  
    // Calculate Low Berth mass and cost
    const lowBerthDetails = shipDatabase.fittings.find(f => f.item === "Low Berth");
    if (lowBerthDetails) {
      const lowBerthMassAdded = lowBerthDetails.mass_tons * ship.low_berths;
      const lowBerthCostAdded = lowBerthDetails.cost_mcr * ship.low_berths;
      allocatedMass += lowBerthMassAdded;
      totalComponentCostMcr += lowBerthCostAdded;
    }
  
    ship.armament.forEach(item => {
      const mount = shipDatabase.armament.mounts.find(m => m.item === item.mount);
      const weapon = shipDatabase.armament.weapons.find(w => w.item === item.weapon);
      
      if (mount && weapon) {
        allocatedMass += (mount.mass_tons || 0) + 1; // Hardpoint + fire control
        totalComponentCostMcr += mount.cost_mcr;
        
        const weaponCount = getWeaponCount(item.mount);
        totalComponentCostMcr += weapon.cost_mcr * weaponCount; // Multiply by quantity
      }
    });
  
    allocatedMass += ship.fuel_tons;
    
    const streamliningCostMcr = ship.isStreamlined ? (ship.hull_tonnage / 100) : 0;
    totalComponentCostMcr += streamliningCostMcr;
  
    const unallocated_mass = ship.hull_tonnage - allocatedMass;
    const cargo_tons = Math.max(0, unallocated_mass);
  
    const designCostMcr = totalComponentCostMcr * 0.01;
    const totalFinalCostMcr = totalComponentCostMcr + designCostMcr;
    
    setStats({
      allocated_mass: allocatedMass,
      unallocated_mass: unallocated_mass,
      hull_cost: baseHullCost.toFixed(2), 
      total_component_cost: totalComponentCostMcr.toFixed(2),
      design_cost: designCostMcr.toFixed(2),
      streamlining_cost: streamliningCostMcr.toFixed(2), // FIXED: was using undefined variable
      total_final_cost: (totalComponentCostMcr + designCostMcr).toFixed(2), 
      bridge_mass: bridgeMass.toFixed(2),
      bridge_cost: bridgeCostMcr.toFixed(2)
    });
    setShip(prev => ({ ...prev, cargo_tons: cargo_tons }));
  };

  const checkCrewRequirements = () => {
    let requiredCrew = [];
    let msgs = [];

    if (ship.hull_tonnage >= crewRequirements.pilot.tonnage) {
      requiredCrew.push("Pilot");
    }

    if (ship.hull_tonnage >= crewRequirements.navigator.tonnage) {
      requiredCrew.push("Navigator");
    }

    if (ship.hull_tonnage >= 200) {
      const driveTons = (ship.jump_drive?.mass_tons || 0) +
                       (ship.maneuver_drive?.mass_tons || 0);
      const numEngineers = Math.ceil(driveTons / crewRequirements.engineer.tonnage);
      if (numEngineers > 0) {
        requiredCrew.push(...Array(numEngineers).fill("Engineer"));
      }
    } else if (ship.hull_tonnage >= crewRequirements.engineer.tonnage) {
      const driveTons = (ship.jump_drive?.mass_tons || 0) +
                       (ship.maneuver_drive?.mass_tons || 0) +
                       (ship.power_plant?.mass_tons || 0);
      const numEngineers = Math.ceil(driveTons / crewRequirements.engineer.tonnage);
      if (numEngineers > 0) {
        requiredCrew.push(...Array(numEngineers).fill("Engineer"));
      }
    }

    if (ship.hull_tonnage >= crewRequirements.medic.tonnage) {
      requiredCrew.push("Medic");
    }

    if (ship.armament.length > 0) {
      ship.armament.forEach(() => {
        requiredCrew.push("Gunner");
      });
    }

    if (ship.hull_tonnage > 1000) {
        requiredCrew.push("Commanding Officer (Captain)");
        requiredCrew.push("Executive Officer");
        requiredCrew.push("Administrative Personnel", "Administrative Personnel", "Administrative Personnel");

        const minCrewRequired = Math.ceil(ship.hull_tonnage / 1000) * 10;
        const crewShortfall = minCrewRequired - requiredCrew.length;
        if (crewShortfall > 0) {
            requiredCrew.push(...Array(crewShortfall).fill("Crewman"));
        }
    }

    if (requiredCrew.length > ship.staterooms * 2) {
      msgs.push(`Warning: Insufficient staterooms for the required crew. Crew needs: ${requiredCrew.length}, Staterooms available: ${ship.staterooms * 2}`);
    } else if (requiredCrew.length > ship.staterooms) {
      msgs.push("Note: Crew will need to be double-bunked in some staterooms.");
    }

    setCrew(requiredCrew);
    setMessages(msgs);
  };
  
  useEffect(() => {
    const validDriveLetters = getValidDriveLetters(ship.hull_tonnage);
    const newShipState = { ...ship };
    let updated = false;

    if (!validDriveLetters.includes(newShipState.jump_drive.drive_letter)) {
      newShipState.jump_drive = shipDatabase.drives.jump_drives.find(d => d.drive_letter === validDriveLetters[0]);
      updated = true;
    }

    if (!validDriveLetters.includes(newShipState.maneuver_drive.drive_letter)) {
      newShipState.maneuver_drive = shipDatabase.drives.maneuver_drives.find(d => d.drive_letter === validDriveLetters[0]);
      updated = true;
    }
    
    if (updated) {
      setShip(newShipState);
    } else {
      calculateStats();
      checkCrewRequirements();
    }
    
  }, [ship.hull_tonnage]);

  useEffect(() => {
    calculateStats();
    checkCrewRequirements();
  }, [
    ship.jump_drive,
    ship.maneuver_drive,
    ship.power_plant,
    ship.computer,
    ship.staterooms,
    ship.low_berths, // Add low_berths to dependencies
    ship.armament,
    ship.fuel_tons,
    ship.isStreamlined
  ]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setShip(prev => ({ ...prev, [name]: checked }));
    } else {
      // Ensure numerical inputs are not negative and hull_tonnage doesn't exceed 5000
      let numValue = Math.max(0, parseInt(value) || 0);
      if (name === "hull_tonnage") {
        numValue = Math.min(numValue, 5000);
      }
      setShip(prev => ({ ...prev, [name]: numValue }));
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    let component;
    if (name === "jump_drive") {
      component = getComponent(shipDatabase.drives.jump_drives, 'drive_letter', value);
    } else if (name === "maneuver_drive") {
      component = getComponent(shipDatabase.drives.maneuver_drives, 'drive_letter', value);
    } else if (name === "power_plant") {
      component = getComponent(shipDatabase.drives.power_plants, 'drive_letter', value);
    } else if (name === "computer") {
      component = getComponent(shipDatabase.computers, 'model', value);
    }
    setShip(prev => ({ ...prev, [name]: component }));
  };
  
  const addArmament = () => {
    if (ship.armament.length >= Math.floor(ship.hull_tonnage / 100)) {
      setAlertMessage("Cannot add more armament. Hardpoint capacity is limited to one per 100 tons of ship.");
      setShowAlert(true);
    } else {
      setShip(prev => ({
        ...prev,
        armament: [...prev.armament, { mount: "Single Turret", weapon: "Pulse Laser" }]
      }));
    }
  };

  const removeArmament = (index) => {
    const newArmament = [...ship.armament];
    newArmament.splice(index, 1);
    setShip(prev => ({ ...prev, armament: newArmament }));
  };

  const handleArmamentChange = (index, name, value) => {
    const newArmament = [...ship.armament];
    newArmament[index][name] = value;
    setShip(prev => ({ ...prev, armament: newArmament }));
  };

  const handleExport = () => {
    // Create new drive objects with the drive_rating added
    const jumpDriveWithRating = {
      ...ship.jump_drive,
      drive_rating: getDriveRating(ship.hull_tonnage, ship.jump_drive.drive_letter)
    };
    const maneuverDriveWithRating = {
      ...ship.maneuver_drive,
      drive_rating: getDriveRating(ship.hull_tonnage, ship.maneuver_drive.drive_letter)
    };

    // Construct the final ship object with the new drive objects
    const finalShip = {
      ...ship,
      jump_drive: jumpDriveWithRating,
      maneuver_drive: maneuverDriveWithRating,
      calculated_statistics: {
        ...stats,
        cargo_tons: ship.cargo_tons
      },
      crew_requirements: crew
    };
    
    const jsonString = JSON.stringify(finalShip, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'starship_design.json';
    link.click();
    URL.revokeObjectURL(url);
  };
  
  // Corrected suggestedFuel calculation to use the drive rating
  const jumpDriveRating = parseInt(getDriveRating(ship.hull_tonnage, ship.jump_drive.drive_letter));
  const suggestedFuel = ship.jump_drive && !isNaN(jumpDriveRating) ? (0.1 * ship.hull_tonnage * jumpDriveRating) : 0;
  
  const validDriveLetters = getValidDriveLetters(ship.hull_tonnage);

  // Prepare the JSON output for display
  const currentShipJson = JSON.stringify({
    hull_tonnage: ship.hull_tonnage,
    jump_drive: {
      ...ship.jump_drive,
      drive_rating: getDriveRating(ship.hull_tonnage, ship.jump_drive.drive_letter)
    },
    maneuver_drive: {
      ...ship.maneuver_drive,
      drive_rating: getDriveRating(ship.hull_tonnage, ship.maneuver_drive.drive_letter)
    },
    power_plant: ship.power_plant,
    computer: ship.computer,
    staterooms: ship.staterooms,
    low_berths: ship.low_berths,
    armament: ship.armament,
    fuel_tons: ship.fuel_tons,
    cargo_tons: ship.cargo_tons,
    isStreamlined: ship.isStreamlined,
    notes: ship.notes,
    fuel_per_jump: `${(0.1 * ship.hull_tonnage * getDriveRating(ship.hull_tonnage, ship.jump_drive.drive_letter)).toFixed(1)} tons`,
    calculated_statistics: {
      hull_cost: stats.hull_cost, 
      allocated_mass: stats.allocated_mass,
      unallocated_mass: stats.unallocated_mass,
      total_component_cost: stats.total_component_cost,
      design_cost: stats.design_cost,
      streamlining_cost: stats.streamlining_cost,
      total_final_cost: stats.total_final_cost,
      bridge_mass: stats.bridge_mass,
      bridge_cost: stats.bridge_cost,
      cargo_tons: ship.cargo_tons // Ensure this reflects the calculated cargo
    },
    crew_requirements: crew
  }, null, 2);

  return (
    <div className="container mx-auto bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">Starship Designer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Hull & Drives</h2>
          <div className="mb-4">
            <label htmlFor="hull_tonnage" className="block text-sm font-medium text-gray-600 mb-1">Hull Tonnage</label>
            <input
              id="hull_tonnage"
              type="number"
              name="hull_tonnage"
              value={ship.hull_tonnage}
              onChange={handleInputChange}
              min="1"
              max="5000"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="jump_drive" className="block text-sm font-medium text-gray-600 mb-1">
              Jump Drive: {getDriveRating(ship.hull_tonnage, ship.jump_drive.drive_letter)}
            </label>
            <select id="jump_drive" name="jump_drive" value={ship.jump_drive.drive_letter} onChange={handleSelectChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              {shipDatabase.drives.jump_drives
                .filter(drive => validDriveLetters.includes(drive.drive_letter))
                .map(drive => (
                <option key={drive.drive_letter} value={drive.drive_letter}>
                  {`Model ${drive.drive_letter} (${drive.mass_tons} tons, ${drive.cost_mcr} MCr)`}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="maneuver_drive" className="block text-sm font-medium text-gray-600 mb-1">
              Maneuver Drive: {getDriveRating(ship.hull_tonnage, ship.maneuver_drive.drive_letter)}
            </label>
            <select id="maneuver_drive" name="maneuver_drive" value={ship.maneuver_drive.drive_letter} onChange={handleSelectChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              {shipDatabase.drives.maneuver_drives
                .filter(drive => validDriveLetters.includes(drive.drive_letter))
                .map(drive => (
                <option key={drive.drive_letter} value={drive.drive_letter}>
                  {`Model ${drive.drive_letter} (${drive.mass_tons} tons, ${drive.cost_mcr} MCr)`}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="power_plant" className="block text-sm font-medium text-gray-600 mb-1">Power Plant</label>
            <select id="power_plant" name="power_plant" value={ship.power_plant.drive_letter} onChange={handleSelectChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              {shipDatabase.drives.power_plants
                .filter(drive => validDriveLetters.includes(drive.drive_letter))
                .map(drive => (
                <option key={drive.drive_letter} value={drive.drive_letter}>
                  {`Model ${drive.drive_letter} (${drive.mass_tons} tons, ${drive.cost_mcr} MCr)`}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-blue-100 p-4 rounded-md mt-4 border border-blue-200">
              <p className="text-blue-800 text-sm">
                <strong>Suggested Fuel:</strong> {suggestedFuel.toFixed(0)} tons.
                <br />
                <em class="text-gray-600">(Formula: 0.1 x {ship.hull_tonnage} tons x Jump Rating)</em>
              </p>
          </div>
           <div className="mt-4">
            <label htmlFor="fuel_tons" className="block text-sm font-medium text-gray-600 mb-1">Fuel (tons)</label>
            <input
              id="fuel_tons"
              type="number"
              name="fuel_tons"
              value={ship.fuel_tons}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          
          <div className="mt-4 flex items-center">
              <input
                  id="isStreamlined"
                  type="checkbox"
                  name="isStreamlined"
                  checked={ship.isStreamlined}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="isStreamlined" className="ml-2 block text-sm font-medium text-gray-700">
                  Atmospheric streamlining (+1 MCr per 100 tons)
              </label>
          </div>

        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Computers & Fittings</h2>
          <div className="mb-4">
            <label htmlFor="computer" className="block text-sm font-medium text-gray-600 mb-1">Computer</label>
            <select id="computer" name="computer" value={ship.computer.model} onChange={handleSelectChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              {shipDatabase.computers.map(comp => (
                <option key={comp.model} value={comp.model}>
                  {`Model ${comp.model} (${comp.tons} tons, ${comp.mcr} MCr, TL ${comp.tl})`}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="staterooms" className="block text-sm font-medium text-gray-600 mb-1">Number of Staterooms</label>
            <input
              id="staterooms"
              type="number"
              name="staterooms"
              value={ship.staterooms}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="low_berths" className="block text-sm font-medium text-gray-600 mb-1">Number of Low Berths</label>
            <input
              id="low_berths"
              type="number"
              name="low_berths"
              value={ship.low_berths}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-2">Armament</h3>
          {ship.armament.map((item, index) => (
            <div key={index} className="flex space-x-2 mb-2 p-2 bg-white rounded-md shadow-sm border border-gray-200 items-center">
              <div className="flex-grow">
                <select name="mount" value={item.mount} onChange={(e) => handleArmamentChange(index, e.target.name, e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm">
                  {shipDatabase.armament.mounts.map(mount => (
                    <option key={mount.item} value={mount.item}>{mount.item}</option>
                  ))}
                </select>
                <select name="weapon" value={item.weapon} onChange={(e) => handleArmamentChange(index, e.target.name, e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mt-1 text-sm">
                  {shipDatabase.armament.weapons.map(weapon => (
                    <option key={weapon.item} value={weapon.item}>{weapon.item}</option>
                  ))}
                </select>
              </div>
              <button onClick={() => removeArmament(index)} className="p-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.728-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
          <button onClick={addArmament} className="mt-2 w-full p-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50 transition-colors">
            Add Armament
          </button>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Ship Summary</h2>
          <div className="space-y-3">
            <p className="text-lg text-gray-800"><strong>Total Mass:</strong> {ship.hull_tonnage} tons</p>
            <p className="text-lg text-gray-800"><strong>Allocated Mass:</strong> {stats.allocated_mass.toFixed(2)} tons</p>
            <p className="text-lg text-gray-800"><strong>Cargo Space:</strong> {stats.unallocated_mass.toFixed(2)} tons</p>
            <hr className="border-gray-300 my-4" />
            <p className="text-lg text-gray-800"><strong>Hull Cost:</strong> {stats.hull_cost} MCr</p>  {/* ADD THIS LINE */}
            <p className="text-lg text-gray-800"><strong>Bridge Mass:</strong> {stats.bridge_mass} tons</p>
            <p className="text-lg text-gray-800"><strong>Bridge Cost:</strong> {stats.bridge_cost} MCr</p>
            <p className="text-lg text-gray-800"><strong>Streamlining Cost:</strong> {stats.streamlining_cost} MCr</p>
            <p className="text-lg text-gray-800"><strong>Component Cost:</strong> {stats.total_component_cost} MCr</p>
            <p className="text-lg text-gray-800"><strong>Design Cost (1%):</strong> {stats.design_cost} MCr</p>
            <p className="text-xl font-bold text-gray-900"><strong>Total Final Cost:</strong> {stats.total_final_cost} MCr</p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Crew Requirements: {crew.length}</h3>
            {crew.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {crew.map((role, index) => <li key={index}>{role}</li>)}
              </ul>
            ) : (
              <p className="text-gray-500">No crew requirements based on current design.</p>
            )}
            {messages.length > 0 && (
              <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-md">
                <ul className="list-disc list-inside text-yellow-800 text-sm">
                  {messages.map((msg, index) => <li key={index}>{msg}</li>)}
                </ul>
              </div>
            )}
          </div>

           <button
            onClick={handleExport}
            className="mt-8 w-full p-3 text-lg font-semibold bg-green-600 text-white rounded-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50 transition-colors"
          >
            Export Ship as JSON
          </button>
          
        </div>

      </div>
      
      {/* New section for displaying JSON output */}
      <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">Current Ship JSON</h2>
        <div className="bg-gray-900 p-4 rounded-md overflow-x-auto max-h-96">
          <pre className="text-green-400 text-sm whitespace-pre-wrap"><code className="language-json">{currentShipJson}</code></pre>
        </div>
      </div>

      {/* Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="p-8 bg-white rounded-xl shadow-2xl max-w-sm mx-auto">
            <div className="text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Warning</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  {alertMessage}
                </p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  onClick={() => setShowAlert(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);













