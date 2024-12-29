def generate_passwords():
    passwords = []
    for i in range(10):       # Premier chiffre
        for j in range(10):   # Deuxième chiffre
            for k in range(10):  # Troisième chiffre
                for l in range(10):  # Quatrième chiffre
                    password = f"{i}{j}{k}{l}"  # Créer le mot de passe
                    passwords.append(password)  # Ajouter à la liste
    return passwords

# Exécuter la fonction et afficher les résultats
all_passwords = generate_passwords()
print(f"Total des mots de passe générés : {len(all_passwords)}")
print(all_passwords)