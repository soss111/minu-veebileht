fetch('https://www.omniva.ee/locations.json')

let markerid = [];

function filtreeri() {
  const sisend = document.getElementById('otsing').value.toLowerCase();

  // eemalda vanad markerid
  markerid.forEach(m => kaart.removeLayer(m));
  markerid = [];

  fetch('https://www.omniva.ee/locations.json')
    .then(res => res.json())
    .then(andmed => {
      andmed.forEach(punkt => {
        if (punkt.TYPE === 'PA') {
          const asukoht = `${punkt.A0_NAME} ${punkt.A1_NAME} ${punkt.NAME}`.toLowerCase();
          if (asukoht.includes(sisend)) {
            const m = L.marker([punkt.Y, punkt.X])
              .addTo(kaart)
              .bindPopup(`<strong>${punkt.NAME}</strong><br>${punkt.A0_NAME}, ${punkt.A1_NAME}`);
            markerid.push(m);
          }
        }
      });
    });
}
