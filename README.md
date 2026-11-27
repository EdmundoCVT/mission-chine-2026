# Mission Chine 2026

Portail mobile-first BUSINESS CHINE pour piloter la mission commerciale Chine → France → Sal, du 23 novembre au 6 décembre 2026.

La V2 ajoute un accueil public, une timeline de 14 jours, un catalogue local de 25 achats, une vue équipe et un lien vers le document Tencent distinct. Les fonctions de pilotage de la V1 sont conservées.

## Prévisualisation locale

Servir le dossier `dist` avec n'importe quel serveur statique, par exemple `python3 -m http.server 4173 -d dist`.

## Données

Les saisies sont conservées dans `localStorage` sous la clé historique `missionChine2026.v1`, afin de préserver les données déjà présentes sur les appareils. Le bouton **Exporter le projet** produit une sauvegarde JSON complète.

Le site étant public, le code livré ne contient aucune donnée commerciale privée. Les fournisseurs, contacts, prix négociés, rendez-vous et validations détaillées restent dans Tencent Docs. Il n’existe aucune synchronisation automatique entre le site et Tencent.

## Cloudflare Pages

- Répertoire de production : `dist`
- Commande de build : aucune
- Branche recommandée : `main`

Voir `DEPLOIEMENT.md` pour les instructions détaillées et `CHANGELOG.md` pour l'historique fonctionnel.
