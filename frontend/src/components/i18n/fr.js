export default {
  pushNotification: {
    activeSubscriptionWebPush: "Activer les notifications push",
    updateSubscriptionWebPush: "Mettre à jour les notifications push"
  },
  buscarMensagemModal: {
    title: "Rechercher des messages (bêta)",
    searchPlaceholder: "Entrez un terme à rechercher",
    searchButton: "Rechercher",
    loadingMessages: "Recherche de messages...",
    loadingMoreMessages: "Chargement de plus de messages...",
    atendimento: "Service: #",
    messageDate: "Date du message : ",
    channel: "Canal: ",
    status: "Statut: ",
    group: "Groupe: ",
    lastMessage: "Dernier message: ",
    unknown: "Inconnu",
    noMessages: "Aucun message",
    closeButton: "Fermer",
    statusMap: {
      closed: "Fermé",
      open: "Ouvrir",
      pending: "En attente",
      schedule: "Programmé"
    },
    isGroup: {
      yes: "Oui",
      no: "Non"
    }
  },
  generalAgendamento: {
    appointments: "Rendez-vous",
    addAppointment: "Ajouter un calendrier",
    attention: "Attention!! Voulez-vous vraiment supprimer ce message ?",
    oldMessages: "Les anciens messages ne seront pas supprimés dans le client.",
    yes: "Oui",
    no: "Non",
    message: "Message",
    contact: "Contact",
    actions: "Actes",
    status: "Statut",
    type: "Taper",
    date: "Date",
    created: "Créé",
    dateFormat: "jj/MM/aaaa HH:mm:ss"
  },
  status: {
    open: "Ouvrir",
    closed: "Fermé",
    pending: "En attente",
    schedule: "Programmé",
    undefined: "Indéfini"
  },
  type: {
    chat: "Texte",
    image: "Image",
    templates: "Modèle",
    video: "Vidéo",
    application: "Déposer",
    text: "Déposer"
  },
  dialog: {
    title: "Planification des messages",
    close: "Pour fermer",
    selectWhatsapp: "Sélectionnez WhatsApp",
    selectContact: "Sélectionnez Contact",
    loadingContacts: "Veuillez patienter... Les contacts sont en cours de chargement !",
    searchTip: "Recherchez par nom ou numéro de téléphone !"
  },
  inputMensagemAgendamento: {
    added: "Ajouté",
    templateError: "Aucun modèle sélectionné.",
    scheduleError: "Pour planifier un message, saisissez le champ Date/Heure de planification.",
    templateScheduledSuccess: "Modèle(s) planifié(s) avec succès !",
    templateSendError: "Erreur lors de l'envoi du modèle.",
    recurrenceCountLabel: "Répétitions (Modèle pour créer un message : 1)",
    recurrenceLabel: "Récurrence",
    noRepeat: "Ne pas répéter",
    every5Days: "Tous les 5 jours",
    every10Days: "Tous les 10 jours",
    every15Days: "Tous les 15 jours",
    every20Days: "Tous les 20 jours",
    every25Days: "Tous les 25 jours",
    every30Days: "Tous les 30 jours",
    every35Days: "Tous les 35 jours",
    every40Days: "Tous les 40 jours",
    every45Days: "Tous les 45 jours",
    every60Days: "Tous les 60 jours",
    customRecurrence: "Récurrence Personnalisée",
    customRecurrenceDaysLabel: "Jours de récurrence personnalisée",
    messageScheduled: "Message programmé avec succès !",
    placeholder: "Entrez votre message",
    scheduleFile: "Fichier de planification",
    scheduleMessage: "Message de planification",
    scheduleSticker: "Autocollant d'horaire",
    scheduleImageTo: "Image de planification pour",
    scheduleVideo: "Lien de planification de la vidéoconférence",
    templates: "Modèles",
    activateSignature: "Activer l'abonnement",
    deactivateSignature: "Désactiver l'abonnement",
    confirmSend: "Confirmer l'envoi : Entrer",
    cancelSend: "Annuler : ESC",
    scheduleDateLabel: "Date/heure du rendez-vous",
    customSchedule: "Planification personnalisée",
    thirthyMinutes: "Dans 30 minutes",
    isTomorrow: "Demain",
    nextWeek: "La semaine prochaine",
    selectTemplate: "Choisissez un modèle",
    schedule: "À planifier",
    cancel: "Annuler",
    selectWhatsapp: "Sélectionnez WhatsApp",
    selectContact: "Sélectionnez Contact",
    emoji: "Émoji",
    find: "Situer...",
    invalidFile: "Fichier invalide",
    acceptFormats: "Formats acceptés",
    error: "Une erreur s'est produite",
    fileNotFound: "Il n'y a aucun fichier à télécharger",
    messageNotFound: "Il n'y a aucun message à envoyer",
    checkFiles: "Vérifiez la taille et les extensions des fichiers sélectionnés"
  },
  mixinCommonAgendamento: {
    note: "Avis",
    buttonNotAvailable: "Ce bouton n'est cliquable que sur mobile",
    dateFormat: "jj/MM/aaaa"
  },
  aniversarios: {
    title: "Anniversaires",
    sendManualMessage: "Envoyer des messages d'anniversaire manuellement",
    modalTitle: "Sélectionnez WhatsApp",
    modalDescription: "Envoyer des messages d'anniversaire manuellement",
    modalWarning: "Lorsque vous cliquez sur Envoyer, le message d'anniversaire enregistré sur la chaîne sera envoyé à ceux qui fêtent leur anniversaire ce jour-là.",
    sendingMessages: "Veuillez patienter, envoi de messages d'anniversaire...",
    sendingMessagesSuccess: "Messages d'anniversaire envoyés avec succès !",
    sendingMessagesError: "Erreur lors de l'envoi des messages d'anniversaire.",
    cancel: "Annuler",
    send: "Envoyer",
    whatsappLabel: "WhatsApp",
    columns: {
      id: "#",
      name: "Nom",
      birthdayDate: "Anniversaire",
      actions: "Actes"
    }
  },
  api: {
    title: "Paramètres de l'API",
    addButton: "Pour ajouter",
    postmanButton: "FACTEUR",
    copyToken: "Copier le jeton",
    editConfig: "Modifier la configuration",
    newToken: "Générer un nouveau jeton",
    deleteConfig: "Supprimer la configuration",
    url: "URL",
    bearerToken: "Jeton au porteur",
    key: "Clé",
    actions: "Actes",
    dialogDeleteTitle: "Attention!!",
    dialogDeleteMessage: "Voulez-vous vraiment supprimer ?",
    dialogNewTokenMessage: "Voulez-vous vraiment générer un nouveau jeton pour",
    deleteSuccess: "supprimé!",
    deleteError: "Impossible de supprimer.",
    tokenUpdated: "Jeton mis à jour !",
    tokenUpdateError: "Impossible d'actualiser le jeton.",
    tokenCopied: "Jeton copié !",
    dialogCancel: "Non",
    dialogConfirm: "Oui",
    columns: {
      name: "Nom",
      token: "Jeton",
      isActive: "Actif",
      actions: "Actes"
    }
  },
  modalApi: {
    titleCreate: "Créer une configuration d'API",
    titleEdit: "Modifier la configuration de l'API",
    fieldsetApiData: "Données API",
    apiNameLabel: "Nom de l'API",
    apiSessionLabel: "Envoyer par",
    apiSessionError: "Obligatoire",
    apiSessionHint: "Optionnel. Laissez vide pour les API de requête/liste qui ne nécessitent pas de session",
    apiAuthTokenLabel: "Jeton d'authentification",
    apiAuthTokenHint: "Il sera envoyé comme autorisation dans l'en-tête. S'il y a un préfixe, il doit être saisi ici. Ex. : Porteur, Jeton",
    apiAuthTokenError: "Le jeton d'authentification est obligatoire",
    fieldsetWebhook: "WebHook",
    activeLabel: "Actif",
    cancelButton: "Annuler",
    saveButton: "Sauvegarder",
    wabaBannerTitle: "API officielle (WABA)",
    wabaBannerDescription1: "Points de terminaison disponibles : SetQueue, SetTicketInfo, SetTag, ShowTicketInformation, ShowChannelInformation, ShowTicketInformationChatBot, ShowAllTicketInformation",
    wabaBannerDescription2: "BÊTA : SendMessageParams, SendMessageAPIFile, SendMessageAPIFileURL, SendMessageAPIText et SendMessageAPITextBase64",
    wabaBannerDescription3: "Pour envoyer des messages et d'autres composants, utilisez la collection Meta officielle : ",
    wabaBannerLink: "lien",
    validationError: "Vérifiez les champs obligatoires et les incohérences.",
    apiCreatedSuccess: "API créée avec succès.",
    apiEditedSuccess: "API modifiée avec succès.",
    apiError: "Une erreur s'est produite!"
  },
  assinatura: {
    lookForUpdatedData: "Rechercher des données de licence mises à jour...",
    updateInfo: "Mettre à jour les informations",
    licenseRefreshError: "Erreur lors de la mise à jour de la licence",
    domainModalTitle: 'Domaines',
    domainModalSubtitle: 'Ajoutez les domaines que vous souhaitez autoriser',
    domainFieldLabel: 'Domaines (séparés par des virgules)',
    domains: "Domaine: ",
    domainWarning: "⚠️ Attention: le domaine \"whatsapp.com\" est uniquement illustratif. Modifiez-le en le domaine où le système est installé (par exemple: your-domain.com).",
    backendVersion: "Version du backend : ",
    frontendVersion: "Version du frontend : ",
    expireIn: "Cette version expire dans : ",
    remainingDays: "Prochaine mise à jour obligatoire dans : ",
    expiredVersion: "Version expirée !",
    days: "jours",
    blockOn: "Bloqué",
    blockOff: "Libéré",
    license_code: "Code de licence : ",
    license_expiry: "Expiration de la licence : ",
    is_blocked: "Bloqué: ",
    pageTitle: "Gestion des licences",
    pageSubtitle: "Contrôler et ajuster les informations de licence.",
    license: "Licence: ",
    licenseStatusLabel: "Statut de la licence : ",
    licenseActive: "Actif",
    licenseValidating: "Validation...",
    forceReleaseUpdateButton: "Forcer le relâchement du bouton d'actualisation",
    emailLabel: "E-mail:",
    updateLicenseButton: "Changer de licence",
    modalTitle: "Changer la clé",
    modalSubtitle: "Mettre à jour la clé de licence",
    emailFieldLabel: "Nouvelle clé",
    emailFieldError: "La clé est obligatoire",
    cancelButton: "Annuler",
    saveButton: "Sauvegarder",
    successMessage: "Clé de licence mise à jour avec succès !",
    errorLimitExceeded: "De nombreuses tentatives d’activation ont été effectuées. Réessayez dans 1 minute",
    errorUpdate: "Erreur lors de la mise à jour de l'e-mail."
  },
  modalPlano: {
    titleCreate: "Créer un plan",
    titleEdit: "Modifier le plan",
    valueLabel: "Valeur du plan",
    connectionsLabel: "Relations",
    usersLabel: "Utilisateurs",
    cancelButton: "Annuler",
    saveButton: "Sauvegarder",
    successCreate: "Plan créé avec succès !",
    successEdit: "Plan édité avec succès !",
    error: "Une erreur s'est produite!"
  },
  atualizar: {
    migrationTitle: "Migration de fichiers",
    migrationBanner: "ATTENTION : Il s'agit d'un processus irréversible qui effectuera une copie des fichiers du dossier public dans le sous-dossier Société. Avant de démarrer le processus de migration de fichiers, il est obligatoire de prendre un instantané du VPS et de vous assurer que vous avez accès à l'utilisateur root via SSH sur le VPS, pour d'éventuelles interventions. Le processus peut prendre jusqu’à quelques heures, en fonction des performances de votre VPS et du nombre de fichiers.",
    migrationButton: "DÉMARRER LA MIGRATION",
    cleanTitle: "Nettoyage des dossiers publics",
    cleanBanner: "ATTENTION : il s'agit d'un processus irréversible qui supprimera tous les fichiers du dossier public. Avant de démarrer le processus de nettoyage des fichiers, il est obligatoire de prendre un instantané du VPS et de vous assurer que vous avez accès à l'utilisateur root via SSH sur le VPS, pour d'éventuelles interventions. Le processus peut prendre jusqu’à quelques heures, en fonction des performances de votre VPS et du nombre de fichiers.",
    cleanButton: "COMMENCER LE NETTOYAGE",
    updateTitle: "Mise à jour automatique",
    updateButton: "DÉMARRER LA MISE À JOUR",
    updateBanner: "N'effectuez ce processus qu'après avoir pris un instantané du VPS. Ce processus doit être effectué par le superadministrateur du locataire 1. Je confirme avoir effectué une sauvegarde (snapshot) du serveur et avoir accès au terminal. S'il y a une instabilité dans le VPS, la mise à jour peut échouer et il sera nécessaire d'effectuer la mise à jour automatique via le terminal.",
    buttonWarning: "Ce processus doit être effectué par le superadministrateur du locataire 1. Je confirme avoir effectué une sauvegarde (snapshot) du serveur et avoir accès au terminal. Êtes-vous sûr de vouloir démarrer le processus de mise à jour ?",
    uploadSuccess: "Fichier téléchargé avec succès.",
    uploadError: "Erreur lors du chargement du fichier.",
    updateStartSuccess: "Le processus de mise à jour a démarré avec succès.",
    updateStartError: "Échec du démarrage du processus de mise à jour.",
    migrationStartSuccess: "Le processus de migration a démarré avec succès.",
    migrationStartError: "Échec du démarrage du processus de migration.",
    cleanStartSuccess: "Le processus de nettoyage a démarré avec succès.",
    cleanStartError: "Impossible de démarrer le processus de nettoyage.",
    fileValidationError: "Seul le fichier update_rapido.zip est autorisé."
  },
  configurarAvaliacao: {
    tooltipMessage: "Lorsque vous ajoutez un message d’avis, vous pouvez personnaliser le message de réponse pour chaque avis. Sinon, le système répondra avec le message par défaut défini dans : Votre avis a été enregistré avec succès.",
    messagePlaceholder: "Saisissez un message d'avis",
    title: "Avis",
    tooltipTitle: "Types d'évaluations :",
    tooltipEvaluation: "Évaluation : Valeur attribuée de 0 à 5.",
    tooltipLabel: "Étiquette : Message envoyé pour chaque avis.",
    saveButton: "Sauvegarder",
    editablePlaceholder: "Cliquez pour modifier l'étiquette",
    successMessage: "Évaluation mise à jour.",
    errorMessage: "Erreur lors de la mise à jour de l'avis.",
    ratingStore: "Message d'évaluation enregistré avec succès",
    ratingStoreError: "Message d'erreur lors du stockage de l'évaluation",
    ratingStoreAttempt: "Message de tentative d'évaluation enregistré avec succès",
    ratingStoreTime: "Temps de stockage (ms)",
    ratingStoreUse: "Utiliser le stockage d'évaluation",
    ratingStoreTimeCustomMinutes: "Temps personnalisé (minutes)",
    timeOptions: {
      oneMinute: "1 minute",
      fiveMinutes: "5 minutes",
      tenMinutes: "10 minutes",
      fifteenMinutes: "15 minutes",
      thirtyMinutes: "30 minutes",
      oneHour: "1 heure",
      twoHours: "2 heures",
      sixHours: "6 heures",
      twelveHours: "12 heures",
      twentyFourHours: "24 heures",
      fortyEightHours: "48 heures",
      sevenDays: "7 jours",
      custom: "Personnalisé (minutes)"
    },
    useOptions: {
      enabled: "Activé",
      disabled: "Désactivé"
    },
    labels: {
      ruim: "Mauvais",
      regular: "Régulier",
      bom: "Bien",
      muitoBom: "Très bien",
      excelente: "Excellent",
      incrivel: "Incroyable"
    }
  },
  listarAvaliacao: {
    empty: "Vide",
    contactName: "Nom du contact",
    title: "Avis",
    addButton: "Pour ajouter",
    searchPlaceholder: "Situer",
    dateFilterPlaceholder: "Filtrer par date",
    evaluationColumn: "Évaluation",
    userColumn: "Utilisateur",
    ticketColumn: "Service",
    dateColumn: "Date",
    actionsColumn: "Actes",
    deleteConfirmationTitle: "Attention!!",
    deleteConfirmationMessage: "Voulez-vous vraiment supprimer l'avis ?",
    deleteSuccess: "Avis supprimé avec succès",
    deleteError: "Erreur lors de la suppression de l'avis.",
    loadError: "Erreur lors du chargement des avis.",
    dialogCancel: "Non",
    dialogConfirm: "Oui"
  },
  modalAvaliacao: {
    editTitle: "Modifier la note",
    createTitle: "Créer une évaluation",
    evaluationLabel: "Évaluation",
    attemptsLabel: "Tentatives",
    ticketLabel: "Service",
    updateSuccess: "Avis édité avec succès !",
    createSuccess: "Avis créé avec succès !",
    errorMessage: "Erreur lors de l'enregistrement de l'évaluation."
  },
  contatosCampanha: {
    campaign: "Campagne",
    start: "Commencer",
    end: "Fin",
    status: "Statut",
    states: "États",
    labels: "Mots clés",
    wallet: "Portefeuille",
    backToCampaigns: "Liste des campagnes",
    contactsTitle: "Contacts",
    contacts: "Contacts",
    refreshTooltip: "Mettre à jour la liste",
    clearCampaign: "Campagne claire",
    addContacts: "Inclure les contacts",
    filters: "Filtres (Date de création du contact)",
    selectContactsTitle: "Sélectionner les contacts",
    errorFetchingContacts: "Erreur lors de la récupération des contacts.",
    errorAddingContacts: "Erreur lors de l'ajout de contacts.",
    contactDeleted: "Contact exclu de cette campagne.",
    contactsAdded: "Contacts ajoutés.",
    campaignCleared: "Campagne de nettoyage réussie.",
    confirmClearCampaign: "Voulez-vous vraiment effacer le contact de la campagne ?",
    errorClearingCampaign: "Campagne de correction d'erreurs.",
    errorDelete: "Impossible de supprimer le contact de la campagne",
    filterNamePhone: "Filtrer le nom ou le téléphone",
    newContact: "Pour générer",
    errorUsers: "Problème de chargement des utilisateurs"
  },
  campanhas: {
    inicio: "Commencer",
    register: "Enregistrements par page :",
    campanhas: "campagnes",
    title: "Campagnes",
    warningBanner: "Campagnes disponibles pour Baileys et Whatsapp-Web.JS",
    addCampaign: "Ajouter une campagne",
    columns: {
      id: "IDENTIFIANT",
      name: "Campagne",
      start: "Commencer",
      status: "Statut",
      contactsCount: "Qté. Contacts",
      queueForSend: "File d'attente pour la soumission",
      notSended: "Non envoyé",
      sent: "Envoyé",
      currentMessageId: "Message Actuel",
      actions: "Actes"
    },
    status: {
      pending: "En attente",
      scheduled: "Programmé",
      processing: "Traitement",
      canceled: "Annulé",
      finished: "Complété"
    },
    actions: {
      forceFinish: "Finaliser avec force",
      skipMessage: "Ignorer le Message",
      downloadReportCsv: "Télécharger le rapport CSV",
      downloadReportPdf: "Télécharger le rapport PDF",
      refresh: "Mettre à jour la liste",
      sortById: "Trier par ID",
      addCampaign: "Ajouter une campagne",
      programSend: "Planifier l'expédition",
      cancelCampaign: "Annuler la campagne",
      duplicateCampaign: "Campagne en double",
      downloadReport: "Télécharger le rapport",
      deleteCampaign: "Supprimer la campagne",
      editCampaign: "Modifier la campagne",
      viewContacts: "Voir les contacts"
    },
    dialogs: {
      forceFinish: {
        title: "Finaliser avec force",
        message: "Voulez-vous vraiment finaliser la campagne avec force ?"
      },
      skipMessage: {
        message: "Voulez-vous ignorer le message actuel et passer au suivant de la Campagne ?"
      },
      cancelCampaign: {
        title: "Annuler la campagne",
        message: "Voulez-vous vraiment annuler la campagne ?"
      },
      cancelCampaignError: {
        message: "Impossible d'annuler les campagnes en cours"
      },
      deleteCampaign: {
        title: "Supprimer la campagne",
        message: "Voulez-vous vraiment supprimer la campagne ?"
      },
      duplicateCampaign: {
        title: "Campagne en double",
        message: "Voulez-vous vraiment dupliquer la campagne ?",
        no: "Non",
        yes: "Oui"
      },
      startCampaign: {
        title: "Démarrer la campagne",
        message: "Voulez-vous vraiment démarrer la campagne ?"
      }
    },
    notifications: {
      campaignForceFinished: "Campagne terminée avec succès.",
      messageSkipped: "Message ignoré avec succès.",
      campaignStarted: "La campagne a commencé.",
      campaignCanceled: "Campagne annulée.",
      campaignDuplicated: "Campagne dupliquée avec succès.",
      campaignDeleted: "Campagne supprimée",
      reportGenerated: "Rapport généré avec succès.",
      errorGeneratingReport: "Erreur lors de la génération du rapport.",
      errorDuplicate: "Erreur lors de la duplication de la campagne.",
      warningEdit: "Vous ne pouvez modifier que les campagnes en attente ou annulées.",
      errorCancel: "Impossible d'annuler la campagne",
      errorStart: "Il n'est pas possible de programmer une campagne avec une date antérieure à la date actuelle",
      errorStartContact: "Il est nécessaire d'avoir des contacts liés pour planifier la campagne",
      errorStartCancel: "Vous ne pouvez planifier que des campagnes en attente ou annulées.",
      errorGeneral: "Impossible de démarrer la campagne"
    },
    warningModal: {
      title: "Avis de campagne",
      description: {
        whatsappRisk1: {
          title: "WhatsApp peut-il bloquer ou bannir mon numéro ?",
          content: "Oui, la possibilité est réelle et doit être prise au sérieux ! WhatsApp a des règles strictes et surveille strictement l'envoi de messages en masse."
        },
        whatsappRisk2: {
          title: "WhatsApp a une tolérance zéro pour le spam !",
          content: "Il a des règles strictes et surveille de très près les messages de masse."
        },
        highSpamRisk: {
          title: "ATTENTION",
          content: "Si 2% des destinataires signalent votre numéro ou marquent votre message comme spam, votre numéro sera bloqué/banni !"
        }
      }
    },
    baixarRelatorio: {
      title: "Rapport de campagne",
      description: {
        generatedAt: "Généré le : ",
        page: "Page: ",
        campaignDetails: {
          id: "Je l'ai fait}",
          status: "Statut : {status}",
          startDate: "Date de début : {date}",
          totalContacts: "Nombre total de contacts : {total}",
          delivered: "Coups : {count}",
          pending: "En attente : {count}",
          failed: "Échecs : {count}"
        },
        tableHeaders: {
          index: "#",
          name: "Nom",
          status: "Statut",
          message: "Message",
          media: "Médias"
        },
        statusDescriptions: {
          delivered: "Livré",
          pending: "En attente",
          failed: "Échec"
        },
        placeholders: {
          unknownName: "Inconnu",
          noMessage: "Aucun message",
          noMedia: "Pas de médias"
        },
        notifications: {
          success: "Rapport généré avec succès !",
          error: "Erreur lors de la génération du rapport PDF."
        },
        fileName: "rapport_de_campagne_{id}.pdf"
      }
    }
  },
  modalCampanha: {
    title: {
      create: "Créer une campagne",
      edit: "Modifier la campagne"
    },
    labels: {
      campaignName: "Nom de la campagne",
      startDate: "Date/heure de début",
      session: "Envoyer par",
      delay: "Retard",
      media: "Message de composition multimédia",
      message: "Entrez le message",
      messagePreview: "Aperçu",
      firstMessage: "1er message",
      secondMessage: "2ème message",
      thirdMessage: "3ème message",
      variables: "Variables",
      emoji: "Émoji",
      seconds: "Secondes"
    },
    placeholders: {
      message: "Entrez le message"
    },
    validations: {
      required: "Obligatoire",
      invalidDate: "Ne peut pas être inférieur au jour actuel"
    },
    buttons: {
      cancel: "Annuler",
      save: "Sauvegarder"
    },
    notifications: {
      successEdit: "Campagne éditée !",
      successCreate: "Campagne créée !",
      error: "Un problème lors de la création d'une campagne ?",
      validationError: "Vérifiez que tous les champs obligatoires sont remplis.",
      errorImage: "Un problème lors du chargement de l'image ?"
    },
    emojiPicker: {
      search: "Situer...",
      lang: "pt-BR"
    },
    optRadio: {
      msg1: "Message 1",
      msg2: "Message 2",
      msg3: "Message 3"
    }
  },
  listChatflow: {
    title: "Flux",
    addButton: "Pour ajouter",
    status: {
      active: "Actif",
      inactive: "Inactif"
    },
    actions: {
      edit: "Modifier les informations",
      duplicate: "Flux dupliqué",
      open: "Flux ouvert",
      importJson: "Importer Json",
      delete: "Supprimer",
      newVersion: "Nouvelle Version (Vue Flow)",
      newVersionDesc: "Interface moderne et mise à jour",
      oldVersion: "Ancienne Version (jsPlumb)",
      oldVersionDesc: "Interface originale avec jsPlumb"
    },
    confirmDelete: {
      title: "Êtes-vous sûr de vouloir supprimer ce flux ?",
      message: "{nom}"
    },
    importJsonDialog: {
      title: "Importer JSON dans {name}",
      jsonLabel: "Coller JSON",
      jsonValidationError: "JSON est requis",
      importButton: "Importer",
      cancelButton: "Annuler",
      importSuccess: "JSON importé avec succès !",
      importError: "Format invalide. Vérifiez le JSON."
    }
  },
  modalChatflow: {
    title: {
      create: "Créer un flux",
      edit: "Modifier le flux",
      duplicate: "Flux dupliqué",
      duplicateSuffix: "(Nom : {name})"
    },
    fields: {
      description: "Description",
      isActive: "Actif",
      testNumber: "Numéro de test",
      testNumberHint: "Laissez-le propre pour que la réponse automatique fonctionne. Sinon, cela ne fonctionnera que pour le numéro fourni ici."
    },
    actions: {
      save: "Sauvegarder",
      cancel: "Annuler"
    },
    notifications: {
      created: "Nouveau flux créé.",
      edited: "Flux édité.",
      duplicated: "Flux dupliqué."
    }
  },
  chatPrivado: {
    labels: {
      grupo: "Groupe"
    },
    toolbar: {
      returnMenu: "Retour au menu",
      atendimento: "Service",
      minimize: "Réduire",
      groupMembers: "Membres du groupe"
    },
    dialog: {
      groupMembers: "Membres du groupe",
      editMessage: "Modifier le message",
      deleteMessageTitle: "Supprimer le message",
      deleteMessageConfirm: "Êtes-vous sûr de vouloir supprimer ce message?",
      forwardMessage: "Transférer le message"
    },
    chatHeader: {
      online: "En ligne",
      offline: "Hors ligne",
      noName: "Sans nom",
      noEmail: "Pas d'e-mail"
    },
    chatFooter: {
      emoji: "Émoji",
      attachFile: "Joindre un fichier",
      sendVideoLink: "Envoyer un lien pour la vidéoconférence",
      placeholder: "Entrez votre message",
      send: "Envoyer"
    },
    tabs: {
      users: "Utilisateurs",
      groups: "Équipes"
    },
    messages: {
      dateSeparator: "Aujourd'hui",
      downloadTooltip: "Télécharger : {fileName}",
      read: "Accord",
      unread: "Non lu",
      today: "Aujourd'hui",
      senderMe: "je",
      download: "Descendre",
      pdfPlaceholder: "Télécharger le PDF",
      online: "En ligne",
      offline: "Hors ligne",
      searchPlaceholder: "A chercher...",
      usersTab: "Utilisateurs",
      groupsTab: "Équipes",
      noMessages: "Aucun message trouvé.",
      clickToRemoveReaction: "Cliquez pour supprimer la réaction",
      editPlaceholder: "Entrez votre message",
      noUsersFound: "Aucun utilisateur trouvé"
    },
    notifications: {
      errorLoadMessages: "Erreur lors du chargement des messages.",
      fileRejected: "Erreur : vérifiez les fichiers téléchargés.",
      sendMessageError: "Erreur lors de l'envoi du message.",
      successMessageSent: "Message envoyé avec succès.",
      messageEdited: "Message modifié avec succès!",
      editError: "Erreur lors de la modification du message",
      messageDeleted: "Message supprimé avec succès!",
      deleteError: "Erreur lors de la suppression du message",
      reactionError: "Erreur lors de l'ajout de la réaction",
      messageForwarded: "Message transféré avec succès!",
      forwardError: "Erreur lors du transfert du message"
    }
  },
  configuracoesSessoes: {
    baileys: {
      title: "Réinitialiser la connexion Baileys (efface les sessions et redémarre)",
      description: "Êtes-vous sûr de vouloir réinitialiser la connexion Baileys ? Cette action effacera toutes les sessions et redémarrera la connexion.",
      message: "Connexion Baileys réinitialisée avec succès",
      error: "Erreur lors de la réinitialisation de la connexion Baileys"
    },    
    labels: {
      updateSessions: "Sessions mises à jour",
      noEvents: "Aucun événement trouvé",
      eventCount: "Nombre d'événements",
      name: "Nom",
      status: "Statut",
      session: "Session",
      number: "Nombre",
      updatedAt: "Dernière mise à jour",
      isDefault: "Standard",
      actions: "Actes",
      defaultConnection: "Connexion standard",
      deleteConnection: "Supprimer la connexion",
      setDefault: "Définir par défaut",
      confirmDeleteTitle: "Attention!! Voulez-vous vraiment supprimer ?",
      confirmDeleteMessage: "Les discussions ouvertes dans ce canal seront fermées, mais pourront être consultées dans le panneau d'assistance.",
      cancel: "Non",
      confirm: "Oui"
    },
    messages: {
      reloadPage: "Actualiser la page",
      errorLoadingColors: "Erreur lors du chargement des couleurs.",
      noColorsStored: "Aucune couleur stockée dans localStorage."
    }
  },
  configuracoesProxy: {
    title: "Système de Gestion des Proxies",
    description: "Gérer les proxies locaux pour les connexions WhatsApp",
    descriptionDetail: "Les proxies sont générés automatiquement en utilisant votre propre machine",
    descriptionDetail2: "Pour activer le proxy, demandez au super administrateur.",
    tooltip: "Système de Proxy Local",
    
    statistics: {
      title: "Statistiques des Proxies",
      totalProxies: "Total des Proxies",
      activeProxies: "Proxies Actifs",
      failedProxies: "Proxies Échoués"
    },
    
    generation: {
      title: "Générer des Proxies Locaux",
      numberOfProxies: "Nombre de Proxies",
      proxyType: "Type de Proxy",
      generateProxies: "Générer des Proxies",
      generateGlobal: "Générer Global"
    },
    
    list: {
      title: "Proxies Configurés",
      refreshList: "Actualiser la Liste",
      total: "Total",
      proxies: "proxies",
      noProxiesConfigured: "Aucun proxy configuré",
      noProxiesMessage: "Générez des proxies pour commencer",
      removeAllProxies: "Supprimer Tous les Proxies"
    },
    
    proxyItem: {
      type: "Type",
      status: "Statut",
      user: "Utilisateur",
      active: "Actif",
      inactive: "Inactif",
      testProxy: "Tester le Proxy",
      editProxy: "Modifier le Proxy",
      deleteProxy: "Supprimer le Proxy"
    },
    
    manualConfig: {
      title: "Configuration Manuelle du Proxy",
      host: "Hôte",
      hostPlaceholder: "192.168.1.100",
      port: "Port",
      portPlaceholder: "8080",
      username: "Nom d'utilisateur (Optionnel)",
      password: "Mot de passe (Optionnel)",
      proxyType: "Type de Proxy",
      addProxy: "Ajouter un Proxy"
    },
    
    editModal: {
      title: "Modifier le Proxy",
      host: "Hôte",
      hostPlaceholder: "192.168.1.100",
      port: "Port",
      portPlaceholder: "8080",
      username: "Nom d'utilisateur (Optionnel)",
      password: "Mot de passe (Optionnel)",
      proxyType: "Type de Proxy",
      active: "Actif",
      cancel: "Annuler",
      save: "Enregistrer"
    },
    
    messages: {
      proxiesGeneratedSuccess: "Proxies générés avec succès",
      globalProxiesGeneratedSuccess: "Proxies globaux générés avec succès",
      proxyWorking: "Le proxy {host}:{port} fonctionne",
      proxyFailed: "Le proxy {host}:{port} a échoué : {error}",
      proxyAddedSuccess: "Proxy ajouté avec succès",
      proxyUpdatedSuccess: "Proxy mis à jour avec succès",
      proxyDeletedSuccess: "Proxy supprimé avec succès",
      allProxiesRemovedSuccess: "Tous les proxies supprimés avec succès",
      errorLoadingProxies: "Erreur lors du chargement des proxies",
      errorGeneratingProxies: "Erreur lors de la génération des proxies",
      errorGeneratingGlobalProxies: "Erreur lors de la génération des proxies globaux",
      errorTestingProxy: "Erreur lors du test du proxy",
      errorAddingProxy: "Erreur lors de l'ajout du proxy",
      errorUpdatingProxy: "Erreur lors de la mise à jour du proxy",
      errorDeletingProxy: "Erreur lors de la suppression du proxy",
      errorRemovingProxies: "Erreur lors de la suppression des proxies"
    },
    
    confirmations: {
      removeAllTitle: "Confirmer",
      removeAllMessage: "Êtes-vous sûr de vouloir supprimer tous les proxies ?",
      deleteTitle: "Confirmer la Suppression",
      deleteMessage: "Êtes-vous sûr de vouloir supprimer le proxy {host}:{port} ?"
    },
    
    proxyTypes: {
      socks: "SOCKS Seulement"
    }
  },
  configuracoesSessoesStatus: {
    statuses: {
      qrcode: {
        title: "En attente de lecture du code QR",
        description: "Cliquez sur le bouton « QR CODE » et scannez le QR Code avec votre téléphone portable pour démarrer la session"
      },
      disconnected: {
        title: "Impossible de démarrer la communication pour ce canal.",
        whatsapp: "Assurez-vous que votre téléphone est connecté à Internet et réessayez, ou demandez un nouveau code QR.",
        waba: "Essayez de vous connecter à nouveau. Si l’erreur persiste, confirmez que les jetons sont corrects.",
        telegram: "Essayez de vous connecter à nouveau. Si l’erreur persiste, confirmez que le jeton est correct.",
        instagram: "Essayez de vous connecter à nouveau. Si l’erreur persiste, vérifiez que les informations d’identification sont correctes."
      },
      connected: {
        meow: "Connexion établie : ",
        waba: "Connexion établie : ",
        whatsapp: "Connexion établie : ",
        loading: "Chargement des données..."
      },
      pairingTimeout: {
        title: "Connexion cellulaire perdue",
        description: "Assurez-vous que votre téléphone est connecté à Internet et que WhatsApp est ouvert, ou cliquez sur le bouton « Déconnecter » pour obtenir un nouveau code QR."
      },
      opening: {
        title: "Établir une connexion.",
        description: "Cela peut prendre un certain temps..."
      }
    },
    labels: {
      lastUpdate: "Dernière mise à jour"
    }
  },
  configuracoesChatgpt: {
    labels: {
      enableChatgpt: "Activer l'intégration de ChatGPT",
      enableChatgptDescription: "Lorsqu'il est activé, le système consommera les informations de ChatGPT.",
      enableChatgptAll: "Activer l'intégration ChatGPT pour tous les services par défaut",
      enableChatgptAllDescription: "Lorsqu'il est actif, le système consommera les informations de ChatGPT dans tous les appels."
    },
    notifications: {
      success: "Configuration modifiée !",
      error: "Une erreur s'est produite lors de la modification de la configuration."
    }
  },
  configuracoesLm: {
    labels: {
      enableLm: "Activer l'intégration avec LM Studio",
      enableLmDescription: "Lorsqu'il est actif, le système consommera les informations de LM Studio.",
      enableLmAll: "Activer l'intégration avec LM Studio pour tous les services par défaut",
      enableLmAllDescription: "Lorsqu'il est actif, le système consommera les informations de LM Studio dans tous les services."
    },
    notifications: {
      success: "Configuration modifiée !",
      error: "Une erreur s'est produite lors de la modification de la configuration."
    }
  },
  configuracoesOllama: {
    labels: {
      enableOllama: "Activer l'intégration d'Ollama",
      enableOllamaDescription: "Lorsqu'il est actif, le système consommera les informations d'Ollama.",
      enableOllamaAll: "Activer l'intégration d'Ollama pour tous les services par défaut",
      enableOllamaAllDescription: "Lorsqu'il est actif, le système consommera les informations d'Ollama dans tous les appels."
    },
    notifications: {
      success: "Configuration modifiée !",
      error: "Une erreur s'est produite lors de la modification de la configuration."
    }
  },
  configuracoesDialogflow: {
    labels: {
      enableDialogflow: "Activer Dialogflow",
      enableDialogflowDescription: "Lorsqu'il est activé, le système consommera le flux Dialogflow.",
      enableDialogflowAll: "Activer l'intégration de Dialogflow pour toute la prise en charge par défaut",
      enableDialogflowAllDescription: "Lorsqu'il est actif, le système consommera les informations de Dialogflow dans tous les appels."
    },
    notifications: {
      success: "Configuration modifiée avec succès !",
      error: "Erreur lors du changement de configuration."
    }
  },
  configuracoesDify: {
    labels: {
      enableDify: "Activer l'intégration avec Dify",
      enableDifyDescription: "Lorsqu'il est actif, le système consommera les informations de Dify.",
      enableDifyAll: "Activer l'intégration Dify pour tous les services par défaut",
      enableDifyAllDescription: "Lorsqu'il est actif, le système consommera les informations de Dify dans tous les appels."
    },
    notifications: {
      success: "Configuration modifiée avec succès !",
      error: "Erreur lors du changement de configuration."
    }
  },
  configuracoesGemini: {
    labels: {
      enableGemini: "Activer l'intégration Gemini",
      enableGeminiDescription: "Lorsqu'il est actif, le système consommera les informations de Gemini.",
      enableGeminiAll: "Activer l'intégration Gemini pour tous les services par défaut",
      enableGeminiAllDescription: "Lorsqu'il est actif, le système consommera les informations de Gemini dans tous les appels."
    },
    notifications: {
      success: "Configuration modifiée avec succès !",
      error: "Erreur lors du changement de configuration."
    }
  },
  configuracoesDeepseek: {
    labels: {
      enableDeepseek: "Activer l'intégration de Deepseek",
      enableDeepseekDescription: "Lorsqu'il est actif, le système consommera les informations de Deepseek.",
      enableDeepseekAll: "Activer l'intégration Deepseek pour tous les services par défaut",
      enableDeepseekAllDescription: "Lorsqu'il est actif, le système consommera les informations de Deepseek dans tous les appels."
    },
    notifications: {
      success: "Configuration modifiée avec succès !",
      error: "Erreur lors du changement de configuration."
    }
  },
  configuracoesQwen: {
    labels: {
      enableQwen: "Activer l'intégration de Qwen",
      enableQwenDescription: "Lorsqu'il est actif, le système consommera les informations de Qwen.",
      enableQwenAll: "Activer l'intégration Qwen pour tous les services par défaut",
      enableQwenAllDescription: "Lorsqu'il est actif, le système consommera les informations de Qwen dans tous les appels."
    },
    notifications: {
      success: "Configuration modifiée avec succès !",
      error: "Erreur lors du changement de configuration."
    }
  },
  configuracoesClaude: {
    labels: {
      enableClaude: "Activer l'intégration de Claude",
      enableClaudeDescription: "Lorsqu'il est actif, le système consommera les informations de Claude.",
      enableClaudeAll: "Activer l'intégration Claude pour tous les services par défaut",
      enableClaudeAllDescription: "Lorsqu'il est actif, le système consommera les informations de Claude dans tous les appels."
    },
    notifications: {
      success: "Configuration modifiée avec succès !",
      error: "Erreur lors du changement de configuration."
    }
  },
  configuracoesGrok: {
    labels: {
      enableGrok: "Activer l'intégration de Grok",
      enableGrokDescription: "Lorsqu'il est actif, le système consommera les informations de Grok.",
      enableGrokAll: "Activer l'intégration Grok pour tous les services par défaut",
      enableGrokAllDescription: "Lorsqu'il est actif, le système consommera les informations de Grok dans tous les appels."
    },
    notifications: {
      success: "Configuration modifiée avec succès !",
      error: "Erreur lors du changement de configuration."
    }
  },
  configuracoesEvolution: {
    labels: {
      warningEvo: "Evolution v.2.20.0 ou supérieur",
      installApi: "Installez gratuitement votre API Evolution",
      apiIntegrationUrl: "https://github.com/EvolutionAPI/evolution-api",
      checkApiStatus: "Vérifier l'état de l'API dans un nouvel onglet",
      apiUrl: "URL de l'API (https://subevo.com.br)",
      globalKey: "Clé globale"
    },
    notifications: {
      success: "Configuration modifiée avec succès !",
      error: "Erreur lors du changement de configuration. Veuillez vérifier les données et réessayer.",
      loadError: "Erreur lors du chargement des paramètres. Veuillez réessayer.",
      invalidUrl: "Veuillez entrer une URL valide avant de continuer !"
    }
  },
  configuracoesgroqCloud: {
    labels: {
      installApi: "Enregistrez gratuitement votre API GroqCloud",
      apiIntegrationUrl: "https://console.groq.com/",
      apiKey: "Clé API",
      language: "Langue",
      model: "Modèle",
      enableGroqCloud: "Activer l'intégration avec GroqCloud",
      enableGroqCloudDescription: "Lorsqu'il est actif, le système consommera les informations de Groq Cloud et transcrira les audios reçus."
    },
    notifications: {
      success: "Configuration modifiée avec succès !",
      error: "Erreur lors du changement de configuration. Veuillez vérifier les données et réessayer.",
      loadError: "Erreur lors du chargement des paramètres. Veuillez réessayer.",
      invalidUrl: "Veuillez entrer une URL valide avant de continuer !"
    }
  },
  configuracaoLanes: {
    title: "voies",
    addLane: "Ajouter une voie",
    editLane: "Modifier la voie",
    deleteLane: "Supprimer la voie",
    deleteConfirmation: "Êtes-vous sûr de vouloir supprimer la voie « {lane} » ?",
    laneDeleted: "La voie « {lane} » a été supprimée avec succès !",
    columns: {
      id: "#",
      name: "voie",
      position: "Position",
      actions: "Actes"
    },
    notifications: {
      successDelete: "Voie supprimée avec succès !",
      errorDelete: "Erreur lors de la suppression de Lane."
    }
  },
  hub: {
    createAccountInstruction: "Créez un compte sur hub.notificame.com.br et générez votre token",
    tooltip: "HUB Prévenez-moi (Bêta)",
    tokenLabel: "Votre jeton m'informe"
  },
  configuracaoMeta: {
    title: "Paramètres méta",
    webhookMeta: "Méta Webhook",
    webhookTooltip: "Méta Webhook",
    webhookInstagram: "Webhook Instagram",
    webhookInstagramTooltip: "Cliquez pour copier le webhook Instagram",
    webhookInstagramCopied: "Webhook Instagram copié avec succès !",
    webhookMessenger: "Webhook Messenger",
    webhookMessengerTooltip: "Cliquez pour copier le webhook Messenger",
    webhookMessengerCopied: "Webhook Messenger copié avec succès !",
    metaTokenLabel: "Jeton Meta Webhook",
    testBMTitle: "Test BM",
    testBMDescription: "Saisissez les informations ci-dessous pour vérifier l'état de votre BMS",
    testBMTooltip: "Test BM",
    wabaIdLabel: "ID WABA (identifiant de compte professionnel WhatsApp)",
    wabaVersionLabel: "Version WABA (version de l'API WhatsApp Business)",
    wabaTokenLabel: "Jeton WABA (jeton Meta Business Manager)",
    verifyBMButton: "Vérifiez BM",
    verificationResultTitle: "Résultat de la vérification",
    verification: {
      verifiedName: "Nom vérifié",
      verificationStatus: "Statut de vérification",
      phoneNumber: "Numéro de téléphone",
      qualityRating: "Évaluation de la qualité",
      platformType: "Type de plate-forme",
      throughputLevel: "Niveau de débit",
      webhookConfigured: "Webhook configuré",
      id: "IDENTIFIANT"
    },
    notConfigured: "Non configuré",
    notifications: {
      successVerify: "Vérification terminée !",
      errorVerify: "Erreur lors de la vérification de BM !",
      successCopy: "Lien copié!",
      successUpdate: "Jeton mis à jour avec succès !",
      errorUpdate: "Erreur lors de l'actualisation du jeton !"
    },
    tabs: {
      config: "Paramètres",
      templates: "Modèles",
      facebook: "Connexion Facebook"
    },
    facebook: {
      title: "Connexion Facebook",
      description: "Connectez-vous avec votre compte Facebook pour accéder aux ressources Meta Business",
      loginTab: "Connexion",
      selectApp: "Sélectionner l'App",
      noAppsAvailable: "Aucune app disponible",
      errorLoadingApps: "Erreur lors du chargement des apps disponibles",
      appId: "ID d'Application",
      appIdHint: "ID d'application Facebook",
      apiVersion: "Version API",
      apiVersionHint: "Version de l'API Facebook",
      status: "Statut de Connexion",
      userId: "ID Utilisateur",
      accessToken: "Jeton d'Accès",
      expiresIn: "Expire dans",
      noExpiration: "N'expire pas",
      name: "Nom",
      email: "E-mail",
      picture: "Photo de Profil",
      login: "Se Connecter",
      logout: "Se Déconnecter",
      checkStatus: "Vérifier le Statut",
      connected: "Connecté à Facebook avec succès !",
      notConnected: "Vous devez être connecté à Facebook",
      notAuthorized: "Vous devez autoriser l'application",
      loggedOut: "Déconnexion réussie !",
      statusConnected: "Connecté",
      statusNotAuthorized: "Non Autorisé",
      statusUnknown: "Inconnu",
      userInfo: "Informations Utilisateur",
      wabaManagement: "Gérer les WABAs et Numéros",
      loadWabas: "Charger les WABAs",
      noWabas: "Aucun WABA trouvé. Cliquez sur 'Charger les WABAs' pour rechercher.",
      noBusinessAccounts: "Aucun compte professionnel trouvé",
      noWabasFound: "Aucun WABA trouvé dans vos comptes professionnels",
      loadPhones: "Charger les Numéros",
      phoneNumbers: "Numéros de Téléphone",
      noPhonesFound: "Aucun numéro de téléphone trouvé dans ce WABA",
      createChannel: "Créer un Canal",
      channelName: "Nom du Canal",
      channelNameHint: "Entrez un nom pour identifier ce canal",
      wabaId: "ID WABA",
      phoneNumberId: "ID Numéro de Téléphone",
      displayPhoneNumber: "Numéro de Téléphone",
      wabaVersion: "Version WABA",
      wabaVersionHint: "Version API (ex: v24.0)",
      create: "Créer",
      channelCreated: "Canal créé avec succès !",
      addPhoneNumber: "Ajouter un Numéro",
      addWaba: "Ajouter WABA",
      addWabaAndNumber: "Ajouter WABA et Numéro",
      phoneNumber: "Numéro de Téléphone",
      phoneNumberRequired: "Veuillez saisir le numéro de téléphone",
      startOnboarding: "Démarrer l'Onboarding",
      onboardingInfo: "Un code de vérification sera envoyé par SMS au numéro fourni. Vous devrez vérifier le code pour terminer le processus.",
      onboardingWabaInfo: "Un nouveau numéro de téléphone sera ajouté à une WABA existante ou un nouveau numéro sera créé. Un code de vérification sera envoyé par SMS.",
      phoneOnboardingStarted: "Onboarding démarré! Vérifiez le SMS sur le numéro fourni pour terminer la vérification.",
      creatingWaba: "Création d'une nouvelle WABA...",
      wabaCreated: "WABA créée avec succès!",
      wabaCreationNotSupported: "La création de WABA via API n'est pas disponible. Veuillez créer une WABA manuellement dans Facebook Business Manager et réessayer.",
      wabaCreationError: "Erreur lors de la création de WABA. Veuillez créer une WABA manuellement dans Facebook Business Manager.",
      noTokenConfigured: "Aucun token configuré pour cette application. Utilisation du token utilisateur.",
      businessTokenObtained: "Token d'entreprise obtenu avec succès !",
      tokenExchangeError: "Erreur lors de l'échange du code contre un token. Utilisation du token de l'application comme alternative.",
      embeddedSignup: "Ajouter Whatsapp",
      embeddedSignupConfigId: "ID de Configuration (Inscription Intégrée)",
      embeddedSignupConfigIdHint: "ID de configuration de l'Inscription Intégrée",
      embeddedSignupFinished: "Inscription intégrée terminée avec succès !",
      embeddedSignupCancelled: "Inscription intégrée annulée",
      embeddedSignupError: "Erreur dans l'inscription intégrée",
      codeReceived: "Code reçu. En attente de la fin du flux...",
      loginError: "Erreur de connexion",
      loginSuccess: "Connexion réussie !",
      sdkNotLoaded: "Le SDK Facebook n'est pas chargé. Veuillez patienter...",
      noTokenAvailable: "Aucun token disponible. Veuillez vous connecter d'abord.",
      channelCreatedFromEmbeddedSignup: "Canal créé avec succès depuis l'Inscription Intégrée !",
      channelCreatedSuccess: "Canal créé avec succès ! Numéro ajouté à WABA.",
      phoneAddedToWaba: "Numéro de téléphone ajouté à WABA avec succès ! La liste sera mise à jour automatiquement.",
      wabaAddedToList: "WABA ajoutée à la liste !",
      embeddedSignupOptions: "Options",
      embeddedSignupOptionsTitle: "Options d'Inscription Intégrée",
      embeddedSignupVersion: "Version",
      embeddedSignupSessionInfoVersion: "Version de la Session",
      embeddedSignupFeatures: "Fonctionnalités",
      phoneVerificationUnauthorized: "Canal créé, mais impossible de vérifier le téléphone. Le token peut ne pas avoir les permissions nécessaires.",
      phoneVerificationError: "Canal créé, mais il y a eu un avertissement lors de la vérification du téléphone",
      phoneVerificationDelayed: "Canal créé avec succès. La vérification du téléphone sera effectuée automatiquement sous peu.",
      appIdRequired: "App ID non configuré. Veuillez sélectionner une application.",
      configIdRequired: "Config ID non configuré. Veuillez configurer le Config ID de l'Inscription Intégrée.",
      resourceUnavailable: "Ressource indisponible. Veuillez vérifier que l'App ID et le Config ID sont corrects et que le domaine est configuré dans l'application Facebook.",
      permissionsRequired: "Les permissions nécessaires n'ont pas été accordées.",
      invalidAppId: "App ID invalide ou non configuré correctement.",
      sdkError: "Erreur lors de la vérification du SDK Facebook. Essayez de recharger la page.",
      domainNotConfigured: "Domaine non configuré dans \"Domaines de l'application\"",
      domainConfigurationRequired: "Configurez les domaines dans \"Domaines de l'application\" dans le Tableau de bord de l'application Facebook et réessayez.",
      loginOAuth: "Ajouter Facebook",
      noAppSelected: "Veuillez d'abord sélectionner une application",
      appNotFound: "Application introuvable",
      facebookAppIdRequired: "Facebook App ID non configuré pour cette application",
      loginRedirect: "Redirection vers la connexion Facebook...",
      loginError: "Erreur lors de l'ouverture de la connexion Facebook",
      webhookConfigError: "Canal créé, mais un avertissement est survenu lors de la configuration du webhook"
    },
    instagram: {
      login: "Ajouter Instagram",
      noAppSelected: "Veuillez d'abord sélectionner une application",
      appNotFound: "Application introuvable",
      configIdRequired: "Config ID non configuré pour cette application",
      loginRedirect: "Redirection vers la connexion Instagram...",
      loginError: "Erreur lors de l'ouverture de la connexion Instagram",
      webhookConfigError: "Canal créé, mais un avertissement est survenu lors de la configuration du webhook",
      channelCreated: "Canal Instagram créé avec succès !"
    }
  },
  configuracaoMotivo: {
    title: "Revendications",
    addMotivo: "Ajouter une demande",
    editMotivo: "Modifier la demande",
    deleteMotivo: "Supprimer la demande",
    deleteConfirmation: "Voulez-vous vraiment supprimer la demande « {reason} » ?",
    motivoDeleted: "La demande « {reason} » a été supprimée avec succès !",
    columns: {
      id: "#",
      name: "Demande",
      actions: "Actes"
    },
    notifications: {
      successDelete: "Demande supprimée avec succès !",
      errorDelete: "Erreur lors de la suppression de la demande."
    }
  },
  configuracoesN8N: {
    title: "Paramètres d'intégration N8N",
    enableIntegration: "Activer l'intégration avec N8N",
    enableIntegrationCaption: "Lorsqu'il est actif, le système consommera les informations du N8N.",
    enableIntegrationAllTickets: "Activer l'intégration N8N pour tous les services par défaut",
    enableIntegrationAllTicketsCaption: "Lorsqu'il est actif, le système consommera les informations de N8N dans tous les appels.",
    toggleEnabled: "Activé",
    toggleDisabled: "Désactivé",
    notifications: {
      success: "Configuration mise à jour avec succès !",
      error: "Erreur lors de la mise à jour de la configuration."
    }
  },
  configuracaoPagamento: {
    title: "Informations de paiement",
    paymentLink: "Lien de paiement",
    paymentId: "ID de paiement",
    status: "Statut",
    dueDate: "Maturité",
    pending: "En attente",
    overdue: "En retard",
    toolbarTitle: "Informations de paiement",
    notifications: {
      errorFetch: "Impossible de lister les options de paiement."
    }
  },
  configuracoesSMS: {
    title: "Paramètres SMS",
    comteleAccount: "Créez un compte sur comtele.com.br et générez une clé API",
    conectaAccount: "Créez un compte sur Conecta et générez une clé API",
    comteleTokenLabel: "Votre clé API Comtele",
    conectaTokenLabel: "Votre clé API se connecte",
    comteleTooltip: "SMS Comtele",
    conectaTooltip: "Connexion SMS",
    livsonAccount: "Créez un compte sur BHI et générez une clé API",
    livsonTokenLabel: "Votre clé API BHI",
    livsonTooltip: "SMS BHI",
    notifications: {
      successUpdate: "Jeton mis à jour avec succès !",
      errorUpdate: "Erreur lors de l'actualisation du jeton."
    }
  },
  configuracoesSMTP: {
    erroEnvioTeste: "Erreur lors de l'envoi du test.",
    assuntoTeste: "Test de courrier électronique",
    mensagemTeste: "Il s'agit d'un e-mail de test envoyé par le système.",
    enviarTeste: "Soumettre le test",
    testeEnviado: "Test envoyé avec succès !",
    testeErro: "Erreur lors de l'envoi du test.",
    testeEmail: "Courriel de test",
    testeAssunto: "Sujet de test",
    testeMensagem: "Message de test",
    testeBotao: "Cliquez ici pour tester",
    emailDestino: "E-mail de destination",
    title: "Paramètres SMTP",
    enableSMTP: "Activer SMTP",
    enableSMTPCaption: "Lorsqu'il est actif, le système enverra des informations à l'adresse e-mail de l'utilisateur.",
    emailHostLabel: "Serveur de messagerie (hôte) :",
    emailPortLabel: "Port SMTP",
    emailUserLabel: "Utilisateur de messagerie électronique :",
    emailPassLabel: "E-mail Mot de passe:",
    emailSecure: "Protocole de sécurité",
    emailSecureCaption: "Activer le protocole sécurisé.",
    notifications: {
      successUpdate: "Configuration mise à jour avec succès !",
      errorUpdate: "Erreur lors de la mise à jour de la configuration."
    }
  },
  configuracoesTypebot: {
    title: "Paramètres de Typebot",
    enableTypebot: "Activer Typebot",
    enableTypebotCaption: "Lorsqu'il est actif, le système consommera le flux Typebot.",
    enableAllTickets: "Activer l'intégration de Typebot pour tous les services par défaut",
    enableAllTicketsCaption: "Lorsqu'il est actif, le système consommera les informations de Typebot dans tous les appels.",
    notifications: {
      successUpdate: "Configuration mise à jour avec succès !",
      errorUpdate: "Erreur lors de la mise à jour de la configuration."
    }
  },
  configuracoesVariaveis: {
    titlePlatform: "Variables de plate-forme",
    platformVariables: {
      name: "nom",
      greeting: "salutation",
      protocol: "protocole d'ouverture",
      email: "e-mail (le cas échéant)",
      phoneNumber: "téléphone",
      kanban: "kanban (le cas échéant)",
      user: "préposé",
      userEmail: "courriel du préposé",
      firstName: "prénom",
      lastName: "nom de famille",
      businessName: "entreprise"
    },
    titleTypebot: "Variables TypeBot",
    typebotVariables: {
      nome: "nom",
      numero: "nombre",
      atendimento: "numéro de billet",
      email: "e-mail (le cas échéant)",
      status: "statut du ticket",
      canal: "canal de service",
      grupo: "soins de groupe ou pas",
      fullTicket: "toutes les propriétés de service"
    }
  },
  configuracoesWebhook: {
    enableWebhook: "Activer le webhook",
    enableWebhookCaption: "Lorsqu'il est actif, le système enverra des informations au webhook défini.",
    webhookUrlLabel: "URL du webhook :",
    webhookMessage: "Recevez des messages et du soutien",
    webhookCreateChannel: "Créer un canal/une connexion",
    webhookUpdateChannel: "Mettre à jour la chaîne/la connexion",
    webhookCreateUser: "Créer un utilisateur/contact/opportunité",
    webhookUpdateUser: "Mettre à jour l'utilisateur/le contact/l'opportunité",
    webhookCreateApi: "Créer une API",
    webhookUpdateApi: "Mettre à jour l'API",
    webhookRenewApi: "Renouveler le jeton API"
  },
  configuracoesWuzapi: {
    title: "Paramètres de l'API Meow (Wuzapi)",
    installApiLabel: "Installez votre API MEOW gratuitement",
    installApiTooltip: "API Meow (Wuzapi) (Bêta)",
    apiUrlLabel: "URL de l'API (https://subwuzapi.com.br)",
    checkApiStatus: "Vérifier l'état de l'API dans un nouvel onglet",
    invalidUrlMessage: "Veuillez entrer une URL valide avant de continuer !",
    globalKeyLabel: "Clé globale",
  },
  configuracoesUazapi: {
    title: "Paramètres de l'API Uazapi",
    installApiLabel: "Installez votre API Uazapi gratuitement",
    installApiTooltip: "API Uazapi (Bêta)",
    apiUrlLabel: "URL de l'API (https://uazapi.com.br)",
    globalKeyLabel: "Clé globale",
  },
  configuracoesZapi: {
    title: "Paramètres de l'API Zapi",
    installApiLabel: "Installez votre API Zapi gratuitement",
    installApiTooltip: "API Zapi (Bêta)",
    apiUrlLabel: "URL de l'API (https://zapi.com.br)",
    globalKeyLabel: "Clé globale",
  },
  configuracoes: {
    tabs: {
      gerais: "Paramètres généraux",
      botsIA: "Bots et IA",
      integracoes: "Intégrations",
      crm: "CRM",
      sessoes: "Séances"
    },
    sidebar: {
      menu: "Menu",
      proxy: "Proxy",
      uazapi: "Service Uazapi",
      zapi: "Service Zapi",
      googleCalendar: "Google Calendar",
      vapi: "Vapi",
      tutoriais: 'Tutoriais',
      webchat: "WebChat",
      groqcloud: "GroqCloud",
      grok: "Grok",
      gemini: "Gémeaux",
      qwen: "Qwen",
      claude: "Claude",
      deepseek: "Recherche profonde",
      ollama: "Ollama",
      lm: "LM Studio",
      payment: "Paiement",
      gerais: "Configuration Général",
      smtp: "SMTP",
      typebot: "Typebot",
      chatGPT: "Chat GPT",
      n8n: "N8N",
      dify: "Dify",
      dialogflow: "Dialogflow",
      webhooks: "Webhooks",
      meta: "But",
      evolution: "API d'évolution",
      wuzapi: "API Wuzapi",
      hub: "Hub Prévenez-moi",
      sms: "SMS",
      kanban: "Kanban et voies",
      motivos: "Revendications",
      variaveis: "Variables",
      sessoes: "Liste des séances"
    },
    tooltips: {
      toggleSidebar: "Afficher/Masquer le menu"
    }
  },
  configuracoesWebchat: {
    copyCodeError: "Erreur lors de la copie du code",
    sucessCopy: "Code copié avec succès !",
    copyCode: "Copier le code",
    widgetCode: "Code du widget de chat Web",
    tokenWarning2: "Ce jeton est utilisé pour authentifier les connexions WebSocket de votre chat Web. Gardez-le en sécurité et ne le partagez pas.",
    generateNewToken: "Générer un nouveau jeton",
    tokenWarning: "Un jeton est requis pour la connexion WebChat.",
    autenticationToken: "Jeton d'authentification",
    title: "Paramètres du WebChat",
    enableWebchat: "Activer WebChat",
    enableWebchatCaption: "Lorsqu'il est actif, le système consommera WebChat.",
    webchatUrlLabel: "URL du chat Web :",
    webchatConfigurado: "Le webchat est configuré et prêt à être utilisé.",
    wssFuncionando: "La connexion WebSocket fonctionne correctement.",
    gerarWidget: "Vous pouvez générer le widget à implémenter sur votre site Web.",
    wssNaoFuncionando: "Le chat Web est configuré, mais la connexion WebSocket ne fonctionne pas.",
    verificarWss: "Vérifiez que le serveur WebSocket est en ligne et accessible.",
    solicitarInstalacao: "Pour utiliser le chat Web, vous devez demander à votre administrateur système d'installer l'interface de chat Web.",
    configurarAmbiente: "Les paramètres WSS_URL et WSS_PORT doivent être configurés dans l'environnement.",
    selecionarCanal: "Sélectionnez le canal pour générer le widget",
    gerarWidgetBtn: "Générer un widget",
    widgetGerado: "Widget généré avec succès !",
    erroGerarWidget: "Erreur lors de la génération du widget",
    carregandoCanais: "Chargement des chaînes...",
    erroCarregarCanais: "Erreur lors du chargement des chaînes",
    tenantErro: "Erreur lors du chargement du locataire",
    tokenUpdated: "Jeton mis à jour avec succès !",
    tokenError: "Erreur lors de la génération d'un nouveau jeton. Essayer à nouveau"
  },
  configuracoesModalCampanha: {
    create: "Créer une voie",
    edit: "Modifier la voie",
    name: "Nom de la voie",
    position: "Position",
    notifications: {
      created: "Voie créée !",
      updated: "Étape éditée !"
    }
  },
  configuracoesModalMotivos: {
    create: "Créer la demande",
    edit: "Modifier la demande",
    name: "Nom de la demande",
    notifications: {
      created: "Demande créée !",
      updated: "Demande éditée !"
    }
  },
  configuracoesGerais: {
    labels: {
      allowPause: "Autoriser le pause",
      useUserBusinessHours: "Utiliser les heures de travail de l'utilisateur",
      webPushChatInterno: "Web Push pour Chat Interne",
      scanContacts: 'Scan de Contatos sem Lid',
      postmanLink: 'Lien Postman',
      listarPelaUltimaMensagem: "Lister les services par dernier message",
      forceReason: "Définition de la demande de force lors de la fermeture du service",
      syncTicketData: "Mettre à jour la date du billet",
      controlFeatures: "Contrôle des fonctionnalités",
      syncMessagesUpdate: "Date de mise à jour des messages importés",
      ignoreIgStories: "Histoires Instagram muettes",
      audioPlugin: "Utiliser le plugin audio (bêta)",
      audioModule: "Utilisation du module audio avec Waves (version bêta)",
      showGroupsForAll: "Afficher les groupes à tous les utilisateurs",
      persistirMedia: "Téléchargement de Persist Media (Baileys)",
      showClosedForAll: "Afficher Fermé à tous les utilisateurs",
      waitProcessing: "Activer l'attente du traitement des messages avec des intégrations externes (Typebot, ChatGPT...)",
      openChat: "Activer l'envoi de messages Waba en dehors de la fenêtre (ne garantit pas la livraison)",
      shutdownWallet: "Désactiver les intégrations externes lorsque la walletisation est activée",
      notViewAssignedTickets: "Ne pas afficher les tickets déjà attribués à d'autres utilisateurs",
      notViewTicketsChatBot: "Ne pas afficher les tickets dans ChatBot",
      directTicketsToWallets: "Forcer le service via Wallet",
      ticketNulo: "Afficher les tickets sans utilisateur ou file d'attente assignés",
      supervisor: "Supprimer les privilèges de visualisation du superviseur",
      semRedis: "Utiliser l'envoi rapide de messages",
      chatbotLane: "Guide de service d'activation des chatbots",
      chatbotFix: "Connexions des broches en haut du service",
      ignoreGroupMsg: "Ignorer les messages de groupe",
      rejectCalls: "Refuser les appels sur Whatsapp",
      callRejectMessage: "Message lors du rejet de la connexion :",
      agruparTickets: "Afficher l'historique des messages",
      transbordo: "Débordement de messages",
      atualizarNomes: "Ne pas mettre à jour le nom lors de la réception de messages",
      forcarAdmin: "Forcer l'administrateur sur le support",
      signed: "Désactiver le contrôle de signature",
      universalCounter: "Compteur dans les onglets supérieurs (Privé/Groupes)",
      autoClose: "Résoudre automatiquement les problèmes de service sans interaction",
      autoCloseTime: "Choisissez une option (temps en minutes)",
      autoCloseMessage: "Message de clôture",
      ticketLimit: "Filtrer les anciens appels",
      days: "Jours",
      ticketLimitDaysAgo: "Il y a quelques jours pour filtrer",
      notificationSilenced: "Notifications sonores",
      forbiddenNumbers: "Numéros bloqués sur la plateforme",
      resetFlow: "Réinitialiser le flux du chatbot",
      maxRetries: "Nombre maximal de fois où le message doit être envoyé",
      privateMessageLimit: "Nombre de messages dans le chat interne",
      ticketLimitNumber: "Nombre de tickets consultés",
      validateAllContacts: "Valider tous les contacts",
      forcePendingUser: "Forcer l'utilisateur actuel à changer le statut en attente",
      chatbotFlow: "Flux actif pour le Service Bot",
      forcePending: "Forcer l'utilisateur actuel à modifier l'état du service en attente",
      maxAttemps: "Nombre maximal de fois que le message des heures de service doit être envoyé au client.",
      limitTickets: "Nombre de tickets à consulter obligatoirement lors du service.",
      limitePrivate: "Nombre de messages devant être chargés dans le chat interne par service.",
      erroMessage: "Envoyer les messages arrêtés",
      solveMessage: "Résoudre les messages",
      validate: "Valider tous les contacts",
      minutes: "10 minutes",
      hours: "1 heure",
      day: "1 jour",
      days5: "5 jours",
      days10: "10 jours",
      validateContact: "Valider le contact",
      hearHubApi: "Activer l'écoute de l'API Hub Notificame",
      ticketsRain: "Activer le filtre de tickets socket (recommandé pour volume élevé)",
      messageListingType: "Type de Liste de Messages",
      messageListingTypeDefault: "Par défaut",
      messageListingTypeByQueue: "Historique par File",
      messageListingTypeComplete: "Historique Complet",
      messageListingTypeByTicket: "Historique par Ticket",
    },
    captions: {
      allowPause: "Lors de l'activation de cette option, le système permettra de mettre en pause le service temporairement.",
      useUserBusinessHours: "Lors de l'activation de cette option, le système utilisera les heures de travail de l'utilisateur pour définir le temps de service.",
      webPushChatInterno: "Lors de l'activation de cette option, le système enverra des notifications push lorsque de nouveaux messages sont reçus dans le chat interne.",
      scanContacts: "Lors de l'activation de cette option, le système listera les appels par le dernier message reçu.",
      postmanLink: "Lors de l'activation de cette option, le système listera les appels par le dernier message reçu.",
      listarPelaUltimaMensagem: "Lors de l'activation de cette option, le système listera les appels par le dernier message reçu.",
      forceReason: "Lors de l'activation de cette option, le système demandera la définition de la demande lors de la fermeture du service.",
      syncTicketData: "En activant cette option, le système mettra à jour la date des tickets à l'heure du message le plus récent.",
      controlFeatures: "En activant cette option, le système contrôlera les fonctionnalités de visualisation et de fermeture forcée pour les utilisateurs.",
      syncMessagesUpdate: "En activant cette option, le système mettra à jour la date des messages importés à l'heure d'origine.",
      ignoreIgStories: "En activant cette option, les stories Instagram seront ignorées.",
      audioPlugin: "L'activation de cette option utilisera un nouveau plugin audio bêta.",
      audioModule: "En activant cette option, un nouveau module audio avec des ondes sonores sera utilisé.",
      showGroupsForAll: "En activant cette option, les groupes seront visibles par tous les utilisateurs.",
      persistirMedia: "En activant cette option, des tentatives séquentielles seront effectuées pour télécharger les médias reçus via l'API non officielle de Baileys.",
      showClosedForAll: "En activant cette option, Fermé sera visible par tous les utilisateurs.",
      waitProcessing: "Lorsque vous recevez plusieurs messages d'assistance, le système ne traitera les nouveaux messages qu'une fois que le premier message aura reçu une réponse. Les messages reçus entre-temps n'interagiront pas avec l'intégration externe.",
      openChat: "Permet d'envoyer des messages WABA après l'envoi de n'importe quel modèle, même si la fenêtre de conversation n'est pas ouverte. Ne garantit pas la livraison du message. Voir les politiques de Waba",
      shutdownWallet: "En activant cette option, les intégrations externes telles que ChatGPT, Typebot et autres seront désactivées lorsque la portefeuille est active et qu'un nouveau ticket est reçu.",
      notViewAssignedTickets: "Seuls le propriétaire du ticket et les administrateurs peuvent le voir.",
      notViewTicketsChatBot: "Aucun utilisateur ne peut voir les tickets traités par le ChatBot.",
      directTicketsToWallets: "Dirige le service aux propriétaires de portefeuille de clients.",
      ticketNulo: "Tous les utilisateurs verront les rendez-vous sans utilisateur ou file d'attente attribués.",
      supervisor: "Les superviseurs suivront la logique commune de l’utilisateur.",
      semRedis: "Les messages seront envoyés sans cadence.",
      chatbotLane: "Un guide exclusif pour les ChatBots sera ajouté.",
      ignoreGroupMsg: "Le système n'ouvrira pas de tickets pour les groupes.",
      rejectCalls: "Les appels audio et vidéo recevront le message ci-dessous.",
      agruparTickets: "Affiche tous les messages associés au canal et au contact.",
      transbordo: "Déborde les services basés sur des cartes si l'utilisateur est hors ligne.",
      atualizarNomes: "Ne met pas à jour le nom du contact dans les messages reçus.",
      forcarAdmin: "Les tickets en attente seront attribués à l'administrateur.",
      signed: "Les utilisateurs ne peuvent pas désactiver l’abonnement.",
      universalCounter: "Affiche le compteur de tickets ouverts dans les onglets supérieurs.",
      autoClose: "Les appels inactifs seront résolus automatiquement.",
      ticketLimit: "Filtre les anciens appels.",
      notificationSilenced: "Recevez des notifications audio.",
      forbiddenNumbers: "Liste des numéros bloqués sur la plateforme.",
      validateAllContacts: "Valide le nombre de tous les contacts dans le système.",
      resetFlow: "Réinitialise le flux actif pour les nouveaux services.",
      maxRetries: "Nombre maximal d'envois de messages d'absence.",
      privateMessageLimit: "Nombre de messages dans le chat interne par service.",
      ticketLimitNumber: "Nombre de tickets consultés à la fois.",
      chatbotFlow: "Flux à utiliser par le Bot pour de nouveaux services",
      chatbotFlowReset: "Réinitialiser le flux du chatbot",
      chatbotFix: "En activant cette option, les connexions ne flotteront plus dans le pied de page et seront fixées en haut de la liste des services.",
      forcePending: "En activant cette option, le ticket gardera l'utilisateur associé au service lorsque le statut passe d'ouvert à en attente.",
      maxAttemps: "Entrez ici le nombre de fois que le message d'absence peut être envoyé pour chaque service...",
      limitTickets: "Entrez ici le nombre de tickets qui doivent être recherchés sur l'écran de service...",
      limitePrivate: "Entrez ici le nombre de messages à rechercher dans le chat interne...",
      erroMessage: "Cette commande enverra les messages bloqués au système.",
      solveMessage: "Cette commande supprimera les messages d’erreur du système.",
      validate: "Cette commande validera le nombre de tous les contacts du système.",
      validating: "Veuillez patienter, validation de tous les contacts système...",
      validateContact: "Lorsque activé, le système validera le numéro du contact lors de l'enregistrement (WABA).",
      hearHubApi: "Lors de l'activation de cette option, les messages seront créés tous par l'API HUB, recevant l'utilisateur système. Il sera créé dès que l'événement sera renvoyé par le Hub après l'envoi de APP",
      ticketsRain: "Filtrer avant le traitement, en ignorant les tickets qui n'appartiennent pas à l'utilisateur (sauf admin). Réduit considérablement les requêtes HTTP inutiles et améliore les performances du système.",
      messageListingType: "Définit comment les messages sont listés dans l'historique. Par défaut: respecte la configuration de regroupement (avec groupTickets: historique complet du contact/canal; sans groupTickets: uniquement même file). Par File: historique segmenté par file avec confidentialité (admin: historique complet; utilisateur: uniquement files autorisées utilisant queueId historique). Complet: historique complet du contact/canal pour tous. Par Ticket: uniquement messages du ticket actuel."
    },
    notifications: {
      scanContactsSuccess: "Contacts mis à jour avec succès !",
      scanContactsError: "Erreur lors de la mise à jour des contacts",
      updatingMessagesDate: "Mise à jour de la date des messages importés...",
      success: "La configuration a été modifiée avec succès.",
      error: "Erreur lors du changement de configuration.",
      warningTicketSettings: "Vous ne pouvez pas utiliser les paramètres suivants ensemble : Tickets attribués à d'autres utilisateurs, Tickets dans ChatBot et Tickets sans file d'attente ni utilisateur attribué.",
      processStarted: "Processus démarré.",
      contactsValidated: "Contacts validés.",
      errorValidatingContacts: "Erreur lors de la validation des contacts",
      sendingMessages: "Tentative d'envoi des messages en attente.",
      errorSendingMessages: "Erreur lors de l'envoi des messages",
      configChanged: "Configuration modifiée",
      baileysGroupWarning: "Attention : l'API non officielle de Baileys peut présenter des instabilités lors de l'utilisation de groupes."
    },
    dialogs: {
      confirmationTitleScanContacts: "Voulez-vous scanner tous les contacts sans LID ?",
      scanContacts: "Scanner les contacts sans LID",
      confirmationTitle4: "Voulez-vous mettre à jour la date des billets à l'heure du message le plus récent ?",
      syncTicketData: "En activant cette option, le système mettra à jour la date des tickets à l'heure du message le plus récent.",
      confirmationTitle: "Voulez-vous envoyer/résoudre tous les messages bloqués dans le système ?",
      resolvePendingMessages: "Résoudre les messages bloqués dans le système",
      sendPendingMessages: "Envoyer des messages bloqués dans le système",
      confirmationTitle2: "Voulez-vous mettre à jour les dates des messages synchronisés ?",
      updateMessagesDate: "Date de mise à jour des messages importés",
      confirmationTitle3: "Attention, trop de numéros de contact dans le système peuvent entraîner le blocage de WhatsApp. Voulez-vous valider tous les contacts en masse ?",
      validateAllContacts: "Valider tous les contacts du système en masse."
    }
  },
  configuracaoPagamentoAtraso: {
    title: "Informations de paiement",
    status: {
      pending: "En attente",
      overdue: "En retard",
      paid: "Payé"
    },
    dueDate: "Maturité",
    paymentLink: "Lien de paiement",
    checkPaymentStatus: "Vérifier le statut de la facture",
    invalidUrlMessage: "Veuillez entrer une URL valide avant de continuer !"
  },
  configuracaoTenantSmtp: {
    title: "Paramètres SMTP",
    enableSmtp: "Activer SMTP",
    enableSmtpCaption: "Lorsqu'il est actif, le système enverra des informations à l'adresse e-mail de l'utilisateur.",
    emailHost: "Serveur de messagerie (hôte) :",
    emailPort: "Port SMTP",
    emailUser: "Utilisateur de messagerie électronique :",
    emailPass: "E-mail Mot de passe:",
    secureProtocol: "Protocole de sécurité",
    secureProtocolCaption: "Activer le protocole sécurisé.",
    successMessage: "La configuration a été modifiée avec succès.",
    errorMessage: "Erreur lors du changement de configuration.",
    toggleOn: "Activé",
    toggleOff: "Désactivé",
    label: "Configuration SMTP"
  },
  contactsModal: {
    updateLidButton: 'Mettre à jour le LID',
    updateLidSuccessMessage: 'LID mis à jour avec succès !',
    updateNameSuccessMessage: 'Nom mis à jour avec succès !',
    updateNameButton: 'Mettre à jour le nom',
    placeholderLid: 'Identifiant WhatsApp',
    hintLid: 'Identifiant WhatsApp',
    labelLid: 'Identifiant WhatsApp',
    titleAdd: "Ajouter un contact",
    titleEdit: "Modifier le contact",
    labelName: "Nom",
    labelNumber: "Nombre",
    labelEmail: "E-mail",
    labelCpf: "CPF/CNPJ",
    labelBirthday: "Date d'anniversaire",
    labelFirstName: "Prénom",
    labelLastName: "Nom de famille",
    labelBusinessName: "Entreprise",
    labelMessengerId: "Identifiant Messenger",
    labelInstagramPK: "identifiant Instagram",
    labelhubWhatsapp: "Identifiant du hub Whatsapp",
    placeholderhubWhatsapp: "Identifiant du hub Whatsapp",
    hinthubWhatsapp: "Identifiant du hub Whatsapp",
    walletSectionTitle: "Portefeuille",
    walletNoAvailable: "Oups... Aucun portefeuille disponible !!",
    tagSectionTitle: "Étiquette",
    tagNoAvailable: "Oups... Aucune balise disponible !!",
    additionalInfoSectionTitle: "Informations Complémentaires",
    saveButtonLabel: "Sauvegarder",
    exitButtonLabel: "Sortir",
    createSuccessMessage: "Contact créé !",
    editSuccessMessage: "Contact édité !",
    removeInfoErrorMessage: "Erreur lors de la suppression des informations supplémentaires.",
    validationErrorMessage: "Oups ! Vérifier les erreurs...",
    errorContact: "Une erreur s'est produite lors de la création du contact",
    invalidContact: "Contact invalide",
    duplicatedContact: "Ce contact existe déjà dans la base de données, il n'est pas possible de l'ajouter à nouveau.",
    errorUsers: "Problème de chargement des utilisateurs",
    errorTags: "Problème de chargement des étiquettes",
    placeholderNumber: "+DDI (DDD) 99999 9999",
    hintNumber: "S'il existe une connexion WABA active dans le système, vous devez saisir le numéro de compte WhatsApp exact.",
    placeholderCpf: "CPF/CNPJ",
    hintCpf: "Le numéro CPF/CNPJ doit contenir des caractères spéciaux tels que des tirets et des barres obliques.",
    placeholderBirthday: "01/01/1990",
    hintBirthday: "La date de naissance doit être saisie au format 01/01/1990.",
    placeholderFirstName: "Prénom",
    hintFirstName: "Prénom",
    placeholderLastName: "Nom de famille",
    hintLastName: "Nom de famille",
    placeholderBusinessName: "Entreprise",
    hintBusinessName: "Entreprise",
    placeholderMessengerId: "Identifiant Messenger",
    hintMessengerId: "Identifiant Messenger",
    placeholderInstagramPK: "identifiant Instagram",
    hintInstagramPK: "identifiant Instagram"
  },
  contacts: {
    forbidden: "La suppression de contacts avec des tickets ou des opportunités enregistrés est réservée aux administrateurs.",
    deleteSelectedContacts: "Souhaitez-vous supprimer {count} contact(s) sélectionné(s) ?",
    warning1DeleteSelect: "Le contact avec l’ID {contactId} a des tickets enregistrés. Voulez-vous forcer la suppression ?",
    warning2DeleteSelect: "Le contact avec l’ID {contactId} a des opportunités enregistrées. Voulez-vous forcer la suppression ?",
    deleteCanceled: "L'utilisateur a annulé la suppression forcée",
    deleteError: 'Erreur lors de la suppression forcée du contact',
    deleteMessage: 'Contact supprimé de force avec succès',
    deleteTitle: 'Suppression forcée',
    warning1: 'Ce contact a des tickets enregistrés. Voulez-vous le supprimer de force ? (Cela supprimera tous les tickets et messages associés)',
    warning2: 'Ce contact a des opportunités enregistrées. Voulez-vous le supprimer de force ? (Cela supprimera toutes les opportunités associées)',
    agruparLid: "Regrouper les contacts par LID",
    agruparLidTitle: "Regrouper les contacts par LID",
    agruparLidMessage: "En activant cette option, les contacts ayant le même LID WhatsApp seront regroupés en un seul contact.",
    lid: "Identifiant WhatsApp",
    tableTitle: "Contacts",
    searchPlaceholder: "Situer",
    walletFilterLabel: "Filtrer par portefeuille",
    tagFilterLabel: "Filtrer par tag",
    syncContactsLabel: "Synchroniser les contacts",
    syncGroupsLabel: "Groupes de synchronisation",
    removeDuplicatesLabel: "Supprimer les doublons",
    checkDigit: "Vérifiez le neuvième chiffre (BR)",
    addContactLabel: "Ajouter un contact",
    importContactsLabel: "Importer des contacts",
    importWarning: "Le fichier doit contenir les colonnes Nom et Numéro",
    exportContactsLabel: "Contacts d'exportation",
    photoColumn: "Photo",
    nameColumn: "Nom",
    whatsappColumn: "WhatsApp",
    businessColumn: "Entreprise",
    telegramColumn: "Télégramme",
    messengerColumn: "Messager",
    instagramColumn: "Instagram",
    hubWaba: "Waba (centre)",
    emailColumn: "E-mail",
    cpfColumn: "CPF",
    birthdayColumn: "Anniversaire",
    firstNameColumn: "Prénom",
    lastNameColumn: "Nom de famille",
    businessNameColumn: "Entreprise",
    walletColumn: "Portefeuille",
    validateContact: "Valider les contacts",
    validateContactWarning: "Lorsque vous sélectionnez l'option Valider les contacts, vous devez disposer d'une connexion active pour valider les contacts. Lorsqu'il est utilisé avec des API non officielles, la validation d'un trop grand nombre de numéros peut entraîner un blocage.",
    addTagsInsteadOfReplace: "Ajouter des tags au lieu de remplacer",
    addTagsTooltip: "Lorsqu'il est coché, les tags sélectionnés seront ajoutés aux tags existants du contact. Lorsqu'il n'est pas coché, tous les tags du contact seront remplacés par les tags sélectionnés.",
    addTagsWarning: "En cochant cette option, les tags sélectionnés seront ajoutés aux tags déjà existants dans les contacts, sans supprimer les tags précédents.",
    tagsColumn: "Mots clés",
    kanbanColumn: "Kanban",
    actionsColumn: "Actes",
    blockContactColumn: "Bloquer le contact",
    blockChatbotColumn: "Bloquer Chatbot",
    confirmSyncContactsTitle: "Attention!! Voulez-vous vraiment synchroniser les contacts ?",
    confirmSyncContactsMessage: "Tous les contacts avec lesquels vous avez discuté sur WhatsApp seront créés. Cela peut prendre un certain temps...",
    confirmRemoveDuplicatesTitle: "Attention!! Voulez-vous supprimer les contacts en double ?",
    confirmRemoveDuplicatesMessage: "Tous les tickets et messages seront attribués au contact en double le plus ancien...",
    confirmSyncGroupsTitle: "Attention!! Voulez-vous vraiment synchroniser les groupes ?",
    confirmSyncGroupsMessage: "Tous les groupes avec lesquels vous avez discuté sur WhatsApp seront créés. Cela peut prendre un certain temps...",
    deleteContactTitle: "Attention!! Voulez-vous vraiment supprimer le contact ?",
    deleteContactSuccess: "Contact supprimé !",
    syncInProgressMessage: "Cela peut prendre un certain temps...",
    blockContactSuccess: "Le statut du verrou a été mis à jour avec succès !",
    blockContactError: "Erreur lors de la mise à jour de l'état du verrouillage.",
    blockChatbotSuccess: "Le statut de blocage du chatbot a été mis à jour avec succès !",
    blockChatbotError: "Erreur lors de la mise à jour du statut de blocage du chatbot.",
    downloadModelLabel: "Télécharger le modèle",
    selectDestiny: "Sélectionnez la destination",
    modelDownloadHint: "Nom; Numéro; E-mail; CPF; Date de naissance; Prénom; Nom de famille; Société",
    uploadFileLabel: "Importer des contacts",
    fileUploadHint: "Le fichier doit contenir les colonnes Nom et Numéro",
    noTagsAvailable: "Oups... Aucune balise créée !",
    noTagsAvailableWarning: "Enregistrez de nouvelles étiquettes dans l'administration du système.",
    noWalletsAvailable: "Oups... Aucun portefeuille disponible !",
    downloadCsvHint: "Téléchargez le modèle au format CSV.",
    saveButton: "Sauvegarder",
    cancelButton: "Annuler",
    coluumnsButton: "Colonnes",
    block: "Bloc",
    blockBot: "Bloquer Chatbot",
    queueDestiny: "File d'attente de destination",
    userDestiny: "Utilisateur cible",
    dialog: {
      contact: "Contact",
      selectChannel: "Sélectionnez la chaîne pour démarrer le service.",
      start: "Commencer",
      cancel: "Annuler",
      confirmDelete: "Voulez-vous vraiment supprimer le contact ?",
      syncContactsTitle: "Synchroniser les contacts",
      syncContactsMessage: "Tous les contacts seront créés. Cela peut prendre un certain temps...",
      syncGroupsTitle: "Groupes de synchronisation",
      syncGroupsMessage: "Tous les groupes seront créés. Cela peut prendre un certain temps...",
      removeDuplicatesTitle: "Supprimer les contacts en double",
      checkDigitTitle: "Traiter le neuvième chiffre pour les numéros brésiliens",
      removeDuplicatesMessage: "Tous les tickets seront attribués au contact le plus ancien.",
      checkDigitMessage: "Les contacts avec un numéro incorrect seront supprimés, ainsi que les tickets et les messages. Il s'agit d'un traitement pour les numéros brésiliens basé sur la règle générale du neuvième chiffre pour WhatsApp. Les DDD supérieurs à 30 ne reçoivent généralement pas le 9."
    },
    notifications: {
      existingTicket: "Il existe déjà un service en cours pour",
      existingTicketDetails: "Il y a déjà un service en cours",
      contactDeleted: "Contact supprimé avec succès !",
      deleteError: "Erreur lors de la suppression du contact.",
      tokenUpdateError: "Erreur lors de l'actualisation du jeton.",
      started: "Service démarré",
      importInProgress: "Importation en cours.",
      importCaption: "Une fois terminé, la page sera actualisée.",
      importSuccess: "Contacts importés avec succès !",
      importError: "Erreur lors de l'importation des contacts.",
      loadQueuesError: "Erreur lors du chargement des files d'attente.",
      loadSynError: "Erreur de synchronisation.",
      loadUsersError: "Erreur lors du chargement des utilisateurs.",
      ticketTransferred: "Ticket transféré avec succès.",
      exportError: "Erreur lors de l'exportation des contacts.",
      syncContact: "Les contacts sont en cours de mise à jour. Cela peut prendre un certain temps...",
      syncGroups: "Les groupes sont en cours de mise à jour. Cela peut prendre un certain temps..."
    },
    actions: {
      blockBot: "Bloquer Chatbot",
      queueDestiny: "File d'attente de destination",
      userDestiny: "Utilisateur cible"
    }
  },
  customizar: {
    logoDark: {
      title: "Logo Sombre",
      chooseFile: "Choisir un fichier",
      upload: "Téléverser",
      current: "Logo sombre actuel"
    },    
    forceLogout: {
      title: "Configuration de déconnexion forcée par locataire",
      description: "Configurez si chaque locataire doit avoir une session unique (déconnexion forcée) activée ou désactivée.",
      selectTenant: "Sélectionner un locataire",
      forceLogout: "Déconnexion forcée",
      enabled: "Activé",
      disabled: "Désactivé",
      forceLogoutEnabled: "Déconnexion forcée activée",
      forceLogoutDisabled: "Déconnexion forcée désactivée",
      warning1: "Session unique activée - les utilisateurs seront déconnectés s'ils se connectent depuis un autre appareil",
      warning2: "Session unique désactivée - les utilisateurs peuvent se connecter sur plusieurs appareils"
    },
    masterkey: {
      generateRandom: "Générer aléatoirement",
      title: "Configuration de la MasterKey",
      description: "Configurez la MasterKey pour l'application",
      enabled: "MasterKey Activée",
      disabled: "MasterKey Désactivée",
      lastUsed: "Journal d'utilisation de la MasterKey",
      keyLabel: "MasterKey",
      warningTitle: "Attention !!",
      warningText: "La MasterKey est une clé d'accès unique à l'application. Veuillez la conserver dans un endroit sûr et ne la partagez avec personne. Cette clé ne peut être modifiée que par le superadmin du Tenant 1"
    },
    encryptionkey: {
      title: "Configuration de la clé de chiffrement",
      description: "Configurez la clé de chiffrement pour le locataire principal (ID: 1). Cette clé est utilisée pour chiffrer les mots de passe dans le frontend.",
      keyLabel: "Clé de chiffrement",
      generateRandom: "Générer une clé aléatoire",
      infoTitle: "Informations importantes",
      infoText: "Cette clé est utilisée pour chiffrer les mots de passe avant de les envoyer au serveur. Gardez-la en sécurité et ne la partagez pas.",
      warningTitle: "Avertissement: Changement de clé de chiffrement",
      warningText: "Modifier cette clé affectera l'authentification des utilisateurs. Les utilisateurs devront peut-être se reconnecter.",
      warningChangeKey: "ATTENTION: Changer la clé de chiffrement rendra incompatibles toutes les données précédemment chiffrées.\n\nCela peut causer:\n• Échec du déchiffrement des anciens mots de passe/jetons\n• Nécessité de reconfigurer les intégrations\n• Perte possible d'accès aux données chiffrées\n\nVoulez-vous continuer?",
      warningAfterUpdate: "Rappelez-vous: Les données chiffrées avec la clé précédente peuvent ne plus être accessibles.",
      errorKeyTooShort: "La clé de chiffrement doit contenir au moins 16 caractères",
      successUpdate: "Configuration de la clé de chiffrement mise à jour avec succès",
      errorUpdate: "Erreur lors de la mise à jour de la configuration de la clé de chiffrement"
    },    
    tabs: {
      masterkey: "MasterKey",
      encryptionkey: "Clé de chiffrement",
      colors: "Couleurs",
      branding: "Marque",
      tutorials: "Tutoriels",
      forceLogout: "Déconnexion forcée"
    },    
    title: "Personnaliser l'application",
    chooseColors: "Choisissez les couleurs",
    colors: {
      neutral: "Couleur neutre",
      primary: "Couleur primaire",
      secondary: "Couleur secondaire",
      accent: "Couleur de surbrillance",
      warning: "Couleur d'avertissement",
      negative: "Couleur négative",
      positive: "Couleur positive",
      light: "Couleur de la lumière"
    },
    saveColors: "Enregistrer les couleurs",
    applyColors: "Appliquer les changements de couleur",
    logo: {
      title: "Logo",
      chooseFile: "Choisir le fichier",
      upload: "Télécharger",
      current: "Logo actuel"
    },
    favicon: {
      title: "Favicon",
      chooseFile: "Choisir le fichier",
      upload: "Télécharger",
      current: "Favicon actuel"
    },
    video: {
      title: "Vidéo (Accueil)",
      chooseFile: "Choisir le fichier",
      upload: "Télécharger",
      current: "Vidéo actuelle"
    },
    appName: {
      title: "Nom de l'application",
      label: "Nom",
      update: "Mettre à jour le nom"
    },
    logoScreen: {
      title: "Modèle d'écran de connexion",
      label: "Sélectionnez le modèle",
      update: "Mettre à jour"
    },
    frontend: {
      rebuildTitle: "Appliquer les modifications de logo, de favicon et de nom",
      warning: "La modification ne fonctionnera que sur les installations qui conservent le dossier et l'utilisateur par défaut du programme d'installation automatique.",
      rebuildMessage: "Veuillez patienter, application des modifications à votre frontend... Votre frontend est en cours de reconstruction.",
      rebuildButton: "Appliquer les modifications"
    },
    notifications: {
      errorVideoSize: "La vidéo sélectionnée est trop grande. La taille maximale est de 5 Mo.",
      errorLogo: "Format de fichier non valide. Seuls les formats JPG, JPEG et PNG sont autorisés",
      errorIcon: "Format de fichier non valide. Seuls les fichiers ICO sont autorisés",
      successLoadColors: "Couleurs chargées avec succès.",
      errorLoadColors: "Erreur lors du chargement des couleurs.",
      successSaveColors: "Couleurs enregistrées avec succès.",
      errorSaveColors: "Erreur lors de l'enregistrement des couleurs.",
      successUploadLogo: "Logo envoyé avec succès.",
      errorUploadLogo: "Erreur lors de l'envoi du logo.",
      successUploadIcon: "Favicon envoyé avec succès.",
      errorUploadIcon: "Erreur lors de l'envoi du favicon.",
      successRebuildFrontend: "Frontend reconstruit avec succès.",
      errorRebuildFrontend: "Erreur lors de la reconstruction du frontend.",
      successUpdateAppName: "Le nom de l'application a été mis à jour avec succès.",
      errorUpdateAppName: "Erreur lors de la mise à jour du nom de l'application.",
      successUpdateLogoScreen: "Modèle d'écran de connexion mis à jour avec succès.",
      errorUpdateLogoScreen: "Erreur lors de la mise à jour du modèle d'écran de connexion."
    }
  },
  common: {
    continue: "Continuer",
    cancel: "Annuler"
  },
  equipes: {
    title: "Équipes",
    columns: {
      id: "#",
      group: "Équipe",
      isActive: "Actif",
      actions: "Actes"
    },
    actions: {
      addUser: "Ajouter/supprimer des utilisateurs",
      edit: "Équipe de rédaction",
      delete: "Supprimer l'équipe"
    },
    notifications: {
      deleted: "Groupe {group} supprimé !",
      errorLoading: "Erreur lors du chargement des groupes.",
      errorDelete: "Erreur lors de la suppression du groupe.",
      created: "Équipe créée avec succès !",
      updated: "L'équipe a été mise à jour avec succès !"
    },
    dialog: {
      deleteTitle: "Attention!!",
      deleteMessage: "Voulez-vous vraiment supprimer le groupe « {group} » ?"
    },
    modal: {
      titleCreate: "Créer une équipe",
      titleEdit: "Équipe de rédaction",
      nameLabel: "Nom de l'équipe",
      activeLabel: "Actif",
      cancelButton: "Annuler",
      saveButton: "Sauvegarder",
      notifications: {
        created: "Équipe créée avec succès !",
        updated: "Équipe éditée avec succès !",
        error: "Erreur lors de la sauvegarde de l'équipe."
      }
    },
    modalUser: {
      title: "Gérer les utilisateurs de l'équipe",
      placeholder: "Sélectionnez les utilisateurs à ajouter",
      tooltip: "Sélectionnez ou désélectionnez les utilisateurs de la liste.",
      saveButton: "Sauvegarder",
      closeButton: "Pour fermer",
      notifications: {
        updated: "Utilisateurs mis à jour !",
        error: "Erreur lors de la mise à jour des utilisateurs !"
      }
    }
  },
  etiquetas: {
    title: "Mots clés",
    columns: {
      id: "#",
      tag: "Étiquette",
      color: "Couleur",
      isActive: "Actif",
      actions: "Actes"
    },
    notifications: {
      created: "Étiquette créée avec succès !",
      updated: "Étiquette mise à jour avec succès !",
      deleted: "Balise {tag} supprimée !",
      errorLoading: "Erreur lors du chargement des étiquettes.",
      errorDelete: "Erreur lors de la suppression de la balise."
    },
    dialog: {
      deleteTitle: "Attention!!",
      deleteMessage: "Voulez-vous vraiment supprimer le tag « {tag} » ?"
    }
  },
  modalEtiqueta: {
    titleCreate: "Créer une étiquette",
    titleEdit: "Modifier l'étiquette",
    nameLabel: "Nom de l'étiquette",
    colorLabel: "Couleur",
    activeLabel: "Actif",
    cancelButton: "Annuler",
    saveButton: "Sauvegarder",
    notifications: {
      created: "Étiquette créée avec succès !",
      updated: "Étiquette éditée avec succès !",
      error: "Erreur lors de l'enregistrement de l'étiquette."
    }
  },
  fechamento: {
    title: "Adieux",
    nameLabel: "Nom",
    messageLabel: "Message",
    userLabel: "Utilisateur",
    dateLabel: "Date",
    actionsLabel: "Actes",
    deleteAllButton: "Supprimer tout",
    searchPlaceholder: "Situer",
    deleteConfirmation: "Voulez-vous vraiment supprimer Farewell \"{id}\" ?",
    deleteAllConfirmation: "Voulez-vous vraiment supprimer tous les enregistrements Farewell ?",
    deleteSuccess: "Adieu supprimé avec succès !",
    deleteAllSuccess: "Tous les adieux ont été supprimés avec succès !",
    notifications: {
      error: "Erreur lors du traitement de la demande."
    },
    system: "Système"
  },
  modalDespedida: {
    titleCreate: "Créer un adieu",
    titleEdit: "Modifier Adieu",
    nameLabel: "Nom de l'Adieu",
    label: "Adieu",
    notifications: {
      created: "Adieu créé avec succès !",
      updated: "Adieu édité avec succès !",
      error: "Une erreur s'est produite lors de l'enregistrement de l'adieu."
    }
  },
  filas: {
    title: "Files d'attente",
    notifications: {
      created: "File d'attente créée avec succès !",
      updated: "File d'attente modifiée avec succès !",
      deleted: "La file d'attente a été supprimée avec succès !",
      error: "Une erreur s'est produite lors du traitement de la file d'attente."
    },
    confirmDelete: "Voulez-vous vraiment supprimer la file d'attente « {name} » ?"
  },
  modalFila: {
    title: {
      create: "Créer une file d'attente",
      edit: "Modifier la file d'attente"
    },
    notifications: {
      created: "File d'attente créée avec succès !",
      updated: "File d'attente modifiée avec succès !",
      error: "Une erreur s'est produite lors du traitement de la file d'attente."
    },
    labels: {
      name: "Nom de la file d'attente",
      businessHours: "Horaires d'ouverture",
      absenceMessage: "Message d'absence"
    }
  },
  horarioAtendimento: {
    title: "Horaires d'ouverture",
    tooltips: {
      open: "Ouvert : Etablissement ouvert toute la journée. Aucun message d'absence ne sera envoyé.",
      closed: "Fermé : Établissement fermé toute la journée. Le message d'absence sera envoyé quelle que soit l'heure.",
      schedule: "Horaire : Représente les heures d'ouverture de l'établissement. Un message d'absence sera envoyé en dehors des heures établies.",
      important: "**Important : Le message d'absence sera envoyé après la fin du service automatique."
    },
    labels: {
      closed: "Fermé",
      absenceMessage: "Message d'absence",
      time: "au",
      holidays: "Vacances",
      holidayDate: "Date de vacances",
      holidayDescription: "Description des vacances",
      addHoliday: "Ajouter un jour férié",
      holidaysInfo: "Les jours fériés sont les jours où l'établissement n'est pas ouvert. Ces jours seront considérés comme des jours fermés."
    },
    notifications: {
      scheduleUpdated: "Horaires d'ouverture mis à jour.",
      absenceMessageUpdated: "Message d'absence mis à jour.",
      holidaysUpdated: "Vacances mises à jour avec succès !",
      validationError: "Erreur de validation des horaires d'ouverture. Veuillez corriger les erreurs avant d'enregistrer.",
      saveError: "Erreur lors de l'enregistrement des horaires d'ouverture."
    }
  },
  businessHours: {
    days: {
      0: "Dimanche",
      1: "Lundi",
      2: "Mardi",
      3: "Mercredi",
      4: "Jeudi",
      5: "Vendredi",
      6: "Samedi"
    },
    types: {
      O: "Ouvrir",
      C: "Fermé",
      H: "Temps",
      L: "Libéré",
      B: "Bloqué"
    },
    labels: {
      start: "Commencer",
      end: "Fin",
      to: "jusqu'à"
    },
    notifications: {
      updated: "Horaires d'ouverture mis à jour avec succès."
    },
    warnings: {
      overlap: "Les horaires ne peuvent pas se chevaucher. Ajustez les intervalles.",
      invalidTime: "Les heures doivent être comprises entre 00:01 et 23:59.",
      invalidHour: "Heure invalide",
      gap: "Les horaires doivent être consécutifs, sans intervalles entre les périodes.",
      invalidPeriod: "L'heure de début doit être inférieure à l'heure de fin dans chaque période.",
      missingTime: "Tous les horaires doivent être remplis."
    }
  },
  kanbanMenu: {
    kanban: "Kanban",
    tags: "Étiquette"
  },
  kanbans: {
    cardsLoaded: "Cartes chargées avec succès !",
    contactTitle: "Contact",
    title: "Contrôle visuel des services",
    loadingMessage: "Veuillez patienter, chargement des informations Kanban...",
    attendances: "Services",
    contacts: "Contacts",
    removeAttendanceTitle: "Supprimer le service du tableau de bord",
    removeAttendanceMessage: "Voulez-vous supprimer le service ?",
    startAttendance: "Sélectionnez la chaîne pour démarrer le service.",
    existingTicketMessage: "{title} a un service continu. Voulez-vous ouvrir le service ?",
    existingTicketAdminOnly: "{title} a un service continu. Seul un administrateur peut vous attribuer ce service.",
    loadingNewData: "Chargement de nouvelles données dans Kanban... Veuillez patienter !",
    successEdit: "Toutes les cartes ont été éditées avec succès !",
    contactEdited: "Contact édité avec succès !",
    contactEditError: "Erreur lors de l'édition des contacts",
    kanbanUpdated: "Kanban mis à jour avec succès !",
    openAttendance: "Service ouvert",
    selectChannel: "Sélectionnez la chaîne pour démarrer le service.",
    contactHasTicket: "{title} a un service continu. Voulez-vous ouvrir le service ?",
    adminOnlyTicket: "{title} a un service continu. Seul un administrateur peut vous attribuer ce service.",
    successEditCards: "Toutes les cartes ont été éditées avec succès !",
    loadingKanban: "Chargement de nouvelles données dans Kanban... Veuillez patienter !",
    tokenUpdateError: "Impossible d'actualiser le jeton.",
    fetchingContactsError: "Erreur lors de l'obtention des contacts.",
    noNameAvailable: "Nom non disponible",
    fetchingKanbansError: "Erreur lors de la liste des Kanbans."
  },
  tagsKanban: {
    contacts: "Contacts",
    title: "Affichage des balises dans Kanban",
    description: "Affichage uniquement, impossible d'enregistrer les balises lors de la manipulation des cartes.",
    loading: "Chargement de nouvelles données dans Kanban... Veuillez patienter !",
    removeTitle: "Supprimer le service du tableau de bord",
    removeMessage: "Voulez-vous supprimer le service ?",
    cardEdited: "Contact édité !",
    startService: "Sélectionnez la chaîne pour démarrer le service.",
    serviceStarted: "Service démarré",
    contactError: "Une erreur s'est produite lors de la suppression du contact.",
    kanbanError: "Erreur lors de la liste des Kanbans.",
    cardsSaved: "Toutes les cartes ont été éditées avec succès !",
    saveError: "Une erreur s'est produite lors de la modification des contacts.",
    existingServiceTitle: "Service continu",
    existingServiceMessageUser: "{title} a un service continu. Seul un administrateur peut vous attribuer ce service.",
    existingServiceMessageAdmin: "{title} a un service en cours (Service : {ticketId} - File d'attente : {queueId}). Voulez-vous ouvrir le service ?",
    tokenError: "Impossible d'actualiser le jeton.",
    buttons: {
      yes: "Oui",
      no: "Non",
      ok: "D'ACCORD"
    },
    contactTitle: "Contact",
    selectChannel: "Sélectionnez la chaîne pour démarrer le service.",
    canceledTicket: "Opération annulée",
    noChannelsAvailable: "Aucun canal disponible",
    tenantNotFound: "Locataire introuvable",
    errorStartingConversation: "Erreur lors du démarrage de la conversation",
  },
  cardsTags: {
    title: "Cartes d'étiquettes",
    description: "Afficher les informations détaillées sur les contacts.",
    tagsTooltip: "Étiquette",
    walletTooltip: "Portefeuille",
    actions: {
      uazapi: "Service Uazapi",
      zapi: "Service Zapi",
      whatsapp: "Prise en charge de WWebJs",
      baileys: "Service Baileys",
      meow: "Service Meow",
      evo: "Service Evo",
      waba: "Service Waba"
    },
    phoneTooltip: "Téléphone",
    removeTooltip: "Retirer"
  },
  cardsKanbans: {
    title: "Cartes Kanban",
    description: "Afficher les informations détaillées sur les contacts.",
    tagsTooltip: "Étiquette",
    walletTooltip: "Portefeuille",
    actions: {
      uazapi: "Service Uazapi",
      zapi: "Service Zapi",
      whatsapp: "Prise en charge de WWebJs",
      baileys: "Service Baileys",
      meow: "Service Meow",
      evo: "Service Evo",
      waba: "Service Waba",
      remove: "Retirer"
    },
    phoneTooltip: "Téléphone"
  },
  lanes: {
    title: "Voies Kanban",
    actions: "Actes",
    add: "Ajouter une nouvelle voie",
    edit: "Modifier la voie",
    deleteConfirm: "Voulez-vous vraiment supprimer le Kanban « {name} » ?",
    deleteSuccess: "Kanban {name} supprimé avec succès !",
    columns: {
      id: "IDENTIFIANT",
      name: "voie",
      actions: "Actes"
    },
    notifications: {
      loadError: "Erreur lors du chargement des voies.",
      deleteError: "Erreur lors de la suppression de la voie."
    }
  },
  modalLanesKanban: {
    createTitle: "Créer Kanban",
    editTitle: "Modifier Kanban",
    nameLabel: "Nom Kanban",
    createSuccess: "Kanban créé avec succès !",
    updateSuccess: "Kanban mis à jour avec succès !",
    notifications: {
      error: "Erreur lors du traitement de Kanban."
    }
  },
  modalMensagemRapida: {
    createTitle: "Créer un message rapide",
    editTitle: "Modifier le message rapide",
    idLabel: "IDENTIFIANT",
    keyLabel: "Clé",
    keyHint: "La clé est le raccourci permettant aux utilisateurs de rechercher le message.",
    messageLabel: "Message",
    placeholder: "Entrez le message",
    sendAsAudio: "Envoyer en tant qu'audio enregistré",
    fileLabel: "Choisir le fichier",
    publicLabel: "Partager avec tous les utilisateurs",
    publicHint: "Une fois activé, ce message rapide sera disponible pour tous les utilisateurs.",
    removeFile: "Supprimer le fichier",
    saveSuccess: {
      create: "Message rapide créé avec succès !",
      update: "Message rapide mis à jour avec succès !"
    },
    saveError: "Une erreur s'est produite lors de l'enregistrement du message rapide.",
    variablesLabel: "Variables",
    emojiLabel: "Émoji",
    variablesList: {
      0: {
        label: "Nom",
        value: "{{nom}}"
      },
      1: {
        label: "Salutation",
        value: "{{salutation}}"
      },
      2: {
        label: "Protocole",
        value: "{{protocole}}"
      },
      3: {
        label: "Courriel (si disponible)",
        value: "{{e-mail}}"
      },
      4: {
        label: "Téléphone",
        value: "{{phoneNumber}}"
      },
      5: {
        label: "Kanban (le cas échéant)",
        value: "{{kanban}}"
      },
      6: {
        label: "Accompagnateur (si présent)",
        value: "{{utilisateur}}"
      },
      7: {
        label: "Courriel du préposé (si en service)",
        value: "{{userEmail}}"
      },
      8: {
        label: "Prénom (le cas échéant)",
        value: "{{prénom}}"
      },
      9: {
        label: "Nom de famille (le cas échéant)",
        value: "{{nom de famille}}"
      },
      10: {
        label: "Société (le cas échéant)",
        value: "{{businessName}}"
      }
    }
  },
  mensagemRapida: {
    title: "Messages rapides",
    add: "Ajouter un message rapide",
    edit: "Modifier le message rapide",
    create: "Créer un message rapide",
    key: "Clé",
    message: "Message",
    file: "Déposer",
    recordedAudio: "Audio enregistré",
    visibility: "Visibilité",
    visibilityPublic: "Publique",
    visibilityPrivate: "Privée",
    noFile: "Aucun fichier",
    fileOpen: "Ouvrir le fichier",
    noPreview: "Aucun contenu disponible",
    active: "Actif",
    inactive: "Inactif",
    actions: "Actes",
    deleteConfirmation: "Voulez-vous vraiment supprimer le message clé « {key} » ?",
    deleteSuccess: "Message supprimé avec succès !",
    saveSuccess: {
      create: "Message rapide créé avec succès !",
      update: "Message rapide mis à jour avec succès !"
    },
    saveError: "Une erreur s'est produite lors de l'enregistrement du message rapide."
  },
  galeria: {
    title: "Galerie",
    search: "Rechercher...",
    filterByType: "Filtrer par type",
    upload: "Télécharger des fichiers",
    uploadFiles: "Télécharger des fichiers",
    selectFiles: "Sélectionnez les fichiers",
    selectFilesFirst: "Sélectionnez au moins un fichier",
    description: "Description",
    fileName: "Nom du fichier",
    type: "Type",
    size: "Taille",
    actions: "Actions",
    preview: "Aperçu",
    download: "Télécharger",
    viewFile: "Voir le fichier",
    delete: "Supprimer",
    deleteConfirm: "Voulez-vous vraiment supprimer le fichier \"{fileName}\"?",
    deleteSuccess: "Fichier supprimé avec succès!",
    deleteError: "Erreur lors de la suppression du fichier",
    uploadSuccess: "Fichier(s) téléchargé(s) avec succès!",
    uploadError: "Erreur lors du téléchargement du fichier(s)",
    loadError: "Erreur lors du chargement de la galerie",
    imagePreview: "Aperçu de l'image",
    noFiles: "Aucun fichier trouvé",
    loadMore: "Charger plus",
    types: {
      image: "Image",
      pdf: "PDF",
      video: "Vidéo",
      audio: "Audio",
      document: "Document",
      archive: "Archive",
      other: "Autre"
    }
  },
  instagramComentarios: {
    title: 'Commentaires Instagram',
    refresh: 'Actualiser',
    selectChannel: 'Sélectionner le Canal',
    mediaList: 'Liste des Médias',
    noMedia: 'Aucun média trouvé',
    mediaId: 'ID Média',
    loadMore: 'Charger Plus',
    comments: 'Commentaires',
    noComments: 'Aucun commentaire trouvé',
    anonymous: 'Anonyme',
    likes: 'j\'aime',
    reply: 'Répondre',
    replyToComment: 'Répondre au Commentaire',
    commentFrom: 'Commentaire de',
    replyMessage: 'Message de Réponse',
    messageRequired: 'Le message est obligatoire',
    cancel: 'Annuler',
    send: 'Envoyer',
    errorLoadingChannels: 'Erreur lors du chargement des canaux',
    errorLoadingMedia: 'Erreur lors du chargement des médias',
    errorLoadingMoreMedia: 'Erreur lors du chargement de plus de médias',
    errorLoadingComments: 'Erreur lors du chargement des commentaires',
    errorLoadingMoreComments: 'Erreur lors du chargement de plus de commentaires',
    errorSendingReply: 'Erreur lors de l\'envoi de la réponse',
    replySent: 'Réponse envoyée avec succès!',
    delete: 'Supprimer',
    deleteComment: 'Supprimer le Commentaire',
    deleteConfirmation: 'Voulez-vous vraiment supprimer ce commentaire?',
    commentDeleted: 'Commentaire supprimé avec succès!',
    errorDeletingComment: 'Erreur lors de la suppression du commentaire'
  },
  notas: {
    title: "Remarques",
    searchPlaceholder: "Situer",
    dateFilterPlaceholder: "Filtrer par date",
    note: "Avis",
    user: "Utilisateur",
    ticket: "Service",
    date: "Date",
    actions: "Actes",
    noResults: "Aucune note trouvée.",
    deleteConfirmation: "Voulez-vous vraiment supprimer la note « {note} » ?",
    deleteSuccess: "Note supprimée avec succès !",
    saveSuccess: {
      create: "Note créée avec succès !",
      update: "Note mise à jour avec succès !"
    },
    saveError: "Une erreur s'est produite lors de l'enregistrement de la note.",
    system: "Système"
  },
  modalNotas: {
    titleCreate: "Créer une note",
    titleEdit: "Modifier la note",
    noteLabel: "Numéro de note",
    ticketLabel: "Service",
    saveSuccess: "Note enregistrée avec succès !",
    saveError: "Une erreur s'est produite lors de l'enregistrement de la note."
  },
  modalNotaAtendimento: {
    titleCreate: "Créer une note",
    titleEdit: "Modifier la note",
    labelNote: "Note de service",
    saveSuccess: "Note enregistrée avec succès !",
    saveError: "Une erreur s'est produite lors de l'enregistrement de la note."
  },
  notificacao: {
    title: "Notifications",
    add: "Ajouter une notification",
    deleteAll: "Supprimer tout",
    deleteOne: "Voulez-vous vraiment supprimer la notification « {id} » ?",
    deleteAllConfirm: "Voulez-vous vraiment supprimer toutes les notifications ?",
    created: "Notification créée avec succès !",
    updated: "Notification mise à jour avec succès !",
    deleted: "Notification supprimée avec succès !",
    allDeleted: "Toutes les notifications ont été supprimées !",
    columns: {
      id: "#",
      message: "Message",
      userId: "ID de l'utilisateur",
      userName: "Utilisateur",
      isRead: "En lisant",
      createdAt: "Date",
      actions: "Actes"
    },
    isRead: {
      read: "Lire",
      unread: "Non lu"
    }
  },
  modalNotificacao: {
    title: {
      create: "Créer une notification",
      edit: "Modifier la notification"
    },
    fields: {
      message: "Notification"
    },
    notifications: {
      created: "Notification créée avec succès !",
      updated: "Notification éditée avec succès !",
      error: "Une erreur s'est produite lors de la création ou de la modification de la notification."
    }
  },
  pagamentoTenants: {
    title: "Paiements des locataires",
    loading: "Veuillez patienter, chargement des informations de paiement des locataires...",
    tenantId: "ID du locataire",
    paymentInfo: "Informations de paiement",
    columns: {
      id: "ID de paiement",
      status: "Statut",
      dueDate: "Maturité",
      bankSlipUrl: "Lien de paiement"
    },
    status: {
      pending: "En attente",
      overdue: "En retard"
    },
    actions: {
      toggleTable: "Afficher les données"
    }
  },
  planos: {
    title: "Plans",
    columns: {
      id: "IDENTIFIANT",
      name: "Nom",
      value: "Valeur",
      connections: "Relations",
      users: "Utilisateurs",
      trial: "Procès",
      trialPeriod: "Période",
      actions: "Actes"
    },
    buttons: {
      add: "Ajouter un plan",
      tokenAsaas: "Jeton Ailes",
      viewToken: "Afficher le jeton"
    },
    tooltips: {
      showToken: "Jeton d'affichage"
    },
    status: {
      enabled: "Actif",
      disabled: "Inactif"
    },
    messages: {
      deleteConfirmation: "Voulez-vous vraiment supprimer le plan « {id} » ?",
      tokenUpdated: "Jeton mis à jour avec succès !",
      tokenUpdateError: "Erreur lors de l'actualisation du jeton."
    }
  },
  modalPlanos: {
    title: {
      edit: "Modifier le plan",
      create: "Créer un plan"
    },
    labels: {
      name: "Nom du plan",
      value: "Valeur du plan",
      connections: "Relations",
      users: "Utilisateurs",
      trial: "Procès",
      trialPeriod: "Période d'essai (jours)"
    },
    warnings: {
      trial: "Attention : lors de l'activation de la période d'essai, les données de la Société seront supprimées du système après l'expiration de la période d'essai."
    },
    buttons: {
      cancel: "Annuler",
      save: "Sauvegarder"
    },
    notifications: {
      created: "Plan créé avec succès !",
      updated: "Plan mis à jour avec succès !"
    }
  },
  protocolos: {
    ticketNotFound: "Service non trouvé",
    title: "Protocoles",
    columns: {
      id: "#",
      protocol: "Protocole",
      userId: "Utilisateur",
      ticketId: "Service",
      createdAt: "Date",
      actions: "Actes"
    },
    filter: {
      search: "Situer",
      date: "Filtrer par date"
    },
    notifications: {
      deleted: "Protocole supprimé !",
      error: "Erreur lors du chargement de plus de protocoles."
    },
    confirm: {
      delete: "Voulez-vous vraiment supprimer le protocole « {protocol} » ?"
    },
    buttons: {
      edit: "Modifier",
      delete: "Supprimer"
    }
  },
  modalProtocolo: {
    title: {
      create: "Créer un protocole",
      edit: "Modifier le protocole"
    },
    fields: {
      protocol: "Numéro de protocole",
      ticketId: "Service"
    },
    notifications: {
      created: "Protocole créé avec succès !",
      updated: "Protocole édité avec succès !",
      error: "Une erreur s'est produite lors de l'enregistrement du protocole."
    }
  },
  tasks: {
    title: "Tâches",
    table: {
      headers: {
        id: "IDENTIFIANT",
        status: "Statut",
        name: "Tâche",
        description: "Description",
        limitDate: "Date limite",
        owner: "Responsable",
        priority: "Priorité",
        comments: "Commentaires",
        actions: "Actes"
      },
      status: {
        delayed: "🚩 En retard",
        pending: "🔄 En attente",
        finished: "✅ Terminé"
      },
      priority: {
        high: "⚡⚡⚡ Élevé",
        medium: "⚡⚡ Moyenne",
        low: "⚡ Télécharger",
        none: "😉 Aucun"
      }
    },
    labels: {
      dateFormat: "{jour}-{mois}-{année}"
    },
    filters: {
      search: "Rechercher une tâche",
      status: "Statut",
      owner: "Responsable",
      limitDate: "Date limite",
      noResults: "Aucune tâche trouvée."
    },
    modal: {
      createTask: "Créer une tâche",
      editTask: "Modifier la tâche",
      name: "Nom",
      description: "Description",
      limitDate: "Date limite",
      responsible: "Responsable",
      recurrence: "Récurrence",
      recurrenceTimes: "Nombre de répétitions",
      status: "Statut",
      priority: "Priorité",
      comments: "Commentaires",
      recurrenceOptions: {
        none: "Aucune récidive",
        sevenDays: "7 jours",
        thirtyDays: "30 jours",
        fortyFiveDays: "45 jours",
        sixtyDays: "60 jours",
        seventyFiveDays: "75 jours",
        ninetyDays: "90 jours"
      },
      statusOptions: {
        delayed: "🚩 En retard",
        pending: "🔄 En attente",
        finished: "✅ Terminé"
      },
      priorityOptions: {
        high: "⚡⚡⚡ Élevé",
        medium: "⚡⚡ Moyenne",
        low: "⚡ Télécharger",
        none: "😉 Aucun"
      },
      validation: {
        required: "Le champ {field} est obligatoire"
      },
      notifications: {
        userLoadError: "Problème de chargement des utilisateurs.",
        created: "Tâche créée avec succès !",
        edited: "Tâche éditée avec succès !",
        error: "Une erreur s'est produite lors du traitement de la tâche."
      }
    },
    notifications: {
      finishSuccess: "Tâche accomplie avec succès !",
      duplicateSuccess: "Tâche dupliquée avec succès !",
      checkDelayedError: "Erreur lors de la vérification des tâches en retard.",
      deleteConfirm: "Voulez-vous vraiment supprimer la tâche « {name} » ?",
      deleteSuccess: "La tâche « {name} » a été supprimée avec succès !",
      taskCreated: "Tâche créée avec succès !",
      taskUpdated: "Tâche éditée avec succès !",
      taskDuplicated: "Tâche dupliquée avec succès !",
      taskCompleted: "Tâche accomplie avec succès !",
      taskDeleted: "Tâche supprimée avec succès !",
      error: "Erreur lors de l'exécution de l'action",
      loadUsersError: "Problème de chargement des utilisateurs.",
      loadTasksError: "Erreur lors de la liste des tâches.",
      createSuccess: "Tâche créée avec succès !",
      updateSuccess: "Tâche mise à jour avec succès !"
    },
    tooltip: {
      conclued: "Conclure",
      duplicate: "Double",
      edit: "Modifier",
      delete: "Supprimer"
    }
  },
  tenantApi: {
    table: {
      title: "API locataires",
      columns: {
        id: "IDENTIFIANT",
        apiToken: "Jeton API",
        actions: "Actes"
      },
      noData: "Aucune API de locataire trouvée."
    },
    form: {
      create: "Créer une API de locataire",
      edit: "Modifier l'API du locataire"
    },
    modal: {
      confirmDelete: "Êtes-vous sûr de vouloir supprimer l'API Tenant « {id} » ?",
      notifications: {
        created: "L'API du locataire a été créée avec succès !",
        updated: "L'API du locataire a été mise à jour avec succès !",
        deleted: "L'API du locataire a été supprimée avec succès !"
      }
    },
    routes: {
      createTitle: "Itinéraires pour créer/modifier un nouveau locataire via l'API :",
      activateTitle: "Route pour activer/désactiver un locataire via l'API :",
      showTitle: "Itinéraire pour afficher les informations du locataire via l'API :",
      endpoint: "Point final",
      bearerToken: "Porteur de jeton",
      body: "Corps"
    }
  },
  modalTenantApi: {
    title: {
      create: "Créer un locataire API",
      edit: "Modifier l'API du locataire"
    },
    form: {
      apiToken: "Jeton API",
      generateToken: "Générer un jeton"
    },
    notifications: {
      created: "L'API du locataire a été créée avec succès !",
      updated: "L'API du locataire a été mise à jour avec succès !",
      error: "Erreur lors de l'enregistrement de l'API du locataire."
    }
  },
  tenant: {
    metrics: {
      actions: "Métrique",
      title: "Métrique",
      total: "Nombre total de participants",
      pending: "Services en attente",
      scheduled: "Rendez-vous programmés",
      open: "Rendez-vous ouverts",
      closed: "Rendez-vous fermés",
      contacts: "Contacts",
      tickets: "Services",
      messages: "Messages",
      sent: "Messages envoyés",
      received: "Messages reçus",
      averageRating: "Note moyenne",
      totalTickets: "Nombre total de participants",
      totalContacts: "Nombre total de contacts",
      totalMessages: "Nombre total de messages"
    },
    title: "Entreprises",
    actions: {
      edit: "Modifier l'entreprise",
      delete: "Supprimer l'entreprise",
      calculateFiles: "Calculer la taille des fichiers de l'entreprise",
      deleteFiles: "Supprimer les fichiers de l'entreprise",
      toggleHideUnoficial: "Désactiver les non officiels"
    },
    columns: {
      id: "#",
      status: "Statut",
      name: "Nom",
      maxUsers: "Limite d'utilisateurs",
      maxConnections: "Limite de connexion",
      hideUnoficial: "Désactiver les non officiels",
      asaas: "Ailes actives",
      asaasToken: "Jeton Ailes",
      asaasCustomerId: "ID client Asaas",
      identity: "Identité",
      trial: "Test",
      trialPeriod: "Heure du test",
      allowedChannels: "Canaux autorisés",
      createdAt: "Date",
      actions: "Actes"
    },
    modals: {
      asaasToken: {
        title: "Changer le jeton Asaas",
        tokenLabel: "Jeton Ailes",
        save: "Enregistrer le jeton",
        cancel: "Annuler"
      }
    },
    notifications: {
      tenantDeleted: "Le locataire {id} a été supprimé avec succès !",
      tenantUpdated: "Le locataire {id} a été mis à jour avec succès !",
      filesSize: "Taille du fichier : {size} Mo",
      deleteFiles: "Fichiers supprimés avec succès !",
      deleteError: "Erreur lors de la suppression des fichiers."
    },
    confirmation: {
      irreversibleAction: "Attention : Ceci est une action irréversible !",
      deleteTenant: "Voulez-vous vraiment supprimer la société {id} ?",
      deleteFiles: "Voulez-vous vraiment supprimer tous les fichiers de la société {id} ?"
    },
    hideUnoficial: {
      updated: "Le locataire {id} a été mis à jour avec succès !",
      updateError: "Erreur lors de la mise à jour du locataire {id} !"
    },
    asaasToken: {
      updated: "Le jeton Asaas a été mis à jour avec succès !",
      updateError: "Erreur lors de la mise à jour du jeton Asaas !"
    },
    calcular: {
      size: "Taille du fichier : {size} Mo",
      error: "Erreur lors du calcul de la taille du fichier"
    },
    limpar: {
      title: "Attention : Ceci est une action irréversible !",
      confirmMessage: "Voulez-vous vraiment supprimer tous les fichiers de la société {id} ?",
      success: "Les fichiers du locataire {id} ont été supprimés avec succès !",
      error: "Erreur lors du nettoyage des fichiers du locataire !"
    },
    status: {
      active: "Actif",
      inactive: "Inactif"
    },
    asaas: {
      enabled: "Actif",
      disabled: "Inactif"
    },
    trial: {
      enabled: "Actif",
      disabled: "Inactif"
    },
    channels: {
      none: "Aucun"
    },
    allowedChannels: {
      title: "Canaux autorisés"
    },
    list: {
      error: "Erreur lors de la liste des locataires"
    },
    create: {
      success: "Le locataire {name} a été créé avec succès !"
    },
    delete: {
      protected: "Impossible de supprimer le locataire {id} !",
      success: "Le locataire {id} a été supprimé avec succès !",
      error: "Erreur lors de la suppression du locataire : {error}"
    }
  },
  provedorGlobal: {
    title: "Fournisseurs Globaux",
    allTenants: "Tous les Locataires",
    noTenants: "Aucun Locataire",
    filters: {
      providerType: "Type de Fournisseur",
      status: "Statut"
    },
    status: {
      active: "Actif",
      inactive: "Inactif"
    },
    columns: {
      id: "#",
      name: "Nom",
      providerType: "Type",
      host: "Hôte",
      token: "Jeton",
      status: "Statut",
      isGlobal: "Global",
      tenants: "Locataires",
      actions: "Actions"
    },
    actions: {
      edit: "Modifier",
      delete: "Supprimer",
      manageTenants: "Gérer les Locataires"
    },
    form: {
      name: "Nom",
      nameRequired: "Le nom est obligatoire",
      providerType: "Type de Fournisseur",
      providerTypeRequired: "Le type de fournisseur est obligatoire",
      host: "Hôte",
      hostRequired: "L'hôte est obligatoire",
      hostLocked: "L'hôte est défini automatiquement pour ce type de fournisseur",
      metaAlwaysGlobal: "Les types Meta (WABA, Instagram, Messenger) sont toujours globaux et ne peuvent pas avoir de locataires spécifiques",
      token: "Jeton",
      tokenRequired: "Le jeton est obligatoire",
      status: "Statut",
      isGlobal: "Disponible pour tous les locataires",
      description: "Description",
      groqCloudSection: "Configuration GroqCloud",
      groqCloudEnabled: "GroqCloud Activé",
      groqCloudDisabled: "GroqCloud Désactivé",
      groqCloudApiKey: "Clé API GroqCloud",
      groqCloudLanguage: "Langue GroqCloud",
      groqCloudModel: "Modèle GroqCloud",
      groqCloudAlwaysGlobal: "GroqCloud est toujours global et ne peut pas avoir de locataires spécifiques"
    },
    modal: {
      createTitle: "Créer un Fournisseur Global",
      editTitle: "Modifier le Fournisseur Global"
    },
    tenantsModal: {
      title: "Gérer les Locataires",
      globalInfo: "Cette configuration est disponible pour tous les locataires (Global).",
      selectTenant: "Sélectionner un Locataire",
      add: "Ajouter un Locataire",
      addSuccess: "Locataire ajouté avec succès !",
      addError: "Erreur lors de l'ajout du locataire",
      removeConfirm: "Voulez-vous vraiment supprimer ce locataire ?",
      removeSuccess: "Locataire supprimé avec succès !",
      removeError: "Erreur lors de la suppression du locataire"
    },
    success: {
      created: "Fournisseur global créé avec succès !",
      updated: "Fournisseur global mis à jour avec succès !"
    },
    errors: {
      listError: "Erreur lors de la liste des fournisseurs globaux",
      saveError: "Erreur lors de l'enregistrement du fournisseur global",
      metaTypeAlreadyExists: "Un fournisseur global de type {type} existe déjà. Un seul fournisseur de chaque type Meta est autorisé."
    },
    delete: {
      confirm: "Voulez-vous vraiment supprimer le fournisseur global {name} ?",
      success: "Fournisseur global supprimé avec succès !",
      error: "Erreur lors de la suppression du fournisseur global"
    }
  },
  modalTenant: {
    visibleMenu: {
      title: "Menus visibles",
      grupos: "Groupes",
      disparoMassa: "fusillade de masse",
      kanban: "Kanban et entonnoir",
      tarefas: "Tâches",
      api: "API",
      chatbot: "Chatbot",
      relatorios: "Rapports",
      campanhas: "Campagnes",
      chat: "Chat",
      equipes: "Équipes"
    },
    title: {
      create: "Créer un locataire",
      edit: "Modifier le locataire"
    },
    fields: {
      status: "Statut",
      name: "Nom",
      maxUsers: "Limite d'utilisateurs",
      maxConnections: "Limite de connexion",
      identity: "Identité",
      asaasToken: "Jeton Ailes",
      asaasCustomerId: "ID client Asaas",
      trialPeriod: "Période d'essai"
    },
    trial: {
      title: "Procès",
      enabled: "Essai actif",
      disabled: "Essai inactif",
      warning: "Attention : lors de l'activation de la période d'essai, les données de la Société seront supprimées du système après l'expiration de la période d'essai."
    },
    asaas: {
      title: "Ailes",
      enabled: "Ailes actives",
      disabled: "Ailes inactives"
    },
    allowedChannels: {
      title: "Canaux autorisés"
    },
    validation: {
      requiredFields: "Remplissez tous les champs obligatoires et activez l'entreprise.",
      cannotDeactivateMain: "Impossible de désactiver la société 1 !"
    },
    notifications: {
      created: "Locataire créé avec succès !",
      updated: "Locataire édité avec succès !",
      error: "Une erreur s'est produite lors de l'enregistrement du locataire."
    }
  },
  tenantsPk: {
    titles: {
      environmentVariables: "Variables d'environnement",
      packageJsonData: "Données du package JSON"
    },
    labels: {
      key: "Clé",
      value: "Valeur"
    },
    errors: {
      loadEnvData: "Erreur lors du chargement des données de la variable d'environnement",
      loadPackageData: "Erreur lors du chargement des données JSON du package"
    }
  },
  appWaba: {
    title: 'Paramètres App WABA',
    tenant: 'Tenant',
    appId: 'App ID',
    apiVersion: 'Version de l\'API',
    description: 'Description',
    token: 'Token',
    tokenHint: 'Token du Business Manager pour créer des canaux WABA',
    configId: 'Config ID (Inscription Intégrée)',
    configIdHint: 'ID de configuration de l\'Inscription Intégrée pour WhatsApp Business',
    appSecret: 'App Secret',
    appSecretHint: 'App Secret de Facebook App pour l\'échange de code OAuth',
    redirectUri: 'Redirect URI',
    redirectUriHint: 'URI de redirection OAuth (doit être exactement le même que configuré dans Facebook App Dashboard)',
    status: 'Statut',
    isActive: 'Actif',
    active: 'Actif',
    inactive: 'Inactif',
    create: 'Créer Configuration',
    edit: 'Modifier Configuration',
    created: 'Configuration créée avec succès !',
    updated: 'Configuration mise à jour avec succès !',
    deleted: 'Configuration supprimée avec succès !',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer la configuration #{id} ?',
    error: 'Erreur lors du traitement de la configuration',
    deleteError: 'Erreur lors de la suppression de la configuration',
    listError: 'Erreur lors de la liste des configurations',
    copyTooltip: 'Copier dans le presse-papiers',
    copySuccess: 'URL de redirection copiée dans le presse-papiers !',
    copyError: 'Impossible de copier dans le presse-papiers. Copiez manuellement !',
    instagramSettings: 'Paramètres Instagram',
    appInstagramId: 'Instagram App ID',
    appInstagramIdHint: 'ID de l\'application Instagram (Instagram App ID)',
    appInstagramSecret: 'Instagram App Secret',
    appInstagramSecretHint: 'App Secret Instagram pour l\'échange de code OAuth',
    redirectUriInstagram: 'Redirect URI Instagram',
    redirectUriInstagramHint: 'URI de redirection OAuth Instagram (doit être exactement le même que configuré dans Instagram App Dashboard)',
    facebookSettings: 'Paramètres Facebook',
    redirectUriFacebook: 'Redirect URI Facebook',
    redirectUriFacebookHint: 'URI de redirection OAuth Facebook (doit être exactement le même que configuré dans Facebook App Dashboard)'
  },
  tenantQueue: {
    title: "Files d'attente de tâches",
    updateQueues: "Files d'attente de mise à jour",
    openBullBoard: "Open Bull Board",
    restartBackend: "Redémarrer le backend",
    restartQueues: "Réinitialiser les files d'attente",
    queuesUpdated: "Files d'attente mises à jour toutes les 10 secondes",
    refreshQueue: "File d'attente de retraitement",
    columns: {
      queueName: "Nom de la file d'attente",
      failedCount: "Travaux échoués",
      activeCount: "Emplois actifs",
      waitingCount: "Emplois en attente",
      actions: "Actes"
    },
    dialogs: {
      restartBackendTitle: "Attention!! Voulez-vous vraiment redémarrer votre backend ?",
      restartBackendMessage: "Ce processus redémarrera tous les services et ne doit être effectué que si vous avez accès au serveur pour corriger d'éventuelles incohérences.",
      restartQueuesTitle: "Attention!! Voulez-vous vraiment réinitialiser les files d’attente ?",
      restartQueuesMessage: "Exécutez uniquement s'il existe des files d'attente avec de nombreux travaux bloqués sur BullBoard. Ce processus redémarrera toutes les files d'attente Bull et doit être exécuté au maximum 5 fois sans redémarrer le backend. Après cette limite, redémarrez le backend pour nettoyer les connexions supplémentaires établies avec Redis."
    },
    notifications: {
      bullBoardRedirect: "Utilisateur : admin<br> Mot de passe : utilisez votre mot de passe Redis<br> Vous serez redirigé dans 3 secondes"
    }
  },
  terminal: {
    title: "Terminal",
    placeholder: "Entrez votre commande ici...",
    sendButton: "Envoyer",
    noOutput: "Aucune sortie reçue",
    error: "Erreur: ",
    userNotAllowed: "Utilisateur non autorisé à accéder au terminal"
  },
  usuarios: {
    title: "Utilisateurs",
    placeholder: "Situer",
    add: "Pour ajouter",
    email: "E-mail",
    queues: "Files d'attente",
    whatsappAllowed: "Relations",
    isOnline: "Statut",
    profile: "Profil",
    actions: "Actes",
    blockWavoip: "Bloquer Wavoip",
    restrictedUser: "Utilisateur Restreint",
    modals: {
      userManagement: "Gestion des files d'attente des utilisateurs",
      whatsappManagement: "Gestion des connexions utilisateur",
      deleteConfirmation: "Attention!! Voulez-vous vraiment supprimer l'utilisateur « {name} » ?"
    },
    notifications: {
      userDeleted: "L'utilisateur {name} a été supprimé !",
      deleteError: "Impossible de supprimer l'utilisateur.",
      error: "Erreur lors du chargement de plus d'utilisateurs",
      changeStatusInToolbar: "Impossible de modifier le statut de l'utilisateur connecté. Utilisez l'option dans le profil, dans le coin supérieur droit.",
      status1: "Statut de l'utilisateur",
      statusOnline: "En ligne : Utilisateur disponible",
      statusOffline: "Hors ligne : utilisateur indisponible",
      statusReload: "Pour vérifier le changement dans le frontend, l'utilisateur doit recharger la page"
    },
    profiles: {
      user: "Utilisateur",
      super: "Superviseur",
      admin: "Administrateur",
      superadmin: "Super administrateur"
    }
  },
  modalFilaUsuario: {
    title: "Files d'attente des utilisateurs",
    name: "Nom",
    email: "E-mail",
    inactive: "(Inactif)",
    successMessage: "Les files d'attente des utilisateurs ont été modifiées avec succès !"
  },
  modalUsuario: {
    sipConfigInfo: "Configuration SIP (Asterisk, FreeSWITCH, PBX, autres.)",
    sipWebRTCInfo: "Votre extension doit prendre en charge WebRTC",
    sipWSSInfo: "Votre extension doit prendre en charge WSS (WebSocket Secure)",
    horarioAtendimento: "Horaires d'ouverture",
    configSip: "Configuration SIP",
    sipEnabled: "Activer SIP",
    sipUser: "Utilisateur SIP",
    sipPassword: "Mot de passe SIP",
    sipServer: "Serveur SIP",
    sipPort: "Port SIP",
    emailAlreadyExists: "Erreur lors de l'inscription : ",
    titleEdit: "Modifier l'utilisateur",
    name: "Nom",
    email: "E-mail",
    password: "Mot de passe",
    profile: "Profil",
    blockWavoip: "Bloquer Wavoip",
    visibleMenu: "Menus visibles",
    massa: "Envoi en masse",
    grupo: "Groupes",
    chatprivado: "Chat privé",
    kanban: "Kanban et entonnoir",
    tarefas: "Tâches",
    sessoes: "Chaînes",
    relatorios: "Rapports",
    filas: "Files d'attente",
    equipes: "Équipes",
    mensagensrapidas: "Messages rapides",
    chatflow: "Chatbot",
    agendamentos: "Rendez-vous",
    aniversarios: "Anniversaires",
    fechamento: "Clôture",
    etiquetas: "Mots clés",
    notas: "Remarques",
    protocolos: "Protocoles",
    avaliacoes: "Avis",
    campanhas: "Campagnes",
    blockWavoipHint: "Lors de l'application du changement dans Wavoip, vous devez vider le cache du navigateur (Ctrl+Maj+R)",
    restrictedUser: "Utilisateur Restreint",
    restrictedUserDisabled: "Désactivé",
    restrictedUserEnabled: "Activé",
    restrictedUserInfo: "Restrictions appliquées lorsqu'elles sont activées:",
    restrictedUserRestriction1: "Le menu 'Contacts' sera masqué",
    restrictedUserRestriction2: "Le bouton 'Démarrer une conversation ad-hoc' sera masqué",
    restrictedUserRestriction3: "Les données de contact ne seront pas chargées sur la page d'assistance",
    restrictedUserRestriction4: "Le nom du contact sera affiché uniquement avec les 5 premiers caractères",
    restrictedUserRestriction5: "Les champs de détails du contact (téléphone, email, CPF, etc.) seront masqués",
    restrictedUserRestriction6: "Le bouton d'édition du contact sera masqué",
    restrictedUserRestriction7: "Les options de téléphonie seront désactivées",
    restrictedUserRestriction8: "La photo de profil aura un effet de flou (blur)",
    restrictedUserRestriction9: "Les options 'Transférer' et 'Marquer pour transférer' dans les messages seront bloquées",
    successEdit: "Modifié par l'utilisateur !",
    successCreate: "Créé par l'utilisateur !",
    errorLimit: "Limite d'utilisateurs atteinte.",
    errorValidation: "Oups ! Vérifier les erreurs...",
    tryAgain: "Réessayer"
  },
  modalWhatsappUsuario: {
    title: "Connexions utilisateur ",
    name: "Nom",
    email: "E-mail",
    successMessage: "Connexions utilisateur modifiées avec succès !"
  },
  usuariosTenants: {
    title: "Utilisateurs",
    tenant: "Locataire",
    id: "IDENTIFIANT",
    name: "Nom",
    email: "E-mail",
    profile: "Profil",
    actions: "Actes",
    filterPlaceholder: "Situer",
    deleteConfirmation: {
      title: "Attention!! Voulez-vous vraiment supprimer l'utilisateur « {name} » ?",
      successMessage: "L'utilisateur {name} a été supprimé avec succès !",
      errorMessage: "Impossible de supprimer l'utilisateur"
    }
  },
  modalUsuariosTenants: {
    title: "Modifier l'utilisateur",
    tenantLabel: "Locataire",
    nameLabel: "Nom",
    emailLabel: "E-mail",
    passwordLabel: "Mot de passe",
    profileLabel: "Profil",
    saveSuccess: "Modifié par l'utilisateur !",
    createSuccess: "Créé par l'utilisateur !",
    validationError: "Oups ! Vérifier les erreurs...",
    userLimitError: "Limite d'utilisateurs atteinte.",
    warning: "Lorsque vous appliquez des modifications, effacez le cache de votre navigateur (Ctrl+Maj+R).",
    tryAgain: "Réessayer"
  },
  wavoip: {
    title: "Liste de liens",
    subTitle: "Entrez l'e-mail et le mot de passe de votre compte Wavoip",
    emailLabel: "E-mail",
    passwordLabel: "Mot de passe",
    authorizeButton: "Autoriser la liste des connexions",
    callsTitle: "Links",
    logsDownloaded: "Les journaux ont été téléchargés avec succès !",
    confirmClear: "Voulez-vous vraiment effacer les journaux ?",
    confirmClearMessage: "Cette action ne peut pas être annulée.",
    logsCleared: "Les journaux ont été nettoyés avec succès !",
    downloadLogs: "Télécharger les journaux",
    clearLogs: "Effacer les journaux",
    logsTitle: "Journaux",
    logsSubtitle: "Journaux de connexion Wavoip",
    eventSummary: "Résumé de l'événement",
    connectEvents: "Événements de connexion",
    incomingEvents: "Événements d'entrée",
    outgoingEvents: "Événements de sortie",
    errorEvents: "Événements d'erreur",
    offer: "Offert",
    terminate: "Fermé",
    devicesTitle: "Appareils",
    resetLogin: "Réinitialiser la connexion Wavoip",
    action: "Action",
    error: "Erreur lors de l'authentification ou de l'affichage des messages",
    columns: {
      id: "IDENTIFIANT",
      caller: "Nombre",
      receiver: "Destination",
      direction: "Direction",
      duration: "Durée",
      createdDate: "Date",
      status: "Statut",
      link: "Action"
    },
    columnsDevices: {
      id: "IDENTIFIANT",
      idUser: "ID de l'utilisateur",
      name: "Nom",
      phone: "Nombre",
      token: "Jeton",
      status: "Statut"
    },
    direction: {
      outcoming: "Réalisé",
      incoming: "Reçu"
    },
    status: {
      ended: "Fermé",
      rejected: "Rejeté"
    },
    resetMessage: "Réinitialisation de la connexion Wavoip...",
    tokensModal: {
      title: "Jetons Wavoip - {name}",
      importantInfo: "Informations Importantes:",
      baileysInfo: "Pour les connexions Baileys, le système réutilise automatiquement la session existante.",
      otherApiInfo: "Pour les connexions {type}, vous devrez lire deux codes QR:",
      systemQrCode: "Le code QR du système (généré lors de la connexion du canal)",
      wavoipQrCode: "Le code QR Wavoip (disponible dans ce modal lorsqu'il est déconnecté)",
      note: "<strong>Note:</strong> Le code QR disponible dans ce modal est le code QR <strong>Wavoip</strong>.",
      tokenLabel: "Jeton {index}",
      disconnected: "Déconnecté",
      disconnectedMessage: "Le jeton n'est pas connecté. Cliquez sur le bouton ci-dessous pour voir le <strong>code QR Wavoip</strong>.",
      rememberSystemQr: "<strong>Rappelez-vous:</strong> Vous devrez également lire le code QR du système pour cette connexion.",
      openQrCodeButton: "Ouvrir le code QR Wavoip",
      connected: "Connecté",
      connectedMessage: "Le jeton est connecté et fonctionne normalement.",
      checkStatusMessage: "Cliquez sur \"Mettre à jour le statut\" pour vérifier le statut de ce jeton.",
      updateStatus: "Mettre à jour le statut",
      close: "Fermer",
      viewTokensTooltip: "Voir les jetons Wavoip"
    }
  },
  error404: {
    title: "404",
    subtitle: "Oups... Rien ici...",
    button: "Pour revenir en arrière"
  },
  login: {
    welcome: "Connectez-vous",
    emailLabel: "email",
    passwordLabel: "Mot de passe",
    emailPlaceholder: "mon＠email.com",
    emailError: "Doit être une adresse e-mail valide.",
    validateCaptcha: "Faites glisser le curseur jusqu'à la fin pour libérer votre connexion :",
    loginButton: "Pour entrer",
    loginLoading: "Entrer...",
    forgotPassword: "j'ai oublié mon mot de passe",
    integrateWith: "intégrer avec:",
    resetPasswordTitle: "Récupérer le mot de passe",
    resetPasswordLabel: "Entrez votre email",
    resetPasswordButton: "Envoyer",
    resetPasswordSuccess: "E-mail de récupération de mot de passe envoyé.",
    resetPasswordError: "Erreur lors de l'envoi de l'e-mail de récupération de mot de passe.",
    captchaValidationMessage: "CAPTCHA validé avec succès !",
    captchaErrorMessage: "Veuillez valider le CAPTCHA avant de continuer.",
    errorMessage: "Entrez correctement votre nom d'utilisateur et votre mot de passe.",
    validateEmailError: "S'il vous plaît, mettez une adresse email valide.",
    a2fCodeSent: "Code d'authentification à deux facteurs envoyé",
    outOfServiceHours: "En dehors des heures de service",
    invalidTenant: "Locataire invalide",
    limitError: "Erreur de limite",
    licenseErrorUser: "Erreur de licence utilisateur",
    licenseDomainError: "Erreur de domaine de licence",
    licenseErrorServer: "Erreur de licence serveur"
  },
  validateA2F: {
    title: "Validation du code 2FA",
    message: "Un code d'authentification a été envoyé à votre {channel}.",
    codeLabel: "Code d'authentification",
    codePlaceholder: "Entrez le code à 6 chiffres",
    validateButton: "Valider le code",
    validating: "Validation en cours...",
    resendCode: "Renvoyer le code",
    invalidCode: "Veuillez entrer un code valide à 6 chiffres",
    loginError: "Erreur lors de la finalisation de la connexion",
    validationError: "Erreur lors de la validation du code",
    invalidCodeError: "Code d'authentification invalide",
    expiredCodeError: "Code d'authentification expiré. Veuillez vous reconnecter.",
    invalidSessionError: "Session invalide ou expirée. Redirection vers la connexion...",
    redirectingToLogin: "Redirection vers la connexion...",
    codeResent: "Code renvoyé avec succès",
    resendError: "Erreur lors du renvoi du code",
    timeRemaining: "Temps restant : {time}",
    codeExpired: "Code expiré. Redirection vers la connexion...",
    resendCooldown: "Attendez {seconds}s pour renvoyer",
    resendLimitError: "Attendez 1 minute avant de renvoyer le code"
  },
  configuracoesA2F: {
    enableA2F: "Activer l'authentification à deux facteurs",
    enableA2FCaption: "Activez l'authentification à deux facteurs pour augmenter la sécurité d'accès",
    channelLabel: "Canal d'envoi",
    whatsappLabel: "Connexion WhatsApp",
    wabaTemplateLabel: "Modèle WABA (AUTHENTICATION)",
    messageLabel: "Message personnalisé",
    messageHint: "Utilisez {code} pour insérer automatiquement le code",
    infoText: "Le code sera envoyé via {channel} lorsque l'utilisateur se connectera. Assurez-vous que les utilisateurs ont un téléphone enregistré (pour WhatsApp) ou un e-mail valide (pour E-mail).",
    templateListError: "Erreur lors du chargement des modèles WABA",
    wabaMessageWarning: "Lors de l'utilisation de WABA, le texte du modèle sera utilisé. Le message personnalisé ne sera pas appliqué.",
    emailSmtpConfigured: "Les paramètres SMTP définis dans Paramètres > SMTP seront utilisés.",
    emailSmtpNotConfigured: "Configurez SMTP dans Paramètres > SMTP pour envoyer les codes 2FA par e-mail.",
    smsProviderLabel: "Fournisseur SMS",
    smsInfo: "Configurez le token du fournisseur SMS sélectionné dans les paramètres du tenant pour envoyer les codes 2FA."
  },
  resetPassword: {
    title: "Réinitialiser le mot de passe",
    newPasswordPlaceholder: "Nouveau mot de passe",
    confirmPasswordPlaceholder: "Confirmez le mot de passe",
    resetButtonLabel: "Réinitialiser",
    loadingMessage: "Redéfinir...",
    successMessage: "Réinitialisation du mot de passe réussie !",
    errorMismatch: "Les mots de passe ne correspondent pas.",
    errorMessage: "Erreur lors de la réinitialisation du mot de passe."
  },
  signup: {
    title: "Créez votre compte !",
    namePlaceholder: "Nom",
    cpfCnpjPlaceholder: "CPF/CNPJ",
    emailPlaceholder: "E-mail",
    mobilePhonePlaceholder: "Téléphone portable",
    passwordPlaceholder: "Mot de passe",
    selectPlanPlaceholder: "Sélectionnez un plan",
    submitButtonLabel: "Créer un compte",
    cancelButtonLabel: "Se connecter",
    loadingMessage: "Créer...",
    validations: {
      requiredFields: "Remplissez tous les champs !",
      invalidCpfCnpj: "CPF ou CNPJ invalide.",
      invalidEmail: "E-mail invalide.",
      invalidPassword: "Le mot de passe doit comporter au moins 7 caractères, y compris des lettres, des chiffres et un caractère spécial !",
      successMessage: "Client créé avec succès.",
      errorMessage: "Erreur lors de la création du client"
    },
    planLabel: "Valeur : $ {value} - Connexions : {connexions} - Utilisateurs : {users}"
  },
  atendimentoChat: {
    selectTicket: "Sélectionnez un billet !",
    noResults: "Aucun résultat :(",
    noMore: "Rien de plus à charger :)",
    forwardMessage: "Transfert de message",
    forwardHint: "Entrez au moins deux lettres pour trouver le contact.",
    forwardLimit: "Un seul contact peut être sélectionné.",
    messageSent: "Message envoyé avec succès!",
    messageFailed: "Impossible d'envoyer le message. Veuillez réessayer.",
    forwardMessages: "{count} messages sélectionnés sur 10 à transférer.",
    contactNotSelected: "Sélectionnez le contact de destination des messages.",
    forwardToPrivateChat: "Transférer vers le Chat Privé",
    forwardToOtherChannel: "Transférer vers un Autre Canal",
    selectPrivateChatUser: "Sélectionnez un utilisateur",
    selectPrivateChatUserHint: "Tapez pour rechercher un utilisateur",
    userNotSelected: "Sélectionnez un utilisateur",
    messageNotSelected: "Message introuvable",
    messageSentToPrivateChat: "Message transféré à {name}",
    forwardToOtherChannel: "Transférer vers un Autre Canal",
    selectDestinationChannel: "Sélectionnez le canal de destination",
    selectDestinationChannelHint: "Choisissez le canal vers lequel le message sera transféré",
    channelNotSelected: "Sélectionnez un canal",
    channelNotFound: "Canal introuvable",
    messageSentToOtherChannel: "Message transféré à {name} sur le canal {channel}"
  },
  atendimentoChatdialogAgendamentoMensagem: {
    title: "Planification des messages",
    close: "Pour fermer"
  },
  atendimentoVcard: {
    contactTitle: "Contact : {name}",
    selectChannelMessage: "Sélectionnez la chaîne pour démarrer le service.",
    startButton: "Commencer",
    attentionTitle: "Attention",
    ongoingTicketMessage: "{name} a un service en cours (Service : {ticketId} - File d'attente : {queueId}). Voulez-vous ouvrir le service ?",
    adminOnlyMessage: "{name} a un service en cours. Seul un administrateur peut vous attribuer ce service.",
    ongoingTicketError: "Impossible d'actualiser le jeton",
    notifyTicketStarted: "Service démarré - {name} - Billet : {ticketId}"
  },
  atendimentoModalSMS: {
    title: "Envoyer des SMS",
    messageLabel: "SMS",
    selectServiceLabel: "Sélectionner un service",
    cancel: "Annuler",
    send: "Envoyer",
    noServiceSelected: "Veuillez sélectionner un service.",
    comteleSuccess: "Comtele : envoyé !",
    conectaSuccess: "ConectaStartup : envoyé !",
    livsonSuccess: "BHI : envoyé !",
    errorSending: "Erreur lors de l'envoi du SMS : {error}"
  },
  atendimentoModalNovoTicket: {
    title: "Créer un ticket",
    contactPlaceholder: "Trouver un contact",
    contactHint: "Entrez au moins deux lettres pour trouver le contact.",
    addContact: "Ajouter un contact",
    start: "Commencer",
    selectDestination: "Sélectionnez la destination :",
    queueDestination: "File d'attente de destination",
    userDestination: "Utilisateur cible",
    ticketTransferred: "Billet transféré.",
    errorLoadingQueues: "Problème de chargement des files d'attente",
    errorLoadingUsers: "Problème de chargement des utilisateurs",
    existingTicketMessage: "{name} a un service en cours (Service : {id} - File d'attente : {queue}). Voulez-vous ouvrir le service ?",
    noQueue: "pas de file d'attente",
    adminOnlyMessage: "{name} a un service en cours. Seul un administrateur peut vous attribuer ce service.",
    confirmStart: "Contact : {nom}. Sélectionnez la chaîne pour démarrer le service.",
    contactCreated: "Contact créé !"
  },
  atendimentoMixinSockets: {
    tokenInvalid: "Jeton non valide. Redirection vers la page de connexion.",
    privateMessage: {
      update: "Nouveau message privé reçu.",
      unread: "Message privé non lu reçu.",
      notification: "Nouvelle notification de message privé."
    },
    onlineUsers: "Vérification des utilisateurs en ligne.",
    userOnline: "L'utilisateur s'est connecté.",
    updateStatusUser: "Mise à jour des statuts des utilisateurs.",
    newClient: "Nouveau client connecté.",
    pendingCliente: "Nouveau client en attente",
    client: "Client: "
  },
  atendimentomixinCommon: {
    note: "📝Remarque :",
    transfer: "⏩ Transfert : ",
    audio: "🔊Audio : ",
    buttonNotAvailable: "Ce bouton n'est cliquable que sur mobile",
    dateFormat: "jj/MM/aaaa"
  },
  atendimentoMixinAtualizar: {
    label: "Évaluez ce service",
    rating: {
      0: "Mauvais",
      1: "Régulier",
      2: "Bien",
      3: "Très bien",
      4: "Excellent",
      5: "Incroyable"
    },
    notifications: {
      selecioneUmMotivo: "Sélectionnez une raison pour la fermeture du service.",
      demandaSalva: "Demande enregistrée avec succès ! Vous pouvez maintenant mettre fin au service.",
      erroSalvarDemanda: "Impossible de sauvegarder la demande.",
      erroCarregarMotivos: "Impossible de charger les raisons.",
      forcarDemanda: "Pour fermer le service, définissez la demande.",
      iniciarAtendimento: "Service démarré - {name} - Ticket : {id}",
      espiarAtendimento: "Espionnage - {name} - Ticket : {id}",
      avaliacaoEnviada: "Évaluation envoyée au support {id}. Le service sera complété automatiquement après que le client aura envoyé l'évaluation.",
      avaliacaoErro: "Impossible d'envoyer l'évaluation du service.",
      ticketEncerrado: "Service fermé ! (Billet {id})",
      mensagemDespedida: "Le message sélectionné est en cours d'envoi et le ticket sera fermé dans les 30 secondes !",
      erroAtualizarStatus: "Impossible de mettre à jour l'état du service.",
      atendimentoJaIniciado: "Le service pour cette connexion a déjà été démarré dans l'onglet ouvert/en attente ou demandez à l'administrateur d'ouvrir un nouveau service dans l'option de contact.",
      atendimentoEncerrado: "Service fermé !",
      atendimentoIniciado: "Service démarré !",
      retornadoFila: "De retour dans la file !"
    },
    dialogs: {
      iniciar: "Le service va démarrer, ok ?",
      retornarFila: "Retourner à la file d'attente ?",
      encerrar: "Mettre fin au service ?",
      encerrarForcado: "Mettre fin au service ? Billet : {id}",
      mensagemCliente: "Voulez-vous mettre à jour le ticket #{ticketId} pour le client {customer} ?",
      mensagemCliente2: "Voulez-vous mettre fin à ce service ?",
      ticketEncerrar: "Mettre fin au service ?"
    },
    titles: {
      iniciar: "Le service va démarrer, ok ?",
      retornarFila: "Retourner à la file d'attente ?",
      encerrar: "Mettre fin au service ?",
      encerrarAtendimento: "Mettre fin au service ?",
      encerrarForcado: "Mettre fin au service ? Billet : {id}"
    },
    evaluation: "Avis envoyé"
  },
  atendimentoMensagemRespondida: {
    labels: {
      mensagemApagada: "Message supprimé le {date}.",
      baixarContato: "Télécharger Contact",
      baixarArquivo: "Télécharger : {filename}",
      visualizarPDF: "Voir",
      audioInacessivel: "Audio indisponible",
      grupoNome: "Groupe : {GroupName}",
      contatoNome: "Contact : {contactName}"
    },
    errors: {
      erroMensagem: "Erreur lors du traitement du message.",
      erroAudio: "Erreur lors du chargement de l'audio.",
      erroDownload: "Erreur lors du téléchargement du fichier."
    }
  },
  atendimentoMensagemChat: {
    noName: "Pas de nom",
    system: "Système",
    labels: {
      atencao: "Attention!! Voulez-vous vraiment essayer de renvoyer ce message ?",
      processoReenvio: "Ce processus tentera de renvoyer le message en attente dans le système.",
      processoIniciado: "Processus démarré.",
      tentandoEnvio: "Tentative d'envoi des messages en attente.",
      erroEnvio: "Erreur lors de l'envoi des messages : {error}",
      deletarAtencao: "Attention!! Voulez-vous vraiment supprimer le message ?",
      deletarAviso: "Les anciens messages ne seront pas supprimés dans le client.",
      deletarErro: "Impossible de supprimer le message.",
      mensagemSincronizada: "Message synchronisé : {timingSync}",
      mensagemEditada: "Modifié : {contentMessage}",
      mensagemApagada: "Message supprimé le {date}.",
      downloadContato: "Télécharger Contact",
      baixarArquivo: "Télécharger : {filename}",
      mensagemNaoEntregue: "Message non délivré",
      mensagemAgendada: "Message programmé",
      enviadoCancelado: "Soumission annulée : {date}",
      criadoEm: "Créé le : {date}",
      programadoPara: "Prévu pour : {date}",
      facaDownload: "Télécharger le fichier",
      editarMensagem: "Modifier le message"
    },
    errors: {
      erroAudio: "Erreur lors du chargement de l'audio.",
      erroMensagem: "Erreur lors du traitement du message.",
      erroDownload: "Erreur lors du téléchargement du fichier.",
      maximoMensagens: "Maximum 10 messages autorisés."
    },
    dialogs: {
      reenviarTitulo: "Renvoyer le message",
      reenviarMensagem: "Voulez-vous renvoyer ce message en attente ?",
      deletarTitulo: "Supprimer le message",
      deletarMensagem: "Voulez-vous vraiment supprimer ce message ? Les anciens messages ne seront pas supprimés dans le client."
    },
    notifications:{
      tentandoEnviarMensagens: "Tentative d'envoi des messages en attente.",
    }
  },
  atendimentoItemTicketPainel: {
    labels: {
      atender: "Pour se rencontrer",
      espirar: "Espionner",
      usuario: "Utilisateur : {username}",
      canalRemovido: "Chaîne supprimée",
      atendimentoResolvido: "Service résolu",
      chatbotAtendendo: "ChatBot servant",
      integracaoExterna: "Intégration Externe",
      fila: "File d'attente : {queuename}",
      etiquetas: "Mots-clés : {tags}",
      carteiras: "Portefeuilles : {wallets}",
      espiarAtendimento: "Afficher le service : {idTicket}"
    },
    status: {
      aberto: "Ouvrir",
      pendente: "En attente",
      resolvido: "Résolu"
    },
    errors: {
      erroInformacoes: "Erreur lors de la récupération de {typeInformation} : {error}"
    }
  },
  atendimentoItemTicket: {
    labels: {
      atender: "Pour se rencontrer",
      atendimentoResolvido: "Service résolu",
      chatbotAtendendo: "ChatBot servant",
      integracaoExterna: "Intégration Externe",
      forcarFechamento: "Fermeture forcée (pas d'adieu/évaluation/demande)",
      espiarAtendimento: "Service d'espionnage : {id}",
      usuario: "Utilisateur : {username}",
      etiquetas: "Mots clés:",
      kanban: "Kanban : {kanbanName}",
      semFoto: "Chaîne supprimée",
      espiar: "Espionner",
      fecharTicketSemDespedida: "Fermeture forcée (pas d'adieu/évaluation/demande)",
      rascunhoSalvo: "Brouillon enregistré"
    },
    status: {
      aberto: "Ouvrir",
      pendente: "En attente",
      resolvido: "Résolu"
    },
    errors: {
      erroInformacoes: "Erreur lors de la récupération des informations de {typeInformation} : {error}",
      erroRemoverFoto: "Erreur lors de la suppression de la photo nulle : "
    },
    dialogs: {
      fecharTitulo: "Attention",
      fecharMensagem: "Voulez-vous forcer la fermeture du ticket ?"
    },
    notifications: {
      aguardeEnvio: "Attendez que le message soit envoyé avant de changer de ticket"
    }
  },
  inputMensagem: {
    novo: {
      camposObrigatorios: "Veuillez remplir tous les champs obligatoires avant d'envoyer le message.",
      enviarLocalizacao: "Envoyer la localisation",
      latitude: "Latitude",
      longitude: "Longitude",
      nomeLocal: "Nom du lieu",
      enderecoLocal: "Adresse du lieu",
      localizacaoEnviada: "Localisation envoyée avec succès !",
      erroEnviarLocalizacao: "Erreur lors de l'envoi de la localisation",
      enviarCTAURL: "Envoyer l'URL CTA",
      enviarReplyButtons: "Envoyer des boutons de réponse",
      enviarAddress: "Envoyer l'adresse",
      enviarLocationRequest: "Envoyer une demande de localisation",
      enviarFlow: "Envoyer un flux",
      enviarLocation: "Envoyer la localisation",
      sendLocation: "Envoyer la localisation",
      tipoDeHeader: "Type d'en-tête",
      texto: "Texte",
      imagem: "Image",
      video: "Vidéo",
      documento: "Document",
      textoDoHeader: "Texte de l'en-tête",
      urlDoHeader: "URL de l'en-tête",
      mensagem: "Message",
      digiteSuaMensagem: "Saisissez votre message",
      textoDoBotao: "Texte du bouton",
      exemploTextoDoBotao: "Ex : Voir le produit",
      urlDoBotao: "URL du bouton",
      exemploUrlDoBotao: "https://exemplo.com",
      footeropt: "Pied de page (optionnel)",
      textoDoFooter: "Texte du pied de page",
      flowIdopt: "ID du flux (optionnel)",
      idDoFlow: "ID du flux",
      flowNameopt: "Nom du flux (optionnel)",
      nomeDoFlow: "Nom du flux",
      flowCtaopt: "CTA du flux *",
      textoDoCta: "Texte du CTA",
      flowTokenopt: "Jeton du flux (optionnel)",
      tokenDoFlow: "Jeton du flux",
      flowAction: "Action du flux",
      navegar: "Naviguer",
      trocaDeDados: "Échange de données",
      flowActionPayloadopt: "Payload d'action du flux (optionnel)",
      tituloDoBotao: "Titre du bouton",
      rua1opt: "Rue 1 *",
      enderecoPrincipal: "Adresse principale",
      rua2opt: "Rue 2 (optionnel)",
      complemento: "Complément",
      cidadeopt: "Ville *",
      nomeDaCidade: "Nom de la ville",
      estadoopt: "État *",
      nomeDoEstado: "Nom de l'état",
      cepopt: "Code postal *",
      cep: "00000-000",
      paisopt: "Pays *",
      nomeDoPais: "Nom du pays",
      tipoDeEndereco: "Type d'adresse",
      casa: "Maison",
      trabalho: "Travail",
      latitudeopt: "Latitude *",
      longitudeopt: "Longitude *",
      nomeDaLocalizacaoopt: "Nom de la localisation (optionnel)",
      exemploNomeDaLocalizacao: "Ex : Centre commercial",
      enderecoopt: "Adresse (optionnel)",
      enderecoCompleto: "Adresse complète",
      enderecoEnviado: "Adresse envoyée avec succès !",
      localizacaoEnviada: "Localisation envoyée avec succès !"
    },    
    labels: {
      mensagem: "Message",
      codigoPais: "Code du pays",
      numeroTelefone: "Numéro de téléphone",
      campoVazio: "Remplissez tous les champs de variables avant d'envoyer le modèle.",
      vcardEnviado: "VCard envoyé avec succès !",
      telefoneContato: "Téléphone",
      nomeContato: "Nom",
      enviarContato: "Envoyer le contact",
      nothingHere: "Attention... Rien ici !",
      nothingHereDescription: "Il n'y a pas de messages rapides ni de pièces jointes à afficher.",
      erroAnexar: "Erreur lors de la pièce jointe du fichier",
      anexoEnviado: "Pièce jointe envoyée avec succès !",
      selecioneArquivo: "Sélectionnez un fichier",
      preview: "Aperçu",
      anexarArquivo: "Joindre un fichier",
      caption: "Légende",
      emoji: "Émoji",
      templates: "Modèles",
      digiteMensagem: "Tapez ici...",
      enviarArquivo: "Envoyer plusieurs fichiers",
      enviarArquivoCaption: "Envoyer un fichier avec légende",
      enviarArquivoGaleria: "Envoyer un fichier de la galerie",
      selecionarArquivoGaleria: "Sélectionner un fichier de la galerie",
      arquivoSelecionado: "Fichier sélectionné",
      enviarFigurinha: "Envoyer un autocollant",
      enviarEmoji: "Émoji",
      enviarMensagem: "Envoyer un message",
      enviarAudio: "Envoyer l'audio",
      enviarLinkVideo: "Envoyer un lien pour la vidéoconférence",
      enviarMarcacaoFantasma: "Envoyer un balisage fantôme",
      enviarMarcacao: "Envoyer un rendez-vous",
      enviarBotoes: "Boutons d'envoi",
      enviarListas: "Envoyer des listes",
      enviarAgenteHumano: "Envoyer avec Agent Humain",
      descricaoAgenteHumano: "Ce message sera envoyé avec la balise HUMAN_AGENT, permettant d'envoyer des messages même en dehors de la fenêtre de 24 heures (dans les 7 jours).",
      mensagemObrigatoria: "Le message est obligatoire",
      mensagemEnviada: "Message envoyé avec succès !",
      enviarTemplate: "Modèles",
      removerMidiaMensagemRapida: "Supprimer le média du message rapide",
      cancelarGravacao: "Annuler l'enregistrement",
      enviarGravacao: "Envoyer l'enregistrement",
      gravacaoIniciada: "Enregistrement commencé",
      gravacaoParada: "Enregistrement arrêté",
      mensagemRapida: "Messages rapides",
      mensagemMarcacao: "Message de balisage",
      mensagemMarcacaoFantasma: "Message de marquage fantôme",
      videoGravacao: "Enregistrement vidéo",
      arquivo: "Déposer: ",
      voz: "Voix: ",
      semMidia: "Pas de médias",
      sim: "Oui",
      nao: "Non",
      dataHoraAgenda: "Date/heure du rendez-vous",
      desativarAssinatura: "Désactiver l'abonnement",
      ativarAssinatura: "Activer l'abonnement",
      selecioneParticipantes: "Sélectionner les participants",
      botao: "Bouton",
      botao1: "Bouton 1",
      botao2: "Bouton 2",
      botao3: "Bouton 3",
      header: "En-tête",
      title: "Titre",
      footer: "Plinthe",
      title1: "Titre de la colonne 1",
      title2: "Titre de la colonne 2",
      title3: "Titre de la colonne 3",
      title4: "Titre de la colonne 4",
      title5: "Titre de la colonne 5",
      description1: "Description Colonne 1",
      description2: "Description Colonne 2",
      description3: "Description Colonne 3",
      description4: "Description Colonne 4",
      description5: "Description Colonne 5",
      templateChoose: "Choisissez un modèle",
      startRecord: "Démarrer l'enregistrement",
      stopRecord: "Arrêter l'enregistrement",
      sendRecord: "Envoyer l'enregistrement",
      manipularGrupo: "Gérer le Groupe",
      grupoSelecionado: "Groupe Sélectionné",
      send: "Envoyer",
      cancel: "Annuler",
      selectMarketingTemplate: "Sélectionnez un modèle marketing à envoyer",
      selectTemplateMessenger: "Sélectionnez un modèle à envoyer",
      templateCategory: "Catégorie de Modèle",
      marketing: "Marketing",
      utility: "Utility",
      templateName: "Nom du Modèle",
      enterTemplateName: "Entrez le nom du modèle utility",
      utilityTemplateInfo: "Les modèles utility sont envoyés dans la fenêtre de 24 heures après le dernier message de l'utilisateur.",
      noTitle: "Sans titre",
      status: "Statut",
      token: "Token",
      nextSend: "Prochain envoi",
      whatsappNotFound: "Canal WhatsApp introuvable",
      errorLoadingTemplates: "Erreur lors du chargement des modèles",
      selectTemplate: "Sélectionnez un modèle",
      pageIdNotFound: "Page ID introuvable",
      tokenNotFound: "Token de notification introuvable",
      templateSent: "Modèle envoyé avec succès",
      errorSendingTemplate: "Erreur lors de l'envoi du modèle",
    },
    grupo: {
      alterarTitulo: "Changer le Titre",
      alterarDescricao: "Changer la Description",
      alterarImagemUrl: "Changer l'Image (URL)",
      alterarImagemUpload: "Changer l'Image (Téléchargement)",
      alterarPermissao: "Changer les Permissions",
      promoverAdmin: "Promouvoir Admin",
      demoverAdmin: "Rétrograder Admin",
      adicionarParticipante: "Ajouter Participant",
      removerParticipante: "Supprimer Participant",
      listarParticipantes: "Lister Participants",
      gerenciarUsuarios: "Gérer les Utilisateurs",
      participantes: "Participants",
      novoTitulo: "Nouveau Titre",
      novaDescricao: "Nouvelle Description",
      novaImagemUrl: "Nouvelle URL d'Image",
      novaImagemArquivo: "Nouvelle Image (Fichier)",
      adminOnly: "Admins Seulement",
      numerosParticipantes: "Numéros des Participants",
      executar: "Exécuter Actions"
    },
    dialogs: {
      confirmarEnvio: "Confirmer l'envoi : Entrer",
      cancelarEnvio: "Annuler : ESC"
    },
    errors: {
      arquivoRejeitado: "Fichier rejeté en raison d'une taille ou d'un type incompatible.",
      gravacaoErro: "Erreur lors de l'enregistrement vidéo ou audio."
    },
    error: {
      vcardErro: "Erreur lors de l'envoi du VCard !",
      erroEnviarVcard: "Erreur lors de l'envoi du VCard !",
    },
    success: {
      vcardEnviado: "VCard envoyé avec succès !",
    },
    wabaErrors: {
      title: "Erreur lors de la validation du(des) fichier(s) pour WABA",
      invalidFileType: "Type de fichier non pris en charge pour WABA : {fileName}",
      invalidFileTypeWithExtensions: "Type de fichier non pris en charge pour WABA : {fileName}. Extensions autorisées : {extensions}",
      fileSizeExceeded: "Le fichier {fileName} dépasse la taille maximale autorisée",
      fileSizeExceededDetail: "{fileName} dépasse la taille maximale autorisée ({maxSize} MB). Fichier : {fileSize} MB"
    }      
  },
  atendimentoInputScript: {
    pendingMessageSended: "Veuillez patienter... Message en cours d'envoi",
    micPermissionDenied: "Autorisation du microphone refusée",
    scheduleError: "Pour planifier un message, saisissez le champ Date/Heure de planification.",
    sendMessage: "Envoyer un message",
    scheduleMessage: "Message de planification",
    recordAudio: "Enregistrer l'audio",
    stopRecording: "Arrêter l'enregistrement",
    cancelRecording: "Annuler l'enregistrement",
    startRecording: "Démarrer l'enregistrement",
    prepareMedia: "Préparer les supports pour l'expédition",
    invalidFile: "Fichier invalide!",
    fileAcceptedFormats: "Formats acceptés : {formats}",
    sendingMessage: "Envoi du message...",
    errorSendingMessage: "Erreur lors de l'envoi du message",
    invalidMessage: "Message invalide",
    customSchedule: "Planification personnalisée",
    in30Minutes: "Dans 30 minutes",
    tomorrow: "Demain",
    nextWeeks: "La semaine prochaine",
    uploadFile: "Envoyer le fichier",
    attachFile: "Joindre un fichier",
    previewImage: "Voir l'image",
    dragFileHere: "Faites glisser le fichier ici",
    selectAll: "Tout sélectionner",
    schedulePlaceholder: "Saisissez le champ Date/Heure du rendez-vous",
    videoRecordingError: "Erreur lors du démarrage de l'enregistrement vidéo",
    audioRecordingError: "Erreur lors du démarrage de l'enregistrement audio",
    filePreviewError: "Erreur lors du chargement de l'aperçu du fichier",
    messageScheduled: "Message programmé avec succès",
    messageError: "Message d'erreur lors du traitement",
    headerUrl: "URL d'en-tête",
    namedVariable: "Valeur variable",
    templateSuccess: "Modèle envoyé avec succès",
    templateError: "Erreur lors de l'envoi du modèle",
    ghostMessageSuccess: "Message de balise fantôme envoyé avec succès",
    ghostMessageError: "Erreur lors de l'envoi du message de balise fantôme",
    mentionAllSuccess: "Message de réservation envoyé avec succès",
    mentionAllError: "Erreur lors de l'envoi du message de balise",
    previewTitle: "Envoyer l'image à {contactName}",
    noFilesToSend: "Aucun fichier à télécharger",
    emptyMessageError: "Message inexistant",
    multipleQuickMessagesError: "Plusieurs messages rapides trouvés. Sélectionnez-en un ou entrez une clé unique dans le message",
    noQuickMessageFoundError: "/ indique que vous souhaitez envoyer un message rapide, mais aucun n'a été trouvé. Enregistrez ou supprimez le / et tapez votre message.",
    dataMessage: "Veuillez saisir les données qui seront envoyées",
    messageValidationError: "Le message doit comporter entre 1 et 60 caractères.",
    buttonValidationError: "Le bouton doit comporter un maximum de 20 caractères.",
    duplicateButtonError: "Les boutons ne peuvent pas avoir de valeurs répétées.",
    missingFieldsError: "Veuillez saisir les données qui seront envoyées."
  },
  atendimentoInfoCabecalho: {
    pauseAttendance: "Mettre l’assistance en pause",
    resumeAttendance: "Reprendre l’assistance",
    attendancePaused: "Assistance mise en pause avec succès",
    attendanceResumed: "Assistance reprise avec succès",
    pauseError: "Erreur lors du contrôle de la pause de l’assistance",
    menuAction: "Action du menu",
    contactInfo: "Coordonnées",
    assignedTo: "Attribué à :",
    ticketNumber: "Numéro de billet :",
    reopenTicket: "Réouverture du ticket",
    messageScheduling: "Planification des messages",
    returnToQueue: "Billet de retour à la file d'attente",
    resolveTicket: "Résoudre",
    transfer: "Transfert",
    chatbot: "Chatbot",
    channel: "Canal",
    channels: "Chaînes",
    resolve: "Résoudre",
    reopenCall: "Réouverture des appels Wavoip",
    scheduleMessage: "Message de planification",
    actions: "Actes",
    selectDestination: "Sélectionnez la destination :",
    ticket: "Billet",
    destinationQueue: "File d'attente de destination",
    destinationUser: "Utilisateur cible",
    destinationChatbot: "Chatbot cible",
    destinationChannel: "Chaîne cible",
    selectDestinationQueue: "Sélectionnez la file d'attente de destination",
    alreadyAssigned: "Le ticket appartient déjà à l'utilisateur sélectionné.",
    alreadyAssignedToYou: "Le ticket appartient déjà à son utilisateur.",
    alreadyInQueueAndUser: "Le ticket appartient déjà à cette file d'attente et à cet utilisateur.",
    transferredToChatbot: "Ticket transféré au chatbot",
    transferredToChannel: "Ticket transféré sur la chaîne",
    transferredToQueue: "Billet transféré.",
    loadingQueuesError: "Problème de chargement des files d'attente",
    loadingUsersError: "Problème de chargement des utilisateurs",
    loadingChatbotsError: "Problème de chargement des chatbots",
    loadingChannelsError: "Problème de chargement des chaînes",
    ticketOpen: "Ouvrir",
    ticketClosed: "Fermé",
    transferError: "Impossible de transférer",
    checkTicketError: "Il existe déjà un ticket ouvert/en attente pour ce contact.",
    searchInConversation: "Rechercher dans la conversation",
    searchPlaceholder: "Saisissez un terme à rechercher",
    noMessagesFound: "Aucun message trouvé",
    groupUsers: "Utilisateurs du Groupe",
    selectUsersForGroup: "Sélectionnez les utilisateurs qui auront accès à ce ticket de groupe",
    groupUsersUpdated: "Utilisateurs du groupe mis à jour avec succès",
    mediaLinksDocs: "Médias, liens et documents",
    mediaTab: "Médias",
    linksTab: "Liens",
    docsTab: "Documents",
    loadingMediaLinksDocs: "Chargement des médias, liens et documents...",
    errorUpdatingGroupUsers: "Erreur lors de la mise à jour des utilisateurs du groupe",
    autoScroll: "Défilement automatique",
    autoScrollDescription: "Désactive le défilement automatique lorsque de nouveaux messages arrivent",
    autoScrollEnabled: "Défilement automatique activé",
    autoScrollDisabled: "Défilement automatique désactivé"
  },
  generalSupport: {
    selectWavoip: "Sélectionnez WhatsApp pour passer l'appel",
    looginForWarning1: "Pendant la recherche, les tickets ne sont pas mis à jour !",
    looginForWarning2: "Effacer le champ pour mettre à jour...",
    lookingFor: "Recherche par identifiant, nom ou numéro...",
    closingForecast: "Prévisions de clôture",
    status: "Statut",
    createdAt: "Créé en",
    opportunities: "Journaux",
    funil: "Entonnoir",
    ticketFunil: "Créer une étape dans l'entonnoir",
    privateChat: "Privé",
    groupChat: "Groupe",
    searchMessage: "Rechercher un message",
    searchTicket: "Demander de l'aide",
    notes: "Remarques",
    number: "Nombre",
    message: "Message",
    placeholderNumber: "+DDI (DDD) 99999 9999",
    hintNumber: "S'il existe une connexion WABA active dans le système, vous devez saisir le numéro de compte WhatsApp exact.",
    ticketNotes: "Notes de service",
    evaluation: "Évaluation",
    ticketEvaluation: "Évaluation des services",
    markasNoRead: "Marquer comme non lu",
    markasRead: "Marquer comme lu",
    businessName: "Nom de l'entreprise",
    lastName: "Nom de famille",
    firstName: "Prénom",
    profile: "Profil",
    logout: "Sortir",
    activate: "Activer",
    deactivate: "Désactiver",
    toggleDarkMode: "Mode sombre",
    viewTickets: "Voir les billets",
    includeClosedTickets: "Inclure les billets fermés",
    returnMenu: "Retour au menu",
    taskCreate: "Créer une tâche",
    inernalChat: "Chat interne",
    privateChats: "Conversations privées",
    groupChats: "Discussions de groupe",
    advancedFilter: "Filtre avancé",
    filterByQueues: "Files d'attente",
    filterByConnections: "Connexion (Bêta)",
    filterByUser: "Utilisateur (Bêta)",
    filterByTags: "Mots-clés (bêta)",
    filterByKanban: "Kanban (Bêta)",
    openTickets: "Ouvrir",
    pendingTickets: "En attente",
    resolvedTickets: "Résolu",
    unreadTicketsOnly: "Uniquement les tickets avec des messages non lus",
    advancedFilterNotice: "Lorsque vous utilisez les filtres, vous devez cliquer sur le bouton ci-dessus, Charger plus de services.",
    scheduleMessages: "Messages programmés",
    scheduledFor: "Prévu pour :",
    extractConversations: "Extraire les conversations",
    downloadPDF: "Télécharger le fichier PDF",
    difyDescription: "Lorsqu'il est actif, le système consommera Dify",
    lmDescription: "Lorsqu'il est actif, le système consommera LM Studio",
    grokDescription: "Lorsqu'il est actif, le système consommera Grok",
    geminiDescription: "Lorsqu'il est actif, le système consommera Gemini",
    deepseekDescription: "Lorsqu'il est actif, le système consommera Deepseek",
    qwenDescription: "Lorsqu'il est actif, le système consommera Qwen",
    claudeDescription: "Lorsqu'il est actif, le système consommera Claude",
    ollamaDescription: "Lorsqu'il est actif, le système consommera Ollama",
    clearKanban: "Kanban clair",
    reason: "Demande",
    clearReason: "Demande claire",
    value: "Valeur",
    blockContact: "Bloquer le contact",
    blockChatbot: "Bloquer Chatbot",
    tags: "Mots clés",
    kanban: "Kanban",
    chatgptDescription: "Lorsqu'il est actif, le système consommera ChatGPT",
    dialogflowDescription: "Lorsqu'il est actif, le système consommera le DialogFlow",
    typebotDescription: "Lorsqu'il est actif, le système consommera Typebot",
    n8nescription: "Lorsqu'il est actif, le système consommera N8N",
    private: "Privé",
    groups: "Groupes",
    chatbot: "Chatbot",
    n8nDescription: "Lorsqu'il est actif, le système consommera N8N",
    contacts: "Contacts",
    openWavoip: "Ouvrir Wavoip",
    startNew: "Démarrer une conversation unique",
    loadMore: "Charger plus d'appels",
    reverseOrder: "Ordre inversé des billets",
    sortByAnswered: "Trier par Non répondu",
    protocol: "Protocole",
    ticketProtocol: "Protocole de service",
    syncHistory: "Historique de synchronisation",
    log: "Journaux",
    noTagsAvailable: "Oups... Aucune balise créée !",
    noTagsAvailableWarning: "Enregistrez de nouvelles étiquettes dans l'administration du système.",
    noWalletsAvailable: "Oups... Aucun portefeuille disponible !",
    wallets: "Portefeuilles",
    filter: {
      queues: "Files d'attente",
      whatsapp: "Connexion",
      users: "Utilisateurs",
      tags: "Mots clés",
      kanbans: "Kanbans"
    },
    toggleFilterOptions: "Afficher/Masquer les options de filtrage",
    addTag: "Ajouter une balise",
    addWallet: "Ajouter un portefeuille",
    ticketsSelected: "tickets sélectionnés",
    ticketSelected: "ticket sélectionné",
    selectMultiple: "Sélectionner plusieurs",
    transferSelectedTickets: "Transférer les tickets sélectionnés",
    markAsRead: "Marquer comme lu",
    markAsUnread: "Marquer comme non lu",
    sanitizeContact: "Désinfecter les contacts",
    logsticket: "Journaux de tickets",
    contactSanitizeNotice: "Cette routine recrée l'utilisateur et ferme tous les tickets associés à ce contact.",
    addValue: "Ajouter de la valeur",
    ticketProtocols: "Protocoles de service",
    ticketsEvaluations: "Évaluations de services",
    evaluationAverage: "Notes moyennes",
    evaluationNotConclusive: "L'évaluation n'a pas été complétée avec succès",
    contactDetails: {
      vapi: "Vapi",
      title: "Coordonnées",
      reduceMenu: "Réduire le menu",
      name: "Nom",
      phone: "Téléphone",
      email: "E-mail",
      cpf: "CPF",
      birthday: "Date d'anniversaire",
      businessName: "Entreprise",
      firstName: "Prénom",
      lastName: "Nom de famille",
      edit: "Modifier",
      call: "Wavoip",
      asterisk: "SIROTER",
      telephony: "Téléphonie",
      sms: "SMS"
    },
    logs: {
      contactLogs: "Journaux de contact",
      ticketLogs: "Journaux de tickets",
      evaluationLogs: "Journaux d'évaluation",
      protocolLogs: "Journaux de protocole",
      noteLogs: "Journaux de notes"
    }
  },
  rating: {
    poor: "Mauvais",
    fair: "Régulier",
    good: "Bien",
    veryGood: "Très bien",
    excellent: "Excellent",
    incredible: "Incroyable"
  },
  generalSupportScript: {
    sendMessage: "Envoyer un message",
    sendingMessage: "Envoi du message...",
    messageSent: "Message envoyé au numéro : ",
    messageSendError: "Erreur lors de l'envoi d'un message individuel : ",
    closeModal: "Fermer la fenêtre modale",
    error: "Erreur",
    success: "Succès",
    notificationPosition: "haut",
    notificationColorPositive: "positif",
    notificationColorNegative: "négatif",
    downloadPDF: "Télécharger le PDF",
    downloadingPDF: "Téléchargement du PDF...",
    errorDownloadingPDF: "Erreur lors du téléchargement des messages",
    reportTitle: "Rapport de message - Assistance",
    protocolLabel: "Protocole",
    ticketIdLabel: "ID du billet",
    whatsappIdLabel: "identifiant WhatsApp",
    channelLabel: "Canal",
    footerGeneratedOn: "Généré le",
    contactInfo: "Coordonnées",
    nameLabel: "Nom",
    numberLabel: "Nombre",
    profilePicLabel: "Photo de profil",
    messageFrom: "Message de",
    dateTimeLabel: "Date/Heure",
    userIdLabel: "ID de l'utilisateur",
    messageBody: "Corps du message",
    separatorLine: "Ligne de séparation",
    saveFileName: "service_",
    termsAcceptanceNotification: "Demandez au Super Administrateur d'accepter les conditions d'utilisation de votre entreprise.",
    tenantWithFalseAcceptTermsNotification: "Demander au Super Administrateur d'accepter les conditions d'utilisation du locataire",
    acceptTermsSuccess: "Conditions acceptées avec succès pour le domaine",
    errorAcceptingTerms: "Erreur lors de l'acceptation des conditions",
    notifyActionClose: "Pour fermer",
    tenantId: "ID du locataire",
    superadminProfile: "superadministrateur",
    tenantNotFound: "Locataire non trouvé",
    deleteNoteConfirmation: "Voulez-vous vraiment supprimer la note « {note.notes} » ?",
    deleteNoteSuccess: "Remarque {note.notes} supprimée !",
    attentionTitle: "Attention",
    noLabel: "Non",
    yesLabel: "Oui",
    autoCloseWarning: "Le support {ticket.id} a été automatiquement résolu après qu'il n'y ait eu aucune interaction pendant plus de {time} minutes.",
    autoCloseEnabled: "Réponse automatique activée",
    autoCloseDisabled: "Réponse automatique désactivée",
    noInteraction: "Aucune interaction",
    timeExceeded: "Temps dépassé",
    ticketsLoaded: "Services chargés !",
    ticketsLoadedTabs: "Services chargés dans les onglets ouverts, en attente et fermés !",
    attention: "Attention",
    syncOldMessagesWarning: "Voulez-vous vraiment synchroniser l’historique des messages ?",
    syncOldMessagesHint: "Seuls les nombres positifs sont autorisés",
    syncOldMessagesSuccess: "Veuillez patienter quelques instants, le système va importer {value} messages pour l'utilisateur {ticketFocado.contact.number}",
    invalidValue: "La valeur saisie par l'utilisateur n'est pas valide ou n'est pas fournie.",
    sendProtocolConfirmation: "Voulez-vous envoyer un protocole pour ce service ?",
    protocolSent: "Protocole {protocol} envoyé pour prendre en charge {ticketFocado.id}",
    protocolError: "Il n'a pas été possible d'envoyer le protocole de service.",
    limitMessagesLabel: "Limite de messages à importer",
    loading: "Chargement...",
    ratingMessageTitle: "Évaluez ce service :",
    notificationMessageFrom: "Message de: ",
    loadMoreTicketsMessage: "Lorsque vous atteignez la fin de la liste des tickets, les nouvelles demandes sont chargées dans tous les onglets, le cas échéant. Cette action se répétera toutes les 3 secondes !",
    companyInactive: "Votre entreprise est inactive !",
    contactAdmin: "Veuillez contacter votre administrateur système !",
    logoutError: "Impossible de se déconnecter",
    tenantInactiveMessage: "L'entreprise est inactive, elle sera déconnectée prochainement.",
    sessionExpired: "La session a expiré, vous serez redirigé vers la connexion.",
    deleteMessageConfirmation: "Voulez-vous vraiment supprimer le message ?",
    deleteMessageWarning: "Les anciens messages ne seront pas supprimés dans le client.",
    deleteError: "Impossible de supprimer le message",
    loadUsersError: "Problème de chargement des utilisateurs",
    loadUserError: "Problème de chargement de l'utilisateur",
    loadError: "Une erreur s'est produite lors de la tentative de sauvegarde des données : ",
    contactSanitizeSuccess: "Contact désinfecté avec succès...",
    contactSanitizeError: "Erreur lors de la désinfection du contact...",
    loadMessage: "Veuillez patienter pendant le chargement des billets...",
    confirmExitTitle: "Êtes-vous sûr de vouloir quitter cette page ?",
    confirmExitMessage: "Lorsque vous quittez cette page, le contrôle de la connexion sera perdu."
  },
  dashTickets: {
    noQueue: "Pas de file d'attente",
    consultTicketsError: "Erreur lors de la consultation des services",
    open: "Ouvrir",
    tickets: "Services",
    panelTitle: "Panneau de service",
    filtersButtonLabel: "Filtres",
    closeOpenTicketsButtonLabel: "Fermer les rendez-vous ouverts",
    closePendingTicketsButtonLabel: "Fermer les appels en attente",
    transferTicketButtonLabel: "Service de transfert entre utilisateurs",
    markAllAsReadButtonLabel: "Marquer tous les messages comme lus",
    filtersTitle: "Filtres",
    dateStartLabel: "Commencer",
    dateEndLabel: "Fin",
    showAllLabel: "(Admin) - Tout afficher",
    viewTypeLabel: "Type de vue",
    updateButtonLabel: "Pour mettre à jour",
    visionButtonLabel: "Vision",
    selectDestinationQueueLabel: "File d'attente de destination",
    selectUserLabel: "Utilisateur cible",
    transferWithoutQueueLabel: "Transférer tous les rendez-vous sans faire la queue",
    transferBetweenUsersLabel: "Service de transfert entre utilisateurs",
    resolvePendingTicketsLabel: "Résoudre toutes les demandes en attente",
    resolveOpenTicketsLabel: "Résoudre tous les appels ouverts",
    selectSourceUserLabel: "Utilisateur source",
    attentionMessage: "Attention, les utilisateurs doivent avoir accès aux mêmes files d'attente",
    actionInMassMessage: "Veuillez noter qu’il s’agit d’une action de masse et qu’elle ne peut pas être annulée.",
    transferTicketsConfirmation: "Transférer tous les rendez-vous sans faire la queue",
    closeTicketsConfirmation: "Résoudre toutes les demandes en attente",
    closeOpenTicketsConfirmation: "Résoudre tous les appels ouverts",
    userSelectionError: "Sélectionnez l'utilisateur et la file d'attente de destination pour les services en attente !",
    userDestinationSelectionError: "Sélectionnez l’utilisateur cible !",
    massActionError: "Problème lors de l'exécution du transfert",
    markAllAsReadMessage: "Messages marqués comme lus.",
    massCloseTicketsError: "Problème de fermeture des services de masse",
    updateTicketError: "Problème de mise à jour du ticket",
    ticketsReloadMessage: "Veuillez patienter, la page se rechargera une fois l'action terminée.",
    loadQueuesError: "Problème de chargement des files d'attente",
    loadUsersError: "Problème de chargement des utilisateurs",
    selectUserAndQueueError: "Sélectionnez l'utilisateur et la file d'attente de destination pour les services en attente !",
    transferError: "Problème lors de l'exécution du transfert",
    closeMassTicketsError: "Problème de fermeture des services de masse",
    resolveTicketsBatchMessage: "Les tickets sont résolus par blocs de 10 éléments.",
    reloadPageMessage: "Veuillez patienter, la page se rechargera une fois l'action terminée.",
    markAllAsReadError: "Problème de marquage de tout comme lu",
    viewTypeUser: "Utilisateur",
    viewTypeUserSynthetic: "Utilisateur synthétique",
    viewTypeQueue: "File d'attente",
    viewTypeQueueSynthetic: "Fil synthétique",
    transferBetweenQueuesButtonLabel: "Transférer entre les files d'attente",
    transferBetweenChannelsButtonLabel: "Transférer entre les canaux",
    transferBetweenQueuesTitle: "Transférer les tickets entre les files d'attente",
    transferBetweenQueuesDescription: "Sélectionnez la file d'attente source et la file d'attente de destination",
    sourceQueueLabel: "File d'attente source (laissez vide pour transférer tous sans file d'attente)",
    destinationQueueLabel: "File d'attente de destination *",
    destinationUserLabel: "Utilisateur de destination (optionnel)",
    transferBetweenChannelsTitle: "Transférer les tickets entre les canaux",
    transferBetweenChannelsDescription: "Sélectionnez le canal source et le canal de destination",
    sourceChannelLabel: "Canal source",
    destinationChannelLabel: "Canal de destination *",
    selectSourceChannelError: "Sélectionnez le canal source !",
    selectDestinationQueueError: "Sélectionnez la file d'attente de destination !",
    selectDestinationChannelError: "Sélectionnez le canal de destination !",
    transferBetweenQueuesSuccess: "Tickets transférés avec succès entre les files d'attente",
    transferBetweenChannelsSuccess: "Tickets transférés avec succès entre les canaux",
    transferBetweenQueuesError: "Erreur lors du transfert des tickets entre les files d'attente",
    transferBetweenChannelsError: "Erreur lors du transfert des tickets entre les canaux"
  },
  dashBoard: {
    dataValidation: "Attention, il n'est pas possible de vérifier le jour même le début et la fin de la période.",
    attendanceValueEvolution: "Évolution des valeurs",
    values: "Valeurs",
    attendances: "Services",
    filterGroups: "Groupes de filtres",
    filterPrivateChats: "Filtrez les statistiques pour les conversations privées !",
    controlPanel: "Panneau de contrôle",
    attendanceByChannelName: "Service par canal (Nom)",
    undefined: "Indéfini",
    attendanceByChannel: "Service par canal (Connexion)",
    attendanceByQueue: "Service de file d'attente",
    attendanceByReasons: "Service à la demande",
    attendanceByStatus: "Service par statut",
    attendanceByUser: "Service par utilisateur",
    evolutionByChannel: "Évolution par canal",
    evolutionByValue: "Évolution par valeur",
    attendanceEvolution: "Évolution des services",
    user: "Utilisateur",
    pending: "En attente",
    attending: "Présent",
    resolved: "Complété",
    total: "Total",
    avgRating: "Notes moyennes",
    avgFirstResponse: "Temps moyen de première réponse",
    avgHandlingTime: "Durée moyenne de service (DMS)",
    hours: "heures",
    minutes: "minutes",
    scheduleStartDate: "Date/heure du rendez-vous",
    scheduleEndDate: "Date/heure du rendez-vous",
    generate: "Pour générer",
    noDataHere: "Aucune donnée ici !",
    totalTickets: "Nombre total de participants",
    activeTickets: "Actif",
    receptiveTickets: "Réceptif",
    newContacts: "Nouveaux contacts",
    avgResponseTime: "Temps moyen de première réponse",
    performanceByTeam: "Performance de l'équipe",
    ticketsByChannel: "Service par canal",
    ticketsByQueue: "Service de file d'attente",
    ticketsByStatus: "Service par statut",
    ticketsByUser: "Service par utilisateur",
    ticketsEvolutionChannels: "Évolution par canal",
    ticketsEvolutionByPeriod: "Évolution des services",
    notInformed: "Pas informé",
    evolutionByPeriod: "Services"
  },
  home: {
    welcome: "Bienvenue",
    user: "Utilisateur",
    subtitle: "Accès rapide aux principales fonctionnalités du système",
    dashboard: "Tableau de bord",
    dashboardDescription: "Voir les statistiques et les métriques de performance",
    attendance: "Tickets",
    attendanceDescription: "Gérer vos tickets et conversations",
    contacts: "Contacts",
    contactsDescription: "Voir et gérer votre liste de contacts",
    quickInfo: "Informations rapides",
    info1: "Accéder au tableau de bord pour des analyses détaillées",
    info2: "Système optimisé pour de meilleures performances",
    info3: "Parcourir le menu pour plus de fonctionnalités",
    quickLinks: "Liens rapides",
    reports: "Rapports",
    reportsDescription: "Voir les rapports et analyses",
    settings: "Paramètres",
    settingsDescription: "Configurer le système selon vos besoins"
  },
  confirmation: {
    irreversibleAction: "Attention : Ceci est une action irréversible !",
    deleteTenant: "Voulez-vous vraiment supprimer la société {id} ?"
  },
  socketInitial: {
    updateWhatsapps: "Mise à jour WhatsApp reçue",
    deleteWhatsapps: "Suppression de WhatsApp reçue",
    updateSession: "Session mise à jour",
    loadingScreen: "La connexion est en cours de synchronisation : ",
    readySession: "Connexion mise à jour.",
    wavoipSession: "Connexion synchronisée avec Wavoip : ",
    updateImport: "Synchronisation de l'appareil avec l'application.",
    refreshImport: "Mise à jour des messages de l'appareil.",
    changeBattery: "La batterie mobile WhatsApp doit être chargée.",
    ticketUpdate: "Ticket mis à jour.",
    ticketCreate: "Nouveau ticket créé.",
    chatCreate: "Nouveau chat créé.",
    ticketNotification: "Nouveau client en attente.",
    messageAck: "Message reconnu.",
    messageDelete: "Message supprimé.",
    messageUpdate: "Message mis à jour.",
    contactUpdate: "Contact mis à jour.",
    privateMsgReceived: "Nouveau message privé reçu.",
    unreadPrivateMsgReceived: "Message privé non lu reçu.",
    notificationPrivateMsgReceived: "Notification de message privé reçu.",
    userVerified: "Utilisateur vérifié.",
    userChatUpdate: "Statut de l'utilisateur mis à jour.",
    userStatusUpdate: "Statut de l'utilisateur mis à jour"
  },
  mainLayout: {
    novo: {
      wabaTemplate: "Pour WABA, un nouveau ticket sera créé pour l’envoi de modèles",
      userNotFound: "Erreur : Utilisateur introuvable. Veuillez vous reconnecter.",
      whatsappNotFound: "Erreur : WhatsApp non sélectionné.",
      numberNotFound: "Erreur : Numéro non fourni.",
      numberInvalid: "Erreur : Numéro invalide.",
      invalidIds: "Identifiants invalides pour la vérification des tickets",
      invalidData: "Erreur : Données invalides pour créer un ticket.",
      ticketCreated: "Nouveau ticket créé pour {contatoName} - Ticket : {ticketId}",
      ticketCreatedError: "Erreur : Ticket créé mais sans ID valide."
    },  
    noTutorials: 'Aucun tutoriel trouvé',
    tutoriais: 'Tutoriais',
    checkAllInternalMessages: "Marquer tout comme lu (Chat privé)",
    checkAllInternalMessagesSuccess: "Tous les messages ont été marqués comme lus (Chat privé)",
    checkAllInternalMessagesError: "Erreur lors du marquage de tous les messages comme lus (Chat privé)",
    checkAllMessages: "Tout marquer comme lu (Services)",
    checkAllMessagesSuccess: "Tous les messages ont été marqués comme lus (Présence)",
    checkAllMessagesError: "Erreur lors du marquage de tous les messages comme lus (Services)",
    webphone: "Téléphone Web SIP",
    cookieWarning: "Vider le cache et les cookies. Cliquez sur OK pour recharger la page !",
    cleanCookies: "Redémarrage",
    task: "Tâche",
    dashboard: "Panneau",
    atendimentos: "Services",
    contatos: "Contacts",
    disparoMassa: "fusillade de masse",
    grupos: "Groupes",
    chat: "Chat",
    kanban: "Kanban",
    tarefas: "Tâches",
    perfil: "Profil",
    logout: "Sortir",
    close: "Pour fermer",
    send: "Envoyer",
    cancel: "Annuler",
    startConversation: "Démarrer une conversation unique",
    internalMessages: "Messages internes",
    tasks: "Tâches",
    taskLimit: "Limite",
    taskStatus: "Statut",
    taskPriority: "Priorité",
    taskDate: "Date limite",
    message: "Message",
    number: "Nombre",
    whatsappId: "identifiant WhatsApp",
    taskName: "Tâche",
    taskPriorityMap: {
      high: "Haut",
      medium: "Moyenne",
      low: "Faible",
      none: "Aucun"
    },
    taskStatusMap: {
      delayed: "En retard",
      pending: "En attente",
      finished: "Complété"
    },
    user: "Utilisateur",
    hello: "Bonjour",
    userOnline: "Utilisateur en ligne",
    userOffline: "Utilisateur hors ligne",
    newChat: "Démarrer une conversation unique",
    reopenCall: "Réouverture des appels Wavoip",
    internalMessage: "Message interne",
    menu: "Menu",
    notifications: "Notifications",
    noNewNotifications: "Rien de nouveau ici !",
    newMessagesInInternalChat: "Nouveaux messages non lus dans le chat interne !",
    unreadMessagesInInternalChat: "Messages non lus dans le chat interne !",
    sharedTicketInvites: "Invitations de tickets partagés",
    pendingClientsInQueue: "Clients en attente dans la file d'attente",
    contact: "Contact",
    yes: "Oui",
    no: "Non",
    attention: "Attention!",
    userProfile: "Profil utilisateur",
    updateUser: "Mettre à jour l'utilisateur",
    acceptTerms: "Accepter les conditions",
    error: "Erreur",
    successfullySent: "Message envoyé avec succès",
    acceptTermsMessage: "Veuillez accepter les conditions d'utilisation pour continuer.",
    invalidTenant: "Locataire invalide. Demandez au Super Administrateur de valider l'email.",
    profile: "Profil"
  },
  scriptMainLayout: {
    groupTabAccess: "Accédez à l'onglet Groupes dans le support pour ouvrir l'appel.",
    tokenUpdateError: "Impossible d'actualiser le jeton.",
    noQueue: "pas de file d'attente",
    attention: "Attention!!",
    logoutError: "Impossible de se déconnecter.",
    messagesLoadError: "Erreur lors du chargement des messages internes.",
    tasksLoadError: "Erreur lors du chargement des tâches.",
    markAsReadError: "Erreur lors du marquage du message comme lu.",
    deleteMessageError: "Erreur lors de la suppression du message.",
    fetchMessagesError: "Erreur lors de la récupération des messages non lus.",
    contactHasOngoingTicket: "{contact} a un service en cours.",
    adminCanAssign: "Seul un administrateur peut vous attribuer ce service.",
    openTicketConfirmation: "{contact} a un service en cours (Service : {ticketId} - File d'attente : {queueId}). Voulez-vous ouvrir le service ?",
    callNotification: "Nouvel appel entrant",
    messageSent: "Message envoyé au numéro : {number}",
    messageSendError: "Erreur lors de l'envoi d'un message individuel : {error}",
    internalMessagesNotification: "Vous avez {count} messages non lus.",
    tasksNotification: "Vous avez {count} tâches en attente.",
    acceptTermsSuccess: "Conditions acceptées avec succès.",
    acceptTermsError: "Demandez au Super Administrateur d'accepter les conditions d'utilisation de votre entreprise.",
    adminContact: "Veuillez contacter votre administrateur système !",
    betaMenuAccess: "Menu bêta disponible uniquement pour les utilisateurs autorisés.",
    taskStatus: {
      delayed: "🚩 En retard",
      pending: "🔄 En attente",
      finished: "✅ Terminé"
    },
    priorityStatus: {
      high: "⚡⚡⚡ Élevé",
      medium: "⚡⚡ Moyenne",
      low: "⚡ Télécharger",
      none: "😉 Aucun"
    },
    notifications: {
      chatUpdate: "Mise à jour dans le chat.",
      newMessage: "Nouveau message de {contact}.",
      messageFrom: "Message de {contactName}",
      notificationBody: "{messageBody} - {heure}"
    }
  },
  menuCategories: {
    automacao: 'Automatisation',
    dashboard: 'Tableau de bord',
    atendimento: 'Service',
    gestaoComercial: 'Gestion Commerciale',
    comunicacaoMarketing: 'Communication et MKT',
    administracao: 'Administration',
    gestao: 'Gestion',
    configuracao: 'Configuration et API',
    tenantsLicenciamento: 'Tenants et Licences',
    configuracoes: 'Paramètres',
    canaisIntegracao: 'Canaux et Intégration',
    sistema: 'Système'
  },
  menu: {
    funil: {
      title: "Entonnoir",
      caption: "Gestion des opportunités"
    },
    dashboard: {
      title: "Panneau",
      caption: ""
    },
    atendimentos: {
      title: "Services",
      caption: "Liste des services"
    },
    contatos: {
      title: "Contacts",
      caption: "Liste de contacts"
    },
    disparoMassa: {
      title: "fusillade de masse",
      caption: "Envoi de messages en masse"
    },
    grupos: {
      title: "Groupes",
      caption: "Gestion des groupes en vrac"
    },
    chat: {
      title: "Chat",
      caption: "Chat"
    },
    kanban: {
      title: "Kanban",
      caption: "CRM"
    },
    tarefas: {
      title: "Tâches",
      caption: "Liste de tâches"
    },
    mensagensRapidas: {
      title: "Messages rapides",
      caption: "Messages prédéfinis"
    },
    galeria: {
      title: "Galerie",
      caption: "Galerie de fichiers"
    },
    instagramComentarios: {
      title: 'Commentaires Instagram',
      caption: 'Gérer les commentaires'
    }
  },
  menuSupervisor: {
    canais: {
      title: "Chaînes",
      caption: "Canaux de communication"
    },
    relatorios: {
      title: "Rapports",
      caption: "Rapports généraux"
    },
    filas: {
      title: "Files d'attente",
      caption: "Inscription à la file d'attente"
    },
    equipes: {
      title: "Équipes",
      caption: "Équipes"
    },
    mensagensRapidas: {
      title: "Messages rapides",
      caption: "Messages prédéfinis"
    },
    chatbot: {
      title: "Chatbot",
      caption: "Robot de service"
    },
    agendamentos: {
      title: "Rendez-vous",
      caption: "Messages programmés"
    },
    aniversarios: {
      title: "Anniversaires",
      caption: "Messages programmés"
    },
    fechamento: {
      title: "Clôture",
      caption: "Messages de clôture"
    },
    etiquetas: {
      title: "Mots clés",
      caption: "Enregistrement de l'étiquette"
    },
    notas: {
      title: "Remarques",
      caption: "Notes de service"
    },
    protocolos: {
      title: "Protocoles",
      caption: "Protocoles de service"
    },
    avaliacoes: {
      title: "Avis",
      caption: "Évaluations de services"
    },
    horarioAtendimento: {
      title: "Horaires d'ouverture",
      caption: "Horaires d'ouverture"
    },
    campanhas: {
      title: "Campagne",
      caption: "Envoi de campagnes"
    }
  },
  callLogs: {
    downloadReport: "Télécharger le journal",
    title: "Journaux d'appels SIP",
    subtitle: "Enregistrements des appels SIP émis et reçus",
    columns: {
      id: "ID",
      originNumber: "Numéro d'origine",
      destinationNumber: "Numéro de destination",
      callStatus: "Statut de l'appel",
      callDuration: "Durée",
      createdAt: "Date de création",
      user: "Utilisateur"
    },
    status: {
      calling: "Appel en cours",
      received: "Reçu",
      accepted: "Accepté",
      completed: "Terminé",
      ended: "Terminé"
    }
  },    
  menuAdmin: {
    logligacao: {
      title: "Journal des appels",
      caption: "Journaux d'appels SIP"
    },      
    canais: {
      title: "Chaînes",
      caption: "Canaux de communication"
    },
    painelAtendimentos: {
      title: "Panneau de service",
      caption: "Aperçu des services"
    },
    relatorios: {
      title: "Rapports",
      caption: "Rapports généraux"
    },
    usuarios: {
      title: "Utilisateurs",
      caption: "Administrateur des utilisateurs"
    },
    filas: {
      title: "Files d'attente",
      caption: "Inscription à la file d'attente"
    },
    equipes: {
      title: "Équipes",
      caption: "Chat d'équipe"
    },
    mensagensRapidas: {
      title: "Messages rapides",
      caption: "Messages prédéfinis"
    },
    chatbot: {
      title: "Chatbot",
      caption: "Robot de service"
    },
    agendamentos: {
      title: "Rendez-vous",
      caption: "Messages programmés"
    },
    aniversarios: {
      title: "Anniversaires",
      caption: "Messages programmés"
    },
    fechamento: {
      title: "Clôture",
      caption: "Messages de clôture"
    },
    etiquetas: {
      title: "Mots clés",
      caption: "Enregistrement de l'étiquette"
    },
    notas: {
      title: "Remarques",
      caption: "Notes de service"
    },
    wavoip: {
      title: "Wavoip",
      caption: "Appels entrants et sortants"
    },
    protocolos: {
      title: "Protocoles",
      caption: "Protocoles de service"
    },
    avaliacoes: {
      title: "Avis",
      caption: "Évaluations de services"
    },
    horarioAtendimento: {
      title: "Horaires d'ouverture",
      caption: "Horaires d'ouverture"
    },
    campanhas: {
      title: "Campagne",
      caption: "Envoi de campagnes"
    },
    api: {
      title: "API",
      caption: "Intégration de systèmes externes"
    },
    configuracoes: {
      title: "Paramètres",
      caption: "Paramètres généraux"
    }
  },
  menuSuperAdmin: {
    backup: {
      title: 'Export',
      caption: 'Data Center'
    },
    migration: {
      title: 'Migration',
      caption: 'Migration de Locataires'
    },
    monitor: {
      title: "Moniteur",
      caption: "Surveillance du système"
    },
    assinatura: {
      title: "Signature",
      caption: "Gérer la licence"
    },
    tenants: {
      title: "Locataires",
      caption: "Locataires"
    },
    usuarios: {
      title: "Utilisateurs",
      caption: "Administrateur des utilisateurs"
    },
    email: {
      title: "E-mail",
      caption: "Récupération de mot de passe"
    },
    planos: {
      title: "Plans",
      caption: "Enregistrer les plans"
    },
    pagamentos: {
      title: "Paiements",
      caption: "Détails de paiement"
    },
    canais: {
      title: "Chaînes",
      caption: "Canaux de communication"
    },
    api: {
      title: "API",
      caption: "API SuperAdmin"
    },
    appWaba: {
      title: 'App WABA',
      caption: 'Paramètres App Facebook'
    },
    atualizar: {
      title: "Pour mettre à jour",
      caption: "Maintenance du système"
    },
    customizar: {
      title: "Personnaliser",
      caption: "Logos et couleurs"
    },
    notificacao: {
      title: "Notification",
      caption: "Messages internes"
    },
    filasTarefas: {
      title: "Files d'attente et tâches",
      caption: "Bull et Redis"
    },
    dadosInternos: {
      title: "Données internes",
      caption: "Messages internes"
    },
    terminal: {
      title: "Terminal",
      caption: "Terminal SSH"
    },
    provedoresGlobais: {
      title: "Fournisseurs Globaux",
      caption: "Configurations Globales des Fournisseurs"
    }
  },
  menuBloqueio: {
    configuracoes: {
      title: "Paramètres",
      caption: "Paramètres généraux"
    }
  },
  grupoIndex: {
    tabs: {
      bulkgroups: "Groupes et participants",
      bulkgroups2: "Manipuler les groupes",
      bulkuser: "Manipuler les utilisateurs",
      banlist: "Numéros interdits",
      wordlist: "Mots interdits",
      greetings: "Message de bienvenue",
      farewell: "Message d'adieu"
    },
    banner: {
      stability: "Cette option est disponible pour Baileys et Whatsapp-Web.JS. Lorsque vous utilisez des actions de masse, privilégiez Whatsapp-Web.JS, car il offre plus de stabilité lors de la gestion des groupes.",
      warning: {
        title: "Avis sur les automatisations de groupe",
        blockRisk: "WhatsApp peut-il bloquer ou bannir mon numéro ?",
        realRisk: "Oui, la possibilité est réelle et doit être prise au sérieux !",
        spamTolerance: "WhatsApp a une tolérance zéro pour le spam !",
        monitoring: "Il adopte des règles strictes et surveille très strictement l’envoi de messages et l’exécution d’actions de masse.",
        attention: "ATTENTION : Si 2% des destinataires signalent votre numéro ou marquent votre message comme spam, votre numéro sera bloqué/banni !"
      }
    },
    dialog: {
      confirmButton: "Continuer",
      cancelButton: "Sortir"
    },
    notifications: {
      colorsLoadError: "Erreur lors du chargement des couleurs.",
      noStoredColors: "Aucune couleur stockée dans localStorage."
    }
  },
  grupoGeralBanlist: {
    table: {
      columns: {
        id: "#",
        number: "Nombre",
        userId: "Utilisateur",
        groupId: "Groupe",
        createdAt: "Date",
        actions: "Actes"
      },
      title: "Interdictions"
    },
    placeholders: {
      search: "Situer"
    },
    buttons: {
      add: "Pour ajouter",
      delete: "Supprimer"
    },
    dialogs: {
      deleteSingle: "Voulez-vous vraiment supprimer le Ban « {banId} » ?",
      deleteAll: "Voulez-vous vraiment supprimer tous les enregistrements d'interdiction {banCount} ?"
    },
    notifications: {
      deleteSuccess: "Ban {banId} supprimé !",
      deleteAllSuccess: "Tous les enregistrements d'interdiction ont été supprimés !",
      groupNameError: "Erreur lors de la récupération du nom du groupe pour {groupId}."
    }
  },
  grupoGeralDespedida: {
    table: {
      columns: {
        id: "#",
        message: "Message",
        userId: "Utilisateur",
        groupId: "Groupe",
        createdAt: "Date",
        actions: "Actes"
      },
      title: "Adieux"
    },
    placeholders: {
      search: "Situer"
    },
    buttons: {
      add: "Pour ajouter",
      delete: "Supprimer"
    },
    dialogs: {
      deleteSingle: "Voulez-vous vraiment supprimer l'adieu « {despedidaId} » ?",
      deleteAll: "Voulez-vous vraiment supprimer tous les {despedidaCount} enregistrements de Despedida ?"
    },
    notifications: {
      deleteSuccess: "Adieu {despedidaId} supprimé !",
      deleteAllSuccess: "Tous les enregistrements d'adieu ont été supprimés !",
      groupNameError: "Erreur lors de la récupération du nom du groupe pour {groupId}."
    }
  },
  grupoGeralSaudacao: {
    table: {
      columns: {
        id: "#",
        message: "Message",
        userId: "Utilisateur",
        groupId: "Groupe",
        createdAt: "Date",
        actions: "Actes"
      },
      title: "Salutations"
    },
    placeholders: {
      search: "Situer"
    },
    buttons: {
      add: "Pour ajouter",
      delete: "Supprimer"
    },
    dialogs: {
      deleteSingle: "Voulez-vous vraiment supprimer le message d'accueil « {greetingId} » ?",
      deleteAll: "Êtes-vous sûr de vouloir supprimer tous les enregistrements de salutation {saudacaoCount} ?"
    },
    notifications: {
      deleteSuccess: "Salutation {saudacaoId} supprimée !",
      deleteAllSuccess: "Tous les enregistrements de salutations ont été supprimés !",
      groupNameError: "Erreur lors de la récupération du nom du groupe pour {groupId}."
    }
  },
  grupoGeralWordlist: {
    table: {
      columns: {
        id: "#",
        word: "Mot",
        userId: "Utilisateur",
        groupId: "Groupe",
        createdAt: "Date",
        actions: "Actes"
      },
      title: "Mots interdits"
    },
    placeholders: {
      search: "Situer"
    },
    buttons: {
      add: "Pour ajouter",
      delete: "Supprimer",
      activateWordWatch: "Activer Word Watch"
    },
    dialogs: {
      deleteSingle: "Voulez-vous vraiment supprimer le mot « {wordId} » ?",
      deleteAll: "Voulez-vous vraiment supprimer tous les {wordCount} enregistrements Word ?"
    },
    notifications: {
      deleteSuccess: "Mot {wordId} supprimé !",
      deleteAllSuccess: "Tous les enregistrements Word ont été supprimés !",
      groupNameError: "Erreur lors de la récupération du nom du groupe pour {groupId}."
    }
  },
  grupoGeralModalDespedida: {
    dialog: {
      titleCreate: "Créer un adieu",
      titleEdit: "Modifier Adieu"
    },
    form: {
      message: "Message d'adieu",
      whatsappId: "identifiant WhatsApp",
      group: "Groupe"
    },
    notifications: {
      createSuccess: "Adieu créé !",
      editSuccess: "Adieu édité !",
      errorFetchingGroups: "Erreur lors de la liste des groupes.",
      errorSaving: "Une erreur s'est produite lors de l'enregistrement de l'adieu."
    }
  },
  grupoGeralModalBan: {
    dialog: {
      titleCreate: "Créer une interdiction",
      titleEdit: "Interdiction de modifier"
    },
    form: {
      number: "Numéro d'interdiction",
      whatsappId: "identifiant WhatsApp",
      group: "Groupe"
    },
    notifications: {
      createSuccess: "Interdiction créée !",
      editSuccess: "Interdiction éditée !",
      errorFetchingGroups: "Erreur lors de la liste des groupes.",
      errorSaving: "Une erreur s'est produite lors de l'enregistrement du Ban."
    }
  },
  grupoGeralModalSaudacao: {
    dialog: {
      titleCreate: "Créer un message d'accueil",
      titleEdit: "Modifier le message d'accueil"
    },
    form: {
      message: "Message de bienvenue",
      whatsappId: "identifiant WhatsApp",
      group: "Groupe"
    },
    notifications: {
      createSuccess: "Salutation créée !",
      editSuccess: "Salutation éditée !",
      errorFetchingGroups: "Erreur lors de la liste des groupes.",
      errorSaving: "Une erreur s'est produite lors de l'enregistrement du message d'accueil."
    }
  },
  grupoGeralModalWordlist: {
    dialog: {
      titleCreate: "Créer un mot",
      titleEdit: "Modifier le mot"
    },
    form: {
      word: "Mot (minuscule)",
      whatsappId: "identifiant WhatsApp",
      group: "Groupe"
    },
    notifications: {
      createSuccess: "Mot créé !",
      editSuccess: "Mot édité !",
      errorFetchingGroups: "Erreur lors de la liste des groupes.",
      errorSaving: "Une erreur s'est produite lors de l'enregistrement du mot."
    }
  },
  grupoGeralModalWordlistGrupo: {
    dialog: {
      title: "Activer Word Watch"
    },
    form: {
      connection: "Connexion",
      toggleLabel: "Marche/Arrêt"
    },
    notifications: {
      selectConnection: "Veuillez sélectionner une connexion.",
      updateSuccess: "WhatsApp {connection} mis à jour avec succès !",
      updateError: "Erreur lors de la mise à jour de WhatsApp. Consultez les journaux pour plus de détails."
    }
  },
  grupoMassa1: {
    title: "Générateur de groupe",
    sections: {
      createMassGroups: "Créer des groupes en masse",
      listParticipants: "Liste des participants"
    },
    form: {
      connection: "Connexion",
      groups: "Groupes",
      groupId: "Groupe d'identification",
      participants: "Participants"
    },
    notifications: {
      selectConnection: "Veuillez sélectionner une connexion.",
      selectGroups: "Veuillez sélectionner un ou plusieurs groupes.",
      fieldsReset: "Champs réinitialisés, cette page sera actualisée.",
      loadingParticipants: "Veuillez patienter, chargement de tous les participants du groupe...",
      loadingGroups: "Veuillez patienter, chargement des groupes..."
    },
    actions: {
      listGroupIds: "Liste des identifiants de groupe",
      listParticipants: "Liste des participants",
      exportToXLS: "Exporter vers XLS",
      clear: "Pour nettoyer"
    }
  },
  grupoMassa2: {
    title: "Manipuler les groupes",
    form: {
      connection: "Connexion",
      groups: "Groupes",
      changeTitle: "Changer le titre",
      newTitle: "Nouveau titre",
      changeDescription: "Description du changement",
      newDescription: "Nouvelle description",
      changeImageUrl: "Changer l'image (URL)",
      newImageUrl: "Nouvelle image",
      changeImageFile: "Changer l'image (télécharger)",
      uploadImage: "Téléchargement d'images",
      changePermission: "Modifier l'autorisation",
      adminOnly: "Seuls les administrateurs peuvent envoyer des messages"
    },
    actions: {
      modify: "Modifier",
      clear: "Pour nettoyer"
    },
    notifications: {
      selectConnection: "Veuillez sélectionner une connexion.",
      selectGroups: "Veuillez sélectionner un ou plusieurs groupes.",
      fillTitle: "Veuillez remplir l'option avec le nouveau titre.",
      fillDescription: "Veuillez remplir l'option avec la nouvelle description.",
      fillImageUrl: "Veuillez remplir l'option avec l'URL de la nouvelle image.",
      uploadFile: "Veuillez télécharger le nouveau fichier."
    },
    loading: {
      modifyingGroups: "Veuillez patienter, modification des données du groupe..."
    }
  },
  grupoMassaUsuarios: {
    title: "Manipuler les utilisateurs",
    actions: {
      execute: "Exécuter",
      clear: "Effacer les champs",
      reload: "Recharger la page"
    },
    form: {
      connection: "Connexion",
      groups: "Groupes",
      promoteAdmins: "Promouvoir les administrateurs",
      demoteAdmins: "Rétrograder les administrateurs",
      addUsers: "Ajouter des utilisateurs",
      removeUsers: "Supprimer des utilisateurs",
      importContacts: "Importer des contacts",
      numbersInput: "Chiffres (séparés par des virgules)",
      csvImport: "Importer des numéros à partir d'un fichier CSV",
      selectContacts: "Sélectionner les contacts",
      numbersCommaSeparated: "Chiffres (séparés par des virgules)",
      importCSV: "Importer un fichier CSV"
    },
    notifications: {
      selectConnection: "Veuillez sélectionner une connexion.",
      selectGroups: "Veuillez sélectionner un ou plusieurs groupes.",
      fillContacts: "Veuillez sélectionner ou saisir des contacts.",
      clearFields: "Champs réinitialisés, cette page sera actualisée."
    },
    loading: {
      fetchingContacts: "Veuillez patienter, chargement de tous les contacts système...",
      executingActions: "Veuillez patienter, actions en cours..."
    }
  },
  grupoMassaModalCriarGrupo: {
    form: {
      createGroups: "Créer des groupes",
      connection: "Connexion",
      groupName: "Nom du groupe",
      participantNumber: "Numéro de participant",
      groupQuantity: "Nombre de groupes",
      importContacts: "Définir un contact / Sélectionner un contact",
      selectContact: "Sélectionnez Contact"
    },
    notifications: {
      selectConnection: "Veuillez sélectionner une connexion.",
      fillGroupName: "Veuillez remplir le champ avec le nom du ou des groupes.",
      fillParticipant: "Veuillez remplir le champ avec un contact à ajouter au(x) groupe(s) nouvellement créé(s).",
      selectContact: "Veuillez sélectionner un contact à ajouter au(x) groupe(s) nouvellement créé(s).",
      fillQuantity: "Veuillez remplir le champ avec le nombre de groupes créés."
    },
    loading: {
      fetchingContacts: "Veuillez patienter, chargement des contacts...",
      creatingGroups: "Veuillez patienter, création de groupes..."
    }
  },
  massaGeral: {
    tabs: {
      template: "Modèles de publipostage",
      templateVariable: "Modèles de courrier de masse + Variable",
      text: "fusillade de masse",
      textVariable: "Tir de masse + variable",
      sms: "Envoi de SMS en masse",
      report: "Rapport d'Envoi en Masse"
    },
    dialog: {
      title: "Avertissement de fusillade de masse",
      description: {
        importantNotice: {
          title: "WhatsApp peut-il bloquer ou bannir mon numéro ?",
          content: "Oui, la possibilité est réelle et doit être prise au sérieux !"
        },
        additionalInfo: {
          title: "WhatsApp a une tolérance zéro pour le spam !",
          content: "Il a des règles strictes et surveille de très près les messages de masse."
        },
        alert: {
          title: "ATTENTION",
          content: "Si 2% des destinataires signalent votre numéro ou marquent votre message comme spam, <b>votre numéro sera bloqué/banni !</b>"
        }
      },
      actions: {
        exit: "Sortir",
        continue: "Continuer"
      }
    }
  },
  relatorioBulkDispatch: {
    title: "Rapport d'Envoi en Masse",
    tooltip: {
      description: "Ce rapport affiche uniquement les envois de messages WhatsApp. Il n'inclut pas les envois Wavoip ou SMS."
    },
    filters: {
      status: "Statut",
      dispatchType: "Type d'Envoi"
    },
    actions: {
      search: "Rechercher",
      clear: "Effacer",
      viewDetails: "Voir les Détails"
    },
    columns: {
      id: "ID",
      status: "Statut",
      dispatchType: "Type",
      templateName: "Modèle",
      progress: "Progression",
      createdAt: "Créé le",
      actions: "Actions"
    },
    status: {
      pending: "En attente",
      processing: "En cours",
      completed: "Terminé",
      failed: "Échoué",
      cancelled: "Annulé"
    },
    dispatchType: {
      template: "Modèle",
      template_variable: "Modèle avec Variables",
      text: "Texte",
      text_variable: "Texte avec Variables"
    },
    details: {
      title: "Détails de l'Envoi",
      general: "Informations Générales",
      statistics: "Statistiques",
      errors: "Erreurs",
      id: "ID",
      status: "Statut",
      dispatchType: "Type d'Envoi",
      createdAt: "Créé le",
      startedAt: "Démarré le",
      completedAt: "Terminé le",
      totalMessages: "Total des Messages",
      sentMessages: "Messages Envoyés",
      failedMessages: "Messages Échoués",
      pendingMessages: "Messages en Attente",
      delay: "Délai"
    },
    notifications: {
      errorLoading: "Erreur lors du chargement des rapports",
      errorLoadingDetails: "Erreur lors du chargement des détails de l'envoi"
    }
  },
  massaSMS: {
    form: {
      selectService: "Sélectionner un service",
      minSeconds: "Minimum (secondes)",
      maxSeconds: "Maximum (secondes)",
      contacts: "Contacts",
      selectContacts: "Sélectionner les contacts",
      numbersCommaSeparated: "Chiffres (séparés par des virgules)",
      importCSV: "Importer des numéros à partir d'un fichier CSV",
      message: "Message"
    },
    notifications: {
      selectService: "Veuillez sélectionner un service.",
      validMinMax: "Veuillez saisir des nombres valides pour min et max.",
      enterNumbersMessage: "Veuillez entrer les chiffres et le message.",
      successComtele: "L'envoi en masse via Comtele a démarré avec succès.",
      successConecta: "L'envoi de masse via ConectaStartup a démarré avec succès.",
      successLivson: "L'envoi en masse via BHI a démarré avec succès.",
      errorSending: "Erreur lors de l'envoi des messages : {error}",
      fieldsCleared: "Des champs propres."
    }
  },
  massaTexto: {
    form: {
      bulkSend: "Envois en masse",
      availableFunctions: "Cette fonctionnalité est disponible pour Baileys et Whatsapp-Web.JS",
      availableFunctionsWaba: "Cette fonctionnalité est disponible pour WABA",
      selectConnection: "identifiant WhatsApp",
      minSeconds: "Minimum (secondes)",
      maxSeconds: "Maximum (secondes)",
      contacts: "Contacts",
      groups: "Groupes",
      tags: "Mots clés",
      kanban: "Kanban",
      selectTag: "Sélectionner l'étiquette",
      selectKanban: "Sélectionnez Kanban",
      selectContacts: "Sélectionner les contacts",
      numbersCommaSeparated: "Chiffres (séparés par des virgules)",
      importCSV: "Importer des numéros à partir d'un fichier CSV",
      includeText: "Inclure du texte",
      message: "Message",
      includeMedia: "Inclure le média (URL)",
      mediaUrl: "URL du média",
      mediaDescription: "Description du média",
      includeRecordedAudio: "Inclure l'audio enregistré",
      audioUrl: "URL audio (.ogg)",
      includeFile: "Inclure le fichier (télécharger)",
      fileDescription: "Description du fichier",
      recordedAudio: "Audio enregistré",
      send: "Envoyer",
      clear: "Effacer les champs",
      fetchingContacts: "Veuillez patienter, chargement de tous les contacts système..."
    },
    notifications: {
      selectConnection: "Veuillez sélectionner une connexion.",
      enterValidNumbers: "Veuillez saisir des nombres valides pour min et max.",
      chooseSendOption: "Veuillez choisir une ou plusieurs options d'expédition.",
      enterMessage: "Veuillez saisir le message à envoyer.",
      enterMediaDetails: "Veuillez saisir l'URL et la description du fichier à télécharger.",
      enterAudioDetails: "Veuillez saisir l'URL du fichier audio.",
      uploadFile: "Veuillez télécharger le fichier et saisir la description qui sera envoyée.",
      uploadingMessages: "Veuillez patienter, vos messages sont en cours de chargement.",
      messagesSent: "Messages envoyés : {sent} sur {total}.",
      errorSendingMessages: "Erreur lors de l'envoi des messages.",
      errorFetchingTags: "Erreur lors de la récupération des balises.",
      errorFetchingKanbans: "Erreur lors de la récupération des kanbans.",
      errorFilteringContactsByTag: "Erreur lors du filtrage des contacts par étiquette.",
      errorFilteringContactsByKanban: "Erreur lors du filtrage des contacts par kanban.",
      destiny: "Veuillez saisir les numéros de destination"
    }
  },
  massaTextoVariavel: {
    form: {
      availableFunctions: "Fonctionnalités disponibles pour Baileys et Whatsapp-Web.JS",
      minSeconds: "Minimum (secondes)",
      maxSeconds: "Maximum (secondes)",
      includeText: "Inclure du texte",
      includeMedia: "Inclure le média (URL)",
      mediaUrl: "URL du média",
      mediaDescription: "Description du média",
      includeRecordedAudio: "Inclure l'audio enregistré",
      audioUrl: "URL audio (.ogg)",
      includeFile: "Inclure le fichier (télécharger)",
      recordedAudio: "Audio enregistré",
      send: "Envoyer",
      clear: "Pour nettoyer",
      dataInputLabel: "nombre,variable1,variable2,variable3...",
      instructions: "Saisissez votre message/description multimédia et utilisez les variables entre doubles accolades.",
      example: "Par exemple : Bonjour, var1 ! Votre statut est var2 et votre âge est var3..."
    },
    notifications: {
      enterValidNumbers: "Veuillez saisir des nombres valides pour min et max.",
      destiny: "Veuillez saisir les numéros de destination.",
      chooseSendOption: "Veuillez choisir une ou plusieurs options d'expédition.",
      enterMessage: "Veuillez saisir le message à envoyer.",
      enterMediaDetails: "Veuillez saisir l'URL et la description du fichier à télécharger.",
      enterAudioDetails: "Veuillez saisir l'URL du fichier à télécharger.",
      uploadFile: "Veuillez télécharger le fichier et saisir la description qui sera envoyée.",
      uploadingMessages: "Veuillez patienter, vos messages sont en cours de chargement.",
      messagesSent: "Messages envoyés : {sent} sur {total}."
    }
  },
  massaTemplate: {
    title: "Envois en nombre",
    form: {
      selectTemplate: "Sélectionner un modèle",
      selectTag: "Sélectionner l'étiquette",
      fetchingContacts: "Veuillez patienter, chargement des contacts...",
      numbersCommaSeparated: "Chiffres séparés par des virgules",
      importCSV: "Importer un fichier CSV",
      minSeconds: "Minimum (secondes)",
      maxSeconds: "Maximum (secondes)",
      contacts: "Contacts",
      selectConnection: "Choisissez une connexion",
      errorFetchingTags: "Erreur lors du chargement des étiquettes",
      chooseTemplate: "Choisissez un modèle",
      headerFormat: "Format d'en-tête : {format}",
      variableNumber: "Valeur",
      closeTicket: "Fermer le ticket après l'envoi"
    },
    notifications: {
      chooseMinTime: "Veuillez choisir un temps minimum.",
      chooseMaxTime: "Veuillez choisir un temps maximum supérieur au temps minimum.",
      chooseConnection: "Veuillez choisir une connexion.",
      chooseContact: "Veuillez choisir un contact.",
      messagesSent: "Modèles envoyés : {sent} sur {total}.",
      errorSendingTemplate: "Erreur lors de l'envoi des modèles.",
      uploadingMessages: "Veuillez patienter, envoi des messages... Ne fermez pas cette page tant que l'envoi n'est pas terminé.",
      uploadingTemplate: "Veuillez patienter, chargement des modèles...",
      errorFetchingTags: "Erreur lors de la récupération des balises.",
      errorUploadingCSV: "Erreur lors du téléchargement du fichier CSV.",
      invalidFileType: "Type de fichier invalide. Seuls les fichiers CSV sont autorisés.",
      csvUploadedSuccessfully: "Fichier CSV téléchargé avec succès.",
      errorProcessingCSV: "Erreur lors du traitement du fichier CSV.",
      errorReadingFile: "Erreur lors de la lecture du fichier.",
      invalidCSVContent: "Contenu CSV invalide.",
      noValidNumbersFound: "Aucun numéro valide trouvé dans le fichier CSV."
    },
    table: {
      variable: "Variable",
      value: "Valeur"
    }
  },
  massaTemplateVariavel: {
    title: "Envois en masse avec variables",
    form: {
      availableFunctions: "Cette fonctionnalité est disponible pour l'API officielle (WABA)",
      chooseTemplate: "Sélectionner un modèle",
      minSeconds: "Minimum (secondes)",
      maxSeconds: "Maximum (secondes)",
      numberFormat: "Nombres (format : nombre, variable1, variable2)",
      fetchingTemplates: "Chargement des modèles..."
    },
    notifications: {
      messagesSent: "Modèles envoyés : {sent} sur {total}.",
      uploadingMessages: "Veuillez patienter, envoi de messages... Ne fermez pas cette page jusqu'à la fin de l'envoi.",
      chooseConnection: "Veuillez choisir une connexion.",
      chooseTemplate: "Veuillez sélectionner un modèle.",
      completeFields: "Veuillez remplir tous les champs obligatoires.",
      sendingCompleted: "Soumissions terminées.",
      errorFetchingTemplates: "Erreur lors du chargement des modèles. Vérifiez votre connexion API."
    },
    variables: {
      templateVariables: "Variables de modèle",
      expectedFormat: "Format attendu pour chaque ligne : nombre, {variables}"
    }
  },
  sessao: {
    compactView: "Affichage compact",
    normalView: "Affichage normal",
    page: "Page",
    title: "Canaux de communication",
    addChannel: "Ajouter une chaîne",
    defaultConnection: "Connexion standard",
    editChannel: "Modifier la chaîne",
    revalidateWebhook: "Revalider le Webhook",
    revalidateCoexWebhook: "Revalider le Webhook COEX",
    revalidateConnection: "Revalider la connexion",
    coexWebhookRevalidated: "Webhook COEX revalidé avec succès !",
    metaTokenNotFound: "Token Meta introuvable. Configurez le token dans la section des paramètres.",
    phoneNumberIdNotFound: "ID du numéro de téléphone introuvable.",
    chatbot: "ChatBot",
    queue: "File d'attente",
    user: "Utilisateur",
    qrCode: "Code QR",
    connect: "Connecter",
    edit: "Modifier",
    newQrCode: "Nouveau code QR",
    connecting: "De liaison",
    disconnect: "Déconnecter",
    deleteConnection: "Supprimer la connexion",
    setAsDefault: "Définir par défaut",
    closeOpenTickets: "Fermer tous les services ouverts",
    closePendingTickets: "Fermer tous les appels en attente",
    syncMessagesUpdate: "Mettre à jour l'heure de synchronisation des messages",
    syncMessages: "Synchroniser les messages",
    syncPrompt: "Attention!! Voulez-vous vraiment synchroniser ? ",
    syncMessagesPrompt: "Limite de messages à importer",
    syncWarningPrompt: "Le processus peut prendre quelques minutes en fonction de la taille de votre liste de discussion.",
    syncMessagesHint: "Seuls les nombres positifs sont autorisés",
    noQueueTooltip: "La file d'attente ne sera attribuée que si le service n'a pas déjà de file d'attente définie manuellement ou par le chatbot.",
    noUserTooltip: "L'utilisateur ne sera attribué que si le service n'a pas encore d'accompagnateur défini manuellement ou par le chatbot.",
    processStarted: "Processus démarré.",
    closingOpenTickets: "Clôture des rendez-vous ouverts.",
    closingPendingTickets: "Fermeture des services en attente.",
    syncingMessages: "Veuillez patienter quelques instants, le système va importer {limit} messages par utilisateur.",
    syncError: "Erreur lors de la tentative de synchronisation des messages.",
    invalidValue: "La valeur saisie par l'utilisateur n'est pas valide ou n'est pas fournie.",
    actionError: "Erreur lors de la tentative d'exécution de l'action.",
    actionSuccess: "Action effectuée avec succès.",
    noPageConfigured: "Aucune page configurée.",
    selectChatbot: "Sélectionnez ChatBot",
    selectQueue: "Sélectionner la file d'attente",
    selectUser: "Sélectionner l'utilisateur",
    defaultTooltip: "Définissez cette connexion par défaut.",
    deleteTooltip: "Supprimer définitivement cette connexion.",
    syncTooltip: "Synchroniser les anciens messages.",
    actionWarningDelete: "Attention! Voulez-vous vraiment supprimer cette connexion ?",
    disconnectWarning: "Attention! Êtes-vous sûr de vouloir déconnecter cette session ?",
    defaultSet: "La connexion par défaut a été définie avec succès.",
    closeOpenTicketsPrompt: "Attention!! Voulez-vous vraiment fermer tous les appels ouverts de ce canal ?",
    closePendingTicketsPrompt: "Attention!! Voulez-vous vraiment fermer tous les appels en attente de ce canal ?",
    disconnectPrompt: "Attention!! Êtes-vous sûr de vouloir vous déconnecter ?",
    deleteChannelPrompt: "Attention!! Voulez-vous vraiment supprimer ?",
    deleteChannelMessage: "Les discussions ouvertes dans ce canal seront fermées et pourront être vues sur le panneau d'assistance, mais ne seront plus accessibles.",
    tokenRequiredTelegram: "Il est nécessaire d'informer le token pour Telegram.",
    qrCodeGenerated: "Code QR généré avec succès.",
    errorGeneratingQrCode: "Erreur lors de la génération du code QR.",
    whatsappSaveError: "Erreur lors de l'enregistrement du numéro WhatsApp.",
    whatsappSaved: "Connexion ajoutée avec succès."
  },
  sessaoItemStatus: {
    waitingQrCode: "En attente de lecture du code QR",
    clickQrCodeButton: "Cliquez sur le bouton « QR CODE » et lisez le QR Code avec votre téléphone portable pour démarrer la session",
    disconnectedError: "Impossible de démarrer la communication pour ce canal.",
    whatsappDisconnected: "Assurez-vous que votre téléphone est connecté à Internet et réessayez, ou demandez un nouveau code QR.",
    wabaDisconnected: "Essayez de vous connecter à nouveau. Si l’erreur persiste, confirmez que les jetons sont corrects.",
    telegramDisconnected: "Essayez de vous connecter à nouveau. Si l’erreur persiste, confirmez que le jeton est correct.",
    instagramDisconnected: "Essayez de vous connecter à nouveau. Si l’erreur persiste, vérifiez que les informations d’identification sont correctes.",
    connectionEstablished: "Connexion établie",
    noDataLoading: "Chargement des données...",
    lostConnection: "Connexion cellulaire perdue",
    checkPhoneConnection: "Assurez-vous que votre téléphone est connecté à Internet et que WhatsApp est ouvert, ou cliquez sur le bouton « Déconnecter » pour obtenir un nouveau code QR.",
    establishingConnection: "Établir une connexion.",
    mightTakeTime: "Cela peut prendre un certain temps...",
    lastUpdate: "Dernière mise à jour",
    contingencyInactive: "Plan de Contingence"
  },
  sessaoModalQrcode: {
    title: "Scannez le QR Code pour démarrer la session",
    pairingCode: "Code d'appariement : ",
    waitingQrCode: "En attendant le QR Code",
    openQrCodeInNewTab: "Ouvrir le code QR dans un nouvel onglet",
    qrCodeIssue: "Si vous rencontrez des difficultés pour le lire, demandez un nouveau QR Code.",
    newQrCode: "Nouveau code QR"
  },
  sessaoModalWhatsapp: {
    messengerPageId: "ID de la Página de Messenger",
    appId: "ID App",
    instagramId: "ID Instagram",
    tokenInstagram: "Token Instagram",
    tokenNumber: "Numéro de Token",
    idNumber: "Numéro de ID",
    novo: {
      configuracaoSmtp: "Configuration SMTP",
      servidorSmtp: "Serveur SMTP",
      exemploSmtp: "Ex: smtp.gmail.com",
      porta: "Port",
      exemploPorta: "Ex: 587 pour TLS, 465 pour SSL",
      conexaoSegura: "Connexion sécurisée (SSL/TLS)",
      habilitarConexaoSegura: "Activer pour les connexions sécurisées",
      usuarioEmail: "Utilisateur/Email",
      seuEmailAutenticacao: "Votre email d'authentification",
      senha: "Mot de passe",
      senhaAplicativo: "Votre mot de passe ou mot de passe d'application",
      emailRemetente: "Email de l'expéditeur",
      emailRemetenteHint: "Email qui apparaîtra comme expéditeur",
      emailResposta: "Email de réponse (optionnel)",
      emailRespostaHint: "Email où les réponses seront envoyées",
      configuracaoOAuth2: "Configuration OAuth2 (Recommandé pour Gmail)",
      clientIdOAuth2: "Client ID de Google Cloud Console",
      clientIdOAuth2Hint: "Client ID de Google Cloud Console",
      exemploClientIdOAuth2: "Ex: 123456789-abcdef.apps.googleusercontent.com",
      clientSecretOAuth2: "Client Secret de Google Cloud Console",
      clientSecretOAuth2Hint: "Client Secret de Google Cloud Console",
      redirectUri: "Redirect URI (optionnel)",
      redirectUriHint: "URL de rappel pour OAuth2 (laisser vide pour utiliser la valeur par défaut)",
      exemploRedirectUri: "Ex: https://votredomaine.com/auth/callback",
      comoObterCredenciaisOAuth2: "Comment obtenir des identifiants OAuth2 :",
      acessarGoogleCloudConsole: "Accédez à https://console.cloud.google.com",
      criarProjeto: "Créez un projet ou sélectionnez-en un existant",
      habilitarGmailAPI: "Activez l'API Gmail",
      criarCredenciaisOAuth2: "Créez des identifiants OAuth2",
      configureUrlsAutorizadas: "Configurez les URLs autorisées",
      gmailOAuth2: "Gmail OAuth2 :",
      gmailOAuth2Hint: "Gmail exige l'authentification OAuth2 pour les applications tierces.",
      configurarOAuth2: "Configurer OAuth2",
      status: "Statut :",
      statusHint: "Authentifié et fonctionnel",
      oAuth2Configurado: "OAuth2 Configuré :",
      oAuth2ConfiguradoHint: "Authentification OAuth2 active pour Gmail.",
      protocoloAtivo: "Protocole actif :",
      statusDaConexao: "Statut de la connexion :",
      detalhes: "Détails :",
      testarSmtp: "Tester SMTP",
      verificarStatus: "Vérifier le statut",
      abraUrlAutorizacao: "Ouvrez l'URL d'autorisation et suivez les instructions. Après avoir autorisé, vous recevrez un code.",
      errorConfigurarOAuth2: "Erreur lors de la configuration OAuth2 : ",
      configOAuth2: "Configuration OAuth2",
      completarConfiguracao: "Terminer la configuration",
      cancelar: "Annuler",
      errorCompletarOAuth2: "Erreur lors de la finalisation d'OAuth2 : ",
      salveWhatsAppPrimeiro: "Enregistrez d'abord WhatsApp pour tester la connexion SMTP",
      conexaoSmtpTestadaComSucesso: "Connexion SMTP testée avec succès !",
      falhaNoTesteSmtp: "Échec du test SMTP : ",
      erroAoTestarSmtp: "Erreur lors du test SMTP : ",
      statusDaConexaoAtualizado: "Statut de la connexion mis à jour !",
      erroAoVerificarStatus: "Erreur lors de la vérification du statut : "
    },    
    selectNewChannel1: "Le transfert des conversations peut entraîner des problèmes de synchronisation en cas de volume élevé ou entre différents types (API) de canaux. Dans ce cas, effectuez une sauvegarde des conversations au préalable et ne supprimez pas l'ancien canal avant de vous assurer que toutes les conversations ont été transférées.",
    selectNewChannel2: "Sélectionnez le nouveau canal pour transférer les conversations. Attention ! Cette action est irréversible.",
    selectNewChannel3: "Si le volume est élevé ou qu’il s’agit de types (API) différents de canaux, effectuez le changement de données directement dans la base de données avec l’aide d’un DBA.",
    transferringChannels: "Transfert d'appels...",
    checkErrors: "Oups ! Vérifier les erreurs...",
    whatsappSaved: "Connexion ",
    sucess: " avec succès!",
    edited: "édité",
    created: "créé",
    variables: "Variables",
    attentionEvo: "Une fois la chaîne Evolution créée, le nom ne peut plus être modifié. Évitez d'utiliser des espaces ou des caractères spéciaux car ils seront supprimés automatiquement.",
    title: "Ajouter ou modifier une chaîne",
    editChannel: "Ajouter ou modifier une chaîne",
    createChannel: "Ajouter ou modifier une chaîne",
    configureAfterCreate: "Ce champ peut être configuré après la création du canal",
    type: "Taper",
    tokenTelegram: "Jeton Telegram",
    pairingCode: "Code d'appariement",
    exactNumber: "Numéro de compte WhatsApp exact",
    informationTab: "Information",
    recommendationsTab: "Recommandations",
    wppWarning: {
      0: "Avant de connecter votre WhatsApp au système, supprimez la connexion à WhatsApp Web.",
      1: "Cela dépend du smartphone",
      2: "Nécessite une reconnexion périodique.",
      3: "Pour un fonctionnement parfait, gardez votre téléphone synchronisé, toujours allumé et connecté à Internet, désactivez l'économiseur d'écran et gardez l'application WhatsApp ouverte.",
      4: "Archivez les conversations inutiles ou anciennes sur votre téléphone portable",
      5: "Nous vous recommandons d'utiliser le navigateur Chrome et le système d'exploitation Windows.",
      6: "N'ouvrez pas WhatsApp Web avec le numéro synchronisé sur la plateforme dans un autre navigateur. Si cela se produit, le fonctionnement peut être affecté.",
      7: "Service non officiel",
      8: "Nécessite une reconnexion périodique",
      9: "Utilisez de préférence des VPS situés au Brésil et dans votre État",
      10: "Nous vous recommandons d'utiliser le navigateur Chrome et le système d'exploitation Windows.",
      11: "Peut présenter des problèmes de synchronisation tels que la perte et la réception de messages"
    },
    wabaAdvantages: {
      0: "Stabilité de connexion garantie",
      1: "Aucun risque d'interdiction",
      2: "Sécurité contre le vol de compte",
      3: "Permet l'utilisation des boutons",
      4: "Permet l'utilisation de modèles"
    },
    typeMessage: "Entrez le message",
    save: "Sauvegarder",
    user: "Utilisateur",
    numberId: "Identification du numéro de téléphone",
    bmId: "Identification du compte WhatsApp Business",
    apiVersion: "Version de l'API Meta",
    tokenWaba: "Jeton Meta Business Manager",
    igData: "Détails du compte Instagram",
    transferChannel: "Canal de transfert",
    selectNewChannel: "Sélectionnez un nouveau canal pour transférer les appels",
    newChannel: "Nouvelle chaîne",
    confirm: "Confirmer",
    attention: "Attention",
    cancel: "Annuler",
    timeSelection: "Sélectionnez l'heure",
    birthdayDateMessage: "Message d'anniversaire",
    selectHub: "Sélectionnez un hub",
    importMessage: "Importer des messages depuis l'appareil",
    importMessageCaption: "En activant cette option, les messages de l'appareil seront importés dans le système.",
    importGroupMessage: "Importer des messages de groupe",
    dateHourSync: "Date et heure de début de l'importation",
    queueImport: "File d'attente pour importer des messages",
    qrCodeWarning1: "Cet événement ne fonctionne que lors de la lecture du QRCode.",
    qrCodeWarning2: "Lors de l'importation, désactivez le chatbot interne et les autres interactions, et gardez les heures de fonctionnement ouvertes, car chaque message entrant dans le système interagira avec ces paramètres, s'ils sont actifs.",
    ok: "D'ACCORD",
    dateHourEndSync: "Date et heure de fin d'importation",
    finalizeTicket: "Fermeture des tickets après l'importation",
    chatGptConfig: {
      model: "Modèle ChatGPT",
      title: "Paramètres ChatGPT",
      apiKey: "Clé API ChatGPT",
      organizationKey: "Clé d'organisation ChatGPT",
      stopWord: "Mot pour désactiver ChatGPT",
      prompt: "Option n°1 : invite ChatGPT",
      resetHistory: "Restaurer l'historique ChatGPT",
      assistantOption: "Option n°2 : Assistants ChatGPT",
      assistantId: "Entrez l'identifiant de l'assistant",
      resetPrompt: "Après avoir modifié l'invite, l'historique ChatGPT doit être restauré en cliquant sur le bouton ci-dessous :",
      removeAssistant: "Assistant de suppression",
      voiceModel: "Modèle de voix (alliage, écho, fable, onyx, nova, miroitement)",
      chatgptVoice: "Activer les réponses vocales (ChatGPT Voice)"
    },
    lmConfig: {
      title: "Paramètres du studio LM",
      url: "URL de LM Studio",
      model: "Modèle LLM",
      stopWord: "Mot pour désactiver LM Studio",
      prompt: "Demande d'admission aux LLM"
    },
    geminiConfig: {
      title: "Paramètres Gémeaux",
      url: "Clé API Gemini",
      model: "modèle Gémeaux",
      stopWord: "Un mot pour éteindre les Gémeaux",
      prompt: "Invite pour les Gémeaux"
    },
    qwenConfig: {
      title: "Paramètres Qwen",
      url: "Clé API Qwen",
      model: "Modèle Qwen",
      stopWord: "Mot pour éteindre Qwen",
      prompt: "Invite pour Qwen"
    },
    claudeConfig: {
      title: "Les paramètres de Claude",
      url: "Clé API de Claude",
      model: "Le modèle de Claude",
      stopWord: "Mot pour éteindre Claude",
      prompt: "Invite pour Claude"
    },
    deepseekConfig: {
      title: "Paramètres de Deepseek",
      url: "Clé API Deepseek",
      model: "Modèle Deepseek",
      stopWord: "Mot pour désactiver Deepseek",
      prompt: "Invite pour Deepseek"
    },
    grokConfig: {
      title: "Paramètres Grok",
      url: "Clé API Grok",
      model: "Modèle Grok",
      stopWord: "Mot pour éteindre Grok",
      prompt: "Invite pour Grok"
    },
    ollamaConfig: {
      title: "Paramètres d'Ollama",
      url: "URL d'Ollama",
      model: "Modèle LLM",
      stopWord: "Mot pour éteindre Ollama",
      prompt: "Demande d'admission aux LLM"
    },
    proxyConfig: {
      useProxy: "Utiliser un proxy",
      proxyUrl: "URL du proxy",
      proxyUser: "Utilisateur proxy",
      proxyPass: "Mot de passe proxy"
    },
    enable: {
      webPush: "Activer le Web Push (bêta)",
      webPush2: "En activant cette option, le système enverra des notifications à l'application",
      contingency: "Contingence",
      contingency2: "Si actif: le canal est actif et recevra des messages. Si inactif: le canal restera connecté, mais ne recevra pas de messages.",
      autoEvaluation: "Activer l'évaluation automatique",
      autoEvaluation2: "En activant cette option, l'évaluation du service sera envoyée automatiquement lors de la résolution de chaque ticket.",
      transcribeAudio: "Activer la transcription audio",
      transcribeAudio2: "En activant cette option, les audios reçus seront transcrits.",
      transcribeAudio5: "Configuration JSON",
      transcribeAudio4: "Saisissez les paramètres au format JSON pour Google Speech-To-Text.",
      transcribeAudio3: "Configuration de la transcription audio (JSON)",
      autoDistribution: "Activer la distribution automatique",
      autoDistribution2: "En activant cette option, les nouveaux tickets seront répartis uniformément entre les préposés du système.",
      destroyMessage: "Activer la destruction des messages",
      destroyMessage2: "En activant cette option, les messages supprimés seront détruits du système.",
      birthdayMessage: "Activer l'envoi de messages aux personnes fêtant leur anniversaire",
      birthdayMessage2: "En activant cette option le jour de l'anniversaire du contact, le message défini dans le champ ci-dessous sera envoyé.",
      birthdayMessage3: "Message d'anniversaire",
      birthdayMessage4: "Message",
      birthdayMessage5: "Fichier (Télécharger le fichier après avoir créé la chaîne)",
      birthdayMessage6: "Choisir le fichier",
      birthdayMessage7: "Heure : le système ne prend pas en compte les minutes (saisissez l'heure complète - par exemple 12:00) :",
      birthdayMessage8: "Choisissez l'heure",
      ignoreBussinesHours: "Ignorer les heures d'ouverture",
      ignoreBussinesHours2: "Ignore les heures d'ouverture du système.",
      removeBirthdayFile: "Supprimer le fichier d'anniversaire",
      confirmRemoveBirthdayFile: "Confirmer la suppression",
      confirmRemoveBirthdayFileMessage: "Voulez-vous vraiment supprimer le fichier d'anniversaire ?",
      birthdayFileRemoved: "Fichier d'anniversaire supprimé avec succès !",
      externalIntegration: "Activer l'arrêt automatique des intégrations externes",
      externalIntegration2: "En activant cette option, lors de l'ouverture d'un service, les interactions de ChatGPT, Typebot, Dify, N8N et DialogFlow seront désactivées.",
      waitProcessExternalInteraction: "Activer l'attente du traitement des messages avec des intégrations externes (Typebot, ChatGPT...)",
      waitProcessExternalInteraction2: "Lorsque vous recevez plusieurs messages d'assistance, le système ne traitera les nouveaux messages qu'une fois que le premier message aura reçu une réponse. Les messages reçus entre-temps n'interagiront pas avec l'intégration externe."
    },
    farewell: "Adieu",
    farewellMessage: "Message d'adieu au service",
    automaticClosure: "Mot-clé pour la fermeture automatique",
    automaticClosure2: "Il s'agit d'un mot-clé qui, une fois reçu, fermera automatiquement le ticket.",
    wavoipWarn: "Pour connecter plusieurs jetons, saisissez les clés séparées par des virgules (token1,token2...)",
    whatsappTypes: {
      waba: "WhatsApp officiel (WABA)",
      baileys: "WhatsApp Baileys (QRCode)",
      whatsapp: "WhatsApp WebJs (QRCode)",
      meow: "WhatsApp Meow (QRCode - Bêta)",
      evo: "WhatsApp Evolution (QRCode - Bêta)",
      telegram: "Télégramme",
      hub: "Hub Me prévenir"
    },
    conectLimit: "Limite de connexion atteinte",
    saveError: "Erreur lors de l'enregistrement de la chaîne. Veuillez réessayer.",
    wabaError: "Oups ! Données WABA incorrectes, veuillez vérifier si les identifiants APP, le jeton et les autorisations dans votre BM sont corrects...",
    instagramError: "Oups ! Données Instagram incorrectes, veuillez vérifier si le Page ID, le jeton et les autorisations sont corrects et si le compte Instagram Business est lié à la page Facebook...",
    integrationUrlCopied: "URL d'intégration copiée !",
    attentionMessage: "Voulez-vous vraiment transférer tous les services vers la nouvelle chaîne ? Cette action est irréversible.",
    noChannelSelected: "Choisissez la nouvelle chaîne !",
    newChannelSuccess: "Chaîne transférée avec succès !",
    connectionError: "Erreur lors du transfert de chaîne. Veuillez réessayer.",
    autoDistributeInfo: "Distribuez automatiquement les tickets entre les agents disponibles.",
    transcribeAudioInfo: "Transcription automatique des audios reçus en texte.",
    birthdayMessageInfo: "Configuration pour l'envoi automatique de messages d'anniversaire aux contacts.",
    farewellInfo: "Message envoyé automatiquement lors de la fermeture d'un service.",
    confirmChannelTransfer: "Êtes-vous sûr de vouloir transférer les appels vers ce canal ?",
    importMessagesInfo: "Importer des messages de l'appareil vers le système.",
    importGroupsInfo: "Inclure les messages de groupe lors de l'importation.",
    externalIntegrationDisableInfo: "Désactivez automatiquement les intégrations externes lors du démarrage des appels.",
    dialogflowConfig: {
      projectId: "ID du projet Dialogflow",
      language: "Langue",
      jsonFile: "Fichier de configuration JSON",
      jsonContent: "Contenu du fichier JSON"
    },
    wavoip: {
      title: "Paramètres Wavoip",
      token: "Jeton Wavoip",
      info: "Ajoutez des jetons séparés par des virgules pour plusieurs comptes."
    },
    hubConfig: {
      title: "Paramètres du hub",
      selectHub: "Choisissez un hub",
      hubIntegration: "Configuration du hub NotificaMe"
    },
    n8nConfig: {
      title: "Paramètres N8N",
      url: "URL N8N",
      instructions: "Configurez le flux d’intégration avec N8N dans cette section."
    },
    dialogConfig: {
      title: "Paramètres de Dialogflow",
      key: "Clé API Dialogflow",
      url: "URL de Dialogflow",
      name: "Nom du bot dans Dialogflow",
      restartWord: "Mot pour redémarrer Dialogflow",
      stopWord: "Mot pour désactiver Dialogflow",
      jsonContent: "Contenu du fichier Json",
      jsonFile: "Nom du fichier Json",
      lang: "Langue",
      projectId: "ID du projet",
      buttonWarning: "L'activation de cette option enverra des boutons aux options Dialogflow, sinon, des listes seront envoyées."
    },
    typeConfig: {
      title: "Paramètres de Typebot",
      key: "Clé API Typebot",
      url: "URL de Typebot",
      name: "Nom du bot sur Typebot",
      restartWord: "Mot pour redémarrer Typebot",
      stopWord: "Mot pour désactiver Typebot",
      type: "Type de configuration",
      unknowMessage: "Message pour réponse invalide",
      buttonChoose: "Message pour la sélection du bouton",
      buttons: "Activer les boutons",
      buttonWarning: "L'activation de cette option enverra des boutons aux options Typebot, sinon, des listes seront envoyées."
    },
    difyConfig: {
      title: "Paramètres Dify",
      key: "Clé API Dify",
      url: "Dify URL",
      restartWord: "Mot pour redémarrer Dify",
      stopWord: "Mot pour éteindre Dify",
      type: "Type de configuration",
      typeOptions: {
        agent: "Agent",
        textGenerator: "Générateur de texte",
        chatBot: "ChatBot",
        workflow: "Couler"
      }
    },
    additionalSettings: {
      title: "Couches supplémentaires pour les services non officiels",
      proxy: {
        useProxy: "Utiliser un proxy",
        proxyUrl: "URL du proxy (https://177.69.214.155:53281)",
        proxyUser: "Utilisateur proxy",
        proxyPass: "Mot de passe proxy"
      }
    },
    waiting: "Veuillez patienter, j'essaie de créer votre chaîne...",
    errors: {
      invalidJson: "Le format JSON saisi n'est pas valide. Veuillez corriger et réessayer.",
      requiredField: "Ce champ est obligatoire.",
      operationFailed: "L'opération a échoué. Veuillez réessayer."
    },
    success: {
      operationCompleted: "L'opération a été réalisée avec succès !",
      channelSaved: "La chaîne a été enregistrée avec succès !",
      transferCompleted: "Transfert effectué avec succès !"
    },
    variaveis: {
      0: {
        label: "Nom",
        value: "{{nom}}"
      },
      1: {
        label: "Salutation",
        value: "{{salutation}}"
      },
      2: {
        label: "Protocole",
        value: "{{protocole}}"
      },
      3: {
        label: "Courriel (si disponible)",
        value: "{{e-mail}}"
      },
      4: {
        label: "Téléphone",
        value: "{{phoneNumber}}"
      },
      5: {
        label: "Kanban (le cas échéant)",
        value: "{{kanban}}"
      },
      6: {
        label: "Accompagnateur (si présent)",
        value: "{{utilisateur}}"
      },
      7: {
        label: "Courriel du préposé (si en service)",
        value: "{{userEmail}}"
      },
      8: {
        label: "Prénom (le cas échéant)",
        value: "{{prénom}}"
      },
      9: {
        label: "Nom de famille (le cas échéant)",
        value: "{{nom de famille}}"
      },
      10: {
        label: "Société (le cas échéant)",
        value: "{{businessName}}"
      }
    },
    variaveisAniversario: {
      0: {
        label: "Nom",
        value: "{{nom}}"
      },
      1: {
        label: "Salutation",
        value: "{{salutation}}"
      },
      2: {
        label: "Courriel (si disponible)",
        value: "{{e-mail}}"
      },
      3: {
        label: "Téléphone",
        value: "{{phoneNumber}}"
      },
      4: {
        label: "Prénom (le cas échéant)",
        value: "{{prénom}}"
      },
      5: {
        label: "Nom de famille (le cas échéant)",
        value: "{{nom de famille}}"
      },
      6: {
        label: "Société (le cas échéant)",
        value: "{{businessName}}"
      }
    }
  },
  sessaoTenant: {
    communicationChannels: "Canaux de communication",
    tenant: "Locataire",
    name: "Nom",
    status: "Statut",
    session: "Session",
    number: "Nombre",
    lastUpdate: "Dernière mise à jour",
    default: "Standard",
    actions: "Actes",
    editConnection: "Modifier la connexion",
    deleteConnection: "Supprimer la connexion",
    deleteAttention: "Attention!! Voulez-vous vraiment supprimer ?",
    deleteWarning: "Ce n'est pas une bonne idée de supprimer si vous avez déjà généré des appels pour ce WhatsApp.",
    yes: "Oui",
    no: "Non",
    errorLoadingColors: "Erreur lors du chargement des couleurs"
  },
  sessaoTenantStatus: {
    waitingQrCode: "En attente de lecture du code QR",
    clickQrCodeButton: "Cliquez sur le bouton « QR CODE » et scannez le QR Code avec votre téléphone portable pour démarrer la session",
    connectionFailed: "Impossible de démarrer la communication pour ce canal.",
    whatsappCheck: "Assurez-vous que votre téléphone est connecté à Internet et réessayez, ou demandez un nouveau code QR",
    telegramCheck: "Essayez de vous connecter à nouveau. Si l’erreur persiste, confirmez que le jeton est correct.",
    instagramCheck: "Essayez de vous connecter à nouveau. Si l’erreur persiste, vérifiez que les informations d’identification sont correctes.",
    connectionEstablished: "Connexion établie !",
    connectionLost: "Connexion cellulaire perdue",
    ensureInternet: "Assurez-vous que votre téléphone est connecté à Internet et que WhatsApp est ouvert, ou cliquez sur le bouton « Déconnecter » pour obtenir un nouveau code QR",
    establishingConnection: "Établir une connexion.",
    thisMayTakeTime: "Cela peut prendre un certain temps...",
    lastUpdate: "Dernière mise à jour :"
  },
  relatorioContatosAtendimento: {
    unknownChannel: 'Canal inconnu',
    yes: "Oui",
    no: "Non",
    sheetName: "rapport",
    sheetTitle: " Rapport de service",
    title: "Rapport de ticket",
    filtersLegend: "Filtres (Date de création du ticket)",
    startDate: "Commencer",
    endDate: "Fin",
    status: {
      status: "Statut",
      open: "Ouvrir",
      closed: "Fermé",
      pending: "En attente"
    },
    queues: "Files d'attente",
    channels: "Chaînes",
    demands: "Demande",
    connections: "Relations",
    users: "Utilisateurs",
    minValue: "Valeur minimale",
    maxValue: "Valeur maximale",
    generateButton: "Pour générer",
    printButton: "Imprimer",
    excelButton: "Exceller",
    selectStatus: "Sélectionner les statuts",
    selectQueues: "Sélectionner les files d'attente",
    selectChannels: "Sélectionner les chaînes",
    selectDemands: "Sélectionner les demandes",
    selectConnections: "Sélectionner les connexions",
    selectUsers: "Sélectionner l'utilisateur",
    inputMinValue: "Entrez la valeur minimale",
    inputMaxValue: "Entrez la valeur maximale",
    tableHeaders: {
      ticketNotes: "Observations",
      id: "IDENTIFIANT",
      status: "Statut",
      name: "Nom",
      number: "Nombre",
      connection: "Connexion",
      lastMessage: "Dernier message",
      unreadMessages: "Messages non lus",
      demand: "Demande",
      queues: "Files d'attente",
      channel: "Canal",
      value: "Valeur",
      creationDate: "Date de création"
    },
    notifications: {
      loadError: "Erreur lors du chargement des données.",
      noDates: "Remplissez les dates pour générer le rapport.",
      noQueues: "Sélectionnez les files d’attente pour générer le rapport.",
      reportGenerated: "Rapport généré avec succès !",
      exportingError: "Erreur lors de l'exportation du tableau.",
      exportSuccess: "Rapport exporté avec succès !",
      exportError: "Erreur lors de l'exportation du rapport. Veuillez réessayer.",
      loadingMotives: "Problème de chargement des demandes.",
      loadingUsers: "Problème de chargement des utilisateurs.",
      loadingQueues: "Erreur lors du chargement des files d'attente."
    }
  },
  relatorioContatosCarteira: {
    sheetName: "rapport",
    sheetTitle: " Rapport de service",
    title: "Rapport sur les contacts par portefeuille",
    filters: "Filtres",
    tableHeaders: {
      name: "Nom",
      whatsapp: "WhatsApp",
      email: "E-mail",
      wallets: "Portefeuilles"
    },
    generateButton: "Générer un rapport",
    printButton: "Imprimer",
    excelButton: "Exporter vers Excel",
    notifications: {
      selectWallet: "Oups... Pour générer le rapport, vous devez sélectionner au moins un portefeuille.",
      reportGenerated: "Rapport généré avec succès !"
    }
  },
  relatorioContatosEstado: {
    sheetName: "rapport",
    sheetTitle: " Rapport de service",
    title: "Rapport de contact par État",
    filters: "Filtres",
    tableHeaders: {
      name: "Nom",
      whatsapp: "WhatsApp",
      email: "E-mail",
      state: "État"
    },
    generateButton: "Générer un rapport",
    printButton: "Imprimer",
    excelButton: "Exporter vers Excel",
    notifications: {
      selectState: "Oups... Pour générer le rapport, vous devez sélectionner au moins un État.",
      reportGenerated: "Rapport généré avec succès !"
    }
  },
  relatorioContatosEtiqueta: {
    sheetName: "rapport",
    sheetTitle: " Rapport de service",
    title: "Rapport sur les contacts par tags",
    filters: "Filtres",
    tableHeaders: {
      name: "Nom",
      whatsapp: "WhatsApp",
      email: "E-mail",
      tags: "Mots clés"
    },
    generateButton: "Générer un rapport",
    printButton: "Imprimer",
    excelButton: "Exporter vers Excel",
    notifications: {
      selectTags: "Oups... Pour générer le rapport, vous devez sélectionner au moins une étiquette.",
      reportGenerated: "Rapport généré avec succès !"
    }
  },
  relatorioContatosGeral: {
    sheetName: "rapport",
    sheetTitle: " Rapport de service",
    title: "Rapport de contact",
    filters: "Filtres (Date de création du contact)",
    tableHeaders: {
      empty: "Vide",
      extraInfo: "Informations supplémentaires",
      name: "Nom",
      whatsapp: "WhatsApp",
      email: "E-mail"
    },
    generateButton: "Générer un rapport",
    printButton: "Imprimer",
    excelButton: "Exporter vers Excel",
    notifications: {
      reportGenerated: "Rapport généré avec succès !"
    }
  },
  relatorioContatosResumo: {
    sheetName: "rapport",
    sheetTitle: " Rapport de service",
    title: "Rapport récapitulatif du service utilisateur",
    filters: "Filtres (date d'entretien)",
    tableHeaders: {
      name: "Nom",
      email: "E-mail",
      pending: "En attente",
      inProgress: "En service",
      resolved: "Résolu",
      total: "Total"
    },
    generateButton: "Générer un rapport",
    printButton: "Imprimer",
    excelButton: "Exporter vers Excel",
    notifications: {
      reportGenerated: "Rapport généré avec succès !"
    }
  },
  relatorioContatosKanban: {
    sheetName: "rapport",
    sheetTitle: " Rapport de service",
    title: "Rapport de contact par Kanban",
    filters: "Filtres",
    tableHeaders: {
      name: "Nom",
      whatsapp: "WhatsApp",
      email: "E-mail",
      kanban: "Kanbans"
    },
    generateButton: "Générer un rapport",
    printButton: "Imprimer",
    excelButton: "Exporter vers Excel",
    notifications: {
      reportGenerated: "Rapport généré avec succès !",
      selectKanban: "Oups... Pour générer le rapport, vous devez sélectionner au moins un Kanban."
    }
  },
  webphonecall: {
    callStatus: {
      accept: "Accepté",
      accept_elsewhere: "Accepté par un autre utilisateur",
      reject_elsewhere: "Rejeté par un autre utilisateur",
      terminate: "Complété",
      reject: "Rejeté",
      outcoming_calling: "Appel",
      preaccept: "Appel",
      relaylatency: "Appel",
      unknown: "Inconnu"
    },
    tooltips: {
      clear: "Pour nettoyer",
      close: "Pour fermer",
      call: "Pour se connecter",
      hangUp: "Pour éteindre",
      mute: "Subir une mutation",
      unmute: "Activer le son"
    },
    labels: {
      keypad: "Clavier",
      display: "Écran",
      duration: "Durée"
    },
    placeholders: {
      phoneNumber: "Entrez le numéro"
    }
  },
  webphone: {
    callStatus: {
      accept: "Accepté",
      accept_elsewhere: "Accepté par un autre utilisateur",
      reject_elsewhere: "Rejeté par un autre utilisateur",
      terminate: "Complété",
      reject: "Rejeté",
      outcoming_calling: "Appel",
      preaccept: "Appel",
      relaylatency: "Appel",
      offer: "Offre d'appel",
      unknown: "Inconnu"
    },
    tooltips: {
      clear: "Pour nettoyer",
      close: "Pour fermer",
      call: "Pour se connecter",
      hangUp: "Pour éteindre",
      accept: "Accepter",
      reject: "Rejeter",
      mute: "Subir une mutation",
      unmute: "Activer le son"
    },
    labels: {
      duration: "Durée",
      caller: "Demandeur",
      inbox: "Boîte de réception",
      phoneNumber: "Numéro de téléphone"
    },
    placeholders: {
      phoneNumber: "Entrez le numéro"
    }
  },
  chatgptField: {
    placeholders: {
      apiKey: "Entrez la clé API ChatGpt",
      orgId: "Entrez l'ID de l'organisation",
      offKeyword: "Mot-clé pour désactiver ChatGpt",
      prompt: "Invite pour ChatGpt"
    }
  },
  delayField: {
    placeholders: {
      delayValue: "Entrez la valeur du délai en secondes"
    }
  },
  n8nField: {
    placeholders: {
      n8nField: "Entrez la valeur du champ N8N"
    }
  },
  typebotField: {
    placeholders: {
      url: "Entrez l'URL de Typebot",
      name: "Entrez le nom du Typebot",
      offKeyword: "Mot-clé pour désactiver Typebot",
      restartKeyword: "Mot-clé pour redémarrer Typebot"
    }
  },
  mediaField: {
    labels: {
      uploadFile: "Message de composition multimédia",
      replaceFile: "Remplacer le fichier",
      downloadPdf: "Télécharger le PDF",
      captionPlaceholder: "Légende"
    },
    errors: {
      fileError: "Erreur lors du chargement du fichier",
      checkFiles: "Veuillez vérifier les fichiers téléchargés et réessayer."
    }
  },
  messageField: {
    placeholders: {
      typeMessage: "Tapez votre message ici..."
    },
    tooltips: {
      emoji: "Émoji",
      variables: "Variables"
    },
    variables: {
      name: "Nom",
      greeting: "Salutation",
      protocol: "Protocole",
      email: "Courriel (si disponible)",
      phoneNumber: "Téléphone",
      kanban: "Kanban (le cas échéant)",
      user: "Accompagnateur (si présent)",
      userEmail: "Courriel du préposé (si en service)",
      firstName: "Prénom (le cas échéant)",
      lastName: "Nom de famille (le cas échéant)",
      businessName: "Société (le cas échéant)"
    }
  },
  messageOptionField: {
    placeholders: {
      typeMessage: "Tapez votre message ici...",
      options: "Options"
    },
    hints: {
      options: "Les options seront traitées comme une liste/des boutons ou du texte brut en fonction de la prise en charge du canal cible."
    },
    tooltips: {
      emoji: "Émoji"
    }
  },
  webhookField: {
    placeholder: "Ajouter un Webhook (GET)",
    tooltip: {
      variables: "Variables"
    },
    variables: {
      name: "Nom",
      greeting: "Salutation",
      protocol: "Protocole",
      email: "Courriel (si disponible)",
      phoneNumber: "Téléphone",
      kanban: "Kanban (le cas échéant)",
      user: "Accompagnateur (si présent)",
      userEmail: "Courriel du préposé (si en service)",
      firstName: "Prénom (le cas échéant)",
      lastName: "Nom de famille (le cas échéant)",
      businessName: "Société (le cas échéant)"
    }
  },
  nodeForm: {
    ChatBotBlockField: "Bloquer ChatBot",
    OpportunityField: "Opportunité",
    GoogleAgendaField: "Google Agenda",
    ScheduleField: "Agenda",
    WebhookAllField: "Webhooks",
    ChatGPTField: "ChatGPT",
    ChatFlowField: "Flux ChatBOT",
    MessageField: "Message",
    MediaField: "Médias",
    TypebotField: "Typebot",
    ChatgptField: "ChatGpt",
    DelayField: "Retard",
    N8nField: "N8N",
    TagField: "Étiquette",
    KanbanField: "Kanban",
    WebhookField: "Webhook",
    routeTo: "Route vers",
    routeToChatgpt: "Lors de la réception du mot-clé pour désactiver, route vers:",
    key: "Clé",
    redefine: "Réinitialiser",
    welcomeMessage: "Message d'accueil (file d'attente/utilisateur)",
    welcomeMessage2: "Lorsque le bot dirige le service vers une file d'attente ou un utilisateur, ce message sera envoyé.",
    fallbackMessage: "Si aucune réponse attendue n'est envoyée",
    fallbackMessage2: "Cette exception sera appliquée si la réponse envoyée par le client ne correspond pas aux valeurs attendues selon les conditions de l'étape.",
    keyWord: "Mot-clé pour démarrer le flux",
    keyWord2: "Cette interaction sera déclenchée lorsque le client enverra le mot-clé défini et le client sera transféré vers la file d'attente/l'utilisateur configuré.",
    noAnswer: "Aucune réponse",
    noAnswer2: "Après le temps spécifié, si le client ne répond pas, le bot transmettra la demande à la file d'attente/à l'utilisateur fourni.",
    hourMessage: "Message d'absence",
    hourMessage2: "Après le temps imparti, si le client ne répond pas, le bot enverra ce message si le paramètre précédemment choisi est TERMINATE.",
    hourMessageWarning: "Message d'absence (Avertissement)",
    hourMessageWarning2: "À mi-chemin du temps déterminé, si le client ne répond pas, le bot enverra ce message.",
    messageWarningEnabled: "Activer le message d'avertissement",
    maxAttempts: "Nombre maximal de tentatives de bot",
    maxAttempts2: "Une fois le nombre maximal de tentatives de questions/réponses dépassé, si le client n'envoie pas de réponse valide, le bot la transmettra à la file d'attente/à l'utilisateur configuré.",
    message: "Message",
    message2: "Message de rétroaction",
    firstInteraction: "Ciblage lors de la première interaction",
    firstInteraction2: "Cette interaction sera déclenchée lors de la première interaction avec le client, et le client sera redirigé vers la file d'attente/l'utilisateur configuré.",
    outBussinesHour: "Si c'est en dehors des heures ouvrables",
    outBussinesHour2: "Cette interaction sera déclenchée si le client envoie un message en dehors des heures de service, et le client sera redirigé vers la file d'attente/l'utilisateur configuré.",
    selfDistribution: "Service de distribution automatique",
    selfDistribution2: "Non : Désactivé",
    selfDistribution3: "Aléatoire : définira l'utilisateur de manière aléatoire.",
    selfDistribution7: "Équilibré : définira l'utilisateur de manière équilibrée pour les utilisateurs de la file d'attente.",
    selfDistribution4: "Non",
    closeTicket: "Fin du service",
    closeTicket2: "Si le client saisit certaines des informations attendues, le service sera résilié.",
    endMessage: "Message de clôture (file d'attente/utilisateur)",
    endMessage2: "Lorsque le bot a fini de servir une file d'attente ou un utilisateur, ce message sera envoyé.",
    warning1: "L'étape représente le contact initial",
    warning2: "- S'il s'agit du premier contact du client, le système",
    warning3: "enregistrera automatiquement les informations du client dans le calendrier.",
    warning4: "- Le Bot interagira avec les services initiés par le client.",
    warning5: "- Le Bot cessera d'interagir si le service est repris par un utilisateur.",
    warning6: "- Les interactions avec Typebot, ChatGPT, N8N et Bloquer le Chatbot doivent toujours être le dernier nœud de l’étape ; le chatbot interne est désactivé et le service continue avec l’intégration définie.",
    warning7: "- Lorsque vous utilisez la condition regex, elle sera traitée avant toutes les autres conditions.",
    selfDistribution5: "Aléatoire",
    selfDistribution6: "Équilibré",
    selfDistribution8: "Séquentiel",
    selfDistribution9: "Séquentiel : Distribuera les tickets de manière séquentielle et rotative parmi les agents disponibles.",
    emoji: "Émoji",
    chatbotBlock: {
      chatbotBlocked: "ChatBot bloqué",
      chatbotActive: "ChatBot actif"
    },
    googleAgenda: {
      selectConfigHint: "Sélectionnez la configuration de Google Agenda",
      dateType: "Type de date",
      dateTypeHint: "Sélectionnez le type de date pour la planification",
      daysFromInteraction: "Jours depuis l'interaction",
      daysRequired: "Le nombre de jours est requis",
      daysFromInteractionHint: "Saisissez le nombre de jours depuis l'interaction pour la planification",
      eventTitleHint: "Saisissez le titre de l'événement",
      startDateTimeHint: "Saisissez la date et l'heure de début de l'événement",
      endDateTimeHint: "Saisissez la date et l'heure de fin de l'événement",
      descriptionHint: "Saisissez la description de l'événement",
      locationHint: "Saisissez le lieu de l'événement",
      sendNotifications: "Envoyer des notifications",
      reminderBefore: "Rappel avant",
      reminderMinutes: "Minutes avant",
      reminderMinutesHint: "Saisissez le nombre de minutes avant l'événement pour envoyer des notifications",
      today: "Aujourd'hui",
      tomorrow: "Demain",
      days_from_interaction: "Jours depuis l'interaction",
      custom: "Date personnalisée"
    },
    opportunity: {
      contactAutoFill: "Le contact sera automatiquement renseigné à partir du ticket",
      today: "Aujourd'hui",
      tomorrow: "Demain",
      days_from_interaction: "Jours depuis l'interaction",
      custom: "Date personnalisée",
      open: "Ouvert",
      win: "Gagné",
      lose: "Perdu",
      dateTypeHint: "Sélectionnez le type de date pour la planification",
      dateType: "Type de date"
    },
    schedule: {
      scheduleDateRequired: "La date est obligatoire",
      scheduleType: "Type de planification",
      scheduleTypeHint: "Sélectionnez le type de planification",
      scheduleDate: "Date et heure personnalisées",
      scheduleDateHint: "Saisissez la date et l'heure personnalisées pour la planification",
      uploadImage: "Téléverser une image",
      selectImage: "Sélectionner une image",
      deleteImage: "Supprimer l'image",
      message: "Message",
      messageHint: "Saisissez le message de planification",
      sendSignature: "Envoyer la signature",
      includeContactInfo: "Inclure les informations du contact",
      advancedSettings: "Paramètres avancés",
      delayBeforeSend: "Délai avant envoi",
      delayBeforeSendHint: "Saisissez la valeur du délai en secondes",
      customSchedule: "Date personnalisée",
      thirtyMinutes: "30 minutes",
      oneHour: "1 heure",
      tomorrow: "Demain",
      nextWeek: "La semaine prochaine",
      nextMonth: "Le mois prochain"
    },
    webhook: {
      url: "URL du Webhook",
      urlPlaceholder: "Saisissez l'URL du Webhook",
      urlHint: "Saisissez l'URL du Webhook",
      httpMethod: "Méthode HTTP",
      httpMethodHint: "Sélectionnez la méthode HTTP pour le webhook",
      headers: "En-têtes",
      headerKey: "Clé",
      headerKeyPlaceholder: "Saisissez la clé de l'en-tête",
      headerValue: "Valeur",
      headerValuePlaceholder: "Saisissez la valeur de l'en-tête",
      addHeader: "Ajouter un en-tête",
      body: "Corps",
      bodyType: "Type de corps",
      bodyContent: "Contenu du corps",
      bodyContentPlaceholder: "Saisissez le contenu du corps",
      bodyContentHint: "Saisissez le contenu du corps",
      formDataPlaceholder: "Saisissez le contenu du formulaire",
      formDataHint: "Saisissez le contenu du formulaire",
      testWebhook: "Tester le Webhook",
      testWebhookHint: "Testez le webhook pour vérifier son bon fonctionnement.",
      testSuccess: "Webhook testé avec succès !",
      testError: "Erreur lors du test du webhook",
      responseDetails: "Détails de la réponse",
      advancedSettings: "Paramètres avancés",
      timeout: "Délai d'attente",
      timeoutHint: "Saisissez la valeur du délai d'attente en secondes",
      retryAttempts: "Tentatives de réessai",
      retryAttemptsHint: "Saisissez le nombre de tentatives de réessai",
      retryDelay: "Délai de réessai",
      retryDelayHint: "Saisissez la valeur du délai en secondes",
      jsonBody: "Corps JSON",
      formBody: "Corps Formulaire",
      testSuccessDetails: "Réponse reçue du serveur (CORS empêche la lecture de la réponse dans le navigateur)",
      testErrorCors: "Erreur réseau ou CORS. Vérifiez si l'URL est accessible.",
      testErrorCorsDetails: "Erreur : {error}\n\nAstuce : Le webhook peut fonctionner, mais le navigateur le bloque à cause de CORS. Vérifiez sur webhook.site si la requête est arrivée.",
      testErrorUnknown: "Erreur inconnue"
    },
    ReasonsField: "Raison",
    SmsField: "SMS",
    VapiField: "VAPI",
    NotesField: "Notes",
    clear: "Effacer",
    phoneNumberId: "Numéro de téléphone",
    assistantId: "Assistant",
    sms: {
      service: "Service",
      message: "Message",
      messagePlaceholder: "Entrez le message SMS"
    },
    notes: {
      note: "Notes",
      notePlaceholder: "Entrez les notes"
    },
    buttons: {
      addStep: "Nouvelle étape",
      saveFlow: "Enregistrer le flux",
      reorder: "Réorganiser",
      addInteraction: {
        reasons: "Raison",
        sms: "SMS",
        vapi: "VAPI",
        notes: "Notes",
        chatbotBlock: "Bloquer ChatBot",
        opportunity: "Opportunité",
        googleAgenda: "Google Agenda",
        schedule: "Agenda",
        webhookAll: "Webhooks",
        message: "Envoyer un message",
        media: "Envoyez des documents, des vidéos, de l'audio et d'autres fichiers.",
        typebot: "Ajouter Typebot",
        chatgpt: "Ajouter ChatGPT",
        delay: "Ajouter un délai",
        n8n: "Ajouter N8N",
        tag: "Ajouter une balise",
        kanban: "Ajouter Kanban",
        webhook: "Ajouter un Webhook (GET)",
        newFlow: "Démarrer un nouveau flux"
      },
      addCondition: "État neuf"
    },
    optionsVariableType: {
      text: "Texte",
      number: "Nombre"
    },
    labels: {
      variableType: "Type de variable",
      captureVariable: "Capturer la réponse comme variable",
      comparisonType: "Type de comparaison",
      timesAttempted: "Nombre de tentatives",
      flow: "Configuration du flux",
      stepName: "Nom",
      interactions: "Interactions",
      conditions: "Conditions",
      if: "Si",
      responses: "Réponses",
      routeTo: "Routage pour",
      step: "Scène",
      queue: "File d'attente",
      user: "Utilisateur",
      closeTicket: "Fin du service",
      channel: "Chaînes",
      time: "Durée (minutes)",
      parameters: "Paramètres",
      keyword: "Mot déclencheur",
      maxRetries: "Tentatives maximales",
      autoDistribute: "Service d'auto-distribution",
      outOfHours: "En dehors des heures d'ouverture",
      firstInteraction: "Première interaction",
      endMessage: "Message de clôture",
      welcomeMessage: "Message de bienvenue",
      noResponse: "Aucune réponse"
    },
    optionsComparisonType: {
      equals: "Égal à",
      contains: "Contient",
      startsWith: "Commence par",
      endsWith: "Se termine par",
      regex: "Regex"
    },   
    placeholders: {
      typeMessage: "Tapez votre message ici...",
      keyword: "Tapez le mot",
      feedbackMessage: "Message de rétroaction",
      farewellMessage: "Message de clôture"
    },
    hints: {
      captureVariable: "Entrez la clé de la variable",
      typeEqual: "Entrez le texte exact pour la comparaison.",
      typeContains: "Entrez le texte qui doit être contenu dans la réponse.",
      typeStartsWith: "Entrez le texte qui doit commencer la réponse.",
      typeEndsWith: "Entrez le texte qui doit terminer la réponse.",
      typeRegex: "Entrez une expression régulière valide.",
      queueRedirect: "Cette interaction sera déclenchée lorsque le client enverra le mot-clé défini.",
      outHours: "Si le client envoie un message en dehors des heures ouvrables.",
      autoDistribute: "Choisira un utilisateur dans la file d'attente pour le service.",
      typeValue: "Entrez la valeur et appuyez sur Entrée"
    },
    options: {
      routeTo: {
        queue: "File d'attente",
        user: "Utilisateur",
        close: "Fermer",
        channel: "Canal"
      }
    }
  },
  monitor: {
    monitor: "Moniteur",
    title: "Surveillance du système",
    usage: "Utiliser",
    cores: "Noyaux",
    memory: "Mémoire",
    total: "Total",
    free: "Gratuit",
    used: "Utilisé",
    usedPercentage: "Pourcentage d'utilisation",
    uptime: "Temps de disponibilité"
  },
  common: {
    sendMarketing: "Envoyer le modèle marketing",
    noQueue: "Aucune file d’attente",
    required: 'Requis',
    downloadSuccess: "Téléchargement réussi !",
    downloadError: "Erreur lors du téléchargement du fichier",
    duplicate: "Dupliquer",
    searching: 'Recherche',
    you: 'Vous',
    enableChatgptAllBanner: "Attention : configurez les informations d’identification pour tous les canaux. Avec ce paramètre activé, tous les nouveaux tickets créés dans n'importe quel canal recevront automatiquement l'intégration ChatGPT. Ce paramètre affectera tous les canaux de service.",
    enableClaudeAllBanner: "Attention : configurez les informations d’identification pour tous les canaux. Avec ce paramètre activé, tous les nouveaux tickets créés dans n'importe quel canal recevront automatiquement l'intégration Claude. Ce paramètre affectera tous les canaux de service.",
    enableDeepseekAllBanner: "Attention : configurez les informations d’identification pour tous les canaux. Avec ce paramètre activé, tous les nouveaux tickets créés dans n'importe quel canal recevront automatiquement l'intégration Deepseek. Ce paramètre affectera tous les canaux de service.",
    enableDialogflowAllBanner: "Attention : configurez les informations d’identification pour tous les canaux. Avec ce paramètre activé, tous les nouveaux tickets créés dans n'importe quel canal recevront automatiquement l'intégration Dialogflow. Ce paramètre affectera tous les canaux de service.",
    enableDifyAllBanner: "Attention : configurez les informations d’identification pour tous les canaux. Avec ce paramètre activé, tous les nouveaux tickets créés dans n'importe quel canal recevront automatiquement l'intégration Dify. Ce paramètre affectera tous les canaux de service.",
    enableGeminiAllBanner: "Attention : configurez les informations d’identification pour tous les canaux. Avec ce paramètre activé, tous les nouveaux tickets créés dans n'importe quel canal recevront automatiquement l'intégration Gemini. Ce paramètre affectera tous les canaux de service.",
    enableGrokAllBanner: "Attention : configurez les informations d’identification pour tous les canaux. Avec ce paramètre activé, tous les nouveaux tickets créés dans n'importe quel canal recevront automatiquement l'intégration Grok. Ce paramètre affectera tous les canaux de service.",
    enableLmAllBanner: "Attention : configurez les informations d’identification pour tous les canaux. Avec ce paramètre activé, tous les nouveaux tickets créés dans n'importe quel canal recevront automatiquement l'intégration LM. Ce paramètre affectera tous les canaux de service.",
    enableN8NAllBanner: "Attention : configurez les informations d’identification pour tous les canaux. Avec ce paramètre activé, tous les nouveaux tickets créés dans n'importe quel canal recevront automatiquement l'intégration N8N. Ce paramètre affectera tous les canaux de service.",
    enableOllamaAllBanner: "Attention : configurez les informations d’identification pour tous les canaux. Avec ce paramètre activé, tous les nouveaux tickets créés dans n'importe quel canal recevront automatiquement l'intégration Ollama. Ce paramètre affectera tous les canaux de service.",
    enableQwenAllBanner: "Attention : configurez les informations d’identification pour tous les canaux. Avec ce paramètre activé, tous les nouveaux tickets créés dans n'importe quel canal recevront automatiquement l'intégration Qwen. Ce paramètre affectera tous les canaux de service.",
    enableTypebotAllBanner: "Attention : configurez les informations d’identification pour tous les canaux. Avec ce paramètre activé, tous les nouveaux tickets créés dans n'importe quel canal recevront automatiquement l'intégration Typebot. Ce paramètre affectera tous les canaux de service.",
    espiarAtendimento: "Service d'espionnage",
    atualizar: "Pour mettre à jour",
    dadosAtualizados: "Données mises à jour avec succès !",
    erroAtualizacao: "Erreur lors de la mise à jour des données !",
    funil: "Entonnoir",
    accessDenied: "Accès refusé! Vous n'avez pas la permission d'accéder à cette page.",
    loadMoreTickets: "Recherche de billets... Si nécessaire, cliquez une ou plusieurs fois sur le bouton à côté de « Charger plus de billets » pour répertorier les billets plus anciens.",
    oldMessage: "Ancien message, charger l'historique en faisant défiler vers le haut...",
    rollTop: "En faisant défiler vers le haut, en essayant de trouver le message...",
    messageNotFound: "Message non trouvé !",
    fullscreen: "Plein écran",
    autoLayout: "Organiser les étapes",
    info: "Information",
    addInfo: "Ajouter des informations",
    hours: "heures",
    minutes: "minutes",
    confirmDeleteElement: "Voulez-vous vraiment supprimer l'élément ({idx}) ?",
    confirmDeleteCondition: "Voulez-vous vraiment supprimer la condition ({idx}) ?",
    invalidDate: "Date invalide",
    pay: "Facture",
    version: "Version",
    resume: "Résumer",
    readMore: "En savoir plus",
    redefineError: "Erreur lors de la réinitialisation du mot de passe",
    recoverSucess: "Réinitialisation du mot de passe réussie !",
    recoverError: "Erreur lors de la demande de réinitialisation du mot de passe",
    recoverSend: "L'e-mail de récupération du mot de passe a été envoyé avec succès !",
    limitExceed: "Trop de tentatives de connexion ont été effectuées. Réessayez dans 1 minute",
    loginSuccess: "Connexion réussie !",
    busyLine: "Ligne occupée, veuillez réessayer plus tard ou effectuer une mise à niveau",
    system: "Système",
    newClientPending: "Nouveau client en attente",
    client: "Client: ",
    loading: "Chargement...",
    errorOccurred: "Une erreur s'est produite",
    errorFetchingData: "Erreur lors de la récupération des données",
    noData: "Aucune donnée",
    notInformed: "Pas informé",
    resolve: "Résoudre",
    register: "Registre",
    unknown: "Inconnu",
    message: "Message",
    edited: "Édité",
    sync: "Synchronisé",
    reply: "Pour répondre",
    forward: "Transférer",
    forwardToPrivateChat: "Transférer vers le Chat Privé",
    forwardToOtherChannel: "Transférer vers un Autre Canal",
    markToForward: "Transférer plusieurs fois (vérifier)",
    react: "Réagir",
    edit: "Modifier",
    delete2: "Supprimer",
    download: "Descendre",
    download2: "Descendre",
    contact: "Contact",
    typeMessage: "Entrez votre message...",
    emoji: "Émoji",
    types: "Types",
    ok: "D'ACCORD",
    cancel: "Annuler",
    start: "Commencer",
    close: "Pour fermer",
    confirm: "Confirmer",
    send: "Envoyer",
    updated: "Mis à jour!",
    users: "Utilisateurs",
    dateHourFormat: "jj/MM/aaaa HH:mm:ss",
    dateFormat: "jj/MM/aaaa",
    active: "Actif",
    actions: "Actes",
    description: "Description",
    import: "Importer",
    save: "Sauvegarder",
    add: "Pour ajouter",
    delete: "Supprimer",
    no: "Non",
    yes: "Oui",
    out: "Sortir",
    continue: "Continuer",
    attention: "Attention!!",
    search: "Situer...",
    lang: "pt-BR",
    variables: {
      name: "Nom",
      email: "Courriel (si disponible)",
      phoneNumber: "Téléphone",
      kanban: "Kanban (le cas échéant)",
      firstName: "Prénom (le cas échéant)",
      lastName: "Nom de famille (le cas échéant)",
      businessName: "Société (le cas échéant)"
    },
    notifications: {
      success: "Configuration modifiée !",
      error: "Une erreur s'est produite."
    },
    status: {
      pending: "En attente",
      received: "Reçu",
      overdue: "En retard",
      unknown: "Statut inconnu"
    }
  },
  funil: {
    createEvent: "Créer un événement",
    selectCalendar: "Sélectionner un calendrier",
    noConfig: "Aucune configuration disponible",
    createGoogleCalendarEvent: "Créer un événement dans Google Calendar",
    viewGoogleCalendar: "Voir les événements Google Calendar",
    googleCalendarEvents: "Événements Google Calendar",
    noCalendarConfig: "Aucune configuration disponible",
    editCalendarEvent: "Modifier l'événement",
    openCalendarEvent: "Ouvrir dans Google Calendar",
    eventTitle: "Titre de l'événement",
    eventTitleRequired: "Le titre est requis",
    eventStartDate: "Date de début",
    eventStatus: "Statut",
    eventStartDateRequired: "La date de début est requise",
    eventEndDate: "Date de fin",
    eventEndDateRequired: "La date de fin est requise",
    eventDescription: "Description",
    eventLocation: "Emplacement",
    eventAttendees: "Participants (emails séparés par des virgules)",
    eventAttendeesHint: "exemple@@email.com, autre@@email.com",
    updateEvent: "Mettre à jour l'événement",
    cancelUpdateEvent: "Annuler",
    eventActions: "Actions",
    eventUpdatedSuccess: "Événement mis à jour avec succès !",
    selectCalendarConfig: "Sélectionnez une configuration pour récupérer les événements.",
    configNotFound: "Configuration sélectionnée introuvable",
    configureGoogleCalendar: "Configurez d'abord les identifiants Google Calendar",
    eventError: "Erreur lors du chargement des événements",
    calendarConfigError: "Erreur lors du chargement des configurations de Google Calendar",
    acao: "Action",
    acaoTicket: "Actions de Tickets",
    todos: "Tous",
    valorMin: "Valeur minimale",
    valorMax: "Valeur maximale",
    itemsPerPage: "Éléments par page",
    filter: "Filtre",
    oportunidadeAtualizada: "Opportunité mise à jour avec succès",
    oportunidadeCriada: "Opportunité créée avec succès",
    erroSalvar: "Erreur lors de l'enregistrement de l'opportunité",
    erroEnvioEmail: "Erreur lors de l'envoi de l'e-mail",
    emailDestinatario: "E-mail du destinataire",
    camposObrigatorios: "Champs obligatoires",
    semEmailContato: "Il n'y a pas d'email pour le contact",
    mensagemEmail: "Message électronique",
    assuntoEmail: "Objet de l'e-mail",
    enviarEmail: "Envoyer un e-mail",
    emailError: "Erreur lors de l'envoi de l'e-mail",
    emailErrorDetails: "Impossible de déterminer l'erreur",
    dataAnteriorNaoPermitida: "La date ne peut pas être antérieure au jour actuel",
    nome: "Nom",
    numero: "Nombre",
    email: "E-mail",
    dataCriacao: "Date de création",
    novaOportunidade: "Nouvelle opportunité",
    calendar: "Calendrier",
    buscarPorTermoPlaceholder: "Entrez un terme à rechercher",
    buscarPorTermo: "Recherche par terme",
    dataInicio: "Date de début",
    dataFim: "Date de fin",
    limiteRegistros: "Limite d'enregistrement",
    registrosPorPagina: "Enregistrements par page",
    total: "Total",
    semDescricao: "Il n'y a pas de description",
    etapas: "Scène",
    contato: "Contact",
    noventaDiasLabel: "Les 90 derniers jours",
    filterByStage: "Filtrer par étape",
    filterByResponsible: "Filtrer par responsable",
    filterByPipeline: "Filtrer par entonnoir",
    aberto: "Ouvrir",
    ganho: "Gagner",
    perdido: "Perdu",
    export: "Exporter",
    exportCSV: "Exporter au format CSV",
    oportunidadesValue: "Opportunités",
    pipelinesValue: "Pipelines",
    etapasValue: "Mesures",
    noDataToExport: "Aucune donnée à exporter",
    filterByStatus: "Filtrer par statut",
    filterByPeriod: "Filtrer par période",
    fitlerByResponsible: "Filtrer par responsable",
    oportunidadeStatus: "Statut d'opportunité",
    oportunidadePorResponsavel: "Opportunités par Responsible",
    evolucaoDasOportunidades: "Évolution des opportunités",
    ticketMedio: "Ticket moyen",
    todosLabel: "Tous",
    abertosLabel: "Ouvrir",
    ganhosLabel: "Gains",
    perdidosLabel: "Perdu",
    seteDiasLabel: "Les 7 derniers jours",
    trintaDiasLabel: "Les 30 derniers jours",
    noventeDiasLabel: "Les 90 derniers jours",
    noResponsible: "Pas de responsable",
    oportunidades: "Opportunités",
    criado: "Entreprises créées",
    emAberto: "Ouvrir une entreprise",
    negocioGanho: "Entreprise gagnée",
    negocioPerdido: "Perte d'activité",
    taxaNegociosGanhos: "Taux d'imposition des entreprises gagnées",
    dashBoard: "Panneau de contrôle",
    pipelines: "Entonnoirs",
    kanban: "Kanban",
    ultimaEtapa: "C'est la dernière étape du pipeline",
    deletarOportunidade: "Êtes-vous sûr de vouloir supprimer cette opportunité ?",
    oportunidadeDeletada: "Opportunité supprimée avec succès",
    erroAoDeletar: "Erreur lors de la suppression de l'opportunité",
    atencao: "Attention",
    nao: "Non",
    sim: "Oui",
    cancelar: "Annuler",
    salvar: "Sauvegarder",
    fechar: "Pour fermer",
    adicionar: "Pour ajouter",
    editar: "Modifier",
    deletar: "Supprimer",
    oportunidadeVencendo: "Opportunité gagnante",
    venceEm: "gagne en",
    dias: " jours)",
    verDetalhes: "Voir les détails",
    semMovimentacao: "Aucun mouvement",
    estaHa: "y a-t-il",
    diasSemMovimentacao: "jours sans mouvement",
    atualizar: "Pour mettre à jour",
    valorAlto: "Haute valeur",
    comValorDe: "d'une valeur de $ ",
    etapaEstagnada: "Stade stagnant",
    diasNaEtapa: "jours sur scène",
    avancarEtapa: "Prochaine étape",
    semResponsavel: "Pas de responsable",
    reponsavelAlerta: "n'a pas de personne désignée en charge",
    designar: "Désigner",
    fechamentoPrevisto: "Clôture",
    dataProxima: "La date de clôture approche !",
    criadoEm: "Créé en",
    detalhesOportunidade: "Détails de l'opportunité",
    pipeline: "Entonnoir",
    etapa: "Scène",
    status: "Statut",
    valor: "Valeur",
    valoresData: "Valeurs et dates",
    previsao: "Prévisions de clôture",
    ultimaUpdate: "Dernière mise à jour",
    responsaveis: "Responsable",
    basicas: "Informations de base",
    lead: "Plomb",
    responsavel: "Responsable",
    descricao: "Description",
    produtos: "Produits",
    historicoAtividades: "Historique des activités",
    valorMinimo: "Valeur minimale",
    valorMaximo: "Valeur maximale",
    limparFiltros: "Effacer les filtres",
    esteMes: "Ce mois-ci",
    mesAnterior: "Mois précédent",
    ultimos7dias: "Les 7 derniers jours",
    ultimos30dias: "Les 30 derniers jours",
    ultimos90dias: "Les 90 derniers jours",
    hoje: "Aujourd'hui",
    valorDesc: "Valeur (du plus élevé au plus bas)",
    valorAsc: "Valeur (du plus bas au plus élevé)",
    criacaoDesc: "Création (du plus récent au plus ancien)",
    criacaoAsc: "Création (du plus ancien au plus récent)",
    previsaoFechamento: "Prévisions de clôture",
    editarOportunidade: "Modifier l'opportunité",
    criarOportunidade: "Créer des opportunités",
    pipeEtapa: "Entonnoir et scène",
    funil: "Entonnoir",
    etapa: "Étape",
    selecioneData: "Sélectionnez la date de clôture prévue",
    dataObrigatoria: "La date est obligatoire",
    dataFutura: "La date doit être dans le futur",
    loadError: "Erreur lors du chargement des données requises",
    contactError: "Erreur lors du chargement des contacts",
    editarPipe: "Modifier l'entonnoir",
    novoPipe: "Nouvel entonnoir",
    nomePipe: "Nom de l'entonnoir",
    campoObrigatorio: "Champ obligatoire",
    acoes: "Actes",
    excluirPipeline: "Êtes-vous sûr de vouloir supprimer cet entonnoir ?",
    funilDeletado: "L'entonnoir a été supprimé avec succès",
    erroAoDeletarFunil: "Erreur lors de la suppression de l'entonnoir",
    pipeTitle: "Entonnoirs"
  },
  asteriskWebphone: {
    conected: "Connecté",
    setNumber: "Entrez le numéro",
    callReceived: "Appel reçu",
    disconnectedWebphone: "Webphone déconnecté",
    calling: "Appel en cours...",
    callError: "Erreur lors de la création de l'appel",
    callReceivedError: "Erreur lors de la réception de l'appel",
    callEnded: "Appel terminé",
    callEndedError: "Erreur lors de la fin de l'appel",
    callReceived: "Appel reçu",
  },
  configuracaoTutoriais: {
    title: 'Tutoriels',
    create: 'Créer un tutoriel',
    description: 'Description',
    link: 'Lien',
    thumbnail: 'Vignette',
    isActive: 'Actif',
    edit: 'Éditer',
    deleteConfirmation: 'Êtes-vous sûr de vouloir supprimer ce tutoriel ?',
    tutorialDeleted: 'Tutoriel supprimé avec succès',
    columns: {
      title: 'Titre',
      link: 'Lien',
      isActive: 'Actif',
      acoes: 'Actions',
      thumbnail: 'Vignette',
      description: 'Description',
      actions: 'Actions',
      edit: 'Éditer',
      delete: 'Supprimer',
      cancel: 'Annuler',
      id: 'ID',
    },
    notifications: {
      duplicated: 'Tutoriel dupliqué avec succès',
      errorDelete: 'Erreur lors de la suppression du tutoriel',
      errorDuplicate: 'Erreur lors de la duplication du tutoriel',
      created: 'Tutoriel créé avec succès',
      updated: 'Tutoriel mis à jour avec succès',
    }
  },
  funilacao: {
    fluxoSalvoComSucesso: 'Flujo guardado con éxito',
    tipoAcaoFluxo: 'Flujo',
    erroSalvarFluxo: 'Error al guardar el flujo',
    configurarFluxo: 'Configurar Flujo',
    configurarAdicaoCarteira: 'Configurar Adición de Cartera',
    configurarAdicaoTag: 'Configurar Adición de Etiqueta',
    configurarMudancaStatus: 'Configurar Cambio de Estado',
    configurarMudancaEtapa: 'Configurar Cambio de Etapa',
    configurarMensagem: 'Configurar Mensaje',
    selecionarAcao: 'Seleccionar Acción',
    acoesDoFluxo: 'Acciones del Flujo',
    adicioneAcoes: 'Agrega acciones al flujo',
    adicionarAcao: 'Agregar Acción',
    moverParaBaixo: 'Mover hacia abajo',
    moverParaCima: 'Mover hacia arriba',
    diasAposInicio: '{dias} días',
    configurarAcao: 'Configurar Acción',
    selecionePipelineEtapa: 'Selecciona el embudo y la etapa',
    novoFluxo: 'Nuevo Flujo',
    editarFluxo: 'Editar Flujo',
    editorFluxo: 'Editor de Flujo',
    acoesDisponiveis: 'Acciones Disponibles',
    fluxo: 'Flujo',
    verLogs: 'Voir les journaux',
    logAcao: 'Journal d\'action',
    contato: 'Contact',
    numero: 'Numéro',
    email: 'E-mail',
    data: 'Date',
    oportunidade: 'Opportunité',
    status: 'Statut',
    mensagemErro: 'Message d\'erreur',
    erroCarregarLogs: 'Erreur lors du chargement des journaux',
    acao: 'Action',
    pipeline: 'Pipeline',
    etapa: 'Étape',
    tipoAcao: 'Type d\'action',
    mensagem: 'Message',
    etapaDestino: 'Étape de destination',
    statusDestino: 'Statut de destination',
    tag: 'Étiquette',
    carteira: 'Portefeuille',
    diasParaDisparar: 'Jours avant déclenchement',
    tipoAcaoMensagem: 'Envoyer un message',
    tipoAcaoMudarEtapa: 'Changer d\'étape',
    tipoAcaoMudarStatus: 'Changer de statut',
    tipoAcaoAdicionarTag: 'Ajouter une étiquette',
    tipoAcaoAdicionarCarteira: 'Ajouter un portefeuille',
    aberto: 'Ouvert',
    ganho: 'Gagné',
    perdido: 'Perdu',
    novo: 'Nouveau',
    pesquisar: 'Rechercher',
    ativo: 'Actif',
    nome: 'Nom',
    pipeline: 'Pipeline',
    etapa: 'Étape',
    status: 'Statut',
    valor: 'Valeur',
    valoresData: 'Valeurs et dates',
    previsao: 'Prévision de clôture',
    salvar: 'Enregistrer',
    cancelar: 'Annuler',
    descricao: 'Description',
    whatsapp: 'Connexion',
    pesquisar: 'Rechercher',
    novo: 'Nouveau',
    acoes: 'Actions',
    erroCarregarDados: 'Erreur lors du chargement des données',
    required: 'Obligatoire',
    editar: 'Éditer',
    salvoComSucesso: 'Enregistré avec succès',
    excluir: 'Supprimer',
    alteradoComSucesso: 'Modifié avec succès',
    confirmarExclusao: 'Êtes-vous sûr de vouloir supprimer cette action ?',
    confirmar: 'Confirmer',
    excluidoComSucesso: 'Supprimé avec succès',
    erroExcluir: 'Erreur lors de la suppression de l\'action',
    erroSalvar: 'Erreur lors de l\'enregistrement de l\'action',
    erroAtualizar: 'Erreur lors de la mise à jour de l\'action',
    erroCarregarEtiquetas: 'Erreur lors du chargement des étiquettes',
    erroCarregarCarteiras: 'Erreur lors du chargement des portefeuilles',
    erroCarregarWhatsapps: 'Erreur lors du chargement des connexions WhatsApp',
    acaoTicket: 'Actions de Tickets',
    horasSemResposta: 'Heures sans Réponse',
    dataInicio: 'Date de Début',
    dataInicioTooltipTitulo: 'Comment ça fonctionne:',
    dataInicioTooltipDescricao: 'Cette date définit à partir de quand l\'action sera appliquée aux tickets.',
    dataInicioTooltipPreenchida: 'Si remplie: seuls les tickets créés après cette date recevront l\'action',
    dataInicioTooltipVazia: 'Si vide: l\'action sera appliquée à tous les tickets (comportement par défaut)',
    dataInicioTooltipExemplo: 'Exemple: Si vous définissez 01/01/2024, seuls les tickets créés à partir de cette date recevront l\'action, en ignorant les anciens tickets.',
    horasAposInicio: '{horas}h après le début',
    pendente: 'En attente',
    fechado: 'Fermé',
    confirmar: 'Confirmer',
  },
  vapi: {
    assistants: "Assistants",
    phones: "Numéros de téléphone",
    createAccountInstruction: "Créez un compte sur Vapi et générez votre jeton pour utiliser l'intégration avec Vapi",
    tokenLabel: "Jeton",
    tokenTooltip: "Vapi",
    tooltip: "Créez un compte sur Vapi et générez votre jeton pour utiliser l'intégration avec Vapi.",
    testCall: "Faire un appel de test",
    selectAssistant: "Sélectionner un assistant",
    selectPhoneNumber: "Sélectionner un numéro de téléphone",
    customerNumber: "Numéro de client",
    makeCall: "Faire un appel",
    cancel: "Annuler",
    success: "Appel réalisé avec succès!",
    call: "Appel",
  },
  rewriteIa: {
    title: 'Réécrire avec ChatGPT',
    estilos: 'Styles de réécriture',
    pro: 'Professionnel',
    prodesc: 'Ton formel et professionnel',
    simp: 'Amical',
    simpdesc: 'Ton amical et chaleureux',
    marketing: 'Marketing',
    marketingdesc: 'Ton persuasif et engageant',
    ortografia: 'Orthographe',
    ortografiadesc: 'Correction orthographique uniquement',
    caracteres: 'caractères',
    warning1: 'Saisissez un message à réécrire',
    warning2: 'La clé API de ChatGPT n\'est pas configurée',
    warning3: 'Texte réécrit dans le style',
    warning4: 'Réécriture annulée',
    desfazer: 'Annuler',
    error1: 'Erreur lors de la réécriture du texte. Veuillez réessayer',
    promptMap: {
      profissional: 'professionnel',
      simpatico: 'amical',
      marketing: 'marketing',
      ortografia: 'avec correction orthographique uniquement'
    },
    systemContent: 'Réécrivez le texte ci-dessous dans un ton {estilo}. Gardez le contenu, ajustez seulement le style et l\'orthographe. Pour le ton Amical utilisez des emojis avec modération et pour le marketing utilisez le gras et l\'italique en mode whatsapp et des emojis.'
  },
  dashStyles: {
    title: 'Personnaliser les Tableaux de Bord',
    tema: 'Thème du tableau de bord',
    tipoGrafico: 'Type de graphique',
    tooltip: 'Personnalisez le type de graphique affiché pour : ',
    show: 'Afficher le panneau de : ',
    defaultLabel: 'Par défaut',
    defaultValue: 'defaut',
    pizzaLabel: 'Camembert',
    barLabel: 'Barres',
    lineLabel: 'Lignes',
    areaLabel: 'Aires',
    donutLabel: 'Donut',
    radarLabel: 'Radar',
    queueLabel: 'Support par file',
    userLabel: 'Support par utilisateur',
    statusLabel: 'Support par statut',
    channelLabel: 'Support par canal (Connexion)',
    channelNameLabel: 'Support par canal (Nom)',
    reasonsLabel: 'Support par demande',
    users: 'Utilisateurs',
    atendimento: 'Supports',
    demandas: 'Demandes',
    closed: 'Fermés',
    open: 'Ouverts',
    pending: 'En attente',
    schedule: 'Planifiés',
    undefined: 'Indéfini',
    channels: 'Canaux',
    classic: 'Classique',
    modern: 'Moderne',
    nature: 'Nature',
    elegant: 'Élégant',
    vibrant: 'Vibrant',
    minimalist: 'Minimaliste',
    corporative: 'Corporate',
    default: 'Par défaut',
    performanceCardsLabel: 'Cartes de performance',
    performanceTableLabel: 'Tableau de performance',
  },
  ticketCompartilhado: {
    convites: 'Invitations',
    convite: 'Invitation',
    conviteDeletado: 'Invitation supprimée avec succès',
    conviteDeletadoErro: 'Erreur lors de la suppression de l\'invitation',
    meusConviteCompartilhados: 'Mes invitations partagées',
    carregandoConvites: 'Chargement des invitations...',
    nenhumConviteEncontrado: 'Aucune invitation trouvée',
    voceNaoPossuiConvitesAtivos: 'Vous n\'avez aucune invitation de partage active.',
    compartilhadoEm: 'Partagé le',
    usuariosComAcesso: 'Utilisateurs avec accès',
    criadoPor: 'Créé par',
    voce: 'Vous',
    outroUsuario: 'Autre utilisateur',
    abrirNaMesmaTela: 'Ouvrir dans la même fenêtre',
    deletarConvite: 'Supprimer l\'invitation',
    erroAoCarregarConvites: 'Erreur lors du chargement des invitations',
    linkCopiadoParaAreaDeTransferencia: 'Lien copié dans le presse-papiers',
    naoFoiPossivelCopiarLink: 'Impossible de copier le lien',
    confirmarExclusa: 'Confirmer la suppression',
    temCertezaQueDesejaDeletarOConviteDoTicket: 'Êtes-vous sûr de vouloir supprimer l\'invitation du ticket #{ticketId} ?',
    conviteDeletadoComSucesso: 'Invitation supprimée avec succès !',
    erroAoDeletarConvite: 'Erreur lors de la suppression de l\'invitation',
    confirmarExclusao: 'Êtes-vous sûr de vouloir supprimer cette invitation ?',
    compartilharTicket: 'Partager le ticket',
    editarCompartilhamento: 'Modifier le partage',
    editeOsUsuariosQueTeraoAcessoAEsteTicket: 'Modifiez les utilisateurs ayant accès à ce ticket',
    selecioneOsUsuariosQueTeraoAcessoAEsteTicket: 'Sélectionnez les utilisateurs qui auront accès à ce ticket',
    atualizar: 'Mettre à jour',
    compartilhar: 'Partager',
    erroAoVerificarConviteExistente: 'Erreur lors de la vérification de l\'invitation existante',
    erroAoCarregarUsuarios: 'Erreur lors du chargement des utilisateurs',
    selecionePeloMenosUmUsuarioParaCompartilhar: 'Veuillez sélectionner au moins un utilisateur à partager',
    conviteAtualizadoCom: 'Invitation mise à jour avec {length} utilisateur(s)',
    ticketCompartilhadoCom: 'Ticket partagé avec {length} utilisateur(s)',
    erroAoCompartilharTicket: 'Erreur lors du partage du ticket',
    update: 'Mettre à jour',
  },
  backup: {
    title: "Centre de Données",
    backupActions: "Exportation de Données",
    individualBackup: "Exportation Individuelle",
    allTenantsConfig: "Configurations d'Exportation - Tous les Tenants",
    tenantConfig: "Configurations d'Exportation par Tenant",
    oldBackupsCleanup: "Nettoyage des Anciennes Données",
    backupResults: "Résultats de l'Exportation",
    availableBackups: "Données Disponibles",
    totalBackups: "Total d'Exportation",
    totalSize: "Taille Totale",
    lastBackup: "Dernière Exportation",
    processedTenants: "Exportations Traitée",
    backupAllTenants: "Exporter Tous les Tenants",
    updateStatus: "Mettre à Jour le Statut",
    makeBackup: "Exporter les Données",
    updateConfigs: "Mettre à Jour les Configurations",
    searchTenant: "Rechercher un Tenant",
    newConfig: "Nouvelle Configuration",
    recreateDefaultConfig: "Recréer la Configuration par Défaut",
    saveConfig: "Enregistrer la Configuration",
    cancel: "Annuler",
    close: "Fermer",
    confirmRestore: "Confirmer la Restauration",
    confirmGeneralCleanup: "Confirmer le Nettoyage Général",
    cleanTenantBackups: "Nettoyer les Anciennes Données du Tenant",
    cleanAllTenantsBackups: "Nettoyer les Données de Tous les Tenants",
    selectTenant: "Sélectionner un Tenant",
    selectTenantForConfig: "Sélectionner un Tenant à Configurer",
    selectTenantForCleanup: "Sélectionner un Tenant pour le Nettoyage",
    viewAllTenantsConfig: "Voir les configurations d’exportation de tous les tenants",
    removeOldBackups: "Supprimer les anciennes données selon la politique de rétention configurée",
    tenantConfigInfo: "Configuration du Tenant :",
    noConfigFound: "Aucune configuration trouvée",
    withoutDescription: "Sans description",
    createdIn: "Créé le :",
    editConfig: "Modifier la Configuration",
    newConfigTitle: "Nouvelle Configuration",
    storage: "Stockage",
    general: "Général",
    advanced: "Avancé",
    storageType: "Type de Stockage",
    storagePath: "Chemin de Stockage",
    retentionDays: "Jours de Rétention",
    compression: "Compression",
    description: "Description",
    configDescription: "Description de la configuration",
    encryption: "Chiffrement",
    encryptionPassword: "Mot de Passe de Chiffrement",
    bucket: "Bucket",
    region: "Région",
    accessKeyId: "Access Key ID",
    secretAccessKey: "Secret Access Key",
    host: "Hôte",
    port: "Port",
    username: "Utilisateur",
    password: "Mot de passe",
    path: "Chemin",
    active: "Active",
    inactive: "Inactive",
    success: "Succès",
    failure: "Échec",
    complete: "Complet",
    partial: "Partiel",
    yes: "Oui",
    no: "Non",
    edit: "Modifier",
    recreateDefault: "Recréer par Défaut",
    delete: "Supprimer",
    viewDetails: "Voir les Détails",
    downloadBackup: "Télécharger les Données",
    deleteBackup: "Supprimer les Données",
    confirmDeleteBackup: "Confirmer la Suppression",
    confirmDeleteBackupMessage: "Êtes-vous sûr de vouloir supprimer cette exportation ? Cette action est irréversible.",
    backupDeleted: "Exportation supprimée avec succès",
    errorDeletingBackup: "Erreur lors de la suppression des données",
    confirmDeleteBackupTitle: "Confirmer la Suppression des Données",
    id: "ID",
    tenant: "Tenant",
    tenantId: "Tenant ID",
    backupName: "Nom de l'Exportation",
    size: "Taille",
    dbSize: "Taille de la BD",
    filesSize: "Taille des Fichiers",
    totalSize: "Taille Totale",
    duration: "Durée",
    type: "Type",
    date: "Date",
    actions: "Actions",
    createdAt: "Créé le",
    status: "Statut",
    backupDetails: "Détails de l'Exportation",
    name: "Nom",
    database: "Base de Données",
    files: "Fichiers",
    dbSizeLabel: "Taille BD :",
    filesSizeLabel: "Taille Fichiers :",
    totalSizeLabel: "Taille Totale :",
    dateLabel: "Date :",
    errors: "Erreurs :",
    restoreBackup: "Restaurer les Données",
    restoreWarning: "⚠️ Attention : Cette action écrasera les données actuelles du tenant. Cette opération est irréversible.",
    confirmGeneralCleanupTitle: "Confirmer le Nettoyage Général",
    action: "Action :",
    criteria: "Critère :",
    cleanupAction: "Nettoyer les anciennes données de TOUS les tenants",
    cleanupCriteria: "Données plus anciennes que la période de rétention configurée",
    cleanupWarning: "⚠️ ATTENTION : Cette action supprimera définitivement les anciennes données de tous les tenants. Cette opération est irréversible et peut entraîner une perte de données historiques.",
    cleanupAllWarning: "⚠️ Cette action supprimera les anciennes données de TOUS les tenants",
    allBackupsCompleted: "Exportation de tous les tenants terminée",
    allBackupsExecuted: "Exportation de tous les tenants terminée",
    singleBackupExecuted: "Exportation du tenant terminée",
    tenantBackupCompleted: "Exportation du tenant terminée",
    configSaved: "Configuration enregistrée avec succès",
    configDeleted: "Configuration supprimée avec succès",
    defaultConfigRecreated: "Configuration par défaut recréée avec succès",
    restoreCompleted: "Restauration complétée avec succès",
    tenantBackupsCleaned: "Anciennes données du tenant nettoyées avec succès",
    oldBackupsCleaned: "Anciennes données du tenant nettoyées avec succès",
    allTenantsBackupsCleaned: "Anciennes données de tous les tenants nettoyées avec succès",
    allOldBackupsCleaned: "Anciennes données de tous les tenants nettoyées avec succès",
    backupDownloaded: "Données téléchargées avec succès !",
    tenantsWithSuccess: "tenants avec succès",
    errorLoadingInitialData: "Erreur lors du chargement des données initiales",
    errorLoadingStatus: "Erreur lors du chargement du statut",
    errorLoadingTenants: "Erreur lors du chargement des tenants",
    errorLoadingBackups: "Erreur lors du chargement des données",
    errorLoadingResults: "Erreur lors du chargement des résultats d’exportation",
    errorLoadingAllConfigs: "Erreur lors du chargement des configurations de tous les tenants",
    errorLoadingTenantConfigs: "Erreur lors du chargement des configurations du tenant",
    errorExecutingBackup: "Erreur lors de l’exécution de l’exportation",
    errorExecutingAllBackups: "Erreur lors de l’exécution de l’exportation",
    errorExecutingTenantBackup: "Erreur lors de l’exportation du tenant",
    errorExecutingSingleBackup: "Erreur lors de l’exportation du tenant",
    errorSavingConfig: "Erreur lors de l’enregistrement de la configuration",
    errorDeletingConfig: "Erreur lors de la suppression de la configuration",
    errorRecreatingDefaultConfig: "Erreur lors de la recréation de la configuration par défaut",
    errorRestoringBackup: "Erreur lors de la restauration des données",
    errorCleaningTenantBackups: "Erreur lors du nettoyage des données du tenant",
    errorCleaningOldBackups: "Erreur lors du nettoyage des anciennes données",
    errorCleaningAllTenantsBackups: "Erreur lors du nettoyage des données de tous les tenants",
    errorCleaningAllBackups: "Erreur lors du nettoyage des données de tous les tenants",
    errorDownloadingBackup: "Erreur lors du téléchargement des données",
    selectTenantToConfigure: "Sélectionnez un tenant à configurer",
    selectTenantToClean: "Sélectionnez un tenant pour nettoyer les données",
    selectTenantToCleanBackups: "Sélectionnez un tenant pour nettoyer les données",
    selectTenantToRecreate: "Sélectionnez un tenant pour recréer la configuration par défaut",
    selectTenantToRecreateDefaultConfig: "Sélectionnez un tenant pour recréer la configuration par défaut",
    invalidConfig: "Configuration invalide",
    confirmDelete: "Confirmer la Suppression",
    confirmDeleteConfigTitle: "Confirmer la Suppression",
    confirmDeleteMessage: "Êtes-vous sûr de vouloir supprimer cette configuration ?",
    confirmDeleteConfigMessage: "Êtes-vous sûr de vouloir supprimer cette configuration ?",
    zeroBytes: "0 Octets",
    na: "N/D",
    tenantPrefix: "Tenant ",
    backupInfoTitle: "Informations sur l'Exportation",
    includedModels: "Modèles Inclus",
    excludedModels: "Modèles Exclus",
    databaseModelsInfo: "Modèles de la Base de Données",
    includedModelsTitle: "Modèles Inclus dans l'Exportation",
    excludedModelsTitle: "Modèles Exclus de l'Exportation",
    includedModelsDescription: "Ces modèles seront inclus dans l’exportation de la base de données",
    excludedModelsDescription: "Ces modèles NE seront PAS inclus dans l’exportation de la base de données",
    backupScope: "Périmètre de l'Exportation",
    backupScopeDescription: "L'exportation inclut uniquement les données spécifiques au tenant (avec tenantId) et exclut les données système, les journaux temporaires et les configurations internes.",
    showDetails: "Afficher les Détails",
    hideDetails: "Masquer les Détails",
    backupAllTenantsTooltip: "Exporter Tous les Tenants",
    backupAllTenantsDescription: "Exécute l’exportation de tous les tenants actifs du système",
    singleBackupTooltip: "Exportation Individuelle",
    singleBackupDescription: "Exécute l’exportation d’un tenant spécifique",
    modelsIncluded: "Modèles Inclus",
    modelsExcluded: "Modèles Exclus",
    models: "modèles",
    updateStatusDescription: "Met à jour les statistiques et le statut de l’exportation",
    cleanupInfoTitle: "Nettoyage des Données",
    cleanupInfoDescription: "Supprime les anciennes données selon la politique de rétention configurée",
    cleanupScope: "Périmètre du Nettoyage",
    cleanupScopeDescription: "Supprime uniquement les anciens fichiers d’exportation, n’affecte pas les données de la base ou les configurations"
  },
  masterkey: {
    masterkeyOption: "Utiliser la MasterKey"
  },
  configuracaoMetaPanel: {
    novos: {
      configureWebhook: "Configurer le Webhook",
      configureSIP: "Configurer le SIP",
      registerPhone: "Enregistrer le téléphone dans WABA",
      configureWebhookDescription: "Configurez l'URL de rappel pour recevoir les événements de l'API WhatsApp Business",
      callbackUrl: "URL de rappel",
      callbackUrlRequired: "L'URL de rappel est obligatoire",
      verifyToken: "Jeton de vérification",
      metaToken: "Jeton Meta du locataire",
      metaTokenHint: "Jeton utilisé pour vérifier l'authenticité des requêtes",
      metaTokenRequired: "Le jeton de vérification est obligatoire",
      overrideWebhook: "Remplacer le Webhook",
      configureSIPDescription: "Configurez le serveur SIP pour recevoir des appels vocaux via l'API WhatsApp Business",
      hostnameSIP: "Nom d'hôte du serveur SIP",
      hostnameSIPHint: "Nom d'hôte du serveur SIP (ex : asterisk.exemplo.com.br)",
      hostnameSIPRequired: "Le nom d'hôte du serveur SIP est obligatoire",
      hostnameSIPInvalid: "Nom d'hôte du serveur SIP invalide",
      hostnameSIPPlaceholder: "exemple : asterisk.exemplo.com.br",
      portSIP: "Port du serveur SIP",
      portSIPHint: "Port du serveur SIP (1-65535)",
      portSIPRequired: "Le port du serveur SIP est obligatoire",
      portSIPInvalid: "Port du serveur SIP invalide",
      portSIPPlaceholder: "5061",
      important: "Important",
      configureSIPDescription2: "Cette configuration activera les appels vocaux via l'API WhatsApp Business. Assurez-vous que le serveur SIP est correctement configuré et accessible.",
      fillRequiredFields: "Remplissez tous les champs obligatoires",
      portSIPInvalidMessage: "Port invalide. Doit être un nombre entre 1 et 65535",
      hostnameSIPInvalidMessage: "Nom d'hôte invalide",
      SIPConfiguredSuccess: "SIP configuré avec succès !",
      SIPConfiguredError: "Erreur lors de la configuration du SIP"
    },    
    profile: {
      updateProfile: "Mettre à jour le profil",
      profile: "Profil WhatsApp Business",
      about: "À propos",
      address: "Adresse",
      description: "Description",
      email: "Email",
      vertical: "Secteur",
      websites: "Sites web",
      loadingProfile: "Chargement du profil actuel...",
      configureProfile: "Configurer le profil",
      configureProfileDescription: "Configurez les informations du profil WhatsApp Business",
      reloadProfile: "Recharger le profil",
      aboutPlaceholder: "Brève description de l'entreprise",
      aboutHint: "512 caractères maximum",
      addressPlaceholder: "Adresse complète de l'entreprise",
      addressHint: "Adresse physique de l'établissement",
      descriptionPlaceholder: "Description détaillée de l'entreprise",
      descriptionHint: "Description complète des services ou produits",
      emailPlaceholder: "contact＠entreprise.fr",
      emailHint: "Email de contact de l'entreprise",
      verticalPlaceholder: "Sélectionnez le secteur",
      verticalHint: "Catégorie principale de l'entreprise",
      websitesPlaceholder: "https://www.entreprise.fr",
      websitesHint: "URLs des sites web de l'entreprise (séparées par des virgules)",
      cancel: "Annuler",
      saveProfile: "Enregistrer le profil",
      profileLoadError: "Téléphone vérifié, mais impossible de charger le profil.",
      requiredFieldsError: "Veuillez remplir tous les champs obligatoires",
      invalidEmailFormat: "Format d'email invalide",
      profileUpdatedSuccess: "Profil mis à jour avec succès !",
      profileUpdateError: "Erreur lors de la mise à jour du profil. Vérifiez les données et réessayez.",
      retail: "Vente au détail",
      services: "Services",
      restaurant: "Restaurant",
      education: "Éducation",
      health: "Santé",
      technology: "Technologie",
      beauty: "Beauté",
      automotive: "Automobile",
      realEstate: "Immobilier",
      financial: "Financier",
      sports: "Sport",
      entertainment: "Divertissement",
      travel: "Voyage",
      wellness: "Bien-être",
      pet: "Animaux",
      other: "Autres"
    },
    label: {
      approved: "Approuvé",
      pending: "En attente",
      rejected: "Rejeté",
      inAppeal: "En appel",
      disabled: "Désactivé",
      utility: "Utilitaire",
      marketing: "Marketing",
      authentication: "Authentification",
      arAR: "Arabe (Arabie Saoudite)",
      tshivenda: "Tshivenda",
      isiNdebeleNo: "Ndebele du Nord",
      isiNdebeleSu: "Ndebele du Sud",
      Sepedi: "Sepedi",
      Sesotho: "Sesotho",
      ptBR: "Portugais (Brésil)",
      ptPT: "Portugais (Portugal)",
      enUS: "Anglais (États-Unis)",
      enGB: "Anglais (Royaume-Uni)",
      esES: "Espagnol (Espagne)",
      esMX: "Espagnol (Mexique)",
      esAR: "Espagnol (Argentine)",
      frFR: "Français (France)",
      frCA: "Français (Canada)",
      itIT: "Italien",
      deDE: "Allemand",
      nlNL: "Néerlandais",
      ruRU: "Russe",
      jaJP: "Japonais",
      koKR: "Coréen",
      zhCN: "Chinois (simplifié)",
      zhTW: "Chinois (traditionnel)",
      arAE: "Arabe (Émirats arabes unis)",
      arEG: "Arabe (Égypte)",
      arSA: "Arabe (Arabie Saoudite)",
      arMA: "Arabe (Maroc)",
      arTN: "Arabe (Tunisie)",
      arDZ: "Arabe (Algérie)",
      hiIN: "Hindi",
      trTR: "Turc",
      plPL: "Polonais",
      svSE: "Suédois",
      noNO: "Norvégien",
      daDK: "Danois",
      fiFI: "Finnois",
      elGR: "Grec",
      huHU: "Hongrois",
      csCZ: "Tchèque",
      skSK: "Slovaque",
      roRO: "Roumain",
      bgBG: "Bulgare",
      hrHR: "Croate",
      srRS: "Serbe",
      slSI: "Slovène",
      etEE: "Estonien",
      lvLV: "Letton",
      ltLT: "Lituanien",
      mtMT: "Maltais",
      isIS: "Islandais",
      gaIE: "Irlandais",
      cyGB: "Gallois",
      euES: "Basque",
      caES: "Catalan",
      glES: "Galicien",
      caESVALENCIA: "Catalan (Valence)",
      heIL: "Hébreu",
      faIR: "Persan (Iran)",
      thTH: "Thaï",
      viVN: "Vietnamien",
      idID: "Indonésien",
      msMY: "Malais",
      filPH: "Philippin",
      bnIN: "Bengali",
      taIN: "Tamoul",
      teIN: "Télougou",
      mrIN: "Marathi",
      guIN: "Gujarati",
      knIN: "Kannada",
      mlIN: "Malayalam",
      paIN: "Pendjabi",
      urPK: "Ourdou (Pakistan)",
      sdPK: "Sindhi (Pakistan)",
      psAF: "Pachto",
      prsAF: "Dari (Afghanistan)",
      uzUZ: "Ouzbek",
      kkKZ: "Kazakh",
      kyKG: "Kirghize",
      tgTJ: "Tadjik",
      tkTM: "Turkmène",
      mnMN: "Mongol",
      neNP: "Népalais",
      siLK: "Cinghalais",
      myMM: "Birman",
      kmKH: "Khmer",
      loLA: "Laotien",
      mnMNCYRL: "Mongol (cyrillique)",
      mnMNMONG: "Mongol (traditionnel)",
      amET: "Amharique",
      tiET: "Tigrigna",
      soSO: "Somali",
      swKE: "Swahili",
      yoNG: "Yoruba",
      igNG: "Igbo",
      haNG: "Haoussa",
      zuZA: "Zoulou",
      xhZA: "Xhosa",
      afZA: "Afrikaans",
      stZA: "Sotho du Sud",
      tnZA: "Tswana",
      veZA: "Venda",
      tsZA: "Tsonga",
      nrZA: "Ndebele du Sud",
      ndZA: "Ndebele du Nord",
      nsoZA: "Sotho du Nord",
      sstZA: "Sotho du Sud (variante)",
      header: "En-tête",
      body: "Corps",
      footer: "Pied de page",
      buttons: "Boutons",
      texto: "Texte",
      imagem: "Image",
      documento: "Document",
      video: "Vidéo",
      localizacao: "Localisation",
      quickReply: "Réponse rapide",
      url: "URL",
      telefone: "Téléphone",
      otp: "OTP"
    },    
    tabs: {
      phones: "Wabas",
      templates: "Modèles",
      create: "Créer un modèle",
      instagram: "Instagram",
      messenger: "Messenger",
      facebook: "Facebook"
    },
    common: {
      selectWabaConnection: "Sélectionnez la connexion WABA",
      noWabaConnectionsAvailable: "Aucune connexion WABA disponible",
      appId: "ID de l'application",
      appIdHint: "ID d'application Facebook pour le téléchargement de médias",
      type: "Taper",
      editTemplate: "Modifier le modèle",
      nameHint: "Seules les lettres minuscules et les traits de soulignement (_) sont autorisés",
      buttonTextHint: "Maximum 25 caractères",
      fieldRequired: "Champ obligatoire",
      phoneNumberIdRequired: "L'identifiant du numéro de téléphone est requis",
      wabaIdRequired: "L'identifiant WABA est requis",
      wabaVersionRequired: "La version WABA est obligatoire",
      wabaTokenRequired: "Le jeton WABA est obligatoire",
      codeRequired: "Entrez le code reçu",
      enterPin: "Entrez le code PIN à 6 chiffres",
      enterCode: "Entrez le code reçu",
      enterPhoneNumberId: "Entrez l'ID du numéro de téléphone",
      enterWabaId: "Entrez l'identifiant WABA",
      enterWabaVersion: "Ex : v23.0",
      enterWabaToken: "Entrez le jeton d'accès"
    },
    templates: {
      title: "Modèles",
      create: "Créer un modèle",
      refresh: "Pour mettre à jour",
      noTemplates: "Aucun modèle trouvé",
      noPreview: "Aucun aperçu disponible",
      facebook: "Facebook",
      selectMessengerConnection: "Sélectionner la connexion Messenger",
      noMessengerConnectionsAvailable: "Aucune connexion Messenger disponible",
      noMessengerConnections: "Aucune connexion Messenger trouvée. Configurez d'abord une connexion Messenger dans la section Canaux de communication.",
      templateSelected: "Modèle sélectionné",
      filters: {
        status: "Statut",
        category: "Catégorie",
        language: "Langue",
        search: "Rechercher des modèles..."
      },
      actions: {
        view: "Voir",
        test: "Test",
        edit: "Modifier",
        delete: "Supprimer"
      },
      createForm: {
        basicInfo: "Informations de base",
        name: "Nom du modèle",
        nameRequired: "Le nom est obligatoire",
        appIdRequired: "L'ID de l'application est obligatoire",
        language: "Langue",
        languageRequired: "La langue est obligatoire",
        category: "Catégorie",
        categoryRequired: "La catégorie est obligatoire",
        components: "Composants",
        addComponent: "Ajouter un composant",
        component: "Composant",
        componentType: "Type de composant",
        headerFormat: "Format d'en-tête",
        text: "Texte",
        buttons: "Boutons",
        addButton: "Ajouter un bouton",
        button: "Bouton",
        buttonType: "Type de bouton",
        buttonText: "Texte du bouton",
        url: "URL",
        phoneNumber: "Numéro de téléphone",
        submit: "Créer un modèle",
        requiredFieldsNote: "Les champs marqués d'un astérisque (*) sont obligatoires"
      },
      details: {
        info: "Information",
        id: "IDENTIFIANT",
        status: "Statut",
        category: "Catégorie",
        language: "Langue",
        components: "Composants"
      },
      delete: {
        confirmTitle: "Confirmer la suppression",
        confirmMessage: "Êtes-vous sûr de vouloir supprimer le modèle « {name} » ? Cette action est irréversible."
      },
      notifications: {
        created: "Modèle créé avec succès !",
        updated: "Modèle mis à jour avec succès !",
        deleted: "Modèle supprimé avec succès !"
      },
      
      // Avertissements
      warnings: {
        marketingConvertedToUtility: "Modèle créé comme UTILITY. Les modèles de marketing dans Messenger nécessitent des notification_message_tokens via opt-in de l'utilisateur et ne peuvent pas être créés via l'endpoint message_templates."
      },
      errors: {
        listError: "Erreur lors du chargement des modèles",
        createError: "Erreur lors de la création du modèle",
        updateError: "Erreur lors de la mise à jour du modèle",
        deleteError: "Erreur lors de la suppression du modèle",
        noValidComponents: "Ajoutez au moins un composant valide (HEADER, BODY ou BUTTONS)"
      },
      
      // Traductions manquantes
      facebookCreateComingSoon: "La création de modèles Facebook sera disponible dans les prochaines versions.",
      wabaCreateComingSoon: "La création de modèles WABA sera disponible dans les prochaines versions.",
      noTemplatesFound: "Aucun modèle trouvé pour cette connexion.",
      messengerCategoryHint: "Messenger ne prend en charge que les modèles UTILITY. Les modèles de marketing nécessitent des notification_message_tokens via opt-in de l'utilisateur.",
      use: "Utiliser",
      payload: "Payload"
    },
    phones: {
      title: "Wabas",
      selectConnection: "Sélectionnez la connexion WABA",
      noConnections: "Aucune connexion WABA disponible",
      checkPhone: "Vérifier WABA",
      registerPhone: "Enregistrer WABA",
      noConnectionsFound: "Aucune connexion WABA trouvée. Veuillez d'abord configurer une connexion WABA dans la section « Canaux de communication ».",
      selectConnectionToManage: "Sélectionnez une connexion WABA pour gérer les téléphones.",
      connectionInfo: {
        title: "Informations de connexion WABA",
        phoneNumberId: "ID du numéro de téléphone",
        wabaId: "ID WABA",
        wabaVersion: "Version WABA"
      },
      phoneStatus: {
        title: "État du téléphone",
        phoneNumber: "Numéro de téléphone",
        phoneId: "identifiant du téléphone",
        verifiedName: "Nom vérifié",
        status: "Statut"
      },
      tips: {
        title: "Conseils et informations",
        phoneVerification: {
          title: "Vérification du téléphone",
          description: "Assurez-vous que votre téléphone est enregistré et actif avec l'API WhatsApp Business."
        },
        phoneRegistration: {
          title: "Inscription par téléphone",
          description: "Pour enregistrer un téléphone, vous avez besoin du code PIN à 6 chiffres fourni par Facebook Business Manager."
        },
        verifiedStatus: {
          title: "Statut vérifié",
          description: "Les téléphones vérifiés peuvent envoyer des messages et des modèles."
        },
        facebookBusinessManager: {
          title: "Gestionnaire d'entreprise Facebook",
          description: "Accès : Gestionnaire d'entreprise → API WhatsApp Business → Numéros de téléphone"
        }
      }
    },
    instagram: {
      title: "Instagram",
      selectInstagramConnection: "Sélectionner la connexion Instagram",
      noInstagramConnectionsAvailable: "Aucune connexion Instagram disponible",
      noInstagramConnections: "Aucune connexion Instagram trouvée. Veuillez d'abord configurer une connexion Instagram dans la section « Canaux de communication ».",
      selectConnectionToManage: "Sélectionnez une connexion Instagram pour gérer le compte.",
      verifyAccount: "Vérifier le compte",
      selectInstagramFirst: "Sélectionnez d'abord une connexion Instagram",
      accountInfoLoaded: "Informations du compte chargées avec succès !",
      accountCheckError: "Erreur lors de la vérification du compte Instagram",
      connectionInfo: {
        title: "Informations de connexion Instagram",
        instagramPageId: "Instagram Page ID",
        wabaId: "WABA ID",
        wabaVersion: "Version WABA"
      },
      accountInfo: {
        title: "Informations du compte Instagram",
        accountId: "ID du compte",
        username: "Nom d'utilisateur",
        name: "Nom",
        profilePicture: "Photo de profil"
      },
      tips: {
        title: "Conseils et informations",
        accountVerification: {
          title: "Vérification du compte",
          description: "Assurez-vous que le compte Instagram est connecté et actif dans Meta Business Manager."
        },
        facebookBusinessManager: {
          title: "Gestionnaire d'entreprise Facebook",
          description: "Accès : Gestionnaire d'entreprise → Instagram → Comptes connectés"
        }
      }
    },
    messenger: {
      title: "Messenger",
      selectMessengerConnection: "Sélectionner la connexion Messenger",
      noMessengerConnectionsAvailable: "Aucune connexion Messenger disponible",
      noMessengerConnections: "Aucune connexion Messenger trouvée. Veuillez d'abord configurer une connexion Messenger dans la section « Canaux de communication ».",
      selectConnectionToManage: "Sélectionnez une connexion Messenger pour gérer la page.",
      verifyAccount: "Vérifier la page",
      selectMessengerFirst: "Sélectionnez d'abord une connexion Messenger",
      accountInfoLoaded: "Informations de la page chargées avec succès !",
      accountCheckError: "Erreur lors de la vérification de la page Messenger",
      connectionInfo: {
        title: "Informations de connexion Messenger",
        fbPageId: "Facebook Page ID",
        wabaId: "WABA ID",
        wabaVersion: "Version WABA"
      },
      accountInfo: {
        title: "Informations de la page Messenger",
        pageId: "ID de la page",
        name: "Nom",
        category: "Catégorie",
        picture: "Photo de profil",
        about: "À propos",
        website: "Site Web",
        phone: "Téléphone",
        location: "Emplacement"
      },
      tips: {
        title: "Conseils et informations",
        pageVerification: {
          title: "Vérification de la page",
          description: "Assurez-vous que la page Facebook est connectée et active dans Meta Business Manager."
        },
        facebookBusinessManager: {
          title: "Gestionnaire d'entreprise Facebook",
          description: "Accès : Gestionnaire d'entreprise → Pages → Pages connectées"
        }
      }
    },
    facebook: {
      title: "Facebook",
      selectFacebookConnection: "Sélectionner la connexion Facebook",
      noFacebookConnectionsAvailable: "Aucune connexion Facebook disponible",
      noFacebookConnections: "Aucune connexion Facebook trouvée. Veuillez d'abord configurer une connexion Facebook dans la section « Canaux de communication ».",
      selectConnectionToManage: "Sélectionnez une connexion pour gérer",
      verifyPage: "Vérifier la page",
      selectFacebookFirst: "Veuillez d'abord sélectionner une connexion Facebook",
      pageInfoLoaded: "Informations de la page chargées avec succès !",
      pageCheckError: "Erreur lors de la vérification de la page Facebook",
      connectionInfo: {
        title: "Informations de la connexion",
        pageId: "Page ID",
        wabaId: "WABA ID",
        wabaVersion: "Version WABA"
      },
      pageInfo: {
        title: "Informations de la page",
        pageId: "Page ID",
        name: "Nom",
        category: "Catégorie",
        about: "À propos",
        website: "Site Web",
        phone: "Téléphone",
        profilePicture: "Photo de profil"
      },
      tips: {
        title: "Conseils",
        pageVerification: {
          title: "Vérification de la page",
          description: "Assurez-vous que la page Facebook est vérifiée et dispose des autorisations nécessaires."
        },
        facebookBusinessManager: {
          title: "Gestionnaire d'entreprise Facebook",
          description: "La page doit être liée au Facebook Business Manager et avoir les autorisations configurées."
        }
      }
    },
    phoneRegistration: {
      title: "Enregistrer le téléphone dans WABA",
      description: "Pour enregistrer un téléphone, vous avez besoin du code PIN à 6 chiffres fourni par Facebook Business Manager.",
      phoneNumberId: "ID du numéro de téléphone",
      phoneNumberIdHint: "Identifiant de téléphone unique dans WABA",
      wabaId: "ID WABA",
      wabaIdHint: "ID de compte WhatsApp Business",
      wabaVersion: "Version WABA",
      wabaVersionHint: "Version de l'API Facebook Graph",
      wabaToken: "Jeton WABA",
      wabaTokenHint: "Jeton d'accès API",
      pin: "code PIN à 6 chiffres",
      pinHint: "Code PIN à 6 chiffres pour l'inscription à Facebook Business Manager",
      register: "Numéro de téléphone d'enregistrement",
      success: "Téléphone enregistré avec succès auprès de WABA !",
      error: "Erreur lors de l'enregistrement du téléphone. Vérifiez le code PIN et les identifiants."
    },
    verification: {
      requestTitle: "Code de demande",
      verifyTitle: "Vérifier le code",
      requestDescription: "Un code de vérification sera envoyé par SMS ou appel téléphonique au numéro de téléphone enregistré.",
      verifyDescription: "Saisissez le code de vérification qui vous a été envoyé par SMS ou par appel téléphonique.",
      code: "Code",
      codeHint: "Entrez le code reçu par SMS ou appel téléphonique",
      requestCode: "Code de demande",
      requestNewCode: "Demander un nouveau code",
      verify: "Pour vérifier",
      success: "Code de vérification envoyé par SMS ou appel téléphonique ! Vérifiez votre téléphone.",
      verifySuccess: "Code vérifié avec succès ! Téléphone activé.",
      error: "Erreur lors de la demande du code de vérification.",
      verifyError: "Erreur lors de la vérification du code. Veuillez vérifier si le code est correct.",
      smsOption: "SMS",
      voiceOption: "Coup de fil",
      locale: "Emplacement",
      language: "Langue",
      methodTitle: "Méthode d'expédition",
      localeHint: "Sélectionnez l'emplacement du code de vérification",
      languageHint: "Sélectionnez la langue pour le code de vérification"
    },
    test: {
      title: "Envoyer un modèle de test",
      phoneNumber: "Numéro de téléphone de test",
      phoneNumberHint: "Entrez le numéro avec l'indicatif du pays (par exemple 5511999999999)",
      variables: "Valeurs des variables :",
      variableValue: "Valeur pour {{1}}",
      variablePlaceholder: "Entrez la valeur de {variable}",
      preview: "Aperçu du modèle :",
      sendTest: "Soumettre le test",
      success: "Modèle de test envoyé avec succès !",
      error: "Erreur lors de l'envoi du modèle de test. Vérifiez le numéro et réessayez.",
      invalidNumber: "Le numéro de téléphone doit comporter entre 10 et 15 chiffres numériques.",
      fillVariables: "Remplissez toutes les valeurs des variables du modèle."
    },
    messages: {
      selectConnectionToManage: "Sélectionnez une connexion pour gérer les modèles",
      selectWabaConnection: "Sélectionnez une connexion WABA pour afficher les modèles",
      selectWabaToCreate: "Sélectionnez une connexion WABA pour créer des modèles.",
      selectWabaToEdit: "Sélectionnez une connexion WABA pour modifier le modèle.",
      selectWabaToDelete: "Sélectionnez une connexion WABA pour supprimer le modèle.",
      selectWabaToTest: "Sélectionnez une connexion WABA pour envoyer le modèle de test.",
      selectWabaToCheck: "Sélectionnez une connexion WABA pour vérifier le téléphone.",
      selectWabaFirst: "Veuillez d’abord sélectionner une connexion WABA.",
      phoneAlreadyRegistered: "Le téléphone est déjà enregistré auprès de ce WABA !",
      phoneNotRegistered: "Le téléphone n'est pas enregistré auprès de ce WABA.",
      phoneVerifiedNotRegistered: "Téléphone vérifié chez WABA.",
      phoneNotVerified: "Numéro de téléphone non vérifié. Vous devez terminer le processus de vérification.",
      codeExpired: "Le code de vérification a expiré. La vérification doit être renouvelée.",
      sampleTemplateEdit: "Il s'agit d'un exemple de modèle fourni par Facebook et ne peut pas être modifié.",
      sampleTemplateDelete: "Il s'agit d'un exemple de modèle fourni par Facebook et ne peut pas être supprimé.",
      sampleTemplateChip: "Exemple de modèle",
      sampleTemplateEditTitle: "Les modèles d'exemple ne peuvent pas être modifiés.",
      sampleTemplateDeleteTitle: "Les modèles d'exemple ne peuvent pas être supprimés",
      noWabaConnections: "Aucune connexion WABA trouvée. Veuillez d'abord configurer une connexion WABA dans la section « Canaux de communication ».",
      noWabaConnectionsShort: "Aucune connexion WABA trouvée. Veuillez d'abord établir une connexion WABA.",
      allFieldsRequired: "Tous les champs sont obligatoires, y compris le code PIN à 6 chiffres.",
      pinFormatError: "Le code PIN doit comporter exactement 6 chiffres.",
      enterPhoneNumber: "Entrez un numéro de téléphone à tester.",
      enterCode: "Saisissez le code de vérification reçu par SMS ou appel téléphonique.",
      codeExpiredDialog: {
        title: "Code expiré",
        message: "Le code de vérification de ce téléphone a expiré. Souhaitez-vous en demander un nouveau ?"
      },
      phoneNotVerifiedDialog: {
        title: "Téléphone non vérifié",
        message: "Ce numéro de téléphone n'a pas été vérifié. Souhaitez-vous demander un code de vérification ?"
      }
    },
    statusOptions: {
      approved: "Approuvé",
      pending: "En attente",
      rejected: "Rejeté",
      inAppeal: "En appel",
      disabled: "Désactivé"
    },
    categoryOptions: {
      utility: "Utilitaire",
      marketing: "Commercialisation",
      authentication: "Authentification"
    },
    languageOptions: {
      ptBR: "Portugais (Brésil)",
      enUS: "Anglais (États-Unis)",
      esES: "Espagnol"
    },
    componentTypeOptions: {
      header: "En-tête",
      body: "Corps",
      footer: "Plinthe",
      buttons: "Boutons"
    },
    headerFormatOptions: {
      text: "Texte",
      image: "Image",
      document: "Document",
      video: "Vidéo",
      location: "Emplacement"
    },
    buttonTypeOptions: {
      quickReply: "Réponse rapide",
      url: "URL",
      phoneNumber: "Téléphone",
      otp: "OTP"
    },
    headerFields: {
      imageUrl: "URL de l'image (exemple)",
      imagePlaceholder: "https://exemplo.com/imagem.jpg",
      documentUrl: "URL du document (exemple)",
      documentPlaceholder: "https://exemplo.com/documento.pdf",
      videoUrl: "URL de la vidéo (exemple)",
      videoPlaceholder: "https://exemplo.com/video.mp4",
      latitude: "Latitude (exemple)",
      latitudePlaceholder: "-23.5505",
      longitude: "Longitude (exemple)",
      longitudePlaceholder: "-46,6333",
      locationName: "Nom du lieu (exemple)",
      locationNamePlaceholder: "São Paulo, SP"
    },
    characterLimits: {
      header: "Maximum 60 caractères",
      body: "Maximum 1024 caractères",
      footer: "Maximum 60 caractères",
      button: "Maximum 25 caractères"
    },
    preview: {
      title: "Aperçu du modèle",
      imageLoadError: "Échec du chargement de l'image",
      urlNotAvailable: "URL/identifiant non disponible",
      addButtonToStart: "Cliquez sur « Ajouter un bouton » pour commencer à configurer vos boutons."
    },
    buttons: {
      cancel: "Annuler",
      sendTest: "Soumettre le test",
      registerPhone: "Numéro de téléphone d'enregistrement",
      requestCode: "Code de demande",
      requestNewCode: "Demander un nouveau code",
      verify: "Pour vérifier",
      checkPhone: "Vérifier le téléphone"
    },
    dynamic: {
      actionButton: "Action {index}",
      buttonNumber: "bouton {index}"
    },
    notifications: {
      noWabaConnectionsFound: "Aucune connexion WABA trouvée. Veuillez d'abord établir une connexion WABA.",
      selectWabaToList: "Sélectionnez une connexion WABA pour répertorier les modèles.",
      noMessengerConnectionsFound: "Aucune connexion Messenger trouvée. Configurez d'abord une connexion Messenger.",
      selectMessengerToList: "Sélectionnez une connexion Messenger pour lister les modèles.",
      selectWabaToCreate: "Sélectionnez une connexion WABA pour créer le modèle.",
      selectWabaToEdit: "Sélectionnez une connexion WABA pour modifier le modèle.",
      selectWabaToDelete: "Sélectionnez une connexion WABA pour supprimer le modèle.",
      selectWabaToTest: "Sélectionnez une connexion WABA pour envoyer le modèle de test.",
      selectWabaToCheck: "Sélectionnez une connexion WABA pour vérifier le téléphone.",
      selectWabaFirst: "Veuillez d’abord sélectionner une connexion WABA.",
      phoneAlreadyRegistered: "Le téléphone est déjà enregistré auprès de ce WABA !",
      templateCreated: "Modèle créé avec succès !",
      templateUpdated: "Modèle mis à jour avec succès !",
      templateDeleted: "Modèle supprimé avec succès !",
      phoneRegistered: "Téléphone enregistré avec succès auprès de WABA !",
      codeSent: "Code de vérification envoyé par SMS ou appel téléphonique ! Vérifiez votre téléphone.",
      codeVerified: "Code vérifié avec succès ! Téléphone activé.",
      testSent: "Modèle de test envoyé avec succès !",
      codeExpired: "Le code de vérification a expiré. La vérification doit être renouvelée.",
      phoneVerifiedNotRegistered: "Téléphone vérifié chez WABA.",
      phoneNotVerified: "Numéro de téléphone non vérifié. Vous devez terminer le processus de vérification.",
      phoneNotRegistered: "Le téléphone n'est pas enregistré auprès de ce WABA.",
      sampleTemplateEdit: "Il s'agit d'un exemple de modèle fourni par Facebook et ne peut pas être modifié.",
      sampleTemplateDelete: "Il s'agit d'un exemple de modèle fourni par Facebook et ne peut pas être supprimé.",
      nameFormatted: "Le nom du modèle a été automatiquement formaté pour suivre les règles de Facebook (lettres minuscules et traits de soulignement uniquement).",
      characterLimitExceeded: "Limite de caractères dépassée",
      characterLimitsExceeded: "Limites dépassées : {détails}",
      fillVariables: "Remplissez toutes les valeurs des variables du modèle.",
      invalidNumber: "Le numéro de téléphone doit comporter entre 10 et 15 chiffres.",
      allFieldsRequired: "Tous les champs sont obligatoires, y compris le code PIN à 6 chiffres.",
      pinFormatError: "Le code PIN doit comporter exactement 6 chiffres.",
      enterPhoneNumber: "Entrez un numéro de téléphone à tester.",
      enterCode: "Saisissez le code de vérification reçu par SMS ou appel téléphonique.",
      listError: "Erreur lors du chargement des modèles",
      createError: "Erreur lors de la création du modèle",
      updateError: "Erreur lors de l'édition du modèle",
      deleteError: "Erreur lors de la suppression du modèle",
      testError: "Erreur lors de l'envoi du modèle de test. Vérifiez le numéro et réessayez.",
      phoneCheckError: "Erreur lors de la vérification du téléphone. Veuillez vérifier vos identifiants.",
      phoneRegistrationError: "Erreur lors de l'enregistrement du téléphone. Vérifiez le code PIN et les identifiants.",
      codeRequestError: "Erreur lors de la demande du code de vérification.",
      codeVerificationError: "Erreur lors de la vérification du code. Veuillez vérifier si le code est correct.",
      uploadError: "Erreur lors de l'envoi de l'image. Vérifiez votre connexion et réessayez.",
      uploadSuccess: "Image téléchargée avec succès ! Identifiant d'en-tête : {handle}",
      codeExpiredDialog: {
        title: "Code expiré",
        message: "Le code de vérification de ce téléphone a expiré. Souhaitez-vous en demander un nouveau ?"
      },
      phoneNotVerifiedDialog: {
        title: "Téléphone non vérifié",
        message: "Ce numéro de téléphone n'a pas été vérifié. Souhaitez-vous demander un code de vérification ?"
      }
    }
  },
  googleCallback: {
    processing: "Autorisation de traitement...",
    waitMessage: "Veuillez patienter pendant que nous traitons votre autorisation Google Agenda.",
    errors: {
      authorization: "Erreur d'autorisation : {error}",
      codeNotFound: "Code d'autorisation introuvable",
      configNameNotFound: "Nom de configuration introuvable",
      noConfigFound: "Aucune configuration trouvée",
      configNotFoundForName: "Configuration introuvable pour le nom : {name}",
      invalidTokens: "Erreur lors de l'obtention des jetons : données non valides renvoyées",
      saveTokensError: "Erreur lors de l'enregistrement des jetons : {error}",
      processAuthorizationError: "Erreur lors du traitement de l'autorisation : {error}"
    },
    success: {
      authorizationCompleted: "Autorisation complétée avec succès !"
    },
    warnings: {
      noParameters: "Aucun paramètre trouvé dans l'URL"
    }
  },
  googleCalendar: {
    title: "Google Agenda",
    config: {
      modal: {
        redirectUri: {
          label: "URL de redirection",
          hint: "URL pour recevoir le code d'autorisation",
          copyTooltip: "Copier dans le presse-papiers",
          copySuccess: "URL de redirection copiée dans le presse-papiers !",
          copyError: "Impossible de copier dans le presse-papiers. Copiez manuellement !"
        },        
        editTitle: "Modifier la configuration",
        newTitle: "Nouvelle configuration",
        completeMessage: "Installation terminée ! Vous pouvez enregistrer.",
        incompleteMessage: "Remplissez tous les champs et obtenez les jetons à économiser.",
        name: {
          label: "Nom de la configuration",
          required: "Le nom est obligatoire",
          hint: "Ex : Agenda principal, Agenda personnel, etc."
        },
        clientId: {
          label: "ID client Google",
          required: "L'identifiant client est requis"
        },
        clientSecret: {
          label: "Secret du client Google",
          required: "Le secret client est obligatoire"
        },
        accessToken: {
          label: "Jeton d'accès",
          required: "Le jeton d'accès est obligatoire"
        },
        refreshToken: {
          label: "Jeton d'actualisation",
          required: "Le jeton d'actualisation est obligatoire"
        },
        getTokensButton: "Obtenez des jetons automatiquement",
        getTokensTooltip: "Cliquez pour obtenir automatiquement le jeton d'accès et le jeton d'actualisation",
        saveButton: "Enregistrer la configuration",
        cancelButton: "Annuler",
        deleteButton: "Supprimer la configuration"
      },
      management: {
        title: "Gérer les paramètres",
        newButton: "Nouvelle configuration",
        table: {
          name: "Nom",
          status: "Statut",
          tokens: "Jetons",
          createdAt: "Créé en",
          actions: "Actes",
          statusActive: "Actif",
          statusInactive: "Inactif",
          tokensComplete: "Complet",
          tokensPending: "En attente"
        },
        actions: {
          edit: "Modifier la configuration",
          delete: "Supprimer la configuration"
        }
      },
      errors: {
        fillRequiredFields: "Remplissez tous les champs obligatoires",
        saveError: "Erreur lors de l'enregistrement de la configuration : {error}",
        deleteError: "Erreur lors de la suppression de la configuration : {error}",
        fillClientCredentials: "Remplissez d'abord l'ID client et le secret client",
        fillConfigName: "Remplissez d'abord le nom de la configuration",
        generateAuthUrlError: "Erreur lors de la génération de l'URL d'autorisation : {error}",
        redirectingAuth: "Redirection vers l'autorisation Google..."
      },
      success: {
        saved: "Configuration enregistrée avec succès !",
        deleted: "Configuration supprimée avec succès !",
        selectedForEdit: "Configuration sélectionnée pour l'édition."
      },
      confirm: {
        deleteTitle: "Confirmer la suppression",
        deleteMessage: "Êtes-vous sûr de vouloir supprimer ce paramètre ?",
        deleteCalendarMessage: "Êtes-vous sûr de vouloir supprimer ce paramètre de Google Agenda ?"
      }
    },
    events: {
      create: {
        modal: {
          titleCreate: "Créer un nouvel événement",
          title: {
            label: "Titre de l'événement",
            required: "Le titre est obligatoire"
          },
          selectCalendar: "Sélectionnez le calendrier",
          selectCalendarRequired: "Sélectionnez un horaire",
          noConfigAvailable: "Aucune configuration disponible",
          startDateTime: {
            label: "Date et heure de début",
            required: "La date de début est obligatoire"
          },
          endDateTime: {
            label: "Date et heure de fin",
            required: "La date de fin est obligatoire"
          },
          description: {
            label: "Description"
          },
          location: {
            label: "Emplacement"
          },
          attendees: {
            label: "Participants (e-mails séparés par des virgules)",
            hint: "exemple@email.com, autre@email.com"
          },
          createButton: "Créer un événement",
          cancelButton: "Annuler"
        },
        errors: {
          selectConfig: "Sélectionnez une configuration pour créer l'événement.",
          configNotFound: "Configuration sélectionnée non trouvée.",
          configureCredentials: "Configurez d’abord vos identifiants Google Agenda",
          createError: "Erreur lors de la création de l'événement : {error}"
        },
        success: {
          created: "Événement créé avec succès !"
        }
      },
      list: {
        title: "Événements",
        selectCalendar: "Sélectionnez le calendrier",
        noConfigAvailable: "Aucune configuration disponible",
        createNewButton: "Créer un nouvel événement",
        createNewTooltip: "Créer un nouvel événement dans Google Agenda",
        filters: {
          startDate: "Date de début",
          endDate: "Date de fin",
          maxResults: "Nombre de résultats",
          searchButton: "Recherche"
        },
        table: {
          title: "Titre",
          start: "Commencer",
          end: "Fin",
          location: "Emplacement",
          status: "Statut",
          actions: "Actes"
        },
        actions: {
          edit: "Modifier l'événement",
          delete: "Supprimer l'événement",
          open: "Ouvrir dans Google Agenda"
        },
        errors: {
          selectConfig: "Sélectionnez une configuration pour rechercher des événements.",
          configNotFound: "Configuration sélectionnée non trouvée.",
          configureCredentials: "Configurez d’abord vos identifiants Google Agenda",
          loadError: "Erreur lors du chargement des événements : {error}"
        }
      },
      edit: {
        modal: {
          titleEdit: "Modifier l'événement",
          title: {
            label: "Titre de l'événement",
            required: "Le titre est obligatoire"
          },
          startDateTime: {
            label: "Date et heure de début",
            required: "La date de début est obligatoire"
          },
          endDateTime: {
            label: "Date et heure de fin",
            required: "La date de fin est obligatoire"
          },
          description: {
            label: "Description"
          },
          location: {
            label: "Emplacement"
          },
          attendees: {
            label: "Participants (e-mails séparés par des virgules)",
            hint: "exemple@email.com, autre@email.com"
          },
          updateButton: "Événement de mise à jour",
          cancelButton: "Annuler"
        },
        errors: {
          selectConfig: "Sélectionnez un paramètre pour mettre à jour l'événement.",
          configNotFound: "Configuration sélectionnée non trouvée.",
          updateError: "Erreur lors de la mise à jour de l'événement : {error}"
        },
        success: {
          updated: "Événement mis à jour avec succès !"
        }
      },
      delete: {
        confirm: {
          title: "Confirmer la suppression",
          message: "Êtes-vous sûr de vouloir supprimer cet événement ?"
        },
        errors: {
          selectConfig: "Sélectionnez un paramètre pour supprimer l'événement.",
          configNotFound: "Configuration sélectionnée non trouvée.",
          deleteError: "Erreur lors de la suppression de l'événement : {error}"
        },
        success: {
          deleted: "L'événement a été supprimé avec succès !"
        }
      }
    }
  },
  gmailCallback: {
    processing: "Traitement de l'autorisation...",
    waitMessage: "Veuillez patienter pendant que nous traitons votre autorisation Gmail.",
    title: "Autorisation Gmail terminée !",
    message: "Votre compte Gmail a été configuré avec succès pour OAuth2.",
    infoSession: "Informations de session :",
    whatsappId: "ID WhatsApp :",
    status: "Statut :",
    data: "Date :",
    closeWindow: "Fermer la fenêtre",
    errorTitle: "Erreur d'autorisation",
    debugInfo: "Informations de débogage :",
    fullUrl: "URL complète :",
    parameters: "Paramètres :",
    retry: "Réessayer",
    callbackTitle: "Callback Gmail",
    waitingMessage: "En attente du traitement de l'autorisation...",
    noParametersFound: "Aucun paramètre trouvé dans l'URL",
    authorizationError: "Erreur d'autorisation",
    codeNotFound: "Code d'autorisation introuvable",
    whatsappIdNotFound: "ID WhatsApp introuvable",
    saveTokensError: "Erreur lors de l'enregistrement des jetons",
    processAuthorizationError: "Erreur lors du traitement de l'autorisation"
  },
  massaWavoip: {
    title: "Wavoip - Appels de Masse",
    sections: {
      sessions: {
        title: "Sessions Wavoip",
        refresh: "Actualiser",
        noSessions: "Aucune session avec token Wavoip trouvée",
        connectButton: "Connecter les Sessions",
        connecting: "Connexion...",
        status: {
          connected: "Connecté",
          disconnected: "Déconnecté",
          online: "En ligne",
          offline: "Hors ligne"
        }
      },
      phoneNumbers: {
        title: "Numéros de Téléphone",
        addButton: "Ajouter un Numéro",
        noNumbers: "Aucun numéro ajouté",
        dialog: {
          title: "Ajouter un Numéro",
          message: "Entrez le numéro de téléphone (avec code pays):",
          placeholder: "Ex: 5511999999999"
        }
      },
      audioFile: {
        title: "Fichier Audio",
        selectFile: "Sélectionner un fichier audio",
        supportedFormats: "Formats supportés: MP3, WAV, OGG, M4A, AAC",
        dragDrop: "Glissez un fichier audio ici ou cliquez pour sélectionner",
        dragActive: "Déposez le fichier ici..."
      },
      status: {
        title: "Statut des Sessions",
        makeCall: "Faire un appel à:",
        callButton: "Appeler"
      },
      callControls: {
        incomingCall: "Appel Entrant",
        activeCall: "Appel Actif",
        accept: "Accepter",
        reject: "Rejeter",
        injectAudio: "Injecter l'Audio",
        playing: "Lecture...",
        endCall: "Terminer",
        transmittingAudio: "🎵 Transmission audio dans l'appel"
      }
    },
    notifications: {
      selectSession: "Sélectionnez au moins une session",
      sessionNotConnected: "La session n'est pas connectée",
      noAudioFile: "Aucun fichier audio chargé",
      invalidInstance: "Instance Wavoip invalide",
      connectionsEstablished: "Connexions établies!",
      wavoipError: "Erreur de connexion à Wavoip",
      callStarted: "Appel démarré!",
      callError: "Erreur lors du démarrage de l'appel",
      callAccepted: "Appel accepté!",
      acceptError: "Erreur lors de l'acceptation de l'appel",
      callRejected: "Appel rejeté",
      callEnded: "Appel terminé",
      endError: "Erreur lors de la fin de l'appel",
      audioTransmitted: "Audio transmis dans l'appel!",
      audioError: "Erreur lors de l'injection audio",
      audioFileError: "Erreur lors du chargement du fichier audio",
      wavoipLibraryError: "Erreur lors du chargement de la bibliothèque Wavoip",
      numberAdded: "Numéro ajouté: {number}",
      numberRemoved: "Numéro supprimé: {number}",
      fileLoaded: "Fichier chargé: {filename}",
      fileRemoved: "Fichier supprimé",
      sessionsUpdated: "Sessions mises à jour",
      callReceived: "Appel reçu de {name}"
    },
    logs: {
      audioContextInitialized: "AudioContext initialisé",
      audioContextNotSupported: "AudioContext non supporté dans ce navigateur",
      audioContextError: "Erreur lors de l'initialisation d'AudioContext: {error}",
      globalInterceptionSetup: "Configuration de l'interception globale getUserMedia...",
      globalInterceptionConfigured: "Interception globale configurée",
      globalInterceptionError: "Erreur lors de la configuration de l'interception: {error}",
      wavoipInitializing: "Initialisation des connexions Wavoip...",
      sessionExpanded: "Session {name} étendue en {count} tokens",
      sessionInitialized: "Session {name} initialisée",
      sessionConnected: "Session {name} connectée",
      sessionDisconnected: "Session {name} déconnectée",
      sessionNoToken: "Session {sessionId} n'a pas de token Wavoip",
      sessionConnectError: "Erreur de connexion de la session {name}: {error}",
      wavoipImportError: "Erreur lors de l'importation de Wavoip: {error}",
      wavoipNotLoaded: "Wavoip n'a pas été chargé correctement",
      connectionFailed: "Échec de la connexion - instance non créée",
      callStarting: "Démarrage d'appel vers {number}",
      callStarted: "Appel démarré vers {number}",
      callStartError: "Erreur lors du démarrage de l'appel: {error}",
      signalingData: "Données de signalisation: {data}",
      acceptEvent: "Événement accept reçu pour la session: {sessionId}",
      callTerminated: "Appel terminé",
      callRejected: "Appel rejeté",
      callAccepted: "Appel accepté",
      audioInjecting: "Injection audio dans l'appel...",
      audioInjected: "Audio injecté avec succès!",
      audioInjectionError: "Erreur lors de l'injection audio: {error}",
      audioNotLoaded: "Fichier audio non chargé",
      audioTransmissionEnded: "Transmission audio terminée",
      audioStopping: "Arrêt de tous les audios",
      audioStopped: "Tous les audios arrêtés",
      audioFileLoaded: "Fichier audio chargé: {filename}",
      audioFileError: "Erreur lors du chargement du fichier audio: {error}",
      audioContextNotAvailable: "AudioContext non disponible pour charger le fichier",
      getUserMediaCalled: "getUserMedia appelé par l'interception",
      interceptingGetUserMedia: "Interception getUserMedia - retour du flux MP3",
      usingOriginalGetUserMedia: "Utilisation du getUserMedia original",
      instanceCleaning: "Nettoyage de l'instance de session {sessionId}",
      instanceRemoved: "Instance de session {sessionId} supprimée",
      instanceCleanupError: "Erreur lors du nettoyage de l'instance: {error}",
      resourcesCleaning: "Nettoyage des ressources...",
      cleanupComplete: "Nettoyage complet terminé",
      sourceStopError: "Erreur lors de l'arrêt de la source: {error}"
    }
  },
  migration: {
    title: 'Migration de Tenants',
    totalMigrations: 'Total de Migrations',
    completed: 'Terminées',
    inProgress: 'En Cours',
    failed: 'Échouées',
    newMigration: 'Nouvelle Migration',
    migrationInfoTitle: 'Informations sur la Migration',
    migrationInfoDescription: 'Migrez un tenant complet d\'un VPS à un autre, incluant toutes les données et fichiers.',
    requirements: 'Exigences',
    remoteDatabase: 'Configuration de la Base de Données Distante',
    dbHost: 'Hôte',
    dbPort: 'Port',
    dbDialect: 'Dialecte',
    dbName: 'Nom de la Base de Données',
    dbUser: 'Utilisateur',
    dbPassword: 'Mot de passe',
    sshConfig: 'Configuration SSH',
    sshHost: 'Hôte SSH',
    sshPort: 'Port SSH',
    sshUser: 'Utilisateur SSH',
    sshPassword: 'Mot de passe SSH',
    sshPasswordOrKey: 'Ou utilisez une clé privée',
    sshPrivateKey: 'Clé Privée SSH',
    zproBasePath: 'Chemin de Base ZPRO',
    publicFolderPath: 'Chemin du Dossier Public',
    migrationConfig: 'Configuration de Migration',
    sourceTenantId: 'ID du Tenant Source',
    targetTenantId: 'ID du Tenant Cible',
    startMigration: 'Démarrer la Migration',
    migrationsList: 'Liste des Migrations',
    refresh: 'Actualiser',
    viewDetails: 'Voir les Détails',
    resume: 'Reprendre',
    migrationDetails: 'Détails de la Migration',
    basicInfo: 'Informations de Base',
    status: 'Statut',
    createdAt: 'Créé le',
    updatedAt: 'Mis à jour le',
    progressInfo: 'Informations de Progression',
    currentStep: 'Étape Actuelle',
    progress: 'Progression',
    currentModel: 'Modèle Actuel',
    files: 'Fichiers',
    completedModels: 'Modèles Terminés',
    error: 'Erreur',
    close: 'Fermer',
    confirm: 'Confirmer',
    chooseMigrationType: 'Choisissez le type de migration:',
    fullMigration: 'Migration Complète (Base de Données + Fichiers)',
    databaseOnly: 'Base de Données Seulement',
    filesOnly: 'Fichiers Seulement',
    loadSavedConfig: 'Charger la configuration sauvegardée',
    saveConfig: 'Sauvegarder la configuration',
    clearSavedConfig: 'Effacer la configuration sauvegardée',
    savedConfigAvailable: 'Configuration sauvegardée disponible. Cliquez sur l\'icône de sauvegarde (vert) pour charger.',
    configSavedSuccess: 'Configuration sauvegardée avec succès',
    configSavedMessage: 'La configuration a été sauvegardée et peut être réutilisée',
    configSaveError: 'Erreur lors de la sauvegarde de la configuration',
    configLoadedSuccess: 'Configuration chargée avec succès',
    configSavedAt: 'Sauvegardée le:',
    noSavedConfig: 'Aucune configuration sauvegardée trouvée',
    configLoadError: 'Erreur lors du chargement de la configuration',
    confirmClearConfig: 'Voulez-vous vraiment effacer la configuration sauvegardée?',
    configClearedSuccess: 'La configuration sauvegardée a été supprimée',
    configClearError: 'Erreur lors de l\'effacement de la configuration',
    databaseMigrationStarted: 'Migration de base de données démarrée avec succès',
    databaseMigrationError: 'Erreur lors du démarrage de la migration de base de données',
    filesMigrationStarted: 'Migration de fichiers démarrée avec succès',
    filesMigrationError: 'Erreur lors du démarrage de la migration de fichiers',
    migrationLogs: 'Logs de Migration',
    refreshLogs: 'Actualiser les logs',
    downloadLog: 'Télécharger le log',
    noLogsAvailable: 'Aucun log disponible',
    logsLoadError: 'Erreur lors du chargement des logs',
    logDownloadSuccess: 'Log téléchargé avec succès',
    logDownloadError: 'Erreur lors du téléchargement du log',
    retryDatabase: 'Réessayer la Migration de Base de Données',
    retryFiles: 'Réessayer la Migration de Fichiers',
    pause: 'Pause',
    pauseSuccess: 'Migration mise en pause avec succès',
    pauseError: 'Erreur lors de la mise en pause de la migration'
  },
  updateNotification: {
    title: 'Nouvelle version disponible !',
    message: 'Une nouvelle version de l\'application est disponible. Mettez à jour pour obtenir les dernières améliorations. Sur le bureau, mettez à jour avec la commande Ctrl+Shift+R.',
    updateButton: 'Mettre à jour maintenant'
  }
};
