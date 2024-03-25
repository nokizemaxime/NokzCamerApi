
const express = require('express');
const app = express();

// Données statiques représentant les régions, villes et quartiers
const regions = [
    {
        name: 'Littoral',
        cities: [
            {
                name: 'Douala',
                neighborhoods: ['Akwa', 'Bassa', 'Bonabéri']
            },
            {
                name: 'Kribi',
                neighborhoods: ['Nouvelle Ville', 'Ancienne Ville']
            }
        ]
    },
    {
        name: 'Centre',
        cities: [
            {
                name: 'Yaoundé',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            }
        ]
    },
    // Ajoutez d'autres régions avec leurs villes et quartiers ici
];

// Route pour obtenir la liste des régions avec leurs villes et quartiers
app.get('/regions', (req, res) => {
    res.json(regions);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
