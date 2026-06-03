# Zidex Trans

Projet web déployé sur Vercel.

## Gestion du projet Vercel

**Infos :**
- Project ID: `prj_O1htgQMJWNXcQ8YBh22JI2O1EYjW`
- Vercel Token: À définir comme variable d'environnement `VERCEL_TOKEN`

### Mettre le projet en pause

```bash
curl -X POST "https://api.vercel.com/v9/projects/prj_O1htgQMJWNXcQ8YBh22JI2O1EYjW/pause" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

### Remettre le projet en ligne

```bash
curl -X POST "https://api.vercel.com/v9/projects/prj_O1htgQMJWNXcQ8YBh22JI2O1EYjW/resume" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```
