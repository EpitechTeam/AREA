# Fontionnement de L'application (class)

  - L'application se launch sur login_activity
  - Les class ServicesManager servent de container pour les call SDK/API (pour Facebook par exemple tout se trouve dans FacebookServicesManager)
  - Dans ApiServiceManager il y a une requete vers serveur avec recupération du JSON. TESTER SI ELLE MARCHE AVEC LE SERVEUR ! (si non voir le ssl du server)

# Lancer L'application avec android studio

  - Ouvrir le dossier avec android studio et ensuite run(shit+F10) ou utiliser le bouton play en haut a droite.

# Code générer par adobeXD

  - Des class adobe xd on été faite en français d'ou le nom des classe générer. Rework au fur et à mesure de l'avancement

### Todos

 - Finir le front (logique de service activée ou non)
 - Implementer les autres sdk (Office 365, Twitter)
 - Class user en accord avec le server
 - Recycle View