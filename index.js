const express = require('express');
const helmet = require('helmet');
const app = express();

// Middleware helmet pour sécuriser les en-têtes HTTP
app.use(helmet());

// Middleware pour activer CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Autoriser l'accès depuis n'importe quel domaine
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // Autoriser les méthodes HTTP spécifiées
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // Autoriser les en-têtes spécifiés
    next();
});

// Données statiques représentant les régions, villes et quartiers
const regions = [
    {
        name: 'Littoral',
        cities: [
            {
                name: 'Douala',
                neighborhoods: ['Akwa','Bonapriso','Bonandjo','Ndogpassi-Village','PK8','Logbessou','Makepe' ,'Bali', 'Bonabéri','Kotto','Yassa', 'Bepanda']
            },
            {
                name: 'Nkongsamba',
                neighborhoods: ['Nouvelle Ville', 'Ancienne Ville']
            },
            {
                name: 'Yabassi',
                neighborhoods: ['Nouvelle Ville', 'Ancienne Ville']
            },
            {
                name: 'Édéa',
                neighborhoods: ['Nouvelle Ville', 'Ancienne Ville']
            },
            {
                name: 'Nkongsamba',
                neighborhoods: ['Nouvelle Ville', 'Ancienne Ville']
            },
            {
                name: 'Nkongsamba',
                neighborhoods: ['Nouvelle Ville', 'Ancienne Ville']
            },
            {
                name: 'Nkongsamba',
                neighborhoods: ['Nouvelle Ville', 'Ancienne Ville']
            }
        ]
    },
    {
        name: 'Centre',
        cities: [
            {
                name: 'Yaoundé',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo','Essos', 'Etoudi','Mvan','Simbog', 'Biyem-Assi', 'Efoulam']
            },
            {
                name: 'Nanga-Eboko',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Monatele',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Bafia',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Ntui',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Mfou',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Ngoumou',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Akonolinga',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Mbalmayo',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
        ]
    },
    {
        name: 'Ouest',
        cities: [
            {
                name: 'Bafoussam',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Mbouda',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Bafang',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Baham',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Bandjoun',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Dschang',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Bangangté',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Foumban',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
        ]
    },
    {
        name: 'Sud',
        cities: [
            {
                name: 'Ebolowa',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Sangmélima',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Ambam',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            
        ]
    },
    {
        name: 'Est',
        cities: [
            {
                name: 'Bertoua',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Yokadouma',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Abong-Mbang',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Batouri',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Bertoua',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
        ]
    },
    {
        name: 'Extrême-Nord',
        cities: [
            {
                name: 'Maroua',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Kousséri',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Kaélé',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Mora',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Mokolo',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
        ]
    },
    {
        name: 'Nord-Ouest',
        cities: [
            {
                name: 'Bamenda',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Fundong',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Kumbo',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Nkambé',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Wum',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Mbengwi',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Ndop',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
        ]
    },
    {
        name: 'Adamaoua',
        cities: [
            {
                name: 'Ngaoundéré',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Tibati',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Tignère',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Banyo',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Meiganga',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
        ]
    },
    {
        name: 'Sud-Ouest',
        cities: [
            {
                name: 'Buea',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Bangem',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Menji',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Mamfé',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Kumba',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
            {
                name: 'Mundemba',
                neighborhoods: ['Nlongkak', 'Ngoa Ekelle', 'Mokolo']
            },
        ]
    },
    // Ajoutez d'autres régions avec leurs villes et quartiers ici
];

// Route pour obtenir la liste des régions avec leurs villes et quartiers
app.get('/', (req, res) => {
    // Validation des données d'entrée
    if (!isValidRequest(req)) {
        return res.status(400).json({ error: 'Bad request' });
    }

    // Renvoyer les données régionales
    res.json(regions);
});

// Fonction pour valider les données d'entrée
function isValidRequest(req) {
    // Vous pouvez ajouter des règles de validation supplémentaires ici
    return true;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
