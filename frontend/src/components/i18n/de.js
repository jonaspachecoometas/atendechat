export default {
  pushNotification: {
    activeSubscriptionWebPush: "Push-Benachrichtigungen aktivieren",
    updateSubscriptionWebPush: "Push-Benachrichtigungen aktualisieren"
  },
  buscarMensagemModal: {
    title: "Nachrichten suchen ",
    searchPlaceholder: "Geben Sie einen Suchbegriff ein",
    searchButton: "Suchen",
    loadingMessages: "Suche nach Nachrichten...",
    loadingMoreMessages: "Weitere Nachrichten werden geladen …",
    atendimento: "Service: #",
    messageDate: "Datum der Nachricht: ",
    channel: "Kanal: ",
    status: "Status: ",
    group: "Gruppe: ",
    lastMessage: "Letzte Nachricht: ",
    unknown: "Unbekannt",
    noMessages: "Keine Nachrichten",
    closeButton: "Schließen",
    statusMap: {
      closed: "Geschlossen",
      open: "Offen",
      pending: "Ausstehend",
      schedule: "Geplant"
    },
    isGroup: {
      yes: "Ja",
      no: "NEIN"
    }
  },
  generalAgendamento: {
    appointments: "Termine",
    addAppointment: "Zeitplan hinzufügen",
    attention: "Aufmerksamkeit!! Möchten Sie diese Nachricht wirklich löschen?",
    oldMessages: "Alte Nachrichten werden im Client nicht gelöscht.",
    yes: "Ja",
    no: "NEIN",
    message: "Nachricht",
    contact: "Kontakt",
    actions: "Aktionen",
    status: "Status",
    type: "Typ",
    date: "Datum",
    created: "Erstellt",
    dateFormat: "tt/MM/jjjj HH:mm:ss"
  },
  status: {
    open: "Offen",
    closed: "Geschlossen",
    pending: "Ausstehend",
    schedule: "Geplant",
    undefined: "Unbestimmt"
  },
  type: {
    chat: "Text",
    image: "Bild",
    templates: "Vorlage",
    video: "Video",
    application: "Datei",
    text: "Datei"
  },
  dialog: {
    title: "Nachrichtenplanung",
    close: "Schließen",
    selectWhatsapp: "Wählen Sie WhatsApp",
    selectContact: "Wählen Sie Kontakt",
    loadingContacts: "Bitte warten ... Kontakte werden geladen!",
    searchTip: "Suche nach Namen oder Telefonnummer!"
  },
  inputMensagemAgendamento: {
    added: "Hinzugefügt",
    templateError: "Keine Vorlage ausgewählt.",
    scheduleError: "Um eine Nachricht zu planen, geben Sie das Datum/die Uhrzeit der Planung in das Feld ein.",
    templateScheduledSuccess: "Vorlage(n) erfolgreich geplant!",
    templateSendError: "Fehler beim Senden der Vorlage.",
    recurrenceCountLabel: "Wiederholungen (Standard für die Nachrichtenerstellung: 1)",
    recurrenceLabel: "Wiederauftreten",
    noRepeat: "Nicht wiederholen",
    every5Days: "Alle 5 Tage",
    every10Days: "Alle 10 Tage",
    every15Days: "Alle 15 Tage",
    every20Days: "Alle 20 Tage",
    every25Days: "Alle 25 Tage",
    every30Days: "Alle 30 Tage",
    every35Days: "Alle 35 Tage",
    every40Days: "Alle 40 Tage",
    every45Days: "Alle 45 Tage",
    every60Days: "Alle 60 Tage",
    customRecurrence: "Benutzerdefinierte Wiederholung",
    customRecurrenceDaysLabel: "Tage der benutzerdefinierten Wiederholung",
    messageScheduled: "Nachricht erfolgreich geplant!",
    placeholder: "Geben Sie Ihre Nachricht ein",
    scheduleFile: "Zeitplandatei",
    scheduleMessage: "Nachricht planen",
    scheduleSticker: "Zeitplan-Aufkleber",
    scheduleImageTo: "Bild planen für",
    scheduleVideo: "Link zur Videokonferenz planen",
    templates: "Vorlagen",
    activateSignature: "Abonnement aktivieren",
    deactivateSignature: "Abonnement deaktivieren",
    confirmSend: "Senden bestätigen: Eingeben",
    cancelSend: "Abbrechen: ESC",
    scheduleDateLabel: "Termindatum/-uhrzeit",
    customSchedule: "Benutzerdefinierte Planung",
    thirthyMinutes: "In 30 Minuten",
    isTomorrow: "Morgen",
    nextWeek: "Nächste Woche",
    selectTemplate: "Wählen Sie eine Vorlage",
    schedule: "Planen",
    cancel: "Stornieren",
    selectWhatsapp: "Wählen Sie WhatsApp",
    selectContact: "Wählen Sie Kontakt",
    emoji: "Emoji",
    find: "Lokalisieren...",
    invalidFile: "Ungültige Datei",
    acceptFormats: "Akzeptierte Formate",
    error: "Ein Fehler ist aufgetreten",
    fileNotFound: "Es sind keine Dateien zum Hochladen vorhanden",
    messageNotFound: "Es sind keine Nachrichten zum Senden vorhanden",
    checkFiles: "Überprüfen Sie die Größe und Erweiterungen der ausgewählten Dateien"
  },
  mixinCommonAgendamento: {
    note: "Beachten",
    buttonNotAvailable: "Diese Schaltfläche kann nur auf Mobilgeräten angeklickt werden",
    dateFormat: "tt/MM/jjjj"
  },
  aniversarios: {
    title: "Geburtstage",
    sendManualMessage: "Geburtstagsnachrichten manuell senden",
    modalTitle: "Wählen Sie WhatsApp",
    modalDescription: "Geburtstagsnachrichten manuell senden",
    modalWarning: "Wenn Sie auf „Senden“ klicken, wird die im Kanal registrierte Geburtstagsnachricht an alle Personen gesendet, die an diesem Tag Geburtstag haben.",
    sendingMessages: "Bitte warten, Geburtstagsnachrichten werden gesendet …",
    sendingMessagesSuccess: "Geburtstagsnachrichten erfolgreich versendet!",
    sendingMessagesError: "Fehler beim Senden von Geburtstagsnachrichten.",
    cancel: "Stornieren",
    send: "Senden",
    whatsappLabel: "WhatsApp",
    columns: {
      id: "#",
      name: "Name",
      birthdayDate: "Geburtstag",
      actions: "Aktionen"
    }
  },
  api: {
    title: "API-Einstellungen",
    addButton: "Hinzufügen",
    postmanButton: "BRIEFTRÄGER",
    copyToken: "Token kopieren",
    editConfig: "Konfiguration bearbeiten",
    newToken: "Neues Token generieren",
    deleteConfig: "Konfiguration löschen",
    url: "URL",
    bearerToken: "Inhabertoken",
    key: "Schlüssel",
    actions: "Aktionen",
    dialogDeleteTitle: "Aufmerksamkeit!!",
    dialogDeleteMessage: "Möchten Sie wirklich löschen?",
    dialogNewTokenMessage: "Möchten Sie wirklich ein neues Token generieren für",
    deleteSuccess: "gelöscht!",
    deleteError: "Konnte nicht gelöscht werden.",
    tokenUpdated: "Token aktualisiert!",
    tokenUpdateError: "Token kann nicht aktualisiert werden.",
    tokenCopied: "Token kopiert!",
    dialogCancel: "NEIN",
    dialogConfirm: "Ja",
    columns: {
      name: "Name",
      token: "Zeichen",
      isActive: "Aktiv",
      actions: "Aktionen"
    }
  },
  modalApi: {
    titleCreate: "API-Konfiguration erstellen",
    titleEdit: "API-Konfiguration bearbeiten",
    fieldsetApiData: "API-Daten",
    apiNameLabel: "API-Name",
    apiSessionLabel: "Senden per",
    apiSessionError: "Obligatorisch",
    apiSessionHint: "Optional. Leer lassen für Abfrage-/Auflistungs-APIs, die keine Sitzung erfordern",
    apiAuthTokenLabel: "Authentifizierungstoken",
    apiAuthTokenHint: "Es wird als Autorisierung im Header gesendet. Falls ein Präfix vorhanden ist, muss dieses hier eingetragen werden. Beispiel: Inhaber, Token",
    apiAuthTokenError: "Authentifizierungstoken ist obligatorisch",
    fieldsetWebhook: "WebHook",
    activeLabel: "Aktiv",
    cancelButton: "Stornieren",
    saveButton: "Speichern",
    wabaBannerTitle: "Offizielle API (WABA)",
    wabaBannerDescription1: "Verfügbare Endpunkte: SetQueue, SetTicketInfo, SetTag, ShowTicketInformation, ShowChannelInformation, ShowTicketInformationChatBot, ShowAllTicketInformation",
    wabaBannerDescription2: "SendMessageParams, SendMessageAPIFile, SendMessageAPIFileURL, SendMessageAPIText und SendMessageAPITextBase64",
    wabaBannerDescription3: "Verwenden Sie zum Senden von Nachrichten und anderen Komponenten die offizielle Meta-Sammlung: ",
    wabaBannerLink: "Link",
    validationError: "Überprüfen Sie Pflichtfelder und Unstimmigkeiten.",
    apiCreatedSuccess: "API erfolgreich erstellt.",
    apiEditedSuccess: "API erfolgreich bearbeitet.",
    apiError: "Es ist ein Fehler aufgetreten!"
  },
  assinatura: {
    lookForUpdatedData: "Daten der Lizenz aktualisieren...",
    updateInfo: "Informationen aktualisieren",
    licenseRefreshError: "Fehler beim Aktualisieren der Lizenz",
    domainModalTitle: 'Domänen',
    domainModalSubtitle: 'Fügen Sie die Domänen hinzu, die Sie freigeben möchten',
    domainFieldLabel: 'Domänen (durch Komma getrennt)',
    domains: "Domänen: ",
    backendVersion: "Backend-Version: ",
    domainWarning: "⚠️ Achtung: Der Domain-Name \"whatsapp.com\" ist nur exemplarisch. Ändern Sie ihn in den Domain-Namen, auf dem das System installiert ist (z.B.: your-domain.com).",
    frontendVersion: "Frontend-Version: ",
    expireIn: "Diese Version läuft ab in: ",
    remainingDays: "Nächstes Pflichtupdate in: ",
    expiredVersion: "Abgelaufene Version!",
    days: "Tage",
    blockOn: "Blockiert",
    blockOff: "Freigegeben",
    license_code: "Lizenzcode: ",
    license_expiry: "Ablauf der Lizenz: ",
    is_blocked: "Gesperrt: ",
    pageTitle: "Lizenzverwaltung",
    pageSubtitle: "Lizenzinformationen kontrollieren und anpassen.",
    license: "Lizenz: ",
    licenseStatusLabel: "Lizenzstatus: ",
    licenseActive: "Aktiv",
    licenseValidating: "Validieren...",
    forceReleaseUpdateButton: "Erzwungenes Loslassen der Schaltfläche „Aktualisieren“",
    emailLabel: "E-Mail:",
    updateLicenseButton: "Lizenz ändern",
    modalTitle: "Schlüssel ändern",
    modalSubtitle: "Aktualisieren des Lizenzschlüssels",
    emailFieldLabel: "Neuer Schlüssel",
    emailFieldError: "Der Schlüssel ist obligatorisch",
    cancelButton: "Stornieren",
    saveButton: "Speichern",
    successMessage: "Lizenzschlüssel erfolgreich aktualisiert!",
    errorLimitExceeded: "Es wurden viele Aktivierungsversuche unternommen. Versuchen Sie es in 1 Minute erneut",
    errorUpdate: "Fehler beim Aktualisieren der E-Mail."
  },
  modalPlano: {
    titleCreate: "Plan erstellen",
    titleEdit: "Plan bearbeiten",
    valueLabel: "Planwert",
    connectionsLabel: "Anschlüsse",
    usersLabel: "Benutzer",
    cancelButton: "Stornieren",
    saveButton: "Speichern",
    successCreate: "Plan erfolgreich erstellt!",
    successEdit: "Plan erfolgreich bearbeitet!",
    error: "Es ist ein Fehler aufgetreten!"
  },
  atualizar: {
    migrationTitle: "Dateimigration",
    migrationBanner: "ACHTUNG: Dies ist ein irreversibler Vorgang und erstellt eine Kopie der Dateien im öffentlichen Ordner im Unterordner des Unternehmens. Bevor Sie mit der Dateimigration beginnen, müssen Sie unbedingt einen Snapshot des VPS erstellen und sicherstellen, dass Sie für eventuelle Eingriffe per SSH auf den VPS Zugriff als Root-Benutzer haben. Der Vorgang kann je nach Leistung Ihres VPS und Anzahl der Dateien bis zu einigen Stunden dauern.",
    migrationButton: "MIGRATION STARTEN",
    cleanTitle: "Bereinigen öffentlicher Ordner",
    cleanBanner: "WARNUNG: Dies ist ein irreversibler Vorgang und löscht alle Dateien im öffentlichen Ordner. Bevor Sie mit der Dateibereinigung beginnen, müssen Sie unbedingt einen Snapshot des VPS erstellen und sicherstellen, dass Sie für eventuelle Eingriffe per SSH Zugriff auf den Root-Benutzer des VPS haben. Der Vorgang kann je nach Leistung Ihres VPS und Anzahl der Dateien bis zu einigen Stunden dauern.",
    cleanButton: "REINIGUNG STARTEN",
    updateTitle: "Automatisches Update",
    updateButton: "UPDATE STARTEN",
    updateBanner: "Führen Sie diesen Vorgang erst durch, nachdem Sie einen Snapshot des VPS erstellt haben. Dieser Vorgang muss vom Superadmin des Mandanten 1 durchgeführt werden. Ich bestätige, dass ich ein Backup (Snapshot) des Servers durchgeführt habe und Zugriff auf das Terminal habe. Bei Instabilitäten im VPS kann das Update fehlschlagen und es ist notwendig, das automatische Update über das Terminal durchzuführen.",
    buttonWarning: "Dieser Vorgang muss vom Superadmin des Mandanten 1 durchgeführt werden. Ich bestätige, dass ich ein Backup (Snapshot) des Servers durchgeführt habe und Zugriff auf das Terminal habe. Möchten Sie den Aktualisierungsvorgang wirklich starten?",
    uploadSuccess: "Datei erfolgreich hochgeladen.",
    uploadError: "Fehler beim Laden der Datei.",
    updateStartSuccess: "Der Aktualisierungsvorgang wurde erfolgreich gestartet.",
    updateStartError: "Der Aktualisierungsvorgang konnte nicht gestartet werden.",
    migrationStartSuccess: "Der Migrationsprozess wurde erfolgreich gestartet.",
    migrationStartError: "Der Migrationsprozess konnte nicht gestartet werden.",
    cleanStartSuccess: "Reinigungsvorgang erfolgreich gestartet.",
    cleanStartError: "Der Reinigungsvorgang konnte nicht gestartet werden.",
    fileValidationError: "Nur die Datei update_rapido.zip ist zulässig."
  },
  configurarAvaliacao: {
    tooltipMessage: "Wenn Sie eine Bewertungsnachricht hinzufügen, können Sie die Antwortnachricht für jede Bewertung anpassen. Andernfalls antwortet das System mit der unter „Ihre Bewertung wurde erfolgreich gespeichert“ definierten Standardnachricht.",
    messagePlaceholder: "Bewertungsnachricht eingeben",
    title: "Bewertungen",
    tooltipTitle: "Arten von Bewertungen:",
    tooltipEvaluation: "Bewertung: Es wird ein Wert von 0 bis 5 vergeben.",
    tooltipLabel: "Bezeichnung: Für jede Bewertung gesendete Nachricht.",
    saveButton: "Speichern",
    editablePlaceholder: "Klicken Sie hier, um das Etikett zu bearbeiten",
    successMessage: "Aktualisierte Bewertung.",
    errorMessage: "Fehler beim Aktualisieren der Bewertung.",
    ratingStore: "Bewertungsnachricht erfolgreich gespeichert",
    ratingStoreError: "Fehlermeldung beim Speichern der Auswertung",
    ratingStoreAttempt: "Nachricht zum erfolgreich gespeicherten Bewertungsversuch",
    ratingStoreTime: "Speicherzeit (ms)",
    ratingStoreUse: "Bewertungsspeicherung verwenden",
    ratingStoreTimeCustomMinutes: "Benutzerdefinierte Zeit (Minuten)",
    timeOptions: {
      oneMinute: "1 Minute",
      fiveMinutes: "5 Minuten",
      tenMinutes: "10 Minuten",
      fifteenMinutes: "15 Minuten",
      thirtyMinutes: "30 Minuten",
      oneHour: "1 Stunde",
      twoHours: "2 Stunden",
      sixHours: "6 Stunden",
      twelveHours: "12 Stunden",
      twentyFourHours: "24 Stunden",
      fortyEightHours: "48 Stunden",
      sevenDays: "7 Tage",
      custom: "Benutzerdefiniert (Minuten)"
    },
    useOptions: {
      enabled: "Aktiviert",
      disabled: "Deaktiviert"
    },
    labels: {
      ruim: "Schlecht",
      regular: "Regulär",
      bom: "Gut",
      muitoBom: "Sehr gut",
      excelente: "Exzellent",
      incrivel: "Unglaublich"
    }
  },
  listarAvaliacao: {
    empty: "Leer",
    contactName: "Kontaktname",
    title: "Bewertungen",
    addButton: "Hinzufügen",
    searchPlaceholder: "Lokalisieren",
    dateFilterPlaceholder: "Filtern nach Datum",
    evaluationColumn: "Bewertung",
    userColumn: "Benutzer",
    ticketColumn: "Service",
    dateColumn: "Datum",
    actionsColumn: "Aktionen",
    deleteConfirmationTitle: "Aufmerksamkeit!!",
    deleteConfirmationMessage: "Möchten Sie die Bewertung wirklich löschen?",
    deleteSuccess: "Bewertung erfolgreich gelöscht",
    deleteError: "Fehler beim Löschen der Bewertung.",
    loadError: "Fehler beim Laden der Bewertungen.",
    dialogCancel: "NEIN",
    dialogConfirm: "Ja"
  },
  modalAvaliacao: {
    editTitle: "Bewertung bearbeiten",
    createTitle: "Bewertung erstellen",
    evaluationLabel: "Bewertung",
    attemptsLabel: "Versuche",
    ticketLabel: "Service",
    updateSuccess: "Bewertung erfolgreich bearbeitet!",
    createSuccess: "Bewertung erfolgreich erstellt!",
    errorMessage: "Fehler beim Speichern der Auswertung."
  },
  contatosCampanha: {
    campaign: "Kampagne",
    start: "Start",
    end: "Ende",
    status: "Status",
    states: "Staaten",
    labels: "Schlagwörter",
    wallet: "Portfolio",
    backToCampaigns: "Listenkampagnen",
    contactsTitle: "Kontakte",
    contacts: "Kontakte",
    refreshTooltip: "Eintrag aktualisieren",
    clearCampaign: "Kampagne löschen",
    addContacts: "Kontakte einschließen",
    filters: "Filter (Kontakterstellungsdatum)",
    selectContactsTitle: "Wählen Sie Kontakte",
    errorFetchingContacts: "Fehler beim Abrufen der Kontakte.",
    errorAddingContacts: "Fehler beim Hinzufügen von Kontakten.",
    contactDeleted: "Von dieser Kampagne ausgeschlossener Kontakt.",
    contactsAdded: "Kontakte hinzugefügt.",
    campaignCleared: "Erfolgreiche Clean-Kampagne.",
    confirmClearCampaign: "Möchten Sie den Kampagnenkontakt wirklich löschen?",
    errorClearingCampaign: "Fehler beim Löschen der Kampagne.",
    errorDelete: "Kampagnenkontakt kann nicht gelöscht werden",
    filterNamePhone: "Filtern nach Name oder Telefonnummer",
    newContact: "Um zu generieren",
    errorUsers: "Problem beim Laden der Benutzer"
  },
  campanhas: {
    inicio: "Start",
    register: "Einträge pro Seite:",
    campanhas: "kampagnen",
    title: "Kampagnen",
    warningBanner: "Kampagnen verfügbar für Baileys und Whatsapp-Web.JS",
    addCampaign: "Kampagne hinzufügen",
    columns: {
      id: "AUSWEIS",
      name: "Kampagne",
      start: "Start",
      status: "Status",
      contactsCount: "Menge. Kontakte",
      queueForSend: "Warteschlange für die Übermittlung",
      notSended: "Nicht gesendet",
      sent: "Gesendet",
      currentMessageId: "Aktuelle Nachricht",
      actions: "Aktionen"
    },
    status: {
      pending: "Ausstehend",
      scheduled: "Geplant",
      processing: "Verarbeitung",
      canceled: "Abgesagt",
      finished: "Vollendet"
    },
    actions: {
      forceFinish: "Erzwungene Beendigung",
      skipMessage: "Nachricht überspringen",
      downloadReportCsv: "CSV-Bericht herunterladen",
      downloadReportPdf: "PDF-Bericht herunterladen",
      refresh: "Eintrag aktualisieren",
      sortById: "Nach ID sortieren",
      addCampaign: "Kampagne hinzufügen",
      programSend: "Versand planen",
      cancelCampaign: "Kampagne abbrechen",
      duplicateCampaign: "Kampagne duplizieren",
      downloadReport: "Bericht herunterladen",
      deleteCampaign: "Kampagne löschen",
      editCampaign: "Kampagne bearbeiten",
      viewContacts: "Kontakte anzeigen"
    },
    dialogs: {
      forceFinish: {
        title: "Erzwungene Beendigung",
        message: "Möchten Sie die Kampagne wirklich erzwungenermaßen beenden?"
      },
      skipMessage: {
        message: "Möchten Sie die aktuelle Nachricht überspringen und zur nächsten der Kampagne gehen?"
      },
      cancelCampaign: {
        title: "Kampagne abbrechen",
        message: "Möchten Sie die Kampagne wirklich abbrechen?"
      },
      cancelCampaignError: {
        message: "Laufende Kampagnen können nicht abgebrochen werden"
      },
      deleteCampaign: {
        title: "Kampagne löschen",
        message: "Möchten Sie die Kampagne wirklich löschen?"
      },
      duplicateCampaign: {
        title: "Kampagne duplizieren",
        message: "Möchten Sie die Kampagne wirklich duplizieren?",
        no: "NEIN",
        yes: "Ja"
      },
      startCampaign: {
        title: "Kampagne starten",
        message: "Möchten Sie die Kampagne wirklich starten?"
      }
    },
    notifications: {
      campaignForceFinished: "Kampagne erfolgreich erzwungenermaßen beendet.",
      messageSkipped: "Nachricht erfolgreich übersprungen.",
      campaignStarted: "Kampagne gestartet.",
      campaignCanceled: "Kampagne abgebrochen.",
      campaignDuplicated: "Kampagne erfolgreich dupliziert.",
      campaignDeleted: "Kampagne gelöscht",
      reportGenerated: "Bericht erfolgreich erstellt.",
      errorGeneratingReport: "Fehler beim Generieren des Berichts.",
      errorDuplicate: "Fehler beim Duplizieren der Kampagne.",
      warningEdit: "Sie können nur ausstehende oder abgebrochene Kampagnen bearbeiten.",
      errorCancel: "Kampagne kann nicht abgebrochen werden",
      errorStart: "Es ist nicht möglich, eine Kampagne mit einem früheren Datum als dem aktuellen zu planen.",
      errorStartContact: "Für die Planung der Kampagne sind verknüpfte Kontakte erforderlich",
      errorStartCancel: "Sie können nur Kampagnen planen, die ausstehen oder abgebrochen sind.",
      errorGeneral: "Kampagne kann nicht gestartet werden"
    },
    warningModal: {
      title: "Kampagnenhinweis",
      description: {
        whatsappRisk1: {
          title: "Kann WhatsApp meine Nummer blockieren oder sperren?",
          content: "Ja, die Möglichkeit besteht tatsächlich und sollte ernst genommen werden! WhatsApp hat strenge Regeln und überwacht den Versand von Massennachrichten streng."
        },
        whatsappRisk2: {
          title: "WhatsApp hat null Toleranz gegenüber Spam!",
          content: "Es gelten strenge Regeln und die Massennachrichtenübermittlung wird sehr genau überwacht."
        },
        highSpamRisk: {
          title: "AUFMERKSAMKEIT",
          content: "Wenn 2 % der Empfänger Ihre Nummer melden oder Ihre Nachricht als Spam markieren, wird Ihre Nummer blockiert/gesperrt!"
        }
      }
    },
    baixarRelatorio: {
      title: "Kampagnenbericht",
      description: {
        generatedAt: "Generiert am: ",
        page: "Seite: ",
        campaignDetails: {
          id: "ID: {id}",
          status: "Status: {status}",
          startDate: "Startdatum: {date}",
          totalContacts: "Gesamtzahl der Kontakte: {total}",
          delivered: "Schüsse: {count}",
          pending: "Ausstehend: {count}",
          failed: "Fehler: {count}"
        },
        tableHeaders: {
          index: "#",
          name: "Name",
          status: "Status",
          message: "Nachricht",
          media: "Medien"
        },
        statusDescriptions: {
          delivered: "Geliefert",
          pending: "Ausstehend",
          failed: "Versagen"
        },
        placeholders: {
          unknownName: "Unbekannt",
          noMessage: "Keine Nachricht",
          noMedia: "Keine Medien"
        },
        notifications: {
          success: "Bericht erfolgreich erstellt!",
          error: "Fehler beim Generieren des PDF-Berichts."
        },
        fileName: "Kampagnenbericht_{id}.pdf"
      }
    }
  },
  modalCampanha: {
    title: {
      create: "Kampagne erstellen",
      edit: "Kampagne bearbeiten"
    },
    labels: {
      campaignName: "Kampagnenname",
      startDate: "Startdatum/-zeit",
      session: "Senden per",
      delay: "Verzögerung",
      media: "Nachricht zur Medienzusammenstellung",
      message: "Geben Sie die Nachricht ein",
      messagePreview: "Vorschau",
      firstMessage: "1. Nachricht",
      secondMessage: "2. Nachricht",
      thirdMessage: "3. Nachricht",
      variables: "Variablen",
      emoji: "Emoji",
      seconds: "Sekunden"
    },
    placeholders: {
      message: "Geben Sie die Nachricht ein"
    },
    validations: {
      required: "Obligatorisch",
      invalidDate: "Darf nicht kleiner sein als der aktuelle Tag"
    },
    buttons: {
      cancel: "Stornieren",
      save: "Speichern"
    },
    notifications: {
      successEdit: "Kampagne bearbeitet!",
      successCreate: "Kampagne erstellt!",
      error: "Gibt es Probleme beim Erstellen der Kampagne?",
      validationError: "Überprüfen Sie, ob alle erforderlichen Felder ausgefüllt sind.",
      errorImage: "Gibt es Probleme beim Laden des Bildes?"
    },
    emojiPicker: {
      search: "Lokalisieren...",
      lang: "pt-BR"
    },
    optRadio: {
      msg1: "Nachricht. 1",
      msg2: "Nachricht. 2",
      msg3: "Nachricht. 3"
    }
  },
  listChatflow: {
    title: "Flüsse",
    addButton: "Hinzufügen",
    status: {
      active: "Aktiv",
      inactive: "Inaktiv"
    },
    actions: {
      edit: "Informationen bearbeiten",
      duplicate: "Duplikatfluss",
      open: "Offener Stream",
      importJson: "Json importieren",
      delete: "Löschen",
      newVersion: "Neue Version (Vue Flow)",
      newVersionDesc: "Moderne und aktualisierte Benutzeroberfläche",
      oldVersion: "Alte Version (jsPlumb)",
      oldVersionDesc: "Originale Benutzeroberfläche mit jsPlumb"
    },
    confirmDelete: {
      title: "Möchten Sie diesen Stream wirklich löschen?",
      message: "{Name}"
    },
    importJsonDialog: {
      title: "Importieren Sie JSON in {name}",
      jsonLabel: "JSON einfügen",
      jsonValidationError: "JSON ist erforderlich",
      importButton: "Import",
      cancelButton: "Stornieren",
      importSuccess: "JSON erfolgreich importiert!",
      importError: "Ungültiges Format. Überprüfen Sie das JSON."
    }
  },
  modalChatflow: {
    title: {
      create: "Flow erstellen",
      edit: "Fluss bearbeiten",
      duplicate: "Duplikatfluss",
      duplicateSuffix: "(Name: {name})"
    },
    fields: {
      description: "Beschreibung",
      isActive: "Aktiv",
      testNumber: "Testnummer",
      testNumberHint: "Lassen Sie es sauber, damit die automatische Antwort funktioniert. Ansonsten funktioniert es nur mit der hier angegebenen Nummer."
    },
    actions: {
      save: "Speichern",
      cancel: "Stornieren"
    },
    notifications: {
      created: "Neuer Flow erstellt.",
      edited: "Bearbeiteter Stream.",
      duplicated: "Duplikatfluss."
    }
  },
  chatPrivado: {
    labels: {
      grupo: "Gruppe"
    },
    toolbar: {
      returnMenu: "Zurück zum Menü",
      atendimento: "Service",
      minimize: "Reduzieren",
      groupMembers: "Gruppenmitglieder"
    },
    dialog: {
      groupMembers: "Gruppenmitglieder",
      editMessage: "Nachricht bearbeiten",
      deleteMessageTitle: "Nachricht löschen",
      deleteMessageConfirm: "Sind Sie sicher, dass Sie diese Nachricht löschen möchten?",
      forwardMessage: "Nachricht weiterleiten"
    },
    chatHeader: {
      online: "Online",
      offline: "Offline",
      noName: "Namenlos",
      noEmail: "Keine E-Mail"
    },
    chatFooter: {
      emoji: "Emoji",
      attachFile: "Datei anhängen",
      sendVideoLink: "Link zur Videokonferenz senden",
      placeholder: "Geben Sie Ihre Nachricht ein",
      send: "Senden"
    },
    tabs: {
      users: "Benutzer",
      groups: "Teams"
    },
    messages: {
      dateSeparator: "Heute",
      downloadTooltip: "Herunterladen: {fileName}",
      read: "Handeln",
      unread: "Ungelesen",
      today: "Heute",
      senderMe: "ICH",
      download: "Untergehen",
      pdfPlaceholder: "PDF herunterladen",
      online: "Online",
      offline: "Offline",
      searchPlaceholder: "Suchen nach...",
      usersTab: "Benutzer",
      groupsTab: "Teams",
      noMessages: "Keine Nachrichten gefunden.",
      clickToRemoveReaction: "Klicken Sie, um die Reaktion zu entfernen",
      editPlaceholder: "Geben Sie Ihre Nachricht ein",
      noUsersFound: "Keine Benutzer gefunden"
    },
    notifications: {
      errorLoadMessages: "Fehler beim Laden der Nachrichten.",
      fileRejected: "Fehler: Überprüfen Sie die hochgeladenen Dateien.",
      sendMessageError: "Fehler beim Senden der Nachricht.",
      successMessageSent: "Nachricht erfolgreich gesendet.",
      messageEdited: "Nachricht erfolgreich bearbeitet!",
      editError: "Fehler beim Bearbeiten der Nachricht",
      messageDeleted: "Nachricht erfolgreich gelöscht!",
      deleteError: "Fehler beim Löschen der Nachricht",
      reactionError: "Fehler beim Hinzufügen der Reaktion",
      messageForwarded: "Nachricht erfolgreich weitergeleitet!",
      forwardError: "Fehler beim Weiterleiten der Nachricht"
    }
  },
  configuracoesSessoes: {
    baileys: {
      title: "Baileys-Verbindung zurücksetzen (Sitzungen löschen und neu starten)",
      description: "Sind Sie sicher, dass Sie die Baileys-Verbindung zurücksetzen möchten? Diese Aktion löscht alle Sitzungen und startet die Verbindung neu.",
      message: "Baileys-Verbindung erfolgreich zurückgesetzt",
      error: "Fehler beim Zurücksetzen der Baileys-Verbindung"
    },    
    labels: {
      updateSessions: "Aktualisierte Sitzungen",
      noEvents: "Keine Veranstaltungen gefunden",
      eventCount: "Anzahl der Ereignisse",
      name: "Name",
      status: "Status",
      session: "Sitzung",
      number: "Nummer",
      updatedAt: "Letztes Update",
      isDefault: "Standard",
      actions: "Aktionen",
      defaultConnection: "Standardanschluss",
      deleteConnection: "Verbindung löschen",
      setDefault: "Als Standard festlegen",
      confirmDeleteTitle: "Aufmerksamkeit!! Möchten Sie wirklich löschen?",
      confirmDeleteMessage: "Offene Chats in diesem Kanal werden geschlossen, sind aber im Support-Bereich sichtbar.",
      cancel: "NEIN",
      confirm: "Ja"
    },
    messages: {
      reloadPage: "Seite aktualisieren",
      errorLoadingColors: "Fehler beim Laden der Farben.",
      noColorsStored: "Im localStorage sind keine Farben gespeichert."
    }
  },
  configuracoesProxy: {
    title: "Proxy-Management-System",
    description: "Verwalten Sie lokale Proxys für WhatsApp-Verbindungen",
    descriptionDetail: "Proxys werden automatisch mit Ihrem eigenen Computer generiert",
    descriptionDetail2: "Um den Proxy zu aktivieren, wenden Sie sich an den Superadministrator.",
    tooltip: "Lokales Proxy-System",
    
    statistics: {
      title: "Proxy-Statistiken",
      totalProxies: "Gesamt Proxys",
      activeProxies: "Aktive Proxys",
      failedProxies: "Fehlgeschlagene Proxys"
    },
    
    generation: {
      title: "Lokale Proxys generieren",
      numberOfProxies: "Anzahl der Proxys",
      proxyType: "Proxy-Typ",
      generateProxies: "Proxys generieren",
      generateGlobal: "Global generieren"
    },
    
    list: {
      title: "Konfigurierte Proxys",
      refreshList: "Liste aktualisieren",
      total: "Gesamt",
      proxies: "Proxys",
      noProxiesConfigured: "Keine Proxys konfiguriert",
      noProxiesMessage: "Generieren Sie Proxys, um zu beginnen",
      removeAllProxies: "Alle Proxys entfernen"
    },
    
    proxyItem: {
      type: "Typ",
      status: "Status",
      user: "Benutzer",
      active: "Aktiv",
      inactive: "Inaktiv",
      testProxy: "Proxy testen",
      editProxy: "Proxy bearbeiten",
      deleteProxy: "Proxy löschen"
    },
    
    manualConfig: {
      title: "Manuelle Proxy-Konfiguration",
      host: "Host",
      hostPlaceholder: "192.168.1.100",
      port: "Port",
      portPlaceholder: "8080",
      username: "Benutzername (Optional)",
      password: "Passwort (Optional)",
      proxyType: "Proxy-Typ",
      addProxy: "Proxy hinzufügen"
    },
    
    editModal: {
      title: "Proxy bearbeiten",
      host: "Host",
      hostPlaceholder: "192.168.1.100",
      port: "Port",
      portPlaceholder: "8080",
      username: "Benutzername (Optional)",
      password: "Passwort (Optional)",
      proxyType: "Proxy-Typ",
      active: "Aktiv",
      cancel: "Abbrechen",
      save: "Speichern"
    },
    
    messages: {
      proxiesGeneratedSuccess: "Proxys erfolgreich generiert",
      globalProxiesGeneratedSuccess: "Globale Proxys erfolgreich generiert",
      proxyWorking: "Proxy {host}:{port} funktioniert",
      proxyFailed: "Proxy {host}:{port} fehlgeschlagen: {error}",
      proxyAddedSuccess: "Proxy erfolgreich hinzugefügt",
      proxyUpdatedSuccess: "Proxy erfolgreich aktualisiert",
      proxyDeletedSuccess: "Proxy erfolgreich gelöscht",
      allProxiesRemovedSuccess: "Alle Proxys erfolgreich entfernt",
      errorLoadingProxies: "Fehler beim Laden der Proxys",
      errorGeneratingProxies: "Fehler beim Generieren der Proxys",
      errorGeneratingGlobalProxies: "Fehler beim Generieren globaler Proxys",
      errorTestingProxy: "Fehler beim Testen des Proxys",
      errorAddingProxy: "Fehler beim Hinzufügen des Proxys",
      errorUpdatingProxy: "Fehler beim Aktualisieren des Proxys",
      errorDeletingProxy: "Fehler beim Löschen des Proxys",
      errorRemovingProxies: "Fehler beim Entfernen der Proxys"
    },
    
    confirmations: {
      removeAllTitle: "Bestätigen",
      removeAllMessage: "Sind Sie sicher, dass Sie alle Proxys entfernen möchten?",
      deleteTitle: "Löschen bestätigen",
      deleteMessage: "Sind Sie sicher, dass Sie den Proxy {host}:{port} löschen möchten?"
    },
    
    proxyTypes: {
      socks: "Nur SOCKS"
    }
  },
  configuracoesSessoesStatus: {
    statuses: {
      qrcode: {
        title: "Warten auf das Lesen des QR-Codes",
        description: "Klicken Sie auf die Schaltfläche „QR-CODE“ und scannen Sie den QR-Code mit Ihrem Mobiltelefon, um die Sitzung zu starten"
      },
      disconnected: {
        title: "Die Kommunikation für diesen Kanal konnte nicht gestartet werden.",
        whatsapp: "Stellen Sie sicher, dass Ihr Telefon mit dem Internet verbunden ist, und versuchen Sie es erneut oder fordern Sie einen neuen QR-Code an.",
        waba: "Versuchen Sie erneut, eine Verbindung herzustellen. Wenn der Fehler weiterhin besteht, bestätigen Sie, dass die Token korrekt sind.",
        telegram: "Versuchen Sie erneut, eine Verbindung herzustellen. Wenn der Fehler weiterhin besteht, bestätigen Sie, dass das Token korrekt ist.",
        instagram: "Versuchen Sie erneut, eine Verbindung herzustellen. Wenn der Fehler weiterhin besteht, bestätigen Sie, dass die Anmeldeinformationen korrekt sind."
      },
      connected: {
        meow: "Verbindung hergestellt: ",
        waba: "Verbindung hergestellt: ",
        whatsapp: "Verbindung hergestellt: ",
        loading: "Daten werden geladen..."
      },
      pairingTimeout: {
        title: "Mobilfunkverbindung verloren",
        description: "Stellen Sie sicher, dass Ihr Telefon mit dem Internet verbunden und WhatsApp geöffnet ist, oder klicken Sie auf die Schaltfläche „Trennen“, um einen neuen QR-Code zu erhalten."
      },
      opening: {
        title: "Verbindung wird hergestellt.",
        description: "Dies kann eine Weile dauern ..."
      }
    },
    labels: {
      lastUpdate: "Letztes Update"
    }
  },
  configuracoesChatgpt: {
    labels: {
      enableChatgpt: "ChatGPT-Integration aktivieren",
      enableChatgptDescription: "Wenn aktiviert, nutzt das System Informationen von ChatGPT.",
      enableChatgptAll: "Aktivieren Sie die ChatGPT-Integration standardmäßig für alle Dienste",
      enableChatgptAllDescription: "Wenn diese Option aktiviert ist, nutzt das System bei allen Anrufen Informationen von ChatGPT."
    },
    notifications: {
      success: "Konfiguration geändert!",
      error: "Beim Ändern der Konfiguration ist ein Fehler aufgetreten."
    }
  },
  configuracoesLm: {
    labels: {
      enableLm: "Integration mit LM Studio aktivieren",
      enableLmDescription: "Wenn es aktiv ist, verbraucht das System Informationen von LM Studio.",
      enableLmAll: "Aktivieren Sie die Integration mit LM Studio standardmäßig für alle Dienste",
      enableLmAllDescription: "Wenn es aktiv ist, nutzt das System in allen Diensten Informationen aus LM Studio."
    },
    notifications: {
      success: "Konfiguration geändert!",
      error: "Beim Ändern der Konfiguration ist ein Fehler aufgetreten."
    }
  },
  configuracoesOllama: {
    labels: {
      enableOllama: "Ollama-Integration aktivieren",
      enableOllamaDescription: "Wenn es aktiv ist, verbraucht das System Informationen von Ollama.",
      enableOllamaAll: "Aktivieren Sie die Ollama-Integration standardmäßig für alle Dienste",
      enableOllamaAllDescription: "Wenn es aktiviert ist, nutzt das System bei allen Anrufen Informationen von Ollama."
    },
    notifications: {
      success: "Konfiguration geändert!",
      error: "Beim Ändern der Konfiguration ist ein Fehler aufgetreten."
    }
  },
  configuracoesDialogflow: {
    labels: {
      enableDialogflow: "Dialogflow aktivieren",
      enableDialogflowDescription: "Wenn aktiviert, nutzt das System den Dialogflow-Flow.",
      enableDialogflowAll: "Aktivieren Sie die Dialogflow-Integration standardmäßig für den gesamten Support",
      enableDialogflowAllDescription: "Wenn diese Option aktiviert ist, nutzt das System bei allen Anrufen Informationen aus Dialogflow."
    },
    notifications: {
      success: "Konfiguration erfolgreich geändert!",
      error: "Fehler beim Ändern der Konfiguration."
    }
  },
  configuracoesDify: {
    labels: {
      enableDify: "Aktivieren Sie die Integration mit Dify",
      enableDifyDescription: "Wenn es aktiv ist, verbraucht das System Informationen von Dify.",
      enableDifyAll: "Aktivieren Sie die Dify-Integration standardmäßig für alle Dienste",
      enableDifyAllDescription: "Wenn es aktiv ist, nutzt das System bei allen Anrufen Informationen von Dify."
    },
    notifications: {
      success: "Konfiguration erfolgreich geändert!",
      error: "Fehler beim Ändern der Konfiguration."
    }
  },
  configuracoesGemini: {
    labels: {
      enableGemini: "Gemini-Integration aktivieren",
      enableGeminiDescription: "Wenn es aktiv ist, verbraucht das System Informationen von Gemini.",
      enableGeminiAll: "Aktivieren Sie die Gemini-Integration standardmäßig für alle Dienste",
      enableGeminiAllDescription: "Wenn es aktiviert ist, nutzt das System bei allen Anrufen Informationen von Gemini."
    },
    notifications: {
      success: "Konfiguration erfolgreich geändert!",
      error: "Fehler beim Ändern der Konfiguration."
    }
  },
  configuracoesDeepseek: {
    labels: {
      enableDeepseek: "Deepseek-Integration aktivieren",
      enableDeepseekDescription: "Wenn es aktiv ist, verbraucht das System Informationen von Deepseek.",
      enableDeepseekAll: "Aktivieren Sie die Deepseek-Integration standardmäßig für alle Dienste",
      enableDeepseekAllDescription: "Wenn es aktiviert ist, nutzt das System bei allen Anrufen Informationen von Deepseek."
    },
    notifications: {
      success: "Konfiguration erfolgreich geändert!",
      error: "Fehler beim Ändern der Konfiguration."
    }
  },
  configuracoesQwen: {
    labels: {
      enableQwen: "Qwen-Integration aktivieren",
      enableQwenDescription: "Wenn es aktiv ist, verbraucht das System Informationen von Qwen.",
      enableQwenAll: "Aktivieren Sie die Qwen-Integration standardmäßig für alle Dienste",
      enableQwenAllDescription: "Wenn es aktiv ist, verbraucht das System bei allen Anrufen Informationen von Qwen."
    },
    notifications: {
      success: "Konfiguration erfolgreich geändert!",
      error: "Fehler beim Ändern der Konfiguration."
    }
  },
  configuracoesClaude: {
    labels: {
      enableClaude: "Claude-Integration aktivieren",
      enableClaudeDescription: "Wenn es aktiv ist, verbraucht das System Informationen von Claude.",
      enableClaudeAll: "Aktivieren Sie die Claude-Integration standardmäßig für alle Dienste",
      enableClaudeAllDescription: "Wenn es aktiviert ist, verwendet das System bei allen Anrufen Informationen von Claude."
    },
    notifications: {
      success: "Konfiguration erfolgreich geändert!",
      error: "Fehler beim Ändern der Konfiguration."
    }
  },
  configuracoesGrok: {
    labels: {
      enableGrok: "Grok-Integration aktivieren",
      enableGrokDescription: "Wenn es aktiv ist, verbraucht das System Informationen von Grok.",
      enableGrokAll: "Aktivieren Sie die Grok-Integration standardmäßig für alle Dienste",
      enableGrokAllDescription: "Wenn es aktiv ist, nutzt das System bei allen Anrufen Informationen von Grok."
    },
    notifications: {
      success: "Konfiguration erfolgreich geändert!",
      error: "Fehler beim Ändern der Konfiguration."
    }
  },
  configuracoesEvolution: {
    labels: {
      warningEvo: "Evolution v.2.20.0 oder höher",
      installApi: "Installieren Sie Ihre Evolution API kostenlos",
      apiIntegrationUrl: "https://github.com/EvolutionAPI/evolution-api",
      checkApiStatus: "Überprüfen Sie den API-Status in einem neuen Tab",
      apiUrl: "API-URL (https://subevo.com.br)",
      globalKey: "Globaler Schlüssel"
    },
    notifications: {
      success: "Konfiguration erfolgreich geändert!",
      error: "Fehler beim Ändern der Konfiguration. Bitte überprüfen Sie die Daten und versuchen Sie es erneut.",
      loadError: "Fehler beim Laden der Einstellungen. Bitte versuchen Sie es erneut.",
      invalidUrl: "Bitte geben Sie eine gültige URL ein, bevor Sie fortfahren!"
    }
  },
  configuracoesgroqCloud: {
    labels: {
      installApi: "Registrieren Sie Ihre GroqCloud-API kostenlos",
      apiIntegrationUrl: "https://console.groq.com/",
      apiKey: "API-Schlüssel",
      language: "Sprache",
      model: "Modell",
      enableGroqCloud: "Aktivieren Sie die Integration mit GroqCloud",
      enableGroqCloudDescription: "Wenn es aktiv ist, verbraucht das System Informationen aus der Groq Cloud und transkribiert die empfangenen Audios."
    },
    notifications: {
      success: "Konfiguration erfolgreich geändert!",
      error: "Fehler beim Ändern der Konfiguration. Bitte überprüfen Sie die Daten und versuchen Sie es erneut.",
      loadError: "Fehler beim Laden der Einstellungen. Bitte versuchen Sie es erneut.",
      invalidUrl: "Bitte geben Sie eine gültige URL ein, bevor Sie fortfahren!"
    }
  },
  configuracaoLanes: {
    title: "Fahrspuren",
    addLane: "Spur hinzufügen",
    editLane: "Spur bearbeiten",
    deleteLane: "Spur löschen",
    deleteConfirmation: "Möchten Sie die Spur „{lane}“ wirklich löschen?",
    laneDeleted: "Spur „{lane}“ erfolgreich gelöscht!",
    columns: {
      id: "#",
      name: "Fahrbahn",
      position: "Position",
      actions: "Aktionen"
    },
    notifications: {
      successDelete: "Spur erfolgreich gelöscht!",
      errorDelete: "Fehler beim Löschen der Spur."
    }
  },
  hub: {
    createAccountInstruction: "Erstellen Sie ein Konto unter hub.notificame.com.br und generieren Sie Ihr Token",
    tooltip: "HUB-Benachrichtigung ",
    tokenLabel: "Ihr Token benachrichtigt mich"
  },
  configuracaoMeta: {
    title: "Meta-Einstellungen",
    webhookMeta: "Meta-Webhook",
    webhookTooltip: "Meta-Webhook",
    webhookInstagram: "Instagram Webhook",
    webhookInstagramTooltip: "Klicken Sie, um den Instagram-Webhook zu kopieren",
    webhookInstagramCopied: "Instagram-Webhook erfolgreich kopiert!",
    webhookMessenger: "Messenger Webhook",
    webhookMessengerTooltip: "Klicken Sie, um den Messenger-Webhook zu kopieren",
    webhookMessengerCopied: "Messenger-Webhook erfolgreich kopiert!",
    metaTokenLabel: "Meta-Webhook-Token",
    testBMTitle: "Test BM",
    testBMDescription: "Geben Sie die folgenden Details ein, um den Status Ihres BMS zu überprüfen",
    testBMTooltip: "Test BM",
    wabaIdLabel: "WABA-ID (WhatsApp-Geschäftskonto-ID)",
    wabaVersionLabel: "WABA-Version (Whatsapp Business API-Version)",
    wabaTokenLabel: "WABA-Token (Meta Business Manager-Token)",
    verifyBMButton: "Überprüfen Sie BM",
    verificationResultTitle: "Verifizierungsergebnis",
    verification: {
      verifiedName: "Name verifiziert",
      verificationStatus: "Verifizierungsstatus",
      phoneNumber: "Telefonnummer",
      qualityRating: "Qualitätsbewertung",
      platformType: "Plattformtyp",
      throughputLevel: "Durchsatzniveau",
      webhookConfigured: "Webhook konfiguriert",
      id: "AUSWEIS"
    },
    notConfigured: "Nicht konfiguriert",
    notifications: {
      successVerify: "Überprüfung abgeschlossen!",
      errorVerify: "Fehler beim Überprüfen von BM!",
      successCopy: "Link kopiert!",
      successUpdate: "Token erfolgreich aktualisiert!",
      errorUpdate: "Fehler beim Aktualisieren des Tokens!"
    },
    tabs: {
      config: "Einstellungen",
      templates: "Vorlagen",
      facebook: "Facebook-Anmeldung"
    },
    facebook: {
      title: "Facebook-Anmeldung",
      description: "Melden Sie sich mit Ihrem Facebook-Konto an, um auf Meta Business-Ressourcen zuzugreifen",
      loginTab: "Anmeldung",
      selectApp: "App auswählen",
      noAppsAvailable: "Keine Apps verfügbar",
      errorLoadingApps: "Fehler beim Laden der verfügbaren Apps",
      appId: "App-ID",
      appIdHint: "Facebook-Anwendungs-ID",
      apiVersion: "API-Version",
      apiVersionHint: "Facebook-API-Version",
      status: "Anmeldestatus",
      userId: "Benutzer-ID",
      accessToken: "Zugriffstoken",
      expiresIn: "Läuft ab in",
      noExpiration: "Läuft nicht ab",
      name: "Name",
      email: "E-Mail",
      picture: "Profilbild",
      login: "Anmelden",
      logout: "Abmelden",
      checkStatus: "Status Prüfen",
      connected: "Erfolgreich mit Facebook verbunden!",
      notConnected: "Sie müssen mit Facebook verbunden sein",
      notAuthorized: "Sie müssen die Anwendung autorisieren",
      loggedOut: "Erfolgreich abgemeldet!",
      statusConnected: "Verbunden",
      statusNotAuthorized: "Nicht Autorisiert",
      statusUnknown: "Unbekannt",
      userInfo: "Benutzerinformationen",
      wabaManagement: "WABAs und Nummern Verwalten",
      loadWabas: "WABAs Laden",
      noWabas: "Keine WABAs gefunden. Klicken Sie auf 'WABAs Laden', um zu suchen.",
      noBusinessAccounts: "Keine Geschäftskonten gefunden",
      noWabasFound: "Keine WABAs in Ihren Geschäftskonten gefunden",
      loadPhones: "Nummern Laden",
      phoneNumbers: "Telefonnummern",
      noPhonesFound: "Keine Telefonnummern in diesem WABA gefunden",
      createChannel: "Kanal Erstellen",
      channelName: "Kanalname",
      channelNameHint: "Geben Sie einen Namen ein, um diesen Kanal zu identifizieren",
      wabaId: "WABA-ID",
      phoneNumberId: "Telefonnummer-ID",
      displayPhoneNumber: "Telefonnummer",
      wabaVersion: "WABA-Version",
      wabaVersionHint: "API-Version (z.B. v24.0)",
      create: "Erstellen",
      channelCreated: "Kanal erfolgreich erstellt!",
      addPhoneNumber: "Nummer Hinzufügen",
      addWaba: "WABA Hinzufügen",
      addWabaAndNumber: "WABA und Nummer Hinzufügen",
      phoneNumber: "Telefonnummer",
      phoneNumberRequired: "Bitte geben Sie die Telefonnummer ein",
      startOnboarding: "Onboarding Starten",
      onboardingInfo: "Ein Bestätigungscode wird per SMS an die angegebene Nummer gesendet. Sie müssen den Code bestätigen, um den Vorgang abzuschließen.",
      onboardingWabaInfo: "Eine neue Telefonnummer wird zu einer bestehenden WABA hinzugefügt oder eine neue Nummer wird erstellt. Ein Bestätigungscode wird per SMS gesendet.",
      phoneOnboardingStarted: "Onboarding gestartet! Überprüfen Sie die SMS auf der angegebenen Nummer, um die Bestätigung abzuschließen.",
      creatingWaba: "Neue WABA wird erstellt...",
      wabaCreated: "WABA erfolgreich erstellt!",
      wabaCreationNotSupported: "Die Erstellung von WABA über die API ist nicht verfügbar. Bitte erstellen Sie eine WABA manuell im Facebook Business Manager und versuchen Sie es erneut.",
      wabaCreationError: "Fehler beim Erstellen der WABA. Bitte erstellen Sie eine WABA manuell im Facebook Business Manager.",
      noTokenConfigured: "Kein Token für diese App konfiguriert. Verwende Benutzertoken.",
      businessTokenObtained: "Business-Token erfolgreich erhalten!",
      tokenExchangeError: "Fehler beim Austausch des Codes gegen Token. Verwende App-Token als Alternative.",
      embeddedSignup: "Whatsapp hinzufügen",
      embeddedSignupConfigId: "Konfigurations-ID (Eingebettete Registrierung)",
      embeddedSignupConfigIdHint: "Konfigurations-ID der Eingebetteten Registrierung",
      embeddedSignupFinished: "Eingebettete Registrierung erfolgreich abgeschlossen!",
      embeddedSignupCancelled: "Eingebettete Registrierung abgebrochen",
      embeddedSignupError: "Fehler bei der eingebetteten Registrierung",
      codeReceived: "Code erhalten. Warte auf Abschluss des Ablaufs...",
      loginError: "Anmeldefehler",
      loginSuccess: "Anmeldung erfolgreich!",
      sdkNotLoaded: "Facebook SDK ist nicht geladen. Bitte warten...",
      noTokenAvailable: "Kein Token verfügbar. Bitte zuerst anmelden.",
      channelCreatedFromEmbeddedSignup: "Kanal erfolgreich aus der Eingebetteten Registrierung erstellt!",
      channelCreatedSuccess: "Kanal erfolgreich erstellt! Telefonnummer zu WABA hinzugefügt.",
      phoneAddedToWaba: "Telefonnummer erfolgreich zu WABA hinzugefügt! Die Liste wird automatisch aktualisiert.",
      wabaAddedToList: "WABA zur Liste hinzugefügt!",
      embeddedSignupOptions: "Optionen",
      embeddedSignupOptionsTitle: "Optionen für Eingebettete Registrierung",
      embeddedSignupVersion: "Version",
      embeddedSignupSessionInfoVersion: "Sitzungsinfo-Version",
      embeddedSignupFeatures: "Funktionen",
      phoneVerificationUnauthorized: "Kanal erstellt, aber Telefon konnte nicht verifiziert werden. Token hat möglicherweise nicht die erforderlichen Berechtigungen.",
      phoneVerificationError: "Kanal erstellt, aber es gab eine Warnung bei der Telefonverifizierung",
      phoneVerificationDelayed: "Kanal erfolgreich erstellt. Die Telefonverifizierung wird automatisch in Kürze durchgeführt.",
      appIdRequired: "App-ID nicht konfiguriert. Bitte wählen Sie eine App aus.",
      configIdRequired: "Konfigurations-ID nicht konfiguriert. Bitte konfigurieren Sie die Konfigurations-ID der Eingebetteten Registrierung.",
      resourceUnavailable: "Ressource nicht verfügbar. Bitte überprüfen Sie, ob die App-ID und Konfigurations-ID korrekt sind und ob die Domain in der Facebook-App konfiguriert ist.",
      permissionsRequired: "Erforderliche Berechtigungen wurden nicht erteilt.",
      invalidAppId: "Ungültige App-ID oder nicht korrekt konfiguriert.",
      sdkError: "Fehler beim Überprüfen des Facebook SDK. Versuchen Sie, die Seite neu zu laden.",
      domainNotConfigured: "Domain nicht in \"App-Domains\" konfiguriert",
      domainConfigurationRequired: "Konfigurieren Sie die Domains in \"App-Domains\" im Facebook App Dashboard und versuchen Sie es erneut.",
      loginOAuth: "Facebook hinzufügen",
      noAppSelected: "Bitte wählen Sie zuerst eine App aus",
      appNotFound: "App nicht gefunden",
      facebookAppIdRequired: "Facebook App ID für diese App nicht konfiguriert",
      loginRedirect: "Weiterleitung zur Facebook-Anmeldung...",
      loginError: "Fehler beim Öffnen der Facebook-Anmeldung",
      webhookConfigError: "Kanal erstellt, aber es gab eine Warnung bei der Webhook-Konfiguration"
    },
    instagram: {
      login: "Instagram hinzufügen",
      noAppSelected: "Bitte wählen Sie zuerst eine App aus",
      appNotFound: "App nicht gefunden",
      configIdRequired: "Config ID für diese App nicht konfiguriert",
      loginRedirect: "Weiterleitung zur Instagram-Anmeldung...",
      loginError: "Fehler beim Öffnen der Instagram-Anmeldung",
      webhookConfigError: "Kanal erstellt, aber es gab eine Warnung bei der Webhook-Konfiguration",
      channelCreated: "Instagram-Kanal erfolgreich erstellt!"
    }
  },
  configuracaoMotivo: {
    title: "Forderungen",
    addMotivo: "Nachfrage hinzufügen",
    editMotivo: "Bedarf bearbeiten",
    deleteMotivo: "Nachfrage löschen",
    deleteConfirmation: "Möchten Sie die Forderung „{reason}“ wirklich löschen?",
    motivoDeleted: "Anfrage „{reason}“ erfolgreich gelöscht!",
    columns: {
      id: "#",
      name: "Nachfrage",
      actions: "Aktionen"
    },
    notifications: {
      successDelete: "Anfrage erfolgreich gelöscht!",
      errorDelete: "Fehler beim Löschen der Anfrage."
    }
  },
  configuracoesN8N: {
    title: "N8N-Integrationseinstellungen",
    enableIntegration: "Integration mit N8N aktivieren",
    enableIntegrationCaption: "Wenn es aktiv ist, verbraucht das System Informationen vom N8N.",
    enableIntegrationAllTickets: "Aktivieren Sie die N8N-Integration standardmäßig für alle Dienste",
    enableIntegrationAllTicketsCaption: "Wenn es aktiviert ist, nutzt das System bei allen Anrufen Informationen von N8N.",
    toggleEnabled: "Ermöglicht",
    toggleDisabled: "Deaktiviert",
    notifications: {
      success: "Konfiguration erfolgreich aktualisiert!",
      error: "Fehler beim Aktualisieren der Konfiguration."
    }
  },
  configuracaoPagamento: {
    title: "Zahlungsinformationen",
    paymentLink: "Zahlungslink",
    paymentId: "Zahlungs-ID",
    status: "Status",
    dueDate: "Reife",
    pending: "Ausstehend",
    overdue: "Überfällig",
    toolbarTitle: "Zahlungsinformationen",
    notifications: {
      errorFetch: "Zahlungsoptionen können nicht aufgelistet werden."
    }
  },
  configuracoesSMS: {
    title: "SMS-Einstellungen",
    comteleAccount: "Erstellen Sie ein Konto bei comtele.com.br und generieren Sie einen API-Schlüssel",
    conectaAccount: "Erstellen Sie ein Konto bei Conecta und generieren Sie einen API-Schlüssel",
    comteleTokenLabel: "Ihr Comtele API-Schlüssel",
    conectaTokenLabel: "Ihr API-Schlüssel verbindet",
    comteleTooltip: "SMS Comtele",
    conectaTooltip: "SMS Connect",
    livsonAccount: "Erstellen Sie ein Konto bei BHI und generieren Sie einen API-Schlüssel",
    livsonTokenLabel: "Ihr BHI API-Schlüssel",
    livsonTooltip: "SMS BHI",
    notifications: {
      successUpdate: "Token erfolgreich aktualisiert!",
      errorUpdate: "Fehler beim Aktualisieren des Tokens."
    }
  },
  configuracoesSMTP: {
    erroEnvioTeste: "Fehler beim Senden des Tests.",
    assuntoTeste: "E-Mail-Test",
    mensagemTeste: "Dies ist eine vom System gesendete Test-E-Mail.",
    enviarTeste: "Test einreichen",
    testeEnviado: "Test erfolgreich gesendet!",
    testeErro: "Fehler beim Senden des Tests.",
    testeEmail: "Test-E-Mail",
    testeAssunto: "Testperson",
    testeMensagem: "Testnachricht",
    testeBotao: "Klicken Sie hier, um zu testen",
    emailDestino: "Ziel-E-Mail",
    title: "SMTP-Einstellungen",
    enableSMTP: "SMTP aktivieren",
    enableSMTPCaption: "Wenn es aktiv ist, sendet das System Informationen an die E-Mail-Adresse des Benutzers.",
    emailHostLabel: "E-Mail-Server (Host):",
    emailPortLabel: "SMTP-Port",
    emailUserLabel: "E-Mail-Benutzer:",
    emailPassLabel: "E-Mail-Passwort:",
    emailSecure: "Sicherheitsprotokoll",
    emailSecureCaption: "Sicheres Protokoll aktivieren.",
    notifications: {
      successUpdate: "Konfiguration erfolgreich aktualisiert!",
      errorUpdate: "Fehler beim Aktualisieren der Konfiguration."
    }
  },
  configuracoesTypebot: {
    title: "Typebot-Einstellungen",
    enableTypebot: "Typebot aktivieren",
    enableTypebotCaption: "Wenn es aktiv ist, verbraucht das System den Typebot-Stream.",
    enableAllTickets: "Aktivieren Sie die Typebot-Integration standardmäßig für alle Dienste",
    enableAllTicketsCaption: "Wenn es aktiv ist, nutzt das System bei allen Anrufen Informationen von Typebot.",
    notifications: {
      successUpdate: "Konfiguration erfolgreich aktualisiert!",
      errorUpdate: "Fehler beim Aktualisieren der Konfiguration."
    }
  },
  configuracoesVariaveis: {
    titlePlatform: "Plattformvariablen",
    platformVariables: {
      name: "Name",
      greeting: "Gruß",
      protocol: "Eröffnungsprotokoll",
      email: "E-Mail (falls vorhanden)",
      phoneNumber: "Telefon",
      kanban: "Kanban (falls vorhanden)",
      user: "Begleiter",
      userEmail: "E-Mail des Mitarbeiters",
      firstName: "Vorname",
      lastName: "Nachname",
      businessName: "Unternehmen"
    },
    titleTypebot: "TypeBot-Variablen",
    typebotVariables: {
      nome: "Name",
      numero: "Nummer",
      atendimento: "Losnummer",
      email: "E-Mail (falls vorhanden)",
      status: "Ticketstatus",
      canal: "Servicekanal",
      grupo: "Gruppenbetreuung oder nicht",
      fullTicket: "alle Serviceeigenschaften"
    }
  },
  configuracoesWebhook: {
    enableWebhook: "Webhook aktivieren",
    enableWebhookCaption: "Wenn aktiv, sendet das System Informationen an den definierten Webhook.",
    webhookUrlLabel: "Webhook-URL:",
    webhookMessage: "Erhalten Sie Nachrichten und Support",
    webhookCreateChannel: "Kanal/Verbindung erstellen",
    webhookUpdateChannel: "Kanal/Verbindung aktualisieren",
    webhookCreateUser: "Benutzer/Kontakt/Gelegenheit erstellen",
    webhookUpdateUser: "Benutzer/Kontakt/Chance aktualisieren",
    webhookCreateApi: "API erstellen",
    webhookUpdateApi: "API aktualisieren",
    webhookRenewApi: "API-Token erneuern"
  },
  configuracoesWuzapi: {
    title: "Meow API (Wuzapi)-Einstellungen",
    installApiLabel: "Installieren Sie Ihre MEOW-API kostenlos",
    installApiTooltip: "Meow-API (Wuzapi) ",
    apiUrlLabel: "API-URL (https://subwuzapi.com.br)",
    checkApiStatus: "Überprüfen Sie den API-Status in einem neuen Tab",
    invalidUrlMessage: "Bitte geben Sie eine gültige URL ein, bevor Sie fortfahren!",
    globalKeyLabel: "Global-Schlüssel",
  },
  configuracoesUazapi: {
    title: "Uazapi-API-Einstellungen",
    installApiLabel: "Installieren Sie Ihre Uazapi-API kostenlos",
    installApiTooltip: "Uazapi-API ",
    apiUrlLabel: "API-URL (https://uazapi.com.br)",
    globalKeyLabel: "Global-Schlüssel",
  },
  configuracoesZapi: {
    title: "Zapi-API-Einstellungen",
    installApiLabel: "Installieren Sie Ihre Zapi-API kostenlos",
    installApiTooltip: "Zapi-API ",
    apiUrlLabel: "API-URL (https://zapi.com.br)",
    globalKeyLabel: "Global-Schlüssel",
  },
  configuracoes: {
    tabs: {
      gerais: "Allgemeine Einstellungen",
      botsIA: "Bots und KI",
      integracoes: "Integrationen",
      crm: "CRM",
      sessoes: "Sitzungen"
    },
    sidebar: {
      menu: "Menü",
      proxy: "Proxy",
      uazapi: "Uazapi-Service",
      zapi: "Zapi-Service",
      googleCalendar: "Google Calendar",
      vapi: "Vapi",
      tutoriais: 'Tutorials',
      webchat: "WebChat",
      groqcloud: "GroqCloud",
      grok: "Grok",
      gemini: "Zwillinge",
      qwen: "Qwen",
      claude: "Claude",
      deepseek: "Tiefensuche",
      ollama: "Ollama",
      lm: "LM Studio",
      payment: "Zahlung",
      gerais: "Konfig. Allgemein",
      smtp: "SMTP",
      typebot: "Typebot",
      chatGPT: "GPT-Chat",
      n8n: "N8N",
      dify: "Dify",
      dialogflow: "Dialogflow",
      webhooks: "Webhooks",
      meta: "Ziel",
      evolution: "Evolution-API",
      wuzapi: "Wuzapi-API",
      hub: "Hub-Benachrichtigung",
      sms: "SMS",
      kanban: "Kanban und Lanes",
      motivos: "Forderungen",
      variaveis: "Variablen",
      sessoes: "Sitzungen auflisten"
    },
    tooltips: {
      toggleSidebar: "Menü ein-/ausblenden"
    }
  },
  configuracoesWebchat: {
    copyCodeError: "Fehler beim Kopieren des Codes",
    sucessCopy: "Code erfolgreich kopiert!",
    copyCode: "Code kopieren",
    widgetCode: "Webchat-Widget-Code",
    tokenWarning2: "Dieses Token wird zur Authentifizierung der WebSocket-Verbindungen Ihres Webchats verwendet. Bewahren Sie es sicher auf und geben Sie es nicht weiter.",
    generateNewToken: "Neues Token generieren",
    tokenWarning: "Für die WebChat-Verbindung ist ein Token erforderlich.",
    autenticationToken: "Authentifizierungstoken",
    title: "WebChat-Einstellungen",
    enableWebchat: "WebChat aktivieren",
    enableWebchatCaption: "Wenn es aktiv ist, nutzt das System WebChat.",
    webchatUrlLabel: "WebChat-URL:",
    webchatConfigurado: "Der Webchat ist konfiguriert und einsatzbereit.",
    wssFuncionando: "Die WebSocket-Verbindung funktioniert ordnungsgemäß.",
    gerarWidget: "Sie können das Widget generieren, um es auf Ihrer Website zu implementieren.",
    wssNaoFuncionando: "Webchat ist konfiguriert, aber die WebSocket-Verbindung funktioniert nicht.",
    verificarWss: "Überprüfen Sie, ob der WebSocket-Server online und erreichbar ist.",
    solicitarInstalacao: "Um den Webchat zu verwenden, müssen Sie Ihren Systemadministrator bitten, die Webchat-Schnittstelle zu installieren.",
    configurarAmbiente: "Die WSS_URL- und WSS_PORT-Einstellungen müssen in der Umgebung konfiguriert werden.",
    selecionarCanal: "Wählen Sie den Kanal aus, um das Widget zu generieren",
    gerarWidgetBtn: "Widget generieren",
    widgetGerado: "Widget erfolgreich generiert!",
    erroGerarWidget: "Fehler beim Generieren des Widgets",
    carregandoCanais: "Kanäle werden geladen...",
    erroCarregarCanais: "Fehler beim Laden der Kanäle",
    tenantErro: "Fehler beim Laden des Mandanten",
    tokenUpdated: "Token erfolgreich aktualisiert!",
    tokenError: "Fehler beim Generieren des neuen Tokens. Versuchen Sie es erneut"
  },
  configuracoesModalCampanha: {
    create: "Spur erstellen",
    edit: "Spur bearbeiten",
    name: "Spurname",
    position: "Position",
    notifications: {
      created: "Spur erstellt!",
      updated: "Schritt bearbeitet!"
    }
  },
  configuracoesModalMotivos: {
    create: "Nachfrage schaffen",
    edit: "Bedarf bearbeiten",
    name: "Nachfragename",
    notifications: {
      created: "Nachfrage geschaffen!",
      updated: "Nachfrage bearbeitet!"
    }
  },
  configuracoesGerais: {
    labels: {
      allowPause: "Service pausieren",
      useUserBusinessHours: "Benutzer-Geschäftszeiten verwenden",
      webPushChatInterno: "Web Push für internen Chat",
      scanContacts: "Kontakte ohne LID scannen",
      postmanLink: "Postman-Link",
      listarPelaUltimaMensagem: "Dienste nach letzter Nachricht auflisten",
      forceReason: "Erzwingen der Bedarfsdefinition beim Schließen des Dienstes",
      syncTicketData: "Ticketdatum aktualisieren",
      controlFeatures: "Funktionssteuerung",
      syncMessagesUpdate: "Aktualisierungsdatum importierter Nachrichten",
      ignoreIgStories: "Instagram Stories stummschalten",
      audioPlugin: "Audio-Plugin verwenden ",
      audioModule: "Audiomodul mit Waves verwenden ",
      showGroupsForAll: "Gruppen allen Benutzern anzeigen",
      persistirMedia: "Persist Media Download (Baileys)",
      showClosedForAll: "„Geschlossen“ allen Benutzern anzeigen",
      waitProcessing: "Aktivieren Sie das Warten auf die Nachrichtenverarbeitung mit externen Integrationen (Typebot, ChatGPT …).",
      openChat: "Aktivieren Sie das Senden von Waba-Nachrichten außerhalb des Fensters (garantiert keine Zustellung)",
      shutdownWallet: "Externe Integrationen deaktivieren, wenn Walletization aktiviert ist",
      notViewAssignedTickets: "Keine Tickets anzeigen, die bereits anderen Benutzern zugewiesen sind",
      notViewTicketsChatBot: "Tickets nicht im ChatBot anzeigen",
      directTicketsToWallets: "Dienst über Wallet erzwingen",
      ticketNulo: "Tickets ohne zugewiesenen Benutzer oder Warteschlange anzeigen",
      supervisor: "Entfernen Sie die Anzeigeberechtigungen des Supervisors",
      semRedis: "Verwenden Sie die Funktion „Schnelles Senden von Nachrichten“",
      chatbotLane: "Servicehandbuch zum Aktivieren von Chatbots",
      chatbotFix: "Pin-Verbindungen oben im Service",
      ignoreGroupMsg: "Gruppennachrichten ignorieren",
      rejectCalls: "Anrufe bei Whatsapp ablehnen",
      callRejectMessage: "Meldung bei Ablehnung der Verbindung:",
      agruparTickets: "Nachrichtenverlauf anzeigen",
      transbordo: "Nachrichtenüberlauf",
      atualizarNomes: "Beim Empfangen von Nachrichten den Namen nicht aktualisieren",
      forcarAdmin: "Administrator für Support erzwingen",
      signed: "Signaturkontrolle deaktivieren",
      universalCounter: "Zähler in den oberen Registerkarten (Privat/Gruppen)",
      autoClose: "Serviceprobleme automatisch und ohne Interaktion lösen",
      autoCloseTime: "Wählen Sie eine Option (Zeit in Minuten)",
      autoCloseMessage: "Schlussnachricht",
      ticketLimit: "Alte Anrufe filtern",
      days: "Tage",
      ticketLimitDaysAgo: "Vor Tagen zum Filtern",
      notificationSilenced: "Tonbenachrichtigungen",
      forbiddenNumbers: "Auf der Plattform gesperrte Nummern",
      resetFlow: "Chatbot-Flow zurücksetzen",
      maxRetries: "Maximale Anzahl der Zeitnachrichten, die gesendet werden sollen",
      privateMessageLimit: "Anzahl der Nachrichten im internen Chat",
      ticketLimitNumber: "Anzahl der konsultierten Tickets",
      validateAllContacts: "Alle Kontakte validieren",
      forcePendingUser: "Aktuellen Benutzer zwingen, den Status auf „Ausstehend“ zu ändern",
      chatbotFlow: "Aktiver Flow für den Service Bot",
      forcePending: "Aktuellen Benutzer zwingen, den Status ausstehender Dienste zu ändern",
      maxAttemps: "Maximale Häufigkeit, mit der die Servicestundennachricht an den Kunden gesendet werden soll.",
      limitTickets: "Anzahl der Tickets, die während des Service eingesehen werden müssen.",
      limitePrivate: "Anzahl der Nachrichten, die pro Dienst im internen Chat geladen werden müssen.",
      erroMessage: "Gestoppte Nachrichten senden",
      solveMessage: "Nachrichten auflösen",
      validate: "Alle Kontakte validieren",
      minutes: "10 Minuten",
      hours: "1 Stunde",
      day: "1 Tag",
      days5: "5 Tage",
      days10: "10 Tage",
      validateContact: "Kontakt validieren",
      hearHubApi: "Hub-Notificame-API-Abhören aktivieren",
      ticketsRain: "Socket-Ticket-Filter aktivieren (empfohlen bei hohem Volumen)",
      messageListingType: "Nachrichten-Listentyp",
      messageListingTypeDefault: "Standard",
      messageListingTypeByQueue: "Verlauf nach Warteschlange",
      messageListingTypeComplete: "Vollständiger Verlauf",
      messageListingTypeByTicket: "Verlauf nach Ticket",
    },
    captions: {
      allowPause: "Wenn Sie diese Option aktivieren, wird das System das Pausieren von Service erlauben.",
      useUserBusinessHours: "Wenn Sie diese Option aktivieren, wird das System die Benutzer-Geschäftszeiten verwenden, um den Service-Zeitpunkt zu definieren.",
      webPushChatInterno: "Wenn Sie diese Option aktivieren, sendet das System Push-Benachrichtigungen, wenn neue Nachrichten im internen Chat empfangen werden.",
      scanContacts: "Wenn Sie diese Option aktivieren, wird der Scan der Kontakte ohne LID aktiviert.",
      postmanLink: "Wenn Sie diese Option aktivieren, wird der Postman-Link aktualisiert.",
      listarPelaUltimaMensagem: "Wenn Sie diese Option aktivieren, listet das System die Anrufe nach der zuletzt empfangenen Nachricht auf.",
      forceReason: "Wenn Sie diese Option aktivieren, verlangt das System beim Schließen des Dienstes die Definition der Nachfrage.",
      syncTicketData: "Wenn Sie diese Option aktivieren, aktualisiert das System das Datum der Tickets auf den Zeitpunkt der aktuellsten Nachricht.",
      controlFeatures: "Durch Aktivieren dieser Option steuert das System die Funktionen zum Einsehen und erzwungenen Schließen für Benutzer.",
      syncMessagesUpdate: "Durch Aktivieren dieser Option aktualisiert das System das Datum der importierten Nachrichten auf die ursprüngliche Uhrzeit.",
      ignoreIgStories: "Wenn Sie diese Option aktivieren, werden Instagram Stories ignoriert.",
      audioPlugin: "Wenn Sie diese Option aktivieren, wird ein neues Beta-Audio-Plugin verwendet.",
      audioModule: "Durch Aktivieren dieser Option wird ein neues Audiomodul mit Schallwellen verwendet.",
      showGroupsForAll: "Durch Aktivieren dieser Option sind Gruppen für alle Benutzer sichtbar.",
      persistirMedia: "Wenn Sie diese Option aktivieren, werden nacheinander Versuche unternommen, Medien herunterzuladen, die über die inoffizielle Baileys-API empfangen wurden.",
      showClosedForAll: "Durch Aktivieren dieser Option ist „Geschlossen“ für alle Benutzer sichtbar.",
      waitProcessing: "Wenn Sie im Support mehr als eine Nachricht erhalten, verarbeitet das System neue Nachrichten erst, nachdem auf die erste Nachricht geantwortet wurde. In der Zwischenzeit empfangene Nachrichten interagieren nicht mit der externen Integration.",
      openChat: "Ermöglicht das Senden von WABA-Nachrichten nach dem Senden einer beliebigen Vorlage, auch wenn das Konversationsfenster nicht geöffnet ist. Garantiert keine Zustellung der Nachricht. Siehe Waba-Richtlinien",
      shutdownWallet: "Durch Aktivieren dieser Option werden externe Integrationen wie ChatGPT, Typebot und andere deaktiviert, wenn die Walletisierung aktiv ist und ein neues Ticket eingeht.",
      notViewAssignedTickets: "Nur der Ticketbesitzer und Administratoren können es sehen.",
      notViewTicketsChatBot: "Kein Benutzer kann die vom ChatBot bearbeiteten Tickets sehen.",
      directTicketsToWallets: "Leitet den Service an die Eigentümer des Kundenportfolios weiter.",
      ticketNulo: "Alle Benutzer sehen Termine ohne zugewiesenen Benutzer oder Warteschlange.",
      supervisor: "Vorgesetzte folgen der allgemeinen Benutzerlogik.",
      semRedis: "Nachrichten werden ohne Kadenz gesendet.",
      chatbotLane: "Es wird ein exklusiver Leitfaden für ChatBots hinzugefügt.",
      ignoreGroupMsg: "Das System öffnet keine Tickets für Gruppen.",
      rejectCalls: "Bei Audio- und Videoanrufen wird die folgende Nachricht angezeigt.",
      agruparTickets: "Zeigt alle mit dem Kanal und Kontakt verknüpften Nachrichten an.",
      transbordo: "Läuft bei kartenbasierten Diensten über, wenn der Benutzer offline ist.",
      atualizarNomes: "Aktualisiert den Kontaktnamen in empfangenen Nachrichten nicht.",
      forcarAdmin: "Ausstehende Tickets werden dem Administrator zugewiesen.",
      signed: "Benutzer können das Abonnement nicht deaktivieren.",
      universalCounter: "Zeigt den offenen Ticketzähler in den oberen Registerkarten an.",
      autoClose: "Inaktive Anrufe werden automatisch aufgelöst.",
      ticketLimit: "Filtert alte Anrufe.",
      notificationSilenced: "Erhalten Sie Audiobenachrichtigungen.",
      forbiddenNumbers: "Liste der auf der Plattform gesperrten Nummern.",
      validateAllContacts: "Validiert die Anzahl aller Kontakte im System.",
      resetFlow: "Setzt den aktiven Fluss für neue Dienste zurück.",
      maxRetries: "Maximale Anzahl gesendeter Abwesenheitsnachrichten.",
      privateMessageLimit: "Anzahl der Nachrichten im internen Chat pro Dienst.",
      ticketLimitNumber: "Anzahl der gleichzeitig konsultierten Tickets.",
      chatbotFlow: "Vom Bot zu verwendender Flow für neue Dienste",
      chatbotFlowReset: "Chatbot-Flow zurücksetzen",
      chatbotFix: "Wenn Sie diese Option aktivieren, werden Verbindungen nicht mehr in der Fußzeile angezeigt, sondern oben in der Dienstliste fixiert.",
      forcePending: "Durch Aktivieren dieser Option bleibt der Benutzer mit dem Dienst verknüpft, wenn sich der Status des Tickets von „offen“ in „ausstehend“ ändert.",
      maxAttemps: "Geben Sie hier ein, wie oft die Abwesenheitsnachricht für jeden Dienst gesendet werden kann...",
      limitTickets: "Geben Sie hier die Anzahl der Tickets ein, die auf dem Service-Bildschirm gesucht werden sollen...",
      limitePrivate: "Geben Sie hier die Anzahl der Nachrichten ein, die im internen Chat gesucht werden sollen...",
      erroMessage: "Dieser Befehl sendet hängengebliebene Nachrichten an das System.",
      solveMessage: "Dieser Befehl entfernt Fehlermeldungen aus dem System.",
      validate: "Dieser Befehl validiert die Anzahl aller Kontakte im System.",
      validating: "Bitte warten, alle Systemkontakte werden validiert …",
      validateContact: "Bei Aktivierung prüft das System die Kontaktnummer bei der Registrierung (WABA).",
      hearHubApi: "Wenn diese Option aktiviert wird, werden alle Nachrichten von der HUB-API erstellt und der Systembenutzer empfängt sie. Sie wird erstellt, sobald das Ereignis vom Hub nach dem Senden von APP zurückgegeben wird",
      ticketsRain: "Vor der Verarbeitung filtern und Tickets ignorieren, die nicht dem Benutzer gehören (außer Admin). Reduziert unnötige HTTP-Anfragen erheblich und verbessert die Systemleistung.",
      messageListingType: "Definiert, wie Nachrichten im Verlauf aufgelistet werden. Standard: respektiert Gruppierungskonfiguration (mit groupTickets: vollständiger Kontakt/Kanal-Verlauf; ohne groupTickets: nur gleiche Warteschlange). Nach Warteschlange: nach Warteschlange segmentierter Verlauf mit Datenschutz (Admin: vollständiger Verlauf; Benutzer: nur erlaubte Warteschlangen mit historischer queueId). Vollständig: vollständiger Kontakt/Kanal-Verlauf für alle. Nach Ticket: nur Nachrichten des aktuellen Tickets."
    },
    notifications: {
      scanContactsSuccess: "Kontakte aktualisiert mit Erfolg!",
      scanContactsError: "Fehler beim Aktualisieren der Kontakte",
      updatingMessagesDate: "Aktualisierungsdatum der importierten Nachrichten …",
      success: "Konfiguration erfolgreich geändert.",
      error: "Fehler beim Ändern der Konfiguration.",
      warningTicketSettings: "Sie können die folgenden Einstellungen nicht zusammen verwenden: Anderen Benutzern zugewiesene Tickets, Tickets im ChatBot und Tickets ohne zugewiesene Warteschlange oder Benutzer.",
      processStarted: "Prozess gestartet.",
      contactsValidated: "Kontakte validiert.",
      errorValidatingContacts: "Fehler beim Validieren der Kontakte",
      sendingMessages: "Es wird versucht, ausstehende Nachrichten zu senden.",
      errorSendingMessages: "Fehler beim Senden der Nachrichten",
      configChanged: "Konfiguration geändert",
      baileysGroupWarning: "Achtung: Die inoffizielle Baileys-API kann bei der Verwendung von Gruppen Instabilitäten aufweisen."
    },
    dialogs: {
      confirmationTitleScanContacts: "Möchten Sie die Kontakte ohne LID scannen?",
      scanContacts: "Kontakte ohne LID scannen",
      confirmationTitle4: "Möchten Sie das Datum der Tickets auf den Zeitpunkt der aktuellsten Nachricht aktualisieren?",
      syncTicketData: "Wenn Sie diese Option aktivieren, aktualisiert das System das Datum der Tickets auf den Zeitpunkt der aktuellsten Nachricht.",
      confirmationTitle: "Möchten Sie alle im System hängenden Nachrichten senden/auflösen?",
      resolvePendingMessages: "Lösen Sie festsitzende Nachrichten im System",
      sendPendingMessages: "Senden Sie im System hängengebliebene Nachrichten",
      confirmationTitle2: "Möchten Sie die Daten synchronisierter Nachrichten aktualisieren?",
      updateMessagesDate: "Aktualisierungsdatum der importierten Nachrichten",
      confirmationTitle3: "Seien Sie vorsichtig, zu viele Kontaktnummern im System können dazu führen, dass WhatsApp blockiert wird. Möchten Sie alle Kontakte gleichzeitig validieren?",
      validateAllContacts: "Validieren Sie alle Systemkontakte in großen Mengen."
    }
  },
  configuracaoPagamentoAtraso: {
    title: "Zahlungsinformationen",
    status: {
      pending: "Ausstehend",
      overdue: "Überfällig",
      paid: "Bezahlt"
    },
    dueDate: "Reife",
    paymentLink: "Zahlungslink",
    checkPaymentStatus: "Rechnungsstatus prüfen",
    invalidUrlMessage: "Bitte geben Sie eine gültige URL ein, bevor Sie fortfahren!"
  },
  configuracaoTenantSmtp: {
    title: "SMTP-Einstellungen",
    enableSmtp: "SMTP aktivieren",
    enableSmtpCaption: "Wenn es aktiv ist, sendet das System Informationen an die E-Mail-Adresse des Benutzers.",
    emailHost: "E-Mail-Server (Host):",
    emailPort: "SMTP-Port",
    emailUser: "E-Mail-Benutzer:",
    emailPass: "E-Mail-Passwort:",
    secureProtocol: "Sicherheitsprotokoll",
    secureProtocolCaption: "Sicheres Protokoll aktivieren.",
    successMessage: "Konfiguration erfolgreich geändert.",
    errorMessage: "Fehler beim Ändern der Konfiguration.",
    toggleOn: "Ermöglicht",
    toggleOff: "Deaktiviert",
    label: "Konfig. SMTP"
  },
  contactsModal: {
    updateLidButton: 'LID aktualisieren',
    updateLidSuccessMessage: 'LID wurde erfolgreich aktualisiert!',
    updateNameSuccessMessage: 'Name wurde erfolgreich aktualisiert!',
    updateNameButton: 'Name aktualisieren',
    placeholderLid: 'WhatsApp-LID',
    hintLid: 'WhatsApp-LID',
    labelLid: 'WhatsApp-LID',
    titleAdd: "Kontakt hinzufügen",
    titleEdit: "Kontakt bearbeiten",
    labelName: "Name",
    labelNumber: "Nummer",
    labelEmail: "E-Mail",
    labelCpf: "CPF/CNPJ",
    labelBirthday: "Geburtstagsdatum",
    labelFirstName: "Vorname",
    labelLastName: "Nachname",
    labelBusinessName: "Unternehmen",
    labelMessengerId: "Messenger-ID",
    labelInstagramPK: "Instagram-ID",
    labelhubWhatsapp: "WhatsApp Hub-ID",
    placeholderhubWhatsapp: "WhatsApp Hub-ID",
    hinthubWhatsapp: "WhatsApp Hub-ID",
    walletSectionTitle: "Portfolio",
    walletNoAvailable: "Ups ... Keine Geldbörsen verfügbar!!",
    tagSectionTitle: "Etikett",
    tagNoAvailable: "Ups ... Keine Tags verfügbar!!",
    additionalInfoSectionTitle: "Weitere Informationen",
    saveButtonLabel: "Speichern",
    exitButtonLabel: "Ausgehen",
    createSuccessMessage: "Kontakt erstellt!",
    editSuccessMessage: "Kontakt bearbeitet!",
    removeInfoErrorMessage: "Fehler beim Entfernen zusätzlicher Informationen.",
    validationErrorMessage: "Hoppla! Auf Fehler prüfen...",
    errorContact: "Beim Erstellen des Kontakts ist ein Fehler aufgetreten",
    invalidContact: "Ungültiger Kontakt",
    duplicatedContact: "Dieser Kontakt existiert bereits in der Datenbank, es ist nicht möglich, ihn erneut hinzuzufügen.",
    errorUsers: "Problem beim Laden der Benutzer",
    errorTags: "Problem beim Laden von Etiketten",
    placeholderNumber: "+DDI (DDD) 99999 9999",
    hintNumber: "Wenn im System eine aktive WABA-Verbindung besteht, müssen Sie die genaue WhatsApp-Kontonummer eingeben.",
    placeholderCpf: "CPF/CNPJ",
    hintCpf: "Die CPF/CNPJ-Nummer muss Sonderzeichen wie Bindestriche und Schrägstriche enthalten.",
    placeholderBirthday: "01.01.1990",
    hintBirthday: "Das Geburtsdatum muss im Format 01.01.1990 eingegeben werden.",
    placeholderFirstName: "Vorname",
    hintFirstName: "Vorname",
    placeholderLastName: "Nachname",
    hintLastName: "Nachname",
    placeholderBusinessName: "Unternehmen",
    hintBusinessName: "Unternehmen",
    placeholderMessengerId: "Messenger-ID",
    hintMessengerId: "Messenger-ID",
    placeholderInstagramPK: "Instagram-ID",
    hintInstagramPK: "Instagram-ID"
  },
  contacts: {
    forbidden: "Das Löschen von Kontakten mit registrierten Tickets oder Chancen ist nur Administratoren vorbehalten.",
    deleteSelectedContacts: "Möchten Sie {count} ausgewählte(n) Kontakt(e) löschen?",
    warning1DeleteSelect: "Kontakt-ID {contactId} hat registrierte Tickets. Möchten Sie zwangsweise löschen?",
    warning2DeleteSelect: "Kontakt-ID {contactId} hat registrierte Chancen. Möchten Sie zwangsweise löschen?",
    deleteCanceled: "Benutzer hat das erzwungene Löschen abgebrochen",
    deleteError: 'Fehler beim erzwungenen Löschen des Kontakts',
    deleteMessage: 'Kontakt wurde erfolgreich erzwungen gelöscht',
    deleteTitle: 'Erzwungenes Löschen',
    warning1: 'Dieser Kontakt hat registrierte Tickets. Möchten Sie ihn dennoch löschen? (Dabei werden alle zugehörigen Tickets und Nachrichten gelöscht)',
    warning2: 'Dieser Kontakt hat registrierte Chancen. Möchten Sie ihn dennoch löschen? (Dabei werden alle zugehörigen Chancen gelöscht)',
    agruparLid: 'Kontakte nach LID gruppieren',
    agruparLidTitle: 'Kontakte nach LID gruppieren',
    agruparLidMessage: 'Wenn Sie diese Option aktivieren, werden Kontakte mit demselben WhatsApp-LID zu einem Kontakt zusammengefasst.',
    lid: "WhatsApp-LID",
    tableTitle: "Kontakte",
    searchPlaceholder: "Lokalisieren",
    walletFilterLabel: "Filtern nach Portfolio",
    tagFilterLabel: "Filtern nach Tag",
    syncContactsLabel: "Kontakte synchronisieren",
    syncGroupsLabel: "Synchronisierungsgruppen",
    removeDuplicatesLabel: "Duplikate entfernen",
    checkDigit: "Neunte Ziffer prüfen (BR)",
    addContactLabel: "Kontakt hinzufügen",
    importContactsLabel: "Kontakte importieren",
    importWarning: "Die Datei muss die Spalten Name und Nummer enthalten",
    exportContactsLabel: "Kontakte exportieren",
    photoColumn: "Foto",
    nameColumn: "Name",
    whatsappColumn: "WhatsApp",
    businessColumn: "Unternehmen",
    telegramColumn: "Telegramm",
    messengerColumn: "Bote",
    instagramColumn: "Instagram",
    hubWaba: "Waba (Hub)",
    emailColumn: "E-Mail",
    cpfColumn: "CPF",
    birthdayColumn: "Geburtstag",
    firstNameColumn: "Vorname",
    lastNameColumn: "Nachname",
    businessNameColumn: "Unternehmen",
    walletColumn: "Portfolio",
    validateContact: "Kontakte validieren",
    validateContactWarning: "Wenn Sie die Option „Kontakte validieren auswählen, müssen Sie über eine aktive Verbindung verfügen, um die Kontakte zu validieren. Bei Verwendung mit inoffiziellen APIs kann die Validierung zu vieler Zahlen zu einer Blockierung führen.",
    addTagsInsteadOfReplace: "Tags hinzufügen statt ersetzen",
    addTagsTooltip: "Wenn aktiviert, werden die ausgewählten Tags zu den vorhandenen Kontakt-Tags hinzugefügt. Wenn deaktiviert, werden alle Kontakt-Tags durch die ausgewählten Tags ersetzt.",
    addTagsWarning: "Wenn Sie diese Option aktivieren, werden die ausgewählten Tags zu den bereits vorhandenen Kontakt-Tags hinzugefügt, ohne die vorherigen Tags zu entfernen.",
    tagsColumn: "Schlagwörter",
    kanbanColumn: "Kanban",
    actionsColumn: "Aktionen",
    blockContactColumn: "Kontakt blockieren",
    blockChatbotColumn: "Chatbot blockieren",
    confirmSyncContactsTitle: "Aufmerksamkeit!! Möchten Sie Kontakte wirklich synchronisieren?",
    confirmSyncContactsMessage: "Es werden alle Kontakte erstellt, mit denen Sie jemals über WhatsApp gechattet haben. Dies kann eine Weile dauern ...",
    confirmRemoveDuplicatesTitle: "Aufmerksamkeit!! Möchten Sie doppelte Kontakte löschen?",
    confirmRemoveDuplicatesMessage: "Alle Tickets und Nachrichten werden dem ältesten doppelten Kontakt zugewiesen ...",
    confirmSyncGroupsTitle: "Aufmerksamkeit!! Möchten Sie Gruppen wirklich synchronisieren?",
    confirmSyncGroupsMessage: "Es werden alle Gruppen erstellt, mit denen Sie jemals über WhatsApp gechattet haben. Dies kann eine Weile dauern ...",
    deleteContactTitle: "Aufmerksamkeit!! Möchten Sie den Kontakt wirklich löschen?",
    deleteContactSuccess: "Kontakt gelöscht!",
    syncInProgressMessage: "Dies kann eine Weile dauern ...",
    blockContactSuccess: "Sperrstatus erfolgreich aktualisiert!",
    blockContactError: "Fehler beim Aktualisieren des Sperrstatus.",
    blockChatbotSuccess: "Chatbot-Blockierungsstatus erfolgreich aktualisiert!",
    blockChatbotError: "Fehler beim Aktualisieren des Chatbot-Blockierungsstatus.",
    downloadModelLabel: "Vorlage herunterladen",
    selectDestiny: "Zielort auswählen",
    modelDownloadHint: "Name;Nummer;E-Mail;CPF;Geburtsdatum;Vorname;Nachname;Firma",
    uploadFileLabel: "Kontakte importieren",
    fileUploadHint: "Die Datei muss die Spalten Name und Nummer enthalten",
    noTagsAvailable: "Ups … Keine Tags erstellt!",
    noTagsAvailableWarning: "Neue Labels können Sie in der Systemadministration registrieren.",
    noWalletsAvailable: "Ups ... Keine Geldbörsen verfügbar!",
    downloadCsvHint: "Laden Sie die Vorlage im CSV-Format herunter.",
    saveButton: "Speichern",
    cancelButton: "Stornieren",
    coluumnsButton: "Spalten",
    block: "Block",
    blockBot: "Chatbot blockieren",
    queueDestiny: "Zielwarteschlange",
    userDestiny: "Zielbenutzer",
    dialog: {
      contact: "Kontakt",
      selectChannel: "Wählen Sie den Kanal aus, um den Dienst zu starten.",
      start: "Start",
      cancel: "Stornieren",
      confirmDelete: "Möchten Sie den Kontakt wirklich löschen?",
      syncContactsTitle: "Kontakte synchronisieren",
      syncContactsMessage: "Alle Kontakte werden erstellt. Dies kann eine Weile dauern ...",
      syncGroupsTitle: "Synchronisierungsgruppen",
      syncGroupsMessage: "Alle Gruppen werden erstellt. Dies kann eine Weile dauern ...",
      removeDuplicatesTitle: "Doppelte Kontakte entfernen",
      checkDigitTitle: "Behandeln Sie die neunte Ziffer für brasilianische Zahlen",
      removeDuplicatesMessage: "Alle Tickets werden dem ältesten Kontakt zugewiesen.",
      checkDigitMessage: "Kontakte mit falscher Nummer werden entfernt, ebenso wie Tickets und Nachrichten. Dies ist eine Behandlung für brasilianische Nummern basierend auf der allgemeinen Neuntziffernregel für WhatsApp. DDDs größer als 30 erhalten im Allgemeinen nicht die 9."
    },
    notifications: {
      existingTicket: "Es gibt bereits einen laufenden Dienst für",
      existingTicketDetails: "Es ist bereits ein Dienst in Bearbeitung",
      contactDeleted: "Kontakt erfolgreich gelöscht!",
      deleteError: "Fehler beim Löschen des Kontakts.",
      tokenUpdateError: "Fehler beim Aktualisieren des Tokens.",
      started: "Dienst gestartet",
      importInProgress: "Import läuft.",
      importCaption: "Sobald der Vorgang abgeschlossen ist, wird die Seite aktualisiert.",
      importSuccess: "Kontakte erfolgreich importiert!",
      importError: "Fehler beim Importieren der Kontakte.",
      loadQueuesError: "Fehler beim Laden der Warteschlangen.",
      loadSynError: "Fehler beim Synchronisieren.",
      loadUsersError: "Fehler beim Laden der Benutzer.",
      ticketTransferred: "Ticket erfolgreich übertragen.",
      exportError: "Fehler beim Exportieren der Kontakte.",
      syncContact: "Kontakte werden aktualisiert. Dies kann eine Weile dauern ...",
      syncGroups: "Gruppen werden aktualisiert. Dies kann eine Weile dauern ..."
    },
    actions: {
      blockBot: "Chatbot blockieren",
      queueDestiny: "Zielwarteschlange",
      userDestiny: "Zielbenutzer"
    }
  },
  customizar: {
    logoDark: {
      title: "Dunkles Logo",
      chooseFile: "Datei auswählen",
      upload: "Hochladen",
      current: "Aktuelles dunkles Logo"
    },    
    forceLogout: {
      title: "Force-Logout-Konfiguration pro Mandant",
      description: "Konfigurieren Sie, ob jeder Mandant eine einzelne Sitzung (Force Logout) aktiviert oder deaktiviert haben soll.",
      selectTenant: "Mandanten auswählen",
      forceLogout: "Logout erzwingen",
      enabled: "Aktiviert",
      disabled: "Deaktiviert",
      forceLogoutEnabled: "Erzwungener Logout aktiviert",
      forceLogoutDisabled: "Erzwungener Logout deaktiviert",
      warning1: "Einzelsitzung aktiviert – Benutzer werden bei Anmeldung auf einem anderen Gerät abgemeldet",
      warning2: "Einzelsitzung deaktiviert – Benutzer können sich auf mehreren Geräten anmelden"
    },
    masterkey: {
      generateRandom: "Zufällig generieren",
      title: "MasterKey-Konfiguration",
      description: "Konfigurieren Sie die MasterKey für die Anwendung",
      enabled: "MasterKey Aktiviert",
      disabled: "MasterKey Deaktiviert",
      lastUsed: "MasterKey-Nutzungsprotokoll",
      keyLabel: "MasterKey",
      warningTitle: "Achtung!!",
      warningText: "Die MasterKey ist ein eindeutiger Zugriffsschlüssel für die Anwendung. Bitte bewahren Sie ihn an einem sicheren Ort auf und teilen Sie ihn mit niemandem. Dieser Schlüssel kann nur vom Superadmin des Tenants 1 bearbeitet werden"
    },
    encryptionkey: {
      title: "Verschlüsselungsschlüssel-Konfiguration",
      description: "Konfigurieren Sie den Verschlüsselungsschlüssel für den Hauptmandanten (ID: 1). Dieser Schlüssel wird verwendet, um Passwörter im Frontend zu verschlüsseln.",
      keyLabel: "Verschlüsselungsschlüssel",
      generateRandom: "Zufälligen Schlüssel generieren",
      infoTitle: "Wichtige Informationen",
      infoText: "Dieser Schlüssel wird verwendet, um Passwörter vor dem Senden an den Server zu verschlüsseln. Bewahren Sie ihn sicher auf und teilen Sie ihn nicht.",
      warningTitle: "Warnung: Verschlüsselungsschlüssel-Änderung",
      warningText: "Das Ändern dieses Schlüssels wirkt sich auf die Benutzerauthentifizierung aus. Benutzer müssen sich möglicherweise erneut anmelden.",
      warningChangeKey: "WARNUNG: Das Ändern des Verschlüsselungsschlüssels macht alle zuvor verschlüsselten Daten inkompatibel.\n\nDies kann verursachen:\n• Fehler beim Entschlüsseln alter Passwörter/Token\n• Notwendigkeit, Integrationen neu zu konfigurieren\n• Möglicher Verlust des Zugriffs auf verschlüsselte Daten\n\nMöchten Sie fortfahren?",
      warningAfterUpdate: "Denken Sie daran: Mit dem vorherigen Schlüssel verschlüsselte Daten sind möglicherweise nicht mehr zugänglich.",
      errorKeyTooShort: "Der Verschlüsselungsschlüssel muss mindestens 16 Zeichen lang sein",
      successUpdate: "Verschlüsselungsschlüssel-Konfiguration erfolgreich aktualisiert",
      errorUpdate: "Fehler beim Aktualisieren der Verschlüsselungsschlüssel-Konfiguration"
    },    
    tabs: {
      masterkey: "MasterKey",
      encryptionkey: "Verschlüsselungsschlüssel",
      colors: "Farben",
      branding: "Marke",
      tutorials: "Tutorials",
      forceLogout: "Logout erzwingen"
    },    
    title: "Anwendung anpassen",
    chooseColors: "Farben auswählen",
    colors: {
      neutral: "Neutrale Farbe",
      primary: "Grundfarbe",
      secondary: "Sekundärfarbe",
      accent: "Hervorhebungsfarbe",
      warning: "Warnfarbe",
      negative: "Negative Farbe",
      positive: "Positive Farbe",
      light: "Lichtfarbe"
    },
    saveColors: "Farben speichern",
    applyColors: "Farbänderungen anwenden",
    logo: {
      title: "Logo",
      chooseFile: "Datei auswählen",
      upload: "Hochladen",
      current: "Aktuelles Logo"
    },
    favicon: {
      title: "Favicon",
      chooseFile: "Datei auswählen",
      upload: "Hochladen",
      current: "Aktuelles Favicon"
    },
    video: {
      title: "Video (Startseite)",
      chooseFile: "Datei auswählen",
      upload: "Hochladen",
      current: "Aktuelles Video"
    },
    appName: {
      title: "Anwendungsname",
      label: "Name",
      update: "Name aktualisieren"
    },
    logoScreen: {
      title: "Anmeldebildschirm-Modell",
      label: "Modell auswählen",
      update: "Aktualisieren"
    },
    frontend: {
      rebuildTitle: "Logo-, Favicon- und Namensänderungen vornehmen",
      warning: "Die Änderung funktioniert nur bei Installationen, die den Standardordner und -benutzer des automatischen Installationsprogramms beibehalten.",
      rebuildMessage: "Bitte warten Sie, Änderungen werden an Ihrem Frontend vorgenommen ... Ihr Frontend wird derzeit neu erstellt.",
      rebuildButton: "Änderungen übernehmen"
    },
    notifications: {
      errorVideoSize: "Das ausgewählte Video ist zu groß. Die maximale Größe beträgt 5 MB.",
      errorLogo: "Ungültiges Dateiformat. Es sind nur JPG, JPEG und PNG zulässig",
      errorIcon: "Ungültiges Dateiformat. Nur ICO-Dateien sind erlaubt",
      successLoadColors: "Farben erfolgreich geladen.",
      errorLoadColors: "Fehler beim Laden der Farben.",
      successSaveColors: "Farben erfolgreich gespeichert.",
      errorSaveColors: "Fehler beim Speichern der Farben.",
      successUploadLogo: "Logo erfolgreich gesendet.",
      errorUploadLogo: "Fehler beim Senden des Logos.",
      successUploadIcon: "Favicon erfolgreich gesendet.",
      errorUploadIcon: "Fehler beim Senden des Favicons.",
      successRebuildFrontend: "Frontend erfolgreich neu erstellt.",
      errorRebuildFrontend: "Fehler beim Neuaufbau des Frontends.",
      successUpdateAppName: "Anwendungsname erfolgreich aktualisiert.",
      errorUpdateAppName: "Fehler beim Aktualisieren des Anwendungsnamens.",
      successUpdateLogoScreen: "Anmeldebildschirm-Modell erfolgreich aktualisiert.",
      errorUpdateLogoScreen: "Fehler beim Aktualisieren des Anmeldebildschirm-Modells."
    }
  },
  common: {
    continue: "Fortfahren",
    cancel: "Abbrechen"
  },
  equipes: {
    title: "Teams",
    columns: {
      id: "#",
      group: "Team",
      isActive: "Aktiv",
      actions: "Aktionen"
    },
    actions: {
      addUser: "Benutzer hinzufügen/entfernen",
      edit: "Team bearbeiten",
      delete: "Team löschen"
    },
    notifications: {
      deleted: "Gruppe {group} gelöscht!",
      errorLoading: "Fehler beim Laden der Gruppen.",
      errorDelete: "Fehler beim Löschen der Gruppe.",
      created: "Team erfolgreich erstellt!",
      updated: "Team erfolgreich aktualisiert!"
    },
    dialog: {
      deleteTitle: "Aufmerksamkeit!!",
      deleteMessage: "Möchten Sie die Gruppe „{group}“ wirklich löschen?"
    },
    modal: {
      titleCreate: "Team erstellen",
      titleEdit: "Team bearbeiten",
      nameLabel: "Teamname",
      activeLabel: "Aktiv",
      cancelButton: "Stornieren",
      saveButton: "Speichern",
      notifications: {
        created: "Team erfolgreich erstellt!",
        updated: "Team erfolgreich bearbeitet!",
        error: "Fehler beim Speichern des Teams."
      }
    },
    modalUser: {
      title: "Teambenutzer verwalten",
      placeholder: "Wählen Sie die hinzuzufügenden Benutzer aus",
      tooltip: "Wählen Sie Benutzer aus der Liste aus oder heben Sie die Auswahl auf.",
      saveButton: "Speichern",
      closeButton: "Schließen",
      notifications: {
        updated: "Benutzer aktualisiert!",
        error: "Fehler beim Aktualisieren der Benutzer!"
      }
    }
  },
  etiquetas: {
    title: "Schlagwörter",
    columns: {
      id: "#",
      tag: "Etikett",
      color: "Farbe",
      isActive: "Aktiv",
      actions: "Aktionen"
    },
    notifications: {
      created: "Etikett erfolgreich erstellt!",
      updated: "Etikett erfolgreich aktualisiert!",
      deleted: "Tag {tag} gelöscht!",
      errorLoading: "Fehler beim Laden der Etiketten.",
      errorDelete: "Fehler beim Löschen des Tags."
    },
    dialog: {
      deleteTitle: "Aufmerksamkeit!!",
      deleteMessage: "Möchten Sie das Tag \"{tag}\" wirklich löschen?"
    }
  },
  modalEtiqueta: {
    titleCreate: "Etikett erstellen",
    titleEdit: "Beschriftung bearbeiten",
    nameLabel: "Etikettenname",
    colorLabel: "Farbe",
    activeLabel: "Aktiv",
    cancelButton: "Stornieren",
    saveButton: "Speichern",
    notifications: {
      created: "Etikett erfolgreich erstellt!",
      updated: "Etikett erfolgreich bearbeitet!",
      error: "Fehler beim Speichern des Etiketts."
    }
  },
  fechamento: {
    title: "Abschiede",
    nameLabel: "Name",
    messageLabel: "Nachricht",
    userLabel: "Benutzer",
    dateLabel: "Datum",
    actionsLabel: "Aktionen",
    deleteAllButton: "Alle löschen",
    searchPlaceholder: "Lokalisieren",
    deleteConfirmation: "Möchten Sie „Farewell\" {id} wirklich löschen?",
    deleteAllConfirmation: "Möchten Sie wirklich alle Abschiedsdatensätze löschen?",
    deleteSuccess: "Abschied erfolgreich gelöscht!",
    deleteAllSuccess: "Alle Abschiede wurden erfolgreich gelöscht!",
    notifications: {
      error: "Fehler beim Verarbeiten der Anfrage."
    },
    system: "System"
  },
  modalDespedida: {
    titleCreate: "Abschied gestalten",
    titleEdit: "Abschied bearbeiten",
    nameLabel: "Name des Abschieds",
    label: "Lebewohl",
    notifications: {
      created: "Abschied erfolgreich geschafft!",
      updated: "Abschied erfolgreich bearbeitet!",
      error: "Beim Speichern der Verabschiedung ist ein Fehler aufgetreten."
    }
  },
  filas: {
    title: "Warteschlangen",
    notifications: {
      created: "Warteschlange erfolgreich erstellt!",
      updated: "Warteschlange erfolgreich bearbeitet!",
      deleted: "Warteschlange erfolgreich gelöscht!",
      error: "Beim Verarbeiten der Warteschlange ist ein Fehler aufgetreten."
    },
    confirmDelete: "Möchten Sie die Warteschlange „{name}“ wirklich löschen?"
  },
  modalFila: {
    title: {
      create: "Warteschlange erstellen",
      edit: "Warteschlange bearbeiten"
    },
    notifications: {
      created: "Warteschlange erfolgreich erstellt!",
      updated: "Warteschlange erfolgreich bearbeitet!",
      error: "Beim Verarbeiten der Warteschlange ist ein Fehler aufgetreten."
    },
    labels: {
      name: "Warteschlangenname",
      businessHours: "Öffnungszeiten",
      absenceMessage: "Abwesenheitsnachricht"
    }
  },
  horarioAtendimento: {
    title: "Öffnungszeiten",
    tooltips: {
      open: "Geöffnet: Einrichtung ganztägig geöffnet. Es wird keine Abwesenheitsnachricht versendet.",
      closed: "Geschlossen: Einrichtung ganztägig geschlossen. Abwesenheitsnachrichten werden unabhängig von der Uhrzeit gesendet.",
      schedule: "Zeitplan: Stellt die Öffnungszeiten des Betriebs dar. Abwesenheitsnachrichten werden außerhalb der festgelegten Zeiten gesendet.",
      important: "**Wichtig: Die Abwesenheitsnachricht wird nach Beendigung des automatischen Dienstes versendet."
    },
    labels: {
      closed: "Geschlossen",
      absenceMessage: "Abwesenheitsnachricht",
      time: "zum",
      holidays: "Feiertage",
      holidayDate: "Feiertagsdatum",
      holidayDescription: "Urlaubsbeschreibung",
      addHoliday: "Feiertag hinzufügen",
      holidaysInfo: "Feiertage sind Tage, an denen der Betrieb nicht geöffnet ist. Diese Tage gelten als geschlossene Tage."
    },
    notifications: {
      scheduleUpdated: "Aktualisierte Öffnungszeiten.",
      absenceMessageUpdated: "Abwesenheitsnachricht aktualisiert.",
      holidaysUpdated: "Feiertage erfolgreich aktualisiert!",
      validationError: "Validierungsfehler bei den Öffnungszeiten. Bitte korrigieren Sie die Fehler vor dem Speichern.",
      saveError: "Fehler beim Speichern der Öffnungszeiten."
    }
  },
  businessHours: {
    days: {
      0: "Sonntag",
      1: "Montag",
      2: "Dienstag",
      3: "Mittwoch",
      4: "Donnerstag",
      5: "Freitag",
      6: "Samstag"
    },
    types: {
      O: "Offen",
      C: "Geschlossen",
      H: "Zeit",
      L: "Freigegeben",
      B: "Blockiert"
    },
    labels: {
      start: "Start",
      end: "Ende",
      to: "bis"
    },
    notifications: {
      updated: "Öffnungszeiten erfolgreich aktualisiert."
    },
    warnings: {
      overlap: "Zeitpläne dürfen sich nicht überschneiden. Passen Sie die Intervalle an.",
      invalidTime: "Die Zeiten müssen zwischen 00:01 und 23:59 liegen.",
      invalidHour: "Ungültige Zeit",
      gap: "Die Zeitpläne müssen aufeinanderfolgend sein, ohne Lücken zwischen den Perioden.",
      invalidPeriod: "Die Startzeit muss kleiner als die Endzeit in jeder Periode sein.",
      missingTime: "Alle Zeitpläne müssen ausgefüllt sein."
    }
  },
  kanbanMenu: {
    kanban: "Kanban",
    tags: "Etikett"
  },
  kanbans: {
    cardsLoaded: "Karten erfolgreich geladen!",
    contactTitle: "Kontakt",
    title: "Visuelle Kontrolle der Dienste",
    loadingMessage: "Bitte warten, Kanban-Informationen werden geladen …",
    attendances: "Leistungen",
    contacts: "Kontakte",
    removeAttendanceTitle: "Dienst aus dem Dashboard entfernen",
    removeAttendanceMessage: "Möchten Sie den Dienst entfernen?",
    startAttendance: "Wählen Sie den Kanal aus, um den Dienst zu starten.",
    existingTicketMessage: "{title} bietet einen laufenden Dienst. Möchten Sie den Dienst öffnen?",
    existingTicketAdminOnly: "{title} bietet einen laufenden Dienst. Nur ein Administrator kann Ihnen diesen Dienst zuweisen.",
    loadingNewData: "Neue Daten in Kanban werden geladen … Bitte warten!",
    successEdit: "Alle Karten wurden erfolgreich bearbeitet!",
    contactEdited: "Kontakt erfolgreich bearbeitet!",
    contactEditError: "Fehler beim Bearbeiten der Kontakte",
    kanbanUpdated: "Kanban erfolgreich aktualisiert!",
    openAttendance: "Offener Dienst",
    selectChannel: "Wählen Sie den Kanal aus, um den Dienst zu starten.",
    contactHasTicket: "{title} bietet einen laufenden Dienst. Möchten Sie den Dienst öffnen?",
    adminOnlyTicket: "{title} bietet einen laufenden Dienst. Nur ein Administrator kann Ihnen diesen Dienst zuweisen.",
    successEditCards: "Alle Karten wurden erfolgreich bearbeitet!",
    loadingKanban: "Neue Daten in Kanban werden geladen … Bitte warten!",
    tokenUpdateError: "Token kann nicht aktualisiert werden.",
    fetchingContactsError: "Fehler beim Abrufen der Kontakte.",
    noNameAvailable: "Name nicht verfügbar",
    fetchingKanbansError: "Fehler beim Auflisten von Kanbans."
  },
  tagsKanban: {
    contacts: "Kontakte",
    title: "Anzeigen von Tags in Kanban",
    description: "Nur anzeigen, beim Bearbeiten von Karten können keine Tags gespeichert werden.",
    loading: "Neue Daten in Kanban werden geladen … Bitte warten!",
    removeTitle: "Dienst aus dem Dashboard entfernen",
    removeMessage: "Möchten Sie den Dienst entfernen?",
    cardEdited: "Kontakt bearbeitet!",
    startService: "Wählen Sie den Kanal aus, um den Dienst zu starten.",
    serviceStarted: "Dienst gestartet",
    contactError: "Beim Entfernen des Kontakts ist ein Fehler aufgetreten.",
    kanbanError: "Fehler beim Auflisten von Kanbans.",
    cardsSaved: "Alle Karten wurden erfolgreich bearbeitet!",
    saveError: "Beim Bearbeiten der Kontakte ist ein Fehler aufgetreten.",
    existingServiceTitle: "Laufender Service",
    existingServiceMessageUser: "{title} bietet einen laufenden Dienst. Nur ein Administrator kann Ihnen diesen Dienst zuweisen.",
    existingServiceMessageAdmin: "{title} hat einen laufenden Dienst (Dienst: {ticketId} – Warteschlange: {queueId}). Möchten Sie den Dienst öffnen?",
    tokenError: "Token kann nicht aktualisiert werden.",
    buttons: {
      yes: "Ja",
      no: "NEIN",
      ok: "OK"
    },
    contactTitle: "Kontakt",
    selectChannel: "Wählen Sie den Kanal aus, um den Dienst zu starten.",
    canceledTicket: "Vorgang abgebrochen",
    noChannelsAvailable: "Keine Kanäle verfügbar",
    tenantNotFound: "Mandant nicht gefunden",
    errorStartingConversation: "Fehler beim Starten der Unterhaltung",
  },
  cardsTags: {
    title: "Tag-Karten",
    description: "Detaillierte Informationen zu Kontakten anzeigen.",
    tagsTooltip: "Etikett",
    walletTooltip: "Portfolio",
    actions: {
      uazapi: "Uazapi-Service",
      zapi: "Zapi-Service",
      whatsapp: "WWebJs-Unterstützung",
      baileys: "Baileys Service",
      meow: "Miau-Service",
      evo: "Evo Service",
      waba: "Waba-Service"
    },
    phoneTooltip: "Telefon",
    removeTooltip: "Entfernen"
  },
  cardsKanbans: {
    title: "Kanban-Karten",
    description: "Detaillierte Informationen zu Kontakten anzeigen.",
    tagsTooltip: "Etikett",
    walletTooltip: "Portfolio",
    actions: {
      uazapi: "Uazapi-Service",
      zapi: "Zapi-Service",
      whatsapp: "WWebJs-Unterstützung",
      baileys: "Baileys Service",
      meow: "Miau-Service",
      evo: "Evo Service",
      waba: "Waba-Service",
      remove: "Entfernen"
    },
    phoneTooltip: "Telefon"
  },
  lanes: {
    title: "Kanban-Bahnen",
    actions: "Aktionen",
    add: "Neue Spur hinzufügen",
    edit: "Spur bearbeiten",
    deleteConfirm: "Möchten Sie das Kanban „{name}“ wirklich löschen?",
    deleteSuccess: "Kanban {name} erfolgreich gelöscht!",
    columns: {
      id: "AUSWEIS",
      name: "Fahrbahn",
      actions: "Aktionen"
    },
    notifications: {
      loadError: "Fehler beim Laden der Fahrspuren.",
      deleteError: "Fehler beim Löschen der Spur."
    }
  },
  modalLanesKanban: {
    createTitle: "Kanban erstellen",
    editTitle: "Kanban bearbeiten",
    nameLabel: "Kanban-Name",
    createSuccess: "Kanban erfolgreich erstellt!",
    updateSuccess: "Kanban erfolgreich aktualisiert!",
    notifications: {
      error: "Fehler bei der Kanban-Verarbeitung."
    }
  },
  modalMensagemRapida: {
    createTitle: "Kurznachricht erstellen",
    editTitle: "Kurznachricht bearbeiten",
    idLabel: "AUSWEIS",
    keyLabel: "Schlüssel",
    keyHint: "Der Schlüssel ist die Verknüpfung, mit der Benutzer nach der Nachricht suchen können.",
    messageLabel: "Nachricht",
    placeholder: "Geben Sie die Nachricht ein",
    sendAsAudio: "Als aufgezeichnetes Audio senden",
    fileLabel: "Datei auswählen",
    publicLabel: "Mit allen Benutzern teilen",
    publicHint: "Wenn aktiviert, steht diese Schnellnachricht allen Benutzern zur Verfügung.",
    removeFile: "Datei entfernen",
    saveSuccess: {
      create: "Kurznachricht erfolgreich erstellt!",
      update: "Kurznachricht erfolgreich aktualisiert!"
    },
    saveError: "Beim Speichern der Kurznachricht ist ein Fehler aufgetreten.",
    variablesLabel: "Variablen",
    emojiLabel: "Emoji",
    variablesList: {
      0: {
        label: "Name",
        value: "{{Name}}"
      },
      1: {
        label: "Gruß",
        value: "{{Gruß}}"
      },
      2: {
        label: "Protokoll",
        value: "{{Protokoll}}"
      },
      3: {
        label: "E-Mail (falls verfügbar)",
        value: "{{E-Mail}}"
      },
      4: {
        label: "Telefon",
        value: "{{phoneNumber}}"
      },
      5: {
        label: "Kanban (falls vorhanden)",
        value: "{{Kanban}}"
      },
      6: {
        label: "Begleiter (falls anwesend)",
        value: "{{Benutzer}}"
      },
      7: {
        label: "E-Mail des Mitarbeiters (falls im Dienst)",
        value: "{{userEmail}}"
      },
      8: {
        label: "Vorname (falls vorhanden)",
        value: "{{Vorname}}"
      },
      9: {
        label: "Nachname (falls vorhanden)",
        value: "{{Nachname}}"
      },
      10: {
        label: "Firma (falls vorhanden)",
        value: "{{businessName}}"
      }
    }
  },
  mensagemRapida: {
    title: "Schnellnachrichten",
    add: "Kurznachricht hinzufügen",
    edit: "Kurznachricht bearbeiten",
    create: "Kurznachricht erstellen",
    key: "Schlüssel",
    message: "Nachricht",
    file: "Datei",
    recordedAudio: "Aufgezeichnetes Audio",
    visibility: "Sichtbarkeit",
    visibilityPublic: "Öffentlich",
    visibilityPrivate: "Privat",
    noFile: "Keine Datei",
    fileOpen: "Datei öffnen",
    noPreview: "Kein Inhalt verfügbar",
    active: "Aktiv",
    inactive: "Inaktiv",
    actions: "Aktionen",
    deleteConfirmation: "Möchten Sie die Schlüsselnachricht „{key}“ wirklich löschen?",
    deleteSuccess: "Nachricht erfolgreich gelöscht!",
    saveSuccess: {
      create: "Kurznachricht erfolgreich erstellt!",
      update: "Kurznachricht erfolgreich aktualisiert!"
    },
    saveError: "Beim Speichern der Kurznachricht ist ein Fehler aufgetreten."
  },
  galeria: {
    title: "Galerie",
    search: "Suchen...",
    filterByType: "Nach Typ filtern",
    upload: "Dateien hochladen",
    uploadFiles: "Dateien hochladen",
    selectFiles: "Dateien auswählen",
    selectFilesFirst: "Wählen Sie mindestens eine Datei aus",
    description: "Beschreibung",
    fileName: "Dateiname",
    type: "Typ",
    size: "Größe",
    actions: "Aktionen",
    preview: "Vorschau",
    download: "Herunterladen",
    viewFile: "Datei anzeigen",
    delete: "Löschen",
    deleteConfirm: "Möchten Sie die Datei \"{fileName}\" wirklich löschen?",
    deleteSuccess: "Datei erfolgreich gelöscht!",
    deleteError: "Fehler beim Löschen der Datei",
    uploadSuccess: "Datei(en) erfolgreich hochgeladen!",
    uploadError: "Fehler beim Hochladen der Datei(en)",
    loadError: "Fehler beim Laden der Galerie",
    imagePreview: "Bildvorschau",
    noFiles: "Keine Dateien gefunden",
    loadMore: "Mehr laden",
    types: {
      image: "Bild",
      pdf: "PDF",
      video: "Video",
      audio: "Audio",
      document: "Dokument",
      archive: "Archiv",
      other: "Andere"
    }
  },
  instagramComentarios: {
    title: 'Instagram-Kommentare',
    refresh: 'Aktualisieren',
    selectChannel: 'Kanal auswählen',
    mediaList: 'Medienliste',
    noMedia: 'Keine Medien gefunden',
    mediaId: 'Medien-ID',
    loadMore: 'Mehr laden',
    comments: 'Kommentare',
    noComments: 'Keine Kommentare gefunden',
    anonymous: 'Anonym',
    likes: 'Likes',
    reply: 'Antworten',
    replyToComment: 'Auf Kommentar antworten',
    commentFrom: 'Kommentar von',
    replyMessage: 'Antwortnachricht',
    messageRequired: 'Nachricht ist erforderlich',
    cancel: 'Abbrechen',
    send: 'Senden',
    errorLoadingChannels: 'Fehler beim Laden der Kanäle',
    errorLoadingMedia: 'Fehler beim Laden der Medien',
    errorLoadingMoreMedia: 'Fehler beim Laden weiterer Medien',
    errorLoadingComments: 'Fehler beim Laden der Kommentare',
    errorLoadingMoreComments: 'Fehler beim Laden weiterer Kommentare',
    errorSendingReply: 'Fehler beim Senden der Antwort',
    replySent: 'Antwort erfolgreich gesendet!',
    delete: 'Löschen',
    deleteComment: 'Kommentar löschen',
    deleteConfirmation: 'Möchten Sie diesen Kommentar wirklich löschen?',
    commentDeleted: 'Kommentar erfolgreich gelöscht!',
    errorDeletingComment: 'Fehler beim Löschen des Kommentars'
  },
  notas: {
    title: "Hinweise",
    searchPlaceholder: "Lokalisieren",
    dateFilterPlaceholder: "Filtern nach Datum",
    note: "Beachten",
    user: "Benutzer",
    ticket: "Service",
    date: "Datum",
    actions: "Aktionen",
    noResults: "Keine Notizen gefunden.",
    deleteConfirmation: "Möchten Sie die Notiz „{note}“ wirklich löschen?",
    deleteSuccess: "Notiz erfolgreich gelöscht!",
    saveSuccess: {
      create: "Notiz erfolgreich erstellt!",
      update: "Hinweis erfolgreich aktualisiert!"
    },
    saveError: "Beim Speichern der Notiz ist ein Fehler aufgetreten.",
    system: "System"
  },
  modalNotas: {
    titleCreate: "Notiz erstellen",
    titleEdit: "Notiz bearbeiten",
    noteLabel: "Notiznummer",
    ticketLabel: "Service",
    saveSuccess: "Notiz erfolgreich gespeichert!",
    saveError: "Beim Speichern der Notiz ist ein Fehler aufgetreten."
  },
  modalNotaAtendimento: {
    titleCreate: "Notiz erstellen",
    titleEdit: "Notiz bearbeiten",
    labelNote: "Service-Hinweis",
    saveSuccess: "Notiz erfolgreich gespeichert!",
    saveError: "Beim Speichern der Notiz ist ein Fehler aufgetreten."
  },
  notificacao: {
    title: "Benachrichtigungen",
    add: "Benachrichtigung hinzufügen",
    deleteAll: "Alle löschen",
    deleteOne: "Möchten Sie die Benachrichtigung „{id}“ wirklich löschen?",
    deleteAllConfirm: "Möchten Sie wirklich alle Benachrichtigungen löschen?",
    created: "Benachrichtigung erfolgreich erstellt!",
    updated: "Benachrichtigung erfolgreich aktualisiert!",
    deleted: "Benachrichtigung erfolgreich gelöscht!",
    allDeleted: "Alle Benachrichtigungen wurden gelöscht!",
    columns: {
      id: "#",
      message: "Nachricht",
      userId: "Benutzer-ID",
      userName: "Benutzer",
      isRead: "Lektüre",
      createdAt: "Datum",
      actions: "Aktionen"
    },
    isRead: {
      read: "Lesen",
      unread: "Ungelesen"
    }
  },
  modalNotificacao: {
    title: {
      create: "Benachrichtigung erstellen",
      edit: "Benachrichtigung bearbeiten"
    },
    fields: {
      message: "Benachrichtigung"
    },
    notifications: {
      created: "Benachrichtigung erfolgreich erstellt!",
      updated: "Benachrichtigung erfolgreich bearbeitet!",
      error: "Beim Erstellen oder Bearbeiten der Benachrichtigung ist ein Fehler aufgetreten."
    }
  },
  pagamentoTenants: {
    title: "Mieterzahlungen",
    loading: "Bitte warten, Zahlungsinformationen des Mieters werden geladen …",
    tenantId: "Mandanten-ID",
    paymentInfo: "Zahlungsinformationen",
    columns: {
      id: "Zahlungs-ID",
      status: "Status",
      dueDate: "Reife",
      bankSlipUrl: "Zahlungslink"
    },
    status: {
      pending: "Ausstehend",
      overdue: "Überfällig"
    },
    actions: {
      toggleTable: "Daten anzeigen"
    }
  },
  planos: {
    title: "Pläne",
    columns: {
      id: "AUSWEIS",
      name: "Name",
      value: "Wert",
      connections: "Anschlüsse",
      users: "Benutzer",
      trial: "Versuch",
      trialPeriod: "Zeitraum",
      actions: "Aktionen"
    },
    buttons: {
      add: "Plan hinzufügen",
      tokenAsaas: "Flügel-Token",
      viewToken: "Token anzeigen"
    },
    tooltips: {
      showToken: "Token anzeigen"
    },
    status: {
      enabled: "Aktiv",
      disabled: "Inaktiv"
    },
    messages: {
      deleteConfirmation: "Möchten Sie den Plan „{id}“ wirklich löschen?",
      tokenUpdated: "Token erfolgreich aktualisiert!",
      tokenUpdateError: "Fehler beim Aktualisieren des Tokens."
    }
  },
  modalPlanos: {
    title: {
      edit: "Plan bearbeiten",
      create: "Plan erstellen"
    },
    labels: {
      name: "Planname",
      value: "Planwert",
      connections: "Anschlüsse",
      users: "Benutzer",
      trial: "Versuch",
      trialPeriod: "Testzeitraum (Tage)"
    },
    warnings: {
      trial: "Achtung: Bei Aktivierung der Testversion werden die Daten des Unternehmens nach Ablauf der Testphase aus dem System gelöscht."
    },
    buttons: {
      cancel: "Stornieren",
      save: "Speichern"
    },
    notifications: {
      created: "Plan erfolgreich erstellt!",
      updated: "Plan erfolgreich aktualisiert!"
    }
  },
  protocolos: {
    ticketNotFound: "Dienst nicht gefunden",
    title: "Protokolle",
    columns: {
      id: "#",
      protocol: "Protokoll",
      userId: "Benutzer",
      ticketId: "Service",
      createdAt: "Datum",
      actions: "Aktionen"
    },
    filter: {
      search: "Lokalisieren",
      date: "Filtern nach Datum"
    },
    notifications: {
      deleted: "Protokoll gelöscht!",
      error: "Fehler beim Laden weiterer Protokolle."
    },
    confirm: {
      delete: "Möchten Sie das Protokoll „{protocol}“ wirklich löschen?"
    },
    buttons: {
      edit: "Bearbeiten",
      delete: "Löschen"
    }
  },
  modalProtocolo: {
    title: {
      create: "Protokoll erstellen",
      edit: "Protokoll bearbeiten"
    },
    fields: {
      protocol: "Protokollnummer",
      ticketId: "Service"
    },
    notifications: {
      created: "Protokoll erfolgreich erstellt!",
      updated: "Protokoll erfolgreich bearbeitet!",
      error: "Beim Speichern des Protokolls ist ein Fehler aufgetreten."
    }
  },
  tasks: {
    title: "Aufgaben",
    table: {
      headers: {
        id: "AUSWEIS",
        status: "Status",
        name: "Aufgabe",
        description: "Beschreibung",
        limitDate: "Frist",
        owner: "Verantwortlich",
        priority: "Priorität",
        comments: "Kommentare",
        actions: "Aktionen"
      },
      status: {
        delayed: "🚩 Spät",
        pending: "🔄 Ausstehend",
        finished: "✅ Abgeschlossen"
      },
      priority: {
        high: "⚡⚡⚡ Hoch",
        medium: "⚡⚡ Durchschnitt",
        low: "⚡ Herunterladen",
        none: "😉 Keine"
      }
    },
    labels: {
      dateFormat: "{Tag}-{Monat}-{Jahr}"
    },
    filters: {
      search: "Nach einer Aufgabe suchen",
      status: "Status",
      owner: "Verantwortlich",
      limitDate: "Frist",
      noResults: "Keine Aufgaben gefunden."
    },
    modal: {
      createTask: "Aufgabe erstellen",
      editTask: "Aufgabe bearbeiten",
      name: "Name",
      description: "Beschreibung",
      limitDate: "Frist",
      responsible: "Verantwortlich",
      recurrence: "Wiederauftreten",
      recurrenceTimes: "Anzahl der Wiederholungen",
      status: "Status",
      priority: "Priorität",
      comments: "Kommentare",
      recurrenceOptions: {
        none: "Kein Wiederauftreten",
        sevenDays: "7 Tage",
        thirtyDays: "30 Tage",
        fortyFiveDays: "45 Tage",
        sixtyDays: "60 Tage",
        seventyFiveDays: "75 Tage",
        ninetyDays: "90 Tage"
      },
      statusOptions: {
        delayed: "🚩 Spät",
        pending: "🔄 Ausstehend",
        finished: "✅ Abgeschlossen"
      },
      priorityOptions: {
        high: "⚡⚡⚡ Hoch",
        medium: "⚡⚡ Durchschnitt",
        low: "⚡ Herunterladen",
        none: "😉 Keine"
      },
      validation: {
        required: "Das Feld {field} ist erforderlich"
      },
      notifications: {
        userLoadError: "Problem beim Laden der Benutzer.",
        created: "Aufgabe erfolgreich erstellt!",
        edited: "Aufgabe erfolgreich bearbeitet!",
        error: "Beim Verarbeiten der Aufgabe ist ein Fehler aufgetreten."
      }
    },
    notifications: {
      finishSuccess: "Aufgabe erfolgreich abgeschlossen!",
      duplicateSuccess: "Aufgabe erfolgreich dupliziert!",
      checkDelayedError: "Fehler beim Prüfen überfälliger Aufgaben.",
      deleteConfirm: "Möchten Sie die Aufgabe „{name}“ wirklich löschen?",
      deleteSuccess: "Aufgabe „{name}“ erfolgreich gelöscht!",
      taskCreated: "Aufgabe erfolgreich erstellt!",
      taskUpdated: "Aufgabe erfolgreich bearbeitet!",
      taskDuplicated: "Aufgabe erfolgreich dupliziert!",
      taskCompleted: "Aufgabe erfolgreich abgeschlossen!",
      taskDeleted: "Aufgabe erfolgreich gelöscht!",
      error: "Fehler beim Ausführen der Aktion",
      loadUsersError: "Problem beim Laden der Benutzer.",
      loadTasksError: "Fehler beim Auflisten der Aufgaben.",
      createSuccess: "Aufgabe erfolgreich erstellt!",
      updateSuccess: "Aufgabe erfolgreich aktualisiert!"
    },
    tooltip: {
      conclued: "Abschließen",
      duplicate: "Duplikat",
      edit: "Bearbeiten",
      delete: "Löschen"
    }
  },
  tenantApi: {
    table: {
      title: "Mandanten-APIs",
      columns: {
        id: "AUSWEIS",
        apiToken: "API-Token",
        actions: "Aktionen"
      },
      noData: "Keine Tenant-API gefunden."
    },
    form: {
      create: "Mandanten-API erstellen",
      edit: "Mandanten-API bearbeiten"
    },
    modal: {
      confirmDelete: "Möchten Sie die Tenant-API „{id}“ wirklich löschen?",
      notifications: {
        created: "Mieter-API erfolgreich erstellt!",
        updated: "Tenant-API erfolgreich aktualisiert!",
        deleted: "Tenant-API erfolgreich gelöscht!"
      }
    },
    routes: {
      createTitle: "Routen zum Erstellen/Bearbeiten eines neuen Mandanten über die API:",
      activateTitle: "Route zum Aktivieren/Deaktivieren eines Mandanten über die API:",
      showTitle: "Route zum Anzeigen von Mieterinformationen über die API:",
      endpoint: "Endpunkt",
      bearerToken: "Token-Träger",
      body: "Körper"
    }
  },
  modalTenantApi: {
    title: {
      create: "API-Mandanten erstellen",
      edit: "Mandanten-API bearbeiten"
    },
    form: {
      apiToken: "API-Token",
      generateToken: "Token generieren"
    },
    notifications: {
      created: "Tenant-API erfolgreich erstellt!",
      updated: "Tenant-API erfolgreich aktualisiert!",
      error: "Fehler beim Speichern der Tenant-API."
    }
  },
  tenant: {
    metrics: {
      actions: "Metriken",
      title: "Metriken",
      total: "Gesamtbesucherzahl",
      pending: "Ausstehende Dienste",
      scheduled: "Geplante Termine",
      open: "Offene Termine",
      closed: "Geschlossene Termine",
      contacts: "Kontakte",
      tickets: "Leistungen",
      messages: "Nachrichten",
      sent: "Gesendete Nachrichten",
      received: "Empfangene Nachrichten",
      averageRating: "Durchschnittliche Bewertung",
      totalTickets: "Gesamtbesucherzahl",
      totalContacts: "Kontakte insgesamt",
      totalMessages: "Nachrichten insgesamt"
    },
    title: "Unternehmen",
    actions: {
      edit: "Firma bearbeiten",
      delete: "Firma löschen",
      calculateFiles: "Berechnen Sie die Dateigrößen Ihres Unternehmens",
      deleteFiles: "Firmendateien löschen",
      toggleHideUnoficial: "Inoffizielle deaktivieren"
    },
    columns: {
      id: "#",
      status: "Status",
      name: "Name",
      maxUsers: "Benutzerlimit",
      maxConnections: "Verbindungslimit",
      hideUnoficial: "Inoffizielle deaktivieren",
      asaas: "Flügel aktiv",
      asaasToken: "Flügel-Token",
      asaasCustomerId: "Kunden-ID Asaas",
      identity: "Identität",
      trial: "Prüfen",
      trialPeriod: "Testzeit",
      allowedChannels: "Erlaubte Kanäle",
      createdAt: "Datum",
      actions: "Aktionen"
    },
    modals: {
      asaasToken: {
        title: "Asaas-Token ändern",
        tokenLabel: "Flügel-Token",
        save: "Token speichern",
        cancel: "Stornieren"
      }
    },
    notifications: {
      tenantDeleted: "Mandant {id} erfolgreich gelöscht!",
      tenantUpdated: "Mandant {id} erfolgreich aktualisiert!",
      filesSize: "Dateigröße: {size} MB",
      deleteFiles: "Dateien erfolgreich gelöscht!",
      deleteError: "Fehler beim Löschen der Dateien."
    },
    confirmation: {
      irreversibleAction: "Achtung: Dies ist eine irreversible Aktion!",
      deleteTenant: "Möchten Sie das Unternehmen {id} wirklich löschen?",
      deleteFiles: "Möchten Sie wirklich alle Dateien für das Unternehmen {id} löschen?"
    },
    hideUnoficial: {
      updated: "Mandant {id} erfolgreich aktualisiert!",
      updateError: "Fehler beim Aktualisieren des Mandanten {id}!"
    },
    asaasToken: {
      updated: "Asaas-Token erfolgreich aktualisiert!",
      updateError: "Fehler beim Aktualisieren des Asaas-Tokens!"
    },
    calcular: {
      size: "Dateigröße: {size} MB",
      error: "Fehler beim Berechnen der Dateigröße"
    },
    limpar: {
      title: "Achtung: Dies ist eine irreversible Aktion!",
      confirmMessage: "Möchten Sie wirklich alle Dateien für das Unternehmen {id} löschen?",
      success: "Tenant {id}-Dateien erfolgreich gelöscht!",
      error: "Fehler beim Bereinigen der Mieterdateien!"
    },
    status: {
      active: "Aktiv",
      inactive: "Inaktiv"
    },
    asaas: {
      enabled: "Aktiv",
      disabled: "Inaktiv"
    },
    trial: {
      enabled: "Aktiv",
      disabled: "Inaktiv"
    },
    channels: {
      none: "Keine"
    },
    list: {
      error: "Fehler beim Auflisten der Mieter"
    },
    create: {
      success: "Mandant {name} erfolgreich erstellt!"
    },
    delete: {
      protected: "Mandant {id} kann nicht gelöscht werden!",
      success: "Mandant {id} erfolgreich gelöscht!",
      error: "Fehler beim Löschen des Mandanten: {error}"
    }
  },
  provedorGlobal: {
    title: "Globale Anbieter",
    allTenants: "Alle Mandanten",
    noTenants: "Keine Mandanten",
    filters: {
      providerType: "Anbietertyp",
      status: "Status"
    },
    status: {
      active: "Aktiv",
      inactive: "Inaktiv"
    },
    columns: {
      id: "#",
      name: "Name",
      providerType: "Typ",
      host: "Host",
      token: "Token",
      status: "Status",
      isGlobal: "Global",
      tenants: "Mandanten",
      actions: "Aktionen"
    },
    actions: {
      edit: "Bearbeiten",
      delete: "Löschen",
      manageTenants: "Mandanten verwalten"
    },
    form: {
      name: "Name",
      nameRequired: "Name ist erforderlich",
      providerType: "Anbietertyp",
      providerTypeRequired: "Anbietertyp ist erforderlich",
      host: "Host",
      hostRequired: "Host ist erforderlich",
      hostLocked: "Der Host wird automatisch für diesen Anbietertyp festgelegt",
      metaAlwaysGlobal: "Meta-Typen (WABA, Instagram, Messenger) sind immer global und können keine spezifischen Mandanten haben",
      token: "Token",
      tokenRequired: "Token ist erforderlich",
      status: "Status",
      isGlobal: "Für alle Mandanten verfügbar",
      description: "Beschreibung",
      groqCloudSection: "GroqCloud-Konfiguration",
      groqCloudEnabled: "GroqCloud aktiviert",
      groqCloudDisabled: "GroqCloud deaktiviert",
      groqCloudApiKey: "GroqCloud API-Schlüssel",
      groqCloudLanguage: "GroqCloud-Sprache",
      groqCloudModel: "GroqCloud-Modell",
      groqCloudAlwaysGlobal: "GroqCloud ist immer global und kann keine spezifischen Mandanten haben"
    },
    modal: {
      createTitle: "Globalen Anbieter erstellen",
      editTitle: "Globalen Anbieter bearbeiten"
    },
    tenantsModal: {
      title: "Mandanten verwalten",
      globalInfo: "Diese Konfiguration ist für alle Mandanten verfügbar (Global).",
      selectTenant: "Mandant auswählen",
      add: "Mandant hinzufügen",
      addSuccess: "Mandant erfolgreich hinzugefügt!",
      addError: "Fehler beim Hinzufügen des Mandanten",
      removeConfirm: "Möchten Sie diesen Mandanten wirklich entfernen?",
      removeSuccess: "Mandant erfolgreich entfernt!",
      removeError: "Fehler beim Entfernen des Mandanten"
    },
    success: {
      created: "Globaler Anbieter erfolgreich erstellt!",
      updated: "Globaler Anbieter erfolgreich aktualisiert!"
    },
    errors: {
      listError: "Fehler beim Auflisten der globalen Anbieter",
      saveError: "Fehler beim Speichern des globalen Anbieters",
      metaTypeAlreadyExists: "Ein globaler Anbieter vom Typ {type} existiert bereits. Nur ein Anbieter jedes Meta-Typs ist erlaubt."
    },
    delete: {
      confirm: "Möchten Sie den globalen Anbieter {name} wirklich löschen?",
      success: "Globaler Anbieter erfolgreich gelöscht!",
      error: "Fehler beim Löschen des globalen Anbieters"
    }
  },
  modalTenant: {
    visibleMenu: {
      title: "Sichtbare Menüs",
      grupos: "Gruppen",
      disparoMassa: "Massenerschießung",
      kanban: "Kanban und Funnel",
      tarefas: "Aufgaben",
      api: "API",
      chatbot: "Chatbot",
      relatorios: "Berichte",
      campanhas: "Kampagnen",
      chat: "Chat",
      equipes: "Teams"
    },
    title: {
      create: "Mandanten erstellen",
      edit: "Mandanten bearbeiten"
    },
    fields: {
      status: "Status",
      name: "Name",
      maxUsers: "Benutzerlimit",
      maxConnections: "Verbindungslimit",
      identity: "Identität",
      asaasToken: "Flügel-Token",
      asaasCustomerId: "Kunden-ID Asaas",
      trialPeriod: "Probezeit"
    },
    trial: {
      title: "Versuch",
      enabled: "Aktive Testversion",
      disabled: "Inaktive Testversion",
      warning: "Achtung: Bei Aktivierung der Testversion werden die Daten des Unternehmens nach Ablauf der Testphase aus dem System gelöscht."
    },
    asaas: {
      title: "Flügel",
      enabled: "Flügel aktiv",
      disabled: "Flügel inaktiv"
    },
    allowedChannels: {
      title: "Erlaubte Kanäle"
    },
    validation: {
      requiredFields: "Füllen Sie alle erforderlichen Felder aus und aktivieren Sie das Unternehmen.",
      cannotDeactivateMain: "Firma 1 kann nicht deaktiviert werden!"
    },
    notifications: {
      created: "Mandant erfolgreich erstellt!",
      updated: "Mieter erfolgreich bearbeitet!",
      error: "Beim Speichern des Mandanten ist ein Fehler aufgetreten."
    }
  },
  tenantsPk: {
    titles: {
      environmentVariables: "Umgebungsvariablen",
      packageJsonData: "JSON-Paketdaten"
    },
    labels: {
      key: "Schlüssel",
      value: "Wert"
    },
    errors: {
      loadEnvData: "Fehler beim Laden der Umgebungsvariablendaten",
      loadPackageData: "Fehler beim Laden der JSON-Paketdaten"
    }
  },
  appWaba: {
    title: 'App WABA Einstellungen',
    tenant: 'Tenant',
    appId: 'App ID',
    apiVersion: 'API Version',
    description: 'Beschreibung',
    token: 'Token',
    tokenHint: 'Business Manager Token zum Erstellen von WABA-Kanälen',
    configId: 'Konfigurations-ID (Eingebettete Registrierung)',
    configIdHint: 'Konfigurations-ID der Eingebetteten Registrierung für WhatsApp Business',
    appSecret: 'App Secret',
    appSecretHint: 'Facebook App Secret für OAuth-Code-Austausch',
    redirectUri: 'Redirect URI',
    redirectUriHint: 'OAuth-Weiterleitungs-URI (muss genau mit der im Facebook App Dashboard konfigurierten übereinstimmen)',
    status: 'Status',
    isActive: 'Aktiv',
    active: 'Aktiv',
    inactive: 'Inaktiv',
    create: 'Konfiguration erstellen',
    edit: 'Konfiguration bearbeiten',
    created: 'Konfiguration erfolgreich erstellt!',
    updated: 'Konfiguration erfolgreich aktualisiert!',
    deleted: 'Konfiguration erfolgreich gelöscht!',
    deleteConfirm: 'Sind Sie sicher, dass Sie die Konfiguration #{id} löschen möchten?',
    error: 'Fehler beim Verarbeiten der Konfiguration',
    deleteError: 'Fehler beim Löschen der Konfiguration',
    listError: 'Fehler beim Auflisten der Konfigurationen',
    copyTooltip: 'In die Zwischenablage kopieren',
    copySuccess: 'Weiterleitungs-URL in die Zwischenablage kopiert!',
    copyError: 'Kopieren in die Zwischenablage nicht möglich. Bitte manuell kopieren!',
    instagramSettings: 'Instagram-Einstellungen',
    appInstagramId: 'Instagram App ID',
    appInstagramIdHint: 'Instagram-Anwendungs-ID (Instagram App ID)',
    appInstagramSecret: 'Instagram App Secret',
    appInstagramSecretHint: 'Instagram App Secret für OAuth-Code-Austausch',
    redirectUriInstagram: 'Instagram Redirect URI',
    redirectUriInstagramHint: 'Instagram OAuth-Weiterleitungs-URI (muss genau mit der im Instagram App Dashboard konfigurierten übereinstimmen)',
    facebookSettings: 'Facebook-Einstellungen',
    redirectUriFacebook: 'Facebook Redirect URI',
    redirectUriFacebookHint: 'Facebook OAuth-Weiterleitungs-URI (muss genau mit der im Facebook App Dashboard konfigurierten übereinstimmen)'
  },
  tenantQueue: {
    title: "Aufgabenwarteschlangen",
    updateQueues: "Aktualisierungswarteschlangen",
    openBullBoard: "Offenes Bullenbrett",
    restartBackend: "Backend neu starten",
    restartQueues: "Warteschlangen zurücksetzen",
    queuesUpdated: "Warteschlangen werden alle 10 Sekunden aktualisiert",
    refreshQueue: "Warteschlange erneut verarbeiten",
    columns: {
      queueName: "Warteschlangenname",
      failedCount: "Fehlgeschlagene Jobs",
      activeCount: "Aktive Jobs",
      waitingCount: "Jobs warten",
      actions: "Aktionen"
    },
    dialogs: {
      restartBackendTitle: "Aufmerksamkeit!! Möchten Sie Ihr Backend wirklich neu starten?",
      restartBackendMessage: "Dieser Vorgang startet alle Dienste neu und sollte nur durchgeführt werden, wenn Sie Zugriff auf den Server haben, um mögliche Inkonsistenzen zu beheben.",
      restartQueuesTitle: "Aufmerksamkeit!! Möchten Sie die Warteschlangen wirklich zurücksetzen?",
      restartQueuesMessage: "Wird nur ausgeführt, wenn Warteschlangen mit vielen Jobs auf BullBoard hängen bleiben. Dieser Vorgang startet alle Bull-Warteschlangen neu und sollte maximal fünfmal ausgeführt werden, ohne das Backend neu zu starten. Starten Sie nach Erreichen dieses Limits das Backend neu, um die zusätzlichen Verbindungen zu Redis zu bereinigen."
    },
    notifications: {
      bullBoardRedirect: "Benutzer: admin<br> Passwort: Verwenden Sie Ihr Redis-Passwort<br> Sie werden in 3 Sekunden weitergeleitet"
    }
  },
  terminal: {
    title: "Terminal",
    placeholder: "Geben Sie hier Ihren Befehl ein ...",
    sendButton: "Senden",
    noOutput: "Keine Ausgabe empfangen",
    error: "Fehler: ",
    userNotAllowed: "Der Benutzer hat keine Berechtigung, auf das Terminal zuzugreifen"
  },
  usuarios: {
    title: "Benutzer",
    placeholder: "Lokalisieren",
    add: "Hinzufügen",
    email: "E-Mail",
    queues: "Warteschlangen",
    whatsappAllowed: "Anschlüsse",
    isOnline: "Status",
    profile: "Profil",
    actions: "Aktionen",
    blockWavoip: "Wavoip blockieren",
    restrictedUser: "Eingeschränkter Benutzer",
    modals: {
      userManagement: "Benutzerwarteschlangenverwaltung",
      whatsappManagement: "Benutzerverbindungsverwaltung",
      deleteConfirmation: "Aufmerksamkeit!! Möchten Sie den Benutzer „{name}“ wirklich löschen?"
    },
    notifications: {
      userDeleted: "Benutzer {name} gelöscht!",
      deleteError: "Benutzer kann nicht gelöscht werden.",
      error: "Fehler beim Laden weiterer Benutzer",
      changeStatusInToolbar: "Der Status des angemeldeten Benutzers kann nicht geändert werden. Nutzen Sie die Option im Profil, oben rechts.",
      status1: "Benutzerstatus",
      statusOnline: "Online: Benutzer verfügbar",
      statusOffline: "Offline: Benutzer nicht verfügbar",
      statusReload: "Um die Änderung im Frontend zu überprüfen, muss der Benutzer die Seite neu laden"
    },
    profiles: {
      user: "Benutzer",
      super: "Aufsicht",
      admin: "Administrator",
      superadmin: "Superadministrator"
    }
  },
  modalFilaUsuario: {
    title: "Benutzerwarteschlangen",
    name: "Name",
    email: "E-Mail",
    inactive: "(Inaktiv)",
    successMessage: "Benutzerwarteschlangen erfolgreich bearbeitet!"
  },
  modalUsuario: {
    sipConfigInfo: "SIP-Konfiguration (Asterisk, FreeSWITCH, PBX, andere.)",
    sipWebRTCInfo: "Ihre Erweiterung muss WebRTC unterstützen",
    sipWSSInfo: "Ihre Erweiterung muss WSS (WebSocket Secure) unterstützen.",
    horarioAtendimento: "Öffnungszeiten",
    configSip: "SIP-Konfiguration",
    sipEnabled: "SIP aktivieren",
    sipUser: "SIP-Benutzer",
    sipPassword: "SIP-Passwort",
    sipServer: "SIP-Server",
    sipPort: "SIP-Port",
    emailAlreadyExists: "Fehler bei der Registrierung: ",
    titleEdit: "Benutzer bearbeiten",
    name: "Name",
    email: "E-Mail",
    password: "Passwort",
    profile: "Profil",
    blockWavoip: "Wavoip blockieren",
    visibleMenu: "Sichtbare Menüs",
    massa: "Massenmailings",
    grupo: "Gruppen",
    chatprivado: "Privater Chat",
    kanban: "Kanban und Funnel",
    tarefas: "Aufgaben",
    sessoes: "Kanäle",
    relatorios: "Berichte",
    filas: "Warteschlangen",
    equipes: "Teams",
    mensagensrapidas: "Schnellnachrichten",
    chatflow: "Chatbot",
    agendamentos: "Termine",
    aniversarios: "Geburtstage",
    fechamento: "Schließen",
    etiquetas: "Schlagwörter",
    notas: "Hinweise",
    protocolos: "Protokolle",
    avaliacoes: "Bewertungen",
    campanhas: "Kampagnen",
    blockWavoipHint: "Wenn Sie die Änderung in Wavoip anwenden, müssen Sie den Browser-Cache leeren (Strg+Umschalt+R).",
    restrictedUser: "Eingeschränkter Benutzer",
    restrictedUserDisabled: "Deaktiviert",
    restrictedUserEnabled: "Aktiviert",
    restrictedUserInfo: "Angewandte Einschränkungen, wenn aktiviert:",
    restrictedUserRestriction1: "Das Menü 'Kontakte' wird ausgeblendet",
    restrictedUserRestriction2: "Die Schaltfläche 'Ad-hoc-Gespräch starten' wird ausgeblendet",
    restrictedUserRestriction3: "Kontaktdaten werden nicht auf der Support-Seite geladen",
    restrictedUserRestriction4: "Der Kontaktname wird nur mit den ersten 5 Zeichen angezeigt",
    restrictedUserRestriction5: "Kontaktdetailfelder (Telefon, E-Mail, CPF usw.) werden ausgeblendet",
    restrictedUserRestriction6: "Die Schaltfläche zum Bearbeiten des Kontakts wird ausgeblendet",
    restrictedUserRestriction7: "Telefonieoptionen werden deaktiviert",
    restrictedUserRestriction8: "Das Profilbild hat einen Unschärfeeffekt (Blur)",
    restrictedUserRestriction9: "Die Optionen Weiterleiten und Zum Weiterleiten markieren in Nachrichten werden blockiert",
    successEdit: "Benutzer bearbeitet!",
    successCreate: "Vom Benutzer erstellt!",
    errorLimit: "Benutzerlimit erreicht.",
    errorValidation: "Hoppla! Auf Fehler prüfen...",
    tryAgain: "Erneut versuchen"
  },
  modalWhatsappUsuario: {
    title: "Benutzerverbindungen ",
    name: "Name",
    email: "E-Mail",
    successMessage: "Benutzerverbindungen erfolgreich bearbeitet!"
  },
  usuariosTenants: {
    title: "Benutzer",
    tenant: "Mieter",
    id: "AUSWEIS",
    name: "Name",
    email: "E-Mail",
    profile: "Profil",
    actions: "Aktionen",
    filterPlaceholder: "Lokalisieren",
    deleteConfirmation: {
      title: "Aufmerksamkeit!! Möchten Sie den Benutzer „{name}“ wirklich löschen?",
      successMessage: "Benutzer {name} erfolgreich gelöscht!",
      errorMessage: "Benutzer konnte nicht gelöscht werden"
    }
  },
  modalUsuariosTenants: {
    title: "Benutzer bearbeiten",
    tenantLabel: "Mieter",
    nameLabel: "Name",
    emailLabel: "E-Mail",
    passwordLabel: "Passwort",
    profileLabel: "Profil",
    saveSuccess: "Benutzer bearbeitet!",
    createSuccess: "Vom Benutzer erstellt!",
    validationError: "Hoppla! Auf Fehler prüfen...",
    userLimitError: "Benutzerlimit erreicht.",
    warning: "Wenn Sie Änderungen übernehmen, leeren Sie den Browser-Cache (Strg+Umschalt+R).",
    tryAgain: "Erneut versuchen"
  },
  wavoip: {
    title: "Linkliste",
    subTitle: "Geben Sie die E-Mail-Adresse und das Passwort Ihres Wavoip-Kontos ein",
    emailLabel: "E-Mail",
    passwordLabel: "Passwort",
    authorizeButton: "Autorisieren der Auflistung von Verbindungen",
    callsTitle: "Links",
    logsDownloaded: "Protokolle erfolgreich heruntergeladen!",
    confirmClear: "Möchten Sie die Protokolle wirklich löschen?",
    confirmClearMessage: "Diese Aktion kann nicht rückgängig gemacht werden.",
    logsCleared: "Protokolle erfolgreich bereinigt!",
    downloadLogs: "Protokolle herunterladen",
    clearLogs: "Protokolle löschen",
    logsTitle: "Protokolle",
    logsSubtitle: "Wavoip-Verbindungsprotokolle",
    eventSummary: "Veranstaltungszusammenfassung",
    connectEvents: "Verbindungsereignisse",
    incomingEvents: "Eintrittsereignisse",
    outgoingEvents: "Exit-Ereignisse",
    errorEvents: "Fehlerereignisse",
    offer: "Angeboten",
    terminate: "Geschlossen",
    devicesTitle: "Geräte",
    resetLogin: "Wavoip-Anmeldung zurücksetzen",
    action: "Aktion",
    error: "Fehler beim Authentifizieren oder Auflisten von Nachrichten",
    columns: {
      id: "AUSWEIS",
      caller: "Nummer",
      receiver: "Ziel",
      direction: "Richtung",
      duration: "Dauer",
      createdDate: "Datum",
      status: "Status",
      link: "Aktion"
    },
    columnsDevices: {
      id: "AUSWEIS",
      idUser: "Benutzer-ID",
      name: "Name",
      phone: "Nummer",
      token: "Zeichen",
      status: "Status"
    },
    direction: {
      outcoming: "Durchgeführt",
      incoming: "Erhalten"
    },
    status: {
      ended: "Geschlossen",
      rejected: "Abgelehnt"
    },
    resetMessage: "Wavoip-Anmeldung wird zurückgesetzt ...",
    tokensModal: {
      title: "Wavoip-Token - {name}",
      importantInfo: "Wichtige Informationen:",
      baileysInfo: "Für Baileys-Verbindungen verwendet das System automatisch die vorhandene Sitzung wieder.",
      otherApiInfo: "Für {type}-Verbindungen müssen Sie zwei QR-Codes lesen:",
      systemQrCode: "Der System-QR-Code (generiert beim Verbinden des Kanals)",
      wavoipQrCode: "Der Wavoip-QR-Code (verfügbar in diesem Modal, wenn getrennt)",
      note: "<strong>Hinweis:</strong> Der in diesem Modal verfügbare QR-Code ist der <strong>Wavoip</strong>-QR-Code.",
      tokenLabel: "Token {index}",
      disconnected: "Getrennt",
      disconnectedMessage: "Das Token ist nicht verbunden. Klicken Sie auf die Schaltfläche unten, um den <strong>Wavoip-QR-Code</strong> anzuzeigen.",
      rememberSystemQr: "<strong>Denken Sie daran:</strong> Sie müssen auch den System-QR-Code für diese Verbindung lesen.",
      openQrCodeButton: "Wavoip-QR-Code öffnen",
      connected: "Verbunden",
      connectedMessage: "Das Token ist verbunden und funktioniert normal.",
      checkStatusMessage: "Klicken Sie auf \"Status aktualisieren\", um den Status dieses Tokens zu überprüfen.",
      updateStatus: "Status aktualisieren",
      close: "Schließen",
      viewTokensTooltip: "Wavoip-Token anzeigen"
    }
  },
  error404: {
    title: "404",
    subtitle: "Ooooooops ... hier ist nichts ...",
    button: "Zurückgehen"
  },
  login: {
    welcome: "Melden Sie sich an",
    emailLabel: "E-Mail",
    passwordLabel: "Passwort",
    emailPlaceholder: "meine@@email.com",
    emailError: "Muss eine gültige E-Mail sein.",
    validateCaptcha: "Ziehen Sie den Schieberegler bis zum Ende, um Ihre Anmeldung freizugeben:",
    loginButton: "Zum Eintreten",
    loginLoading: "Eingabe...",
    forgotPassword: "Ich habe mein Passwort vergessen",
    integrateWith: "integrieren mit:",
    resetPasswordTitle: "Passwort wiederherstellen",
    resetPasswordLabel: "Geben Sie Ihre E-Mail ein",
    resetPasswordButton: "Senden",
    resetPasswordSuccess: "E-Mail zur Passwortwiederherstellung gesendet.",
    resetPasswordError: "Fehler beim Senden der E-Mail zur Kennwortwiederherstellung.",
    captchaValidationMessage: "CAPTCHA erfolgreich validiert!",
    captchaErrorMessage: "Bitte bestätigen Sie das CAPTCHA, bevor Sie fortfahren.",
    errorMessage: "Geben Sie Ihren Benutzernamen und Ihr Passwort korrekt ein.",
    validateEmailError: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    a2fCodeSent: "Zwei-Faktor-Authentifizierungscode gesendet",
    outOfServiceHours: "Außerhalb der Servicezeiten",
    invalidTenant: "Ungültiger Mandant",
    limitError: "Limitfehler",
    licenseErrorUser: "Lizenzfehler Benutzer",
    licenseDomainError: "Lizenzdomänenfehler",
    licenseErrorServer: "Lizenzfehler Server"
  },
  validateA2F: {
    title: "2FA-Code-Validierung",
    message: "Ein Authentifizierungscode wurde an Ihren {channel} gesendet.",
    codeLabel: "Authentifizierungscode",
    codePlaceholder: "Geben Sie den 6-stelligen Code ein",
    validateButton: "Code validieren",
    validating: "Wird validiert...",
    resendCode: "Code erneut senden",
    invalidCode: "Bitte geben Sie einen gültigen 6-stelligen Code ein",
    loginError: "Fehler beim Abschluss der Anmeldung",
    validationError: "Fehler bei der Code-Validierung",
    invalidCodeError: "Ungültiger Authentifizierungscode",
    expiredCodeError: "Authentifizierungscode abgelaufen. Bitte melden Sie sich erneut an.",
    invalidSessionError: "Ungültige oder abgelaufene Sitzung. Weiterleitung zur Anmeldung...",
    redirectingToLogin: "Weiterleitung zur Anmeldung...",
    codeResent: "Code erfolgreich erneut gesendet",
    resendError: "Fehler beim erneuten Senden des Codes",
    timeRemaining: "Verbleibende Zeit: {time}",
    codeExpired: "Code abgelaufen. Weiterleitung zur Anmeldung...",
    resendCooldown: "Warten Sie {seconds}s, um erneut zu senden",
    resendLimitError: "Warten Sie 1 Minute, bevor Sie den Code erneut senden"
  },
  configuracoesA2F: {
    enableA2F: "Zwei-Faktor-Authentifizierung aktivieren",
    enableA2FCaption: "Aktivieren Sie die Zwei-Faktor-Authentifizierung, um die Zugriffssicherheit zu erhöhen",
    channelLabel: "Versandkanal",
    whatsappLabel: "WhatsApp-Verbindung",
    wabaTemplateLabel: "WABA-Vorlage (AUTHENTICATION)",
    messageLabel: "Benutzerdefinierte Nachricht",
    messageHint: "Verwenden Sie {code}, um den Code automatisch einzufügen",
    infoText: "Der Code wird über {channel} gesendet, wenn der Benutzer sich anmeldet. Stellen Sie sicher, dass Benutzer eine registrierte Telefonnummer (für WhatsApp) oder eine gültige E-Mail (für E-Mail) haben.",
    templateListError: "Fehler beim Laden der WABA-Vorlagen",
    wabaMessageWarning: "Bei Verwendung von WABA wird der Template-Text verwendet. Die benutzerdefinierte Nachricht wird nicht angewendet.",
    emailSmtpConfigured: "Die in Einstellungen > SMTP definierten SMTP-Einstellungen werden verwendet.",
    emailSmtpNotConfigured: "Konfigurieren Sie SMTP in Einstellungen > SMTP, um 2FA-Codes per E-Mail zu senden.",
    smsProviderLabel: "SMS-Anbieter",
    smsInfo: "Konfigurieren Sie das Token des ausgewählten SMS-Anbieters in den Tenant-Einstellungen, um 2FA-Codes zu senden."
  },
  resetPassword: {
    title: "Passwort zurücksetzen",
    newPasswordPlaceholder: "Neues Passwort",
    confirmPasswordPlaceholder: "Passwort bestätigen",
    resetButtonLabel: "Zurücksetzen",
    loadingMessage: "Neudefinition...",
    successMessage: "Passwort erfolgreich zurückgesetzt!",
    errorMismatch: "Die Passwörter stimmen nicht überein.",
    errorMessage: "Fehler beim Zurücksetzen des Passworts."
  },
  signup: {
    title: "Erstellen Sie Ihr Konto!",
    namePlaceholder: "Name",
    cpfCnpjPlaceholder: "CPF/CNPJ",
    emailPlaceholder: "E-Mail",
    mobilePhonePlaceholder: "Handy",
    passwordPlaceholder: "Passwort",
    selectPlanPlaceholder: "Wählen Sie einen Plan",
    submitButtonLabel: "Benutzerkonto erstellen",
    cancelButtonLabel: "Login",
    loadingMessage: "Erstellen...",
    validations: {
      requiredFields: "Füllen Sie alle Felder aus!",
      invalidCpfCnpj: "Ungültiges CPF oder CNPJ.",
      invalidEmail: "Ungültige E-Mail-Adresse.",
      invalidPassword: "Das Passwort muss mindestens 7 Zeichen lang sein und Buchstaben, Zahlen und ein Sonderzeichen enthalten!",
      successMessage: "Client erfolgreich erstellt.",
      errorMessage: "Fehler beim Erstellen des Clients"
    },
    planLabel: "Wert: $ {value} - Verbindungen: {connections} - Benutzer: {users}"
  },
  atendimentoChat: {
    selectTicket: "Wählen Sie ein Ticket!",
    noResults: "Keine Ergebnisse :(",
    noMore: "Nichts mehr zu laden :)",
    forwardMessage: "Weiterleitungsnachricht",
    forwardHint: "Geben Sie mindestens zwei Buchstaben ein, um den Kontakt zu finden.",
    forwardLimit: "Es kann nur 1 Kontakt ausgewählt werden.",
    messageSent: "Nachricht erfolgreich gesendet!",
    messageFailed: "Nachricht kann nicht gesendet werden. Bitte versuchen Sie es erneut.",
    forwardMessages: "{count} von 10 Nachrichten zum Weiterleiten ausgewählt.",
    contactNotSelected: "Wählen Sie den Zielkontakt für die Nachrichten aus.",
    forwardToPrivateChat: "An privaten Chat weiterleiten",
    forwardToOtherChannel: "An anderen Kanal weiterleiten",
    selectPrivateChatUser: "Wählen Sie einen Benutzer aus",
    selectPrivateChatUserHint: "Tippen Sie, um nach einem Benutzer zu suchen",
    userNotSelected: "Wählen Sie einen Benutzer aus",
    messageNotSelected: "Nachricht nicht gefunden",
    messageSentToPrivateChat: "Nachricht an {name} weitergeleitet",
    forwardToOtherChannel: "An anderen Kanal weiterleiten",
    selectDestinationChannel: "Zielkanal auswählen",
    selectDestinationChannelHint: "Wählen Sie den Kanal aus, an den die Nachricht weitergeleitet wird",
    channelNotSelected: "Wählen Sie einen Kanal aus",
    channelNotFound: "Kanal nicht gefunden",
    messageSentToOtherChannel: "Nachricht an {name} auf Kanal {channel} weitergeleitet"
  },
  atendimentoChatdialogAgendamentoMensagem: {
    title: "Nachrichtenplanung",
    close: "Schließen"
  },
  atendimentoVcard: {
    contactTitle: "Kontakt: {name}",
    selectChannelMessage: "Wählen Sie den Kanal aus, um den Dienst zu starten.",
    startButton: "Start",
    attentionTitle: "Aufmerksamkeit",
    ongoingTicketMessage: "{name} hat einen laufenden Dienst (Dienst: {ticketId} – Warteschlange: {queueId}). Möchten Sie den Dienst öffnen?",
    adminOnlyMessage: "{name} hat einen laufenden Dienst. Nur ein Administrator kann Ihnen diesen Dienst zuweisen.",
    ongoingTicketError: "Token kann nicht aktualisiert werden",
    notifyTicketStarted: "Dienst gestartet - {name} – Ticket: {ticketId}"
  },
  atendimentoModalSMS: {
    title: "SMS senden",
    messageLabel: "SMS",
    selectServiceLabel: "Service auswählen",
    cancel: "Stornieren",
    send: "Senden",
    noServiceSelected: "Bitte wählen Sie eine Dienstleistung aus.",
    comteleSuccess: "Comtele: gesendet!",
    conectaSuccess: "ConectaStartup: gesendet!",
    livsonSuccess: "BHI: gesendet!",
    errorSending: "Fehler beim Senden der SMS: {error}"
  },
  atendimentoModalNovoTicket: {
    title: "Ticket erstellen",
    contactPlaceholder: "Kontakt finden",
    contactHint: "Geben Sie mindestens zwei Buchstaben ein, um den Kontakt zu finden.",
    addContact: "Kontakt hinzufügen",
    start: "Start",
    selectDestination: "Zielort auswählen:",
    queueDestination: "Zielwarteschlange",
    userDestination: "Zielbenutzer",
    ticketTransferred: "Ticket übertragen.",
    errorLoadingQueues: "Problem beim Laden der Warteschlangen",
    errorLoadingUsers: "Problem beim Laden der Benutzer",
    existingTicketMessage: "{name} hat einen laufenden Dienst (Dienst: {id} – Warteschlange: {queue}). Möchten Sie den Dienst öffnen?",
    noQueue: "keine Warteschlange",
    adminOnlyMessage: "{name} hat einen laufenden Dienst. Nur ein Administrator kann Ihnen diesen Dienst zuweisen.",
    confirmStart: "Kontakt: {name}. Wählen Sie den Kanal aus, um den Dienst zu starten.",
    contactCreated: "Kontakt erstellt!"
  },
  atendimentoMixinSockets: {
    tokenInvalid: "Ungültiges Token. Weiterleitung zur Anmeldeseite.",
    privateMessage: {
      update: "Neue private Nachricht erhalten.",
      unread: "Ungelesene private Nachricht erhalten.",
      notification: "Benachrichtigung über neue private Nachrichten."
    },
    onlineUsers: "Benutzer online überprüfen.",
    userOnline: "Der Benutzer ist online gegangen.",
    updateStatusUser: "Aktualisieren des Benutzerstatus.",
    newClient: "Neuer Client verbunden.",
    pendingCliente: "Neuer Kunde steht aus",
    client: "Kunde: "
  },
  atendimentomixinCommon: {
    note: "📝Hinweis:",
    transfer: "⏩ Überweisung: ",
    audio: "🔊Audio: ",
    buttonNotAvailable: "Diese Schaltfläche kann nur auf Mobilgeräten angeklickt werden",
    dateFormat: "tt/MM/jjjj"
  },
  atendimentoMixinAtualizar: {
    label: "Bewerten Sie diesen Service",
    rating: {
      0: "Schlecht",
      1: "Regulär",
      2: "Gut",
      3: "Sehr gut",
      4: "Exzellent",
      5: "Unglaublich"
    },
    notifications: {
      selecioneUmMotivo: "Wählen Sie einen Grund für die Schließung des Dienstes aus.",
      demandaSalva: "Anfrage erfolgreich gespeichert! Sie können den Dienst nun beenden.",
      erroSalvarDemanda: "Die Nachfrage konnte nicht gespeichert werden.",
      erroCarregarMotivos: "Gründe konnten nicht geladen werden.",
      forcarDemanda: "Um den Dienst abzuschließen, definieren Sie die Nachfrage.",
      iniciarAtendimento: "Dienst gestartet - {name} – Ticket: {id}",
      espiarAtendimento: "Spionage - {name} – Ticket: {id}",
      avaliacaoEnviada: "Bewertung an Support {id} gesendet. Die Durchführung der Dienstleistung erfolgt automatisch nach Absenden der Bewertung durch den Kunden.",
      avaliacaoErro: "Die Servicebewertung kann nicht gesendet werden.",
      ticketEncerrado: "Dienst geschlossen! (Ticket {id})",
      mensagemDespedida: "Die ausgewählte Nachricht wird gesendet und das Ticket wird innerhalb von 30 Sekunden geschlossen!",
      erroAtualizarStatus: "Der Dienststatus kann nicht aktualisiert werden.",
      atendimentoJaIniciado: "Der Dienst für diese Verbindung wurde bereits auf der Registerkarte „Offen/Ausstehend“ gestartet, oder bitten Sie den Administrator, in der Kontaktoption einen neuen Dienst zu öffnen.",
      atendimentoEncerrado: "Dienst geschlossen!",
      atendimentoIniciado: "Dienst gestartet!",
      retornadoFila: "Zurück in die Reihe!"
    },
    dialogs: {
      iniciar: "Der Dienst wird gestartet, ok?",
      retornarFila: "Zurück zur Warteschlange?",
      encerrar: "Dienst beenden?",
      encerrarForcado: "Dienst beenden? Ticket: {id}",
      mensagemCliente: "Möchten Sie das Ticket Nr. {ticketId} für den Kunden {customer} aktualisieren?",
      mensagemCliente2: "Möchten Sie diesen Dienst beenden?",
      ticketEncerrar: "Dienst beenden?"
    },
    titles: {
      iniciar: "Der Dienst wird gestartet, ok?",
      retornarFila: "Zur Warteschlange für ausstehende Aufgaben zurückkehren?",
      encerrar: "Dienst beenden?",
      encerrarAtendimento: "Dienst beenden?",
      encerrarForcado: "Dienst beenden? Ticket: {id}"
    },
    evaluation: "Bewertung gesendet"
  },
  atendimentoMensagemRespondida: {
    labels: {
      mensagemApagada: "Nachricht gelöscht am {date}.",
      baixarContato: "Download Kontakt",
      baixarArquivo: "Herunterladen: {filename}",
      visualizarPDF: "Sicht",
      audioInacessivel: "Audio nicht verfügbar",
      grupoNome: "Gruppe: {GroupName}",
      contatoNome: "Kontakt: {contactName}"
    },
    errors: {
      erroMensagem: "Fehler bei der Verarbeitung der Nachricht.",
      erroAudio: "Fehler beim Laden des Audios.",
      erroDownload: "Fehler beim Herunterladen der Datei."
    }
  },
  atendimentoMensagemChat: {
    noName: "Kein Name",
    system: "System",
    labels: {
      atencao: "Aufmerksamkeit!! Möchten Sie wirklich versuchen, diese Nachricht erneut zu senden?",
      processoReenvio: "Dieser Vorgang versucht, die ausstehende Nachricht im System erneut zu senden.",
      processoIniciado: "Prozess gestartet.",
      tentandoEnvio: "Es wird versucht, ausstehende Nachrichten zu senden.",
      erroEnvio: "Fehler beim Senden der Nachrichten: {error}",
      deletarAtencao: "Aufmerksamkeit!! Möchten Sie die Nachricht wirklich löschen?",
      deletarAviso: "Alte Nachrichten werden im Client nicht gelöscht.",
      deletarErro: "Nachricht kann nicht gelöscht werden.",
      mensagemSincronizada: "Synchronisierte Nachricht: {timingSync}",
      mensagemEditada: "Bearbeitet: {contentMessage}",
      mensagemApagada: "Nachricht gelöscht am {date}.",
      downloadContato: "Download Kontakt",
      baixarArquivo: "Herunterladen: {filename}",
      mensagemNaoEntregue: "Nachricht nicht zugestellt",
      mensagemAgendada: "Geplante Nachricht",
      enviadoCancelado: "Übermittlung abgebrochen: {date}",
      criadoEm: "Erstellt am: {date}",
      programadoPara: "Geplant für: {date}",
      facaDownload: "Laden Sie die Datei herunter",
      editarMensagem: "Nachricht bearbeiten"
    },
    errors: {
      erroAudio: "Fehler beim Laden des Audios.",
      erroMensagem: "Fehler bei der Verarbeitung der Nachricht.",
      erroDownload: "Fehler beim Herunterladen der Datei.",
      maximoMensagens: "Maximal 10 Nachrichten zulässig."
    },
    dialogs: {
      reenviarTitulo: "Nachricht erneut senden",
      reenviarMensagem: "Möchten Sie diese ausstehende Nachricht erneut senden?",
      deletarTitulo: "Nachricht löschen",
      deletarMensagem: "Möchten Sie diese Nachricht wirklich löschen? Alte Nachrichten werden im Client nicht gelöscht."
    },
    notifications:{
      tentandoEnviarMensagens: "Versuche, ausstehende Nachrichten zu senden.",
    }
  },
  atendimentoItemTicketPainel: {
    labels: {
      atender: "Treffen",
      espirar: "Spion",
      usuario: "Benutzer: {Benutzername}",
      canalRemovido: "Kanal entfernt",
      atendimentoResolvido: "Dienst behoben",
      chatbotAtendendo: "ChatBot-Bereitstellung",
      integracaoExterna: "Integration Externa",
      fila: "Warteschlange: {Warteschlangenname}",
      etiquetas: "Schlagwörter: {tags}",
      carteiras: "Geldbörsen: {wallets}",
      espiarAtendimento: "Dienst anzeigen: {idTicket}"
    },
    status: {
      aberto: "Offen",
      pendente: "Ausstehend",
      resolvido: "Gelöst"
    },
    errors: {
      erroInformacoes: "Fehler beim Abrufen von {typeInformation}: {error}"
    }
  },
  atendimentoItemTicket: {
    labels: {
      forceClose: "Force Close (kein Abschied/keine Bewertung/keine Nachfrage)",
      atender: "Treffen",
      atendimentoResolvido: "Dienst behoben",
      chatbotAtendendo: "ChatBot-Bereitstellung",
      integracaoExterna: "Integration Externa",
      forcarFechamento: "Force Close (kein Abschied/keine Bewertung/keine Nachfrage)",
      espiarAtendimento: "Spionagedienst: {id}",
      usuario: "Benutzer: {Benutzername}",
      etiquetas: "Stichworte:",
      kanban: "Kanban: {kanbanName}",
      semFoto: "Kanal entfernt",
      espiar: "Spion",
      fecharTicketSemDespedida: "Force Close (kein Abschied/keine Bewertung/keine Nachfrage)",
      rascunhoSalvo: "Entwurf gespeichert"
    },
    status: {
      aberto: "Offen",
      pendente: "Ausstehend",
      resolvido: "Gelöst"
    },
    errors: {
      erroInformacoes: "Fehler beim Abrufen von Informationen aus {typeInformation}: {error}",
      erroRemoverFoto: "Fehler beim Entfernen des Nullfotos: "
    },
    dialogs: {
      fecharTitulo: "Aufmerksamkeit",
      fecharMensagem: "Möchten Sie das Schließen des Tickets erzwingen?"
    },
    notifications: {
      aguardeEnvio: "Warten Sie, bis die Nachricht gesendet wurde, bevor Sie das Ticket wechseln"
    }
  },
  inputMensagem: {
    novo: {
      camposObrigatorios: "Bitte füllen Sie alle Felder aus, bevor Sie die Nachricht senden.",
      enviarLocalizacao: "Standort senden",
      latitude: "Breitengrad",
      longitude: "Längengrad",
      nomeLocal: "Ortsname",
      enderecoLocal: "Adresse des Ortes",
      localizacaoEnviada: "Standort erfolgreich gesendet!",
      erroEnviarLocalizacao: "Fehler beim Senden des Standorts",
      enviarCTAURL: "CTA-URL senden",
      enviarReplyButtons: "Antwortschaltflächen senden",
      enviarAddress: "Adresse senden",
      enviarLocationRequest: "Standortanfrage senden",
      enviarFlow: "Flow senden",
      enviarLocation: "Standort senden",
      sendLocation: "Standort senden",
      tipoDeHeader: "Header-Typ",
      texto: "Text",
      imagem: "Bild",
      video: "Video",
      documento: "Dokument",
      textoDoHeader: "Header-Text",
      urlDoHeader: "Header-URL",
      mensagem: "Nachricht",
      digiteSuaMensagem: "Geben Sie Ihre Nachricht ein",
      textoDoBotao: "Schaltflächentext",
      exemploTextoDoBotao: "Beispiel: Produkt ansehen",
      urlDoBotao: "Schaltflächen-URL",
      exemploUrlDoBotao: "https://exemplo.com",
      footeropt: "Fußzeile (optional)",
      textoDoFooter: "Fußzeilentext",
      flowIdopt: "Flow-ID (optional)",
      idDoFlow: "Flow-ID",
      flowNameopt: "Flow-Name (optional)",
      nomeDoFlow: "Flow-Name",
      flowCtaopt: "Flow-CTA *",
      textoDoCta: "CTA-Text",
      flowTokenopt: "Flow-Token (optional)",
      tokenDoFlow: "Flow-Token",
      flowAction: "Flow-Aktion",
      navegar: "Navigieren",
      trocaDeDados: "Datenaustausch",
      flowActionPayloadopt: "Flow-Aktions-Payload (optional)",
      tituloDoBotao: "Schaltflächentitel",
      rua1opt: "Straße 1 *",
      enderecoPrincipal: "Hauptadresse",
      rua2opt: "Straße 2 (optional)",
      complemento: "Zusatz",
      cidadeopt: "Stadt *",
      nomeDaCidade: "Stadtname",
      estadoopt: "Bundesland *",
      nomeDoEstado: "Name des Bundeslandes",
      cepopt: "PLZ *",
      cep: "00000-000",
      paisopt: "Land *",
      nomeDoPais: "Name des Landes",
      tipoDeEndereco: "Adresstyp",
      casa: "Haus",
      trabalho: "Arbeit",
      latitudeopt: "Breitengrad *",
      longitudeopt: "Längengrad *",
      nomeDaLocalizacaoopt: "Standortname (optional)",
      exemploNomeDaLocalizacao: "Beispiel: Einkaufszentrum",
      enderecoopt: "Adresse (optional)",
      enderecoCompleto: "Vollständige Adresse",
      enderecoEnviado: "Adresse erfolgreich gesendet!",
      localizacaoEnviada: "Standort erfolgreich gesendet!"
    },    
    labels: {
      mensagem: "Nachricht",
      codigoPais: "Landcode",
      numeroTelefone: "Telefonnummer",
      campoVazio: "Bitte füllen Sie alle Variablenfelder aus, bevor Sie die Vorlage senden.",
      vcardEnviado: "VCard erfolgreich gesendet!",
      telefoneContato: "Telefon",
      nomeContato: "Name",
      enviarContato: "Kontakt senden",
      nothingHere: "Achtung...hier ist nichts!",
      nothingHereDescription: "Es sind keine Kurznachrichten oder Anhänge anzuzeigen.",
      erroAnexar: "Fehler beim Anhängen der Datei",
      anexoEnviado: "Anhang erfolgreich gesendet!",
      selecioneArquivo: "Wählen Sie eine Datei aus",
      preview: "Vorschau",
      anexarArquivo: "Datei anhängen",
      caption: "Untertitel",
      emoji: "Emoji",
      templates: "Vorlagen",
      digiteMensagem: "Hier eingeben...",
      enviarArquivo: "Mehrere Dateien senden",
      enviarArquivoCaption: "Datei mit Beschriftung senden",
      enviarArquivoGaleria: "Datei aus Galerie senden",
      selecionarArquivoGaleria: "Datei aus Galerie auswählen",
      arquivoSelecionado: "Ausgewählte Datei",
      enviarFigurinha: "Sticker senden",
      enviarEmoji: "Emoji",
      enviarMensagem: "Nachricht senden",
      enviarAudio: "Audio senden",
      enviarLinkVideo: "Link zur Videokonferenz senden",
      enviarMarcacaoFantasma: "Ghost-Markup senden",
      enviarMarcacao: "Termin senden",
      enviarBotoes: "Senden-Schaltflächen",
      enviarListas: "Listen senden",
      enviarAgenteHumano: "Mit menschlichem Agenten senden",
      descricaoAgenteHumano: "Diese Nachricht wird mit dem HUMAN_AGENT-Tag gesendet, sodass Sie Nachrichten auch außerhalb des 24-Stunden-Fensters senden können (innerhalb von 7 Tagen).",
      mensagemObrigatoria: "Nachricht ist erforderlich",
      mensagemEnviada: "Nachricht erfolgreich gesendet!",
      enviarTemplate: "Vorlagen",
      removerMidiaMensagemRapida: "Medien aus der Kurznachricht entfernen",
      cancelarGravacao: "Aufnahme abbrechen",
      enviarGravacao: "Aufzeichnung senden",
      gravacaoIniciada: "Aufnahme gestartet",
      gravacaoParada: "Aufnahme gestoppt",
      mensagemRapida: "Schnellnachrichten",
      mensagemMarcacao: "Markup-Nachricht",
      mensagemMarcacaoFantasma: "Geistermarkierungsnachricht",
      videoGravacao: "Videoaufzeichnung",
      arquivo: "Datei: ",
      voz: "Stimme: ",
      semMidia: "Keine Medien",
      sim: "Ja",
      nao: "NEIN",
      dataHoraAgenda: "Termindatum/-uhrzeit",
      desativarAssinatura: "Abonnement deaktivieren",
      ativarAssinatura: "Abonnement aktivieren",
      selecioneParticipantes: "Teilnehmer auswählen",
      botao: "Taste",
      botao1: "Taste 1",
      botao2: "Taste 2",
      botao3: "Taste 3",
      header: "Kopfzeile",
      title: "Titel",
      footer: "Fußleiste",
      title1: "Spalte 1 Titel",
      title2: "Spalte 2 Titel",
      title3: "Spalte 3 Titel",
      title4: "Spalte 4 Titel",
      title5: "Spalte 5 Titel",
      description1: "Beschreibung Spalte 1",
      description2: "Beschreibung Spalte 2",
      description3: "Beschreibung Spalte 3",
      description4: "Beschreibung Spalte 4",
      description5: "Beschreibung Spalte 5",
      templateChoose: "Wählen Sie eine Vorlage",
      startRecord: "Aufnahme starten",
      stopRecord: "Aufnahme beenden",
      sendRecord: "Aufzeichnung senden",
      manipularGrupo: "Gruppe Verwalten",
      grupoSelecionado: "Ausgewählte Gruppe",
      send: "Senden",
      cancel: "Abbrechen",
      selectMarketingTemplate: "Wählen Sie eine Marketing-Vorlage zum Senden",
      selectTemplateMessenger: "Wählen Sie eine Vorlage zum Senden",
      templateCategory: "Vorlagenkategorie",
      marketing: "Marketing",
      utility: "Utility",
      templateName: "Vorlagenname",
      enterTemplateName: "Geben Sie den Namen der Utility-Vorlage ein",
      utilityTemplateInfo: "Utility-Vorlagen werden innerhalb des 24-Stunden-Fensters nach der letzten Nachricht des Benutzers gesendet.",
      noTitle: "Kein Titel",
      status: "Status",
      token: "Token",
      nextSend: "Nächster Versand",
      whatsappNotFound: "WhatsApp-Kanal nicht gefunden",
      errorLoadingTemplates: "Fehler beim Laden der Vorlagen",
      selectTemplate: "Wählen Sie eine Vorlage",
      pageIdNotFound: "Page ID nicht gefunden",
      tokenNotFound: "Benachrichtigungstoken nicht gefunden",
      templateSent: "Vorlage erfolgreich gesendet",
      errorSendingTemplate: "Fehler beim Senden der Vorlage",
    },
    grupo: {
      alterarTitulo: "Titel Ändern",
      alterarDescricao: "Beschreibung Ändern",
      alterarImagemUrl: "Bild Ändern (URL)",
      alterarImagemUpload: "Bild Ändern (Upload)",
      alterarPermissao: "Berechtigung Ändern",
      promoverAdmin: "Zu Admin Befördern",
      demoverAdmin: "Von Admin Abberufen",
      adicionarParticipante: "Teilnehmer Hinzufügen",
      removerParticipante: "Teilnehmer Entfernen",
      listarParticipantes: "Teilnehmer Auflisten",
      gerenciarUsuarios: "Benutzer Verwalten",
      participantes: "Teilnehmer",
      novoTitulo: "Neuer Titel",
      novaDescricao: "Neue Beschreibung",
      novaImagemUrl: "Neue Bild-URL",
      novaImagemArquivo: "Neues Bild (Datei)",
      adminOnly: "Nur Administratoren",
      numerosParticipantes: "Teilnehmernummern",
      executar: "Aktionen Ausführen"
    },
    dialogs: {
      confirmarEnvio: "Senden bestätigen: Eingeben",
      cancelarEnvio: "Abbrechen: ESC"
    },
    errors: {
      arquivoRejeitado: "Datei aufgrund inkompatibler Größe oder Typs abgelehnt.",
      gravacaoErro: "Fehler beim Aufzeichnen des Videos oder Audios."
    },
    error: {
      vcardErro: "Fehler beim Senden der VCard!",
      erroEnviarVcard: "Fehler beim Senden der VCard!",
    },
    success: {
      vcardEnviado: "VCard erfolgreich gesendet!",
    },
    wabaErrors: {
      title: "Fehler beim Validieren von Datei(en) für WABA",
      invalidFileType: "Dateityp wird für WABA nicht unterstützt: {fileName}",
      invalidFileTypeWithExtensions: "Dateityp wird für WABA nicht unterstützt: {fileName}. Erlaubte Erweiterungen: {extensions}",
      fileSizeExceeded: "Die Datei {fileName} überschreitet die maximal zulässige Größe",
      fileSizeExceededDetail: "{fileName} überschreitet die maximal zulässige Größe ({maxSize} MB). Datei: {fileSize} MB"
    }      
  },
  atendimentoInputScript: {
    pendingMessageSended: "Bitte warten... Nachricht wird gesendet",
    micPermissionDenied: "Mikrofonberechtigung verweigert",
    scheduleError: "Um eine Nachricht zu planen, geben Sie das Datum/die Uhrzeit der Planung in das Feld ein.",
    sendMessage: "Nachricht senden",
    scheduleMessage: "Nachricht planen",
    recordAudio: "Audio aufnehmen",
    stopRecording: "Aufnahme beenden",
    cancelRecording: "Aufnahme abbrechen",
    startRecording: "Aufnahme starten",
    prepareMedia: "Medien für den Versand vorbereiten",
    invalidFile: "Ungültige Datei!",
    fileAcceptedFormats: "Akzeptierte Formate: {formats}",
    sendingMessage: "Nachricht wird gesendet...",
    errorSendingMessage: "Fehler beim Senden der Nachricht",
    invalidMessage: "Ungültige Nachricht",
    customSchedule: "Benutzerdefinierte Planung",
    in30Minutes: "In 30 Minuten",
    tomorrow: "Morgen",
    nextWeeks: "Nächste Woche",
    uploadFile: "Datei senden",
    attachFile: "Datei anhängen",
    previewImage: "Bild anzeigen",
    dragFileHere: "Datei hierher ziehen",
    selectAll: "Alles auswählen",
    schedulePlaceholder: "Geben Sie das Feld „Datum/Uhrzeit des Termins“ ein",
    videoRecordingError: "Fehler beim Starten der Videoaufzeichnung",
    audioRecordingError: "Fehler beim Starten der Audioaufnahme",
    filePreviewError: "Fehler beim Laden der Dateivorschau",
    messageScheduled: "Nachricht erfolgreich geplant",
    messageError: "Fehler bei der Verarbeitung der Nachricht",
    headerUrl: "Header-URL",
    namedVariable: "Variablenwert",
    templateSuccess: "Vorlage erfolgreich gesendet",
    templateError: "Fehler beim Senden der Vorlage",
    ghostMessageSuccess: "Ghost-Tag-Nachricht erfolgreich gesendet",
    ghostMessageError: "Fehler beim Senden der Ghost-Tag-Nachricht",
    mentionAllSuccess: "Buchungsnachricht erfolgreich gesendet",
    mentionAllError: "Fehler beim Senden der Tag-Nachricht",
    previewTitle: "Bild senden an {contactName}",
    noFilesToSend: "Keine Dateien zum Hochladen",
    emptyMessageError: "Nicht vorhandene Nachricht",
    multipleQuickMessagesError: "Mehrere Kurznachrichten gefunden. Wählen Sie einen aus oder geben Sie einen eindeutigen Schlüssel aus der Nachricht ein",
    noQuickMessageFoundError: "/ zeigt an, dass Sie eine kurze Nachricht senden möchten, aber keine gefunden wurde. Registrieren oder löschen Sie den / und geben Sie Ihre Nachricht ein.",
    dataMessage: "Bitte geben Sie die zu sendenden Daten ein",
    messageValidationError: "Die Nachricht muss zwischen 1 und 60 Zeichen lang sein.",
    buttonValidationError: "Die Schaltfläche darf maximal 20 Zeichen lang sein.",
    duplicateButtonError: "Schaltflächen dürfen keine wiederholten Werte haben.",
    missingFieldsError: "Bitte geben Sie die zu übermittelnden Daten ein."
  },
  atendimentoInfoCabecalho: {
    pauseAttendance: "Betreuung pausieren",
    resumeAttendance: "Betreuung fortsetzen",
    attendancePaused: "Betreuung wurde erfolgreich pausiert",
    attendanceResumed: "Betreuung wurde erfolgreich fortgesetzt",
    pauseError: "Fehler beim Steuern der Betreuungspause",
    menuAction: "Menüaktion",
    contactInfo: "Kontaktinformationen",
    assignedTo: "Zugeschrieben an:",
    ticketNumber: "Losnummer:",
    reopenTicket: "Ticket erneut öffnen",
    messageScheduling: "Nachrichtenplanung",
    returnToQueue: "Ticket zur Warteschlange zurückgeben",
    resolveTicket: "Lösen",
    transfer: "Überweisen",
    chatbot: "Chatbot",
    channel: "Kanal",
    channels: "Kanäle",
    resolve: "Lösen",
    reopenCall: "Wavoip-Anruf erneut öffnen",
    scheduleMessage: "Nachricht planen",
    actions: "Aktionen",
    selectDestination: "Zielort auswählen:",
    ticket: "Ticket",
    destinationQueue: "Zielwarteschlange",
    destinationUser: "Zielbenutzer",
    destinationChatbot: "Ziel-Chatbot",
    destinationChannel: "Zielkanal",
    selectDestinationQueue: "Wählen Sie die Zielwarteschlange aus",
    alreadyAssigned: "Das Ticket gehört bereits dem ausgewählten Benutzer.",
    alreadyAssignedToYou: "Das Ticket gehört bereits seinem Benutzer.",
    alreadyInQueueAndUser: "Das Ticket gehört bereits zu dieser Warteschlange und diesem Benutzer.",
    transferredToChatbot: "Ticket an Chatbot weitergeleitet",
    transferredToChannel: "Ticket an Kanal übertragen",
    transferredToQueue: "Ticket übertragen.",
    loadingQueuesError: "Problem beim Laden der Warteschlangen",
    loadingUsersError: "Problem beim Laden der Benutzer",
    loadingChatbotsError: "Problem beim Laden der Chatbots",
    loadingChannelsError: "Problem beim Laden der Kanäle",
    ticketOpen: "Offen",
    ticketClosed: "Geschlossen",
    transferError: "Übertragung nicht möglich",
    checkTicketError: "Für diesen Kontakt gibt es bereits ein offenes/ausstehendes Ticket.",
    searchInConversation: "In Konversation suchen",
    searchPlaceholder: "Geben Sie einen Suchbegriff ein",
    noMessagesFound: "Keine Nachrichten gefunden",
    groupUsers: "Gruppenbenutzer",
    selectUsersForGroup: "Wählen Sie die Benutzer aus, die Zugriff auf dieses Gruppenticket haben",
    groupUsersUpdated: "Gruppenbenutzer erfolgreich aktualisiert",
    mediaLinksDocs: "Medien, Links und Dokumente",
    mediaTab: "Medien",
    linksTab: "Links",
    docsTab: "Dokumente",
    loadingMediaLinksDocs: "Medien, Links und Dokumente werden geladen...",
    errorUpdatingGroupUsers: "Fehler beim Aktualisieren der Gruppenbenutzer",
    autoScroll: "Automatisches Scrollen",
    autoScrollDescription: "Deaktiviert das automatische Scrollen, wenn neue Nachrichten eintreffen",
    autoScrollEnabled: "Automatisches Scrollen aktiviert",
    autoScrollDisabled: "Automatisches Scrollen deaktiviert"
  },
  generalSupport: {
    selectWavoip: "Wählen Sie WhatsApp aus, um den Anruf zu tätigen",
    looginForWarning1: "Während der Suche werden Tickets nicht aktualisiert!",
    looginForWarning2: "Zum Aktualisieren das Feld löschen ...",
    lookingFor: "Suche nach ID, Name oder Nummer ...",
    closingForecast: "Schlussprognose",
    status: "Status",
    createdAt: "Erstellt in",
    opportunities: "Protokolle",
    funil: "Trichter",
    ticketFunil: "Schritt im Trichter erstellen",
    privateChat: "Privat",
    groupChat: "Gruppe",
    searchMessage: "Suchnachricht",
    searchTicket: "Hilfe suchen",
    notes: "Hinweise",
    number: "Nummer",
    message: "Nachricht",
    placeholderNumber: "+DDI (DDD) 99999 9999",
    hintNumber: "Wenn im System eine aktive WABA-Verbindung besteht, müssen Sie die genaue WhatsApp-Kontonummer eingeben.",
    ticketNotes: "Servicehinweise",
    evaluation: "Bewertung",
    ticketEvaluation: "Servicebewertung",
    markasNoRead: "Als ungelesen markieren",
    markasRead: "Als gelesen markieren",
    businessName: "Name der Firma",
    lastName: "Nachname",
    firstName: "Vorname",
    profile: "Profil",
    logout: "Ausgehen",
    activate: "Aktivieren",
    deactivate: "Deaktivieren",
    toggleDarkMode: "Dunkler Modus",
    viewTickets: "Tickets ansehen",
    includeClosedTickets: "Geschlossene Tickets einschließen",
    returnMenu: "Zurück zum Menü",
    taskCreate: "Aufgabe erstellen",
    inernalChat: "Interner Chat",
    privateChats: "Private Gespräche",
    groupChats: "Gruppenchats",
    advancedFilter: "Erweiterter Filter",
    filterByQueues: "Warteschlangen",
    filterByConnections: "Verbindung ",
    filterByUser: "Benutzer ",
    filterByTags: "Tags ",
    filterByKanban: "Kanban ",
    openTickets: "Offen",
    pendingTickets: "Ausstehend",
    resolvedTickets: "Gelöst",
    unreadTicketsOnly: "Nur Tickets mit ungelesenen Nachrichten",
    advancedFilterNotice: "Bei der Verwendung der Filter müssen Sie oben auf die Schaltfläche „Weitere Dienste laden“ klicken.",
    scheduleMessages: "Geplante Nachrichten",
    scheduledFor: "Geplant für:",
    extractConversations: "Konversationen extrahieren",
    downloadPDF: "PDF-Datei herunterladen",
    difyDescription: "Wenn aktiv, verbraucht das System Dify",
    lmDescription: "Wenn aktiv, verbraucht das System LM Studio",
    grokDescription: "Wenn es aktiv ist, verbraucht das System Grok",
    geminiDescription: "Wenn das System aktiv ist, verbraucht es Gemini",
    deepseekDescription: "Wenn aktiv, verbraucht das System Deepseek",
    qwenDescription: "Wenn es aktiv ist, verbraucht das System Qwen",
    claudeDescription: "Wenn das System aktiv ist, verbraucht es Claude",
    ollamaDescription: "Wenn es aktiv ist, verbraucht das System Ollama",
    clearKanban: "Kanban löschen",
    reason: "Nachfrage",
    clearReason: "Klare Nachfrage",
    value: "Wert",
    blockContact: "Kontakt blockieren",
    blockChatbot: "Chatbot blockieren",
    tags: "Schlagwörter",
    kanban: "Kanban",
    chatgptDescription: "Wenn aktiv, verbraucht das System ChatGPT",
    dialogflowDescription: "Wenn aktiv, verwendet das System den DialogFlow",
    typebotDescription: "Wenn aktiv, verbraucht das System Typebot",
    n8nescription: "Wenn aktiv, verbraucht das System N8N",
    private: "Privat",
    groups: "Gruppen",
    chatbot: "Chatbot",
    n8nDescription: "Wenn aktiv, verbraucht das System N8N",
    contacts: "Kontakte",
    openWavoip: "Öffnen Sie Wavoip",
    startNew: "Einzelgespräch starten",
    loadMore: "Weitere Anrufe laden",
    reverseOrder: "Ticketreihenfolge umkehren",
    sortByAnswered: "Nach Nicht beantwortet sortieren",
    protocol: "Protokoll",
    ticketProtocol: "Serviceprotokoll",
    syncHistory: "Synchronisierungsverlauf",
    log: "Protokolle",
    noTagsAvailable: "Ups … Keine Tags erstellt!",
    noTagsAvailableWarning: "Neue Labels können Sie in der Systemadministration registrieren.",
    noWalletsAvailable: "Ups ... Keine Geldbörsen verfügbar!",
    wallets: "Geldbörsen",
    filter: {
      queues: "Warteschlangen",
      whatsapp: "Verbindung",
      users: "Benutzer",
      tags: "Schlagwörter",
      kanbans: "Kanbans"
    },
    toggleFilterOptions: "Filteroptionen ein-/ausblenden",
    addTag: "Tag hinzufügen",
    addWallet: "Wallet hinzufügen",
    ticketsSelected: "Tickets ausgewählt",
    ticketSelected: "Ticket ausgewählt",
    selectMultiple: "Mehrere auswählen",
    transferSelectedTickets: "Ausgewählte Tickets übertragen",
    markAsRead: "Als gelesen markieren",
    markAsUnread: "Als ungelesen markieren",
    sanitizeContact: "Kontakt desinfizieren",
    logsticket: "Ticketprotokolle",
    contactSanitizeNotice: "Diese Routine erstellt den Benutzer neu und schließt alle mit diesem Kontakt verknüpften Tickets.",
    addValue: "Mehrwert schaffen",
    ticketProtocols: "Serviceprotokolle",
    ticketsEvaluations: "Service-Bewertungen",
    evaluationAverage: "Durchschnittliche Bewertungen",
    evaluationNotConclusive: "Die Bewertung wurde nicht erfolgreich abgeschlossen",
    contactDetails: {
      vapi: "Vapi",
      title: "Kontaktdetails",
      reduceMenu: "Menü einklappen",
      name: "Name",
      phone: "Telefon",
      email: "E-Mail",
      cpf: "CPF",
      birthday: "Geburtstagsdatum",
      businessName: "Unternehmen",
      firstName: "Vorname",
      lastName: "Nachname",
      edit: "Bearbeiten",
      call: "Wavoip",
      asterisk: "SCHLUCK",
      telephony: "Telefonie",
      sms: "SMS"
    },
    logs: {
      contactLogs: "Kontaktprotokolle",
      ticketLogs: "Ticketprotokolle",
      evaluationLogs: "Bewertungsprotokolle",
      protocolLogs: "Protokollprotokolle",
      noteLogs: "Notizprotokolle"
    }
  },
  rating: {
    poor: "Schlecht",
    fair: "Regulär",
    good: "Gut",
    veryGood: "Sehr gut",
    excellent: "Exzellent",
    incredible: "Unglaublich"
  },
  generalSupportScript: {
    sendMessage: "Nachricht senden",
    sendingMessage: "Nachricht wird gesendet...",
    messageSent: "Nachricht gesendet an Nummer: ",
    messageSendError: "Fehler beim Senden der einzelnen Nachricht: ",
    closeModal: "Modal schließen",
    error: "Fehler",
    success: "Erfolg",
    notificationPosition: "Spitze",
    notificationColorPositive: "positiv",
    notificationColorNegative: "Negativ",
    downloadPDF: "PDF herunterladen",
    downloadingPDF: "PDF wird heruntergeladen...",
    errorDownloadingPDF: "Fehler beim Herunterladen der Nachrichten",
    reportTitle: "Nachrichtenbericht - Support",
    protocolLabel: "Protokoll",
    ticketIdLabel: "Ticket-ID",
    whatsappIdLabel: "WhatsApp-ID",
    channelLabel: "Kanal",
    footerGeneratedOn: "Generiert am",
    contactInfo: "Kontaktinformationen",
    nameLabel: "Name",
    numberLabel: "Nummer",
    profilePicLabel: "Profilfoto",
    messageFrom: "Nachricht von",
    dateTimeLabel: "Datum/Uhrzeit",
    userIdLabel: "Benutzer-ID",
    messageBody: "Nachrichtentext",
    separatorLine: "Trennlinie",
    saveFileName: "Service_",
    termsAcceptanceNotification: "Bitten Sie den Superadministrator, die Nutzungsbedingungen Ihres Unternehmens zu akzeptieren.",
    tenantWithFalseAcceptTermsNotification: "Bitten Sie den Superadministrator, die Nutzungsbedingungen für den Mieter zu akzeptieren",
    acceptTermsSuccess: "Bedingungen für die Domäne erfolgreich akzeptiert",
    errorAcceptingTerms: "Fehler beim Akzeptieren der Bedingungen",
    notifyActionClose: "Schließen",
    tenantId: "Mandanten-ID",
    superadminProfile: "Superadmin",
    tenantNotFound: "Mieter nicht gefunden",
    deleteNoteConfirmation: "Möchten Sie die Not, {note.notes}“ wirklich löschen?",
    deleteNoteSuccess: "Notiz {note.notes} gelöscht!",
    attentionTitle: "Aufmerksamkeit",
    noLabel: "NEIN",
    yesLabel: "Ja",
    autoCloseWarning: "Der Support {ticket.id} wurde automatisch gelöst, nachdem länger als {time} Minuten keine Interaktion stattfand.",
    autoCloseEnabled: "Automatische Antwort aktiviert",
    autoCloseDisabled: "Automatische Antwort deaktiviert",
    noInteraction: "Keine Interaktion",
    timeExceeded: "Zeitüberschreitung",
    ticketsLoaded: "Geladene Dienste!",
    ticketsLoadedTabs: "In den Registerkarten „Öffnen“, „Ausstehend“ und „Geschlossen“ geladene Dienste!",
    attention: "Aufmerksamkeit",
    syncOldMessagesWarning: "Möchten Sie den Nachrichtenverlauf wirklich synchronisieren?",
    syncOldMessagesHint: "Es sind nur positive Zahlen zulässig",
    syncOldMessagesSuccess: "Bitte warten Sie einen Moment, das System importiert {value} Nachrichten für den Benutzer {ticketFocado.contact.number}",
    invalidValue: "Der vom Benutzer eingegebene Wert ist ungültig oder wurde nicht angegeben.",
    sendProtocolConfirmation: "Möchten Sie ein Protokoll zu diesem Dienst senden?",
    protocolSent: "Protokoll {protocol} an Support {ticketFocado.id} gesendet",
    protocolError: "Das Senden des Serviceprotokolls war nicht möglich.",
    limitMessagesLabel: "Begrenzung der zu importierenden Nachrichten",
    loading: "Laden...",
    ratingMessageTitle: "Bewerten Sie diesen Service:",
    notificationMessageFrom: "Nachricht von: ",
    loadMoreTicketsMessage: "Wenn Sie das Ende der Ticketliste erreichen, werden neue Anfragen in alle Registerkarten geladen, sofern vorhanden. Diese Aktion wird alle 3 Sekunden wiederholt!",
    companyInactive: "Ihr Unternehmen ist inaktiv!",
    contactAdmin: "Bitte wenden Sie sich an Ihren Systemadministrator!",
    logoutError: "Abmeldung nicht möglich",
    tenantInactiveMessage: "Das Unternehmen ist inaktiv und wird in Kürze getrennt.",
    sessionExpired: "Die Sitzung ist abgelaufen, Sie werden zur Anmeldung weitergeleitet.",
    deleteMessageConfirmation: "Möchten Sie die Nachricht wirklich löschen?",
    deleteMessageWarning: "Alte Nachrichten werden im Client nicht gelöscht.",
    deleteError: "Nachricht kann nicht gelöscht werden",
    loadUsersError: "Problem beim Laden der Benutzer",
    loadUserError: "Problem beim Laden des Benutzers",
    loadError: "Beim Versuch, Daten zu speichern, ist ein Fehler aufgetreten: ",
    contactSanitizeSuccess: "Kontakt erfolgreich bereinigt …",
    contactSanitizeError: "Fehler beim Löschen des Kontakts ...",
    loadMessage: "Bitte warten Sie, während die Tickets geladen werden …",
    confirmExitTitle: "Möchten Sie diese Seite wirklich verlassen?",
    confirmExitMessage: "Wenn Sie diese Seite verlassen, geht die Kontrolle über die Verbindung verloren."
  },
  dashTickets: {
    noQueue: "Keine Warteschlange",
    consultTicketsError: "Fehler beim Abfragen von Diensten",
    open: "Offen",
    tickets: "Leistungen",
    panelTitle: "Service-Panel",
    filtersButtonLabel: "Filter",
    closeOpenTicketsButtonLabel: "Offene Termine schließen",
    closePendingTicketsButtonLabel: "Ausstehende Anrufe schließen",
    transferTicketButtonLabel: "Übertragungsdienst zwischen Benutzern",
    markAllAsReadButtonLabel: "Alle Nachrichten als gelesen markieren",
    filtersTitle: "Filter",
    dateStartLabel: "Start",
    dateEndLabel: "Ende",
    showAllLabel: "(Admin) – Alle anzeigen",
    viewTypeLabel: "Ansichtstyp",
    updateButtonLabel: "So aktualisieren Sie",
    visionButtonLabel: "Vision",
    selectDestinationQueueLabel: "Zielwarteschlange",
    selectUserLabel: "Zielbenutzer",
    transferWithoutQueueLabel: "Alle Termine ohne Anstehen übertragen",
    transferBetweenUsersLabel: "Übertragungsdienst zwischen Benutzern",
    resolvePendingTicketsLabel: "Alle ausstehenden Anfragen lösen",
    resolveOpenTicketsLabel: "Alle offenen Anrufe lösen",
    selectSourceUserLabel: "Quellbenutzer",
    attentionMessage: "Achtung, Benutzer müssen Zugriff auf die gleichen Warteschlangen haben",
    actionInMassMessage: "Bitte beachten Sie, dass es sich hierbei um eine Massenaktion handelt und diese nicht rückgängig gemacht werden kann.",
    transferTicketsConfirmation: "Alle Termine ohne Anstehen übertragen",
    closeTicketsConfirmation: "Alle ausstehenden Anfragen lösen",
    closeOpenTicketsConfirmation: "Alle offenen Anrufe lösen",
    userSelectionError: "Wählen Sie den Benutzer und die Zielwarteschlange für ausstehende Dienste aus!",
    userDestinationSelectionError: "Wählen Sie den Zielbenutzer aus!",
    massActionError: "Problem beim Ausführen der Übertragung",
    markAllAsReadMessage: "Nachrichten werden als gelesen markiert.",
    massCloseTicketsError: "Problem beim Schließen von Massendiensten",
    updateTicketError: "Problem beim Aktualisieren des Tickets",
    ticketsReloadMessage: "Bitte warten Sie. Die Seite wird nach Abschluss der Aktion neu geladen.",
    loadQueuesError: "Problem beim Laden der Warteschlangen",
    loadUsersError: "Problem beim Laden der Benutzer",
    selectUserAndQueueError: "Wählen Sie den Benutzer und die Zielwarteschlange für ausstehende Dienste aus!",
    transferError: "Problem beim Ausführen der Übertragung",
    closeMassTicketsError: "Problem beim Schließen von Massendiensten",
    resolveTicketsBatchMessage: "Tickets werden in Blöcken von 10 Elementen gelöst.",
    reloadPageMessage: "Bitte warten Sie. Die Seite wird nach Abschluss der Aktion neu geladen.",
    markAllAsReadError: "Problem beim Markieren aller als gelesen",
    viewTypeUser: "Benutzer",
    viewTypeUserSynthetic: "Synthetischer Benutzer",
    viewTypeQueue: "Warteschlange",
    viewTypeQueueSynthetic: "Synthetischer Faden",
    transferBetweenQueuesButtonLabel: "Zwischen Warteschlangen übertragen",
    transferBetweenChannelsButtonLabel: "Zwischen Kanälen übertragen",
    transferBetweenQueuesTitle: "Tickets zwischen Warteschlangen übertragen",
    transferBetweenQueuesDescription: "Wählen Sie die Quellwarteschlange und die Zielwarteschlange aus",
    sourceQueueLabel: "Quellwarteschlange (leer lassen, um alle ohne Warteschlange zu übertragen)",
    destinationQueueLabel: "Zielwarteschlange *",
    destinationUserLabel: "Zielbenutzer (optional)",
    transferBetweenChannelsTitle: "Tickets zwischen Kanälen übertragen",
    transferBetweenChannelsDescription: "Wählen Sie den Quellkanal und den Zielkanal aus",
    sourceChannelLabel: "Quellkanal",
    destinationChannelLabel: "Zielkanal *",
    selectSourceChannelError: "Wählen Sie den Quellkanal aus!",
    selectDestinationQueueError: "Wählen Sie die Zielwarteschlange aus!",
    selectDestinationChannelError: "Wählen Sie den Zielkanal aus!",
    transferBetweenQueuesSuccess: "Tickets erfolgreich zwischen Warteschlangen übertragen",
    transferBetweenChannelsSuccess: "Tickets erfolgreich zwischen Kanälen übertragen",
    transferBetweenQueuesError: "Fehler beim Übertragen von Tickets zwischen Warteschlangen",
    transferBetweenChannelsError: "Fehler beim Übertragen von Tickets zwischen Kanälen"
  },
  dashBoard: {
    dataValidation: "Bitte beachten Sie, dass eine Prüfung des Periodenbeginns und des Periodenendes am selben Tag nicht möglich ist.",
    attendanceValueEvolution: "Entwicklung der Werte",
    values: "Werte",
    attendances: "Leistungen",
    filterGroups: "Filtergruppen",
    filterPrivateChats: "Filtern Sie Statistiken für private Gespräche!",
    controlPanel: "Bedienfeld",
    attendanceByChannelName: "Dienst nach Kanal (Name)",
    undefined: "Unbestimmt",
    attendanceByChannel: "Service nach Kanal (Verbindung)",
    attendanceByQueue: "Warteschlangendienst",
    attendanceByReasons: "On-Demand-Service",
    attendanceByStatus: "Service nach Status",
    attendanceByUser: "Service durch Benutzer",
    evolutionByChannel: "Entwicklung nach Kanal",
    evolutionByValue: "Wertentwicklung",
    attendanceEvolution: "Entwicklung der Dienste",
    user: "Benutzer",
    pending: "Ausstehend",
    attending: "Teilnahme",
    resolved: "Vollendet",
    total: "Gesamt",
    avgRating: "Durchschnittliche Bewertungen",
    avgFirstResponse: "Durchschnittliche Zeit bis zur ersten Antwort",
    avgHandlingTime: "Durchschnittliche Servicezeit (AST)",
    hours: "Std.",
    minutes: "Minuten",
    scheduleStartDate: "Termindatum/-uhrzeit",
    scheduleEndDate: "Termindatum/-uhrzeit",
    generate: "Um zu generieren",
    noDataHere: "Keine Daten hier!",
    totalTickets: "Gesamtbesucherzahl",
    activeTickets: "Aktiv",
    receptiveTickets: "Empfänglich",
    newContacts: "Neue Kontakte",
    avgResponseTime: "Durchschnittliche Zeit bis zur ersten Antwort",
    performanceByTeam: "Teamleistung",
    ticketsByChannel: "Service nach Kanal",
    ticketsByQueue: "Warteschlangendienst",
    ticketsByStatus: "Service nach Status",
    ticketsByUser: "Service durch Benutzer",
    ticketsEvolutionChannels: "Entwicklung nach Kanal",
    ticketsEvolutionByPeriod: "Entwicklung der Dienste",
    notInformed: "Nicht informiert",
    evolutionByPeriod: "Leistungen"
  },
  home: {
    welcome: "Willkommen",
    user: "Benutzer",
    subtitle: "Schneller Zugriff auf die Hauptfunktionen des Systems",
    dashboard: "Dashboard",
    dashboardDescription: "Statistiken und Leistungsmetriken anzeigen",
    attendance: "Tickets",
    attendanceDescription: "Verwalten Sie Ihre Tickets und Gespräche",
    contacts: "Kontakte",
    contactsDescription: "Anzeigen und Verwalten Ihrer Kontaktliste",
    quickInfo: "Schnellinformationen",
    info1: "Zugriff auf das Dashboard für detaillierte Analysen",
    info2: "System für bessere Leistung optimiert",
    info3: "Durchsuchen Sie das Menü für weitere Funktionen",
    quickLinks: "Schnelllinks",
    reports: "Berichte",
    reportsDescription: "Berichte und Analysen anzeigen",
    settings: "Einstellungen",
    settingsDescription: "System nach Ihren Bedürfnissen konfigurieren"
  },
  confirmation: {
    irreversibleAction: "Achtung: Dies ist eine irreversible Aktion!",
    deleteTenant: "Möchten Sie das Unternehmen {id} wirklich löschen?"
  },
  socketInitial: {
    updateWhatsapps: "WhatsApp-Update erhalten",
    deleteWhatsapps: "WhatsApp-Löschung erhalten",
    updateSession: "Sitzung aktualisiert",
    loadingScreen: "Die Verbindung wird synchronisiert: ",
    readySession: "Verbindung aktualisiert.",
    wavoipSession: "Synchronisierte Verbindung mit Wavoip: ",
    updateImport: "Gerät mit der Anwendung synchronisieren.",
    refreshImport: "Gerätemeldungen werden aktualisiert.",
    changeBattery: "Der Akku des WhatsApp-Mobiltelefons muss aufgeladen werden.",
    ticketUpdate: "Ticket aktualisiert.",
    ticketCreate: "Neues Ticket erstellt.",
    chatCreate: "Neuer Chat erstellt.",
    ticketNotification: "Neuer Kunde steht aus.",
    messageAck: "Nachricht bestätigt.",
    messageDelete: "Nachricht gelöscht.",
    messageUpdate: "Nachricht aktualisiert.",
    contactUpdate: "Kontakt aktualisiert.",
    privateMsgReceived: "Neue private Nachricht erhalten.",
    unreadPrivateMsgReceived: "Ungelesene private Nachricht erhalten.",
    notificationPrivateMsgReceived: "Benachrichtigung über den Empfang einer privaten Nachricht.",
    userVerified: "Verifizierter Benutzer.",
    userChatUpdate: "Benutzerstatus aktualisiert.",
    userStatusUpdate: "Benutzerstatus aktualisiert"
  },
  mainLayout: {
    novo: {
      wabaTemplate: "Für WABA wird ein neues Ticket zum Senden von Vorlagen erstellt",
      userNotFound: "Fehler: Benutzer nicht gefunden. Bitte erneut anmelden.",
      whatsappNotFound: "Fehler: WhatsApp nicht ausgewählt.",
      numberNotFound: "Fehler: Nummer nicht angegeben.",
      numberInvalid: "Fehler: Ungültige Nummer.",
      invalidIds: "Ungültige IDs zur Ticketüberprüfung",
      invalidData: "Fehler: Ungültige Daten zum Erstellen eines Tickets.",
      ticketCreated: "Neues Ticket erstellt für {contatoName} - Ticket: {ticketId}",
      ticketCreatedError: "Fehler: Ticket erstellt, aber ohne gültige ID."
    },    
    noTutorials: 'Keine Tutorials gefunden',
    tutoriais: 'Tutorials',
    checkAllInternalMessages: "Alle als gelesen markieren (Privatchat)",
    checkAllInternalMessagesSuccess: "Alle Nachrichten wurden als gelesen markiert (Privatchat)",
    checkAllInternalMessagesError: "Fehler beim Markieren aller Nachrichten als gelesen (Privatchat)",
    checkAllMessages: "Alle als gelesen markieren (Dienste)",
    checkAllMessagesSuccess: "Alle Nachrichten wurden als gelesen markiert (Anwesenheit)",
    checkAllMessagesError: "Fehler beim Markieren aller Nachrichten als gelesen (Dienste)",
    webphone: "SIP-Webphone",
    cookieWarning: "Cache und Cookies löschen. Klicken Sie auf „OK“, um die Seite neu zu laden!",
    cleanCookies: "Neustart",
    task: "Aufgabe",
    dashboard: "Panel",
    atendimentos: "Leistungen",
    contatos: "Kontakte",
    disparoMassa: "Massenerschießung",
    grupos: "Gruppen",
    chat: "Chat",
    kanban: "Kanban",
    tarefas: "Aufgaben",
    perfil: "Profil",
    logout: "Ausgehen",
    close: "Schließen",
    send: "Senden",
    cancel: "Stornieren",
    startConversation: "Einzelgespräch starten",
    internalMessages: "Interne Nachrichten",
    tasks: "Aufgaben",
    taskLimit: "Limit",
    taskStatus: "Status",
    taskPriority: "Priorität",
    taskDate: "Frist",
    message: "Nachricht",
    number: "Nummer",
    whatsappId: "WhatsApp-ID",
    taskName: "Aufgabe",
    taskPriorityMap: {
      high: "Hoch",
      medium: "Durchschnitt",
      low: "Niedrig",
      none: "Keiner"
    },
    taskStatusMap: {
      delayed: "Spät",
      pending: "Ausstehend",
      finished: "Vollendet"
    },
    user: "Benutzer",
    hello: "Hallo",
    userOnline: "Online-Benutzer",
    userOffline: "Offline-Benutzer",
    newChat: "Einzelgespräch starten",
    reopenCall: "Wavoip-Anruf erneut öffnen",
    internalMessage: "Interne Nachricht",
    menu: "Speisekarte",
    notifications: "Benachrichtigungen",
    noNewNotifications: "Hier gibt es nichts Neues!",
    newMessagesInInternalChat: "Neue ungelesene Nachrichten im internen Chat!",
    unreadMessagesInInternalChat: "Ungelesene Nachrichten im internen Chat!",
    sharedTicketInvites: "Geteilte Ticket-Einladungen",
    pendingClientsInQueue: "Ausstehende Kunden in der Warteschlange",
    contact: "Kontakt",
    yes: "Ja",
    no: "NEIN",
    attention: "Aufmerksamkeit!",
    userProfile: "Benutzerprofil",
    updateUser: "Benutzer aktualisieren",
    acceptTerms: "Bedingungen akzeptieren",
    error: "Fehler",
    successfullySent: "Nachricht erfolgreich gesendet",
    acceptTermsMessage: "Bitte akzeptieren Sie die Nutzungsbedingungen, um fortzufahren.",
    invalidTenant: "Ungültiger Mieter. Bitten Sie den Superadministrator, die E-Mail zu bestätigen.",
    profile: "Profil"
  },
  scriptMainLayout: {
    groupTabAccess: "Greifen Sie im Support auf die Registerkarte „Gruppen“ zu, um den Anruf zu öffnen.",
    tokenUpdateError: "Token kann nicht aktualisiert werden.",
    noQueue: "keine Warteschlange",
    attention: "Aufmerksamkeit!!",
    logoutError: "Abmeldung nicht möglich.",
    messagesLoadError: "Fehler beim Laden interner Nachrichten.",
    tasksLoadError: "Fehler beim Laden der Aufgaben.",
    markAsReadError: "Fehler beim Markieren der Nachricht als gelesen.",
    deleteMessageError: "Fehler beim Löschen der Nachricht.",
    fetchMessagesError: "Fehler beim Abrufen ungelesener Nachrichten.",
    contactHasOngoingTicket: "{contact} bietet einen laufenden Dienst an.",
    adminCanAssign: "Nur ein Administrator kann Ihnen diesen Dienst zuweisen.",
    openTicketConfirmation: "{contact} hat einen laufenden Dienst (Dienst: {ticketId} – Warteschlange: {queueId}). Möchten Sie den Dienst öffnen?",
    callNotification: "Neuer eingehender Anruf",
    messageSent: "Nachricht gesendet an Nummer: {number}",
    messageSendError: "Fehler beim Senden der einzelnen Nachricht: {error}",
    internalMessagesNotification: "Sie haben {count} ungelesene Nachrichten.",
    tasksNotification: "Sie haben {count} ausstehende Aufgaben.",
    acceptTermsSuccess: "Bedingungen erfolgreich akzeptiert.",
    acceptTermsError: "Bitten Sie den Superadministrator, die Nutzungsbedingungen für Ihr Unternehmen zu akzeptieren.",
    adminContact: "Bitte wenden Sie sich an Ihren Systemadministrator!",
    betaMenuAccess: "Beta-Menü nur für autorisierte Benutzer verfügbar.",
    taskStatus: {
      delayed: "🚩 Spät",
      pending: "🔄 Ausstehend",
      finished: "✅ Abgeschlossen"
    },
    priorityStatus: {
      high: "⚡⚡⚡ Hoch",
      medium: "⚡⚡ Durchschnitt",
      low: "⚡ Herunterladen",
      none: "😉 Keine"
    },
    notifications: {
      chatUpdate: "Update im Chat.",
      newMessage: "Neue Nachricht von {contact}.",
      messageFrom: "Nachricht von {contactName}",
      notificationBody: "{messageBody} – {Zeit}"
    }
  },
  menuCategories: {
    automacao: 'Automatisierung',
    dashboard: 'Dashboard',
    atendimento: 'Service',
    gestaoComercial: 'Vertriebsmanagement',
    comunicacaoMarketing: 'Kommunikation & MKT',
    administracao: 'Verwaltung',
    gestao: 'Verwaltung',
    configuracao: 'Konfiguration und API',
    tenantsLicenciamento: 'Tenants & Lizenzierung',
    configuracoes: 'Einstellungen',
    canaisIntegracao: 'Kanäle & Integration',
    sistema: 'System'
  },
  menu: {
    funil: {
      title: "Trichter",
      caption: "Chancenmanagement"
    },
    dashboard: {
      title: "Panel",
      caption: ""
    },
    atendimentos: {
      title: "Leistungen",
      caption: "Liste der Dienste"
    },
    contatos: {
      title: "Kontakte",
      caption: "Kontaktliste"
    },
    disparoMassa: {
      title: "Massenerschießung",
      caption: "Senden von Massennachrichten"
    },
    grupos: {
      title: "Gruppen",
      caption: "Massengruppenverwaltung"
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
      title: "Aufgaben",
      caption: "Aufgabenliste"
    },
    mensagensRapidas: {
      title: "Schnellnachrichten",
      caption: "Vordefinierte Nachrichten"
    },
    galeria: {
      title: "Galerie",
      caption: "Dateigalerie"
    },
    instagramComentarios: {
      title: 'Instagram-Kommentare',
      caption: 'Kommentare verwalten'
    }
  },
  menuSupervisor: {
    canais: {
      title: "Kanäle",
      caption: "Kommunikationskanäle"
    },
    relatorios: {
      title: "Berichte",
      caption: "Allgemeine Berichte"
    },
    filas: {
      title: "Warteschlangen",
      caption: "Warteschlangenregistrierung"
    },
    equipes: {
      title: "Teams",
      caption: "Teams"
    },
    mensagensRapidas: {
      title: "Schnellnachrichten",
      caption: "Vordefinierte Nachrichten"
    },
    chatbot: {
      title: "Chatbot",
      caption: "Serviceroboter"
    },
    agendamentos: {
      title: "Termine",
      caption: "Geplante Nachrichten"
    },
    aniversarios: {
      title: "Geburtstage",
      caption: "Geplante Nachrichten"
    },
    fechamento: {
      title: "Schließen",
      caption: "Abschlussmeldungen"
    },
    etiquetas: {
      title: "Schlagwörter",
      caption: "Etikettenregistrierung"
    },
    notas: {
      title: "Hinweise",
      caption: "Servicehinweise"
    },
    protocolos: {
      title: "Protokolle",
      caption: "Serviceprotokolle"
    },
    avaliacoes: {
      title: "Bewertungen",
      caption: "Service-Bewertungen"
    },
    horarioAtendimento: {
      title: "Öffnungszeiten",
      caption: "Öffnungszeiten"
    },
    campanhas: {
      title: "Kampagne",
      caption: "Kampagnen senden"
    }
  },
  callLogs: {
    downloadReport: "Bericht herunterladen",
    title: "SIP-Anrufprotokolle",
    subtitle: "Protokolle der ein- und ausgehenden SIP-Anrufe",
    columns: {
      id: "ID",
      originNumber: "Ursprungsnummer",
      destinationNumber: "Zielnummer",
      callStatus: "Anrufstatus",
      callDuration: "Dauer",
      createdAt: "Erstellungsdatum",
      user: "Benutzer"
    },
    status: {
      calling: "Wird angerufen",
      received: "Empfangen",
      accepted: "Angenommen",
      completed: "Abgeschlossen",
      ended: "Beendet"
    }
  },    
  menuAdmin: {
    logligacao: {
      title: "Anrufprotokoll",
      caption: "SIP-Anrufprotokolle"
    },      
    canais: {
      title: "Kanäle",
      caption: "Kommunikationskanäle"
    },
    painelAtendimentos: {
      title: "Service-Panel",
      caption: "Leistungsübersicht"
    },
    relatorios: {
      title: "Berichte",
      caption: "Allgemeine Berichte"
    },
    usuarios: {
      title: "Benutzer",
      caption: "Benutzeradministrator"
    },
    filas: {
      title: "Warteschlangen",
      caption: "Warteschlangenregistrierung"
    },
    equipes: {
      title: "Teams",
      caption: "Teams-Chat"
    },
    mensagensRapidas: {
      title: "Schnellnachrichten",
      caption: "Vordefinierte Nachrichten"
    },
    chatbot: {
      title: "Chatbot",
      caption: "Serviceroboter"
    },
    agendamentos: {
      title: "Termine",
      caption: "Geplante Nachrichten"
    },
    aniversarios: {
      title: "Geburtstage",
      caption: "Geplante Nachrichten"
    },
    fechamento: {
      title: "Schließen",
      caption: "Abschlussmeldungen"
    },
    etiquetas: {
      title: "Schlagwörter",
      caption: "Etikettenregistrierung"
    },
    notas: {
      title: "Hinweise",
      caption: "Servicehinweise"
    },
    wavoip: {
      title: "Wavoip",
      caption: "Eingehende und ausgehende Anrufe"
    },
    protocolos: {
      title: "Protokolle",
      caption: "Serviceprotokolle"
    },
    avaliacoes: {
      title: "Bewertungen",
      caption: "Service-Bewertungen"
    },
    horarioAtendimento: {
      title: "Öffnungszeiten",
      caption: "Öffnungszeiten"
    },
    campanhas: {
      title: "Kampagne",
      caption: "Kampagnen senden"
    },
    api: {
      title: "API",
      caption: "Integration externer Systeme"
    },
    configuracoes: {
      title: "Einstellungen",
      caption: "Allgemeine Einstellungen"
    }
  },
  menuSuperAdmin: {
    backup: {
      title: 'Export',
      caption: 'Daten-Center'
    },
    migration: {
      title: 'Migration',
      caption: 'Mandanten-Migration'
    },
    monitor: {
      title: "Monitor",
      caption: "Systemüberwachung"
    },
    assinatura: {
      title: "Unterschrift",
      caption: "Lizenz verwalten"
    },
    tenants: {
      title: "Mieter",
      caption: "Mieter"
    },
    usuarios: {
      title: "Benutzer",
      caption: "Benutzeradministrator"
    },
    email: {
      title: "E-Mail",
      caption: "Passwort-Wiederherstellung"
    },
    planos: {
      title: "Pläne",
      caption: "Pläne registrieren"
    },
    pagamentos: {
      title: "Zahlungen",
      caption: "Zahlungsdetails"
    },
    canais: {
      title: "Kanäle",
      caption: "Kommunikationskanäle"
    },
    api: {
      title: "API",
      caption: "SuperAdmin-API"
    },
    appWaba: {
      title: 'App WABA',
      caption: 'Facebook App Einstellungen'
    },
    atualizar: {
      title: "So aktualisieren Sie",
      caption: "Systemwartung"
    },
    customizar: {
      title: "Anpassen",
      caption: "Logos und Farben"
    },
    notificacao: {
      title: "Benachrichtigung",
      caption: "Interne Nachrichten"
    },
    filasTarefas: {
      title: "Warteschlangen und Aufgaben",
      caption: "Bull und Redis"
    },
    dadosInternos: {
      title: "Interne Daten",
      caption: "Interne Nachrichten"
    },
    terminal: {
      title: "Terminal",
      caption: "SSH-Terminal"
    },
    provedoresGlobais: {
      title: "Globale Anbieter",
      caption: "Globale Anbieterkonfigurationen"
    }
  },
  menuBloqueio: {
    configuracoes: {
      title: "Einstellungen",
      caption: "Allgemeine Einstellungen"
    }
  },
  grupoIndex: {
    tabs: {
      bulkgroups: "Gruppen und Teilnehmer",
      bulkgroups2: "Gruppen manipulieren",
      bulkuser: "Benutzer manipulieren",
      banlist: "Verbotene Nummern",
      wordlist: "Verbotene Wörter",
      greetings: "Begrüßungsnachricht",
      farewell: "Abschiedsnachricht"
    },
    banner: {
      stability: "Diese Option ist für Baileys und Whatsapp-Web.JS verfügbar. Bei der Verwendung von Massenaktionen ist Whatsapp-Web.JS vorzuziehen, da es mehr Stabilität bei der Handhabung von Gruppen bietet.",
      warning: {
        title: "Hinweis zu Gruppenautomatisierungen",
        blockRisk: "Kann WhatsApp meine Nummer blockieren oder sperren?",
        realRisk: "Ja, die Möglichkeit besteht tatsächlich und sollte ernst genommen werden!",
        spamTolerance: "WhatsApp hat null Toleranz gegenüber Spam!",
        monitoring: "Es gelten strenge Regeln und die Überwachung des Nachrichtenversands und der Durchführung von Massenaktionen ist sehr streng.",
        attention: "ACHTUNG: Wenn 2 % der Empfänger Ihre Nummer melden oder Ihre Nachricht als Spam markieren, wird Ihre Nummer gesperrt/gesperrt!"
      }
    },
    dialog: {
      confirmButton: "Weitermachen",
      cancelButton: "Ausgehen"
    },
    notifications: {
      colorsLoadError: "Fehler beim Laden der Farben.",
      noStoredColors: "Im localStorage sind keine Farben gespeichert."
    }
  },
  grupoGeralBanlist: {
    table: {
      columns: {
        id: "#",
        number: "Nummer",
        userId: "Benutzer",
        groupId: "Gruppe",
        createdAt: "Datum",
        actions: "Aktionen"
      },
      title: "Verbote"
    },
    placeholders: {
      search: "Lokalisieren"
    },
    buttons: {
      add: "Hinzufügen",
      delete: "Löschen"
    },
    dialogs: {
      deleteSingle: "Möchten Sie das Verbot „{banId}“ wirklich löschen?",
      deleteAll: "Möchten Sie wirklich alle {banCount} Sperrdatensätze löschen?"
    },
    notifications: {
      deleteSuccess: "Ban {banId} gelöscht!",
      deleteAllSuccess: "Alle Ban-Einträge wurden gelöscht!",
      groupNameError: "Fehler beim Abrufen des Gruppennamens für {groupId}."
    }
  },
  grupoGeralDespedida: {
    table: {
      columns: {
        id: "#",
        message: "Nachricht",
        userId: "Benutzer",
        groupId: "Gruppe",
        createdAt: "Datum",
        actions: "Aktionen"
      },
      title: "Abschiede"
    },
    placeholders: {
      search: "Lokalisieren"
    },
    buttons: {
      add: "Hinzufügen",
      delete: "Löschen"
    },
    dialogs: {
      deleteSingle: "Möchten Sie den Abschied \"{despedidaId}\" wirklich löschen?",
      deleteAll: "Möchten Sie wirklich alle {despedidaCount} Datensätze von Despedida löschen?"
    },
    notifications: {
      deleteSuccess: "Auf Wiedersehen, {despedidaId} gelöscht!",
      deleteAllSuccess: "Alle Abschiedsaufzeichnungen wurden gelöscht!",
      groupNameError: "Fehler beim Abrufen des Gruppennamens für {groupId}."
    }
  },
  grupoGeralSaudacao: {
    table: {
      columns: {
        id: "#",
        message: "Nachricht",
        userId: "Benutzer",
        groupId: "Gruppe",
        createdAt: "Datum",
        actions: "Aktionen"
      },
      title: "Grüße"
    },
    placeholders: {
      search: "Lokalisieren"
    },
    buttons: {
      add: "Hinzufügen",
      delete: "Löschen"
    },
    dialogs: {
      deleteSingle: "Möchten Sie die Begrüßung „{greetingId}“ wirklich löschen?",
      deleteAll: "Möchten Sie wirklich alle {saudacaoCount} Anrededatensätze löschen?"
    },
    notifications: {
      deleteSuccess: "Gruß {saudacaoId} gelöscht!",
      deleteAllSuccess: "Alle Begrüßungsaufzeichnungen wurden gelöscht!",
      groupNameError: "Fehler beim Abrufen des Gruppennamens für {groupId}."
    }
  },
  grupoGeralWordlist: {
    table: {
      columns: {
        id: "#",
        word: "Wort",
        userId: "Benutzer",
        groupId: "Gruppe",
        createdAt: "Datum",
        actions: "Aktionen"
      },
      title: "Verbotene Wörter"
    },
    placeholders: {
      search: "Lokalisieren"
    },
    buttons: {
      add: "Hinzufügen",
      delete: "Löschen",
      activateWordWatch: "Aktivieren Sie Word Watch"
    },
    dialogs: {
      deleteSingle: "Möchten Sie das Wort „{wordId}“ wirklich löschen?",
      deleteAll: "Möchten Sie wirklich alle {wordCount} Word-Datensätze löschen?"
    },
    notifications: {
      deleteSuccess: "Wort {wordId} gelöscht!",
      deleteAllSuccess: "Alle Word-Datensätze wurden gelöscht!",
      groupNameError: "Fehler beim Abrufen des Gruppennamens für {groupId}."
    }
  },
  grupoGeralModalDespedida: {
    dialog: {
      titleCreate: "Abschied gestalten",
      titleEdit: "Abschied bearbeiten"
    },
    form: {
      message: "Abschiedsnachricht",
      whatsappId: "WhatsApp-ID",
      group: "Gruppe"
    },
    notifications: {
      createSuccess: "Abschied genommen!",
      editSuccess: "Bearbeiteter Abschied!",
      errorFetchingGroups: "Fehler beim Auflisten der Gruppen.",
      errorSaving: "Beim Speichern der Verabschiedung ist ein Fehler aufgetreten."
    }
  },
  grupoGeralModalBan: {
    dialog: {
      titleCreate: "Verbot erstellen",
      titleEdit: "Bearbeitungsverbot"
    },
    form: {
      number: "Sperrnummer",
      whatsappId: "WhatsApp-ID",
      group: "Gruppe"
    },
    notifications: {
      createSuccess: "Verbot erstellt!",
      editSuccess: "Verbot bearbeitet!",
      errorFetchingGroups: "Fehler beim Auflisten der Gruppen.",
      errorSaving: "Beim Speichern des Verbots ist ein Fehler aufgetreten."
    }
  },
  grupoGeralModalSaudacao: {
    dialog: {
      titleCreate: "Begrüßung erstellen",
      titleEdit: "Begrüßung bearbeiten"
    },
    form: {
      message: "Begrüßungsnachricht",
      whatsappId: "WhatsApp-ID",
      group: "Gruppe"
    },
    notifications: {
      createSuccess: "Gruß erstellt!",
      editSuccess: "Bearbeitete Begrüßung!",
      errorFetchingGroups: "Fehler beim Auflisten der Gruppen.",
      errorSaving: "Beim Speichern der Begrüßung ist ein Fehler aufgetreten."
    }
  },
  grupoGeralModalWordlist: {
    dialog: {
      titleCreate: "Word erstellen",
      titleEdit: "Word bearbeiten"
    },
    form: {
      word: "Wort (Kleinbuchstaben)",
      whatsappId: "WhatsApp-ID",
      group: "Gruppe"
    },
    notifications: {
      createSuccess: "Wort erstellt!",
      editSuccess: "Wort bearbeitet!",
      errorFetchingGroups: "Fehler beim Auflisten der Gruppen.",
      errorSaving: "Beim Speichern des Wortes ist ein Fehler aufgetreten."
    }
  },
  grupoGeralModalWordlistGrupo: {
    dialog: {
      title: "Aktivieren Sie Word Watch"
    },
    form: {
      connection: "Verbindung",
      toggleLabel: "Ein/Aus"
    },
    notifications: {
      selectConnection: "Bitte wählen Sie eine Verbindung aus.",
      updateSuccess: "WhatsApp {connection} erfolgreich aktualisiert!",
      updateError: "Fehler beim Aktualisieren von WhatsApp. Weitere Einzelheiten finden Sie in den Protokollen."
    }
  },
  grupoMassa1: {
    title: "Gruppengenerator",
    sections: {
      createMassGroups: "Gruppen in großen Mengen erstellen",
      listParticipants: "Teilnehmer auflisten"
    },
    form: {
      connection: "Verbindung",
      groups: "Gruppen",
      groupId: "ID-Gruppe",
      participants: "Teilnehmer"
    },
    notifications: {
      selectConnection: "Bitte wählen Sie eine Verbindung aus.",
      selectGroups: "Bitte wählen Sie eine oder mehrere Gruppen aus.",
      fieldsReset: "Felder zurückgesetzt, diese Seite wird aktualisiert.",
      loadingParticipants: "Bitte warten, alle Gruppenteilnehmer werden geladen …",
      loadingGroups: "Bitte warten, Gruppen werden geladen..."
    },
    actions: {
      listGroupIds: "Gruppen-IDs auflisten",
      listParticipants: "Teilnehmer auflisten",
      exportToXLS: "Exportieren in XLS",
      clear: "Reinigen"
    }
  },
  grupoMassa2: {
    title: "Gruppen manipulieren",
    form: {
      connection: "Verbindung",
      groups: "Gruppen",
      changeTitle: "Titel ändern",
      newTitle: "Neuer Titel",
      changeDescription: "Änderungsbeschreibung",
      newDescription: "Neue Beschreibung",
      changeImageUrl: "Bild ändern (URL)",
      newImageUrl: "Neues Bild",
      changeImageFile: "Bild ändern (Upload)",
      uploadImage: "Bild-Upload",
      changePermission: "Berechtigung ändern",
      adminOnly: "Nur Administratoren können Nachrichten senden"
    },
    actions: {
      modify: "Ändern",
      clear: "Reinigen"
    },
    notifications: {
      selectConnection: "Bitte wählen Sie eine Verbindung aus.",
      selectGroups: "Bitte wählen Sie eine oder mehrere Gruppen aus.",
      fillTitle: "Bitte füllen Sie die Option mit dem neuen Titel aus.",
      fillDescription: "Bitte füllen Sie die Option mit der neuen Beschreibung aus.",
      fillImageUrl: "Bitte füllen Sie die Option mit der URL des neuen Bildes aus.",
      uploadFile: "Bitte laden Sie die neue Datei hoch."
    },
    loading: {
      modifyingGroups: "Bitte warten, Gruppendaten werden geändert …"
    }
  },
  grupoMassaUsuarios: {
    title: "Benutzer manipulieren",
    actions: {
      execute: "Ausführen",
      clear: "Felder löschen",
      reload: "Seite neu laden"
    },
    form: {
      connection: "Verbindung",
      groups: "Gruppen",
      promoteAdmins: "Administratoren befördern",
      demoteAdmins: "Degradieren von Administratoren",
      addUsers: "Benutzer hinzufügen",
      removeUsers: "Benutzer entfernen",
      importContacts: "Kontakte importieren",
      numbersInput: "Zahlen (durch Kommas getrennt)",
      csvImport: "Zahlen aus CSV importieren",
      selectContacts: "Wählen Sie Kontakte",
      numbersCommaSeparated: "Zahlen (durch Kommas getrennt)",
      importCSV: "CSV importieren"
    },
    notifications: {
      selectConnection: "Bitte wählen Sie eine Verbindung aus.",
      selectGroups: "Bitte wählen Sie eine oder mehrere Gruppen aus.",
      fillContacts: "Bitte Kontakte auswählen oder eingeben.",
      clearFields: "Felder zurückgesetzt, diese Seite wird aktualisiert."
    },
    loading: {
      fetchingContacts: "Bitte warten, alle Systemkontakte werden geladen …",
      executingActions: "Bitte warten, Aktionen werden ausgeführt …"
    }
  },
  grupoMassaModalCriarGrupo: {
    form: {
      createGroups: "Gruppen erstellen",
      connection: "Verbindung",
      groupName: "Gruppenname",
      participantNumber: "Teilnehmernummer",
      groupQuantity: "Anzahl der Gruppen",
      importContacts: "Kontakt festlegen / Kontakt auswählen",
      selectContact: "Wählen Sie Kontakt"
    },
    notifications: {
      selectConnection: "Bitte wählen Sie eine Verbindung aus.",
      fillGroupName: "Bitte füllen Sie das Feld mit dem Namen der Gruppe(n) aus.",
      fillParticipant: "Bitte füllen Sie das Feld mit einem Kontakt aus, der der/den neu erstellten Gruppe(n) hinzugefügt werden soll.",
      selectContact: "Bitte wählen Sie einen Kontakt aus, der der/den neu erstellten Gruppe(n) hinzugefügt werden soll.",
      fillQuantity: "Bitte füllen Sie das Feld mit der Anzahl der erstellten Gruppen aus."
    },
    loading: {
      fetchingContacts: "Bitte warten, Kontakte werden geladen …",
      creatingGroups: "Bitte warten, Gruppen werden erstellt …"
    }
  },
  massaGeral: {
    tabs: {
      template: "Vorlagen für Massenmailings",
      templateVariable: "Massenmail-Vorlagen + Variable",
      text: "Massenerschießung",
      textVariable: "Massenentlassung + Variable",
      sms: "SMS-Massenversand",
      report: "Massenversand-Bericht"
    },
    dialog: {
      title: "Warnung vor Massenerschießung",
      description: {
        importantNotice: {
          title: "Kann WhatsApp meine Nummer blockieren oder sperren?",
          content: "Ja, die Möglichkeit besteht tatsächlich und sollte ernst genommen werden!"
        },
        additionalInfo: {
          title: "WhatsApp hat null Toleranz gegenüber Spam!",
          content: "Es gelten strenge Regeln und die Massennachrichtenübermittlung wird sehr genau überwacht."
        },
        alert: {
          title: "AUFMERKSAMKEIT",
          content: "Wenn 2 % der Empfänger Ihre Nummer melden oder Ihre Nachricht als Spam markieren, <b>wird Ihre Nummer blockiert/gesperrt!</b>"
        }
      },
      actions: {
        exit: "Ausgehen",
        continue: "Weitermachen"
      }
    }
  },
  relatorioBulkDispatch: {
    title: "Massenversand-Bericht",
    tooltip: {
      description: "Dieser Bericht zeigt nur WhatsApp-Nachrichtenversand. Er enthält keine Wavoip- oder SMS-Versendungen."
    },
    filters: {
      status: "Status",
      dispatchType: "Versandtyp"
    },
    actions: {
      search: "Suchen",
      clear: "Löschen",
      viewDetails: "Details anzeigen"
    },
    columns: {
      id: "ID",
      status: "Status",
      dispatchType: "Typ",
      templateName: "Vorlage",
      progress: "Fortschritt",
      createdAt: "Erstellt am",
      actions: "Aktionen"
    },
    status: {
      pending: "Ausstehend",
      processing: "In Bearbeitung",
      completed: "Abgeschlossen",
      failed: "Fehlgeschlagen",
      cancelled: "Abgebrochen"
    },
    dispatchType: {
      template: "Vorlage",
      template_variable: "Vorlage mit Variablen",
      text: "Text",
      text_variable: "Text mit Variablen"
    },
    details: {
      title: "Versanddetails",
      general: "Allgemeine Informationen",
      statistics: "Statistiken",
      errors: "Fehler",
      id: "ID",
      status: "Status",
      dispatchType: "Versandtyp",
      createdAt: "Erstellt am",
      startedAt: "Gestartet am",
      completedAt: "Abgeschlossen am",
      totalMessages: "Gesamtanzahl Nachrichten",
      sentMessages: "Gesendete Nachrichten",
      failedMessages: "Fehlgeschlagene Nachrichten",
      pendingMessages: "Ausstehende Nachrichten",
      delay: "Verzögerung"
    },
    notifications: {
      errorLoading: "Fehler beim Laden der Berichte",
      errorLoadingDetails: "Fehler beim Laden der Versanddetails"
    }
  },
  massaSMS: {
    form: {
      selectService: "Service auswählen",
      minSeconds: "Minimum (Sekunden)",
      maxSeconds: "Maximum (Sekunden)",
      contacts: "Kontakte",
      selectContacts: "Wählen Sie Kontakte",
      numbersCommaSeparated: "Zahlen (durch Kommas getrennt)",
      importCSV: "Zahlen aus CSV importieren",
      message: "Nachricht"
    },
    notifications: {
      selectService: "Bitte wählen Sie eine Dienstleistung aus.",
      validMinMax: "Bitte geben Sie gültige Zahlen für Min. und Max. ein.",
      enterNumbersMessage: "Bitte geben Sie Zahlen und Nachricht ein.",
      successComtele: "Der Massenversand über Comtele wurde erfolgreich gestartet.",
      successConecta: "Massenversand über ConectaStartup erfolgreich gestartet.",
      successLivson: "Massenversand über BHI erfolgreich gestartet.",
      errorSending: "Fehler beim Senden der Nachrichten: {error}",
      fieldsCleared: "Saubere Felder."
    }
  },
  massaTexto: {
    form: {
      bulkSend: "Massenmailings",
      availableFunctions: "Diese Funktion ist für Baileys und Whatsapp-Web.JS verfügbar",
      availableFunctionsWaba: "Diese Funktion ist für WABA verfügbar",
      selectConnection: "WhatsApp-ID",
      minSeconds: "Minimum (Sekunden)",
      maxSeconds: "Maximum (Sekunden)",
      contacts: "Kontakte",
      groups: "Gruppen",
      tags: "Schlagwörter",
      kanban: "Kanban",
      selectTag: "Beschriftung auswählen",
      selectKanban: "Wählen Sie Kanban",
      selectContacts: "Wählen Sie Kontakte",
      numbersCommaSeparated: "Zahlen (durch Kommas getrennt)",
      importCSV: "Zahlen aus CSV importieren",
      includeText: "Text einschließen",
      message: "Nachricht",
      includeMedia: "Medien einschließen (URL)",
      mediaUrl: "Medien-URL",
      mediaDescription: "Medienbeschreibung",
      includeRecordedAudio: "Aufgezeichnetes Audio einschließen",
      audioUrl: "Audio-URL (.ogg)",
      includeFile: "Datei einbinden (Upload)",
      fileDescription: "Dateibeschreibung",
      recordedAudio: "Aufgezeichnetes Audio",
      send: "Senden",
      clear: "Felder löschen",
      fetchingContacts: "Bitte warten, alle Systemkontakte werden geladen …"
    },
    notifications: {
      selectConnection: "Bitte wählen Sie eine Verbindung aus.",
      enterValidNumbers: "Bitte geben Sie gültige Zahlen für Min. und Max. ein.",
      chooseSendOption: "Bitte wählen Sie eine oder mehrere Versandoptionen.",
      enterMessage: "Bitte geben Sie die zu sendende Nachricht ein.",
      enterMediaDetails: "Bitte geben Sie die URL und Beschreibung der hochzuladenden Datei ein.",
      enterAudioDetails: "Bitte geben Sie die URL der Audiodatei ein.",
      uploadFile: "Bitte laden Sie die Datei hoch und geben Sie die Beschreibung ein, die gesendet werden soll.",
      uploadingMessages: "Bitte warten Sie, Ihre Nachrichten werden geladen.",
      messagesSent: "Nachrichten gesendet: {sent} von {total}.",
      errorSendingMessages: "Fehler beim Senden der Nachrichten.",
      errorFetchingTags: "Fehler beim Abrufen der Tags.",
      errorFetchingKanbans: "Fehler beim Abrufen der Kanbans.",
      errorFilteringContactsByTag: "Fehler beim Filtern der Kontakte nach Bezeichnung.",
      errorFilteringContactsByKanban: "Fehler beim Filtern der Kontakte nach Kanban.",
      destiny: "Bitte geben Sie Zielnummern ein"
    }
  },
  massaTextoVariavel: {
    form: {
      availableFunctions: "Verfügbare Funktionen für Baileys und Whatsapp-Web.JS",
      minSeconds: "Minimum (Sekunden)",
      maxSeconds: "Maximum (Sekunden)",
      includeText: "Text einschließen",
      includeMedia: "Medien einschließen (URL)",
      mediaUrl: "Medien-URL",
      mediaDescription: "Medienbeschreibung",
      includeRecordedAudio: "Aufgezeichnetes Audio einschließen",
      audioUrl: "Audio-URL (.ogg)",
      includeFile: "Datei einbinden (Upload)",
      recordedAudio: "Aufgezeichnetes Audio",
      send: "Senden",
      clear: "Reinigen",
      dataInputLabel: "Zahl, Variable1, Variable2, Variable3 …",
      instructions: "Geben Sie Ihre Mediennachricht/Beschreibung ein und verwenden Sie die Variablen in doppelten geschweiften Klammern.",
      example: "Beispiel: Hallo, var1! Ihr Status ist var2 und Ihr Alter ist var3..."
    },
    notifications: {
      enterValidNumbers: "Bitte geben Sie gültige Zahlen für Min. und Max. ein.",
      destiny: "Bitte geben Sie Zielnummern ein.",
      chooseSendOption: "Bitte wählen Sie eine oder mehrere Versandoptionen.",
      enterMessage: "Bitte geben Sie die zu sendende Nachricht ein.",
      enterMediaDetails: "Bitte geben Sie die URL und Beschreibung der hochzuladenden Datei ein.",
      enterAudioDetails: "Bitte geben Sie die URL der hochzuladenden Datei ein.",
      uploadFile: "Bitte laden Sie die Datei hoch und geben Sie die Beschreibung ein, die gesendet werden soll.",
      uploadingMessages: "Bitte warten Sie, Ihre Nachrichten werden geladen.",
      messagesSent: "Nachrichten gesendet: {sent} von {total}."
    }
  },
  massaTemplate: {
    title: "Massenmailings",
    form: {
      selectTemplate: "Vorlage auswählen",
      selectTag: "Beschriftung auswählen",
      fetchingContacts: "Bitte warten, Kontakte werden geladen …",
      numbersCommaSeparated: "Zahlen durch Kommas getrennt",
      importCSV: "CSV importieren",
      minSeconds: "Minimum (Sekunden)",
      maxSeconds: "Maximum (Sekunden)",
      contacts: "Kontakte",
      selectConnection: "Wählen Sie eine Verbindung",
      errorFetchingTags: "Fehler beim Laden der Etiketten",
      chooseTemplate: "Wählen Sie eine Vorlage",
      headerFormat: "Header-Format: {format}",
      variableNumber: "Wert",
      closeTicket: "Ticket nach dem Senden schließen"
    },
    notifications: {
      chooseMinTime: "Bitte wählen Sie eine Mindestzeit.",
      chooseMaxTime: "Bitte wählen Sie eine Maximalzeit, die größer als die Minimalzeit ist.",
      chooseConnection: "Bitte wählen Sie eine Verbindung.",
      chooseContact: "Bitte wählen Sie einen Kontakt aus.",
      messagesSent: "Gesendete Vorlagen: {sent} von {total}.",
      errorSendingTemplate: "Fehler beim Senden der Vorlagen.",
      uploadingMessages: "Bitte warten, Nachrichten werden gesendet ... Schließen Sie diese Seite nicht, bis das Senden abgeschlossen ist.",
      uploadingTemplate: "Bitte warten, Vorlagen werden geladen …",
      errorFetchingTags: "Fehler beim Abrufen der Tags.",
      errorUploadingCSV: "Fehler beim Hochladen der CSV-Datei.",
      invalidFileType: "Ungültiger Dateityp. Nur CSV-Dateien sind erlaubt.",
      csvUploadedSuccessfully: "CSV-Datei erfolgreich hochgeladen.",
      errorProcessingCSV: "Fehler beim Verarbeiten der CSV-Datei.",
      errorReadingFile: "Fehler beim Lesen der Datei.",
      invalidCSVContent: "Ungültiger CSV-Inhalt.",
      noValidNumbersFound: "Keine gültigen Nummern in der CSV-Datei gefunden."
    },
    table: {
      variable: "Variable",
      value: "Wert"
    }
  },
  massaTemplateVariavel: {
    title: "Massenmailings mit Variablen",
    form: {
      availableFunctions: "Diese Funktion ist für die offizielle API (WABA) verfügbar.",
      chooseTemplate: "Vorlage auswählen",
      minSeconds: "Minimum (Sekunden)",
      maxSeconds: "Maximum (Sekunden)",
      numberFormat: "Zahlen (Format: Zahl, Variable1, Variable2)",
      fetchingTemplates: "Vorlagen werden geladen..."
    },
    notifications: {
      messagesSent: "Gesendete Vorlagen: {sent} von {total}.",
      uploadingMessages: "Bitte warten, Nachrichten werden gesendet … Schließen Sie diese Seite nicht, bis der Versand abgeschlossen ist.",
      chooseConnection: "Bitte wählen Sie eine Verbindung.",
      chooseTemplate: "Bitte wählen Sie eine Vorlage aus.",
      completeFields: "Bitte füllen Sie alle erforderlichen Felder aus.",
      sendingCompleted: "Einreichungen abgeschlossen.",
      errorFetchingTemplates: "Fehler beim Laden der Vorlagen. Überprüfen Sie Ihre API-Verbindung."
    },
    variables: {
      templateVariables: "Vorlagenvariablen",
      expectedFormat: "Erwartetes Format für jede Zeile: Zahl, {Variablen}"
    }
  },
  sessao: {
    compactView: "Kompakte Ansicht",
    normalView: "Normale Ansicht",
    page: "Seite",
    title: "Kommunikationskanäle",
    addChannel: "Kanal hinzufügen",
    defaultConnection: "Standardanschluss",
    editChannel: "Kanal bearbeiten",
    revalidateWebhook: "Webhook erneut validieren",
    revalidateCoexWebhook: "COEX Webhook erneut validieren",
    revalidateConnection: "Verbindung erneut validieren",
    coexWebhookRevalidated: "COEX Webhook erfolgreich erneut validiert!",
    metaTokenNotFound: "Meta-Token nicht gefunden. Konfigurieren Sie das Token im Einstellungsbereich.",
    phoneNumberIdNotFound: "Telefonnummer-ID nicht gefunden.",
    chatbot: "ChatBot",
    queue: "Warteschlange",
    user: "Benutzer",
    qrCode: "QR-Code",
    connect: "Verbinden",
    edit: "Bearbeiten",
    newQrCode: "Neuer QR-Code",
    connecting: "Verbinden",
    disconnect: "Trennen",
    deleteConnection: "Verbindung löschen",
    setAsDefault: "Als Standard festlegen",
    closeOpenTickets: "Schließen Sie alle offenen Dienste",
    closePendingTickets: "Alle ausstehenden Anrufe schließen",
    syncMessagesUpdate: "Aktualisieren der Nachrichtensynchronisierungszeit",
    syncMessages: "Nachrichten synchronisieren",
    syncPrompt: "Aufmerksamkeit!! Möchten Sie wirklich synchronisieren? ",
    syncMessagesPrompt: "Begrenzung der zu importierenden Nachrichten",
    syncWarningPrompt: "Der Vorgang kann je nach Größe Ihrer Chatliste einige Minuten dauern.",
    syncMessagesHint: "Es sind nur positive Zahlen zulässig",
    noQueueTooltip: "Die Warteschlange wird nur zugewiesen, wenn für den Dienst nicht bereits eine manuell oder vom Chatbot definierte Warteschlange vorhanden ist.",
    noUserTooltip: "Eine Zuweisung des Benutzers erfolgt nur, wenn für den Dienst noch kein manuell oder durch den Chatbot definierter Betreuer vorhanden ist.",
    processStarted: "Prozess gestartet.",
    closingOpenTickets: "Schließung offener Termine.",
    closingPendingTickets: "Ausstehende Dienste werden geschlossen.",
    syncingMessages: "Bitte warten Sie einen Moment, das System importiert {limit} Nachrichten pro Benutzer.",
    syncError: "Beim Versuch, Nachrichten zu synchronisieren, ist ein Fehler aufgetreten.",
    invalidValue: "Der vom Benutzer eingegebene Wert ist ungültig oder wurde nicht angegeben.",
    actionError: "Beim Versuch, die Aktion auszuführen, ist ein Fehler aufgetreten.",
    actionSuccess: "Aktion erfolgreich ausgeführt.",
    noPageConfigured: "Keine Seite konfiguriert.",
    selectChatbot: "ChatBot auswählen",
    selectQueue: "Warteschlange auswählen",
    selectUser: "Benutzer auswählen",
    defaultTooltip: "Legen Sie diese Verbindung als Standard fest.",
    deleteTooltip: "Diese Verbindung dauerhaft löschen.",
    syncTooltip: "Synchronisieren Sie alte Nachrichten.",
    actionWarningDelete: "Aufmerksamkeit! Möchten Sie diese Verbindung wirklich löschen?",
    disconnectWarning: "Aufmerksamkeit! Möchten Sie diese Sitzung wirklich trennen?",
    defaultSet: "Verbindung erfolgreich auf Standard gesetzt.",
    closeOpenTicketsPrompt: "Aufmerksamkeit!! Möchten Sie wirklich alle offenen Anrufe dieses Kanals schließen?",
    closePendingTicketsPrompt: "Aufmerksamkeit!! Möchten Sie wirklich alle ausstehenden Anrufe dieses Kanals schließen?",
    disconnectPrompt: "Aufmerksamkeit!! Möchten Sie die Verbindung wirklich trennen?",
    deleteChannelPrompt: "Aufmerksamkeit!! Möchten Sie wirklich löschen?",
    deleteChannelMessage: "Offene Chats in diesem Kanal werden geschlossen und sind im Support-Panel sichtbar, aber nicht mehr zugänglich.",
    tokenRequiredTelegram: "Es ist notwendig, das Token für Telegram anzugeben.",
    qrCodeGenerated: "QR-Code erfolgreich generiert.",
    errorGeneratingQrCode: "Fehler beim Generieren des QR-Codes.",
    whatsappSaveError: "Fehler beim Speichern der WhatsApp-Nummer.",
    whatsappSaved: "Verbindung erfolgreich hinzugefügt."
  },
  sessaoItemStatus: {
    waitingQrCode: "Warten auf das Lesen des QR-Codes",
    clickQrCodeButton: "Klicken Sie auf die Schaltfläche „QR-CODE“ und lesen Sie den QR-Code mit Ihrem Mobiltelefon, um die Sitzung zu starten",
    disconnectedError: "Die Kommunikation für diesen Kanal konnte nicht gestartet werden.",
    whatsappDisconnected: "Stellen Sie sicher, dass Ihr Telefon mit dem Internet verbunden ist, und versuchen Sie es erneut oder fordern Sie einen neuen QR-Code an.",
    wabaDisconnected: "Versuchen Sie erneut, eine Verbindung herzustellen. Wenn der Fehler weiterhin besteht, bestätigen Sie, dass die Token korrekt sind.",
    telegramDisconnected: "Versuchen Sie erneut, eine Verbindung herzustellen. Wenn der Fehler weiterhin besteht, bestätigen Sie, dass das Token korrekt ist.",
    instagramDisconnected: "Versuchen Sie erneut, eine Verbindung herzustellen. Wenn der Fehler weiterhin besteht, bestätigen Sie, dass die Anmeldeinformationen korrekt sind.",
    connectionEstablished: "Verbindung hergestellt",
    noDataLoading: "Daten werden geladen...",
    lostConnection: "Mobilfunkverbindung verloren",
    checkPhoneConnection: "Stellen Sie sicher, dass Ihr Telefon mit dem Internet verbunden und WhatsApp geöffnet ist, oder klicken Sie auf die Schaltfläche „Trennen“, um einen neuen QR-Code zu erhalten.",
    establishingConnection: "Verbindung wird hergestellt.",
    mightTakeTime: "Dies kann eine Weile dauern ...",
    lastUpdate: "Letztes Update",
    contingencyInactive: "Notfallplan"
  },
  sessaoModalQrcode: {
    title: "Scannen Sie den QR-Code, um die Sitzung zu starten",
    pairingCode: "Kopplungscode: ",
    waitingQrCode: "Warten auf den QR-Code",
    openQrCodeInNewTab: "QR-Code in neuem Tab öffnen",
    qrCodeIssue: "Wenn Sie Probleme beim Lesen haben, fordern Sie einen neuen QR-Code an.",
    newQrCode: "Neuer QR-Code"
  },
  sessaoModalWhatsapp: {
    messengerPageId: "Messenger-Seiten-ID",
    appId: "App-ID",
    instagramId: "Instagram-ID",
    tokenInstagram: "Instagram-Token",
    tokenNumber: "Token-Nummer",
    idNumber: "ID-Nummer",
    novo: {
      configuracaoSmtp: "SMTP-Konfiguration",
      servidorSmtp: "SMTP-Server",
      exemploSmtp: "Beispiel: smtp.gmail.com",
      porta: "Port",
      exemploPorta: "Beispiel: 587 für TLS, 465 für SSL",
      conexaoSegura: "Sichere Verbindung (SSL/TLS)",
      habilitarConexaoSegura: "Für sichere Verbindungen aktivieren",
      usuarioEmail: "Benutzer/E-Mail",
      seuEmailAutenticacao: "Ihre Authentifizierungs-E-Mail",
      senha: "Passwort",
      senhaAplicativo: "Ihr Passwort oder App-Passwort",
      emailRemetente: "Absender-E-Mail",
      emailRemetenteHint: "E-Mail, die als Absender angezeigt wird",
      emailResposta: "Antwort-E-Mail (optional)",
      emailRespostaHint: "E-Mail, an die Antworten gesendet werden",
      configuracaoOAuth2: "OAuth2-Konfiguration (empfohlen für Gmail)",
      clientIdOAuth2: "Client-ID von Google Cloud Console",
      clientIdOAuth2Hint: "Client-ID von Google Cloud Console",
      exemploClientIdOAuth2: "Beispiel: 123456789-abcdef.apps.googleusercontent.com",
      clientSecretOAuth2: "Client Secret von Google Cloud Console",
      clientSecretOAuth2Hint: "Client Secret von Google Cloud Console",
      redirectUri: "Redirect-URI (optional)",
      redirectUriHint: "Callback-URL für OAuth2 (leer lassen, um Standard zu verwenden)",
      exemploRedirectUri: "Beispiel: https://seudominio.com/auth/callback",
      comoObterCredenciaisOAuth2: "So erhalten Sie OAuth2-Anmeldedaten:",
      acessarGoogleCloudConsole: "Gehe zu https://console.cloud.google.com",
      criarProjeto: "Erstellen Sie ein Projekt oder wählen Sie ein bestehendes aus",
      habilitarGmailAPI: "Aktivieren Sie die Gmail-API",
      criarCredenciaisOAuth2: "OAuth2-Anmeldedaten erstellen",
      configureUrlsAutorizadas: "Autorisierte URLs konfigurieren",
      gmailOAuth2: "Gmail OAuth2:",
      gmailOAuth2Hint: "Gmail erfordert OAuth2-Authentifizierung für Drittanbieteranwendungen.",
      configurarOAuth2: "OAuth2 konfigurieren",
      status: "Status:",
      statusHint: "Authentifiziert und funktionsfähig",
      oAuth2Configurado: "OAuth2 konfiguriert:",
      oAuth2ConfiguradoHint: "OAuth2-Authentifizierung für Gmail aktiv.",
      protocoloAtivo: "Aktives Protokoll:",
      statusDaConexao: "Verbindungsstatus:",
      detalhes: "Details:",
      testarSmtp: "SMTP testen",
      verificarStatus: "Status prüfen",
      abraUrlAutorizacao: "Öffnen Sie die Autorisierungs-URL und folgen Sie den Anweisungen. Nach der Autorisierung erhalten Sie einen Code.",
      errorConfigurarOAuth2: "Fehler bei der OAuth2-Konfiguration: ",
      configOAuth2: "OAuth2-Konfiguration",
      completarConfiguracao: "Konfiguration abschließen",
      cancelar: "Abbrechen",
      errorCompletarOAuth2: "Fehler beim Abschließen von OAuth2: ",
      salveWhatsAppPrimeiro: "Speichern Sie zuerst WhatsApp, um die SMTP-Verbindung zu testen",
      conexaoSmtpTestadaComSucesso: "SMTP-Verbindung erfolgreich getestet!",
      falhaNoTesteSmtp: "Fehler beim SMTP-Test: ",
      erroAoTestarSmtp: "Fehler beim Testen von SMTP: ",
      statusDaConexaoAtualizado: "Verbindungsstatus aktualisiert!",
      erroAoVerificarStatus: "Fehler beim Überprüfen des Status: "
    },    
    selectNewChannel1: "Die Übertragung von Unterhaltungen kann bei hohem Volumen oder zwischen unterschiedlichen Kanaltypen (APIs) zu Synchronisationsproblemen führen. Erstellen Sie in diesem Fall vorher ein Backup der Unterhaltungen und löschen Sie den alten Kanal nicht, bevor Sie sicher sind, dass alle Unterhaltungen übertragen wurden.",
    selectNewChannel2: "Wählen Sie den neuen Kanal zur Übertragung der Unterhaltungen. Achtung! Diese Aktion ist unwiderruflich.",
    selectNewChannel3: "Bei hohem Volumen oder verschiedenen API-Typen sollten die Daten direkt in der Datenbank mit Hilfe eines DBAs geändert werden.",
    transferringChannels: "Anrufe werden weitergeleitet...",
    checkErrors: "Hoppla! Auf Fehler prüfen...",
    whatsappSaved: "Verbindung ",
    sucess: " erfolgreich!",
    edited: "bearbeitet",
    created: "erstellt",
    variables: "Variablen",
    attentionEvo: "Sobald der Evolution-Kanal erstellt ist, kann der Name nicht mehr bearbeitet werden. Vermeiden Sie die Verwendung von Leerzeichen oder Sonderzeichen, da diese automatisch entfernt werden.",
    title: "Kanal hinzufügen oder bearbeiten",
    editChannel: "Kanal hinzufügen oder bearbeiten",
    createChannel: "Kanal hinzufügen oder bearbeiten",
    configureAfterCreate: "Dieses Feld kann nach der Erstellung des Kanals konfiguriert werden",
    type: "Typ",
    tokenTelegram: "Telegramm-Token",
    pairingCode: "Paarungscode",
    exactNumber: "Genaue WhatsApp-Kontonummer",
    informationTab: "Information",
    recommendationsTab: "Empfehlungen",
    wppWarning: {
      0: "Bevor Sie Ihr WhatsApp mit dem System verbinden, entfernen Sie die Verbindung zu WhatsApp Web.",
      1: "Auf das Smartphone kommt es an",
      2: "Erfordert eine regelmäßige Neuverbindung.",
      3: "Für einen reibungslosen Betrieb halten Sie Ihr Telefon synchronisiert, immer eingeschaltet und mit dem Internet verbunden, deaktivieren Sie den Bildschirmschoner und lassen Sie die WhatsApp-App geöffnet.",
      4: "Archivieren Sie unnötige oder ältere Gespräche auf Ihrem Mobiltelefon",
      5: "Wir empfehlen die Verwendung des Chrome-Browsers und des Windows-Betriebssystems.",
      6: "Öffnen Sie WhatsApp Web nicht mit der auf der Plattform synchronisierten Nummer in einem anderen Browser. In diesem Fall kann der Betrieb beeinträchtigt werden.",
      7: "Inoffizieller Dienst",
      8: "Erfordert regelmäßige Neuverbindung",
      9: "Verwenden Sie vorzugsweise VPS mit Standorten in Brasilien und Ihrem Bundesstaat",
      10: "Wir empfehlen die Verwendung des Chrome-Browsers und des Windows-Betriebssystems.",
      11: "Kann Synchronisationsprobleme wie Verlust und Empfang von Nachrichten aufweisen"
    },
    wabaAdvantages: {
      0: "Garantierte Verbindungsstabilität",
      1: "Kein Risiko eines Verbots",
      2: "Sicherheit gegen Kontodiebstahl",
      3: "Ermöglicht die Verwendung von Schaltflächen",
      4: "Ermöglicht die Verwendung von Vorlagen"
    },
    typeMessage: "Geben Sie die Nachricht ein",
    save: "Speichern",
    user: "Benutzer",
    numberId: "Telefonnummernidentifikation",
    bmId: "Identifizierung des WhatsApp Business-Kontos",
    apiVersion: "Meta-API-Version",
    tokenWaba: "Meta Business Manager-Token",
    igData: "Instagram-Kontodetails",
    transferChannel: "Übertragungskanal",
    selectNewChannel: "Neuen Kanal zum Weiterleiten von Anrufen auswählen",
    newChannel: "Neuer Kanal",
    confirm: "Bestätigen",
    attention: "Aufmerksamkeit",
    cancel: "Stornieren",
    timeSelection: "Zeit auswählen",
    birthdayDateMessage: "Geburtstagsnachricht",
    selectHub: "Wählen Sie einen Hub aus",
    importMessage: "Nachrichten vom Gerät importieren",
    importMessageCaption: "Durch Aktivieren dieser Option werden Nachrichten vom Gerät in das System importiert.",
    importGroupMessage: "Gruppennachrichten importieren",
    dateHourSync: "Startdatum und -uhrzeit des Imports",
    queueImport: "Warteschlange zum Importieren von Nachrichten",
    qrCodeWarning1: "Dieses Ereignis funktioniert nur beim Lesen des QR-Codes.",
    qrCodeWarning2: "Schalten Sie während des Imports den internen Chatbot und andere Interaktionen aus und lassen Sie die Betriebszeiten offen, da jede Nachricht, die in das System eingeht, mit diesen Einstellungen interagiert, sofern sie aktiv sind.",
    ok: "OK",
    dateHourEndSync: "Enddatum und -uhrzeit des Imports",
    finalizeTicket: "Schließen von Tickets nach dem Import",
    chatGptConfig: {
      model: "ChatGPT-Vorlage",
      title: "ChatGPT-Einstellungen",
      apiKey: "ChatGPT-API-Schlüssel",
      organizationKey: "ChatGPT-Organisationsschlüssel",
      stopWord: "Wort zum Deaktivieren von ChatGPT",
      prompt: "Option Nr. 1: ChatGPT-Eingabeaufforderung",
      resetHistory: "ChatGPT-Verlauf wiederherstellen",
      assistantOption: "Option Nr. 2: ChatGPT-Assistenten",
      assistantId: "Assistenten-ID eingeben",
      resetPrompt: "Nach dem Ändern der Eingabeaufforderung sollte der ChatGPT-Verlauf durch Klicken auf die Schaltfläche unten wiederhergestellt werden:",
      removeAssistant: "Assistent zum Entfernen",
      voiceModel: "Stimmmodell (Legierung, Echo, Fabel, Onyx, Nova, Schimmer)",
      chatgptVoice: "Sprachantworten aktivieren (ChatGPT Voice)"
    },
    lmConfig: {
      title: "LM Studio-Einstellungen",
      url: "LM Studio URL",
      model: "LLMs-Modell",
      stopWord: "Wort zum Ausschalten von LM Studio",
      prompt: "Eingabeaufforderung für LLMs"
    },
    geminiConfig: {
      title: "Gemini-Einstellungen",
      url: "Gemini API-Schlüssel",
      model: "Gemini-Modell",
      stopWord: "Wort zum Ausschalten von Gemini",
      prompt: "Eingabeaufforderung für Gemini"
    },
    qwenConfig: {
      title: "Qwen-Einstellungen",
      url: "Qwen API-Schlüssel",
      model: "Qwen-Modell",
      stopWord: "Wort zum Ausschalten von Qwen",
      prompt: "Eingabeaufforderung für Qwen"
    },
    claudeConfig: {
      title: "Claudes Einstellungen",
      url: "Claudes API-Schlüssel",
      model: "Claudes Modell",
      stopWord: "Wort, um Claude auszuschalten",
      prompt: "Eingabeaufforderung für Claude"
    },
    deepseekConfig: {
      title: "Deepseek-Einstellungen",
      url: "Deepseek API-Schlüssel",
      model: "Deepseek-Modell",
      stopWord: "Wort zum Ausschalten von Deepseek",
      prompt: "Eingabeaufforderung für Deepseek"
    },
    grokConfig: {
      title: "Grok-Einstellungen",
      url: "Grok API-Schlüssel",
      model: "Grok-Modell",
      stopWord: "Wort zum Ausschalten von Grok",
      prompt: "Eingabeaufforderung für Grok"
    },
    ollamaConfig: {
      title: "Ollama-Einstellungen",
      url: "Ollama-URL",
      model: "LLMs-Modell",
      stopWord: "Wort zum Ausschalten von Ollama",
      prompt: "Eingabeaufforderung für LLMs"
    },
    proxyConfig: {
      useProxy: "Proxy verwenden",
      proxyUrl: "Proxy-URL",
      proxyUser: "Proxy-Benutzer",
      proxyPass: "Proxy-Passwort"
    },
    enable: {
      webPush: "Web Push aktivieren ",
      webPush2: "Durch Aktivieren dieser Option sendet das System Benachrichtigungen an die Anwendung",
      contingency: "Notfall",
      contingency2: "Wenn aktiv: Der Kanal ist aktiv und empfängt Nachrichten. Wenn inaktiv: Der Kanal bleibt verbunden, empfängt aber keine Nachrichten.",
      autoEvaluation: "Automatische Auswertung aktivieren",
      autoEvaluation2: "Durch Aktivieren dieser Option wird die Servicebewertung automatisch bei der Lösung jedes Tickets gesendet.",
      transcribeAudio: "Audiotranskription aktivieren",
      transcribeAudio2: "Durch Aktivieren dieser Option werden empfangene Audios transkribiert.",
      transcribeAudio5: "JSON-Konfiguration",
      transcribeAudio4: "Geben Sie die Einstellungen für Google Speech-To-Text im JSON-Format ein.",
      transcribeAudio3: "Konfiguration der Audiotranskription (JSON)",
      autoDistribution: "Automatische Verteilung aktivieren",
      autoDistribution2: "Durch Aktivieren dieser Option werden neue Tickets gleichmäßig unter den Mitarbeitern des Systems verteilt.",
      destroyMessage: "Nachrichtenvernichtung aktivieren",
      destroyMessage2: "Durch Aktivieren dieser Option werden entfernte Nachrichten aus dem System vernichtet.",
      birthdayMessage: "Senden von Nachrichten an Geburtstagskinder aktivieren",
      birthdayMessage2: "Wenn Sie diese Option am Geburtstag des Kontakts aktivieren, wird die im Feld unten definierte Nachricht gesendet.",
      birthdayMessage3: "Geburtstagsnachricht",
      birthdayMessage4: "Nachricht",
      birthdayMessage5: "Datei (Laden Sie die Datei nach dem Erstellen des Kanals hoch)",
      birthdayMessage6: "Datei auswählen",
      birthdayMessage7: "Zeit: Das System berücksichtigt keine Minuten (geben Sie die volle Zeit ein, z. B. 12:00):",
      birthdayMessage8: "Wählen Sie die Zeit",
      ignoreBussinesHours: "Geschäftszeiten ignorieren",
      ignoreBussinesHours2: "Ignoriert die Geschäftszeiten des Systems.",
      removeBirthdayFile: "Geburtstagsnachrichten-Datei entfernen",
      confirmRemoveBirthdayFile: "Entfernen bestätigen",
      confirmRemoveBirthdayFileMessage: "Möchten Sie wirklich die Geburtstagsnachrichten-Datei entfernen?",
      birthdayFileRemoved: "Geburtstagsnachrichten-Datei erfolgreich entfernt!",
      externalIntegration: "Automatisches Herunterfahren externer Integrationen aktivieren",
      externalIntegration2: "Durch Aktivieren dieser Option werden beim Öffnen eines Dienstes die Interaktionen von ChatGPT, Typebot, Dify, N8N und DialogFlow deaktiviert.",
      waitProcessExternalInteraction: "Aktivieren Sie das Warten auf die Nachrichtenverarbeitung mit externen Integrationen (Typebot, ChatGPT …).",
      waitProcessExternalInteraction2: "Wenn Sie im Support mehr als eine Nachricht erhalten, verarbeitet das System neue Nachrichten erst, nachdem auf die erste Nachricht geantwortet wurde. In der Zwischenzeit empfangene Nachrichten interagieren nicht mit der externen Integration."
    },
    farewell: "Lebewohl",
    farewellMessage: "Abschiedsnachricht des Gottesdienstes",
    automaticClosure: "Schlüsselwort zum automatischen Schließen",
    automaticClosure2: "Dies ist ein Schlüsselwort, das bei Erhalt das Ticket automatisch schließt.",
    wavoipWarn: "Um mehr als ein Token zu verbinden, geben Sie die Schlüssel durch Kommas getrennt ein (Token1, Token2 …).",
    whatsappTypes: {
      waba: "WhatsApp Official (WABA)",
      baileys: "WhatsApp Baileys (QRCode)",
      whatsapp: "WhatsApp WebJs (QRCode)",
      meow: "WhatsApp Meow ",
      evo: "WhatsApp Evolution ",
      telegram: "Telegramm",
      hub: "Hub-Benachrichtigung"
    },
    conectLimit: "Verbindungslimit erreicht",
    saveError: "Fehler beim Speichern des Kanals. Bitte versuchen Sie es erneut.",
    wabaError: "Hoppla! Falsche WABA-Daten. Bitte überprüfen Sie, ob die APP-Kennungen, Token und Berechtigungen in Ihrem BM korrekt sind ...",
    instagramError: "Hoppla! Falsche Instagram-Daten. Bitte überprüfen Sie, ob die Page ID, Token und Berechtigungen korrekt sind und ob das Instagram Business-Konto mit der Facebook-Seite verknüpft ist ...",
    integrationUrlCopied: "Integrations-URL kopiert!",
    attentionMessage: "Möchten Sie wirklich alle Dienste auf den neuen Kanal übertragen? Diese Aktion ist irreversibel.",
    noChannelSelected: "Wähle den neuen Kanal!",
    newChannelSuccess: "Kanal erfolgreich übertragen!",
    connectionError: "Fehler beim Übertragen des Kanals. Bitte versuchen Sie es erneut.",
    autoDistributeInfo: "Verteilen Sie Tickets automatisch unter den verfügbaren Agenten.",
    transcribeAudioInfo: "Automatische Transkription empfangener Audios in Text.",
    birthdayMessageInfo: "Konfiguration zum automatischen Senden von Geburtstagsnachrichten an Kontakte.",
    farewellInfo: "Beim Schließen eines Dienstes wird automatisch eine Nachricht gesendet.",
    confirmChannelTransfer: "Möchten Sie Anrufe wirklich an diesen Kanal weiterleiten?",
    importMessagesInfo: "Importieren Sie Nachrichten vom Gerät in das System.",
    importGroupsInfo: "Schließen Sie beim Importieren Gruppennachrichten ein.",
    externalIntegrationDisableInfo: "Deaktivieren Sie externe Integrationen automatisch, wenn Sie Anrufe starten.",
    dialogflowConfig: {
      projectId: "Dialogflow-Projekt-ID",
      language: "Sprache",
      jsonFile: "JSON-Konfigurationsdatei",
      jsonContent: "JSON-Dateiinhalte"
    },
    wavoip: {
      title: "Wavoip-Einstellungen",
      token: "Wavoip-Token",
      info: "Fügen Sie durch Kommas getrennte Token für mehrere Konten hinzu."
    },
    hubConfig: {
      title: "Hub-Einstellungen",
      selectHub: "Wählen Sie einen Hub",
      hubIntegration: "NotifyaMe Hub-Konfiguration"
    },
    n8nConfig: {
      title: "N8N-Einstellungen",
      url: "N8N-URL",
      instructions: "Konfigurieren Sie in diesem Abschnitt den Integrationsfluss mit N8N."
    },
    dialogConfig: {
      title: "Dialogflow-Einstellungen",
      key: "Dialogflow-API-Schlüssel",
      url: "Dialogflow-URL",
      name: "Bot-Name im Dialogflow",
      restartWord: "Word zum Neustarten von Dialogflow",
      stopWord: "Word zum Deaktivieren von Dialogflow",
      jsonContent: "Inhalt der JSON-Datei",
      jsonFile: "JSON-Dateiname",
      lang: "Sprache",
      projectId: "Projekt-ID",
      buttonWarning: "Wenn Sie diese Option aktivieren, werden Schaltflächen an die Dialogflow-Optionen gesendet, andernfalls werden Listen gesendet."
    },
    typeConfig: {
      title: "Typebot-Einstellungen",
      key: "Typebot-API-Schlüssel",
      url: "Typebot-URL",
      name: "Bot-Name auf Typebot",
      restartWord: "Word zum Neustarten von Typebot",
      stopWord: "Wort zum Ausschalten von Typebot",
      type: "Konfigurationstyp",
      unknowMessage: "Nachricht für ungültige Antwort",
      buttonChoose: "Meldung zur Schaltflächenauswahl",
      buttons: "Schaltflächen aktivieren",
      buttonWarning: "Wenn Sie diese Option aktivieren, werden Schaltflächen an die Typebot-Optionen gesendet, andernfalls werden Listen gesendet."
    },
    difyConfig: {
      title: "Dify-Einstellungen",
      key: "Dify API-Schlüssel",
      url: "URL angeben",
      restartWord: "Wort zum Neustarten von Dify",
      stopWord: "Wort zum Ausschalten von Dify",
      type: "Konfigurationstyp",
      typeOptions: {
        agent: "Agent",
        textGenerator: "Textgenerator",
        chatBot: "ChatBot",
        workflow: "Fließen"
      }
    },
    additionalSettings: {
      title: "Zusätzliche Ebenen für inoffizielle Dienste",
      proxy: {
        useProxy: "Proxy verwenden",
        proxyUrl: "Proxy-URL (https://177.69.214.155:53281)",
        proxyUser: "Proxy-Benutzer",
        proxyPass: "Proxy-Passwort"
      }
    },
    waiting: "Bitte warten Sie, es wird versucht, Ihren Kanal zu erstellen …",
    errors: {
      invalidJson: "Das eingegebene JSON-Format ist ungültig. Bitte korrigieren Sie den Fehler und versuchen Sie es erneut.",
      requiredField: "Dieses Feld ist erforderlich.",
      operationFailed: "Der Vorgang ist fehlgeschlagen. Bitte versuchen Sie es erneut."
    },
    success: {
      operationCompleted: "Der Vorgang wurde erfolgreich abgeschlossen!",
      channelSaved: "Der Kanal wurde erfolgreich gespeichert!",
      transferCompleted: "Übertragung erfolgreich abgeschlossen!"
    },
    variaveis: {
      0: {
        label: "Name",
        value: "{{Name}}"
      },
      1: {
        label: "Gruß",
        value: "{{Gruß}}"
      },
      2: {
        label: "Protokoll",
        value: "{{Protokoll}}"
      },
      3: {
        label: "E-Mail (falls verfügbar)",
        value: "{{E-Mail}}"
      },
      4: {
        label: "Telefon",
        value: "{{phoneNumber}}"
      },
      5: {
        label: "Kanban (falls vorhanden)",
        value: "{{Kanban}}"
      },
      6: {
        label: "Begleiter (falls anwesend)",
        value: "{{Benutzer}}"
      },
      7: {
        label: "E-Mail des Mitarbeiters (falls im Dienst)",
        value: "{{userEmail}}"
      },
      8: {
        label: "Vorname (falls vorhanden)",
        value: "{{Vorname}}"
      },
      9: {
        label: "Nachname (falls vorhanden)",
        value: "{{Nachname}}"
      },
      10: {
        label: "Firma (falls vorhanden)",
        value: "{{businessName}}"
      }
    },
    variaveisAniversario: {
      0: {
        label: "Name",
        value: "{{Name}}"
      },
      1: {
        label: "Gruß",
        value: "{{Gruß}}"
      },
      2: {
        label: "E-Mail (falls verfügbar)",
        value: "{{E-Mail}}"
      },
      3: {
        label: "Telefon",
        value: "{{phoneNumber}}"
      },
      4: {
        label: "Vorname (falls vorhanden)",
        value: "{{Vorname}}"
      },
      5: {
        label: "Nachname (falls vorhanden)",
        value: "{{Nachname}}"
      },
      6: {
        label: "Firma (falls vorhanden)",
        value: "{{businessName}}"
      }
    }
  },
  sessaoTenant: {
    communicationChannels: "Kommunikationskanäle",
    tenant: "Mieter",
    name: "Name",
    status: "Status",
    session: "Sitzung",
    number: "Nummer",
    lastUpdate: "Letztes Update",
    default: "Standard",
    actions: "Aktionen",
    editConnection: "Verbindung bearbeiten",
    deleteConnection: "Verbindung löschen",
    deleteAttention: "Aufmerksamkeit!! Möchten Sie wirklich löschen?",
    deleteWarning: "Das Löschen ist keine gute Idee, wenn Sie bereits Anrufe für dieses WhatsApp generiert haben.",
    yes: "Ja",
    no: "NEIN",
    errorLoadingColors: "Fehler beim Laden der Farben"
  },
  sessaoTenantStatus: {
    waitingQrCode: "Warten auf das Lesen des QR-Codes",
    clickQrCodeButton: "Klicken Sie auf die Schaltfläche „QR-CODE“ und scannen Sie den QR-Code mit Ihrem Mobiltelefon, um die Sitzung zu starten",
    connectionFailed: "Die Kommunikation für diesen Kanal konnte nicht gestartet werden.",
    whatsappCheck: "Stellen Sie sicher, dass Ihr Telefon mit dem Internet verbunden ist, und versuchen Sie es erneut oder fordern Sie einen neuen QR-Code an",
    telegramCheck: "Versuchen Sie erneut, eine Verbindung herzustellen. Wenn der Fehler weiterhin besteht, bestätigen Sie, dass das Token korrekt ist.",
    instagramCheck: "Versuchen Sie erneut, eine Verbindung herzustellen. Wenn der Fehler weiterhin besteht, bestätigen Sie, dass die Anmeldeinformationen korrekt sind.",
    connectionEstablished: "Verbindung hergestellt!",
    connectionLost: "Mobilfunkverbindung verloren",
    ensureInternet: "Stellen Sie sicher, dass Ihr Telefon mit dem Internet verbunden ist und WhatsApp geöffnet ist, oder klicken Sie auf die Schaltfläche „Trennen“, um einen neuen QR-Code zu erhalten",
    establishingConnection: "Verbindung wird hergestellt.",
    thisMayTakeTime: "Dies kann eine Weile dauern ...",
    lastUpdate: "Stand:"
  },
  relatorioContatosAtendimento: {
    unknownChannel: "Unbekannter Kanal",
    yes: "Ja",
    no: "NEIN",
    sheetName: "Bericht",
    sheetTitle: " Servicebericht",
    title: "Ticketbericht",
    filtersLegend: "Filter (Ticket-Erstellungsdatum)",
    startDate: "Start",
    endDate: "Ende",
    status: {
      status: "Status",
      open: "Offen",
      closed: "Geschlossen",
      pending: "Ausstehend"
    },
    queues: "Warteschlangen",
    channels: "Kanäle",
    demands: "Nachfrage",
    connections: "Anschlüsse",
    users: "Benutzer",
    minValue: "Mindestwert",
    maxValue: "Maximalwert",
    generateButton: "Um zu generieren",
    printButton: "Drucken",
    excelButton: "Excel",
    selectStatus: "Status auswählen",
    selectQueues: "Warteschlangen auswählen",
    selectChannels: "Kanäle auswählen",
    selectDemands: "Anforderungen auswählen",
    selectConnections: "Wählen Sie Verbindungen",
    selectUsers: "Benutzer auswählen",
    inputMinValue: "Geben Sie den Mindestwert ein",
    inputMaxValue: "Geben Sie den Maximalwert ein",
    tableHeaders: {
      ticketNotes: "Beobachtungen",
      id: "AUSWEIS",
      status: "Status",
      name: "Name",
      number: "Nummer",
      connection: "Verbindung",
      lastMessage: "Letzte Nachricht",
      unreadMessages: "Ungelesene Nachrichten",
      demand: "Nachfrage",
      queues: "Warteschlangen",
      channel: "Kanal",
      value: "Wert",
      creationDate: "Erstellungsdatum"
    },
    notifications: {
      loadError: "Fehler beim Laden der Daten.",
      noDates: "Geben Sie die Daten ein, um den Bericht zu erstellen.",
      noQueues: "Wählen Sie die Warteschlangen aus, um den Bericht zu generieren.",
      reportGenerated: "Bericht erfolgreich erstellt!",
      exportingError: "Fehler beim Exportieren der Tabelle.",
      exportSuccess: "Bericht erfolgreich exportiert!",
      exportError: "Fehler beim Exportieren des Berichts. Bitte versuchen Sie es erneut.",
      loadingMotives: "Problem beim Laden der Anforderungen.",
      loadingUsers: "Problem beim Laden der Benutzer.",
      loadingQueues: "Fehler beim Laden der Warteschlangen."
    }
  },
  relatorioContatosCarteira: {
    sheetName: "Bericht",
    sheetTitle: " Servicebericht",
    title: "Kontakte nach Portfoliobericht",
    filters: "Filter",
    tableHeaders: {
      name: "Name",
      whatsapp: "WhatsApp",
      email: "E-Mail",
      wallets: "Geldbörsen"
    },
    generateButton: "Bericht erstellen",
    printButton: "Drucken",
    excelButton: "Nach Excel exportieren",
    notifications: {
      selectWallet: "Hoppla ... Um den Bericht zu erstellen, müssen Sie mindestens ein Portfolio auswählen.",
      reportGenerated: "Bericht erfolgreich erstellt!"
    }
  },
  relatorioContatosEstado: {
    sheetName: "Bericht",
    sheetTitle: " Servicebericht",
    title: "Kontaktbericht nach Bundesstaat",
    filters: "Filter",
    tableHeaders: {
      name: "Name",
      whatsapp: "WhatsApp",
      email: "E-Mail",
      state: "Zustand"
    },
    generateButton: "Bericht erstellen",
    printButton: "Drucken",
    excelButton: "Nach Excel exportieren",
    notifications: {
      selectState: "Ups ... Um den Bericht zu erstellen, müssen Sie mindestens einen Status auswählen.",
      reportGenerated: "Bericht erfolgreich erstellt!"
    }
  },
  relatorioContatosEtiqueta: {
    sheetName: "Bericht",
    sheetTitle: " Servicebericht",
    title: "Bericht „Kontakte nach Tags“",
    filters: "Filter",
    tableHeaders: {
      name: "Name",
      whatsapp: "WhatsApp",
      email: "E-Mail",
      tags: "Schlagwörter"
    },
    generateButton: "Bericht erstellen",
    printButton: "Drucken",
    excelButton: "Nach Excel exportieren",
    notifications: {
      selectTags: "Hoppla ... Um den Bericht zu erstellen, müssen Sie mindestens ein Label auswählen.",
      reportGenerated: "Bericht erfolgreich erstellt!"
    }
  },
  relatorioContatosGeral: {
    sheetName: "Bericht",
    sheetTitle: " Servicebericht",
    title: "Kontaktbericht",
    filters: "Filter (Kontakterstellungsdatum)",
    tableHeaders: {
      empty: "Leer",
      extraInfo: "Zusätzliche Informationen",
      name: "Name",
      whatsapp: "WhatsApp",
      email: "E-Mail"
    },
    generateButton: "Bericht erstellen",
    printButton: "Drucken",
    excelButton: "Nach Excel exportieren",
    notifications: {
      reportGenerated: "Bericht erfolgreich erstellt!"
    }
  },
  relatorioContatosResumo: {
    sheetName: "Bericht",
    sheetTitle: " Servicebericht",
    title: "Zusammenfassender Bericht zum Benutzerdienst",
    filters: "Filter (Servicedatum)",
    tableHeaders: {
      name: "Name",
      email: "E-Mail",
      pending: "Ausstehend",
      inProgress: "Im Dienst",
      resolved: "Gelöst",
      total: "Gesamt"
    },
    generateButton: "Bericht erstellen",
    printButton: "Drucken",
    excelButton: "Nach Excel exportieren",
    notifications: {
      reportGenerated: "Bericht erfolgreich erstellt!"
    }
  },
  relatorioContatosKanban: {
    sheetName: "Bericht",
    sheetTitle: " Servicebericht",
    title: "Kontaktbericht per Kanban",
    filters: "Filter",
    tableHeaders: {
      name: "Name",
      whatsapp: "WhatsApp",
      email: "E-Mail",
      kanban: "Kanbans"
    },
    generateButton: "Bericht erstellen",
    printButton: "Drucken",
    excelButton: "Nach Excel exportieren",
    notifications: {
      reportGenerated: "Bericht erfolgreich erstellt!",
      selectKanban: "Ups ... Um den Bericht zu erstellen, müssen Sie mindestens ein Kanban auswählen."
    }
  },
  webphonecall: {
    callStatus: {
      accept: "Akzeptiert",
      accept_elsewhere: "Von einem anderen Benutzer akzeptiert",
      reject_elsewhere: "Von einem anderen Benutzer abgelehnt",
      terminate: "Vollendet",
      reject: "Abgelehnt",
      outcoming_calling: "Berufung",
      preaccept: "Berufung",
      relaylatency: "Berufung",
      unknown: "Unbekannt"
    },
    tooltips: {
      clear: "Reinigen",
      close: "Schließen",
      call: "So verbinden Sie",
      hangUp: "Ausschalten",
      mute: "Mutieren",
      unmute: "Stummschalten"
    },
    labels: {
      keypad: "Tastatur",
      display: "Bildschirm",
      duration: "Dauer"
    },
    placeholders: {
      phoneNumber: "Geben Sie die Nummer ein"
    }
  },
  webphone: {
    callStatus: {
      accept: "Akzeptiert",
      accept_elsewhere: "Von einem anderen Benutzer akzeptiert",
      reject_elsewhere: "Von einem anderen Benutzer abgelehnt",
      terminate: "Vollendet",
      reject: "Abgelehnt",
      outcoming_calling: "Berufung",
      preaccept: "Berufung",
      relaylatency: "Berufung",
      offer: "Angebot anrufen",
      unknown: "Unbekannt"
    },
    tooltips: {
      clear: "Reinigen",
      close: "Schließen",
      call: "So verbinden Sie",
      hangUp: "Ausschalten",
      accept: "Akzeptieren",
      reject: "Ablehnen",
      mute: "Mutieren",
      unmute: "Stummschalten"
    },
    labels: {
      duration: "Dauer",
      caller: "Anrufer",
      inbox: "Posteingang",
      phoneNumber: "Telefonnummer"
    },
    placeholders: {
      phoneNumber: "Geben Sie die Nummer ein"
    }
  },
  chatgptField: {
    placeholders: {
      apiKey: "Geben Sie den ChatGpt-API-Schlüssel ein",
      orgId: "Geben Sie die Organisations-ID ein",
      offKeyword: "Schlüsselwort zum Deaktivieren von ChatGpt",
      prompt: "Eingabeaufforderung für ChatGpt"
    }
  },
  delayField: {
    placeholders: {
      delayValue: "Geben Sie den Verzögerungswert in Sekunden ein"
    }
  },
  n8nField: {
    placeholders: {
      n8nField: "Geben Sie den N8N-Feldwert ein"
    }
  },
  typebotField: {
    placeholders: {
      url: "Geben Sie die Typebot-URL ein",
      name: "Geben Sie den Namen des Typebots ein",
      offKeyword: "Schlüsselwort zum Deaktivieren von Typebot",
      restartKeyword: "Schlüsselwort zum Neustarten von Typebot"
    }
  },
  mediaField: {
    labels: {
      uploadFile: "Nachricht zur Medienzusammenstellung",
      replaceFile: "Datei ersetzen",
      downloadPdf: "PDF herunterladen",
      captionPlaceholder: "Untertitel"
    },
    errors: {
      fileError: "Fehler beim Laden der Datei",
      checkFiles: "Bitte überprüfen Sie die hochgeladenen Dateien und versuchen Sie es erneut."
    }
  },
  messageField: {
    placeholders: {
      typeMessage: "Geben Sie hier Ihre Nachricht ein..."
    },
    tooltips: {
      emoji: "Emoji",
      variables: "Variablen"
    },
    variables: {
      name: "Name",
      greeting: "Gruß",
      protocol: "Protokoll",
      email: "E-Mail (falls verfügbar)",
      phoneNumber: "Telefon",
      kanban: "Kanban (falls vorhanden)",
      user: "Begleiter (falls anwesend)",
      userEmail: "E-Mail des Mitarbeiters (falls im Dienst)",
      firstName: "Vorname (falls vorhanden)",
      lastName: "Nachname (falls vorhanden)",
      businessName: "Firma (falls vorhanden)"
    }
  },
  messageOptionField: {
    placeholders: {
      typeMessage: "Geben Sie hier Ihre Nachricht ein...",
      options: "Optionen"
    },
    hints: {
      options: "Optionen werden je nach Unterstützung des Zielkanals als Listen/Schaltflächen oder einfacher Text behandelt."
    },
    tooltips: {
      emoji: "Emoji"
    }
  },
  webhookField: {
    placeholder: "Webhook hinzufügen (GET)",
    tooltip: {
      variables: "Variablen"
    },
    variables: {
      name: "Name",
      greeting: "Gruß",
      protocol: "Protokoll",
      email: "E-Mail (falls verfügbar)",
      phoneNumber: "Telefon",
      kanban: "Kanban (falls vorhanden)",
      user: "Begleiter (falls anwesend)",
      userEmail: "E-Mail des Mitarbeiters (falls im Dienst)",
      firstName: "Vorname (falls vorhanden)",
      lastName: "Nachname (falls vorhanden)",
      businessName: "Firma (falls vorhanden)"
    }
  },
  nodeForm: {
    ChatBotBlockField: "ChatBot blockieren",
    OpportunityField: "Chance",
    GoogleAgendaField: "Google Kalender",
    ScheduleField: "Zeitplan",
    WebhookAllField: "Webhooks",
    ChatGPTField: "ChatGPT",
    ChatFlowField: "ChatBOT-Ablauf",
    MessageField: "Nachricht",
    MediaField: "Medien",
    TypebotField: "Typebot",
    ChatgptField: "ChatGpt",
    DelayField: "Verzögerung",
    N8nField: "N8N",
    TagField: "Etikett",
    KanbanField: "Kanban",
    WebhookField: "Webhook",
    routeTo: "Route nach",
    routeToChatgpt: "Bei Empfang der Schlüsselwort für das Deaktivieren, Route nach:",
    key: "Schlüssel",
    redefine: "Zurücksetzen",
    welcomeMessage: "Begrüßungsnachricht (Warteschlange/Benutzer)",
    welcomeMessage2: "Wenn der Bot den Dienst an eine Warteschlange oder einen Benutzer weiterleitet, wird diese Nachricht gesendet.",
    fallbackMessage: "Wenn keine erwartete Antwort gesendet wird",
    fallbackMessage2: "Diese Ausnahme wird angewendet, wenn die vom Client gesendete Antwort nicht den erwarteten Werten gemäß den Bühnenbedingungen entspricht.",
    keyWord: "Schlüsselwort zum Starten des Flows",
    keyWord2: "Diese Interaktion wird ausgelöst, wenn der Client das definierte Schlüsselwort sendet, und der Client wird an die konfigurierte Warteschlange/den konfigurierten Benutzer weitergeleitet.",
    noAnswer: "Keine Antwort",
    noAnswer2: "Wenn der Kunde nach der angegebenen Zeit nicht antwortet, leitet der Bot die Anfrage an die angegebene Warteschlange/den angegebenen Benutzer weiter.",
    hourMessage: "Abwesenheitsnachricht",
    hourMessage2: "Wenn der Kunde nach der angegebenen Zeit nicht antwortet, sendet der Bot diese Nachricht, wenn die zuvor gewählte Einstellung BEENDEN lautet.",
    hourMessageWarning: "Abwesenheitsnachricht (Warnung)",
    hourMessageWarning2: "Nach der Hälfte der festgelegten Zeit sendet der Bot diese Nachricht, wenn der Kunde nicht antwortet.",
    messageWarningEnabled: "Warnungsnachricht aktivieren",
    maxAttempts: "Maximale Bot-Versuche",
    maxAttempts2: "Sobald die maximale Anzahl an Frage-/Antwort-Wiederholungsversuchen überschritten wurde und der Kunde keine gültige Antwort sendet, leitet der Bot diese an die konfigurierte Warteschlange/den konfigurierten Benutzer weiter.",
    message: "Nachricht",
    message2: "Feedback-Nachricht",
    firstInteraction: "Targeting in der ersten Interaktion",
    firstInteraction2: "Diese Interaktion wird bei der ersten Interaktion mit dem Kunden ausgelöst und der Kunde wird an die konfigurierte Warteschlange/den konfigurierten Benutzer weitergeleitet.",
    outBussinesHour: "Wenn es außerhalb der Geschäftszeiten ist",
    outBussinesHour2: "Diese Interaktion wird ausgelöst, wenn der Kunde außerhalb der Servicezeiten eine Nachricht sendet, und der Kunde wird an die konfigurierte Warteschlange/den konfigurierten Benutzer weitergeleitet.",
    selfDistribution: "Automatischer Verteilungsdienst",
    selfDistribution2: "Nein: Deaktiviert",
    selfDistribution3: "Zufällig: Der Benutzer wird nach dem Zufallsprinzip eingestellt.",
    selfDistribution7: "Ausgeglichen: Legt den Benutzer für die Benutzer in der Warteschlange auf ausgewogene Weise fest.",
    selfDistribution4: "NEIN",
    closeTicket: "Dienst beenden",
    closeTicket2: "Wenn der Kunde einige der erwarteten Informationen eingibt, wird der Dienst beendet.",
    endMessage: "Abschlussnachricht (Warteschlange/Benutzer)",
    endMessage2: "Wenn der Bot mit der Bedienung einer Warteschlange oder eines Benutzers fertig ist, wird diese Nachricht gesendet.",
    warning1: "Die Phase stellt den ersten Kontakt dar",
    warning2: "- Handelt es sich um den ersten Kontakt des Kunden,",
    warning3: "speichert die Kundeninformationen automatisch im Kalender.",
    warning4: "– Der Bot interagiert mit vom Kunden initiierten Diensten.",
    warning5: "- Der Bot beendet die Interaktion, wenn der Dienst von einem Benutzer übernommen wird.",
    warning6: "- Interaktionen mit Typebot, ChatGPT, N8N und ChatBot blockieren sollten immer der letzte Knoten im Schritt sein, der interne Chatbot wird deaktiviert und der Service läuft mit der definierten Integration weiter.",
    warning7: "- Bei Verwendung der Regex-Bedingung wird sie vor allen anderen Bedingungen verarbeitet.",
    selfDistribution5: "Zufällig",
    selfDistribution6: "Ausgewogen",
    selfDistribution8: "Sequenziell",
    selfDistribution9: "Sequenziell: Verteilt Tickets sequenziell und rotierend unter den verfügbaren Agenten.",
    emoji: "Emoji",
    chatbotBlock: {
      chatbotBlocked: "ChatBot blockiert",
      chatbotActive: "ChatBot aktiv"
    },
    googleAgenda: {
      selectConfigHint: "Wählen Sie die Google Kalender-Konfiguration",
      dateType: "Datumstyp",
      dateTypeHint: "Wählen Sie den Datumstyp für die Planung",
      daysFromInteraction: "Tage seit der Interaktion",
      daysRequired: "Tage sind erforderlich",
      daysFromInteractionHint: "Geben Sie die Anzahl der Tage seit der Interaktion für die Planung ein",
      eventTitleHint: "Geben Sie den Titel der Veranstaltung ein",
      startDateTimeHint: "Geben Sie das Startdatum und die Uhrzeit der Veranstaltung ein",
      endDateTimeHint: "Geben Sie das Enddatum und die Uhrzeit der Veranstaltung ein",
      descriptionHint: "Geben Sie die Beschreibung der Veranstaltung ein",
      locationHint: "Geben Sie den Veranstaltungsort ein",
      sendNotifications: "Benachrichtigungen senden",
      reminderBefore: "Erinnerung vor",
      reminderMinutes: "Minuten vorher",
      reminderMinutesHint: "Geben Sie die Minuten vor der Veranstaltung ein, um Benachrichtigungen zu senden",
      today: "Heute",
      tomorrow: "Morgen",
      days_from_interaction: "Tage seit der Interaktion",
      custom: "Benutzerdefiniertes Datum"
    },
    opportunity: {
      contactAutoFill: "Kontakt wird automatisch aus dem Ticket ausgefüllt",
      today: "Heute",
      tomorrow: "Morgen",
      days_from_interaction: "Tage seit der Interaktion",
      custom: "Benutzerdefiniertes Datum",
      open: "Offen",
      win: "Gewonnen",
      lose: "Verloren",
      dateTypeHint: "Wählen Sie den Datumstyp für die Planung",
      dateType: "Datumstyp"
    },
    schedule: {
      scheduleDateRequired: "Datum ist erforderlich",
      scheduleType: "Planungstyp",
      scheduleTypeHint: "Wählen Sie den Planungstyp",
      scheduleDate: "Benutzerdefiniertes Datum und Uhrzeit",
      scheduleDateHint: "Geben Sie das benutzerdefinierte Datum und die Uhrzeit ein",
      uploadImage: "Bild hochladen",
      selectImage: "Bild auswählen",
      deleteImage: "Bild löschen",
      message: "Nachricht",
      messageHint: "Geben Sie die Planungsnachricht ein",
      sendSignature: "Signatur senden",
      includeContactInfo: "Kontaktinformationen einfügen",
      advancedSettings: "Erweiterte Einstellungen",
      delayBeforeSend: "Verzögerung vor dem Senden",
      delayBeforeSendHint: "Geben Sie die Verzögerung in Sekunden ein",
      customSchedule: "Benutzerdefiniertes Datum",
      thirtyMinutes: "30 Minuten",
      oneHour: "1 Stunde",
      tomorrow: "Morgen",
      nextWeek: "Nächste Woche",
      nextMonth: "Nächster Monat"
    },
    webhook: {
      url: "Webhook-URL",
      urlPlaceholder: "Geben Sie die Webhook-URL ein",
      urlHint: "Geben Sie die Webhook-URL ein",
      httpMethod: "HTTP-Methode",
      httpMethodHint: "Wählen Sie die HTTP-Methode für den Webhook",
      headers: "Header",
      headerKey: "Schlüssel",
      headerKeyPlaceholder: "Geben Sie den Header-Schlüssel ein",
      headerValue: "Wert",
      headerValuePlaceholder: "Geben Sie den Header-Wert ein",
      addHeader: "Header hinzufügen",
      body: "Body",
      bodyType: "Body-Typ",
      bodyContent: "Body-Inhalt",
      bodyContentPlaceholder: "Geben Sie den Body-Inhalt ein",
      bodyContentHint: "Geben Sie den Body-Inhalt ein",
      formDataPlaceholder: "Geben Sie den Formularinhalt ein",
      formDataHint: "Geben Sie den Formularinhalt ein",
      testWebhook: "Webhook testen",
      testWebhookHint: "Testen Sie den Webhook, um sicherzustellen, dass er funktioniert.",
      testSuccess: "Webhook erfolgreich getestet!",
      testError: "Fehler beim Testen des Webhooks",
      responseDetails: "Antwortdetails",
      advancedSettings: "Erweiterte Einstellungen",
      timeout: "Timeout",
      timeoutHint: "Geben Sie den Timeout-Wert in Sekunden ein",
      retryAttempts: "Wiederholungsversuche",
      retryAttemptsHint: "Geben Sie die Anzahl der Wiederholungsversuche ein",
      retryDelay: "Wiederholungsverzögerung",
      retryDelayHint: "Geben Sie den Verzögerungswert in Sekunden ein",
      jsonBody: "JSON-Body",
      formBody: "Formular-Body",
      testSuccessDetails: "Antwort vom Server erhalten (CORS verhindert das Lesen der Antwort im Browser)",
      testErrorCors: "Netzwerk- oder CORS-Fehler. Überprüfen Sie, ob die URL erreichbar ist.",
      testErrorCorsDetails: "Fehler: {error}\n\nHinweis: Der Webhook könnte funktionieren, aber der Browser blockiert ihn wegen CORS. Überprüfen Sie bei webhook.site, ob die Anfrage angekommen ist.",
      testErrorUnknown: "Unbekannter Fehler"
    },
    ReasonsField: "Grund",
    SmsField: "SMS",
    VapiField: "VAPI",
    NotesField: "Notizen",
    clear: "Löschen",
    phoneNumberId: "Telefonnummer",
    assistantId: "Assistent",
    sms: {
      service: "Dienst",
      message: "Nachricht",
      messagePlaceholder: "Geben Sie die SMS-Nachricht ein"
    },
    notes: {
      note: "Notizen",
      notePlaceholder: "Geben Sie die Notizen ein"
    },
    buttons: {
      addStep: "Neue Bühne",
      saveFlow: "Stream speichern",
      reorder: "Neu anordnen",
      addInteraction: {
        reasons: "Grund",
        sms: "SMS",
        vapi: "VAPI",
        notes: "Notizen",
        chatbotBlock: "ChatBot blockieren",
        opportunity: "Chance",
        googleAgenda: "Google Kalender",
        schedule: "Zeitplan",
        webhookAll: "Webhooks",
        message: "Nachricht senden",
        media: "Senden Sie Dokumente, Videos, Audiodateien und andere Dateien.",
        typebot: "Typebot hinzufügen",
        chatgpt: "ChatGPT hinzufügen",
        delay: "Verzögerung hinzufügen",
        n8n: "N8N hinzufügen",
        tag: "Tag hinzufügen",
        kanban: "Kanban hinzufügen",
        webhook: "Webhook hinzufügen (GET)",
        newFlow: "Neuen Flow starten"
      },
      addCondition: "Neuzustand"
    },
    optionsVariableType: {
      text: "Text",
      number: "Zahl"
    },
    labels: {
      variableType: "Variable-Typ",
      captureVariable: "Antwort als Variable erfassen",
      comparisonType: "Vergleichstyp",
      timesAttempted: "Anzahl der Versuche",
      flow: "Flusskonfiguration",
      stepName: "Name",
      interactions: "Interaktionen",
      conditions: "Bedingungen",
      if: "Wenn",
      responses: "Antworten",
      routeTo: "Routing für",
      step: "Bühne",
      queue: "Warteschlange",
      user: "Benutzer",
      closeTicket: "Dienst beenden",
      channel: "Kanäle",
      time: "Zeit (Minuten)",
      parameters: "Parameter",
      keyword: "Triggerwort",
      maxRetries: "Maximale Versuche",
      autoDistribute: "Selbstverteilungsdienst",
      outOfHours: "Außerhalb der Öffnungszeiten",
      firstInteraction: "Erste Interaktion",
      endMessage: "Schlussnachricht",
      welcomeMessage: "Begrüßungsnachricht",
      noResponse: "Keine Antwort"
    },
    optionsComparisonType: {
      equals: "Gleich",
      contains: "Enthält",
      startsWith: "Beginnt mit",
      endsWith: "Endet mit",
      regex: "Regex"
    }, 
    placeholders: {
      typeMessage: "Geben Sie hier Ihre Nachricht ein...",
      keyword: "Geben Sie das Wort ein",
      feedbackMessage: "Feedback-Nachricht",
      farewellMessage: "Schlussnachricht"
    },
    hints: {
      captureVariable: "Geben Sie den Variablenschlüssel ein",
      typeValue: "Geben Sie den Wert ein und drücken Sie die Eingabetaste",
      typeEqual: "Geben Sie den exakten Text für den Vergleich ein.",
      typeContains: "Geben Sie den Text ein, der in der Antwort enthalten sein muss.",
      typeStartsWith: "Geben Sie den Text ein, mit dem die Antwort beginnen muss.",
      typeEndsWith: "Geben Sie den Text ein, mit dem die Antwort enden muss.",
      typeRegex: "Geben Sie eine gültige reguläre Ausdruck ein.",
      queueRedirect: "Diese Interaktion wird ausgelöst, wenn der Client das definierte Schlüsselwort sendet.",
      outHours: "Wenn der Kunde außerhalb der Geschäftszeiten eine Nachricht sendet.",
      autoDistribute: "Wählt einen Benutzer aus der Warteschlange für den Dienst aus.",
      typeValue: "Geben Sie den Wert ein und drücken Sie die Eingabetaste"
    },
    options: {
      routeTo: {
        queue: "Warteschlange",
        user: "Benutzer",
        close: "Schließen",
        channel: "Kanal"
      }
    }
  },
  monitor: {
    monitor: "Monitor",
    title: "Systemüberwachung",
    usage: "Verwenden",
    cores: "Kerne",
    memory: "Erinnerung",
    total: "Gesamt",
    free: "Frei",
    used: "Gebraucht",
    usedPercentage: "Prozentsatz der Nutzung",
    uptime: "Betriebszeit"
  },
  common: {
    sendMarketing: "Marketing-Vorlage senden",
    noQueue: 'Keine Warteschlange',
    required: 'Erforderlich',
    downloadSuccess: 'Download erfolgreich!',
    downloadError: 'Fehler beim Herunterladen der Datei',
    searching: 'Suchen',
    you: 'Du',
    duplicate: "Duplizieren",
    enableChatgptAllBanner: "Achtung: Konfigurieren Sie die Anmeldeinformationen für alle Kanäle. Wenn diese Einstellung aktiviert ist, erhalten alle neuen Tickets, die in einem beliebigen Kanal erstellt werden, automatisch die ChatGPT-Integration. Diese Einstellung wirkt sich auf alle Servicekanäle aus.",
    enableClaudeAllBanner: "Achtung: Konfigurieren Sie die Anmeldeinformationen für alle Kanäle. Wenn diese Einstellung aktiviert ist, erhalten alle neuen Tickets, die in einem beliebigen Kanal erstellt werden, automatisch die Claude-Integration. Diese Einstellung wirkt sich auf alle Servicekanäle aus.",
    enableDeepseekAllBanner: "Achtung: Konfigurieren Sie die Anmeldeinformationen für alle Kanäle. Wenn diese Einstellung aktiviert ist, erhalten alle neuen Tickets, die in einem beliebigen Kanal erstellt werden, automatisch die Deepseek-Integration. Diese Einstellung wirkt sich auf alle Servicekanäle aus.",
    enableDialogflowAllBanner: "Achtung: Konfigurieren Sie die Anmeldeinformationen für alle Kanäle. Wenn diese Einstellung aktiviert ist, erhalten alle neuen Tickets, die in einem beliebigen Kanal erstellt werden, automatisch die Dialogflow-Integration. Diese Einstellung wirkt sich auf alle Servicekanäle aus.",
    enableDifyAllBanner: "Achtung: Konfigurieren Sie die Anmeldeinformationen für alle Kanäle. Wenn diese Einstellung aktiviert ist, erhalten alle neuen Tickets, die in einem beliebigen Kanal erstellt werden, automatisch die Dify-Integration. Diese Einstellung wirkt sich auf alle Servicekanäle aus.",
    enableGeminiAllBanner: "Achtung: Konfigurieren Sie die Anmeldeinformationen für alle Kanäle. Wenn diese Einstellung aktiviert ist, erhalten alle neuen Tickets, die in einem beliebigen Kanal erstellt werden, automatisch die Gemini-Integration. Diese Einstellung wirkt sich auf alle Servicekanäle aus.",
    enableGrokAllBanner: "Achtung: Konfigurieren Sie die Anmeldeinformationen für alle Kanäle. Wenn diese Einstellung aktiviert ist, erhalten alle neuen Tickets, die in einem beliebigen Kanal erstellt werden, automatisch die Grok-Integration. Diese Einstellung wirkt sich auf alle Servicekanäle aus.",
    enableLmAllBanner: "Achtung: Konfigurieren Sie die Anmeldeinformationen für alle Kanäle. Wenn diese Einstellung aktiviert ist, erhalten alle neuen Tickets, die in einem beliebigen Kanal erstellt werden, automatisch die LM-Integration. Diese Einstellung wirkt sich auf alle Servicekanäle aus.",
    enableN8NAllBanner: "Achtung: Konfigurieren Sie die Anmeldeinformationen für alle Kanäle. Wenn diese Einstellung aktiviert ist, erhalten alle neuen Tickets, die in einem beliebigen Kanal erstellt werden, automatisch die N8N-Integration. Diese Einstellung wirkt sich auf alle Servicekanäle aus.",
    enableOllamaAllBanner: "Achtung: Konfigurieren Sie die Anmeldeinformationen für alle Kanäle. Wenn diese Einstellung aktiviert ist, erhalten alle neuen Tickets, die in einem beliebigen Kanal erstellt werden, automatisch die Ollama-Integration. Diese Einstellung wirkt sich auf alle Servicekanäle aus.",
    enableQwenAllBanner: "Achtung: Konfigurieren Sie die Anmeldeinformationen für alle Kanäle. Wenn diese Einstellung aktiviert ist, erhalten alle neuen Tickets, die in einem beliebigen Kanal erstellt werden, automatisch die Qwen-Integration. Diese Einstellung wirkt sich auf alle Servicekanäle aus.",
    enableTypebotAllBanner: "Achtung: Konfigurieren Sie die Anmeldeinformationen für alle Kanäle. Wenn diese Einstellung aktiviert ist, erhalten alle neuen Tickets, die in einem beliebigen Kanal erstellt werden, automatisch die Typebot-Integration. Diese Einstellung wirkt sich auf alle Servicekanäle aus.",
    espiarAtendimento: "Spionagedienst",
    atualizar: "So aktualisieren Sie",
    dadosAtualizados: "Daten erfolgreich aktualisiert!",
    erroAtualizacao: "Fehler beim Aktualisieren der Daten!",
    funil: "Trichter",
    accessDenied: "Zugriff verweigert! Sie haben keine Berechtigung, auf diese Seite zuzugreifen.",
    loadMoreTickets: "Suche nach Tickets... Klicken Sie bei Bedarf ein- oder mehrmals auf die Schaltfläche neben „Weitere Tickets laden“, um ältere Tickets aufzulisten.",
    oldMessage: "Alte Nachricht, Verlauf durch Scrollen nach oben laden ...",
    rollTop: "Ich scrolle nach oben und versuche, die Nachricht zu finden ...",
    messageNotFound: "Nachricht nicht gefunden!",
    fullscreen: "Vollbild",
    autoLayout: "Schritte automatisch organisieren",
    info: "Information",
    addInfo: "Informationen hinzufügen",
    hours: "Std.",
    minutes: "Minuten",
    confirmDeleteElement: "Möchten Sie das Element ({idx}) wirklich löschen?",
    confirmDeleteCondition: "Möchten Sie die Bedingung ({idx}) wirklich löschen?",
    invalidDate: "Ungültiges Datum",
    pay: "Rechnung",
    version: "Version",
    resume: "Zusammenfassen",
    readMore: "Mehr lesen",
    redefineError: "Fehler beim Zurücksetzen des Passworts",
    recoverSucess: "Passwort erfolgreich zurückgesetzt!",
    recoverError: "Fehler beim Anfordern der Kennwortzurücksetzung",
    recoverSend: "E-Mail zur Passwortwiederherstellung erfolgreich gesendet!",
    limitExceed: "Es wurden zu viele Anmeldeversuche unternommen. Versuchen Sie es in 1 Minute erneut",
    loginSuccess: "Erfolgreich angemeldet!",
    busyLine: "Leitung besetzt, bitte versuchen Sie es später noch einmal oder führen Sie ein Upgrade durch",
    system: "System",
    newClientPending: "Neuer Kunde steht aus",
    client: "Kunde: ",
    loading: "Laden...",
    errorOccurred: "Ein Fehler ist aufgetreten",
    errorFetchingData: "Fehler beim Abrufen der Daten",
    noData: "Keine Daten",
    notInformed: "Nicht informiert",
    resolve: "Lösen",
    register: "Registrieren",
    unknown: "Unbekannt",
    message: "Nachricht",
    edited: "Herausgegeben",
    sync: "Synchronisiert",
    reply: "Antworten",
    forward: "Weiterleiten",
    forwardToPrivateChat: "An privaten Chat weiterleiten",
    forwardToOtherChannel: "An anderen Kanal weiterleiten",
    markToForward: "Mehrfach weiterleiten (prüfen)",
    react: "Reagieren",
    edit: "Bearbeiten",
    delete2: "Löschen",
    download: "Untergehen",
    download2: "Untergehen",
    contact: "Kontakt",
    typeMessage: "Geben Sie Ihre Nachricht ein...",
    emoji: "Emoji",
    types: "Arten",
    ok: "OK",
    cancel: "Stornieren",
    start: "Start",
    close: "Schließen",
    confirm: "Bestätigen",
    send: "Senden",
    updated: "Aktualisiert!",
    users: "Benutzer",
    dateHourFormat: "tt/MM/jjjj HH:mm:ss",
    dateFormat: "tt/MM/jjjj",
    active: "Aktiv",
    actions: "Aktionen",
    description: "Beschreibung",
    import: "Import",
    save: "Speichern",
    add: "Hinzufügen",
    delete: "Löschen",
    no: "NEIN",
    yes: "Ja",
    out: "Ausgehen",
    continue: "Weitermachen",
    attention: "Aufmerksamkeit!!",
    search: "Lokalisieren...",
    lang: "pt-BR",
    variables: {
      name: "Name",
      email: "E-Mail (falls verfügbar)",
      phoneNumber: "Telefon",
      kanban: "Kanban (falls vorhanden)",
      firstName: "Vorname (falls vorhanden)",
      lastName: "Nachname (falls vorhanden)",
      businessName: "Firma (falls vorhanden)"
    },
    notifications: {
      success: "Konfiguration geändert!",
      error: "Ein Fehler ist aufgetreten."
    },
    status: {
      pending: "Ausstehend",
      received: "Erhalten",
      overdue: "Überfällig",
      unknown: "Status unbekannt"
    }
  },
  funil: {
    createEvent: "Ereignis erstellen",
    selectCalendar: "Kalender auswählen",
    noConfig: "Keine Konfiguration verfügbar",
    createGoogleCalendarEvent: "Ereignis in Google Kalender erstellen",
    viewGoogleCalendar: "Google Kalender-Ereignisse anzeigen",
    googleCalendarEvents: "Google Kalender-Ereignisse",
    noCalendarConfig: "Keine Konfiguration verfügbar",
    editCalendarEvent: "Ereignis bearbeiten",
    openCalendarEvent: "Im Google Kalender öffnen",
    eventTitle: "Ereignistitel",
    eventTitleRequired: "Titel ist erforderlich",
    eventStartDate: "Anfangsdatum",
    eventStatus: "Status",
    eventStartDateRequired: "Anfangsdatum ist erforderlich",
    eventEndDate: "Enddatum",
    eventEndDateRequired: "Enddatum ist erforderlich",
    eventDescription: "Beschreibung",
    eventLocation: "Ort",
    eventAttendees: "Teilnehmer (E-Mails durch Kommas getrennt)",
    eventAttendeesHint: "beispiel＠email.com, anderes＠email.com",
    updateEvent: "Ereignis aktualisieren",
    cancelUpdateEvent: "Abbrechen",
    eventActions: "Aktionen",
    eventUpdatedSuccess: "Ereignis erfolgreich aktualisiert!",
    selectCalendarConfig: "Wählen Sie eine Konfiguration zum Abrufen von Ereignissen.",
    configNotFound: "Ausgewählte Konfiguration nicht gefunden",
    configureGoogleCalendar: "Konfigurieren Sie zuerst die Google Kalender-Zugangsdaten",
    eventError: "Fehler beim Laden von Ereignissen",
    calendarConfigError: "Fehler beim Laden der Google Kalender-Konfiguration",
    acao: "Aktion",
    acaoTicket: "Ticket-Aktionen",
    todos: "Alle",
    valorMin: "Mindestwert",
    valorMax: "Maximalwert",
    itemsPerPage: "Elemente pro Seite",
    filter: "Filter",
    oportunidadeAtualizada: "Chance erfolgreich aktualisiert",
    oportunidadeCriada: "Chance erfolgreich geschaffen",
    erroSalvar: "Fehler beim Speichern der Möglichkeit",
    erroEnvioEmail: "Fehler beim Senden der E-Mail",
    emailDestinatario: "E-Mail des Empfängers",
    camposObrigatorios: "Pflichtfelder",
    semEmailContato: "Es gibt keine E-Mail für den Kontakt",
    mensagemEmail: "E-Mail-Nachricht",
    assuntoEmail: "E-Mail-Betreff",
    enviarEmail: "E-Mail senden",
    emailError: "Fehler beim Senden der E-Mail",
    emailErrorDetails: "Fehler konnte nicht ermittelt werden",
    dataAnteriorNaoPermitida: "Das Datum darf nicht vor dem aktuellen Tag liegen",
    nome: "Name",
    numero: "Nummer",
    email: "E-Mail",
    dataCriacao: "Erstellungsdatum",
    novaOportunidade: "Neue Chance",
    calendar: "Kalender",
    buscarPorTermoPlaceholder: "Geben Sie einen Suchbegriff ein",
    buscarPorTermo: "Suche nach Begriff",
    dataInicio: "Startdatum",
    dataFim: "Enddatum",
    limiteRegistros: "Datensatzlimit",
    registrosPorPagina: "Datensätze pro Seite",
    total: "Gesamt",
    semDescricao: "Es gibt keine Beschreibung",
    etapas: "Bühne",
    contato: "Kontakt",
    noventaDiasLabel: "Letzten 90 Tage",
    filterByStage: "Nach Schritt filtern",
    filterByResponsible: "Filtern nach Verantwortlichem",
    filterByPipeline: "Filtern nach Trichter",
    aberto: "Offen",
    ganho: "Gewinnen",
    perdido: "Verloren",
    export: "Export",
    exportCSV: "CSV exportieren",
    oportunidadesValue: "Gelegenheiten",
    pipelinesValue: "Rohrleitungen",
    etapasValue: "Schritte",
    noDataToExport: "Keine Daten zum Exportieren",
    filterByStatus: "Nach Status filtern",
    filterByPeriod: "Filtern nach Zeitraum",
    fitlerByResponsible: "Filtern nach Verantwortlichem",
    oportunidadeStatus: "Opportunity-Status",
    oportunidadePorResponsavel: "Chancen nach Verantwortung",
    evolucaoDasOportunidades: "Entwicklung der Möglichkeiten",
    ticketMedio: "Durchschnittliches Ticket",
    todosLabel: "Alle",
    abertosLabel: "Offen",
    ganhosLabel: "Ergebnis",
    perdidosLabel: "Verloren",
    seteDiasLabel: "Letzte 7 Tage",
    trintaDiasLabel: "Letzten 30 Tagen",
    noventeDiasLabel: "Letzten 90 Tage",
    noResponsible: "Keine Verantwortung",
    oportunidades: "Gelegenheiten",
    criado: "Gegründete Unternehmen",
    emAberto: "Geschäft eröffnen",
    negocioGanho: "Das Geschäft hat gewonnen",
    negocioPerdido: "Verlorene Geschäfte",
    taxaNegociosGanhos: "Gewonnener Geschäftstarif",
    dashBoard: "Bedienfeld",
    pipelines: "Trichter",
    kanban: "Kanban",
    ultimaEtapa: "Dies ist der letzte Schritt der Pipeline",
    deletarOportunidade: "Möchten Sie diese Gelegenheit wirklich löschen?",
    oportunidadeDeletada: "Chance erfolgreich gelöscht",
    erroAoDeletar: "Fehler beim Löschen der Chance",
    atencao: "Aufmerksamkeit",
    nao: "NEIN",
    sim: "Ja",
    cancelar: "Stornieren",
    salvar: "Speichern",
    fechar: "Schließen",
    adicionar: "Hinzufügen",
    editar: "Bearbeiten",
    deletar: "Löschen",
    oportunidadeVencendo: "Chancen nutzen",
    venceEm: "gewinnt in",
    dias: " Tage)",
    verDetalhes: "Siehe Einzelheiten",
    semMovimentacao: "Keine Bewegung",
    estaHa: "ist da",
    diasSemMovimentacao: "Tage ohne Bewegung",
    atualizar: "So aktualisieren Sie",
    valorAlto: "Hoher Wert",
    comValorDe: "mit einem Wert von $ ",
    etapaEstagnada: "Stagnationsphase",
    diasNaEtapa: "Tage in der Bühne",
    avancarEtapa: "Nächster Schritt",
    semResponsavel: "Keine Verantwortung",
    reponsavelAlerta: "hat keinen benannten Verantwortlichen",
    designar: "Benennen",
    fechamentoPrevisto: "Schließen",
    dataProxima: "Anmeldeschluss rückt näher!",
    criadoEm: "Erstellt in",
    detalhesOportunidade: "Details zur Gelegenheit",
    pipeline: "Trichter",
    etapa: "Bühne",
    status: "Status",
    valor: "Wert",
    valoresData: "Werte und Daten",
    previsao: "Schlussprognose",
    ultimaUpdate: "Letzte Aktualisierung",
    responsaveis: "Verantwortlich",
    basicas: "Grundlegende Informationen",
    lead: "Führen",
    responsavel: "Verantwortlich",
    descricao: "Beschreibung",
    produtos: "Produkte",
    historicoAtividades: "Aktivitätsverlauf",
    valorMinimo: "Mindestwert",
    valorMaximo: "Maximalwert",
    limparFiltros: "Filter löschen",
    esteMes: "Diesen Monat",
    mesAnterior: "Vorheriger Monat",
    ultimos7dias: "Letzte 7 Tage",
    ultimos30dias: "Letzten 30 Tagen",
    ultimos90dias: "Letzten 90 Tage",
    hoje: "Heute",
    valorDesc: "Wert (vom höchsten zum niedrigsten)",
    valorAsc: "Wert (vom niedrigsten zum höchsten)",
    criacaoDesc: "Erstellung (von der neuesten zur ältesten)",
    criacaoAsc: "Kreation (älteste bis neueste)",
    previsaoFechamento: "Schlussprognose",
    editarOportunidade: "Chance bearbeiten",
    criarOportunidade: "Chance schaffen",
    pipeEtapa: "Trichter & Bühne",
    funil: "Trichter",
    etapa: "Bühne",
    selecioneData: "Wählen Sie das voraussichtliche Abschlussdatum",
    dataObrigatoria: "Datum ist obligatorisch",
    dataFutura: "Das Datum muss in der Zukunft liegen",
    loadError: "Fehler beim Laden der erforderlichen Daten",
    contactError: "Fehler beim Laden der Kontakte",
    editarPipe: "Trichter bearbeiten",
    novoPipe: "Neuer Trichter",
    nomePipe: "Trichtername",
    campoObrigatorio: "Pflichtfeld",
    acoes: "Aktionen",
    excluirPipeline: "Möchten Sie diesen Trichter wirklich löschen?",
    funilDeletado: "Trichter erfolgreich gelöscht",
    erroAoDeletarFunil: "Fehler beim Löschen des Trichters",
    pipeTitle: "Trichter"
  },
  asteriskWebphone: {
    conected: "Verbunden",
    setNumber: "Geben Sie die Nummer ein",
    callReceived: "Anruf empfangen",
    disconnectedWebphone: "Webphone getrennt",
    calling: "Wird angelegt...",
    callError: "Fehler beim Starten der Anruf",
    callReceivedError: "Fehler beim Empfangen der Anruf",
    callEnded: "Anruf beendet",
    callEndedError: "Fehler beim Beenden der Anruf",
    callReceived: "Anruf empfangen",
  },
  configuracaoTutoriais: {
    title: 'Tutorials',
    create: 'Tutorial erstellen',
    description: 'Beschreibung',
    link: 'Link',
    thumbnail: 'Miniaturbild',
    isActive: 'Aktiv',
    edit: 'Bearbeiten',
    deleteConfirmation: 'Möchten Sie dieses Tutorial wirklich löschen?',
    tutorialDeleted: 'Tutorial erfolgreich gelöscht',
    columns: {
      title: 'Titel',
      link: 'Link',
      isActive: 'Aktiv',
      acoes: 'Aktionen',
      thumbnail: 'Miniaturbild',
      description: 'Beschreibung',
      actions: 'Aktionen',
      edit: 'Bearbeiten',
      delete: 'Löschen',
      cancel: 'Abbrechen',
      id: 'ID',
    },
    notifications: {
      duplicated: 'Tutorial erfolgreich dupliziert',
      errorDelete: 'Fehler beim Löschen des Tutorials',
      errorDuplicate: 'Fehler beim Duplizieren des Tutorials',
      created: 'Tutorial erfolgreich erstellt',
      updated: 'Tutorial erfolgreich aktualisiert',
    }
  },
  funilacao: {
    fluxoSalvoComSucesso: 'Flow erfolgreich gespeichert',
    tipoAcaoFluxo: 'Flow',
    erroSalvarFluxo: 'Fehler beim Speichern des Flows',
    configurarFluxo: 'Flow konfigurieren',
    configurarAdicaoCarteira: 'Hinzufügen eines Wallets konfigurieren',
    configurarAdicaoTag: 'Hinzufügen eines Tags konfigurieren',
    configurarMudancaStatus: 'Statusänderung konfigurieren',
    configurarMudancaEtapa: 'Phasenwechsel konfigurieren',
    configurarMensagem: 'Nachricht konfigurieren',
    selecionarAcao: 'Aktion auswählen',
    acoesDoFluxo: 'Flow-Aktionen',
    adicioneAcoes: 'Fügen Sie Aktionen zum Flow hinzu',
    adicionarAcao: 'Aktion hinzufügen',
    moverParaBaixo: 'Nach unten bewegen',
    moverParaCima: 'Nach oben bewegen',
    diasAposInicio: '{dias} Tage',
    configurarAcao: 'Aktion konfigurieren',
    selecionePipelineEtapa: 'Pipeline und Phase auswählen',
    novoFluxo: 'Neuer Flow',
    editarFluxo: 'Flow bearbeiten',
    editorFluxo: 'Flow-Editor',
    acoesDisponiveis: 'Verfügbare Aktionen',
    fluxo: 'Flow',
    verLogs: 'Protokolle anzeigen',
    logAcao: 'Aktionsprotokoll',
    contato: 'Kontakt',
    numero: 'Nummer',
    email: 'E-Mail',
    data: 'Datum',
    oportunidade: 'Gelegenheit',
    status: 'Status',
    mensagemErro: 'Fehlermeldung',
    erroCarregarLogs: 'Fehler beim Laden der Protokolle',
    acao: 'Aktion',
    pipeline: 'Pipeline',
    etapa: 'Phase',
    tipoAcao: 'Aktionstyp',
    mensagem: 'Nachricht',
    etapaDestino: 'Zielphase',
    statusDestino: 'Zielstatus',
    tag: 'Tag',
    carteira: 'Brieftasche',
    diasParaDisparar: 'Tage bis zur Ausführung',
    tipoAcaoMensagem: 'Nachricht senden',
    tipoAcaoMudarEtapa: 'Phase ändern',
    tipoAcaoMudarStatus: 'Status ändern',
    tipoAcaoAdicionarTag: 'Tag hinzufügen',
    tipoAcaoAdicionarCarteira: 'Brieftasche hinzufügen',
    aberto: 'Offen',
    ganho: 'Gewonnen',
    perdido: 'Verloren',
    novo: 'Neu',
    pesquisar: 'Suchen',
    ativo: 'Aktiv',
    nome: 'Name',
    pipeline: 'Pipeline',
    etapa: 'Phase',
    status: 'Status',
    valor: 'Wert',
    valoresData: 'Werte und Daten',
    previsao: 'Abschlussprognose',
    salvar: 'Speichern',
    cancelar: 'Abbrechen',
    descricao: 'Beschreibung',
    whatsapp: 'Verbindung',
    pesquisar: 'Suchen',
    novo: 'Neu',
    acoes: 'Aktionen',
    erroCarregarDados: 'Fehler beim Laden der Daten',
    required: 'Erforderlich',
    editar: 'Bearbeiten',
    salvoComSucesso: 'Erfolgreich gespeichert',
    excluir: 'Löschen',
    alteradoComSucesso: 'Erfolgreich geändert',
    confirmarExclusao: 'Sind Sie sicher, dass Sie diese Aktion löschen möchten?',
    confirmar: 'Bestätigen',
    excluidoComSucesso: 'Erfolgreich gelöscht',
    erroExcluir: 'Fehler beim Löschen der Aktion',
    erroSalvar: 'Fehler beim Speichern der Aktion',
    erroAtualizar: 'Fehler beim Aktualisieren der Aktion',
    erroCarregarEtiquetas: 'Fehler beim Laden der Tags',
    erroCarregarCarteiras: 'Fehler beim Laden der Brieftaschen',
    erroCarregarWhatsapps: 'Fehler beim Laden der WhatsApp-Verbindungen',
    acaoTicket: 'Ticket-Aktionen',
    horasSemResposta: 'Stunden ohne Antwort',
    dataInicio: 'Startdatum',
    dataInicioTooltipTitulo: 'Wie es funktioniert:',
    dataInicioTooltipDescricao: 'Dieses Datum definiert, ab wann die Aktion auf Tickets angewendet wird.',
    dataInicioTooltipPreenchida: 'Wenn ausgefüllt: Nur Tickets, die nach diesem Datum erstellt wurden, erhalten die Aktion',
    dataInicioTooltipVazia: 'Wenn leer: Die Aktion wird auf alle Tickets angewendet (Standardverhalten)',
    dataInicioTooltipExemplo: 'Beispiel: Wenn Sie 01/01/2024 festlegen, erhalten nur Tickets, die ab diesem Datum erstellt wurden, die Aktion, alte Tickets werden ignoriert.',
    horasAposInicio: '{horas}h nach Start',
    pendente: 'Ausstehend',
    fechado: 'Geschlossen',
    confirmar: 'Bestätigen',
  },
  vapi: {
    assistants: "Assistenten",
    phones: "Telefonnummern",
    createAccountInstruction: "Erstellen Sie ein Konto bei Vapi und generieren Sie Ihren Token, um die Integration mit Vapi zu nutzen",
    tokenLabel: "Token",
    tokenTooltip: "Vapi",
    tooltip: "Erstellen Sie ein Konto bei Vapi und generieren Sie Ihren Token, um die Integration mit Vapi zu nutzen.",
    testCall: "Testanruf durchführen",
    selectAssistant: "Assistent auswählen",
    selectPhoneNumber: "Telefonnummer auswählen",
    customerNumber: "Kundennummer",
    makeCall: "Anruf durchführen",
    cancel: "Abbrechen",
    success: "Anruf erfolgreich durchgeführt!",
    call: "Anruf",
  },
  rewriteIa: {
    title: 'Umformulieren mit ChatGPT',
    estilos: 'Umformulierung Stile',
    pro: 'Professionell',
    prodesc: 'Formeller und geschäftlicher Ton',
    simp: 'Freundlich',
    simpdesc: 'Freundlicher und herzlicher Ton',
    marketing: 'Marketing',
    marketingdesc: 'Überzeugender und ansprechender Ton',
    ortografia: 'Rechtschreibung',
    ortografiadesc: 'Nur Rechtschreibkorrektur',
    caracteres: 'Zeichen',
    warning1: 'Geben Sie eine Nachricht zum Umformulieren ein',
    warning2: 'Der API-Schlüssel von ChatGPT ist nicht konfiguriert',
    warning3: 'Text umformuliert im Stil',
    warning4: 'Umformulierung rückgängig gemacht',
    desfazer: 'Rückgängig',
    error1: 'Fehler beim Umformulieren. Bitte versuchen Sie es erneut',
    promptMap: {
      profissional: 'Professionell',
      simpatico: 'Freundlich',
      marketing: 'Marketing',
      ortografia: 'Rechtschreibung'
    },
    systemContent: 'Formulieren Sie den folgenden Text im Stil {estilo}. Behalten Sie den Inhalt bei, passen Sie nur den Stil und die Rechtschreibung an. In Fällen der freundlichen Stimmung verwenden Sie Emojis in angemessener Weise, in Fällen des Marketings verwenden Sie die breite Schrift und die kursive Schrift in WhatsApp und Emojis.'
  },
  dashStyles: {
    title: 'Dashboards anpassen',
    tema: 'Dashboard-Thema',
    tipoGrafico: 'Diagrammtyp',
    tooltip: 'Wählen Sie den anzuzeigenden Diagrammtyp für: ',
    show: 'Panel anzeigen für: ',
    defaultLabel: 'Standard',
    defaultValue: 'standard',
    pizzaLabel: 'Kreisdiagramm',
    barLabel: 'Balken',
    lineLabel: 'Linien',
    areaLabel: 'Flächen',
    donutLabel: 'Donut',
    radarLabel: 'Radar',
    queueLabel: 'Service nach Warteschlange',
    userLabel: 'Service nach Benutzer',
    statusLabel: 'Service nach Status',
    channelLabel: 'Service nach Kanal (Verbindung)',
    channelNameLabel: 'Service nach Kanal (Name)',
    reasonsLabel: 'Service nach Anfrage',
    users: 'Benutzer',
    atendimento: 'Services',
    demandas: 'Anfragen',
    closed: 'Geschlossen',
    open: 'Offen',
    pending: 'Ausstehend',
    schedule: 'Geplant',
    undefined: 'Undefiniert',
    channels: 'Kanäle',
    classic: 'Klassisch',
    modern: 'Modern',
    nature: 'Natürlich',
    elegant: 'Elegant',
    vibrant: 'Lebendig',
    minimalist: 'Minimalistisch',
    corporative: 'Korporativ',
    default: 'Standard',
    performanceCardsLabel: 'Leistungskarten',
    performanceTableLabel: 'Leistungstabelle',
  },
  ticketCompartilhado: {
    convites: 'Einladungen',
    convite: 'Einladung',
    conviteDeletado: 'Einladung erfolgreich gelöscht',
    conviteDeletadoErro: 'Fehler beim Löschen der Einladung',
    meusConviteCompartilhados: 'Meine geteilten Einladungen',
    carregandoConvites: 'Einladungen werden geladen...',
    nenhumConviteEncontrado: 'Keine Einladungen gefunden',
    voceNaoPossuiConvitesAtivos: 'Sie haben keine aktiven Freigabeeinladungen.',
    compartilhadoEm: 'Geteilt am',
    usuariosComAcesso: 'Benutzer mit Zugriff',
    criadoPor: 'Erstellt von',
    voce: 'Sie',
    outroUsuario: 'Anderer Benutzer',
    abrirNaMesmaTela: 'Im selben Fenster öffnen',
    deletarConvite: 'Einladung löschen',
    erroAoCarregarConvites: 'Fehler beim Laden der Einladungen',
    linkCopiadoParaAreaDeTransferencia: 'Link in die Zwischenablage kopiert',
    naoFoiPossivelCopiarLink: 'Link konnte nicht kopiert werden',
    confirmarExclusa: 'Löschen bestätigen',
    temCertezaQueDesejaDeletarOConviteDoTicket: 'Möchten Sie die Einladung für das Ticket #{ticketId} wirklich löschen?',
    conviteDeletadoComSucesso: 'Einladung erfolgreich gelöscht!',
    erroAoDeletarConvite: 'Fehler beim Löschen der Einladung',
    confirmarExclusao: 'Möchten Sie diese Einladung wirklich löschen?',
    compartilharTicket: 'Ticket teilen',
    editarCompartilhamento: 'Freigabe bearbeiten',
    editeOsUsuariosQueTeraoAcessoAEsteTicket: 'Bearbeiten Sie die Benutzer, die Zugriff auf dieses Ticket haben',
    selecioneOsUsuariosQueTeraoAcessoAEsteTicket: 'Wählen Sie die Benutzer aus, die Zugriff auf dieses Ticket haben sollen',
    atualizar: 'Aktualisieren',
    compartilhar: 'Teilen',
    erroAoVerificarConviteExistente: 'Fehler beim Überprüfen vorhandener Einladung',
    erroAoCarregarUsuarios: 'Fehler beim Laden der Benutzer',
    selecionePeloMenosUmUsuarioParaCompartilhar: 'Wählen Sie mindestens einen Benutzer zum Teilen aus',
    conviteAtualizadoCom: 'Einladung aktualisiert mit {length} Benutzer(n)',
    ticketCompartilhadoCom: 'Ticket geteilt mit {length} Benutzer(n)',
    erroAoCompartilharTicket: 'Fehler beim Teilen des Tickets',
    update: 'Aktualisieren',
  },
  backup: {
    title: "Datenzentrale",
    backupActions: "Datenexport",
    individualBackup: "Einzelexport",
    allTenantsConfig: "Exporteinstellungen – Alle Mandanten",
    tenantConfig: "Exporteinstellungen pro Mandant",
    oldBackupsCleanup: "Alte Daten bereinigen",
    backupResults: "Export-Ergebnisse",
    availableBackups: "Verfügbare Daten",
    totalBackups: "Gesamtexporte",
    totalSize: "Gesamtgröße",
    lastBackup: "Letzter Export",
    processedTenants: "Verarbeitete Exporte",
    backupAllTenants: "Export aller Mandanten",
    updateStatus: "Status aktualisieren",
    makeBackup: "Daten exportieren",
    updateConfigs: "Konfigurationen aktualisieren",
    searchTenant: "Mandant suchen",
    newConfig: "Neue Konfiguration",
    recreateDefaultConfig: "Standardkonfiguration neu erstellen",
    saveConfig: "Konfiguration speichern",
    cancel: "Abbrechen",
    close: "Schließen",
    confirmRestore: "Wiederherstellung bestätigen",
    confirmGeneralCleanup: "Allgemeine Bereinigung bestätigen",
    cleanTenantBackups: "Alte Daten des Mandanten bereinigen",
    cleanAllTenantsBackups: "Alte Daten aller Mandanten bereinigen",
    selectTenant: "Mandant auswählen",
    selectTenantForConfig: "Mandant zur Konfiguration auswählen",
    selectTenantForCleanup: "Mandant zur Bereinigung auswählen",
    viewAllTenantsConfig: "Exporteinstellungen aller Mandanten anzeigen",
    removeOldBackups: "Entfernt alte Daten gemäß der definierten Aufbewahrungsrichtlinie",
    tenantConfigInfo: "Konfiguration des Mandanten:",
    noConfigFound: "Keine Konfiguration gefunden",
    withoutDescription: "Keine Beschreibung",
    createdIn: "Erstellt am:",
    editConfig: "Konfiguration bearbeiten",
    newConfigTitle: "Neue Konfiguration",
    storage: "Speicher",
    general: "Allgemein",
    advanced: "Erweitert",
    storageType: "Speichertyp",
    storagePath: "Speicherpfad",
    retentionDays: "Aufbewahrungstage",
    compression: "Komprimierung",
    description: "Beschreibung",
    configDescription: "Konfigurationsbeschreibung",
    encryption: "Verschlüsselung",
    encryptionPassword: "Verschlüsselungspasswort",
    bucket: "Bucket",
    region: "Region",
    accessKeyId: "Access Key ID",
    secretAccessKey: "Secret Access Key",
    host: "Host",
    port: "Port",
    username: "Benutzername",
    password: "Passwort",
    path: "Pfad",
    active: "Aktiv",
    inactive: "Inaktiv",
    success: "Erfolg",
    failure: "Fehlgeschlagen",
    complete: "Vollständig",
    partial: "Teilweise",
    yes: "Ja",
    no: "Nein",
    edit: "Bearbeiten",
    recreateDefault: "Standard neu erstellen",
    delete: "Löschen",
    viewDetails: "Details anzeigen",
    downloadBackup: "Daten herunterladen",
    deleteBackup: "Daten löschen",
    confirmDeleteBackup: "Löschen bestätigen",
    confirmDeleteBackupMessage: "Sind Sie sicher, dass Sie diesen Export löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.",
    backupDeleted: "Export erfolgreich gelöscht",
    errorDeletingBackup: "Fehler beim Löschen der Daten",
    confirmDeleteBackupTitle: "Löschen des Exports bestätigen",
    id: "ID",
    tenant: "Mandant",
    tenantId: "Mandanten-ID",
    backupName: "Exportname",
    size: "Größe",
    dbSize: "DB-Größe",
    filesSize: "Dateigröße",
    totalSizeLabel: "Gesamtgröße:",
    duration: "Dauer",
    type: "Typ",
    date: "Datum",
    actions: "Aktionen",
    createdAt: "Erstellt am",
    status: "Status",
    backupDetails: "Exportdetails",
    name: "Name",
    database: "Datenbank",
    files: "Dateien",
    dbSizeLabel: "Datenbankgröße:",
    filesSizeLabel: "Dateigröße:",
    dateLabel: "Datum:",
    errors: "Fehler:",
    restoreBackup: "Daten wiederherstellen",
    restoreWarning: "⚠️ Achtung: Diese Aktion überschreibt die aktuellen Mandantendaten. Dies kann nicht rückgängig gemacht werden.",
    confirmGeneralCleanupTitle: "Allgemeine Bereinigung bestätigen",
    action: "Aktion:",
    criteria: "Kriterium:",
    cleanupAction: "Alte Daten ALLER Mandanten löschen",
    cleanupCriteria: "Daten, die älter sind als der konfigurierte Aufbewahrungszeitraum",
    cleanupWarning: "⚠️ ACHTUNG: Diese Aktion löscht dauerhaft alte Daten aller Mandanten. Diese Aktion kann nicht rückgängig gemacht werden und könnte zum Verlust historischer Daten führen.",
    cleanupAllWarning: "⚠️ Diese Aktion entfernt alte Daten ALLER Mandanten",
    allBackupsCompleted: "Export aller Mandanten abgeschlossen",
    allBackupsExecuted: "Export aller Mandanten abgeschlossen",
    singleBackupExecuted: "Export des Mandanten abgeschlossen",
    tenantBackupCompleted: "Export des Mandanten abgeschlossen",
    configSaved: "Konfiguration erfolgreich gespeichert",
    configDeleted: "Konfiguration erfolgreich gelöscht",
    defaultConfigRecreated: "Standardkonfiguration erfolgreich neu erstellt",
    restoreCompleted: "Wiederherstellung erfolgreich abgeschlossen",
    tenantBackupsCleaned: "Alte Daten des Mandanten erfolgreich bereinigt",
    oldBackupsCleaned: "Alte Daten erfolgreich bereinigt",
    allTenantsBackupsCleaned: "Alte Daten aller Mandanten erfolgreich bereinigt",
    allOldBackupsCleaned: "Alte Daten aller Mandanten erfolgreich bereinigt",
    backupDownloaded: "Daten erfolgreich heruntergeladen!",
    tenantsWithSuccess: "Mandanten mit Erfolg",
    errorLoadingInitialData: "Fehler beim Laden der Anfangsdaten",
    errorLoadingStatus: "Fehler beim Laden des Status",
    errorLoadingTenants: "Fehler beim Laden der Mandanten",
    errorLoadingBackups: "Fehler beim Laden der Daten",
    errorLoadingResults: "Fehler beim Laden der Exporte",
    errorLoadingAllConfigs: "Fehler beim Laden der Konfigurationen aller Mandanten",
    errorLoadingTenantConfigs: "Fehler beim Laden der Mandantenkonfiguration",
    errorExecutingBackup: "Fehler beim Ausführen des Exports",
    errorExecutingAllBackups: "Fehler beim Ausführen aller Exporte",
    errorExecutingTenantBackup: "Fehler beim Export des Mandanten",
    errorExecutingSingleBackup: "Fehler beim Export des Mandanten",
    errorSavingConfig: "Fehler beim Speichern der Konfiguration",
    errorDeletingConfig: "Fehler beim Löschen der Konfiguration",
    errorRecreatingDefaultConfig: "Fehler beim Wiederherstellen der Standardkonfiguration",
    errorRestoringBackup: "Fehler beim Wiederherstellen der Daten",
    errorCleaningTenantBackups: "Fehler beim Bereinigen der Mandantendaten",
    errorCleaningOldBackups: "Fehler beim Bereinigen alter Daten",
    errorCleaningAllTenantsBackups: "Fehler beim Bereinigen aller Mandantendaten",
    errorCleaningAllBackups: "Fehler beim Bereinigen aller Daten",
    errorDownloadingBackup: "Fehler beim Herunterladen der Daten",
    selectTenantToConfigure: "Wählen Sie einen Mandanten zur Konfiguration",
    selectTenantToClean: "Wählen Sie einen Mandanten zur Datenbereinigung",
    selectTenantToCleanBackups: "Wählen Sie einen Mandanten zur Datenbereinigung",
    selectTenantToRecreate: "Wählen Sie einen Mandanten zur Neuerstellung der Standardkonfiguration",
    selectTenantToRecreateDefaultConfig: "Wählen Sie einen Mandanten zur Neuerstellung der Standardkonfiguration",
    invalidConfig: "Ungültige Konfiguration",
    confirmDelete: "Löschen bestätigen",
    confirmDeleteConfigTitle: "Löschen bestätigen",
    confirmDeleteMessage: "Sind Sie sicher, dass Sie diese Konfiguration löschen möchten?",
    confirmDeleteConfigMessage: "Sind Sie sicher, dass Sie diese Konfiguration löschen möchten?",
    zeroBytes: "0 Bytes",
    na: "N/V",
    tenantPrefix: "Mandant ",
    backupInfoTitle: "Informationen zum Export",
    includedModels: "Eingeschlossene Modelle",
    excludedModels: "Ausgeschlossene Modelle",
    databaseModelsInfo: "Datenbankmodelle",
    includedModelsTitle: "In den Export eingeschlossene Modelle",
    excludedModelsTitle: "Vom Export ausgeschlossene Modelle",
    includedModelsDescription: "Diese Modelle werden in den Datenbankexport aufgenommen",
    excludedModelsDescription: "Diese Modelle werden NICHT in den Datenbankexport aufgenommen",
    backupScope: "Exportumfang",
    backupScopeDescription: "Der Export enthält nur mandantenspezifische Daten (mit tenantId) und schließt Systemdaten, temporäre Protokolle und interne Einstellungen aus.",
    showDetails: "Details anzeigen",
    hideDetails: "Details ausblenden",
    backupAllTenantsTooltip: "Export aller Mandanten",
    backupAllTenantsDescription: "Führt den Export aller aktiven Mandanten im System durch",
    singleBackupTooltip: "Einzelexport",
    singleBackupDescription: "Führt den Export eines bestimmten Mandanten durch",
    modelsIncluded: "Eingeschlossene Modelle",
    modelsExcluded: "Ausgeschlossene Modelle",
    models: "Modelle",
    updateStatusDescription: "Aktualisiert Statistiken und Exportstatus",
    cleanupInfoTitle: "Datenbereinigung",
    cleanupInfoDescription: "Entfernt alte Daten gemäß der konfigurierten Aufbewahrungsrichtlinie",
    cleanupScope: "Bereinigungsumfang",
    cleanupScopeDescription: "Entfernt nur alte Exportdateien, ohne Datenbankdaten oder Einstellungen zu beeinflussen"
  },
  masterkey: {
    masterkeyOption: "MasterKey verwenden"
  },
  configuracaoMetaPanel: {
    novos: {
      configureWebhook: "Webhook konfigurieren",
      configureSIP: "SIP konfigurieren",
      registerPhone: "Telefon bei WABA registrieren",
      configureWebhookDescription: "Konfigurieren Sie die Callback-URL, um Ereignisse von der WhatsApp Business API zu empfangen",
      callbackUrl: "Callback-URL",
      callbackUrlRequired: "Callback-URL ist erforderlich",
      verifyToken: "Überprüfungstoken",
      metaToken: "Meta-Token des Mandanten",
      metaTokenHint: "Token zur Überprüfung der Authentizität der Anfragen",
      metaTokenRequired: "Überprüfungstoken ist erforderlich",
      overrideWebhook: "Webhook überschreiben",
      configureSIPDescription: "Konfigurieren Sie den SIP-Server, um Sprachanrufe über die WhatsApp Business API zu empfangen",
      hostnameSIP: "SIP-Server-Hostname",
      hostnameSIPHint: "Hostname des SIP-Servers (z. B.: asterisk.exemplo.com.br)",
      hostnameSIPRequired: "SIP-Server-Hostname ist erforderlich",
      hostnameSIPInvalid: "Ungültiger SIP-Server-Hostname",
      hostnameSIPPlaceholder: "Beispiel: asterisk.exemplo.com.br",
      portSIP: "SIP-Server-Port",
      portSIPHint: "Port des SIP-Servers (1-65535)",
      portSIPRequired: "SIP-Server-Port ist erforderlich",
      portSIPInvalid: "Ungültiger SIP-Server-Port",
      portSIPPlaceholder: "5061",
      important: "Wichtig",
      configureSIPDescription2: "Diese Konfiguration aktiviert Sprachanrufe über die WhatsApp Business API. Stellen Sie sicher, dass der SIP-Server korrekt konfiguriert und erreichbar ist.",
      fillRequiredFields: "Füllen Sie alle Pflichtfelder aus",
      portSIPInvalidMessage: "Ungültiger Port. Muss eine Zahl zwischen 1 und 65535 sein",
      hostnameSIPInvalidMessage: "Ungültiger Hostname",
      SIPConfiguredSuccess: "SIP erfolgreich konfiguriert!",
      SIPConfiguredError: "Fehler bei der SIP-Konfiguration"
    },    
    profile: {
      updateProfile: "Profil aktualisieren",
      profile: "WhatsApp Business Profil",
      about: "Über",
      address: "Adresse",
      description: "Beschreibung",
      email: "E-Mail",
      vertical: "Branche",
      websites: "Websites",
      loadingProfile: "Aktuelles Profil wird geladen...",
      configureProfile: "Profil konfigurieren",
      configureProfileDescription: "Konfigurieren Sie die Informationen des WhatsApp Business Profils",
      reloadProfile: "Profil neu laden",
      aboutPlaceholder: "Kurze Beschreibung des Unternehmens",
      aboutHint: "Maximal 512 Zeichen",
      addressPlaceholder: "Vollständige Geschäftsadresse",
      addressHint: "Physische Adresse des Unternehmens",
      descriptionPlaceholder: "Detaillierte Beschreibung des Unternehmens",
      descriptionHint: "Vollständige Beschreibung der Dienstleistungen oder Produkte",
      emailPlaceholder: "kontakt@@firma.de",
      emailHint: "Kontakt-E-Mail des Unternehmens",
      verticalPlaceholder: "Branche auswählen",
      verticalHint: "Hauptkategorie des Unternehmens",
      websitesPlaceholder: "https://www.firma.de",
      websitesHint: "Webseiten-URLs des Unternehmens (durch Kommas getrennt)",
      cancel: "Abbrechen",
      saveProfile: "Profil speichern",
      profileLoadError: "Telefon verifiziert, aber Profil konnte nicht geladen werden.",
      requiredFieldsError: "Bitte füllen Sie alle Pflichtfelder aus",
      invalidEmailFormat: "Ungültiges E-Mail-Format",
      profileUpdatedSuccess: "Profil erfolgreich aktualisiert!",
      profileUpdateError: "Fehler beim Aktualisieren des Profils. Bitte überprüfen Sie die Daten und versuchen Sie es erneut.",
      retail: "Einzelhandel",
      services: "Dienstleistungen",
      restaurant: "Restaurant",
      education: "Bildung",
      health: "Gesundheit",
      technology: "Technologie",
      beauty: "Schönheit",
      automotive: "Automobil",
      realEstate: "Immobilien",
      financial: "Finanzen",
      sports: "Sport",
      entertainment: "Unterhaltung",
      travel: "Reisen",
      wellness: "Wellness",
      pet: "Haustiere",
      other: "Andere"
    },    
    label: {
      approved: "Genehmigt",
      pending: "Ausstehend",
      rejected: "Abgelehnt",
      inAppeal: "In Berufung",
      disabled: "Deaktiviert",
      utility: "Dienstprogramm",
      marketing: "Marketing",
      authentication: "Authentifizierung",
      arAR: "Arabisch (Saudi-Arabien)",
      tshivenda: "Tshivenda",
      isiNdebeleNo: "Nord-Ndebele",
      isiNdebeleSu: "Süd-Ndebele",
      Sepedi: "Sepedi",
      Sesotho: "Sesotho",
      ptBR: "Portugiesisch (Brasilien)",
      ptPT: "Portugiesisch (Portugal)",
      enUS: "Englisch (USA)",
      enGB: "Englisch (UK)",
      esES: "Spanisch (Spanien)",
      esMX: "Spanisch (Mexiko)",
      esAR: "Spanisch (Argentinien)",
      frFR: "Französisch (Frankreich)",
      frCA: "Französisch (Kanada)",
      itIT: "Italienisch",
      deDE: "Deutsch",
      nlNL: "Niederländisch",
      ruRU: "Russisch",
      jaJP: "Japanisch",
      koKR: "Koreanisch",
      zhCN: "Chinesisch (vereinfacht)",
      zhTW: "Chinesisch (traditionell)",
      arAE: "Arabisch (VAE)",
      arEG: "Arabisch (Ägypten)",
      arSA: "Arabisch (Saudi-Arabien)",
      arMA: "Arabisch (Marokko)",
      arTN: "Arabisch (Tunesien)",
      arDZ: "Arabisch (Algerien)",
      hiIN: "Hindi",
      trTR: "Türkisch",
      plPL: "Polnisch",
      svSE: "Schwedisch",
      noNO: "Norwegisch",
      daDK: "Dänisch",
      fiFI: "Finnisch",
      elGR: "Griechisch",
      huHU: "Ungarisch",
      csCZ: "Tschechisch",
      skSK: "Slowakisch",
      roRO: "Rumänisch",
      bgBG: "Bulgarisch",
      hrHR: "Kroatisch",
      srRS: "Serbisch",
      slSI: "Slowenisch",
      etEE: "Estnisch",
      lvLV: "Lettisch",
      ltLT: "Litauisch",
      mtMT: "Maltesisch",
      isIS: "Isländisch",
      gaIE: "Irisch",
      cyGB: "Walisisch",
      euES: "Baskisch",
      caES: "Katalanisch",
      glES: "Galizisch",
      caESVALENCIA: "Katalanisch (Valencia)",
      heIL: "Hebräisch",
      faIR: "Persisch (Iran)",
      thTH: "Thailändisch",
      viVN: "Vietnamesisch",
      idID: "Indonesisch",
      msMY: "Malaiisch",
      filPH: "Filipino",
      bnIN: "Bengalisch",
      taIN: "Tamil",
      teIN: "Telugu",
      mrIN: "Marathi",
      guIN: "Gujarati",
      knIN: "Kannada",
      mlIN: "Malayalam",
      paIN: "Punjabi",
      urPK: "Urdu (Pakistan)",
      sdPK: "Sindhi (Pakistan)",
      psAF: "Paschtu",
      prsAF: "Dari (Afghanistan)",
      uzUZ: "Usbekisch",
      kkKZ: "Kasachisch",
      kyKG: "Kirgisisch",
      tgTJ: "Tadschikisch",
      tkTM: "Turkmenisch",
      mnMN: "Mongolisch",
      neNP: "Nepalesisch",
      siLK: "Singhalesisch",
      myMM: "Birmanisch",
      kmKH: "Khmer",
      loLA: "Laotisch",
      mnMNCYRL: "Mongolisch (Kyrillisch)",
      mnMNMONG: "Mongolisch (Traditionell)",
      amET: "Amharisch",
      tiET: "Tigrinya",
      soSO: "Somali",
      swKE: "Swahili",
      yoNG: "Yoruba",
      igNG: "Igbo",
      haNG: "Hausa",
      zuZA: "Zulu",
      xhZA: "Xhosa",
      afZA: "Afrikaans",
      stZA: "Süd-Sotho",
      tnZA: "Tswana",
      veZA: "Venda",
      tsZA: "Tsonga",
      nrZA: "Süd-Ndebele",
      ndZA: "Nord-Ndebele",
      nsoZA: "Nord-Sotho",
      sstZA: "Süd-Sotho (Variante)",
      header: "Kopfzeile",
      body: "Textkörper",
      footer: "Fußzeile",
      buttons: "Schaltflächen",
      texto: "Text",
      imagem: "Bild",
      documento: "Dokument",
      video: "Video",
      localizacao: "Standort",
      quickReply: "Schnellantwort",
      url: "URL",
      telefone: "Telefon",
      otp: "Einmalpasswort"
    },    
    tabs: {
      phones: "Wabas",
      templates: "Vorlagen",
      create: "Vorlage erstellen",
      instagram: "Instagram",
      messenger: "Messenger",
      facebook: "Facebook"
    },
    common: {
      selectWabaConnection: "WABA-Verbindung auswählen",
      noWabaConnectionsAvailable: "Keine WABA-Verbindung verfügbar",
      appId: "App-ID",
      appIdHint: "Facebook-App-ID für den Medien-Upload",
      type: "Typ",
      editTemplate: "Vorlage bearbeiten",
      nameHint: "Es sind nur Kleinbuchstaben und Unterstriche (_) erlaubt",
      buttonTextHint: "Maximal 25 Zeichen",
      fieldRequired: "Pflichtfeld",
      phoneNumberIdRequired: "Telefonnummern-ID ist erforderlich",
      wabaIdRequired: "WABA-ID ist erforderlich",
      wabaVersionRequired: "WABA-Version ist obligatorisch",
      wabaTokenRequired: "WABA-Token ist obligatorisch",
      codeRequired: "Geben Sie den erhaltenen Code ein",
      enterPin: "Geben Sie die 6-stellige PIN ein",
      enterCode: "Geben Sie den erhaltenen Code ein",
      enterPhoneNumberId: "Geben Sie die Telefonnummer-ID ein",
      enterWabaId: "WABA-ID eingeben",
      enterWabaVersion: "Beispiel: v23.0",
      enterWabaToken: "Geben Sie das Zugriffstoken ein"
    },
    templates: {
      title: "Vorlagen",
      create: "Vorlage erstellen",
      refresh: "So aktualisieren Sie",
      noTemplates: "Keine Vorlagen gefunden",
      noPreview: "Keine Vorschau verfügbar",
      facebook: "Facebook",
      selectMessengerConnection: "Messenger-Verbindung auswählen",
      noMessengerConnectionsAvailable: "Keine Messenger-Verbindung verfügbar",
      noMessengerConnections: "Keine Messenger-Verbindung gefunden. Richten Sie zunächst eine Messenger-Verbindung im Bereich Kommunikationskanäle ein.",
      templateSelected: "Vorlage ausgewählt",
      filters: {
        status: "Status",
        category: "Kategorie",
        language: "Sprache",
        search: "Suchvorlagen..."
      },
      actions: {
        view: "Sicht",
        test: "Prüfen",
        edit: "Bearbeiten",
        delete: "Löschen"
      },
      createForm: {
        basicInfo: "Grundlegende Informationen",
        name: "Vorlagenname",
        nameRequired: "Name ist erforderlich",
        appIdRequired: "App-ID ist erforderlich",
        language: "Sprache",
        languageRequired: "Sprache ist erforderlich",
        category: "Kategorie",
        categoryRequired: "Kategorie ist obligatorisch",
        components: "Komponenten",
        addComponent: "Komponente hinzufügen",
        component: "Komponente",
        componentType: "Komponententyp",
        headerFormat: "Header-Format",
        text: "Text",
        buttons: "Schaltflächen",
        addButton: "Schaltfläche „Hinzufügen“",
        button: "Taste",
        buttonType: "Schaltflächentyp",
        buttonText: "Schaltflächentext",
        url: "URL",
        phoneNumber: "Telefonnummer",
        submit: "Vorlage erstellen",
        requiredFieldsNote: "Die mit * gekennzeichneten Felder sind Pflichtfelder"
      },
      details: {
        info: "Information",
        id: "AUSWEIS",
        status: "Status",
        category: "Kategorie",
        language: "Sprache",
        components: "Komponenten"
      },
      delete: {
        confirmTitle: "Löschung bestätigen",
        confirmMessage: "Möchten Sie die Vorlage „{name}“ wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden."
      },
      notifications: {
        created: "Vorlage erfolgreich erstellt!",
        updated: "Vorlage erfolgreich aktualisiert!",
        deleted: "Vorlage erfolgreich gelöscht!"
      },
      
      // Warnungen
      warnings: {
        marketingConvertedToUtility: "Vorlage als UTILITY erstellt. Marketing-Vorlagen in Messenger erfordern notification_message_tokens über Benutzer-Opt-in und können nicht über den message_templates-Endpunkt erstellt werden."
      },
      errors: {
        listError: "Fehler beim Laden der Vorlagen",
        createError: "Fehler beim Erstellen der Vorlage",
        updateError: "Fehler beim Aktualisieren der Vorlage",
        deleteError: "Fehler beim Löschen der Vorlage",
        noValidComponents: "Fügen Sie mindestens eine gültige Komponente hinzu (HEADER, BODY oder BUTTONS)"
      },
      facebookCreateComingSoon: "Die Facebook-Vorlagenerstellung wird in den kommenden Versionen verfügbar sein.",
      wabaCreateComingSoon: "Die WABA-Vorlagenerstellung wird in den kommenden Versionen verfügbar sein.",
      noTemplatesFound: "Keine Vorlagen für diese Verbindung gefunden.",
      messengerCategoryHint: "Messenger unterstützt nur UTILITY-Vorlagen. Marketing-Vorlagen erfordern notification_message_tokens über Benutzer-Opt-in."
    },
    phones: {
      title: "Wabas",
      selectConnection: "WABA-Verbindung auswählen",
      noConnections: "Keine WABA-Verbindung verfügbar",
      checkPhone: "WABA überprüfen",
      registerPhone: "WABA registrieren",
      noConnectionsFound: "Keine WABA-Verbindung gefunden. Bitte richten Sie zunächst im Bereich „Kommunikationskanäle“ eine WABA-Verbindung ein.",
      selectConnectionToManage: "Wählen Sie eine WABA-Verbindung zur Verwaltung von Telefonen aus.",
      connectionInfo: {
        title: "WABA-Verbindungsinformationen",
        phoneNumberId: "Telefonnummern-ID",
        wabaId: "WABA-ID",
        wabaVersion: "WABA-Version"
      },
      phoneStatus: {
        title: "Telefonstatus",
        phoneNumber: "Telefonnummer",
        phoneId: "Telefon-ID",
        verifiedName: "Name verifiziert",
        status: "Status"
      },
      tips: {
        title: "Tipps und Informationen",
        phoneVerification: {
          title: "Telefonüberprüfung",
          description: "Stellen Sie sicher, dass Ihr Telefon bei der WhatsApp Business API registriert und aktiv ist."
        },
        phoneRegistration: {
          title: "Telefonische Anmeldung",
          description: "Um ein Telefon zu registrieren, benötigen Sie die 6-stellige PIN, die Sie vom Facebook Business Manager erhalten."
        },
        verifiedStatus: {
          title: "Verifizierter Status",
          description: "Verifizierte Telefone können Nachrichten und Vorlagen senden."
        },
        facebookBusinessManager: {
          title: "Facebook Business Manager",
          description: "Zugriff: Business Manager → WhatsApp Business API → Telefonnummern"
        }
      }
    },
    instagram: {
      title: "Instagram",
      selectInstagramConnection: "Instagram-Verbindung auswählen",
      noInstagramConnectionsAvailable: "Keine Instagram-Verbindung verfügbar",
      noInstagramConnections: "Keine Instagram-Verbindung gefunden. Bitte richten Sie zunächst im Bereich „Kommunikationskanäle“ eine Instagram-Verbindung ein.",
      selectConnectionToManage: "Wählen Sie eine Instagram-Verbindung zur Verwaltung des Kontos aus.",
      verifyAccount: "Konto überprüfen",
      selectInstagramFirst: "Wählen Sie zuerst eine Instagram-Verbindung aus",
      accountInfoLoaded: "Kontoinformationen erfolgreich geladen!",
      accountCheckError: "Fehler beim Überprüfen des Instagram-Kontos",
      connectionInfo: {
        title: "Instagram-Verbindungsinformationen",
        instagramPageId: "Instagram Page ID",
        wabaId: "WABA-ID",
        wabaVersion: "WABA-Version"
      },
      accountInfo: {
        title: "Instagram-Kontoinformationen",
        accountId: "Konto-ID",
        username: "Benutzername",
        name: "Name",
        profilePicture: "Profilbild"
      },
      tips: {
        title: "Tipps und Informationen",
        accountVerification: {
          title: "Kontoverifizierung",
          description: "Stellen Sie sicher, dass das Instagram-Konto in Meta Business Manager verbunden und aktiv ist."
        },
        facebookBusinessManager: {
          title: "Facebook Business Manager",
          description: "Zugriff: Business Manager → Instagram → Verbundene Konten"
        }
      }
    },
    messenger: {
      title: "Messenger",
      selectMessengerConnection: "Messenger-Verbindung auswählen",
      noMessengerConnectionsAvailable: "Keine Messenger-Verbindung verfügbar",
      noMessengerConnections: "Keine Messenger-Verbindung gefunden. Bitte richten Sie zunächst im Bereich 'Kommunikationskanäle' eine Messenger-Verbindung ein.",
      selectConnectionToManage: "Wählen Sie eine Messenger-Verbindung zur Verwaltung der Seite aus.",
      verifyAccount: "Seite überprüfen",
      selectMessengerFirst: "Wählen Sie zuerst eine Messenger-Verbindung aus",
      accountInfoLoaded: "Seiteninformationen erfolgreich geladen!",
      accountCheckError: "Fehler beim Überprüfen der Messenger-Seite",
      connectionInfo: {
        title: "Messenger-Verbindungsinformationen",
        fbPageId: "Facebook Page ID",
        wabaId: "WABA-ID",
        wabaVersion: "WABA-Version"
      },
      accountInfo: {
        title: "Messenger-Seiteninformationen",
        pageId: "Seiten-ID",
        name: "Name",
        category: "Kategorie",
        picture: "Profilbild",
        about: "Über",
        website: "Website",
        phone: "Telefon",
        location: "Standort"
      },
      tips: {
        title: "Tipps und Informationen",
        pageVerification: {
          title: "Seitenüberprüfung",
          description: "Stellen Sie sicher, dass die Facebook-Seite in Meta Business Manager verbunden und aktiv ist."
        },
        facebookBusinessManager: {
          title: "Facebook Business Manager",
          description: "Zugriff: Business Manager → Seiten → Verbundene Seiten"
        }
      }
    },
    facebook: {
      title: "Facebook",
      selectFacebookConnection: "Facebook-Verbindung auswählen",
      noFacebookConnectionsAvailable: "Keine Facebook-Verbindung verfügbar",
      noFacebookConnections: "Keine Facebook-Verbindung gefunden. Bitte richten Sie zunächst im Bereich \"Kommunikationskanäle\" eine Facebook-Verbindung ein.",
      selectConnectionToManage: "Wählen Sie eine Verbindung zur Verwaltung aus",
      verifyPage: "Seite überprüfen",
      selectFacebookFirst: "Bitte wählen Sie zuerst eine Facebook-Verbindung aus",
      pageInfoLoaded: "Seiteninformationen erfolgreich geladen!",
      pageCheckError: "Fehler beim Überprüfen der Facebook-Seite",
      connectionInfo: {
        title: "Verbindungsinformationen",
        pageId: "Page ID",
        wabaId: "WABA ID",
        wabaVersion: "WABA-Version"
      },
      pageInfo: {
        title: "Seiteninformationen",
        pageId: "Page ID",
        name: "Name",
        category: "Kategorie",
        about: "Über",
        website: "Website",
        phone: "Telefon",
        profilePicture: "Profilbild"
      },
      tips: {
        title: "Tipps",
        pageVerification: {
          title: "Seitenüberprüfung",
          description: "Stellen Sie sicher, dass die Facebook-Seite überprüft ist und die erforderlichen Berechtigungen hat."
        },
        facebookBusinessManager: {
          title: "Facebook Business Manager",
          description: "Die Seite muss mit dem Facebook Business Manager verknüpft sein und die Berechtigungen konfiguriert haben."
        }
      }
    },
    phoneRegistration: {
      title: "Telefon in WABA registrieren",
      description: "Um ein Telefon zu registrieren, benötigen Sie die 6-stellige PIN, die Sie vom Facebook Business Manager erhalten.",
      phoneNumberId: "Telefonnummern-ID",
      phoneNumberIdHint: "Eindeutige Telefon-ID in WABA",
      wabaId: "WABA-ID",
      wabaIdHint: "WhatsApp Business-Konto-ID",
      wabaVersion: "WABA-Version",
      wabaVersionHint: "Facebook Graph API-Version",
      wabaToken: "WABA-Token",
      wabaTokenHint: "API-Zugriffstoken",
      pin: "6-stellige PIN",
      pinHint: "6-stellige PIN für die Facebook Business Manager-Registrierung",
      register: "Telefon registrieren",
      success: "Telefon erfolgreich bei WABA registriert!",
      error: "Fehler beim Registrieren des Telefons. Überprüfen Sie PIN und Anmeldeinformationen."
    },
    verification: {
      requestTitle: "Anforderungscode",
      verifyTitle: "Prüfcode",
      requestDescription: "Ein Bestätigungscode wird per SMS oder Anruf an die registrierte Telefonnummer gesendet.",
      verifyDescription: "Geben Sie den Bestätigungscode ein, der per SMS oder Telefonanruf gesendet wurde.",
      code: "Code",
      codeHint: "Geben Sie den per SMS oder Telefonanruf erhaltenen Code ein",
      requestCode: "Anforderungscode",
      requestNewCode: "Neuen Code anfordern",
      verify: "Überprüfen",
      success: "Bestätigungscode per SMS oder Telefonanruf gesendet! Bestätigen Sie Ihr Telefon.",
      verifySuccess: "Code erfolgreich verifiziert! Telefon aktiviert.",
      error: "Fehler beim Anfordern des Bestätigungscodes.",
      verifyError: "Fehler beim Überprüfen des Codes. Bitte überprüfen Sie, ob der Code korrekt ist.",
      smsOption: "SMS",
      voiceOption: "Telefonanruf",
      locale: "Standort",
      language: "Sprache",
      methodTitle: "Versandart",
      localeHint: "Wählen Sie den Speicherort für den Bestätigungscode",
      languageHint: "Wählen Sie die Sprache für den Bestätigungscode"
    },
    test: {
      title: "Testvorlage senden",
      phoneNumber: "Testtelefonnummer",
      phoneNumberHint: "Geben Sie die Nummer mit Landesvorwahl ein (z. B. 5511999999999)",
      variables: "Werte für Variablen:",
      variableValue: "Wert für {{1}}",
      variablePlaceholder: "Geben Sie den Wert für {variable} ein",
      preview: "Vorlagenvorschau:",
      sendTest: "Test einreichen",
      success: "Testvorlage erfolgreich gesendet!",
      error: "Beim Senden der Testvorlage ist ein Fehler aufgetreten. Überprüfen Sie die Nummer und versuchen Sie es erneut.",
      invalidNumber: "Die Telefonnummer muss zwischen 10 und 15 Ziffern lang sein.",
      fillVariables: "Füllen Sie alle Werte der Vorlagenvariablen aus."
    },
    messages: {
      selectConnectionToManage: "Wählen Sie eine Verbindung aus, um Vorlagen zu verwalten",
      selectWabaConnection: "Wählen Sie eine WABA-Verbindung aus, um Vorlagen anzuzeigen",
      selectWabaToCreate: "Wählen Sie eine WABA-Verbindung aus, um Vorlagen zu erstellen.",
      selectWabaToEdit: "Wählen Sie eine WABA-Verbindung aus, um die Vorlage zu bearbeiten.",
      selectWabaToDelete: "Wählen Sie eine WABA-Verbindung aus, um die Vorlage zu löschen.",
      selectWabaToTest: "Wählen Sie eine WABA-Verbindung aus, um die Testvorlage zu senden.",
      selectWabaToCheck: "Wählen Sie eine WABA-Verbindung aus, um das Telefon zu überprüfen.",
      selectWabaFirst: "Bitte wählen Sie zuerst eine WABA-Verbindung aus.",
      phoneAlreadyRegistered: "Das Telefon ist bereits bei diesem WABA registriert!",
      phoneNotRegistered: "Das Telefon ist bei diesem WABA nicht registriert.",
      phoneVerifiedNotRegistered: "Telefon bei WABA verifiziert.",
      phoneNotVerified: "Telefonnummer nicht verifiziert. Sie müssen den Verifizierungsprozess abschließen.",
      codeExpired: "Der Bestätigungscode ist abgelaufen. Die Bestätigung muss erneuert werden.",
      sampleTemplateEdit: "Dies ist eine von Facebook bereitgestellte Beispielvorlage und kann nicht bearbeitet werden.",
      sampleTemplateDelete: "Dies ist eine von Facebook bereitgestellte Beispielvorlage und kann nicht gelöscht werden.",
      sampleTemplateChip: "Beispielvorlage",
      sampleTemplateEditTitle: "Beispielvorlagen können nicht bearbeitet werden.",
      sampleTemplateDeleteTitle: "Beispielvorlagen können nicht gelöscht werden",
      noWabaConnections: "Keine WABA-Verbindung gefunden. Bitte richten Sie zunächst im Bereich „Kommunikationskanäle“ eine WABA-Verbindung ein.",
      noWabaConnectionsShort: "Keine WABA-Verbindung gefunden. Bitte richten Sie zuerst eine WABA-Verbindung ein.",
      allFieldsRequired: "Alle Felder sind Pflichtfelder, einschließlich der 6-stelligen PIN.",
      pinFormatError: "Die PIN muss genau 6 Ziffern haben.",
      enterPhoneNumber: "Geben Sie zum Testen eine Telefonnummer ein.",
      enterCode: "Geben Sie den Bestätigungscode ein, den Sie per SMS oder Telefonanruf erhalten haben.",
      codeExpiredDialog: {
        title: "Abgelaufener Code",
        message: "Der Bestätigungscode dieses Telefons ist abgelaufen. Möchten Sie einen neuen anfordern?"
      },
      phoneNotVerifiedDialog: {
        title: "Telefon nicht verifiziert",
        message: "Diese Telefonnummer wurde nicht verifiziert. Möchten Sie einen Verifizierungscode anfordern?"
      }
    },
    statusOptions: {
      approved: "Genehmigt",
      pending: "Ausstehend",
      rejected: "Abgelehnt",
      inAppeal: "Im Berufungsverfahren",
      disabled: "Deaktiviert"
    },
    categoryOptions: {
      utility: "Dienstprogramm",
      marketing: "Marketing",
      authentication: "Authentifizierung"
    },
    languageOptions: {
      ptBR: "Portugiesisch (Brasilien)",
      enUS: "Englisch (US)",
      esES: "Spanisch"
    },
    componentTypeOptions: {
      header: "Kopfzeile",
      body: "Körper",
      footer: "Fußleiste",
      buttons: "Schaltflächen"
    },
    headerFormatOptions: {
      text: "Text",
      image: "Bild",
      document: "Dokumentieren",
      video: "Video",
      location: "Standort"
    },
    buttonTypeOptions: {
      quickReply: "Schnelle Antwort",
      url: "URL",
      phoneNumber: "Telefon",
      otp: "OTP"
    },
    headerFields: {
      imageUrl: "Bild-URL (Beispiel)",
      imagePlaceholder: "https://exemplo.com/imagem.jpg",
      documentUrl: "Dokument-URL (Beispiel)",
      documentPlaceholder: "https://exemplo.com/documento.pdf",
      videoUrl: "Video-URL (Beispiel)",
      videoPlaceholder: "https://exemplo.com/video.mp4",
      latitude: "Breitengrad (Beispiel)",
      latitudePlaceholder: "-23,5505",
      longitude: "Längengrad (Beispiel)",
      longitudePlaceholder: "-46,6333",
      locationName: "Standortname (Beispiel)",
      locationNamePlaceholder: "Sao Paulo, SP"
    },
    characterLimits: {
      header: "Maximal 60 Zeichen",
      body: "Maximal 1024 Zeichen",
      footer: "Maximal 60 Zeichen",
      button: "Maximal 25 Zeichen"
    },
    preview: {
      title: "Vorlagenvorschau",
      imageLoadError: "Bild konnte nicht geladen werden",
      urlNotAvailable: "URL/Handle nicht verfügbar",
      addButtonToStart: "Klicken Sie auf „Schaltfläche hinzufügen“, um mit der Konfiguration Ihrer Schaltflächen zu beginnen."
    },
    buttons: {
      cancel: "Stornieren",
      sendTest: "Test einreichen",
      registerPhone: "Telefon registrieren",
      requestCode: "Anforderungscode",
      requestNewCode: "Neuen Code anfordern",
      verify: "Überprüfen",
      checkPhone: "Telefon überprüfen"
    },
    dynamic: {
      actionButton: "Aktion {index}",
      buttonNumber: "Schaltfläche {index}"
    },
    notifications: {
      noWabaConnectionsFound: "Keine WABA-Verbindung gefunden. Bitte richten Sie zuerst eine WABA-Verbindung ein.",
      selectWabaToList: "Wählen Sie eine WABA-Verbindung aus, um die Vorlagen aufzulisten.",
      noMessengerConnectionsFound: "Keine Messenger-Verbindung gefunden. Richten Sie zunächst eine Messenger-Verbindung ein.",
      selectMessengerToList: "Wählen Sie eine Messenger-Verbindung aus, um die Vorlagen aufzulisten.",
      selectWabaToCreate: "Wählen Sie eine WABA-Verbindung aus, um die Vorlage zu erstellen.",
      selectWabaToEdit: "Wählen Sie eine WABA-Verbindung aus, um die Vorlage zu bearbeiten.",
      selectWabaToDelete: "Wählen Sie eine WABA-Verbindung aus, um die Vorlage zu löschen.",
      selectWabaToTest: "Wählen Sie eine WABA-Verbindung aus, um die Testvorlage zu senden.",
      selectWabaToCheck: "Wählen Sie eine WABA-Verbindung aus, um das Telefon zu überprüfen.",
      selectWabaFirst: "Bitte wählen Sie zuerst eine WABA-Verbindung aus.",
      phoneAlreadyRegistered: "Das Telefon ist bereits bei diesem WABA registriert!",
      templateCreated: "Vorlage erfolgreich erstellt!",
      templateUpdated: "Vorlage erfolgreich aktualisiert!",
      templateDeleted: "Vorlage erfolgreich gelöscht!",
      phoneRegistered: "Telefon erfolgreich bei WABA registriert!",
      codeSent: "Bestätigungscode per SMS oder Telefonanruf gesendet! Bestätigen Sie Ihr Telefon.",
      codeVerified: "Code erfolgreich verifiziert! Telefon aktiviert.",
      testSent: "Testvorlage erfolgreich gesendet!",
      codeExpired: "Der Bestätigungscode ist abgelaufen. Die Bestätigung muss erneuert werden.",
      phoneVerifiedNotRegistered: "Telefon bei WABA verifiziert.",
      phoneNotVerified: "Telefonnummer nicht verifiziert. Sie müssen den Verifizierungsprozess abschließen.",
      phoneNotRegistered: "Das Telefon ist bei diesem WABA nicht registriert.",
      sampleTemplateEdit: "Dies ist eine von Facebook bereitgestellte Beispielvorlage und kann nicht bearbeitet werden.",
      sampleTemplateDelete: "Dies ist eine von Facebook bereitgestellte Beispielvorlage und kann nicht gelöscht werden.",
      nameFormatted: "Der Vorlagenname wurde automatisch entsprechend den Facebook-Regeln formatiert (nur Kleinbuchstaben und Unterstriche).",
      characterLimitExceeded: "Zeichenlimit überschritten",
      characterLimitsExceeded: "Grenzwerte überschritten: {details}",
      fillVariables: "Füllen Sie alle Werte der Vorlagenvariablen aus.",
      invalidNumber: "Die Telefonnummer muss zwischen 10 und 15 Ziffern lang sein.",
      allFieldsRequired: "Alle Felder sind Pflichtfelder, einschließlich der 6-stelligen PIN.",
      pinFormatError: "Die PIN muss genau 6 Ziffern haben.",
      enterPhoneNumber: "Geben Sie zum Testen eine Telefonnummer ein.",
      enterCode: "Geben Sie den Bestätigungscode ein, den Sie per SMS oder Telefonanruf erhalten haben.",
      listError: "Fehler beim Laden der Vorlagen",
      createError: "Fehler beim Erstellen der Vorlage",
      updateError: "Fehler beim Bearbeiten der Vorlage",
      deleteError: "Fehler beim Löschen der Vorlage",
      testError: "Beim Senden der Testvorlage ist ein Fehler aufgetreten. Überprüfen Sie die Nummer und versuchen Sie es erneut.",
      phoneCheckError: "Fehler beim Überprüfen des Telefons. Bitte überprüfen Sie Ihre Anmeldeinformationen.",
      phoneRegistrationError: "Fehler beim Registrieren des Telefons. Überprüfen Sie PIN und Anmeldeinformationen.",
      codeRequestError: "Fehler beim Anfordern des Bestätigungscodes.",
      codeVerificationError: "Fehler beim Überprüfen des Codes. Bitte überprüfen Sie, ob der Code korrekt ist.",
      uploadError: "Fehler beim Senden des Bildes. Überprüfen Sie Ihre Verbindung und versuchen Sie es erneut.",
      uploadSuccess: "Bild erfolgreich hochgeladen! Header-Handle: {handle}",
      codeExpiredDialog: {
        title: "Abgelaufener Code",
        message: "Der Bestätigungscode dieses Telefons ist abgelaufen. Möchten Sie einen neuen anfordern?"
      },
      phoneNotVerifiedDialog: {
        title: "Telefon nicht verifiziert",
        message: "Diese Telefonnummer wurde nicht verifiziert. Möchten Sie einen Verifizierungscode anfordern?"
      }
    }
  },
  googleCallback: {
    processing: "Autorisierung wird verarbeitet...",
    waitMessage: "Bitte warten Sie, während wir Ihre Google Kalender-Autorisierung verarbeiten.",
    errors: {
      authorization: "Autorisierungsfehler: {error}",
      codeNotFound: "Autorisierungscode nicht gefunden",
      configNameNotFound: "Konfigurationsname nicht gefunden",
      noConfigFound: "Keine Konfiguration gefunden",
      configNotFoundForName: "Konfiguration für Name nicht gefunden: {name}",
      invalidTokens: "Fehler beim Abrufen der Token: Ungültige Daten zurückgegeben",
      saveTokensError: "Fehler beim Speichern der Token: {error}",
      processAuthorizationError: "Fehler bei der Verarbeitung der Autorisierung: {error}"
    },
    success: {
      authorizationCompleted: "Autorisierung erfolgreich abgeschlossen!"
    },
    warnings: {
      noParameters: "Keine Parameter in der URL gefunden"
    }
  },
  googleCalendar: {
    title: "Google Kalender",
    config: {
      modal: {
        redirectUri: {
          label: "Weiterleitungs-URL",
          hint: "URL zum Empfang des Autorisierungscodes",
          copyTooltip: "In die Zwischenablage kopieren",
          copySuccess: "Weiterleitungs-URL in die Zwischenablage kopiert!",
          copyError: "Kopieren in die Zwischenablage nicht möglich. Bitte manuell kopieren!"
        },        
        editTitle: "Konfiguration bearbeiten",
        newTitle: "Neue Konfiguration",
        completeMessage: "Einrichtung abgeschlossen! Sie können speichern.",
        incompleteMessage: "Füllen Sie alle Felder aus und holen Sie sich die Token zum Sparen.",
        name: {
          label: "Konfigurationsname",
          required: "Name ist erforderlich",
          hint: "Beispiel: Hauptagenda, persönliche Agenda usw."
        },
        clientId: {
          label: "Google-Client-ID",
          required: "Client-ID ist erforderlich"
        },
        clientSecret: {
          label: "Google Client Secret",
          required: "Client Secret ist obligatorisch"
        },
        accessToken: {
          label: "Zugriffstoken",
          required: "Zugriffstoken ist obligatorisch"
        },
        refreshToken: {
          label: "Aktualisierungstoken",
          required: "Aktualisierungstoken ist obligatorisch"
        },
        getTokensButton: "Token automatisch erhalten",
        getTokensTooltip: "Klicken Sie hier, um Zugriffstoken und Aktualisierungstoken automatisch zu erhalten",
        saveButton: "Konfiguration speichern",
        cancelButton: "Stornieren",
        deleteButton: "Konfiguration löschen"
      },
      management: {
        title: "Einstellungen verwalten",
        newButton: "Neue Konfiguration",
        table: {
          name: "Name",
          status: "Status",
          tokens: "Token",
          createdAt: "Erstellt in",
          actions: "Aktionen",
          statusActive: "Aktiv",
          statusInactive: "Inaktiv",
          tokensComplete: "Vollständig",
          tokensPending: "Ausstehend"
        },
        actions: {
          edit: "Konfiguration bearbeiten",
          delete: "Konfiguration löschen"
        }
      },
      errors: {
        fillRequiredFields: "Füllen Sie alle erforderlichen Felder aus",
        saveError: "Fehler beim Speichern der Konfiguration: {error}",
        deleteError: "Fehler beim Löschen der Konfiguration: {error}",
        fillClientCredentials: "Geben Sie zuerst die Client-ID und das Client-Geheimnis ein",
        fillConfigName: "Geben Sie zuerst den Konfigurationsnamen ein",
        generateAuthUrlError: "Fehler beim Generieren der Autorisierungs-URL: {error}",
        redirectingAuth: "Weiterleitung zur Google-Autorisierung …"
      },
      success: {
        saved: "Konfiguration erfolgreich gespeichert!",
        deleted: "Konfiguration erfolgreich gelöscht!",
        selectedForEdit: "Konfiguration zur Bearbeitung ausgewählt."
      },
      confirm: {
        deleteTitle: "Löschen bestätigen",
        deleteMessage: "Möchten Sie diese Einstellung wirklich löschen?",
        deleteCalendarMessage: "Möchten Sie diese Google Kalender-Einstellung wirklich löschen?"
      }
    },
    events: {
      create: {
        modal: {
          titleCreate: "Neues Ereignis erstellen",
          title: {
            label: "Veranstaltungstitel",
            required: "Titel ist erforderlich"
          },
          selectCalendar: "Kalender auswählen",
          selectCalendarRequired: "Wählen Sie einen Zeitplan",
          noConfigAvailable: "Keine Konfiguration verfügbar",
          startDateTime: {
            label: "Startdatum und -uhrzeit",
            required: "Startdatum ist obligatorisch"
          },
          endDateTime: {
            label: "Enddatum und -zeit",
            required: "Enddatum ist obligatorisch"
          },
          description: {
            label: "Beschreibung"
          },
          location: {
            label: "Standort"
          },
          attendees: {
            label: "Teilnehmer (E-Mails durch Kommas getrennt)",
            hint: "example@email.com, other@email.com"
          },
          createButton: "Ereignis erstellen",
          cancelButton: "Stornieren"
        },
        errors: {
          selectConfig: "Wählen Sie eine Konfiguration aus, um das Ereignis zu erstellen.",
          configNotFound: "Ausgewählte Konfiguration nicht gefunden.",
          configureCredentials: "Richten Sie zuerst Ihre Google Kalender-Anmeldeinformationen ein",
          createError: "Fehler beim Erstellen des Ereignisses: {error}"
        },
        success: {
          created: "Veranstaltung erfolgreich erstellt!"
        }
      },
      list: {
        title: "Veranstaltungen",
        selectCalendar: "Kalender auswählen",
        noConfigAvailable: "Keine Konfiguration verfügbar",
        createNewButton: "Neues Ereignis erstellen",
        createNewTooltip: "Erstellen Sie ein neues Ereignis in Google Kalender",
        filters: {
          startDate: "Startdatum",
          endDate: "Enddatum",
          maxResults: "Anzahl der Ergebnisse",
          searchButton: "Suchen"
        },
        table: {
          title: "Titel",
          start: "Start",
          end: "Ende",
          location: "Standort",
          status: "Status",
          actions: "Aktionen"
        },
        actions: {
          edit: "Ereignis bearbeiten",
          delete: "Ereignis löschen",
          open: "In Google Kalender öffnen"
        },
        errors: {
          selectConfig: "Wählen Sie eine Konfiguration aus, um nach Ereignissen zu suchen.",
          configNotFound: "Ausgewählte Konfiguration nicht gefunden.",
          configureCredentials: "Richten Sie zuerst Ihre Google Kalender-Anmeldeinformationen ein",
          loadError: "Fehler beim Laden der Ereignisse: {error}"
        }
      },
      edit: {
        modal: {
          titleEdit: "Ereignis bearbeiten",
          title: {
            label: "Veranstaltungstitel",
            required: "Titel ist erforderlich"
          },
          startDateTime: {
            label: "Startdatum und -uhrzeit",
            required: "Startdatum ist obligatorisch"
          },
          endDateTime: {
            label: "Enddatum und -zeit",
            required: "Enddatum ist obligatorisch"
          },
          description: {
            label: "Beschreibung"
          },
          location: {
            label: "Standort"
          },
          attendees: {
            label: "Teilnehmer (E-Mails durch Kommas getrennt)",
            hint: "example@email.com, other@email.com"
          },
          updateButton: "Update-Ereignis",
          cancelButton: "Stornieren"
        },
        errors: {
          selectConfig: "Wählen Sie eine Einstellung zum Aktualisieren des Ereignisses.",
          configNotFound: "Ausgewählte Konfiguration nicht gefunden.",
          updateError: "Fehler beim Aktualisieren des Ereignisses: {error}"
        },
        success: {
          updated: "Ereignis erfolgreich aktualisiert!"
        }
      },
      delete: {
        confirm: {
          title: "Löschen bestätigen",
          message: "Möchten Sie dieses Ereignis wirklich löschen?"
        },
        errors: {
          selectConfig: "Wählen Sie eine Einstellung zum Löschen des Ereignisses.",
          configNotFound: "Ausgewählte Konfiguration nicht gefunden.",
          deleteError: "Fehler beim Löschen des Ereignisses: {error}"
        },
        success: {
          deleted: "Ereignis erfolgreich gelöscht!"
        }
      }
    }
  },
  gmailCallback: {
    processing: "Autorisierung wird verarbeitet...",
    waitMessage: "Bitte warten, während wir Ihre Gmail-Autorisierung verarbeiten.",
    title: "Gmail-Autorisierung abgeschlossen!",
    message: "Ihr Gmail-Konto wurde erfolgreich für OAuth2 konfiguriert.",
    infoSession: "Sitzungsinformationen:",
    whatsappId: "WhatsApp-ID:",
    status: "Status:",
    data: "Datum:",
    closeWindow: "Fenster schließen",
    errorTitle: "Fehler bei der Autorisierung",
    debugInfo: "Debug-Informationen:",
    fullUrl: "Vollständige URL:",
    parameters: "Parameter:",
    retry: "Erneut versuchen",
    callbackTitle: "Gmail-Callback",
    waitingMessage: "Warten auf die Verarbeitung der Autorisierung...",
    noParametersFound: "Keine Parameter in der URL gefunden",
    authorizationError: "Autorisierungsfehler",
    codeNotFound: "Autorisierungscode nicht gefunden",
    whatsappIdNotFound: "WhatsApp-ID nicht gefunden",
    saveTokensError: "Fehler beim Speichern der Tokens",
    processAuthorizationError: "Fehler bei der Verarbeitung der Autorisierung"
  },
  massaWavoip: {
    title: "Wavoip - Massenanrufe",
    sections: {
      sessions: {
        title: "Wavoip-Sitzungen",
        refresh: "Aktualisieren",
        noSessions: "Keine Sitzungen mit Wavoip-Token gefunden",
        connectButton: "Sitzungen verbinden",
        connecting: "Verbinden...",
        status: {
          connected: "Verbunden",
          disconnected: "Getrennt",
          online: "Online",
          offline: "Offline"
        }
      },
      phoneNumbers: {
        title: "Telefonnummern",
        addButton: "Nummer hinzufügen",
        noNumbers: "Keine Nummern hinzugefügt",
        dialog: {
          title: "Nummer hinzufügen",
          message: "Telefonnummer eingeben (mit Ländercode):",
          placeholder: "Bsp: 5511999999999"
        }
      },
      audioFile: {
        title: "Audiodatei",
        selectFile: "Audiodatei auswählen",
        supportedFormats: "Unterstützte Formate: MP3, WAV, OGG, M4A, AAC",
        dragDrop: "Audiodatei hierher ziehen oder klicken zum Auswählen",
        dragActive: "Datei hier ablegen..."
      },
      status: {
        title: "Sitzungsstatus",
        makeCall: "Anruf tätigen an:",
        callButton: "Anrufen"
      },
      callControls: {
        incomingCall: "Eingehender Anruf",
        activeCall: "Aktiver Anruf",
        accept: "Annehmen",
        reject: "Ablehnen",
        injectAudio: "Audio einspritzen",
        playing: "Wiedergabe...",
        endCall: "Beenden",
        transmittingAudio: "🎵 Audio wird im Anruf übertragen"
      }
    },
    notifications: {
      selectSession: "Mindestens eine Sitzung auswählen",
      sessionNotConnected: "Sitzung ist nicht verbunden",
      noAudioFile: "Keine Audiodatei geladen",
      invalidInstance: "Ungültige Wavoip-Instanz",
      connectionsEstablished: "Verbindungen hergestellt!",
      wavoipError: "Fehler beim Verbinden mit Wavoip",
      callStarted: "Anruf gestartet!",
      callError: "Fehler beim Starten des Anrufs",
      callAccepted: "Anruf angenommen!",
      acceptError: "Fehler beim Annehmen des Anrufs",
      callRejected: "Anruf abgelehnt",
      callEnded: "Anruf beendet",
      endError: "Fehler beim Beenden des Anrufs",
      audioTransmitted: "Audio wird im Anruf übertragen!",
      audioError: "Fehler beim Einspritzen von Audio",
      audioFileError: "Fehler beim Laden der Audiodatei",
      wavoipLibraryError: "Fehler beim Laden der Wavoip-Bibliothek",
      numberAdded: "Nummer hinzugefügt: {number}",
      numberRemoved: "Nummer entfernt: {number}",
      fileLoaded: "Datei geladen: {filename}",
      fileRemoved: "Datei entfernt",
      sessionsUpdated: "Sitzungen aktualisiert",
      callReceived: "Anruf erhalten von {name}"
    },
    logs: {
      audioContextInitialized: "AudioContext initialisiert",
      audioContextNotSupported: "AudioContext wird in diesem Browser nicht unterstützt",
      audioContextError: "Fehler beim Initialisieren des AudioContext: {error}",
      globalInterceptionSetup: "Globale getUserMedia-Abfangung einrichten...",
      globalInterceptionConfigured: "Globale Abfangung konfiguriert",
      globalInterceptionError: "Fehler beim Konfigurieren der Abfangung: {error}",
      wavoipInitializing: "Wavoip-Verbindungen initialisieren...",
      sessionExpanded: "Sitzung {name} in {count} Token erweitert",
      sessionInitialized: "Sitzung {name} initialisiert",
      sessionConnected: "Sitzung {name} verbunden",
      sessionDisconnected: "Sitzung {name} getrennt",
      sessionNoToken: "Sitzung {sessionId} hat kein Wavoip-Token",
      sessionConnectError: "Fehler beim Verbinden der Sitzung {name}: {error}",
      wavoipImportError: "Fehler beim Importieren von Wavoip: {error}",
      wavoipNotLoaded: "Wavoip wurde nicht korrekt geladen",
      connectionFailed: "Verbindung fehlgeschlagen - Instanz nicht erstellt",
      callStarting: "Anruf starten an {number}",
      callStarted: "Anruf gestartet an {number}",
      callStartError: "Fehler beim Starten des Anrufs: {error}",
      signalingData: "Signalisierungsdaten: {data}",
      acceptEvent: "Accept-Ereignis empfangen für Sitzung: {sessionId}",
      callTerminated: "Anruf beendet",
      callRejected: "Anruf abgelehnt",
      callAccepted: "Anruf angenommen",
      audioInjecting: "Audio in Anruf einspritzen...",
      audioInjected: "Audio erfolgreich eingespritzt!",
      audioInjectionError: "Fehler beim Einspritzen von Audio: {error}",
      audioNotLoaded: "Audiodatei nicht geladen",
      audioTransmissionEnded: "Audioübertragung beendet",
      audioStopping: "Alle Audios stoppen",
      audioStopped: "Alle Audios gestoppt",
      audioFileLoaded: "Audiodatei geladen: {filename}",
      audioFileError: "Fehler beim Laden der Audiodatei: {error}",
      audioContextNotAvailable: "AudioContext nicht verfügbar zum Laden der Datei",
      getUserMediaCalled: "getUserMedia aufgerufen durch Abfangung",
      interceptingGetUserMedia: "getUserMedia abfangen - MP3-Stream zurückgeben",
      usingOriginalGetUserMedia: "Originales getUserMedia verwenden",
      instanceCleaning: "Sitzungsinstanz {sessionId} bereinigen",
      instanceRemoved: "Sitzungsinstanz {sessionId} entfernt",
      instanceCleanupError: "Fehler beim Bereinigen der Instanz: {error}",
      resourcesCleaning: "Ressourcen bereinigen...",
      cleanupComplete: "Bereinigung vollständig abgeschlossen",
      sourceStopError: "Fehler beim Stoppen der Quelle: {error}"
    }
  },
  migration: {
    title: 'Tenant-Migration',
    totalMigrations: 'Gesamte Migrationen',
    completed: 'Abgeschlossen',
    inProgress: 'In Bearbeitung',
    failed: 'Fehlgeschlagen',
    newMigration: 'Neue Migration',
    migrationInfoTitle: 'Migrationsinformationen',
    migrationInfoDescription: 'Migrieren Sie einen vollständigen Tenant von einem VPS zu einem anderen, einschließlich aller Daten und Dateien.',
    requirements: 'Anforderungen',
    remoteDatabase: 'Remote-Datenbankkonfiguration',
    dbHost: 'Host',
    dbPort: 'Port',
    dbDialect: 'Dialekt',
    dbName: 'Datenbankname',
    dbUser: 'Benutzer',
    dbPassword: 'Passwort',
    sshConfig: 'SSH-Konfiguration',
    sshHost: 'SSH-Host',
    sshPort: 'SSH-Port',
    sshUser: 'SSH-Benutzer',
    sshPassword: 'SSH-Passwort',
    sshPasswordOrKey: 'Oder verwenden Sie einen privaten Schlüssel',
    sshPrivateKey: 'SSH-Private Key',
    zproBasePath: 'ZPRO-Basis-Pfad',
    publicFolderPath: 'Öffentlicher Ordner-Pfad',
    migrationConfig: 'Migrationskonfiguration',
    sourceTenantId: 'Quell-Tenant-ID',
    targetTenantId: 'Ziel-Tenant-ID',
    startMigration: 'Migration starten',
    migrationsList: 'Migrationsliste',
    refresh: 'Aktualisieren',
    viewDetails: 'Details anzeigen',
    resume: 'Fortsetzen',
    migrationDetails: 'Migrationsdetails',
    basicInfo: 'Grundinformationen',
    status: 'Status',
    createdAt: 'Erstellt am',
    updatedAt: 'Aktualisiert am',
    progressInfo: 'Fortschrittsinformationen',
    currentStep: 'Aktueller Schritt',
    progress: 'Fortschritt',
    currentModel: 'Aktuelles Modell',
    files: 'Dateien',
    completedModels: 'Abgeschlossene Modelle',
    error: 'Fehler',
    close: 'Schließen',
    confirm: 'Bestätigen',
    chooseMigrationType: 'Wählen Sie den Migrationstyp:',
    fullMigration: 'Vollständige Migration (Datenbank + Dateien)',
    databaseOnly: 'Nur Datenbank',
    filesOnly: 'Nur Dateien',
    loadSavedConfig: 'Gespeicherte Konfiguration laden',
    saveConfig: 'Konfiguration speichern',
    clearSavedConfig: 'Gespeicherte Konfiguration löschen',
    savedConfigAvailable: 'Gespeicherte Konfiguration verfügbar. Klicken Sie auf das Speichern-Symbol (grün) zum Laden.',
    configSavedSuccess: 'Konfiguration erfolgreich gespeichert',
    configSavedMessage: 'Die Konfiguration wurde gespeichert und kann wiederverwendet werden',
    configSaveError: 'Fehler beim Speichern der Konfiguration',
    configLoadedSuccess: 'Konfiguration erfolgreich geladen',
    configSavedAt: 'Gespeichert am:',
    noSavedConfig: 'Keine gespeicherte Konfiguration gefunden',
    configLoadError: 'Fehler beim Laden der Konfiguration',
    confirmClearConfig: 'Möchten Sie die gespeicherte Konfiguration wirklich löschen?',
    configClearedSuccess: 'Gespeicherte Konfiguration wurde entfernt',
    configClearError: 'Fehler beim Löschen der Konfiguration',
    databaseMigrationStarted: 'Datenbankmigration erfolgreich gestartet',
    databaseMigrationError: 'Fehler beim Starten der Datenbankmigration',
    filesMigrationStarted: 'Dateimigration erfolgreich gestartet',
    filesMigrationError: 'Fehler beim Starten der Dateimigration',
    migrationLogs: 'Migrations-Logs',
    refreshLogs: 'Logs aktualisieren',
    downloadLog: 'Log herunterladen',
    noLogsAvailable: 'Keine Logs verfügbar',
    logsLoadError: 'Fehler beim Laden der Logs',
    logDownloadSuccess: 'Log erfolgreich heruntergeladen',
    logDownloadError: 'Fehler beim Herunterladen des Logs',
    retryDatabase: 'Datenbankmigration wiederholen',
    retryFiles: 'Dateimigration wiederholen',
    pause: 'Pausieren',
    pauseSuccess: 'Migration erfolgreich pausiert',
    pauseError: 'Fehler beim Pausieren der Migration'
  },
  updateNotification: {
    title: 'Neue Version verfügbar!',
    message: 'Eine neue Version der Anwendung ist verfügbar. Aktualisieren Sie, um die neuesten Verbesserungen zu erhalten. Auf dem Desktop aktualisieren Sie mit dem Befehl Ctrl+Shift+R.',
    updateButton: 'Jetzt aktualisieren'
  }
};
