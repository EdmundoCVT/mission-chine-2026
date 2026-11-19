# Mission Chine 2026

Tableau de bord local-first pour piloter la mission commerciale Chine → France → Sal.

## Prévisualisation locale

Servir le dossier `dist` avec n'importe quel serveur statique, par exemple `python3 -m http.server 4173 -d dist`.

## Données

Les saisies sont conservées dans `localStorage` sous la clé `missionChine2026.v1`. Le bouton **Exporter le projet** produit une sauvegarde JSON complète. Aucune donnée sensible ne doit être saisie dans cette V1 publique.

## Cloudflare Pages

- Répertoire de production : `dist`
- Commande de build : aucune
- Branche recommandée : `main`

Voir `DEPLOIEMENT.md` pour les instructions détaillées et `CHANGELOG.md` pour l'historique fonctionnel.
