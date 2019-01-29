# Fontionnement de L'application (class)

  - L'application se launch sur login_activity
  - Les class ServicesManager servent de container pour les call SDK/API (pour Facebook par exemple tout se trouve dans FacebookServicesManager)
  - Dans ApiServiceManager il y a une requete vers serveur avec recupération du JSON. TESTER SI ELLE MARCHE AVEC LE SERVEUR ! (si non voir le ssl du server)

### Todos

 - Finir le front (logique de service activée ou non)
 - Implementer les autres sdk (Office 365, Twitter)
 - Class user en accord avec le server
 - Recycle View