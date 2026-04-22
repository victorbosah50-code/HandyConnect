let userLocation = null;

// Sample handyman database (later replace with real backend)
let handymen = [
  {
    name: "John Fixer",
    skill: "Plumbing",
    lat: 50.1109,
    lon: 8.6821
  },
  {
    name: "Mike Electric",
    skill: "Electrical",
    lat: 50.115,
    lon: 8.68
  },
  {
    name: "Chris Wood",
    skill: "Carpentry",
    lat: 50.12,
    lon: 8.69
  }
];

// Get user location
function getUserLocation() {
  navigator.geolocation.getCurrentPosition(position => {
    userLocation = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    };
    alert("Location detected!");
    displayHandymen();
  });
}

// Distance formula (Haversine)
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Display handymen
function displayHandymen() {
  const list = document.getElementById("handymanList");
  const filter = document.getElementById("filterSkill").value;

  let filtered = handymen;

  if (filter) {
    filtered = filtered.filter(h => h.skill === filter);
  }

  if (userLocation) {
    filtered.forEach(h => {
      h.distance = getDistance(
        userLocation.lat,
        userLocation.lon,
        h.lat,
        h.lon
      );
    });

    filtered.sort((a, b) => a.distance - b.distance);
  }

  list.innerHTML = "";

  filtered.forEach(h => {
    const div = document.createElement("div");
    div.className = "handyman-card";

    div.innerHTML = `
      <h3>${h.name}</h3>
      <span class="badge">${h.skill}</span>
      <p>
        ${
          userLocation
            ? "Distance: " + h.distance.toFixed(2) + " km"
            : "Enable location to see distance"
        }
      </p>
      <button class="hire-btn" onclick="hire('${h.name}')">Hire</button>
    `;

    list.appendChild(div);
  });
}

// Hire action
function hire(name) {
  alert("You hired " + name);
}

displayHandymen();
