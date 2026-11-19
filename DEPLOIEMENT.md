# Déploiement

## GitHub → Cloudflare Pages

1. Créer ou sélectionner un dépôt GitHub privé ou public et pousser la branche `main`.
2. Dans Cloudflare Pages, choisir **Connect to Git**, autoriser uniquement ce dépôt et sélectionner `main`.
3. Configurer **Build command** vide et **Build output directory** sur `dist`.
4. Activer les déploiements de prévisualisation pour les branches autres que `main`.
5. Publier la production depuis `main` seulement après les tests.

La V1 fonctionne aussi sur l'hébergement Cloudflare fourni par Sites. Pour une protection ultérieure, migrer les données vers un Worker + D1/R2 ou protéger l'accès avec Cloudflare Access avant de stocker toute donnée confidentielle.

## Stratégie de sauvegarde

- Export JSON après chaque session importante.
- Export CSV des tables pour analyse.
- Archive ZIP à chaque version stable.
- Copier les archives dans le dossier Google Drive `Mission Chine 2026 / Archives`.
