export default {
  pushNotification: {
    activeSubscriptionWebPush: "プッシュ通知を有効にする",
    updateSubscriptionWebPush: "プッシュ通知を更新する"
  },
  buscarMensagemModal: {
    title: "メッセージの検索（ベータ版）",
    searchPlaceholder: "検索する語句を入力してください",
    searchButton: "検索",
    loadingMessages: "メッセージを検索しています...",
    loadingMoreMessages: "さらにメッセージを読み込んでいます...",
    atendimento: "サービス： ＃",
    messageDate: "メッセージの日付: ",
    channel: "チャネル： ",
    status: "状態： ",
    group: "グループ： ",
    lastMessage: "最後のメッセージ: ",
    unknown: "未知",
    noMessages: "メッセージはありません",
    closeButton: "閉じる",
    statusMap: {
      closed: "閉鎖",
      open: "開ける",
      pending: "保留中",
      schedule: "予定"
    },
    isGroup: {
      yes: "はい",
      no: "いいえ"
    }
  },
  generalAgendamento: {
    appointments: "予約",
    addAppointment: "スケジュールを追加",
    attention: "注意！！このメッセージを本当に削除しますか?",
    oldMessages: "古いメッセージはクライアントから削除されません。",
    yes: "はい",
    no: "いいえ",
    message: "メッセージ",
    contact: "接触",
    actions: "アクション",
    status: "状態",
    type: "タイプ",
    date: "日付",
    created: "作成",
    dateFormat: "dd/MM/yyyy 時:分:秒"
  },
  status: {
    open: "開ける",
    closed: "閉鎖",
    pending: "保留中",
    schedule: "予定",
    undefined: "不定"
  },
  type: {
    chat: "文章",
    image: "画像",
    templates: "テンプレート",
    video: "ビデオ",
    application: "ファイル",
    text: "ファイル"
  },
  dialog: {
    title: "メッセージのスケジュール設定",
    close: "閉じる",
    selectWhatsapp: "WhatsAppを選択",
    selectContact: "連絡先を選択",
    loadingContacts: "しばらくお待ちください... 連絡先を読み込んでいます。",
    searchTip: "名前または電話番号で検索してください！"
  },
  inputMensagemAgendamento: {
    added: "追加した",
    templateError: "テンプレートが選択されていません。",
    scheduleError: "メッセージをスケジュールするには、「スケジュールの日付/時刻」フィールドに入力します。",
    templateScheduledSuccess: "テンプレートが正常にスケジュールされました。",
    templateSendError: "テンプレートの送信中にエラーが発生しました。",
    recurrenceCountLabel: "繰り返し回数（メッセージ作成時のデフォルト：1）",
    recurrenceLabel: "再発",
    noRepeat: "繰り返さないでください",
    every5Days: "5日ごと",
    every10Days: "10日ごと",
    every15Days: "15日ごと",
    every20Days: "20日ごと",
    every25Days: "25日ごと",
    every30Days: "30日ごと",
    every35Days: "35日ごと",
    every40Days: "40日ごと",
    every45Days: "45日ごと",
    every60Days: "60日ごと",
    customRecurrence: "カスタム繰り返し",
    customRecurrenceDaysLabel: "カスタム繰り返し日数",
    messageScheduled: "メッセージのスケジュールが正常に完了しました。",
    placeholder: "メッセージを入力してください",
    scheduleFile: "スケジュールファイル",
    scheduleMessage: "スケジュールメッセージ",
    scheduleSticker: "スケジュールステッカー",
    scheduleImageTo: "スケジュール画像",
    scheduleVideo: "ビデオ会議のスケジュールリンク",
    templates: "テンプレート",
    activateSignature: "サブスクリプションを有効にする",
    deactivateSignature: "サブスクリプションを無効にする",
    confirmSend: "送信確認: 入力",
    cancelSend: "キャンセル: ESC",
    scheduleDateLabel: "予約日時",
    customSchedule: "カスタムスケジュール",
    thirthyMinutes: "30分で",
    isTomorrow: "明日",
    nextWeek: "来週",
    selectTemplate: "テンプレートを選択",
    schedule: "スケジュールするには",
    cancel: "キャンセル",
    selectWhatsapp: "WhatsAppを選択",
    selectContact: "連絡先を選択",
    emoji: "絵文字",
    find: "検索...",
    invalidFile: "無効なファイル",
    acceptFormats: "受け入れ可能な形式",
    error: "エラーが発生しました",
    fileNotFound: "アップロードするファイルがありません",
    messageNotFound: "送信するメッセージはありません",
    checkFiles: "選択したファイルのサイズと拡張子を確認する"
  },
  mixinCommonAgendamento: {
    note: "知らせ",
    buttonNotAvailable: "このボタンはモバイルでのみクリック可能です",
    dateFormat: "日/月/年"
  },
  aniversarios: {
    title: "誕生日",
    sendManualMessage: "誕生日メッセージを手動で送信する",
    modalTitle: "WhatsAppを選択",
    modalDescription: "誕生日メッセージを手動で送信する",
    modalWarning: "送信をクリックすると、その日に誕生日を迎える方に、チャンネルに登録した誕生日メッセージが送信されます。",
    sendingMessages: "しばらくお待ちください。誕生日メッセージを送信しています...",
    sendingMessagesSuccess: "誕生日メッセージが正常に送信されました。",
    sendingMessagesError: "誕生日メッセージの送信中にエラーが発生しました。",
    cancel: "キャンセル",
    send: "送信する",
    whatsappLabel: "ワッツアップ",
    columns: {
      id: "#",
      name: "名前",
      birthdayDate: "誕生日",
      actions: "アクション"
    }
  },
  api: {
    title: "API設定",
    addButton: "追加するには",
    postmanButton: "郵便配達員",
    copyToken: "トークンをコピー",
    editConfig: "設定を編集する",
    newToken: "新しいトークンを生成する",
    deleteConfig: "設定の削除",
    url: "URL",
    bearerToken: "無記名トークン",
    key: "鍵",
    actions: "アクション",
    dialogDeleteTitle: "注意！！",
    dialogDeleteMessage: "本当に削除しますか?",
    dialogNewTokenMessage: "本当に新しいトークンを生成してもよろしいですか？",
    deleteSuccess: "削除されました！",
    deleteError: "削除できませんでした。",
    tokenUpdated: "トークンが更新されました!",
    tokenUpdateError: "トークンを更新できません。",
    tokenCopied: "トークンをコピーしました!",
    dialogCancel: "いいえ",
    dialogConfirm: "はい",
    columns: {
      name: "名前",
      token: "トークン",
      isActive: "アクティブ",
      actions: "アクション"
    }
  },
  modalApi: {
    titleCreate: "API構成を作成する",
    titleEdit: "API設定の編集",
    fieldsetApiData: "APIデータ",
    apiNameLabel: "API名",
    apiSessionLabel: "送信者",
    apiSessionError: "必須",
    apiSessionHint: "オプション。セッションを必要としないクエリ/リストAPIの場合は空のままにしてください",
    apiAuthTokenLabel: "認証トークン",
    apiAuthTokenHint: "ヘッダー内の承認として送信されます。プレフィックスがある場合は、ここに入力する必要があります。例：ベアラー、トークン",
    apiAuthTokenError: "認証トークンは必須です",
    fieldsetWebhook: "ウェブフック",
    activeLabel: "アクティブ",
    cancelButton: "キャンセル",
    saveButton: "保存",
    wabaBannerTitle: "公式API（WABA）",
    wabaBannerDescription1: "利用可能なエンドポイント: SetQueue、SetTicketInfo、SetTag、ShowTicketInformation、ShowChannelInformation、ShowTicketInformationChatBot、ShowAllTicketInformation",
    wabaBannerDescription2: "ベータ版: SendMessageParams、SendMessageAPIFile、SendMessageAPIFileURL、SendMessageAPIText、SendMessageAPITextBase64",
    wabaBannerDescription3: "メッセージやその他のコンポーネントを送信するには、公式のメタ コレクションを使用します。 ",
    wabaBannerLink: "リンク",
    validationError: "必須フィールドと不一致を確認します。",
    apiCreatedSuccess: "API が正常に作成されました。",
    apiEditedSuccess: "API が正常に編集されました。",
    apiError: "エラーが発生しました!"
  },
  assinatura: {
    lookForUpdatedData: "更新されたライセンスデータを検索しています...",
    updateInfo: "情報を更新する",
    licenseRefreshError: "ライセンスの更新中にエラーが発生しました",
    domainModalTitle: 'ドメイン',
    domainModalSubtitle: '許可したいドメインを追加してください',
    domainFieldLabel: 'ドメイン（カンマ区切り）',
    domains: "ドメイン: ",
    domainWarning: "⚠️ 注意: ドメイン \"whatsapp.com\" は例示のためのものです。システムがインストールされているドメインに変更してください (例: your-domain.com)。",
    backendVersion: "バックエンドバージョン: ",
    frontendVersion: "フロントエンドバージョン: ",
    expireIn: "このバージョンの有効期限: ",
    remainingDays: "次回の必須更新日: ",
    expiredVersion: "期限切れバージョンです!",
    days: "日数",
    blockOn: "ブロックされました",
    blockOff: "リリース",
    license_code: "ライセンスコード: ",
    license_expiry: "ライセンスの有効期限: ",
    is_blocked: "ブロックされました: ",
    pageTitle: "ライセンス管理",
    pageSubtitle: "ライセンス情報を制御および調整します。",
    license: "ライセンス： ",
    licenseStatusLabel: "ライセンスステータス: ",
    licenseActive: "アクティブ",
    licenseValidating: "検証中...",
    forceReleaseUpdateButton: "更新ボタンの強制リリース",
    emailLabel: "Eメール:",
    updateLicenseButton: "ライセンスの変更",
    modalTitle: "キーの変更",
    modalSubtitle: "ライセンスキーを更新する",
    emailFieldLabel: "新しいキー",
    emailFieldError: "キーは必須です",
    cancelButton: "キャンセル",
    saveButton: "保存",
    successMessage: "ライセンス キーが正常に更新されました。",
    errorLimitExceeded: "多くのアクティベーション試行が行われました。 1分後にもう一度お試しください",
    errorUpdate: "メールの更新中にエラーが発生しました。"
  },
  modalPlano: {
    titleCreate: "プランを作成",
    titleEdit: "プランを編集",
    valueLabel: "プランの価値",
    connectionsLabel: "接続",
    usersLabel: "ユーザー",
    cancelButton: "キャンセル",
    saveButton: "保存",
    successCreate: "プランが正常に作成されました。",
    successEdit: "プランの編集に成功しました。",
    error: "エラーが発生しました!"
  },
  atualizar: {
    migrationTitle: "ファイル移行",
    migrationBanner: "注意: これは元に戻せないプロセスであり、パブリック フォルダー内のファイルのコピーが Company サブフォルダーに作成されます。ファイル移行プロセスを開始する前に、VPS のスナップショットを作成し、介入の可能性に備えて、VPS 上の SSH 経由でルート ユーザーにアクセスできることを確認する必要があります。このプロセスは、VPS のパフォーマンスとファイルの数に応じて、最大数時間かかる場合があります。",
    migrationButton: "移行を開始する",
    cleanTitle: "パブリックフォルダーのクリーニング",
    cleanBanner: "警告: これは元に戻せないプロセスであり、パブリック フォルダー内のすべてのファイルが削除されます。ファイル クリーニング プロセスを開始する前に、VPS のスナップショットを作成し、介入の可能性に備えて、VPS 上の SSH 経由でルート ユーザーにアクセスできることを確認する必要があります。このプロセスは、VPS のパフォーマンスとファイルの数に応じて、最大数時間かかる場合があります。",
    cleanButton: "掃除を始める",
    updateTitle: "自動更新",
    updateButton: "アップデートを開始",
    updateBanner: "このプロセスは、VPS のスナップショットを作成した後にのみ実行してください。このプロセスは、テナント 1 のスーパー管理者が実行する必要があります。サーバーのバックアップ (スナップショット) を実行し、端末にアクセスできることを確認します。 VPSに不安定な状態がある場合、アップデートが失敗する可能性があり、ターミナル経由で自動アップデートを実行する必要があります。",
    buttonWarning: "このプロセスは、テナント 1 のスーパー管理者が実行する必要があります。サーバーのバックアップ (スナップショット) を実行し、端末にアクセスできることを確認します。更新プロセスを開始してもよろしいですか?",
    uploadSuccess: "ファイルが正常にアップロードされました。",
    uploadError: "ファイルの読み込み中にエラーが発生しました。",
    updateStartSuccess: "更新プロセスが正常に開始されました。",
    updateStartError: "更新プロセスを開始できませんでした。",
    migrationStartSuccess: "移行プロセスが正常に開始されました。",
    migrationStartError: "移行プロセスを開始できませんでした。",
    cleanStartSuccess: "クリーニングプロセスが正常に開始されました。",
    cleanStartError: "クリーニングプロセスを開始できませんでした。",
    fileValidationError: "許可されるのは update_rapido.zip ファイルのみです。"
  },
  configurarAvaliacao: {
    tooltipMessage: "レビュー メッセージを追加するときに、各レビューの応答メッセージをカスタマイズできます。それ以外の場合、システムは「レビューは正常に保存されました」で定義されているデフォルトのメッセージで応答します。",
    messagePlaceholder: "レビューメッセージを入力",
    title: "レビュー",
    tooltipTitle: "評価の種類:",
    tooltipEvaluation: "評価: 0 から 5 までの値が割り当てられます。",
    tooltipLabel: "ラベル: レビューごとに送信されたメッセージ。",
    saveButton: "保存",
    editablePlaceholder: "クリックしてラベルを編集",
    successMessage: "評価を更新しました。",
    errorMessage: "レビューの更新中にエラーが発生しました。",
    ratingStore: "評価メッセージが正常に保存されました",
    ratingStoreError: "評価を保存する際のエラーメッセージ",
    ratingStoreAttempt: "評価試行メッセージが正常に保存されました",
    ratingStoreTime: "保存時間（ミリ秒）",
    ratingStoreUse: "評価保存を使用",
    ratingStoreTimeCustomMinutes: "カスタム時間（分）",
    timeOptions: {
      oneMinute: "1分",
      fiveMinutes: "5分",
      tenMinutes: "10分",
      fifteenMinutes: "15分",
      thirtyMinutes: "30分",
      oneHour: "1時間",
      twoHours: "2時間",
      sixHours: "6時間",
      twelveHours: "12時間",
      twentyFourHours: "24時間",
      fortyEightHours: "48時間",
      sevenDays: "7日",
      custom: "カスタム（分）"
    },
    useOptions: {
      enabled: "有効",
      disabled: "無効"
    },
    labels: {
      ruim: "悪い",
      regular: "通常",
      bom: "良い",
      muitoBom: "とても良い",
      excelente: "素晴らしい",
      incrivel: "信じられない"
    }
  },
  listarAvaliacao: {
    empty: "空の",
    contactName: "連絡先名",
    title: "レビュー",
    addButton: "追加するには",
    searchPlaceholder: "位置特定",
    dateFilterPlaceholder: "日付でフィルタリング",
    evaluationColumn: "評価",
    userColumn: "ユーザー",
    ticketColumn: "サービス",
    dateColumn: "日付",
    actionsColumn: "アクション",
    deleteConfirmationTitle: "注意！！",
    deleteConfirmationMessage: "本当にレビューを削除しますか?",
    deleteSuccess: "レビューを削除しました",
    deleteError: "レビューの削除中にエラーが発生しました。",
    loadError: "レビューの読み込み中にエラーが発生しました。",
    dialogCancel: "いいえ",
    dialogConfirm: "はい"
  },
  modalAvaliacao: {
    editTitle: "評価を編集",
    createTitle: "評価を作成する",
    evaluationLabel: "評価",
    attemptsLabel: "試み",
    ticketLabel: "サービス",
    updateSuccess: "レビューの編集に成功しました。",
    createSuccess: "レビューが正常に作成されました。",
    errorMessage: "評価の保存中にエラーが発生しました。"
  },
  contatosCampanha: {
    campaign: "キャンペーン",
    start: "始める",
    end: "終わり",
    status: "状態",
    states: "州",
    labels: "タグ",
    wallet: "ポートフォリオ",
    backToCampaigns: "リストキャンペーン",
    contactsTitle: "連絡先",
    contacts: "連絡先",
    refreshTooltip: "リストを更新",
    clearCampaign: "クリアキャンペーン",
    addContacts: "連絡先を含める",
    filters: "フィルター（連絡先作成日）",
    selectContactsTitle: "連絡先を選択",
    errorFetchingContacts: "連絡先の取得中にエラーが発生しました。",
    errorAddingContacts: "連絡先の追加中にエラーが発生しました。",
    contactDeleted: "このキャンペーンから除外された連絡先。",
    contactsAdded: "連絡先が追加されました。",
    campaignCleared: "クリーンキャンペーンは成功しました。",
    confirmClearCampaign: "本当にキャンペーンの連絡先をクリアしますか?",
    errorClearingCampaign: "キャンペーンのクリア中にエラーが発生しました。",
    errorDelete: "キャンペーンの連絡先を削除できません",
    filterNamePhone: "フィルター名または電話番号",
    newContact: "生成するには",
    errorUsers: "ユーザーの読み込み中に問題が発生しました"
  },
  campanhas: {
    inicio: "始める",
    register: "ページごとの記録数：",
    campanhas: "キャンペーン",
    title: "キャンペーン",
    warningBanner: "BaileysとWhatsapp-Web.JSで利用可能なキャンペーン",
    addCampaign: "キャンペーンを追加",
    columns: {
      id: "ID",
      name: "キャンペーン",
      start: "始める",
      status: "状態",
      contactsCount: "数量連絡先",
      queueForSend: "提出待ちキュー",
      notSended: "送信されませんでした",
      sent: "送信済み",
      currentMessageId: "現在のメッセージ",
      actions: "アクション"
    },
    status: {
      pending: "保留中",
      scheduled: "予定",
      processing: "処理",
      canceled: "キャンセル",
      finished: "完了"
    },
    actions: {
      forceFinish: "強制終了",
      downloadReportCsv: "CSVレポートをダウンロード",
      downloadReportPdf: "PDFレポートをダウンロード",
      refresh: "リストを更新",
      sortById: "IDで並べ替え",
      addCampaign: "キャンペーンを追加",
      programSend: "配送スケジュール",
      cancelCampaign: "キャンペーンをキャンセル",
      duplicateCampaign: "重複キャンペーン",
      downloadReport: "レポートをダウンロード",
      deleteCampaign: "キャンペーンを削除",
      editCampaign: "キャンペーンを編集",
      viewContacts: "連絡先を表示"
    },
    dialogs: {
      forceFinish: {
        title: "キャンペーンを強制終了",
        message: "本当にキャンペーンを強制終了しますか?"
      },
      cancelCampaign: {
        title: "キャンペーンをキャンセル",
        message: "本当にキャンペーンをキャンセルしますか?"
      },
      cancelCampaignError: {
        message: "進行中のキャンペーンをキャンセルできません"
      },
      deleteCampaign: {
        title: "キャンペーンを削除",
        message: "本当にキャンペーンを削除しますか?"
      },
      duplicateCampaign: {
        title: "重複キャンペーン",
        message: "本当にキャンペーンを複製しますか?",
        no: "いいえ",
        yes: "はい"
      },
      startCampaign: {
        title: "キャンペーンを開始",
        message: "本当にキャンペーンを開始しますか?"
      }
    },
    notifications: {
      campaignForceFinished: "キャンペーンは正常に強制終了されました。",
      campaignStarted: "キャンペーンを開始しました。",
      campaignCanceled: "キャンペーンはキャンセルされました。",
      campaignDuplicated: "キャンペーンが正常に複製されました。",
      campaignDeleted: "キャンペーンを削除しました",
      reportGenerated: "レポートが正常に生成されました。",
      errorGeneratingReport: "レポート生成中にエラーが発生しました。",
      errorDuplicate: "キャンペーンの複製中にエラーが発生しました。",
      warningEdit: "編集できるのは、保留中またはキャンセルされたキャンペーンのみです。",
      errorCancel: "キャンペーンをキャンセルできません",
      errorStart: "現在の日付より前の日付でキャンペーンをスケジュールすることはできません",
      errorStartContact: "キャンペーンをスケジュールするには、リンクされた連絡先が必要です",
      errorStartCancel: "スケジュールできるのは、保留中またはキャンセルされたキャンペーンのみです。",
      errorGeneral: "キャンペーンを開始できません"
    },
    warningModal: {
      title: "キャンペーンのお知らせ",
      description: {
        whatsappRisk1: {
          title: "WhatsApp は私の番号をブロックまたは禁止できますか?",
          content: "はい、その可能性は現実であり、真剣に受け止めるべきです。 WhatsApp には厳格なルールがあり、大量メッセージの送信を厳しく監視しています。"
        },
        whatsappRisk2: {
          title: "WhatsApp はスパムに対して一切の寛容をしません。",
          content: "厳格なルールがあり、大量メッセージングを厳重に監視しています。"
        },
        highSpamRisk: {
          title: "注意",
          content: "受信者の 2% があなたの番号を報告したり、メッセージをスパムとしてマークしたりした場合、あなたの番号はブロック/禁止されます。"
        }
      }
    },
    baixarRelatorio: {
      title: "キャンペーンレポート",
      description: {
        generatedAt: "生成日: ",
        page: "ページ： ",
        campaignDetails: {
          id: "ID: {id}",
          status: "ステータス: {status}",
          startDate: "開始日: {date}",
          totalContacts: "連絡先の合計数: {total}",
          delivered: "ショット数: {count}",
          pending: "保留中: {count}",
          failed: "失敗数: {count}"
        },
        tableHeaders: {
          index: "#",
          name: "名前",
          status: "状態",
          message: "メッセージ",
          media: "メディア"
        },
        statusDescriptions: {
          delivered: "配達済み",
          pending: "保留中",
          failed: "失敗"
        },
        placeholders: {
          unknownName: "未知",
          noMessage: "メッセージなし",
          noMedia: "メディアなし"
        },
        notifications: {
          success: "レポートが正常に生成されました。",
          error: "PDF レポートの生成中にエラーが発生しました。"
        },
        fileName: "キャンペーンレポート_{id}.pdf"
      }
    }
  },
  modalCampanha: {
    title: {
      create: "キャンペーンを作成",
      edit: "キャンペーンを編集"
    },
    labels: {
      campaignName: "キャンペーン名",
      startDate: "開始日時",
      session: "送信者",
      delay: "遅れ",
      media: "メディア構成メッセージ",
      message: "メッセージを入力してください",
      messagePreview: "プレビュー",
      firstMessage: "最初のメッセージ",
      secondMessage: "2番目のメッセージ",
      thirdMessage: "3番目のメッセージ",
      variables: "変数",
      emoji: "絵文字",
      seconds: "秒"
    },
    placeholders: {
      message: "メッセージを入力してください"
    },
    validations: {
      required: "必須",
      invalidDate: "現在の日付より前にはできません"
    },
    buttons: {
      cancel: "キャンセル",
      save: "保存"
    },
    notifications: {
      successEdit: "キャンペーンを編集しました！",
      successCreate: "キャンペーンが作成されました!",
      error: "キャンペーンの作成中に問題が発生しましたか?",
      validationError: "すべての必須フィールドが入力されていることを確認してください。",
      errorImage: "画像の読み込みに問題はありますか?"
    },
    emojiPicker: {
      search: "検索...",
      lang: "pt-BR"
    },
    optRadio: {
      msg1: "メッセージ1",
      msg2: "メッセージ2",
      msg3: "メッセージ3"
    }
  },
  listChatflow: {
    title: "フロー",
    addButton: "追加するには",
    status: {
      active: "アクティブ",
      inactive: "非アクティブ"
    },
    actions: {
      edit: "情報を編集する",
      duplicate: "重複フロー",
      open: "オープンストリーム",
      importJson: "Jsonをインポート",
      delete: "消去",
      newVersion: "新バージョン (Vue Flow)",
      newVersionDesc: "モダンで更新されたインターフェース",
      oldVersion: "旧バージョン (jsPlumb)",
      oldVersionDesc: "jsPlumbを使用したオリジナルインターフェース"
    },
    confirmDelete: {
      title: "このストリームを削除してもよろしいですか?",
      message: "{名前}"
    },
    importJsonDialog: {
      title: "JSONを{name}にインポートする",
      jsonLabel: "JSONを貼り付ける",
      jsonValidationError: "JSONは必須です",
      importButton: "輸入",
      cancelButton: "キャンセル",
      importSuccess: "JSON が正常にインポートされました。",
      importError: "無効な形式です。 JSONを確認してください。"
    }
  },
  modalChatflow: {
    title: {
      create: "フローを作成する",
      edit: "編集フロー",
      duplicate: "重複フロー",
      duplicateSuffix: "（名前：{name}）"
    },
    fields: {
      description: "説明",
      isActive: "アクティブ",
      testNumber: "テスト番号",
      testNumberHint: "自動返信が機能するにはクリーンな状態にしておきます。それ以外の場合は、ここで指定された番号に対してのみ機能します。"
    },
    actions: {
      save: "保存",
      cancel: "キャンセル"
    },
    notifications: {
      created: "新しいフローが作成されました。",
      edited: "ストリームを編集しました。",
      duplicated: "フローが重複しています。"
    }
  },
  chatPrivado: {
    labels: {
      grupo: "グループ"
    },
    toolbar: {
      returnMenu: "メニューに戻る",
      atendimento: "サービス",
      minimize: "減らす",
      groupMembers: "グループメンバー"
    },
    dialog: {
      groupMembers: "グループメンバー",
      editMessage: "メッセージを編集",
      deleteMessageTitle: "メッセージを削除",
      deleteMessageConfirm: "このメッセージを削除してもよろしいですか？",
      forwardMessage: "メッセージを転送"
    },
    chatHeader: {
      online: "オンライン",
      offline: "オフライン",
      noName: "無名",
      noEmail: "メールなし"
    },
    chatFooter: {
      emoji: "絵文字",
      attachFile: "ファイルを添付",
      sendVideoLink: "ビデオ会議のリンクを送信",
      placeholder: "メッセージを入力してください",
      send: "送信する"
    },
    tabs: {
      users: "ユーザー",
      groups: "チーム"
    },
    messages: {
      dateSeparator: "今日",
      downloadTooltip: "ダウンロード: {fileName}",
      read: "取引",
      unread: "未読",
      today: "今日",
      senderMe: "私",
      download: "下がる",
      pdfPlaceholder: "PDFをダウンロード",
      online: "オンライン",
      offline: "オフライン",
      searchPlaceholder: "探すには...",
      usersTab: "ユーザー",
      groupsTab: "チーム",
      noMessages: "メッセージが見つかりません。",
      clickToRemoveReaction: "クリックしてリアクションを削除",
      editPlaceholder: "メッセージを入力してください",
      noUsersFound: "ユーザーが見つかりません"
    },
    notifications: {
      errorLoadMessages: "メッセージの読み込み中にエラーが発生しました。",
      fileRejected: "エラー: アップロードされたファイルを確認してください。",
      sendMessageError: "メッセージの送信中にエラーが発生しました。",
      successMessageSent: "メッセージは正常に送信されました。",
      messageEdited: "メッセージが正常に編集されました！",
      editError: "メッセージの編集中にエラーが発生しました",
      messageDeleted: "メッセージが正常に削除されました！",
      deleteError: "メッセージの削除中にエラーが発生しました",
      reactionError: "リアクションの追加中にエラーが発生しました",
      messageForwarded: "メッセージが正常に転送されました！",
      forwardError: "メッセージの転送中にエラーが発生しました"
    }
  },
  configuracoesSessoes: {
    baileys: {
      title: "Baileys接続をリセット（セッションを消去して再起動）",
      description: "Baileys接続をリセットしてもよろしいですか？この操作により、すべてのセッションが消去され、接続が再起動されます。",
      message: "Baileys接続が正常にリセットされました",
      error: "Baileys接続のリセット中にエラーが発生しました"
    },    
    labels: {
      updateSessions: "更新されたセッション",
      noEvents: "イベントが見つかりません",
      eventCount: "イベント数",
      name: "名前",
      status: "状態",
      session: "セッション",
      number: "番号",
      updatedAt: "最終更新日",
      isDefault: "標準",
      actions: "アクション",
      defaultConnection: "標準接続",
      deleteConnection: "接続を削除",
      setDefault: "デフォルトとして設定",
      confirmDeleteTitle: "注意！！本当に削除しますか?",
      confirmDeleteMessage: "このチャネルで開かれているチャットは閉じられますが、サポート パネルで確認できます。",
      cancel: "いいえ",
      confirm: "はい"
    },
    messages: {
      reloadPage: "ページを更新",
      errorLoadingColors: "色の読み込み中にエラーが発生しました。",
      noColorsStored: "localStorage に色が保存されていません。"
    }
  },
  configuracoesProxy: {
    title: "プロキシ管理システム",
    description: "WhatsApp接続用のローカルプロキシを管理",
    descriptionDetail: "プロキシはあなた自身のマシンを使用して自動的に生成されます",
    descriptionDetail2: "プロキシを有効にするには、スーパー管理者にリクエストしてください。",
    tooltip: "ローカルプロキシシステム",
    
    statistics: {
      title: "プロキシ統計",
      totalProxies: "総プロキシ数",
      activeProxies: "アクティブプロキシ",
      failedProxies: "失敗したプロキシ"
    },
    
    generation: {
      title: "ローカルプロキシを生成",
      numberOfProxies: "プロキシ数",
      proxyType: "プロキシタイプ",
      generateProxies: "プロキシを生成",
      generateGlobal: "グローバル生成"
    },
    
    list: {
      title: "設定済みプロキシ",
      refreshList: "リストを更新",
      total: "合計",
      proxies: "プロキシ",
      noProxiesConfigured: "プロキシが設定されていません",
      noProxiesMessage: "開始するためにプロキシを生成してください",
      removeAllProxies: "すべてのプロキシを削除"
    },
    
    proxyItem: {
      type: "タイプ",
      status: "ステータス",
      user: "ユーザー",
      active: "アクティブ",
      inactive: "非アクティブ",
      testProxy: "プロキシをテスト",
      editProxy: "プロキシを編集",
      deleteProxy: "プロキシを削除"
    },
    
    manualConfig: {
      title: "手動プロキシ設定",
      host: "ホスト",
      hostPlaceholder: "192.168.1.100",
      port: "ポート",
      portPlaceholder: "8080",
      username: "ユーザー名（オプション）",
      password: "パスワード（オプション）",
      proxyType: "プロキシタイプ",
      addProxy: "プロキシを追加"
    },
    
    editModal: {
      title: "プロキシを編集",
      host: "ホスト",
      hostPlaceholder: "192.168.1.100",
      port: "ポート",
      portPlaceholder: "8080",
      username: "ユーザー名（オプション）",
      password: "パスワード（オプション）",
      proxyType: "プロキシタイプ",
      active: "アクティブ",
      cancel: "キャンセル",
      save: "保存"
    },
    
    messages: {
      proxiesGeneratedSuccess: "プロキシが正常に生成されました",
      globalProxiesGeneratedSuccess: "グローバルプロキシが正常に生成されました",
      proxyWorking: "プロキシ {host}:{port} が動作しています",
      proxyFailed: "プロキシ {host}:{port} が失敗しました: {error}",
      proxyAddedSuccess: "プロキシが正常に追加されました",
      proxyUpdatedSuccess: "プロキシが正常に更新されました",
      proxyDeletedSuccess: "プロキシが正常に削除されました",
      allProxiesRemovedSuccess: "すべてのプロキシが正常に削除されました",
      errorLoadingProxies: "プロキシの読み込みエラー",
      errorGeneratingProxies: "プロキシ生成エラー",
      errorGeneratingGlobalProxies: "グローバルプロキシ生成エラー",
      errorTestingProxy: "プロキシテストエラー",
      errorAddingProxy: "プロキシ追加エラー",
      errorUpdatingProxy: "プロキシ更新エラー",
      errorDeletingProxy: "プロキシ削除エラー",
      errorRemovingProxies: "プロキシ削除エラー"
    },
    
    confirmations: {
      removeAllTitle: "確認",
      removeAllMessage: "すべてのプロキシを削除してもよろしいですか？",
      deleteTitle: "削除確認",
      deleteMessage: "プロキシ {host}:{port} を削除してもよろしいですか？"
    },
    
    proxyTypes: {
      socks: "SOCKSのみ"
    }
  },
  configuracoesSessoesStatus: {
    statuses: {
      qrcode: {
        title: "QRコードの読み取りを待っています",
        description: "「QRコード」ボタンをクリックし、携帯電話でQRコードをスキャンしてセッションを開始します。"
      },
      disconnected: {
        title: "このチャネルの通信を開始できませんでした。",
        whatsapp: "携帯電話がインターネットに接続されていることを確認してもう一度試すか、新しい QR コードをリクエストしてください。",
        waba: "もう一度接続してみてください。エラーが解決しない場合は、トークンが正しいことを確認してください。",
        telegram: "もう一度接続してみてください。エラーが解決しない場合は、トークンが正しいことを確認してください。",
        instagram: "もう一度接続してみてください。エラーが解決しない場合は、資格情報が正しいことを確認してください。"
      },
      connected: {
        meow: "接続が確立されました: ",
        waba: "接続が確立されました: ",
        whatsapp: "接続が確立されました: ",
        loading: "データを読み込んでいます..."
      },
      pairingTimeout: {
        title: "携帯電話の接続が失われました",
        description: "携帯電話がインターネットに接続され、WhatsApp が開いていることを確認するか、「切断」ボタンをクリックして新しい QR コードを取得してください。"
      },
      opening: {
        title: "接続を確立しています。",
        description: "しばらく時間がかかるかもしれません..."
      }
    },
    labels: {
      lastUpdate: "最終更新日"
    }
  },
  configuracoesChatgpt: {
    labels: {
      enableChatgpt: "ChatGPT統合を有効にする",
      enableChatgptDescription: "有効にすると、システムは ChatGPT からの情報を使用します。",
      enableChatgptAll: "すべてのサービスでChatGPT統合をデフォルトで有効にする",
      enableChatgptAllDescription: "アクティブの場合、システムはすべての通話で ChatGPT からの情報を使用します。"
    },
    notifications: {
      success: "構成が変更されました!",
      error: "構成の変更中にエラーが発生しました。"
    }
  },
  configuracoesLm: {
    labels: {
      enableLm: "LM Studioとの統合を有効にする",
      enableLmDescription: "アクティブになると、システムは LM Studio からの情報を消費します。",
      enableLmAll: "すべてのサービスで LM Studio との統合をデフォルトで有効にする",
      enableLmAllDescription: "アクティブになると、システムはすべてのサービスで LM Studio からの情報を消費します。"
    },
    notifications: {
      success: "構成が変更されました!",
      error: "構成の変更中にエラーが発生しました。"
    }
  },
  configuracoesOllama: {
    labels: {
      enableOllama: "Ollama統合を有効にする",
      enableOllamaDescription: "アクティブな場合、システムは Ollama からの情報を消費します。",
      enableOllamaAll: "すべてのサービスでデフォルトでOllama統合を有効にする",
      enableOllamaAllDescription: "アクティブになると、システムはすべての通話で Ollama からの情報を消費します。"
    },
    notifications: {
      success: "構成が変更されました!",
      error: "構成の変更中にエラーが発生しました。"
    }
  },
  configuracoesDialogflow: {
    labels: {
      enableDialogflow: "Dialogflowを有効にする",
      enableDialogflowDescription: "有効にすると、システムは Dialogflow フローを使用します。",
      enableDialogflowAll: "すべてのサポートに対してDialogflow統合をデフォルトで有効にする",
      enableDialogflowAllDescription: "アクティブの場合、システムはすべての呼び出しで Dialogflow からの情報を使用します。"
    },
    notifications: {
      success: "構成が正常に変更されました。",
      error: "構成の変更中にエラーが発生しました。"
    }
  },
  configuracoesDify: {
    labels: {
      enableDify: "Difyとの統合を有効にする",
      enableDifyDescription: "アクティブになると、システムは Dify からの情報を消費します。",
      enableDifyAll: "すべてのサービスでDify統合をデフォルトで有効にする",
      enableDifyAllDescription: "アクティブな場合、システムはすべての呼び出しで Dify からの情報を消費します。"
    },
    notifications: {
      success: "構成が正常に変更されました。",
      error: "構成の変更中にエラーが発生しました。"
    }
  },
  configuracoesGemini: {
    labels: {
      enableGemini: "Gemini統合を有効にする",
      enableGeminiDescription: "アクティブな場合、システムは Gemini からの情報を消費します。",
      enableGeminiAll: "すべてのサービスでデフォルトでGemini統合を有効にする",
      enableGeminiAllDescription: "アクティブな場合、システムはすべての通話で Gemini からの情報を消費します。"
    },
    notifications: {
      success: "構成が正常に変更されました。",
      error: "構成の変更中にエラーが発生しました。"
    }
  },
  configuracoesDeepseek: {
    labels: {
      enableDeepseek: "Deepseek統合を有効にする",
      enableDeepseekDescription: "アクティブになると、システムは Deepseek からの情報を消費します。",
      enableDeepseekAll: "すべてのサービスでDeepseekの統合をデフォルトで有効にする",
      enableDeepseekAllDescription: "アクティブな場合、システムはすべての呼び出しで Deepseek からの情報を消費します。"
    },
    notifications: {
      success: "構成が正常に変更されました。",
      error: "構成の変更中にエラーが発生しました。"
    }
  },
  configuracoesQwen: {
    labels: {
      enableQwen: "Qwen統合を有効にする",
      enableQwenDescription: "アクティブな場合、システムは Qwen からの情報を消費します。",
      enableQwenAll: "すべてのサービスに対してデフォルトでQwen統合を有効にする",
      enableQwenAllDescription: "アクティブな場合、システムはすべての呼び出しで Qwen からの情報を消費します。"
    },
    notifications: {
      success: "構成が正常に変更されました。",
      error: "構成の変更中にエラーが発生しました。"
    }
  },
  configuracoesClaude: {
    labels: {
      enableClaude: "Claude統合を有効にする",
      enableClaudeDescription: "システムがアクティブになると、Claude からの情報が消費されます。",
      enableClaudeAll: "すべてのサービスでClaude統合をデフォルトで有効にする",
      enableClaudeAllDescription: "アクティブな場合、システムはすべての通話で Claude からの情報を消費します。"
    },
    notifications: {
      success: "構成が正常に変更されました。",
      error: "構成の変更中にエラーが発生しました。"
    }
  },
  configuracoesGrok: {
    labels: {
      enableGrok: "Grok統合を有効にする",
      enableGrokDescription: "アクティブな場合、システムは Grok からの情報を消費します。",
      enableGrokAll: "すべてのサービスに対してデフォルトでGrok統合を有効にする",
      enableGrokAllDescription: "アクティブな場合、システムはすべての呼び出しで Grok からの情報を消費します。"
    },
    notifications: {
      success: "構成が正常に変更されました。",
      error: "構成の変更中にエラーが発生しました。"
    }
  },
  configuracoesEvolution: {
    labels: {
      warningEvo: "Evolution v.2.20.0以上",
      installApi: "Evolution APIを無料でインストールする",
      apiIntegrationUrl: "https://github.com/EvolutionAPI/evolution-api",
      checkApiStatus: "新しいタブでAPIステータスを確認する",
      apiUrl: "API URL (https://subevo.com.br)",
      globalKey: "グローバルキー"
    },
    notifications: {
      success: "構成が正常に変更されました。",
      error: "構成の変更中にエラーが発生しました。データを確認してもう一度お試しください。",
      loadError: "設定の読み込み中にエラーが発生しました。もう一度お試しください。",
      invalidUrl: "続行する前に有効な URL を入力してください。"
    }
  },
  configuracoesgroqCloud: {
    labels: {
      installApi: "GroqCloud APIを無料で登録する",
      apiIntegrationUrl: "https://console.groq.com/",
      apiKey: "APIキー",
      language: "言語",
      model: "モデル",
      enableGroqCloud: "GroqCloudとの統合を有効にする",
      enableGroqCloudDescription: "アクティブになると、システムは Groq Cloud からの情報を消費し、受信した音声を書き起こします。"
    },
    notifications: {
      success: "構成が正常に変更されました。",
      error: "構成の変更中にエラーが発生しました。データを確認してもう一度お試しください。",
      loadError: "設定の読み込み中にエラーが発生しました。もう一度お試しください。",
      invalidUrl: "続行する前に有効な URL を入力してください。"
    }
  },
  configuracaoLanes: {
    title: "レーン",
    addLane: "車線を追加",
    editLane: "レーンを編集",
    deleteLane: "車線を削除",
    deleteConfirmation: "レーン「{lane}」を削除してもよろしいですか?",
    laneDeleted: "レーン「{lane}」が正常に削除されました。",
    columns: {
      id: "#",
      name: "レーン",
      position: "位置",
      actions: "アクション"
    },
    notifications: {
      successDelete: "レーンが正常に削除されました。",
      errorDelete: "レーンの削除中にエラーが発生しました。"
    }
  },
  hub: {
    createAccountInstruction: "hub.notificame.com.brでアカウントを作成し、トークンを生成します",
    tooltip: "HUB 通知（ベータ版）",
    tokenLabel: "あなたのトークンが私に通知します"
  },
  configuracaoMeta: {
    title: "メタ設定",
    webhookMeta: "メタウェブフック",
    webhookTooltip: "メタウェブフック",
    webhookInstagram: "Instagramウェブフック",
    webhookInstagramTooltip: "クリックしてInstagramウェブフックをコピー",
    webhookInstagramCopied: "Instagramウェブフックが正常にコピーされました！",
    webhookMessenger: "Messengerウェブフック",
    webhookMessengerTooltip: "クリックしてMessengerウェブフックをコピー",
    webhookMessengerCopied: "Messengerウェブフックが正常にコピーされました！",
    metaTokenLabel: "Meta Webhookトークン",
    testBMTitle: "テストBM",
    testBMDescription: "BMSのステータスを確認するには、以下の詳細を入力してください。",
    testBMTooltip: "テストBM",
    wabaIdLabel: "WABA ID（WhatsappビジネスアカウントID）",
    wabaVersionLabel: "WABA バージョン（Whatsapp Business API バージョン）",
    wabaTokenLabel: "WABA トークン (メタ ビジネス マネージャー トークン)",
    verifyBMButton: "BMをチェック",
    verificationResultTitle: "検証結果",
    verification: {
      verifiedName: "名前確認済み",
      verificationStatus: "検証ステータス",
      phoneNumber: "電話番号",
      qualityRating: "品質評価",
      platformType: "プラットフォームタイプ",
      throughputLevel: "スループットレベル",
      webhookConfigured: "Webhookが設定されました",
      id: "ID"
    },
    notConfigured: "未設定",
    notifications: {
      successVerify: "検証が完了しました！",
      errorVerify: "BM の検証中にエラーが発生しました。",
      successCopy: "リンクをコピーしました!",
      successUpdate: "トークンが正常に更新されました。",
      errorUpdate: "トークンの更新中にエラーが発生しました。"
    },
    tabs: {
      config: "設定",
      templates: "テンプレート",
      facebook: "Facebookログイン"
    },
    facebook: {
      title: "Facebookログイン",
      description: "Facebookアカウントでログインして、Meta Businessリソースにアクセス",
      loginTab: "ログイン",
      selectApp: "アプリを選択",
      noAppsAvailable: "利用可能なアプリがありません",
      errorLoadingApps: "利用可能なアプリの読み込み中にエラーが発生しました",
      appId: "アプリID",
      appIdHint: "FacebookアプリケーションID",
      apiVersion: "APIバージョン",
      apiVersionHint: "Facebook APIバージョン",
      status: "ログインステータス",
      userId: "ユーザーID",
      accessToken: "アクセストークン",
      expiresIn: "有効期限",
      noExpiration: "期限なし",
      name: "名前",
      email: "メール",
      picture: "プロフィール写真",
      login: "ログイン",
      logout: "ログアウト",
      checkStatus: "ステータスを確認",
      connected: "Facebookに正常に接続しました！",
      notConnected: "Facebookに接続する必要があります",
      notAuthorized: "アプリケーションを承認する必要があります",
      loggedOut: "正常にログアウトしました！",
      statusConnected: "接続済み",
      statusNotAuthorized: "未承認",
      statusUnknown: "不明",
      userInfo: "ユーザー情報",
      wabaManagement: "WABAと番号の管理",
      loadWabas: "WABAを読み込む",
      noWabas: "WABAが見つかりません。「WABAを読み込む」をクリックして検索してください。",
      noBusinessAccounts: "ビジネスアカウントが見つかりません",
      noWabasFound: "ビジネスアカウントにWABAが見つかりません",
      loadPhones: "番号を読み込む",
      phoneNumbers: "電話番号",
      noPhonesFound: "このWABAに電話番号が見つかりません",
      createChannel: "チャネルを作成",
      channelName: "チャネル名",
      channelNameHint: "このチャネルを識別する名前を入力してください",
      wabaId: "WABA ID",
      phoneNumberId: "電話番号ID",
      displayPhoneNumber: "電話番号",
      wabaVersion: "WABAバージョン",
      wabaVersionHint: "APIバージョン（例：v24.0）",
      create: "作成",
      channelCreated: "チャネルが正常に作成されました！",
      addPhoneNumber: "番号を追加",
      addWaba: "WABAを追加",
      addWabaAndNumber: "WABAと番号を追加",
      phoneNumber: "電話番号",
      phoneNumberRequired: "電話番号を入力してください",
      startOnboarding: "オンボーディングを開始",
      onboardingInfo: "提供された番号にSMSで確認コードが送信されます。プロセスを完了するには、コードを確認する必要があります。",
      onboardingWabaInfo: "新しい電話番号が既存のWABAに追加されるか、新しい番号が作成されます。確認コードがSMSで送信されます。",
      phoneOnboardingStarted: "オンボーディングが開始されました！提供された番号のSMSを確認して、確認を完了してください。",
      creatingWaba: "新しいWABAを作成中...",
      wabaCreated: "WABAが正常に作成されました！",
      wabaCreationNotSupported: "API経由でのWABA作成は利用できません。Facebook Business Managerで手動でWABAを作成してから、もう一度お試しください。",
      wabaCreationError: "WABAの作成中にエラーが発生しました。Facebook Business Managerで手動でWABAを作成してください。",
      noTokenConfigured: "このアプリにトークンが設定されていません。ユーザートークンを使用します。",
      businessTokenObtained: "ビジネストークンを正常に取得しました！",
      tokenExchangeError: "コードとトークンの交換中にエラーが発生しました。アプリトークンを代替として使用します。",
      embeddedSignup: "Whatsappを追加",
      embeddedSignupConfigId: "設定ID（埋め込み登録）",
      embeddedSignupConfigIdHint: "埋め込み登録の設定ID",
      embeddedSignupFinished: "埋め込み登録が正常に完了しました！",
      embeddedSignupCancelled: "埋め込み登録がキャンセルされました",
      embeddedSignupError: "埋め込み登録でエラーが発生しました",
      codeReceived: "コードを受信しました。フローの完了を待機中...",
      loginError: "ログインエラー",
      loginSuccess: "ログインに成功しました！",
      sdkNotLoaded: "Facebook SDKが読み込まれていません。お待ちください...",
      noTokenAvailable: "トークンが利用できません。まずログインしてください。",
      channelCreatedFromEmbeddedSignup: "埋め込み登録からチャネルが正常に作成されました！",
      channelCreatedSuccess: "チャネルが正常に作成されました！番号がWABAに追加されました。",
      phoneAddedToWaba: "電話番号がWABAに正常に追加されました！リストは自動的に更新されます。",
      wabaAddedToList: "WABAがリストに追加されました！",
      embeddedSignupOptions: "オプション",
      embeddedSignupOptionsTitle: "埋め込み登録オプション",
      embeddedSignupVersion: "バージョン",
      embeddedSignupSessionInfoVersion: "セッション情報バージョン",
      embeddedSignupFeatures: "機能",
      phoneVerificationUnauthorized: "チャネルは作成されましたが、電話番号を確認できませんでした。トークンに必要な権限がない可能性があります。",
      phoneVerificationError: "チャネルは作成されましたが、電話番号の確認で警告がありました",
      phoneVerificationDelayed: "チャネルが正常に作成されました。電話番号の確認はまもなく自動的に行われます。",
      appIdRequired: "アプリIDが設定されていません。アプリを選択してください。",
      configIdRequired: "設定IDが設定されていません。埋め込み登録の設定IDを設定してください。",
      resourceUnavailable: "リソースが利用できません。アプリIDと設定IDが正しく、Facebookアプリでドメインが設定されていることを確認してください。",
      permissionsRequired: "必要な権限が付与されていません。",
      invalidAppId: "無効なアプリIDまたは正しく設定されていません。",
      sdkError: "Facebook SDKの確認中にエラーが発生しました。ページを再読み込みしてください。",
      domainNotConfigured: "\"アプリドメイン\"にドメインが設定されていません",
      domainConfigurationRequired: "Facebookアプリダッシュボードの\"アプリドメイン\"でドメインを設定してから、もう一度お試しください。",
      loginOAuth: "Facebookを追加",
      noAppSelected: "まずアプリを選択してください",
      appNotFound: "アプリが見つかりません",
      facebookAppIdRequired: "このアプリのFacebook App IDが設定されていません",
      loginRedirect: "Facebookログインにリダイレクトしています...",
      loginError: "Facebookログインを開く際にエラーが発生しました",
      webhookConfigError: "チャネルは作成されましたが、webhookの設定時に警告が発生しました"
    },
    instagram: {
      login: "Instagramを追加",
      noAppSelected: "まずアプリを選択してください",
      appNotFound: "アプリが見つかりません",
      configIdRequired: "このアプリのConfig IDが設定されていません",
      loginRedirect: "Instagramログインにリダイレクトしています...",
      loginError: "Instagramログインを開く際にエラーが発生しました",
      webhookConfigError: "チャネルは作成されましたが、ウェブフックの設定時に警告がありました",
      channelCreated: "Instagramチャネルが正常に作成されました！"
    }
  },
  configuracaoMotivo: {
    title: "要求",
    addMotivo: "需要を追加する",
    editMotivo: "編集需要",
    deleteMotivo: "削除要求",
    deleteConfirmation: "本当に要求「{reason}」を削除しますか?",
    motivoDeleted: "要求「{reason}」が正常に削除されました。",
    columns: {
      id: "#",
      name: "要求",
      actions: "アクション"
    },
    notifications: {
      successDelete: "要求が正常に削除されました。",
      errorDelete: "需要の削除中にエラーが発生しました。"
    }
  },
  configuracoesN8N: {
    title: "N8N統合設定",
    enableIntegration: "N8Nとの統合を有効にする",
    enableIntegrationCaption: "アクティブな場合、システムは N8N からの情報を消費します。",
    enableIntegrationAllTickets: "すべてのサービスに対してデフォルトでN8N統合を有効にする",
    enableIntegrationAllTicketsCaption: "アクティブな場合、システムはすべての通話で N8N からの情報を消費します。",
    toggleEnabled: "有効",
    toggleDisabled: "無効",
    notifications: {
      success: "設定が正常に更新されました。",
      error: "構成の更新中にエラーが発生しました。"
    }
  },
  configuracaoPagamento: {
    title: "支払い情報",
    paymentLink: "支払いリンク",
    paymentId: "支払いID",
    status: "状態",
    dueDate: "成熟",
    pending: "保留中",
    overdue: "延滞",
    toolbarTitle: "支払い情報",
    notifications: {
      errorFetch: "支払いオプションを一覧表示できません。"
    }
  },
  configuracoesSMS: {
    title: "SMS設定",
    comteleAccount: "comtele.com.brでアカウントを作成し、APIキーを生成します",
    conectaAccount: "Conectaでアカウントを作成し、APIキーを生成します",
    comteleTokenLabel: "Comtele APIキー",
    conectaTokenLabel: "APIキーが接続します",
    comteleTooltip: "SMSコムテレ",
    conectaTooltip: "SMSコネクト",
    livsonAccount: "Livsonでアカウントを作成し、APIキーを生成します",
    livsonTokenLabel: "BHI APIキー",
    livsonTooltip: "SMS BHI",
    notifications: {
      successUpdate: "トークンが正常に更新されました。",
      errorUpdate: "トークンの更新中にエラーが発生しました。"
    }
  },
  configuracoesSMTP: {
    erroEnvioTeste: "テストの送信中にエラーが発生しました。",
    assuntoTeste: "メールテスト",
    mensagemTeste: "これはシステムから送信されたテストメールです。",
    enviarTeste: "テストを送信",
    testeEnviado: "テストが正常に送信されました。",
    testeErro: "テストの送信中にエラーが発生しました。",
    testeEmail: "テストメール",
    testeAssunto: "被験者",
    testeMensagem: "テストメッセージ",
    testeBotao: "テストするにはここをクリック",
    emailDestino: "宛先メール",
    title: "SMTP設定",
    enableSMTP: "SMTPを有効にする",
    enableSMTPCaption: "アクティブになると、システムはユーザーの電子メールに情報を送信します。",
    emailHostLabel: "メールサーバー（ホスト）:",
    emailPortLabel: "SMTPポート",
    emailUserLabel: "メールユーザー:",
    emailPassLabel: "メールパスワード:",
    emailSecure: "セキュリティプロトコル",
    emailSecureCaption: "安全なプロトコルを有効にします。",
    notifications: {
      successUpdate: "設定が正常に更新されました。",
      errorUpdate: "構成の更新中にエラーが発生しました。"
    }
  },
  configuracoesTypebot: {
    title: "タイプボットの設定",
    enableTypebot: "タイプボットを有効にする",
    enableTypebotCaption: "アクティブな場合、システムは Typebot ストリームを消費します。",
    enableAllTickets: "すべてのサービスでTypebotの統合をデフォルトで有効にする",
    enableAllTicketsCaption: "アクティブの場合、システムはすべての呼び出しで Typebot からの情報を使用します。",
    notifications: {
      successUpdate: "設定が正常に更新されました。",
      errorUpdate: "構成の更新中にエラーが発生しました。"
    }
  },
  configuracoesVariaveis: {
    titlePlatform: "プラットフォーム変数",
    platformVariables: {
      name: "名前",
      greeting: "挨拶",
      protocol: "開会プロトコル",
      email: "メールアドレス（ある場合）",
      phoneNumber: "電話",
      kanban: "カンバン（ある場合）",
      user: "係員",
      userEmail: "担当者のメールアドレス",
      firstName: "ファーストネーム",
      lastName: "姓",
      businessName: "企業"
    },
    titleTypebot: "TypeBot変数",
    typebotVariables: {
      nome: "名前",
      numero: "番号",
      atendimento: "チケット番号",
      email: "メールアドレス（ある場合）",
      status: "チケットのステータス",
      canal: "サービスチャネル",
      grupo: "グループケアか否か",
      fullTicket: "すべてのサービスプロパティ"
    }
  },
  configuracoesWebhook: {
    enableWebhook: "Webhookを有効にする",
    enableWebhookCaption: "アクティブになると、システムは定義された Webhook に情報を送信します。",
    webhookUrlLabel: "ウェブフックURL:",
    webhookMessage: "メッセージとサポートを受け取る",
    webhookCreateChannel: "チャンネル/接続を作成する",
    webhookUpdateChannel: "チャネル/接続の更新",
    webhookCreateUser: "ユーザー/連絡先/商談の作成",
    webhookUpdateUser: "ユーザー/連絡先/商談の更新",
    webhookCreateApi: "APIを作成する",
    webhookUpdateApi: "更新API",
    webhookRenewApi: "APIトークンの更新"
  },
  configuracoesWuzapi: {
    title: "Meow API (Wuzapi) 設定",
    installApiLabel: "MEOW APIを無料でインストールする",
    installApiTooltip: "Meow API (Wuzapi) (ベータ版)",
    apiUrlLabel: "API URL (https://subwuzapi.com.br)",
    checkApiStatus: "新しいタブでAPIステータスを確認する",
    invalidUrlMessage: "続行する前に有効な URL を入力してください。",
    globalKeyLabel: "グローバルキー",
  },
  configuracoesUazapi: {
    title: "Uazapi API 設定",
    installApiLabel: "Uazapi APIを無料でインストールする",
    installApiTooltip: "Uazapi API (ベータ版)",
    apiUrlLabel: "API URL (https://uazapi.com.br)",
    globalKeyLabel: "グローバルキー",
  },
  configuracoesZapi: {
    title: "Zapi API 設定",
    installApiLabel: "Zapi APIを無料でインストールする",
    installApiTooltip: "Zapi API (ベータ版)",
    apiUrlLabel: "API URL (https://zapi.com.br)",
    globalKeyLabel: "グローバルキー",
  },
  configuracoes: {
    tabs: {
      gerais: "一般設定",
      botsIA: "ボットとAI",
      integracoes: "統合",
      crm: "CRM",
      sessoes: "セッション"
    },
    sidebar: {
      menu: "メニュー",
      proxy: "Proxy",
      uazapi: "Uazapiサービス",
      zapi: "Zapiサービス",
      vapi: "Vapi",
      tutoriais: "チュートリアル",
      webchat: "ウェブチャット",
      googleCalendar: "Google カレンダー",
      groqcloud: "グロククラウド",
      grok: "グロク",
      gemini: "ジェミニ",
      qwen: "クウェン",
      claude: "クロード",
      deepseek: "ディープシーク",
      ollama: "オラマ",
      lm: "LMスタジオ",
      payment: "支払い",
      gerais: "設定。一般的な",
      smtp: "SMTP",
      typebot: "タイプボット",
      chatGPT: "GPTチャット",
      n8n: "N8N",
      dify: "ディファイ",
      dialogflow: "ダイアログフロー",
      webhooks: "ウェブフック",
      meta: "ゴール",
      evolution: "進化API",
      wuzapi: "ウザピAPI",
      hub: "ハブ通知",
      sms: "SMS",
      kanban: "カンバンとレーン",
      motivos: "要求",
      variaveis: "変数",
      sessoes: "セッション一覧"
    },
    tooltips: {
      toggleSidebar: "メニューの表示/非表示"
    }
  },
  configuracoesWebchat: {
    copyCodeError: "コードのコピー中にエラーが発生しました",
    sucessCopy: "コードが正常にコピーされました。",
    copyCode: "コードをコピー",
    widgetCode: "ウェブチャットウィジェットコード",
    tokenWarning2: "このトークンは、Web チャットの WebSocket 接続を認証するために使用されます。安全に保管し、共有しないでください。",
    generateNewToken: "新しいトークンを生成する",
    tokenWarning: "WebChat接続にはトークンが必要です。",
    autenticationToken: "認証トークン",
    title: "ウェブチャット設定",
    enableWebchat: "Webチャットを有効にする",
    enableWebchatCaption: "アクティブになると、システムは WebChat を使用します。",
    webchatUrlLabel: "ウェブチャットURL:",
    webchatConfigurado: "ウェブチャットが設定され、使用できる状態になりました。",
    wssFuncionando: "WebSocket 接続は正常に動作しています。",
    gerarWidget: "ウェブサイトに実装するウィジェットを生成できます。",
    wssNaoFuncionando: "Web チャットは設定されていますが、WebSocket 接続が機能していません。",
    verificarWss: "WebSocket サーバーがオンラインでアクセス可能であることを確認します。",
    solicitarInstalacao: "Web チャットを使用するには、システム管理者に Web チャット インターフェイスのインストールを依頼する必要があります。",
    configurarAmbiente: "WSS_URL および WSS_PORT 設定を環境で構成する必要があります。",
    selecionarCanal: "ウィジェットを生成するチャンネルを選択してください",
    gerarWidgetBtn: "ウィジェットを生成",
    widgetGerado: "ウィジェットが正常に生成されました。",
    erroGerarWidget: "ウィジェット生成エラー",
    carregandoCanais: "チャンネルを読み込んでいます...",
    erroCarregarCanais: "チャンネルの読み込みエラー",
    tenantErro: "テナントの読み込み中にエラーが発生しました",
    tokenUpdated: "トークンが正常に更新されました。",
    tokenError: "新しいトークンの生成中にエラーが発生しました。もう一度やり直してください"
  },
  configuracoesModalCampanha: {
    create: "レーンを作成",
    edit: "レーンを編集",
    name: "レーン名",
    position: "位置",
    notifications: {
      created: "レーンを作成しました！",
      updated: "ステップ編集しました!"
    }
  },
  configuracoesModalMotivos: {
    create: "需要を創出する",
    edit: "編集需要",
    name: "需要名",
    notifications: {
      created: "需要が生まれました！",
      updated: "編集を要求します!"
    }
  },
  configuracoesGerais: {
    labels: {
      allowPause: "サービスを一時的に一時停止する",
      useUserBusinessHours: "ユーザーの営業時間を使用してサービス時間を定義する",
      webPushChatInterno: "内部チャット用Web Push",
      scanContacts: 'LIDなしの連絡先をスキャンする',
      postmanLink: 'Postman リンク',
      listarPelaUltimaMensagem: "最後のメッセージでサービスを一覧表示する",
      forceReason: "サービス終了時の強制需要定義",
      syncTicketData: "チケットの日付を更新",
      controlFeatures: "機能制御",
      syncMessagesUpdate: "インポートされたメッセージの更新日",
      ignoreIgStories: "Instagramストーリーをミュートする",
      audioPlugin: "オーディオプラグインを使用する（ベータ版）",
      audioModule: "Waves でオーディオモジュールを使用する（ベータ版）",
      showGroupsForAll: "すべてのユーザーにグループを表示",
      persistirMedia: "パーシストメディアダウンロード（ベイリーズ）",
      showClosedForAll: "すべてのユーザーに非公開を表示",
      waitProcessing: "外部統合（Typebot、ChatGPTなど）によるメッセージ処理の待機を有効にする",
      openChat: "ウィンドウ外へのWabaメッセージ送信を有効にする（配信は保証されません）",
      shutdownWallet: "ウォレット化が有効になっている場合は外部統合を無効にする",
      notViewAssignedTickets: "すでに他のユーザーに割り当てられているチケットは表示しない",
      notViewTicketsChatBot: "ChatBotでチケットを表示しない",
      directTicketsToWallets: "ウォレット経由の強制サービス",
      ticketNulo: "ユーザーまたはキューが割り当てられていないチケットを表示する",
      supervisor: "スーパーバイザーの閲覧権限を削除する",
      semRedis: "クイックメッセージ送信を使用する",
      chatbotLane: "チャットボットサービスガイドを有効にする",
      chatbotFix: "サービス上部のピン接続",
      ignoreGroupMsg: "グループメッセージを無視する",
      rejectCalls: "Whatsappで通話を拒否する",
      callRejectMessage: "接続を拒否するときのメッセージ:",
      agruparTickets: "メッセージ履歴を表示",
      transbordo: "メッセージオーバーフロー",
      atualizarNomes: "メッセージを受信したときに名前を更新しない",
      forcarAdmin: "サポートに管理者を強制する",
      signed: "署名制御を無効にする",
      universalCounter: "上部のタブのカウンター（プライベート/グループ）",
      autoClose: "対話なしでサービスの問題を自動的に解決",
      autoCloseTime: "オプションを選択してください（時間（分））",
      autoCloseMessage: "締めくくりのメッセージ",
      ticketLimit: "古い通話をフィルタリング",
      days: "日数",
      ticketLimitDaysAgo: "フィルタリングする日数",
      notificationSilenced: "サウンド通知",
      forbiddenNumbers: "プラットフォーム上でブロックされた番号",
      resetFlow: "チャットボットフローをリセットする",
      maxRetries: "時間メッセージを送信する最大回数",
      privateMessageLimit: "内部チャットのメッセージ数",
      ticketLimitNumber: "参照したチケットの数",
      validateAllContacts: "すべての連絡先を検証",
      forcePendingUser: "現在のユーザーのステータスを保留に変更する",
      chatbotFlow: "サービスボットのアクティブフロー",
      forcePending: "現在のユーザーに保留中のサービスステータスの変更を強制する",
      maxAttemps: "サービス時間メッセージを顧客に送信する必要がある最大回数。",
      limitTickets: "サービス中に参照する必要があるチケットの数。",
      limitePrivate: "サービスごとに内部チャットに読み込む必要があるメッセージの数。",
      erroMessage: "停止メッセージを送信",
      solveMessage: "メッセージを解決する",
      validate: "すべての連絡先を検証",
      minutes: "10分",
      hours: "1時間",
      day: "1日",
      days5: "5日間",
      days10: "10日間",
      validateContact: "連絡先を検証",
      hearHubApi: "Hub Notificame APIリスニングを有効化",
      ticketsRain: "ソケットチケットフィルターを有効化（高ボリューム推奨）",
      messageListingType: "メッセージリストタイプ",
      messageListingTypeDefault: "デフォルト",
      messageListingTypeByQueue: "キュー別履歴",
      messageListingTypeComplete: "完全な履歴",
      messageListingTypeByTicket: "チケット別履歴",
    },
    captions: {
      allowPause: "このオプションを有効にすると、サービスを一時的に一時停止することができます。",
      useUserBusinessHours: "このオプションを有効にすると、ユーザーの営業時間を使用してサービス時間を定義することができます。",
      webPushChatInterno: "このオプションを有効にすると、内部チャットで新しいメッセージが受信されたときにプッシュ通知が送信されます。",
      scanContacts: "LIDなしの連絡先をスキャンする",
      postmanLink: "Postman リンクを変更すると、API ページのコレクションが更新されます。",
      listarPelaUltimaMensagem: "このオプションを有効にすると、システムは最後に受信したメッセージごとに通話をリストします。",
      forceReason: "このオプションを有効にすると、サービスを終了するときに需要の定義が要求されます。",
      syncTicketData: "このオプションを有効にすると、システムはチケットの日付を最新のメッセージの時間に更新します。",
      controlFeatures: "このオプションを有効にすると、システムはユーザーのピーク機能と強制終了機能を制御します。",
      syncMessagesUpdate: "このオプションを有効にすると、システムはインポートされたメッセージの日付を元の時間に更新します。",
      ignoreIgStories: "このオプションを有効にすると、Instagram ストーリーは無視されます。",
      audioPlugin: "このオプションを有効にすると、新しいベータ版のオーディオ プラグインが使用されます。",
      audioModule: "このオプションを有効にすると、音波を備えた新しいオーディオ モジュールが使用されます。",
      showGroupsForAll: "このオプションを有効にすると、グループはすべてのユーザーに表示されます。",
      persistirMedia: "このオプションを有効にすると、Unofficial Baileys API 経由で受信したメディアのダウンロードが順次試行されます。",
      showClosedForAll: "このオプションを有効にすると、「Closed」がすべてのユーザーに表示されます。",
      waitProcessing: "サポートで複数のメッセージを受信した場合、システムは最初のメッセージに返信した後にのみ新しいメッセージを処理します。その間に受信されたメッセージは外部統合とやり取りしません。",
      openChat: "会話ウィンドウが開いていない場合でも、テンプレートを送信した後に WABA メッセージを送信できるようにします。メッセージの配信は保証されません。 Wabaのポリシーを見る",
      shutdownWallet: "このオプションを有効にすると、ウォレット化がアクティブで新しいチケットを受信した際に、ChatGPT、Typebot などの外部統合が無効になります。",
      notViewAssignedTickets: "チケット所有者と管理者のみが閲覧できます。",
      notViewTicketsChatBot: "ChatBot によって処理されたチケットをユーザーが見ることはできません。",
      directTicketsToWallets: "クライアントのポートフォリオの所有者にサービスを提供します。",
      ticketNulo: "ユーザーまたはキューが割り当てられていない予定はすべてのユーザーに表示されます。",
      supervisor: "スーパーバイザーは一般的なユーザー ロジックに従います。",
      semRedis: "メッセージはリズムなしで送信されます。",
      chatbotLane: "ChatBots専用のガイドが追加されます。",
      ignoreGroupMsg: "システムはグループに対してチケットを開きません。",
      rejectCalls: "音声通話とビデオ通話では以下のメッセージが届きます。",
      agruparTickets: "チャネルと連絡先に関連付けられているすべてのメッセージを表示します。",
      transbordo: "ユーザーがオフラインの場合、カードベースのサービスがオーバーフローします。",
      atualizarNomes: "受信したメッセージの連絡先名を更新しません。",
      forcarAdmin: "保留中のチケットは管理者に割り当てられます。",
      signed: "ユーザーはサブスクリプションを無効にすることはできません。",
      universalCounter: "開いているチケットカウンターを上部のタブに表示します。",
      autoClose: "アイドル通話は自動的に解決されます。",
      ticketLimit: "古い通話をフィルタリングします。",
      notificationSilenced: "音声通知を受信します。",
      forbiddenNumbers: "プラットフォーム上でブロックされた番号のリスト。",
      validateAllContacts: "システム内のすべての連絡先の数を検証します。",
      resetFlow: "新しいサービスのアクティブ フローをリセットします。",
      maxRetries: "不在メッセージ送信の最大数。",
      privateMessageLimit: "サービスごとの内部チャットのメッセージ数。",
      ticketLimitNumber: "一度に参照されるチケットの数。",
      chatbotFlow: "ボットが新しいサービスに使用するフロー",
      chatbotFlowReset: "チャットボットフローをリセットする",
      chatbotFix: "このオプションを有効にすると、接続はフッターに表示されなくなり、サービス リストの上部に固定されます。",
      forcePending: "このオプションを有効にすると、チケットのステータスがオープンから保留に変更されても、ユーザーはサービスに関連付けられたままになります。",
      maxAttemps: "各サービスごとに不在メッセージを送信できる回数をここに入力します...",
      limitTickets: "サービス画面で検索するチケットの数をここに入力してください...",
      limitePrivate: "内部チャットで検索するメッセージの数をここに入力してください...",
      erroMessage: "このコマンドは、スタックされたメッセージをシステムに送信します。",
      solveMessage: "このコマンドはシステムからエラー メッセージを削除します。",
      validate: "このコマンドは、システム内のすべての連絡先の数を検証します。",
      validating: "すべてのシステム連絡先を検証しています。お待ちください...",
      validateContact: "有効にすると、登録時に連絡先番号を検証します（WABA）。",
      hearHubApi: "このオプションを有効にすると、メッセージはすべてHUB APIによって作成され、システムユーザーが受信します。APPからの送信後、Hubによってイベントが返されるとすぐに作成されます",
      ticketsRain: "処理前にフィルタリングし、ユーザーに属していないチケット（管理者を除く）を無視します。不要なHTTPリクエストを大幅に削減し、システムのパフォーマンスを向上させます。",
      messageListingType: "履歴でメッセージがどのようにリストされるかを定義します。デフォルト: グループ化設定を尊重（groupTicketsあり: 連絡先/チャネルの完全な履歴; groupTicketsなし: 同じキューのみ）。キュー別: プライバシーを備えたキュー別のセグメント化履歴（管理者: 完全な履歴; ユーザー: 履歴queueIdを使用した許可されたキューのみ）。完全: 全員の連絡先/チャネルの完全な履歴。チケット別: 現在のチケットのメッセージのみ。"
    },
    notifications: {
      scanContactsSuccess: "連絡先が正常に更新されました!",
      scanContactsError: "連絡先の更新中にエラーが発生しました",
      updatingMessagesDate: "インポートされたメッセージの日付を更新しています...",
      success: "構成が正常に変更されました。",
      error: "構成の変更中にエラーが発生しました。",
      warningTicketSettings: "他のユーザーに割り当てられたチケット、ChatBot 内のチケット、キューまたはユーザーが割り当てられていないチケットの設定を一緒に使用することはできません。",
      processStarted: "プロセスが開始されました。",
      contactsValidated: "連絡先が検証されました。",
      errorValidatingContacts: "連絡先の検証中にエラーが発生しました",
      sendingMessages: "保留中のメッセージを送信しようとしています。",
      errorSendingMessages: "メッセージの送信中にエラーが発生しました",
      configChanged: "構成が変更されました",
      baileysGroupWarning: "注意: 非公式 Baileys API では、グループの使用時に不安定になる可能性があります。"
    },
    dialogs: {
      confirmationTitleScanContacts: "LIDなしの連絡先をスキャンしますか?",
      scanContacts: "LIDなしの連絡先をスキャンする",
      confirmationTitle4: "チケットの日付を最新のメッセージの時間に更新しますか?",
      syncTicketData: "このオプションを有効にすると、システムはチケットの日付を最新のメッセージの時間に更新します。",
      confirmationTitle: "システム内に残っているすべてのメッセージを送信/解決しますか?",
      resolvePendingMessages: "システム内の滞留メッセージを解決する",
      sendPendingMessages: "システムに滞留したメッセージを送信する",
      confirmationTitle2: "同期されたメッセージの日付を更新しますか?",
      updateMessagesDate: "インポートされたメッセージの更新日",
      confirmationTitle3: "注意してください。システム内の連絡先番号が多すぎると、WhatsApp がブロックされる可能性があります。すべての連絡先を一括で検証しますか?",
      validateAllContacts: "すべてのシステム連絡先を一括して検証します。"
    }
  },
  configuracaoPagamentoAtraso: {
    title: "支払い情報",
    status: {
      pending: "保留中",
      overdue: "延滞",
      paid: "有料"
    },
    dueDate: "成熟",
    paymentLink: "支払いリンク",
    checkPaymentStatus: "請求書のステータスを確認する",
    invalidUrlMessage: "続行する前に有効な URL を入力してください。"
  },
  configuracaoTenantSmtp: {
    title: "SMTP設定",
    enableSmtp: "SMTPを有効にする",
    enableSmtpCaption: "アクティブになると、システムはユーザーの電子メールに情報を送信します。",
    emailHost: "メールサーバー（ホスト）:",
    emailPort: "SMTPポート",
    emailUser: "メールユーザー:",
    emailPass: "メールパスワード:",
    secureProtocol: "セキュリティプロトコル",
    secureProtocolCaption: "安全なプロトコルを有効にします。",
    successMessage: "構成が正常に変更されました。",
    errorMessage: "構成の変更中にエラーが発生しました。",
    toggleOn: "有効",
    toggleOff: "無効",
    label: "設定。 SMTP"
  },
  contactsModal: {
    updateLidButton: 'LIDを更新',
    updateLidSuccessMessage: 'LIDが正常に更新されました！',
    updateNameSuccessMessage: '名前が正常に更新されました！',
    updateNameButton: '名前を更新',
    placeholderLid: 'WhatsApp-LID',
    hintLid: 'WhatsApp-LID',
    labelLid: 'WhatsApp-LID',
    titleAdd: "連絡先を追加",
    titleEdit: "連絡先を編集",
    labelName: "名前",
    labelNumber: "番号",
    labelEmail: "Eメール",
    labelCpf: "CPF/CNPJ",
    labelBirthday: "誕生日",
    labelFirstName: "ファーストネーム",
    labelLastName: "姓",
    labelBusinessName: "企業",
    labelMessengerId: "メッセンジャーID",
    labelInstagramPK: "インスタグラムID",
    labelhubWhatsapp: "WhatsAppハブID",
    placeholderhubWhatsapp: "WhatsAppハブID",
    hinthubWhatsapp: "WhatsAppハブID",
    walletSectionTitle: "ポートフォリオ",
    walletNoAvailable: "おっと…ウォレットが利用できません!!",
    tagSectionTitle: "ラベル",
    tagNoAvailable: "おっと…タグが利用できません!!",
    additionalInfoSectionTitle: "追加情報",
    saveButtonLabel: "保存",
    exitButtonLabel: "外出する",
    createSuccessMessage: "連絡先が作成されました!",
    editSuccessMessage: "連絡先を編集しました!",
    removeInfoErrorMessage: "追加情報の削除中にエラーが発生しました。",
    validationErrorMessage: "おっと！エラーを確認してください...",
    errorContact: "連絡先の作成中にエラーが発生しました",
    invalidContact: "無効な連絡先",
    duplicatedContact: "この連絡先は既にデータベースに存在します。再度追加することはできません。",
    errorUsers: "ユーザーの読み込み中に問題が発生しました",
    errorTags: "ラベルの読み込み中に問題が発生しました",
    placeholderNumber: "+DDI (DDD) 99999 9999",
    hintNumber: "システム内にアクティブな WABA 接続がある場合は、正確な WhatsApp アカウント番号を入力する必要があります。",
    placeholderCpf: "CPF/CNPJ",
    hintCpf: "CPF/CNPJ 番号には、ダッシュやスラッシュなどの特殊文字を含める必要があります。",
    placeholderBirthday: "1990年1月1日",
    hintBirthday: "生年月日は 01/01/1990 の形式で入力する必要があります。",
    placeholderFirstName: "ファーストネーム",
    hintFirstName: "ファーストネーム",
    placeholderLastName: "姓",
    hintLastName: "姓",
    placeholderBusinessName: "企業",
    hintBusinessName: "企業",
    placeholderMessengerId: "メッセンジャーID",
    hintMessengerId: "メッセンジャーID",
    placeholderInstagramPK: "インスタグラムID",
    hintInstagramPK: "インスタグラムID"
  },
  contacts: {
    forbidden: "チケットや商談が登録されている連絡先の削除は管理者に限定されています。",
    deleteSelectedContacts: "{count}件の選択された連絡先を削除しますか？",
    warning1DeleteSelect: "連絡先ID {contactId} には登録されたチケットがあります。強制的に削除しますか？",
    warning2DeleteSelect: "連絡先ID {contactId} には登録された商談があります。強制的に削除しますか？",
    deleteCanceled: "ユーザーが強制削除をキャンセルしました",
    deleteError: '連絡先の強制削除中にエラーが発生しました',
    deleteMessage: '連絡先が強制的に正常に削除されました',
    deleteTitle: '強制削除',
    warning1: 'この連絡先には登録されたチケットがあります。強制的に削除しますか？（関連するすべてのチケットとメッセージが削除されます）',
    warning2: 'この連絡先には登録された商談があります。強制的に削除しますか？（関連するすべての商談が削除されます）',
    agruparLid: "LIDで連絡先をグループ化",
    agruparLidTitle: "LIDで連絡先をグループ化",
    agruparLidMessage: "このオプションを有効にすると、同じWhatsAppのLIDを持つ連絡先が1つの連絡先にまとめられます。",
    lid: "WhatsApp LID",
    tableTitle: "連絡先",
    searchPlaceholder: "位置特定",
    walletFilterLabel: "ポートフォリオでフィルタリング",
    tagFilterLabel: "タグでフィルタリング",
    syncContactsLabel: "連絡先を同期",
    syncGroupsLabel: "同期グループ",
    removeDuplicatesLabel: "重複を削除",
    checkDigit: "9桁目チェック（BR）",
    addContactLabel: "連絡先を追加",
    importContactsLabel: "連絡先をインポート",
    importWarning: "ファイルには名前と番号の列が含まれている必要があります",
    exportContactsLabel: "連絡先をエクスポート",
    photoColumn: "写真",
    nameColumn: "名前",
    whatsappColumn: "ワッツアップ",
    businessColumn: "企業",
    telegramColumn: "電報",
    messengerColumn: "メッセンジャー",
    instagramColumn: "インスタグラム",
    hubWaba: "ワバ（ハブ）",
    emailColumn: "Eメール",
    cpfColumn: "CPF",
    birthdayColumn: "誕生日",
    firstNameColumn: "ファーストネーム",
    lastNameColumn: "姓",
    businessNameColumn: "企業",
    walletColumn: "ポートフォリオ",
    validateContact: "連絡先を検証する",
    validateContactWarning: "「連絡先の検証」オプションを選択する場合、連絡先を検証するためにアクティブな接続が必要です。非公式 API で使用する場合、検証する数値が多すぎるとブロックされる可能性があります。",
    addTagsInsteadOfReplace: "置き換えるのではなくタグを追加",
    addTagsTooltip: "チェックすると、選択したタグが連絡先の既存のタグに追加されます。チェックを外すと、連絡先のすべてのタグが選択したタグに置き換えられます。",
    addTagsWarning: "このオプションを選択すると、選択したタグが連絡先に既に存在するタグに追加され、以前のタグは削除されません。",
    tagsColumn: "タグ",
    kanbanColumn: "カンバン",
    actionsColumn: "アクション",
    blockContactColumn: "ブロック連絡先",
    blockChatbotColumn: "チャットボットをブロックする",
    confirmSyncContactsTitle: "注意！！本当に連絡先を同期しますか?",
    confirmSyncContactsMessage: "WhatsApp でこれまでチャットしたすべての連絡先が作成されます。しばらく時間がかかるかもしれません...",
    confirmRemoveDuplicatesTitle: "注意！！重複した連絡先を削除しますか?",
    confirmRemoveDuplicatesMessage: "すべてのチケットとメッセージは、最も古い重複した連絡先に割り当てられます...",
    confirmSyncGroupsTitle: "注意！！本当にグループを同期しますか?",
    confirmSyncGroupsMessage: "WhatsApp でこれまでチャットしたすべてのグループが作成されます。しばらく時間がかかるかもしれません...",
    deleteContactTitle: "注意！！本当に連絡先を削除しますか?",
    deleteContactSuccess: "連絡先が削除されました。",
    syncInProgressMessage: "しばらく時間がかかるかもしれません...",
    blockContactSuccess: "ロックステータスが正常に更新されました。",
    blockContactError: "ロック状態の更新中にエラーが発生しました。",
    blockChatbotSuccess: "チャットボットのブロックステータスが正常に更新されました。",
    blockChatbotError: "チャットボットのブロックステータスの更新中にエラーが発生しました。",
    downloadModelLabel: "テンプレートをダウンロード",
    selectDestiny: "目的地を選択",
    modelDownloadHint: "名前;電話番号;メールアドレス;CPF;生年月日;名;姓;会社名",
    uploadFileLabel: "連絡先をインポート",
    fileUploadHint: "ファイルには名前と番号の列が含まれている必要があります",
    noTagsAvailable: "おっと...タグが作成されませんでした。",
    noTagsAvailableWarning: "システム管理で新しいラベルを登録します。",
    noWalletsAvailable: "おっと…ウォレットが利用できません！",
    downloadCsvHint: "テンプレートをCSV形式でダウンロードします。",
    saveButton: "保存",
    cancelButton: "キャンセル",
    coluumnsButton: "列",
    block: "ブロック",
    blockBot: "チャットボットをブロック",
    queueDestiny: "宛先キュー",
    userDestiny: "対象ユーザー",
    dialog: {
      contact: "接触",
      selectChannel: "サービスを開始するチャネルを選択します。",
      start: "始める",
      cancel: "キャンセル",
      confirmDelete: "本当に連絡先を削除しますか?",
      syncContactsTitle: "連絡先を同期",
      syncContactsMessage: "すべての連絡先が作成されます。しばらく時間がかかるかもしれません...",
      syncGroupsTitle: "同期グループ",
      syncGroupsMessage: "すべてのグループが作成されます。しばらく時間がかかるかもしれません...",
      removeDuplicatesTitle: "重複した連絡先を削除する",
      checkDigitTitle: "ブラジルの数字の9桁目の扱い",
      removeDuplicatesMessage: "すべてのチケットは最も古い連絡先に割り当てられます。",
      checkDigitMessage: "間違った番号への連絡は、チケットやメッセージと同様に削除されます。これは、WhatsApp の一般的な 9 桁目のルールに基づいたブラジルの番号の処理です。 DDD が 30 を超える場合は、通常、9 は付与されません。"
    },
    notifications: {
      existingTicket: "すでにサービスが継続されており、",
      existingTicketDetails: "すでにサービスが進行中です",
      contactDeleted: "連絡先が正常に削除されました。",
      deleteError: "連絡先の削除中にエラーが発生しました。",
      tokenUpdateError: "トークンの更新中にエラーが発生しました。",
      started: "サービス開始",
      importInProgress: "インポート中です。",
      importCaption: "完了すると、ページが更新されます。",
      importSuccess: "連絡先が正常にインポートされました。",
      importError: "連絡先のインポート中にエラーが発生しました。",
      loadQueuesError: "キューの読み込み中にエラーが発生しました。",
      loadSynError: "同期中にエラーが発生しました。",
      loadUsersError: "ユーザーの読み込み中にエラーが発生しました。",
      ticketTransferred: "チケットは正常に転送されました。",
      exportError: "連絡先のエクスポート中にエラーが発生しました。",
      syncContact: "連絡先を更新しています。しばらく時間がかかるかもしれません...",
      syncGroups: "グループを更新中です。しばらく時間がかかるかもしれません..."
    },
    actions: {
      blockBot: "チャットボットをブロックする",
      queueDestiny: "宛先キュー",
      userDestiny: "対象ユーザー"
    }
  },
  customizar: {
    logoDark: {
      title: "ダークロゴ",
      chooseFile: "ファイルを選択",
      upload: "アップロード",
      current: "現在のダークロゴ"
    },    
    forceLogout: {
      title: "テナントごとの強制ログアウト設定",
      description: "各テナントがシングルセッション（強制ログアウト）を有効または無効にするかを設定します。",
      selectTenant: "テナントを選択",
      forceLogout: "強制ログアウト",
      enabled: "有効",
      disabled: "無効",
      forceLogoutEnabled: "強制ログアウトが有効になっています",
      forceLogoutDisabled: "強制ログアウトが無効になっています",
      warning1: "シングルセッションが有効 - 別のデバイスでログインするとログアウトされます",
      warning2: "シングルセッションが無効 - 複数のデバイスでログイン可能です"
    },
    masterkey: {
      generateRandom: "ランダムに生成",
      title: "MasterKeyの設定",
      description: "アプリケーションのMasterKeyを設定します",
      enabled: "MasterKeyが有効",
      disabled: "MasterKeyが無効",
      lastUsed: "MasterKey使用ログ",
      keyLabel: "MasterKey",
      warningTitle: "注意!!",
      warningText: "MasterKeyはアプリケーションへの一意のアクセスキーです。安全な場所に保管し、他人と共有しないでください。このキーはTenant 1のスーパ管理者のみが編集できます"
    },
    encryptionkey: {
      title: "暗号化キーの設定",
      description: "メインテナント（ID: 1）の暗号化キーを設定します。このキーはフロントエンドでパスワードを暗号化するために使用されます。",
      keyLabel: "暗号化キー",
      generateRandom: "ランダムキーを生成",
      infoTitle: "重要な情報",
      infoText: "このキーはサーバーに送信する前にパスワードを暗号化するために使用されます。安全に保管し、共有しないでください。",
      warningTitle: "警告: 暗号化キーの変更",
      warningText: "このキーを変更すると、ユーザー認証に影響します。ユーザーは再度ログインする必要がある場合があります。",
      warningChangeKey: "警告: 暗号化キーを変更すると、以前に暗号化されたすべてのデータが互換性がなくなります。\n\nこれにより以下が発生する可能性があります:\n• 古いパスワード/トークンの復号化に失敗\n• 統合の再設定が必要\n• 暗号化されたデータへのアクセスが失われる可能性\n\n続行しますか？",
      warningAfterUpdate: "注意: 以前のキーで暗号化されたデータは、アクセスできなくなる可能性があります。",
      errorKeyTooShort: "暗号化キーは16文字以上である必要があります",
      successUpdate: "暗号化キーの設定が正常に更新されました",
      errorUpdate: "暗号化キーの設定の更新中にエラーが発生しました"
    },    
    tabs: {
      masterkey: "MasterKey",
      encryptionkey: "暗号化キー",
      colors: "色",
      branding: "ブランディング",
      tutorials: "チュートリアル",
      forceLogout: "強制ログアウト"
    },
    title: "アプリケーションをカスタマイズする",
    chooseColors: "色を選択",
    colors: {
      neutral: "ニュートラルカラー",
      primary: "原色",
      secondary: "二次色",
      accent: "ハイライトカラー",
      warning: "警告色",
      negative: "ネガティブカラー",
      positive: "ポジティブカラー",
      light: "ライトカラー"
    },
    saveColors: "色を保存",
    applyColors: "色の変更を適用する",
    logo: {
      title: "ロゴ",
      chooseFile: "ファイルを選択",
      upload: "アップロード",
      current: "現在のロゴ"
    },
    favicon: {
      title: "ファビコン",
      chooseFile: "ファイルを選択",
      upload: "アップロード",
      current: "現在のファビコン"
    },
    video: {
      title: "ビデオ（ホーム）",
      chooseFile: "ファイルを選択",
      upload: "アップロード",
      current: "現在のビデオ"
    },
    appName: {
      title: "アプリケーション名",
      label: "名前",
      update: "名前を更新"
    },
    logoScreen: {
      title: "ログイン画面モデル",
      label: "モデルを選択",
      update: "更新"
    },
    frontend: {
      rebuildTitle: "ロゴ、ファビコン、名前の変更を適用する",
      warning: "この変更は、自動インストーラーからのデフォルトのフォルダーとユーザーを維持するインストールでのみ機能します。",
      rebuildMessage: "フロントエンドに変更を適用しています。お待ちください... フロントエンドを再構築中です。",
      rebuildButton: "変更を適用"
    },
    notifications: {
      errorVideoSize: "選択したビデオは大きすぎます。最大サイズは5MBです。",
      errorLogo: "ファイル形式が無効です。 JPG、JPEG、PNGのみ許可されます",
      errorIcon: "ファイル形式が無効です。 ICOファイルのみ許可されます",
      successLoadColors: "色が正常に読み込まれました。",
      errorLoadColors: "色の読み込み中にエラーが発生しました。",
      successSaveColors: "色が正常に保存されました。",
      errorSaveColors: "色の保存中にエラーが発生しました。",
      successUploadLogo: "ロゴは正常に送信されました。",
      errorUploadLogo: "ロゴの送信中にエラーが発生しました。",
      successUploadIcon: "ファビコンが正常に送信されました。",
      errorUploadIcon: "ファビコンの送信中にエラーが発生しました。",
      successRebuildFrontend: "フロントエンドが正常に再構築されました。",
      errorRebuildFrontend: "フロントエンドの再構築中にエラーが発生しました。",
      successUpdateAppName: "アプリケーション名が正常に更新されました。",
      errorUpdateAppName: "アプリケーション名の更新中にエラーが発生しました。",
      successUpdateLogoScreen: "ログイン画面モデルが正常に更新されました。",
      errorUpdateLogoScreen: "ログイン画面モデルの更新中にエラーが発生しました。"
    }
  },
  common: {
    continue: "続行",
    cancel: "キャンセル"
  },
  equipes: {
    title: "チーム",
    columns: {
      id: "#",
      group: "チーム",
      isActive: "アクティブ",
      actions: "アクション"
    },
    actions: {
      addUser: "ユーザーの追加/削除",
      edit: "チームを編集",
      delete: "チームを削除"
    },
    notifications: {
      deleted: "グループ {group} が削除されました。",
      errorLoading: "グループの読み込み中にエラーが発生しました。",
      errorDelete: "グループの削除中にエラーが発生しました。",
      created: "チームが正常に作成されました。",
      updated: "チームが正常に更新されました。"
    },
    dialog: {
      deleteTitle: "注意！！",
      deleteMessage: "グループ「{group}」を本当に削除しますか?"
    },
    modal: {
      titleCreate: "チームを作成",
      titleEdit: "チームを編集",
      nameLabel: "チーム名",
      activeLabel: "アクティブ",
      cancelButton: "キャンセル",
      saveButton: "保存",
      notifications: {
        created: "チームが正常に作成されました。",
        updated: "チームの編集に成功しました!",
        error: "チームの保存中にエラーが発生しました。"
      }
    },
    modalUser: {
      title: "チームユーザーの管理",
      placeholder: "追加するユーザーを選択",
      tooltip: "リストからユーザーを選択または選択解除します。",
      saveButton: "保存",
      closeButton: "閉じる",
      notifications: {
        updated: "ユーザーが更新されました!",
        error: "ユーザーの更新中にエラーが発生しました。"
      }
    }
  },
  etiquetas: {
    title: "タグ",
    columns: {
      id: "#",
      tag: "ラベル",
      color: "色",
      isActive: "アクティブ",
      actions: "アクション"
    },
    notifications: {
      created: "ラベルが正常に作成されました。",
      updated: "ラベルが正常に更新されました。",
      deleted: "タグ {tag} が削除されました。",
      errorLoading: "ラベルの読み込み中にエラーが発生しました。",
      errorDelete: "タグの削除中にエラーが発生しました。"
    },
    dialog: {
      deleteTitle: "注意！！",
      deleteMessage: "本当にタグ「{tag}」を削除しますか?"
    }
  },
  modalEtiqueta: {
    titleCreate: "ラベルを作成",
    titleEdit: "ラベルを編集",
    nameLabel: "ラベル名",
    colorLabel: "色",
    activeLabel: "アクティブ",
    cancelButton: "キャンセル",
    saveButton: "保存",
    notifications: {
      created: "ラベルが正常に作成されました。",
      updated: "ラベルの編集に成功しました。",
      error: "ラベルの保存中にエラーが発生しました。"
    }
  },
  fechamento: {
    title: "別れ",
    nameLabel: "名前",
    messageLabel: "メッセージ",
    userLabel: "ユーザー",
    dateLabel: "日付",
    actionsLabel: "アクション",
    deleteAllButton: "すべて削除",
    searchPlaceholder: "位置特定",
    deleteConfirmation: "本当に「{id}」を削除しますか?",
    deleteAllConfirmation: "本当にすべての Farewell レコードを削除しますか?",
    deleteSuccess: "さようならが正常に削除されました!",
    deleteAllSuccess: "すべての別れが正常に削除されました。",
    notifications: {
      error: "リクエストの処理中にエラーが発生しました。"
    },
    system: "システム"
  },
  modalDespedida: {
    titleCreate: "別れを創る",
    titleEdit: "編集 別れ",
    nameLabel: "別れの名前",
    label: "別れ",
    notifications: {
      created: "さよならの作成に成功しました！",
      updated: "さようなら編集成功しました！",
      error: "別れの保存中にエラーが発生しました。"
    }
  },
  filas: {
    title: "キュー",
    notifications: {
      created: "キューが正常に作成されました。",
      updated: "キューが正常に編集されました。",
      deleted: "キューが正常に削除されました。",
      error: "キューの処理中にエラーが発生しました。"
    },
    confirmDelete: "本当にキュー「{name}」を削除しますか?"
  },
  modalFila: {
    title: {
      create: "キューを作成",
      edit: "編集キュー"
    },
    notifications: {
      created: "キューが正常に作成されました。",
      updated: "キューが正常に編集されました。",
      error: "キューの処理中にエラーが発生しました。"
    },
    labels: {
      name: "キュー名",
      businessHours: "営業時間",
      absenceMessage: "不在メッセージ"
    }
  },
  horarioAtendimento: {
    title: "営業時間",
    tooltips: {
      open: "営業時間: 終日営業。不在メッセージは送信されません。",
      closed: "休業：終日休業となります。不在メッセージは時間に関係なく送信されます。",
      schedule: "スケジュール: 施設の営業時間を表します。定められた時間外には不在メッセージが送信されます。",
      important: "**重要: 自動サービス終了後に不在メッセージが送信されます。"
    },
    labels: {
      closed: "閉鎖",
      absenceMessage: "不在メッセージ",
      time: "に",
      holidays: "休日",
      holidayDate: "休日の日付",
      holidayDescription: "休日の説明",
      addHoliday: "休日を追加",
      holidaysInfo: "休日は施設が営業していない日です。これらの日は休業日とみなされます。"
    },
    notifications: {
      scheduleUpdated: "営業時間を更新しました。",
      absenceMessageUpdated: "不在メッセージが更新されました。",
      holidaysUpdated: "休日が正常に更新されました。",
      validationError: "営業時間の検証エラー。保存する前にエラーを修正してください。",
      saveError: "営業時間の保存中にエラーが発生しました。"
    }
  },
  businessHours: {
    days: {
      0: "日曜日",
      1: "月曜日",
      2: "火曜日",
      3: "水曜日",
      4: "木曜日",
      5: "金曜日",
      6: "土曜日"
    },
    types: {
      O: "開ける",
      C: "閉鎖",
      H: "時間",
      L: "リリース",
      B: "ブロックされました"
    },
    labels: {
      start: "始める",
      end: "終わり",
      to: "それまで"
    },
    notifications: {
      updated: "営業時間が正常に更新されました。"
    },
    warnings: {
      overlap: "スケジュールは重複できません。間隔を調整します。",
      invalidTime: "時間は 00:01 から 23:59 までの範囲で指定する必要があります。",
      invalidHour: "無効な時間",
      gap: "スケジュールは連続している必要があり、期間間に間隔があってはいけません。",
      invalidPeriod: "各期間の開始時刻は終了時刻より前である必要があります。",
      missingTime: "すべてのスケジュールを入力する必要があります。"
    }
  },
  kanbanMenu: {
    kanban: "カンバン",
    tags: "ラベル"
  },
  kanbans: {
    cardsLoaded: "カードが正常に読み込まれました。",
    contactTitle: "接触",
    title: "サービスの視覚的制御",
    loadingMessage: "お待ちください。カンバン情報を読み込んでいます...",
    attendances: "サービス",
    contacts: "連絡先",
    removeAttendanceTitle: "ダッシュボードからサービスを削除する",
    removeAttendanceMessage: "サービスを削除しますか?",
    startAttendance: "サービスを開始するチャネルを選択します。",
    existingTicketMessage: "{title} ではサービスが継続中です。サービスを開きますか?",
    existingTicketAdminOnly: "{title} ではサービスが継続中です。このサービスを割り当てることができるのは管理者のみです。",
    loadingNewData: "Kanban に新しいデータを読み込んでいます... お待ちください!",
    successEdit: "すべてのカードが正常に編集されました。",
    contactEdited: "連絡先の編集に成功しました。",
    contactEditError: "連絡先の編集中にエラーが発生しました",
    kanbanUpdated: "カンバンが正常に更新されました。",
    openAttendance: "オープンサービス",
    selectChannel: "サービスを開始するチャネルを選択します。",
    contactHasTicket: "{title} ではサービスが継続中です。サービスを開きますか?",
    adminOnlyTicket: "{title} ではサービスが継続中です。このサービスを割り当てることができるのは管理者のみです。",
    successEditCards: "すべてのカードが正常に編集されました。",
    loadingKanban: "Kanban に新しいデータを読み込んでいます... お待ちください!",
    tokenUpdateError: "トークンを更新できません。",
    fetchingContactsError: "連絡先の取得中にエラーが発生しました。",
    noNameAvailable: "名前は利用できません",
    fetchingKanbansError: "カンバンの一覧表示中にエラーが発生しました。"
  },
  tagsKanban: {
    contacts: "連絡先",
    title: "カンバンでのタグの表示",
    description: "表示のみ。カードを操作するときにタグを保存することはできません。",
    loading: "Kanban に新しいデータを読み込んでいます... お待ちください!",
    removeTitle: "ダッシュボードからサービスを削除する",
    removeMessage: "サービスを削除しますか?",
    cardEdited: "連絡先を編集しました!",
    startService: "サービスを開始するチャネルを選択します。",
    serviceStarted: "サービス開始",
    contactError: "連絡先の削除中にエラーが発生しました。",
    kanbanError: "カンバンの一覧表示中にエラーが発生しました。",
    cardsSaved: "すべてのカードが正常に編集されました。",
    saveError: "連絡先の編集中にエラーが発生しました。",
    existingServiceTitle: "継続的なサービス",
    existingServiceMessageUser: "{title} ではサービスが継続中です。このサービスを割り当てることができるのは管理者のみです。",
    existingServiceMessageAdmin: "{title} には進行中のサービスがあります (サービス: {ticketId} - キュー: {queueId})。サービスを開きますか?",
    tokenError: "トークンを更新できません。",
    buttons: {
      yes: "はい",
      no: "いいえ",
      ok: "わかりました"
    },
    contactTitle: "連絡先",
    selectChannel: "サービスを開始するチャネルを選択します。",
    canceledTicket: "操作がキャンセルされました",
    noChannelsAvailable: "利用可能なチャネルがありません",
    tenantNotFound: "テナントが見つかりません",
    errorStartingConversation: "会話の開始中にエラーが発生しました",
  },
  cardsTags: {
    title: "タグカード",
    description: "連絡先の詳細情報を表示します。",
    tagsTooltip: "ラベル",
    walletTooltip: "ポートフォリオ",
    actions: {
      uazapi: "Uazapiサービス",
      zapi: "Zapiサービス",
      whatsapp: "WWebJs サポート",
      baileys: "ベイリーズサービス",
      meow: "ニャーサービス",
      evo: "エボサービス",
      waba: "ワバサービス"
    },
    phoneTooltip: "電話",
    removeTooltip: "取り除く"
  },
  cardsKanbans: {
    title: "カンバンカード",
    description: "連絡先の詳細情報を表示します。",
    tagsTooltip: "ラベル",
    walletTooltip: "ポートフォリオ",
    actions: {
      uazapi: "Uazapiサービス",
      zapi: "Zapiサービス",
      whatsapp: "WWebJs サポート",
      baileys: "ベイリーズサービス",
      meow: "ニャーサービス",
      evo: "エボサービス",
      waba: "ワバサービス",
      remove: "取り除く"
    },
    phoneTooltip: "電話"
  },
  lanes: {
    title: "カンバンレーン",
    actions: "アクション",
    add: "新しいレーンを追加",
    edit: "レーンを編集",
    deleteConfirm: "本当にカンバン「{name}」を削除しますか?",
    deleteSuccess: "カンバン {name} が正常に削除されました。",
    columns: {
      id: "ID",
      name: "レーン",
      actions: "アクション"
    },
    notifications: {
      loadError: "レーンの読み込み中にエラーが発生しました。",
      deleteError: "車線の削除中にエラーが発生しました。"
    }
  },
  modalLanesKanban: {
    createTitle: "カンバンを作成する",
    editTitle: "カンバンを編集",
    nameLabel: "カンバン名",
    createSuccess: "カンバンが正常に作成されました。",
    updateSuccess: "カンバンが正常に更新されました。",
    notifications: {
      error: "カンバン処理中にエラーが発生しました。"
    }
  },
  modalMensagemRapida: {
    createTitle: "クイックメッセージを作成する",
    editTitle: "クイックメッセージを編集",
    idLabel: "ID",
    keyLabel: "鍵",
    keyHint: "キーは、ユーザーがメッセージを検索するためのショートカットです。",
    messageLabel: "メッセージ",
    placeholder: "メッセージを入力してください",
    sendAsAudio: "録音した音声として送信",
    fileLabel: "ファイルを選択",
    publicLabel: "すべてのユーザーと共有する",
    publicHint: "有効にすると、全ユーザーがこのクイックメッセージを利用できます。",
    removeFile: "ファイルを削除",
    saveSuccess: {
      create: "クイックメッセージが正常に作成されました。",
      update: "クイックメッセージが正常に更新されました。"
    },
    saveError: "クイックメッセージの保存中にエラーが発生しました。",
    variablesLabel: "変数",
    emojiLabel: "絵文字",
    variablesList: {
      0: {
        label: "名前",
        value: "{{名前}}"
      },
      1: {
        label: "挨拶",
        value: "{{挨拶}}"
      },
      2: {
        label: "プロトコル",
        value: "{{プロトコル}}"
      },
      3: {
        label: "メールアドレス（可能な場合）",
        value: "{{Eメール}}"
      },
      4: {
        label: "電話",
        value: "{{電話番号}}"
      },
      5: {
        label: "カンバン（ある場合）",
        value: "{{カンバン}}"
      },
      6: {
        label: "付き添い者（付き添いの場合）",
        value: "{{ユーザー}}"
      },
      7: {
        label: "担当者のメールアドレス（サービス中の場合）",
        value: "{{ユーザーメールアドレス}}"
      },
      8: {
        label: "名（ある場合）",
        value: "{{ファーストネーム}}"
      },
      9: {
        label: "姓（ある場合）",
        value: "{{苗字}}"
      },
      10: {
        label: "会社名（ある場合）",
        value: "{{ビジネス名}}"
      }
    }
  },
  mensagemRapida: {
    title: "クイックメッセージ",
    add: "クイックメッセージを追加",
    edit: "クイックメッセージを編集",
    create: "クイックメッセージを作成する",
    key: "鍵",
    message: "メッセージ",
    file: "ファイル",
    recordedAudio: "録音された音声",
    visibility: "公開範囲",
    visibilityPublic: "公開",
    visibilityPrivate: "非公開",
    noFile: "ファイルなし",
    fileOpen: "ファイルを開く",
    noPreview: "利用可能な内容がありません",
    active: "アクティブ",
    inactive: "非アクティブ",
    actions: "アクション",
    deleteConfirmation: "キーメッセージ「{key}」を本当に削除しますか?",
    deleteSuccess: "メッセージは正常に削除されました。",
    saveSuccess: {
      create: "クイックメッセージが正常に作成されました。",
      update: "クイックメッセージが正常に更新されました。"
    },
    saveError: "クイックメッセージの保存中にエラーが発生しました。"
  },
  galeria: {
    title: "ギャラリー",
    search: "検索...",
    filterByType: "タイプでフィルター",
    upload: "ファイルをアップロード",
    uploadFiles: "ファイルをアップロード",
    selectFiles: "ファイルを選択",
    selectFilesFirst: "少なくとも1つのファイルを選択してください",
    description: "説明",
    fileName: "ファイル名",
    type: "タイプ",
    size: "サイズ",
    actions: "アクション",
    preview: "プレビュー",
    download: "ダウンロード",
    viewFile: "ファイルを表示",
    delete: "削除",
    deleteConfirm: "ファイル「{fileName}」を本当に削除しますか?",
    deleteSuccess: "ファイルが正常に削除されました!",
    deleteError: "ファイルの削除中にエラーが発生しました",
    uploadSuccess: "ファイルが正常にアップロードされました!",
    uploadError: "ファイルのアップロード中にエラーが発生しました",
    loadError: "ギャラリーの読み込み中にエラーが発生しました",
    imagePreview: "画像プレビュー",
    noFiles: "ファイルが見つかりません",
    loadMore: "さらに読み込む",
    types: {
      image: "画像",
      pdf: "PDF",
      video: "動画",
      audio: "音声",
      document: "ドキュメント",
      archive: "アーカイブ",
      other: "その他"
    }
  },
  instagramComentarios: {
    title: 'Instagramコメント',
    refresh: '更新',
    selectChannel: 'チャンネルを選択',
    mediaList: 'メディアリスト',
    noMedia: 'メディアが見つかりません',
    mediaId: 'メディアID',
    loadMore: 'さらに読み込む',
    comments: 'コメント',
    noComments: 'コメントが見つかりません',
    anonymous: '匿名',
    likes: 'いいね',
    reply: '返信',
    replyToComment: 'コメントに返信',
    commentFrom: 'コメント元',
    replyMessage: '返信メッセージ',
    messageRequired: 'メッセージは必須です',
    cancel: 'キャンセル',
    send: '送信',
    errorLoadingChannels: 'チャンネルの読み込みエラー',
    errorLoadingMedia: 'メディアの読み込みエラー',
    errorLoadingMoreMedia: '追加メディアの読み込みエラー',
    errorLoadingComments: 'コメントの読み込みエラー',
    errorLoadingMoreComments: '追加コメントの読み込みエラー',
    errorSendingReply: '返信の送信エラー',
    replySent: '返信が正常に送信されました！',
    delete: '削除',
    deleteComment: 'コメントを削除',
    deleteConfirmation: 'このコメントを本当に削除しますか？',
    commentDeleted: 'コメントが正常に削除されました！',
    errorDeletingComment: 'コメントの削除エラー'
  },
  notas: {
    title: "注記",
    searchPlaceholder: "位置特定",
    dateFilterPlaceholder: "日付でフィルタリング",
    note: "知らせ",
    user: "ユーザー",
    ticket: "サービス",
    date: "日付",
    actions: "アクション",
    noResults: "メモが見つかりません。",
    deleteConfirmation: "本当にメモ「{note}」を削除しますか?",
    deleteSuccess: "メモは正常に削除されました。",
    saveSuccess: {
      create: "メモが正常に作成されました。",
      update: "メモが正常に更新されました。"
    },
    saveError: "メモの保存中にエラーが発生しました。",
    system: "システム"
  },
  modalNotas: {
    titleCreate: "メモを作成",
    titleEdit: "メモを編集",
    noteLabel: "ノート番号",
    ticketLabel: "サービス",
    saveSuccess: "メモは正常に保存されました。",
    saveError: "メモの保存中にエラーが発生しました。"
  },
  modalNotaAtendimento: {
    titleCreate: "メモを作成",
    titleEdit: "メモを編集",
    labelNote: "サービスノート",
    saveSuccess: "メモは正常に保存されました。",
    saveError: "メモの保存中にエラーが発生しました。"
  },
  notificacao: {
    title: "通知",
    add: "通知を追加",
    deleteAll: "すべて削除",
    deleteOne: "通知「{id}」を本当に削除しますか?",
    deleteAllConfirm: "本当にすべての通知を削除しますか?",
    created: "通知が正常に作成されました。",
    updated: "通知が正常に更新されました。",
    deleted: "通知が正常に削除されました。",
    allDeleted: "すべての通知が削除されました。",
    columns: {
      id: "#",
      message: "メッセージ",
      userId: "ユーザーID",
      userName: "ユーザー",
      isRead: "読む",
      createdAt: "日付",
      actions: "アクション"
    },
    isRead: {
      read: "読む",
      unread: "未読"
    }
  },
  modalNotificacao: {
    title: {
      create: "通知を作成",
      edit: "編集通知"
    },
    fields: {
      message: "通知"
    },
    notifications: {
      created: "通知が正常に作成されました。",
      updated: "通知が正常に編集されました。",
      error: "通知の作成または編集中にエラーが発生しました。"
    }
  },
  pagamentoTenants: {
    title: "テナントの支払い",
    loading: "テナントの支払い情報を読み込んでいます。お待ちください...",
    tenantId: "テナントID",
    paymentInfo: "支払い情報",
    columns: {
      id: "支払いID",
      status: "状態",
      dueDate: "成熟",
      bankSlipUrl: "支払いリンク"
    },
    status: {
      pending: "保留中",
      overdue: "延滞"
    },
    actions: {
      toggleTable: "データを表示"
    }
  },
  planos: {
    title: "予定",
    columns: {
      id: "ID",
      name: "名前",
      value: "価値",
      connections: "接続",
      users: "ユーザー",
      trial: "トライアル",
      trialPeriod: "期間",
      actions: "アクション"
    },
    buttons: {
      add: "プランを追加",
      tokenAsaas: "ウィングストークン",
      viewToken: "トークンを表示"
    },
    tooltips: {
      showToken: "表示トークン"
    },
    status: {
      enabled: "アクティブ",
      disabled: "非アクティブ"
    },
    messages: {
      deleteConfirmation: "プラン「{id}」を本当に削除しますか?",
      tokenUpdated: "トークンが正常に更新されました。",
      tokenUpdateError: "トークンの更新中にエラーが発生しました。"
    }
  },
  modalPlanos: {
    title: {
      edit: "プランを編集",
      create: "プランを作成"
    },
    labels: {
      name: "プラン名",
      value: "プランの価値",
      connections: "接続",
      users: "ユーザー",
      trial: "トライアル",
      trialPeriod: "試用期間（日数）"
    },
    warnings: {
      trial: "注意：試用を有効にすると、試用期間の終了後に当社のデータがシステムから削除されます。"
    },
    buttons: {
      cancel: "キャンセル",
      save: "保存"
    },
    notifications: {
      created: "プランが正常に作成されました。",
      updated: "プランが正常に更新されました。"
    }
  },
  protocolos: {
    ticketNotFound: "サービスが見つかりません",
    title: "プロトコル",
    columns: {
      id: "#",
      protocol: "プロトコル",
      userId: "ユーザー",
      ticketId: "サービス",
      createdAt: "日付",
      actions: "アクション"
    },
    filter: {
      search: "位置特定",
      date: "日付でフィルタリング"
    },
    notifications: {
      deleted: "プロトコルが削除されました!",
      error: "さらにプロトコルを読み込む際にエラーが発生しました。"
    },
    confirm: {
      delete: "プロトコル「{protocol}」を本当に削除しますか?"
    },
    buttons: {
      edit: "編集",
      delete: "消去"
    }
  },
  modalProtocolo: {
    title: {
      create: "プロトコルを作成する",
      edit: "プロトコルを編集する"
    },
    fields: {
      protocol: "プロトコル番号",
      ticketId: "サービス"
    },
    notifications: {
      created: "プロトコルが正常に作成されました。",
      updated: "プロトコルが正常に編集されました。",
      error: "プロトコルの保存中にエラーが発生しました。"
    }
  },
  tasks: {
    title: "タスク",
    table: {
      headers: {
        id: "ID",
        status: "状態",
        name: "タスク",
        description: "説明",
        limitDate: "締め切り",
        owner: "責任者",
        priority: "優先度",
        comments: "コメント",
        actions: "アクション"
      },
      status: {
        delayed: "🚩 遅い",
        pending: "🔄 保留中",
        finished: "✅ 完了"
      },
      priority: {
        high: "⚡⚡⚡ 高い",
        medium: "⚡⚡ 平均",
        low: "⚡ダウンロード",
        none: "😉 なし"
      }
    },
    labels: {
      dateFormat: "{日}-{月}-{年}"
    },
    filters: {
      search: "タスクを検索する",
      status: "状態",
      owner: "責任者",
      limitDate: "締め切り",
      noResults: "タスクが見つかりません。"
    },
    modal: {
      createTask: "タスクを作成",
      editTask: "タスクを編集",
      name: "名前",
      description: "説明",
      limitDate: "締め切り",
      responsible: "責任者",
      recurrence: "再発",
      recurrenceTimes: "繰り返し回数",
      status: "状態",
      priority: "優先度",
      comments: "コメント",
      recurrenceOptions: {
        none: "再発なし",
        sevenDays: "7日間",
        thirtyDays: "30日間",
        fortyFiveDays: "45日間",
        sixtyDays: "60日間",
        seventyFiveDays: "75日間",
        ninetyDays: "90日間"
      },
      statusOptions: {
        delayed: "🚩 遅い",
        pending: "🔄 保留中",
        finished: "✅ 完了"
      },
      priorityOptions: {
        high: "⚡⚡⚡ 高い",
        medium: "⚡⚡ 平均",
        low: "⚡ダウンロード",
        none: "😉 なし"
      },
      validation: {
        required: "フィールド{field}は必須です"
      },
      notifications: {
        userLoadError: "ユーザーの読み込み中に問題が発生しました。",
        created: "タスクが正常に作成されました。",
        edited: "タスクが正常に編集されました。",
        error: "タスクの処理中にエラーが発生しました。"
      }
    },
    notifications: {
      finishSuccess: "タスクは正常に完了しました。",
      duplicateSuccess: "タスクが正常に複製されました。",
      checkDelayedError: "期限切れのタスクのチェック中にエラーが発生しました。",
      deleteConfirm: "本当にタスク「{name}」を削除しますか?",
      deleteSuccess: "タスク「{name}」が正常に削除されました。",
      taskCreated: "タスクが正常に作成されました。",
      taskUpdated: "タスクが正常に編集されました。",
      taskDuplicated: "タスクが正常に複製されました。",
      taskCompleted: "タスクは正常に完了しました。",
      taskDeleted: "タスクは正常に削除されました。",
      error: "アクション実行中にエラーが発生しました",
      loadUsersError: "ユーザーの読み込み中に問題が発生しました。",
      loadTasksError: "タスクの一覧表示中にエラーが発生しました。",
      createSuccess: "タスクが正常に作成されました。",
      updateSuccess: "タスクが正常に更新されました。"
    },
    tooltip: {
      conclued: "結論する",
      duplicate: "重複",
      edit: "編集",
      delete: "消去"
    }
  },
  tenantApi: {
    table: {
      title: "テナントAPI",
      columns: {
        id: "ID",
        apiToken: "APIトークン",
        actions: "アクション"
      },
      noData: "テナント API が見つかりません。"
    },
    form: {
      create: "テナントAPIの作成",
      edit: "テナント編集 API"
    },
    modal: {
      confirmDelete: "テナント API「{id}」を削除してもよろしいですか?",
      notifications: {
        created: "テナント API が正常に作成されました。",
        updated: "テナント API が正常に更新されました。",
        deleted: "テナント API が正常に削除されました。"
      }
    },
    routes: {
      createTitle: "API 経由で新しいテナントを作成/編集するためのルート:",
      activateTitle: "API 経由でテナントをアクティブ化/非アクティブ化するルート:",
      showTitle: "API 経由でテナント情報を表示するルート:",
      endpoint: "終点",
      bearerToken: "トークンベアラー",
      body: "体"
    }
  },
  modalTenantApi: {
    title: {
      create: "APIテナントの作成",
      edit: "テナント編集 API"
    },
    form: {
      apiToken: "APIトークン",
      generateToken: "トークンを生成する"
    },
    notifications: {
      created: "テナント API が正常に作成されました。",
      updated: "テナント API が正常に更新されました。",
      error: "テナント API の保存中にエラーが発生しました。"
    }
  },
  tenant: {
    metrics: {
      actions: "メトリクス",
      title: "メトリクス",
      total: "総観客数",
      pending: "保留中のサービス",
      scheduled: "予約済みの予約",
      open: "予約受付中",
      closed: "予約受付終了",
      contacts: "連絡先",
      tickets: "サービス",
      messages: "メッセージ",
      sent: "送信済みメッセージ",
      received: "受信メッセージ",
      averageRating: "平均評価",
      totalTickets: "総観客数",
      totalContacts: "合計連絡先数",
      totalMessages: "合計メッセージ数"
    },
    title: "企業",
    actions: {
      edit: "会社を編集",
      delete: "会社を削除",
      calculateFiles: "会社のファイルサイズを計算する",
      deleteFiles: "会社のファイルを削除する",
      toggleHideUnoficial: "非公式を無効にする"
    },
    columns: {
      id: "#",
      status: "状態",
      name: "名前",
      maxUsers: "ユーザー制限",
      maxConnections: "接続制限",
      hideUnoficial: "非公式を無効にする",
      asaas: "ウィングスアクティブ",
      asaasToken: "ウィングストークン",
      asaasCustomerId: "顧客ID Asaas",
      identity: "身元",
      trial: "テスト",
      trialPeriod: "テスト時間",
      allowedChannels: "許可されたチャンネル",
      createdAt: "日付",
      actions: "アクション"
    },
    modals: {
      asaasToken: {
        title: "Asaasトークンの変更",
        tokenLabel: "ウィングストークン",
        save: "トークンを保存",
        cancel: "キャンセル"
      }
    },
    notifications: {
      tenantDeleted: "テナント {id} が正常に削除されました。",
      tenantUpdated: "テナント {id} が正常に更新されました。",
      filesSize: "ファイルサイズ: {size} MB",
      deleteFiles: "ファイルが正常に削除されました。",
      deleteError: "ファイルの削除中にエラーが発生しました。"
    },
    confirmation: {
      irreversibleAction: "注意: これは取り返しのつかない操作です。",
      deleteTenant: "本当に会社 {id} を削除しますか?",
      deleteFiles: "本当に会社 {id} のすべてのファイルを削除しますか?"
    },
    hideUnoficial: {
      updated: "テナント {id} が正常に更新されました。",
      updateError: "テナント {id} の更新中にエラーが発生しました。"
    },
    asaasToken: {
      updated: "Asaas トークンが正常に更新されました!",
      updateError: "Asaas トークンの更新中にエラーが発生しました。"
    },
    calcular: {
      size: "ファイルサイズ: {size} MB",
      error: "ファイルサイズの計算エラー"
    },
    limpar: {
      title: "注意: これは取り返しのつかない操作です。",
      confirmMessage: "本当に会社 {id} のすべてのファイルを削除しますか?",
      success: "テナント {id} ファイルが正常に削除されました。",
      error: "テナント ファイルのクリーンアップ中にエラーが発生しました。"
    },
    status: {
      active: "アクティブ",
      inactive: "非アクティブ"
    },
    asaas: {
      enabled: "アクティブ",
      disabled: "非アクティブ"
    },
    trial: {
      enabled: "アクティブ",
      disabled: "非アクティブ"
    },
    channels: {
      none: "なし"
    },
    allowedChannels: {
      title: "許可されたチャンネル"
    },
    list: {
      error: "テナントのリストにエラーが発生しました"
    },
    create: {
      success: "テナント {name} が正常に作成されました。"
    },
    delete: {
      protected: "テナント {id} を削除できません。",
      success: "テナント {id} が正常に削除されました。",
      error: "テナントの削除中にエラーが発生しました: {error}"
    }
  },
  provedorGlobal: {
    title: "グローバルプロバイダー",
    allTenants: "すべてのテナント",
    noTenants: "テナントなし",
    filters: {
      providerType: "プロバイダータイプ",
      status: "ステータス"
    },
    status: {
      active: "アクティブ",
      inactive: "非アクティブ"
    },
    columns: {
      id: "#",
      name: "名前",
      providerType: "タイプ",
      host: "ホスト",
      token: "トークン",
      status: "ステータス",
      isGlobal: "グローバル",
      tenants: "テナント",
      actions: "アクション"
    },
    actions: {
      edit: "編集",
      delete: "削除",
      manageTenants: "テナント管理"
    },
    form: {
      name: "名前",
      nameRequired: "名前は必須です",
      providerType: "プロバイダータイプ",
      providerTypeRequired: "プロバイダータイプは必須です",
      host: "ホスト",
      hostRequired: "ホストは必須です",
      hostLocked: "このプロバイダータイプでは、ホストが自動的に設定されます",
      metaAlwaysGlobal: "Metaタイプ（WABA、Instagram、Messenger）は常にグローバルで、特定のテナントを持つことはできません",
      token: "トークン",
      tokenRequired: "トークンは必須です",
      status: "ステータス",
      isGlobal: "すべてのテナントで利用可能",
      description: "説明",
      groqCloudSection: "GroqCloud設定",
      groqCloudEnabled: "GroqCloud有効",
      groqCloudDisabled: "GroqCloud無効",
      groqCloudApiKey: "GroqCloud APIキー",
      groqCloudLanguage: "GroqCloud言語",
      groqCloudModel: "GroqCloudモデル",
      groqCloudAlwaysGlobal: "GroqCloudは常にグローバルで、特定のテナントを持つことはできません"
    },
    modal: {
      createTitle: "グローバルプロバイダーを作成",
      editTitle: "グローバルプロバイダーを編集"
    },
    tenantsModal: {
      title: "テナント管理",
      globalInfo: "この設定はすべてのテナント（グローバル）で利用できます。",
      selectTenant: "テナントを選択",
      add: "テナントを追加",
      addSuccess: "テナントが正常に追加されました！",
      addError: "テナントの追加中にエラーが発生しました",
      removeConfirm: "このテナントを削除してもよろしいですか？",
      removeSuccess: "テナントが正常に削除されました！",
      removeError: "テナントの削除中にエラーが発生しました"
    },
    success: {
      created: "グローバルプロバイダーが正常に作成されました！",
      updated: "グローバルプロバイダーが正常に更新されました！"
    },
    errors: {
      listError: "グローバルプロバイダーのリスト取得中にエラーが発生しました",
      saveError: "グローバルプロバイダーの保存中にエラーが発生しました",
      metaTypeAlreadyExists: "タイプ {type} のグローバルプロバイダーが既に存在します。各Metaタイプのプロバイダーは1つだけ許可されています。"
    },
    delete: {
      confirm: "グローバルプロバイダー {name} を削除してもよろしいですか？",
      success: "グローバルプロバイダーが正常に削除されました！",
      error: "グローバルプロバイダーの削除中にエラーが発生しました"
    }
  },
  modalTenant: {
    visibleMenu: {
      title: "表示されるメニュー",
      grupos: "グループ",
      disparoMassa: "銃乱射事件",
      kanban: "カンバンとファネル",
      tarefas: "タスク",
      api: "API",
      chatbot: "チャットボット",
      relatorios: "レポート",
      campanhas: "キャンペーン",
      chat: "チャット",
      equipes: "チーム"
    },
    title: {
      create: "テナントの作成",
      edit: "テナントの編集"
    },
    fields: {
      status: "状態",
      name: "名前",
      maxUsers: "ユーザー制限",
      maxConnections: "接続制限",
      identity: "身元",
      asaasToken: "ウィングストークン",
      asaasCustomerId: "顧客ID Asaas",
      trialPeriod: "試用期間"
    },
    trial: {
      title: "トライアル",
      enabled: "アクティブトライアル",
      disabled: "非アクティブなトライアル",
      warning: "注意：試用を有効にすると、試用期間の終了後に当社のデータがシステムから削除されます。"
    },
    asaas: {
      title: "翼",
      enabled: "ウィングスアクティブ",
      disabled: "翼が非アクティブ"
    },
    allowedChannels: {
      title: "許可されたチャンネル"
    },
    validation: {
      requiredFields: "必須項目をすべて入力し、会社を有効化します。",
      cannotDeactivateMain: "会社 1 を非アクティブ化できません。"
    },
    notifications: {
      created: "テナントが正常に作成されました。",
      updated: "テナントの編集に成功しました。",
      error: "テナントの保存中にエラーが発生しました。"
    }
  },
  tenantsPk: {
    titles: {
      environmentVariables: "環境変数",
      packageJsonData: "JSONパッケージデータ"
    },
    labels: {
      key: "鍵",
      value: "価値"
    },
    errors: {
      loadEnvData: "環境変数データの読み込みエラー",
      loadPackageData: "パッケージ JSON データの読み込み中にエラーが発生しました"
    }
  },
  appWaba: {
    title: 'App WABA設定',
    tenant: 'テナント',
    appId: 'アプリID',
    apiVersion: 'APIバージョン',
    description: '説明',
    token: 'トークン',
    tokenHint: 'WABAチャネルを作成するためのBusiness Managerトークン',
    configId: '設定ID（埋め込み登録）',
    configIdHint: 'WhatsApp Businessの埋め込み登録の設定ID',
    appSecret: 'App Secret',
    appSecretHint: 'OAuthコード交換用のFacebook App Secret',
    redirectUri: 'Redirect URI',
    redirectUriHint: 'OAuthリダイレクトURI（Facebook App Dashboardで設定したものと完全に同じである必要があります）',
    status: 'ステータス',
    isActive: 'アクティブ',
    active: 'アクティブ',
    inactive: '非アクティブ',
    create: '設定を作成',
    edit: '設定を編集',
    created: '設定が正常に作成されました！',
    updated: '設定が正常に更新されました！',
    deleted: '設定が正常に削除されました！',
    deleteConfirm: '設定 #{id} を削除してもよろしいですか？',
    error: '設定の処理中にエラーが発生しました',
    deleteError: '設定の削除中にエラーが発生しました',
    listError: '設定の一覧表示中にエラーが発生しました',
    copyTooltip: 'クリップボードにコピー',
    copySuccess: 'リダイレクトURLをクリップボードにコピーしました！',
    copyError: 'クリップボードにコピーできませんでした。手動でコピーしてください！',
    instagramSettings: 'Instagram設定',
    appInstagramId: 'Instagram App ID',
    appInstagramIdHint: 'InstagramアプリケーションID（Instagram App ID）',
    appInstagramSecret: 'Instagram App Secret',
    appInstagramSecretHint: 'OAuthコード交換用のInstagram App Secret',
    redirectUriInstagram: 'Instagram Redirect URI',
    redirectUriInstagramHint: 'Instagram OAuthリダイレクトURI（Instagram App Dashboardで設定したものと完全に同じである必要があります）',
    facebookSettings: 'Facebook設定',
    redirectUriFacebook: 'Facebook Redirect URI',
    redirectUriFacebookHint: 'Facebook OAuthリダイレクトURI（Facebook App Dashboardで設定したものと完全に同じである必要があります）'
  },
  tenantQueue: {
    title: "タスクキュー",
    updateQueues: "更新キュー",
    openBullBoard: "オープンブルボード",
    restartBackend: "バックエンドを再起動",
    restartQueues: "キューをリセット",
    queuesUpdated: "キューは10秒ごとに更新されます",
    refreshQueue: "再処理キュー",
    columns: {
      queueName: "キュー名",
      failedCount: "失敗した仕事",
      activeCount: "アクティブな求人",
      waitingCount: "待機中の仕事",
      actions: "アクション"
    },
    dialogs: {
      restartBackendTitle: "注意！！本当にバックエンドを再起動しますか?",
      restartBackendMessage: "このプロセスによりすべてのサービスが再起動されるため、不整合を修正するためにサーバーにアクセスできる場合にのみ実行する必要があります。",
      restartQueuesTitle: "注意！！本当にキューをリセットしますか?",
      restartQueuesMessage: "BullBoard に多数のジョブが滞留しているキューがある場合にのみ実行します。このプロセスはすべての Bull キューを再起動し、バックエンドを再起動せずに最大 5 回実行する必要があります。この制限を超えたら、バックエンドを再起動して、Redis への余分な接続をクリーンアップします。"
    },
    notifications: {
      bullBoardRedirect: "ユーザー: 管理者<br>パスワード: Redisのパスワードを入力してください<br>3秒後にリダイレクトされます"
    }
  },
  terminal: {
    title: "ターミナル",
    placeholder: "ここにコマンドを入力してください...",
    sendButton: "送信する",
    noOutput: "出力は受信されませんでした",
    error: "エラー： ",
    userNotAllowed: "ユーザーは端末へのアクセスを許可されていません"
  },
  usuarios: {
    title: "ユーザー",
    placeholder: "位置特定",
    add: "追加するには",
    email: "Eメール",
    queues: "キュー",
    whatsappAllowed: "接続",
    isOnline: "状態",
    profile: "プロフィール",
    actions: "アクション",
    blockWavoip: "Wavoipをブロックする",
    restrictedUser: "制限されたユーザー",
    modals: {
      userManagement: "ユーザーキュー管理",
      whatsappManagement: "ユーザー接続管理",
      deleteConfirmation: "注意！！本当にユーザー「{name}」を削除しますか?"
    },
    notifications: {
      userDeleted: "ユーザー {name} が削除されました。",
      deleteError: "ユーザーを削除できません。",
      error: "追加のユーザーの読み込み中にエラーが発生しました",
      changeStatusInToolbar: "ログインしたユーザーのステータスを変更できません。右上隅にあるプロフィールのオプションを使用します。",
      status1: "ユーザーステータス",
      statusOnline: "オンライン: ユーザーが利用可能",
      statusOffline: "オフライン: ユーザーは利用できません",
      statusReload: "フロントエンドの変更を確認するには、ユーザーはページをリロードする必要があります。"
    },
    profiles: {
      user: "ユーザー",
      super: "スーパーバイザー",
      admin: "管理者",
      superadmin: "スーパー管理者"
    }
  },
  modalFilaUsuario: {
    title: "ユーザーキュー",
    name: "名前",
    email: "Eメール",
    inactive: "（非アクティブ）",
    successMessage: "ユーザーキューが正常に編集されました。"
  },
  modalUsuario: {
    sipConfigInfo: "SIP 構成 (Asterisk、FreeSWITCH、PBX、その他)",
    sipWebRTCInfo: "拡張機能はWebRTCをサポートしている必要があります",
    sipWSSInfo: "拡張機能はWSS（WebSocket Secure）をサポートする必要があります",
    horarioAtendimento: "営業時間",
    configSip: "SIP設定",
    sipEnabled: "SIPを有効にする",
    sipUser: "SIPユーザー",
    sipPassword: "SIPパスワード",
    sipServer: "SIPサーバー",
    sipPort: "SIPポート",
    emailAlreadyExists: "登録エラー: ",
    titleEdit: "ユーザーを編集",
    name: "名前",
    email: "Eメール",
    password: "パスワード",
    profile: "プロフィール",
    blockWavoip: "Wavoipをブロックする",
    visibleMenu: "表示されるメニュー",
    massa: "大量郵送",
    grupo: "グループ",
    chatprivado: "プライベートチャット",
    kanban: "カンバンとファネル",
    tarefas: "タスク",
    sessoes: "チャンネル",
    relatorios: "レポート",
    filas: "キュー",
    equipes: "チーム",
    mensagensrapidas: "クイックメッセージ",
    chatflow: "チャットボット",
    agendamentos: "予約",
    aniversarios: "誕生日",
    fechamento: "終わりに",
    etiquetas: "タグ",
    notas: "注記",
    protocolos: "プロトコル",
    avaliacoes: "レビュー",
    campanhas: "キャンペーン",
    blockWavoipHint: "Wavoipで変更を適用する場合は、ブラウザのキャッシュをクリアする必要があります（Ctrl+Shift+R）",
    restrictedUser: "制限されたユーザー",
    restrictedUserDisabled: "無効",
    restrictedUserEnabled: "有効",
    restrictedUserInfo: "有効にしたときに適用される制限:",
    restrictedUserRestriction1: "「連絡先」メニューが非表示になります",
    restrictedUserRestriction2: "「アドホック会話を開始」ボタンが非表示になります",
    restrictedUserRestriction3: "サポートページで連絡先データが読み込まれません",
    restrictedUserRestriction4: "連絡先名は最初の5文字のみ表示されます",
    restrictedUserRestriction5: "連絡先の詳細フィールド（電話、メール、CPFなど）が非表示になります",
    restrictedUserRestriction6: "連絡先編集ボタンが非表示になります",
    restrictedUserRestriction7: "電話オプションが無効になります",
    restrictedUserRestriction8: "プロフィール画像にぼかし効果（blur）が適用されます",
    restrictedUserRestriction9: "メッセージの「転送」および「転送用にマーク」オプションがブロックされます",
    successEdit: "ユーザーが編集しました!",
    successCreate: "ユーザーが作成しました!",
    errorLimit: "ユーザー制限に達しました。",
    errorValidation: "おっと！エラーを確認してください...",
    tryAgain: "もう一度お試しください"
  },
  modalWhatsappUsuario: {
    title: "ユーザー接続（ベータ版）",
    name: "名前",
    email: "Eメール",
    successMessage: "ユーザー接続が正常に編集されました。"
  },
  usuariosTenants: {
    title: "ユーザー",
    tenant: "テナント",
    id: "ID",
    name: "名前",
    email: "Eメール",
    profile: "プロフィール",
    actions: "アクション",
    filterPlaceholder: "位置特定",
    deleteConfirmation: {
      title: "注意！！本当にユーザー「{name}」を削除しますか?",
      successMessage: "ユーザー {name} が正常に削除されました。",
      errorMessage: "ユーザーを削除できません"
    }
  },
  modalUsuariosTenants: {
    title: "ユーザーを編集",
    tenantLabel: "テナント",
    nameLabel: "名前",
    emailLabel: "Eメール",
    passwordLabel: "パスワード",
    profileLabel: "プロフィール",
    saveSuccess: "ユーザーが編集しました!",
    createSuccess: "ユーザーが作成しました!",
    validationError: "おっと！エラーを確認してください...",
    userLimitError: "ユーザー制限に達しました。",
    warning: "変更を適用するときは、ブラウザのキャッシュをクリアしてください (Ctrl+Shift+R)。",
    tryAgain: "もう一度お試しください"
  },
  wavoip: {
    title: "リンク一覧",
    subTitle: "Wavoipアカウントのメールアドレスとパスワードを入力してください",
    emailLabel: "Eメール",
    passwordLabel: "パスワード",
    authorizeButton: "接続のリスト表示を許可する",
    callsTitle: "リンク",
    logsDownloaded: "ログが正常にダウンロードされました。",
    confirmClear: "本当にログをクリアしますか?",
    confirmClearMessage: "この操作は元に戻せません。",
    logsCleared: "ログが正常にクリーンアップされました。",
    downloadLogs: "ログをダウンロード",
    clearLogs: "ログをクリアする",
    logsTitle: "ログ",
    logsSubtitle: "Wavoip 接続ログ",
    eventSummary: "イベント概要",
    connectEvents: "接続イベント",
    incomingEvents: "エントリーイベント",
    outgoingEvents: "出口イベント",
    errorEvents: "エラーイベント",
    offer: "提供",
    terminate: "閉鎖",
    devicesTitle: "デバイス",
    resetLogin: "Wavoipログインをリセットする",
    action: "アクション",
    error: "メッセージの認証または一覧表示中にエラーが発生しました",
    columns: {
      id: "ID",
      caller: "番号",
      receiver: "行き先",
      direction: "方向",
      duration: "間隔",
      createdDate: "日付",
      status: "状態",
      link: "アクション"
    },
    columnsDevices: {
      id: "ID",
      idUser: "ユーザーID",
      name: "名前",
      phone: "番号",
      token: "トークン",
      status: "状態"
    },
    direction: {
      outcoming: "実施した",
      incoming: "受け取った"
    },
    status: {
      ended: "閉鎖",
      rejected: "拒否"
    },
    resetMessage: "Wavoip ログインをリセットしています...",
    tokensModal: {
      title: "Wavoip トークン - {name}",
      importantInfo: "重要な情報:",
      baileysInfo: "Baileys 接続の場合、システムは既存のセッションを自動的に再利用します。",
      otherApiInfo: "{type} 接続の場合、2 つの QR コードを読み取る必要があります:",
      systemQrCode: "システム QR コード (チャネル接続時に生成)",
      wavoipQrCode: "Wavoip QR コード (切断時にこのモーダルで利用可能)",
      note: "<strong>注:</strong> このモーダルで利用可能な QR コードは <strong>Wavoip</strong> QR コードです。",
      tokenLabel: "トークン {index}",
      disconnected: "切断",
      disconnectedMessage: "トークンが接続されていません。下のボタンをクリックして <strong>Wavoip QR コード</strong>を表示してください。",
      rememberSystemQr: "<strong>注意:</strong> この接続にはシステム QR コードも読み取る必要があります。",
      openQrCodeButton: "Wavoip QR コードを開く",
      connected: "接続済み",
      connectedMessage: "トークンは接続されており、正常に動作しています。",
      checkStatusMessage: "\"ステータスを更新\"をクリックして、このトークンのステータスを確認してください。",
      updateStatus: "ステータスを更新",
      close: "閉じる",
      viewTokensTooltip: "Wavoip トークンを表示"
    }
  },
  error404: {
    title: "404",
    subtitle: "おっと…何もない…",
    button: "戻る"
  },
  login: {
    welcome: "ログインしてください",
    emailLabel: "メール",
    passwordLabel: "パスワード",
    emailPlaceholder: "my＠email.com",
    emailError: "有効なメールアドレスである必要があります。",
    validateCaptcha: "ログインを解除するには、スライダーを端までドラッグします。",
    loginButton: "入場するには",
    loginLoading: "入力中...",
    forgotPassword: "パスワードを忘れました",
    integrateWith: "統合:",
    resetPasswordTitle: "パスワードを回復する",
    resetPasswordLabel: "メールアドレスを入力してください",
    resetPasswordButton: "送信する",
    resetPasswordSuccess: "パスワード回復メールを送信しました。",
    resetPasswordError: "パスワード回復メールの送信中にエラーが発生しました。",
    captchaValidationMessage: "CAPTCHA が正常に検証されました。",
    captchaErrorMessage: "続行する前に CAPTCHA を検証してください。",
    errorMessage: "ユーザー名とパスワードを正しく入力してください。",
    validateEmailError: "有効なメールアドレスを入力してください。",
    a2fCodeSent: "二要素認証コードが送信されました",
    outOfServiceHours: "営業時間外",
    invalidTenant: "無効なテナント",
    limitError: "制限エラー",
    licenseErrorUser: "ユーザーライセンスエラー",
    licenseDomainError: "ライセンスドメインエラー",
    licenseErrorServer: "サーバーライセンスエラー"
  },
  validateA2F: {
    title: "2FAコード検証",
    message: "認証コードが{channel}に送信されました。",
    codeLabel: "認証コード",
    codePlaceholder: "6桁のコードを入力してください",
    validateButton: "コードを検証",
    validating: "検証中...",
    resendCode: "コードを再送信",
    invalidCode: "有効な6桁のコードを入力してください",
    loginError: "ログインの完了中にエラーが発生しました",
    validationError: "コードの検証中にエラーが発生しました",
    invalidCodeError: "無効な認証コード",
    expiredCodeError: "認証コードの有効期限が切れました。再度ログインしてください。",
    invalidSessionError: "無効または期限切れのセッション。ログインにリダイレクトしています...",
    redirectingToLogin: "ログインにリダイレクトしています...",
    codeResent: "コードが正常に再送信されました",
    resendError: "コードの再送信中にエラーが発生しました",
    timeRemaining: "残り時間: {time}",
    codeExpired: "コードの有効期限が切れました。ログインにリダイレクトしています...",
    resendCooldown: "再送信するまで{seconds}秒待ってください",
    resendLimitError: "コードを再送信する前に1分待ってください"
  },
  configuracoesA2F: {
    enableA2F: "二要素認証を有効にする",
    enableA2FCaption: "アクセスセキュリティを向上させるために二要素認証を有効にします",
    channelLabel: "送信チャネル",
    whatsappLabel: "WhatsApp接続",
    wabaTemplateLabel: "WABAテンプレート (AUTHENTICATION)",
    messageLabel: "カスタムメッセージ",
    messageHint: "{code}を使用してコードを自動的に挿入します",
    infoText: "ユーザーがログインすると、コードが{channel}経由で送信されます。ユーザーが登録された電話番号（WhatsApp用）または有効なメール（メール用）を持っていることを確認してください。",
    templateListError: "WABAテンプレートの読み込みエラー",
    wabaMessageWarning: "WABAを使用する場合、テンプレートのテキストが使用されます。カスタムメッセージは適用されません。",
    emailSmtpConfigured: "設定 > SMTPで定義されたSMTP設定が使用されます。",
    emailSmtpNotConfigured: "設定 > SMTPでSMTPを設定して、メールで2FAコードを送信します。",
    smsProviderLabel: "SMSプロバイダー",
    smsInfo: "2FAコードを送信するには、テナント設定で選択したSMSプロバイダーのトークンを設定してください。"
  },
  resetPassword: {
    title: "パスワードをリセットする",
    newPasswordPlaceholder: "新しいパスワード",
    confirmPasswordPlaceholder: "パスワードを認証する",
    resetButtonLabel: "リセット",
    loadingMessage: "再定義...",
    successMessage: "パスワードのリセットに成功しました。",
    errorMismatch: "パスワードが一致しません。",
    errorMessage: "パスワードのリセット中にエラーが発生しました。"
  },
  signup: {
    title: "アカウントを作成してください!",
    namePlaceholder: "名前",
    cpfCnpjPlaceholder: "CPF/CNPJ",
    emailPlaceholder: "Eメール",
    mobilePhonePlaceholder: "携帯電話",
    passwordPlaceholder: "パスワード",
    selectPlanPlaceholder: "プランを選択",
    submitButtonLabel: "アカウントを作成する",
    cancelButtonLabel: "ログイン",
    loadingMessage: "作成...",
    validations: {
      requiredFields: "すべてのフィールドに入力してください。",
      invalidCpfCnpj: "CPF または CNPJ が無効です。",
      invalidEmail: "無効なメールアドレスです。",
      invalidPassword: "パスワードは文字、数字、および 1 つの特殊文字を含む 7 文字以上でなければなりません。",
      successMessage: "クライアントが正常に作成されました。",
      errorMessage: "クライアントの作成中にエラーが発生しました"
    },
    planLabel: "値: $ {value} - 接続: {connections} - ユーザー: {users}"
  },
  atendimentoChat: {
    selectTicket: "チケットを選択してください!",
    noResults: "結果なし :(",
    noMore: "ロードするものはもうありません:)",
    forwardMessage: "転送メッセージ",
    forwardHint: "連絡先を検索するには、少なくとも 2 文字を入力してください。",
    forwardLimit: "選択できる連絡先は 1 つだけです。",
    messageSent: "メッセージは正常に送信されました。",
    messageFailed: "メッセージを送信できません。もう一度お試しください。",
    forwardMessages: "転送するメッセージ 10 件のうち {count} 件を選択しました。",
    contactNotSelected: "メッセージの送信先の連絡先を選択します。",
    forwardToPrivateChat: "プライベートチャットに転送",
    forwardToOtherChannel: "他のチャネルに転送",
    selectPrivateChatUser: "ユーザーを選択",
    selectPrivateChatUserHint: "ユーザーを検索するには入力してください",
    userNotSelected: "ユーザーを選択",
    messageNotSelected: "メッセージが見つかりません",
    messageSentToPrivateChat: "{name} にメッセージを転送しました",
    forwardToOtherChannel: "他のチャネルに転送",
    selectDestinationChannel: "宛先チャネルを選択",
    selectDestinationChannelHint: "メッセージを転送するチャネルを選択してください",
    channelNotSelected: "チャネルを選択してください",
    channelNotFound: "チャネルが見つかりません",
    messageSentToOtherChannel: "{name} にチャネル {channel} でメッセージを転送しました"
  },
  atendimentoChatdialogAgendamentoMensagem: {
    title: "メッセージのスケジュール設定",
    close: "閉じる"
  },
  atendimentoVcard: {
    contactTitle: "連絡先: {名前}",
    selectChannelMessage: "サービスを開始するチャネルを選択します。",
    startButton: "始める",
    attentionTitle: "注意",
    ongoingTicketMessage: "{name} には進行中のサービスがあります (サービス: {ticketId} - キュー: {queueId})。サービスを開きますか?",
    adminOnlyMessage: "{name} ではサービスが継続中です。このサービスを割り当てることができるのは管理者のみです。",
    ongoingTicketError: "トークンを更新できません",
    notifyTicketStarted: "サービス開始 - {name} - チケット: {ticketId}"
  },
  atendimentoModalSMS: {
    title: "SMSを送信",
    messageLabel: "SMS",
    selectServiceLabel: "サービスを選択",
    cancel: "キャンセル",
    send: "送信する",
    noServiceSelected: "サービスを選択してください。",
    comteleSuccess: "Comtele: 送信しました!",
    conectaSuccess: "ConectaStartup: 送信しました!",
    livsonSuccess: "BHI: 送信しました!",
    errorSending: "SMS 送信エラー: {error}"
  },
  atendimentoModalNovoTicket: {
    title: "チケットを作成",
    contactPlaceholder: "連絡先を探す",
    contactHint: "連絡先を検索するには、少なくとも 2 文字を入力してください。",
    addContact: "連絡先を追加",
    start: "始める",
    selectDestination: "目的地を選択:",
    queueDestination: "宛先キュー",
    userDestination: "対象ユーザー",
    ticketTransferred: "チケットが譲渡されました。",
    errorLoadingQueues: "キューの読み込み中に問題が発生しました",
    errorLoadingUsers: "ユーザーの読み込み中に問題が発生しました",
    existingTicketMessage: "{name} には実行中のサービスがあります (サービス: {id} - キュー: {queue})。サービスを開きますか?",
    noQueue: "待ち行列なし",
    adminOnlyMessage: "{name} ではサービスが継続中です。このサービスを割り当てることができるのは管理者のみです。",
    confirmStart: "連絡先: {name}。サービスを開始するチャネルを選択します。",
    contactCreated: "連絡先が作成されました!"
  },
  atendimentoMixinSockets: {
    tokenInvalid: "無効なトークンです。ログインページにリダイレクトしています。",
    privateMessage: {
      update: "新しいプライベートメッセージを受信しました。",
      unread: "未読のプライベートメッセージを受信しました。",
      notification: "新しいプライベートメッセージの通知。"
    },
    onlineUsers: "ユーザーをオンラインで確認しています。",
    userOnline: "ユーザーがオンラインになりました。",
    updateStatusUser: "ユーザーのステータスを更新しています。",
    newClient: "新しいクライアントが接続されました。",
    pendingCliente: "新規クライアント保留中",
    client: "お客様： "
  },
  atendimentomixinCommon: {
    note: "📝注意:",
    transfer: "⏩ 転送: ",
    audio: "🔊オーディオ: ",
    buttonNotAvailable: "このボタンはモバイルでのみクリック可能です",
    dateFormat: "日/月/年"
  },
  atendimentoMixinAtualizar: {
    label: "このサービスを評価する",
    rating: {
      0: "悪い",
      1: "通常",
      2: "良い",
      3: "とても良い",
      4: "素晴らしい",
      5: "信じられない"
    },
    notifications: {
      selecioneUmMotivo: "サービスを終了する理由を選択してください。",
      demandaSalva: "要求が正常に保存されました。これでサービスを終了できます。",
      erroSalvarDemanda: "需要を保存できません。",
      erroCarregarMotivos: "理由を読み込めません。",
      forcarDemanda: "サービスを終了するには、需要を定義します。",
      iniciarAtendimento: "サービス開始 - {name} - チケット: {id}",
      espiarAtendimento: "スパイ活動{name} - チケット: {id}",
      avaliacaoEnviada: "評価をサポート {id} に送信しました。お客様が評価を送信した後、サービスは自動的に完了します。",
      avaliacaoErro: "サービス評価を送信できません。",
      ticketEncerrado: "サービスは終了しました！ （チケット{id}）",
      mensagemDespedida: "選択したメッセージが送信され、チケットは 30 秒以内に閉じられます。",
      erroAtualizarStatus: "サービスステータスを更新できません。",
      atendimentoJaIniciado: "この接続のサービスは、開いている/保留中のタブですでに開始されているか、管理者に連絡先オプションで新しいサービスを開くように依頼してください。",
      atendimentoEncerrado: "サービスは終了しました！",
      atendimentoIniciado: "サービス開始しました！",
      retornadoFila: "列に戻ってください！"
    },
    dialogs: {
      iniciar: "サービスを開始します。",
      retornarFila: "キューに戻りますか?",
      encerrar: "サービスを終了しますか?",
      encerrarForcado: "サービスを終了しますか?チケット: {id}",
      mensagemCliente: "顧客 {customer} のチケット #{ticketId} を更新しますか?",
      mensagemCliente2: "このサービスを終了しますか?",
      ticketEncerrar: "サービスを終了しますか?"
    },
    titles: {
      iniciar: "サービスを開始します。",
      retornarFila: "保留中のキューに戻りますか?",
      encerrar: "サービスを終了しますか?",
      encerrarAtendimento: "サービスを終了しますか?",
      encerrarForcado: "サービスを終了しますか?チケット: {id}"
    },
    evaluation: "レビューを送信しました"
  },
  atendimentoMensagemRespondida: {
    labels: {
      mensagemApagada: "メッセージは{date}に削除されました。",
      baixarContato: "ダウンロード お問い合わせ",
      baixarArquivo: "ダウンロード: {filename}",
      visualizarPDF: "ビュー",
      audioInacessivel: "音声は利用できません",
      grupoNome: "グループ: {GroupName}",
      contatoNome: "連絡先: {contactName}"
    },
    errors: {
      erroMensagem: "メッセージの処理中にエラーが発生しました。",
      erroAudio: "オーディオの読み込み中にエラーが発生しました。",
      erroDownload: "ファイルのダウンロード中にエラーが発生しました。"
    }
  },
  atendimentoMensagemChat: {
    noName: "名前なし",
    system: "システム",
    labels: {
      atencao: "注意！！このメッセージを再送信してもよろしいですか?",
      processoReenvio: "このプロセスは、システム内の保留中のメッセージを再送信しようとします。",
      processoIniciado: "プロセスが開始されました。",
      tentandoEnvio: "保留中のメッセージを送信しようとしています。",
      erroEnvio: "メッセージの送信中にエラーが発生しました: {error}",
      deletarAtencao: "注意！！本当にメッセージを削除しますか?",
      deletarAviso: "古いメッセージはクライアントから削除されません。",
      deletarErro: "メッセージを削除できません。",
      mensagemSincronizada: "同期メッセージ: {timingSync}",
      mensagemEditada: "編集済み: {contentMessage}",
      mensagemApagada: "メッセージは{date}に削除されました。",
      downloadContato: "ダウンロード お問い合わせ",
      baixarArquivo: "ダウンロード: {filename}",
      mensagemNaoEntregue: "メッセージは配信されませんでした",
      mensagemAgendada: "スケジュールされたメッセージ",
      enviadoCancelado: "提出がキャンセルされました: {date}",
      criadoEm: "作成日: {date}",
      programadoPara: "予定日: {date}",
      facaDownload: "ファイルをダウンロードする",
      editarMensagem: "メッセージを編集"
    },
    errors: {
      erroAudio: "オーディオの読み込み中にエラーが発生しました。",
      erroMensagem: "メッセージの処理中にエラーが発生しました。",
      erroDownload: "ファイルのダウンロード中にエラーが発生しました。",
      maximoMensagens: "最大 10 件のメッセージが許可されます。"
    },
    dialogs: {
      reenviarTitulo: "メッセージを再送信",
      reenviarMensagem: "この保留中のメッセージを再送信しますか?",
      deletarTitulo: "メッセージを削除",
      deletarMensagem: "このメッセージを本当に削除しますか?古いメッセージはクライアントから削除されません。"
    },
    notifications:{
      tentandoEnviarMensagens: "保留中のメッセージを送信しようとしています。",
    }
  },
  atendimentoItemTicketPainel: {
    labels: {
      atender: "会うために",
      espirar: "スパイ",
      usuario: "ユーザー: {ユーザー名}",
      canalRemovido: "チャンネルを削除しました",
      atendimentoResolvido: "サービス解決",
      chatbotAtendendo: "チャットボットサービス",
      integracaoExterna: "外部統合",
      fila: "キュー: {queuename}",
      etiquetas: "タグ: {tags}",
      carteiras: "ウォレット: {wallets}",
      espiarAtendimento: "サービスを表示: {idTicket}"
    },
    status: {
      aberto: "開ける",
      pendente: "保留中",
      resolvido: "解決済み"
    },
    errors: {
      erroInformacoes: "{typeInformation} の取得中にエラーが発生しました: {error}"
    }
  },
  atendimentoItemTicket: {
    labels: {
      atender: "会うために",
      atendimentoResolvido: "サービス解決",
      chatbotAtendendo: "チャットボットサービス",
      integracaoExterna: "外部統合",
      forcarFechamento: "強制終了（お別れ・評価・要求なし）",
      espiarAtendimento: "スパイサービス: {id}",
      usuario: "ユーザー: {ユーザー名}",
      etiquetas: "タグ:",
      kanban: "カンバン: {kanbanName}",
      semFoto: "チャンネルを削除しました",
      espiar: "スパイ",
      fecharTicketSemDespedida: "強制終了（お別れ・評価・要求なし）",
      rascunhoSalvo: "下書きが保存されました"
    },
    status: {
      aberto: "開ける",
      pendente: "保留中",
      resolvido: "解決済み"
    },
    errors: {
      erroInformacoes: "{typeInformation} から情報を取得中にエラーが発生しました: {error}",
      erroRemoverFoto: "ヌル写真の削除中にエラーが発生しました: "
    },
    dialogs: {
      fecharTitulo: "注意",
      fecharMensagem: "チケットを強制的に閉じますか?"
    },
    notifications: {
      aguardeEnvio: "チケットを変更する前に、メッセージが送信されるまでお待ちください"
    }
  },
  inputMensagem: {
    novo: {
      camposObrigatorios: "メッセージを送信する前に、すべての必須フィールドを入力してください。",
      enviarLocalizacao: "位置を送信",
      latitude: "緯度",
      longitude: "経度",
      nomeLocal: "場所の名前",
      enderecoLocal: "場所の住所",
      localizacaoEnviada: "位置が正常に送信されました！",
      erroEnviarLocalizacao: "位置送信エラー",
      enviarCTAURL: "CTA URLを送信",
      enviarReplyButtons: "返信ボタンを送信",
      enviarAddress: "住所を送信",
      enviarLocationRequest: "位置情報リクエストを送信",
      enviarFlow: "フローを送信",
      enviarLocation: "位置を送信",
      sendLocation: "位置を送信",
      tipoDeHeader: "ヘッダーの種類",
      texto: "テキスト",
      imagem: "画像",
      video: "ビデオ",
      documento: "ドキュメント",
      textoDoHeader: "ヘッダーテキスト",
      urlDoHeader: "ヘッダーURL",
      mensagem: "メッセージ",
      digiteSuaMensagem: "メッセージを入力してください",
      textoDoBotao: "ボタンのテキスト",
      exemploTextoDoBotao: "例: 商品を見る",
      urlDoBotao: "ボタンURL",
      exemploUrlDoBotao: "https://exemplo.com",
      footeropt: "フッター (オプション)",
      textoDoFooter: "フッターテキスト",
      flowIdopt: "フローID (オプション)",
      idDoFlow: "フローID",
      flowNameopt: "フロー名 (オプション)",
      nomeDoFlow: "フロー名",
      flowCtaopt: "フローCTA *",
      textoDoCta: "CTAテキスト",
      flowTokenopt: "フロートークン (オプション)",
      tokenDoFlow: "フロートークン",
      flowAction: "フローアクション",
      navegar: "ナビゲート",
      trocaDeDados: "データ交換",
      flowActionPayloadopt: "フローアクションペイロード (オプション)",
      tituloDoBotao: "ボタンのタイトル",
      rua1opt: "住所1 *",
      enderecoPrincipal: "主な住所",
      rua2opt: "住所2 (オプション)",
      complemento: "補足",
      cidadeopt: "市区町村 *",
      nomeDaCidade: "市区町村名",
      estadoopt: "都道府県 *",
      nomeDoEstado: "都道府県名",
      cepopt: "郵便番号 *",
      cep: "00000-000",
      paisopt: "国 *",
      nomeDoPais: "国名",
      tipoDeEndereco: "住所の種類",
      casa: "自宅",
      trabalho: "職場",
      latitudeopt: "緯度 *",
      longitudeopt: "経度 *",
      nomeDaLocalizacaoopt: "位置の名前 (オプション)",
      exemploNomeDaLocalizacao: "例: ショッピングセンター",
      enderecoopt: "住所 (オプション)",
      enderecoCompleto: "完全な住所",
      enderecoEnviado: "住所が正常に送信されました！",
      localizacaoEnviada: "位置が正常に送信されました！"
    },    
    labels: {
      mensagem: "メッセージ",
      codigoPais: "国コード",
      numeroTelefone: "電話番号",
      campoVazio: "テンプレートを送信する前に、すべての変数フィールドを入力してください。",
      vcardEnviado: "連絡先が正常に送信されました！",
      telefoneContato: "電話番号",
      nomeContato: "名前",
      enviarContato: "連絡先を送信",
      nothingHere: "注意...ここには何もありません!",
      nothingHereDescription: "表示するクイックメッセージや添付ファイルはありません。",
      erroAnexar: "ファイルの添付エラー",
      anexoEnviado: "添付ファイルは正常に送信されました。",
      selecioneArquivo: "ファイルを選択",
      preview: "プレビュー",
      anexarArquivo: "ファイルを添付",
      caption: "キャプション",
      emoji: "絵文字",
      templates: "テンプレート",
      digiteMensagem: "ここに入力してください...",
      enviarArquivo: "複数のファイルを送信",
      enviarArquivoCaption: "キャプション付きファイルを送信",
      enviarArquivoGaleria: "ギャラリーからファイルを送信",
      selecionarArquivoGaleria: "ギャラリーからファイルを選択",
      arquivoSelecionado: "選択されたファイル",
      enviarFigurinha: "ステッカーを送る",
      enviarEmoji: "絵文字",
      enviarMensagem: "メッセージを送信",
      enviarAudio: "音声を送信",
      enviarLinkVideo: "ビデオ会議リンクを送信",
      enviarMarcacaoFantasma: "ゴーストマークアップを送信",
      enviarMarcacao: "予約を送信",
      enviarBotoes: "送信ボタン",
      enviarListas: "リストを送信",
      enviarAgenteHumano: "人間エージェントで送信",
      descricaoAgenteHumano: "このメッセージはHUMAN_AGENTタグで送信され、24時間ウィンドウ外（7日以内）でもメッセージを送信できます。",
      mensagemObrigatoria: "メッセージは必須です",
      mensagemEnviada: "メッセージが正常に送信されました！",
      enviarTemplate: "テンプレート",
      removerMidiaMensagemRapida: "クイックメッセージからメディアを削除する",
      cancelarGravacao: "録音をキャンセル",
      enviarGravacao: "録音を送信",
      gravacaoIniciada: "録音開始",
      gravacaoParada: "録画を停止しました",
      mensagemRapida: "クイックメッセージ",
      mensagemMarcacao: "マークアップメッセージ",
      mensagemMarcacaoFantasma: "ゴーストマーキングメッセージ",
      videoGravacao: "ビデオ録画",
      arquivo: "ファイル： ",
      voz: "声： ",
      semMidia: "メディアなし",
      sim: "はい",
      nao: "いいえ",
      dataHoraAgenda: "予約日時",
      desativarAssinatura: "サブスクリプションを無効にする",
      ativarAssinatura: "サブスクリプションを有効にする",
      selecioneParticipantes: "参加者を選択",
      botao: "ボタン",
      botao1: "ボタン1",
      botao2: "ボタン2",
      botao3: "ボタン3",
      header: "ヘッダ",
      title: "タイトル",
      footer: "ベースボード",
      title1: "列1のタイトル",
      title2: "列2のタイトル",
      title3: "列3のタイトル",
      title4: "列4のタイトル",
      title5: "列5のタイトル",
      description1: "説明列1",
      description2: "説明列2",
      description3: "説明列3",
      description4: "説明列4",
      description5: "説明列5",
      templateChoose: "テンプレートを選択",
      selectTemplateMessenger: "送信するテンプレートを選択",
      templateCategory: "テンプレートカテゴリ",
      marketing: "マーケティング",
      utility: "ユーティリティ",
      templateName: "テンプレート名",
      enterTemplateName: "ユーティリティテンプレート名を入力",
      utilityTemplateInfo: "ユーティリティテンプレートは、ユーザーの最後のメッセージから24時間以内に送信されます。",
      selectMarketingTemplate: "送信するマーケティングテンプレートを選択",
      noTitle: "タイトルなし",
      status: "状態",
      token: "トークン",
      nextSend: "次の送信",
      whatsappNotFound: "WhatsAppチャネルが見つかりません",
      errorLoadingTemplates: "テンプレートの読み込みエラー",
      selectTemplate: "テンプレートを選択",
      pageIdNotFound: "ページIDが見つかりません",
      tokenNotFound: "通知トークンが見つかりません",
      templateSent: "テンプレートが正常に送信されました",
      errorSendingTemplate: "テンプレートの送信エラー",
      startRecord: "録画を開始",
      stopRecord: "録画を停止",
      sendRecord: "録音を送信",
      manipularGrupo: "グループ管理",
      grupoSelecionado: "選択されたグループ",
    },
    grupo: {
      alterarTitulo: "タイトルを変更",
      alterarDescricao: "説明を変更",
      alterarImagemUrl: "画像を変更（URL）",
      alterarImagemUpload: "画像を変更（アップロード）",
      alterarPermissao: "権限を変更",
      promoverAdmin: "管理者に昇格",
      demoverAdmin: "管理者から降格",
      adicionarParticipante: "参加者を追加",
      removerParticipante: "参加者を削除",
      listarParticipantes: "参加者を一覧表示",
      gerenciarUsuarios: "ユーザーを管理",
      participantes: "参加者",
      novoTitulo: "新しいタイトル",
      novaDescricao: "新しい説明",
      novaImagemUrl: "新しい画像URL",
      novaImagemArquivo: "新しい画像（ファイル）",
      adminOnly: "管理者のみ",
      numerosParticipantes: "参加者番号",
      executar: "アクションを実行"
    },
    dialogs: {
      confirmarEnvio: "送信確認: 入力",
      cancelarEnvio: "キャンセル: ESC"
    },
    errors: {
      arquivoRejeitado: "サイズまたはタイプが互換性がないため、ファイルは拒否されました。",
      gravacaoErro: "ビデオまたはオーディオの録画中にエラーが発生しました。"
    },
    error: {
      vcardErro: "VCardの送信中にエラーが発生しました！",
      erroEnviarVcard: "VCardの送信中にエラーが発生しました！",
    },
    success: {
      vcardEnviado: "VCardが正常に送信されました！",
    },
    wabaErrors: {
      title: "WABAのファイル(複数)の検証エラー",
      invalidFileType: "WABAでサポートされていないファイルタイプ: {fileName}",
      invalidFileTypeWithExtensions: "WABAでサポートされていないファイルタイプ: {fileName}。許可されている拡張子: {extensions}",
      fileSizeExceeded: "ファイル {fileName} が許可されている最大サイズを超えています",
      fileSizeExceededDetail: "{fileName} が許可されている最大サイズ ({maxSize} MB) を超えています。ファイル: {fileSize} MB"
    }      
  },
  atendimentoInputScript: {
    pendingMessageSended: "しばらくお待ちください...メッセージを送信しています",
    micPermissionDenied: "マイクの許可が拒否されました",
    scheduleError: "メッセージをスケジュールするには、「スケジュールの日付/時刻」フィールドに入力します。",
    sendMessage: "メッセージを送信",
    scheduleMessage: "スケジュールメッセージ",
    recordAudio: "音声を録音する",
    stopRecording: "録画を停止",
    cancelRecording: "録音をキャンセル",
    startRecording: "録音を開始",
    prepareMedia: "メディアの発送準備",
    invalidFile: "無効なファイルです!",
    fileAcceptedFormats: "受け入れ可能な形式: {formats}",
    sendingMessage: "メッセージを送信しています...",
    errorSendingMessage: "メッセージの送信中にエラーが発生しました",
    invalidMessage: "無効なメッセージ",
    customSchedule: "カスタムスケジュール",
    in30Minutes: "30分で",
    tomorrow: "明日",
    nextWeeks: "来週",
    uploadFile: "ファイルを送信",
    attachFile: "ファイルを添付",
    previewImage: "画像を表示",
    dragFileHere: "ファイルをここにドラッグ",
    selectAll: "すべて選択",
    schedulePlaceholder: "予約日時フィールドを入力してください",
    videoRecordingError: "ビデオ録画の開始中にエラーが発生しました",
    audioRecordingError: "音声録音の開始中にエラーが発生しました",
    filePreviewError: "ファイルプレビューの読み込み中にエラーが発生しました",
    messageScheduled: "メッセージのスケジュール設定に成功しました",
    messageError: "メッセージ処理エラー",
    headerUrl: "ヘッダーURL",
    namedVariable: "変数値",
    templateSuccess: "テンプレートは正常に送信されました",
    templateError: "テンプレートの送信エラー",
    ghostMessageSuccess: "ゴーストタグメッセージが正常に送信されました",
    ghostMessageError: "ゴーストタグメッセージの送信中にエラーが発生しました",
    mentionAllSuccess: "予約メッセージが正常に送信されました",
    mentionAllError: "タグメッセージの送信中にエラーが発生しました",
    previewTitle: "画像を{contactName}に送信します",
    noFilesToSend: "アップロードするファイルがありません",
    emptyMessageError: "存在しないメッセージ",
    multipleQuickMessagesError: "複数のクイックメッセージが見つかりました。 1つ選択するか、メッセージから一意のキーを入力してください",
    noQuickMessageFoundError: "/ は、クイックメッセージを送信したいが、メッセージが見つからなかったことを示します。 / を登録または削除して、メッセージを入力します。",
    dataMessage: "送信されるデータを入力してください",
    messageValidationError: "メッセージの長さは 1 〜 60 文字にする必要があります。",
    buttonValidationError: "ボタンの最大文字数は 20 文字です。",
    duplicateButtonError: "ボタンに重複した値を設定することはできません。",
    missingFieldsError: "送信するデータを入力してください。"
  },
  atendimentoInfoCabecalho: {
    pauseAttendance: "対応を一時停止",
    resumeAttendance: "対応を再開",
    attendancePaused: "対応が正常に一時停止されました",
    attendanceResumed: "対応が正常に再開されました",
    pauseError: "対応の一時停止の制御中にエラーが発生しました",
    menuAction: "メニューアクション",
    contactInfo: "連絡先",
    assignedTo: "帰属先:",
    ticketNumber: "チケット番号:",
    reopenTicket: "チケットを再開する",
    messageScheduling: "メッセージのスケジュール設定",
    returnToQueue: "チケットをキューに戻す",
    resolveTicket: "解決する",
    transfer: "移行",
    chatbot: "チャットボット",
    channel: "チャネル",
    channels: "チャンネル",
    resolve: "解決する",
    reopenCall: "Wavoip通話を再開する",
    scheduleMessage: "スケジュールメッセージ",
    actions: "アクション",
    selectDestination: "目的地を選択:",
    ticket: "チケット",
    destinationQueue: "宛先キュー",
    destinationUser: "対象ユーザー",
    destinationChatbot: "ターゲットチャットボット",
    destinationChannel: "ターゲットチャネル",
    selectDestinationQueue: "宛先キューを選択",
    alreadyAssigned: "チケットは既に選択されたユーザーに属しています。",
    alreadyAssignedToYou: "チケットはすでにそのユーザーに属しています。",
    alreadyInQueueAndUser: "チケットはすでにこのキューとユーザーに属しています。",
    transferredToChatbot: "チケットをチャットボットに転送",
    transferredToChannel: "チケットをチャネルに転送しました",
    transferredToQueue: "チケットが譲渡されました。",
    loadingQueuesError: "キューの読み込み中に問題が発生しました",
    loadingUsersError: "ユーザーの読み込み中に問題が発生しました",
    loadingChatbotsError: "チャットボットの読み込み中に問題が発生しました",
    loadingChannelsError: "チャンネルの読み込み中に問題が発生しました",
    ticketOpen: "開ける",
    ticketClosed: "閉鎖",
    transferError: "転送できません",
    checkTicketError: "この連絡先には既にオープン/保留中のチケットが存在します。",
    searchInConversation: "会話内を検索",
    searchPlaceholder: "検索する語句を入力してください",
    noMessagesFound: "メッセージが見つかりません",
    groupUsers: "グループユーザー",
    selectUsersForGroup: "このグループチケットにアクセスできるユーザーを選択してください",
    groupUsersUpdated: "グループユーザーが正常に更新されました",
    mediaLinksDocs: "メディア・リンク・ドキュメント",
    mediaTab: "メディア",
    linksTab: "リンク",
    docsTab: "ドキュメント",
    loadingMediaLinksDocs: "メディア、リンク、ドキュメントを読み込み中...",
    errorUpdatingGroupUsers: "グループユーザーの更新中にエラーが発生しました",
    autoScroll: "自動スクロール",
    autoScrollDescription: "新しいメッセージが到着したときに自動スクロールを無効にします",
    autoScrollEnabled: "自動スクロールが有効",
    autoScrollDisabled: "自動スクロールが無効"
  },
  generalSupport: {
    selectWavoip: "通話を行うWhatsAppを選択してください",
    looginForWarning1: "検索中はチケットは更新されません。",
    looginForWarning2: "更新するにはフィールドをクリアしてください...",
    lookingFor: "ID、名前、番号で検索しています...",
    closingForecast: "終値予測",
    status: "状態",
    createdAt: "作成年",
    opportunities: "ログ",
    funil: "漏斗",
    ticketFunil: "ファネルにステップを作成する",
    privateChat: "プライベート",
    groupChat: "グループ",
    searchMessage: "検索メッセージ",
    searchTicket: "援助を求める",
    notes: "注記",
    number: "番号",
    message: "メッセージ",
    placeholderNumber: "+DDI (DDD) 99999 9999",
    hintNumber: "システム内にアクティブな WABA 接続がある場合は、正確な WhatsApp アカウント番号を入力する必要があります。",
    ticketNotes: "サービスノート",
    evaluation: "評価",
    ticketEvaluation: "サービス評価",
    markasNoRead: "未読としてマーク",
    markasRead: "既読にする",
    businessName: "会社名",
    lastName: "姓",
    firstName: "ファーストネーム",
    profile: "プロフィール",
    logout: "外出する",
    activate: "活性化",
    deactivate: "無効にする",
    toggleDarkMode: "ダークモード",
    viewTickets: "チケットを見る",
    includeClosedTickets: "閉じたチケットを含める",
    returnMenu: "メニューに戻る",
    taskCreate: "タスクを作成",
    inernalChat: "社内チャット",
    privateChats: "プライベート会話",
    groupChats: "グループチャット",
    advancedFilter: "高度なフィルター",
    filterByQueues: "キュー",
    filterByConnections: "接続（ベータ版）",
    filterByUser: "ユーザー（ベータ版）",
    filterByTags: "タグ（ベータ版）",
    filterByKanban: "カンバン（ベータ版）",
    openTickets: "開ける",
    pendingTickets: "保留中",
    resolvedTickets: "解決済み",
    unreadTicketsOnly: "未読メッセージのあるチケットのみ",
    advancedFilterNotice: "フィルターを使用する場合は、上のボタン「さらにサービスを読み込む」をクリックする必要があります。",
    scheduleMessages: "スケジュールされたメッセージ",
    scheduledFor: "予定：",
    extractConversations: "会話の抽出",
    downloadPDF: "PDFファイルをダウンロード",
    difyDescription: "アクティブになると、システムはDifyを消費します",
    lmDescription: "アクティブになると、システムはLM Studioを消費します",
    grokDescription: "アクティブになると、システムはGrokを消費します",
    geminiDescription: "システムがアクティブになると、ジェミニを消費します",
    deepseekDescription: "有効になると、システムはDeepseekを消費します",
    qwenDescription: "起動すると、システムはQwenを消費します",
    claudeDescription: "システムが起動すると、クロードを消費します",
    ollamaDescription: "システムがアクティブになると、オラマを消費します",
    clearKanban: "クリアカンバン",
    reason: "要求",
    clearReason: "明確な需要",
    value: "価値",
    blockContact: "ブロック連絡先",
    blockChatbot: "チャットボットをブロックする",
    tags: "タグ",
    kanban: "カンバン",
    chatgptDescription: "アクティブな場合、システムはChatGPTを消費します",
    dialogflowDescription: "アクティブになると、システムはDialogFlowを消費します",
    typebotDescription: "アクティブになると、システムはタイプボットを消費します",
    n8nescription: "アクティブになると、システムはN8Nを消費します",
    private: "プライベート",
    groups: "グループ",
    chatbot: "チャットボット",
    n8nDescription: "アクティブになると、システムはN8Nを消費します",
    contacts: "連絡先",
    openWavoip: "Wavoipを開く",
    startNew: "単一の会話を開始する",
    loadMore: "さらに通話を読み込む",
    reverseOrder: "チケットの逆順",
    sortByAnswered: "未回答で並べ替え",
    protocol: "プロトコル",
    ticketProtocol: "サービスプロトコル",
    syncHistory: "同期履歴",
    log: "ログ",
    noTagsAvailable: "おっと...タグが作成されませんでした。",
    noTagsAvailableWarning: "システム管理で新しいラベルを登録します。",
    noWalletsAvailable: "おっと…ウォレットが利用できません！",
    wallets: "ウォレット",
    filter: {
      queues: "キュー",
      whatsapp: "繋がり",
      users: "ユーザー",
      tags: "タグ",
      kanbans: "カンバン"
    },
    toggleFilterOptions: "フィルターオプションの表示/非表示",
    addTag: "タグを追加",
    addWallet: "ウォレットを追加",
    ticketsSelected: "選択されたチケット",
    ticketSelected: "選択されたチケット",
    selectMultiple: "複数を選択",
    transferSelectedTickets: "選択されたチケットを転送",
    markAsRead: "既読にする",
    markAsUnread: "未読としてマーク",
    sanitizeContact: "接触部分を消毒する",
    logsticket: "チケットログ",
    contactSanitizeNotice: "このルーチンはユーザーを再作成し、その連絡先に関連付けられているすべてのチケットを閉じます。",
    addValue: "付加価値",
    ticketProtocols: "サービスプロトコル",
    ticketsEvaluations: "サービス評価",
    evaluationAverage: "平均評価",
    evaluationNotConclusive: "評価は正常に完了しませんでした",
    contactDetails: {
      vapi: "Vapi",
      title: "連絡先",
      reduceMenu: "メニューを折りたたむ",
      name: "名前",
      phone: "電話",
      email: "Eメール",
      cpf: "CPF",
      birthday: "誕生日",
      businessName: "企業",
      firstName: "ファーストネーム",
      lastName: "姓",
      edit: "編集",
      call: "ワヴォイプ",
      asterisk: "SIP",
      telephony: "電話",
      sms: "SMS"
    },
    logs: {
      contactLogs: "連絡ログ",
      ticketLogs: "チケットログ",
      evaluationLogs: "評価ログ",
      protocolLogs: "プロトコルログ",
      noteLogs: "ノートログ"
    }
  },
  rating: {
    poor: "悪い",
    fair: "通常",
    good: "良い",
    veryGood: "とても良い",
    excellent: "素晴らしい",
    incredible: "信じられない"
  },
  generalSupportScript: {
    sendMessage: "メッセージを送信",
    sendingMessage: "メッセージを送信しています...",
    messageSent: "メッセージを送信した番号: ",
    messageSendError: "個別メッセージの送信中にエラーが発生しました: ",
    closeModal: "モーダルを閉じる",
    error: "エラー",
    success: "成功",
    notificationPosition: "トップ",
    notificationColorPositive: "ポジティブ",
    notificationColorNegative: "ネガティブ",
    downloadPDF: "PDFをダウンロード",
    downloadingPDF: "PDF をダウンロードしています...",
    errorDownloadingPDF: "メッセージのダウンロード中にエラーが発生しました",
    reportTitle: "メッセージレポート - サポート",
    protocolLabel: "プロトコル",
    ticketIdLabel: "チケットID",
    whatsappIdLabel: "WhatsApp ID",
    channelLabel: "チャネル",
    footerGeneratedOn: "生成日",
    contactInfo: "連絡先",
    nameLabel: "名前",
    numberLabel: "番号",
    profilePicLabel: "プロフィール写真",
    messageFrom: "メッセージ",
    dateTimeLabel: "日付/時刻",
    userIdLabel: "ユーザーID",
    messageBody: "メッセージ本文",
    separatorLine: "区切り線",
    saveFileName: "サービス_",
    termsAcceptanceNotification: "スーパー管理者に会社の利用規約に同意するよう依頼します。",
    tenantWithFalseAcceptTermsNotification: "スーパー管理者にテナントの利用規約に同意するよう依頼する",
    acceptTermsSuccess: "ドメインの利用規約が承認されました",
    errorAcceptingTerms: "利用規約の同意エラー",
    notifyActionClose: "閉じる",
    tenantId: "テナントID",
    superadminProfile: "スーパー管理者",
    tenantNotFound: "テナントが見つかりません",
    deleteNoteConfirmation: "本当にメモ「{note.notes}」を削除しますか?",
    deleteNoteSuccess: "メモ {note.notes} が削除されました。",
    attentionTitle: "注意",
    noLabel: "いいえ",
    yesLabel: "はい",
    autoCloseWarning: "サポート {ticket.id} は、{time} 分以上やり取りがなかったため、自動的に解決されました。",
    autoCloseEnabled: "自動応答が有効になりました",
    autoCloseDisabled: "自動応答が無効になっています",
    noInteraction: "相互作用なし",
    timeExceeded: "時間超過",
    ticketsLoaded: "充実したサービス！",
    ticketsLoadedTabs: "開いているタブ、保留中のタブ、閉じたタブにサービスが読み込まれました。",
    attention: "注意",
    syncOldMessagesWarning: "本当にメッセージ履歴を同期しますか?",
    syncOldMessagesHint: "正の数のみが許可されます",
    syncOldMessagesSuccess: "しばらくお待ちください。システムはユーザー {ticketFocado.contact.number} の {value} 件のメッセージをインポートします。",
    invalidValue: "ユーザーが入力した値が無効であるか、指定されていません。",
    sendProtocolConfirmation: "このサービスのプロトコルを送信しますか?",
    protocolSent: "プロトコル {protocol} がサポート {ticketFocado.id} に送信されました",
    protocolError: "サービス プロトコルを送信できませんでした。",
    limitMessagesLabel: "インポートできるメッセージの制限",
    loading: "読み込み中...",
    ratingMessageTitle: "このサービスを評価してください:",
    notificationMessageFrom: "からのメッセージ",
    loadMoreTicketsMessage: "チケット リストの最後まで到達すると、新しいリクエストがすべてのタブ (ある場合) に読み込まれます。このアクションは 3 秒ごとに繰り返されます。",
    companyInactive: "あなたの会社は非アクティブです。",
    contactAdmin: "システム管理者に問い合わせてください。",
    logoutError: "ログアウトできません",
    tenantInactiveMessage: "会社は非アクティブです。まもなく切断されます。",
    sessionExpired: "セッションの有効期限が切れました。ログインにリダイレクトされます。",
    deleteMessageConfirmation: "本当にメッセージを削除しますか?",
    deleteMessageWarning: "古いメッセージはクライアントから削除されません。",
    deleteError: "メッセージを削除できません",
    loadUsersError: "ユーザーの読み込み中に問題が発生しました",
    loadUserError: "ユーザーの読み込み中に問題が発生しました",
    loadError: "データを保存中にエラーが発生しました: ",
    contactSanitizeSuccess: "連絡先が正常に消毒されました...",
    contactSanitizeError: "連絡先のサニタイズ中にエラーが発生しました...",
    loadMessage: "チケットの読み込みが完了するまでお待ちください...",
    confirmExitTitle: "このページを離れてもよいですか?",
    confirmExitMessage: "このページを離れると、接続の制御が失われます。"
  },
  dashTickets: {
    noQueue: "待ち行列なし",
    consultTicketsError: "サービスへの相談時にエラーが発生しました",
    open: "開ける",
    tickets: "サービス",
    panelTitle: "サービスパネル",
    filtersButtonLabel: "フィルター",
    closeOpenTicketsButtonLabel: "空いている予定を閉じる",
    closePendingTicketsButtonLabel: "保留中のコールを閉じる",
    transferTicketButtonLabel: "ユーザー間の転送サービス",
    markAllAsReadButtonLabel: "すべてのメッセージを既読にする",
    filtersTitle: "フィルター",
    dateStartLabel: "始める",
    dateEndLabel: "終わり",
    showAllLabel: "（管理者） - すべて表示",
    viewTypeLabel: "表示タイプ",
    updateButtonLabel: "更新するには",
    visionButtonLabel: "ビジョン",
    selectDestinationQueueLabel: "宛先キュー",
    selectUserLabel: "対象ユーザー",
    transferWithoutQueueLabel: "待ち時間なしですべての予約を転送する",
    transferBetweenUsersLabel: "ユーザー間の転送サービス",
    resolvePendingTicketsLabel: "保留中のリクエストをすべて解決する",
    resolveOpenTicketsLabel: "すべてのオープンコールを解決する",
    selectSourceUserLabel: "ソースユーザー",
    attentionMessage: "注意：ユーザーは同じキューにアクセスできる必要があります",
    actionInMassMessage: "これは一括操作であり、元に戻すことはできないことにご注意ください。",
    transferTicketsConfirmation: "待ち時間なしですべての予約を転送する",
    closeTicketsConfirmation: "保留中のリクエストをすべて解決する",
    closeOpenTicketsConfirmation: "すべてのオープンコールを解決する",
    userSelectionError: "保留中のサービスのユーザーと宛先キューを選択してください。",
    userDestinationSelectionError: "対象ユーザーを選択してください！",
    massActionError: "転送中に問題が発生しました",
    markAllAsReadMessage: "既読としてマークされているメッセージ。",
    massCloseTicketsError: "大量サービスを閉じる際に問題が発生しました",
    updateTicketError: "チケットの更新中に問題が発生しました",
    ticketsReloadMessage: "しばらくお待ちください。アクションが完了するとページが再読み込みされます。",
    loadQueuesError: "キューの読み込み中に問題が発生しました",
    loadUsersError: "ユーザーの読み込み中に問題が発生しました",
    selectUserAndQueueError: "保留中のサービスのユーザーと宛先キューを選択してください。",
    transferError: "転送中に問題が発生しました",
    closeMassTicketsError: "大量サービスを閉じる際に問題が発生しました",
    resolveTicketsBatchMessage: "チケットは 10 項目のブロック単位で解決されます。",
    reloadPageMessage: "しばらくお待ちください。アクションが完了するとページが再読み込みされます。",
    markAllAsReadError: "すべてを既読にする際に問題が発生しました",
    viewTypeUser: "ユーザー",
    viewTypeUserSynthetic: "合成ユーザー",
    viewTypeQueue: "列",
    viewTypeQueueSynthetic: "合成糸",
    transferBetweenQueuesButtonLabel: "キュー間で転送",
    transferBetweenChannelsButtonLabel: "チャネル間で転送",
    transferBetweenQueuesTitle: "キュー間でチケットを転送",
    transferBetweenQueuesDescription: "送信元キューと送信先キューを選択してください",
    sourceQueueLabel: "送信元キュー（キューなしで転送する場合は空のままにしてください）",
    destinationQueueLabel: "送信先キュー *",
    destinationUserLabel: "送信先ユーザー（オプション）",
    transferBetweenChannelsTitle: "チャネル間でチケットを転送",
    transferBetweenChannelsDescription: "送信元チャネルと送信先チャネルを選択してください",
    sourceChannelLabel: "送信元チャネル",
    destinationChannelLabel: "送信先チャネル *",
    selectSourceChannelError: "送信元チャネルを選択してください！",
    selectDestinationQueueError: "送信先キューを選択してください！",
    selectDestinationChannelError: "送信先チャネルを選択してください！",
    transferBetweenQueuesSuccess: "キュー間でチケットが正常に転送されました",
    transferBetweenChannelsSuccess: "チャネル間でチケットが正常に転送されました",
    transferBetweenQueuesError: "キュー間でチケットを転送する際にエラーが発生しました",
    transferBetweenChannelsError: "チャネル間でチケットを転送する際にエラーが発生しました"
  },
  dashBoard: {
    dataValidation: "期間の開始と終了を同じ日に確認することはできませんのでご了承ください。",
    attendanceValueEvolution: "価値観の進化",
    values: "価値観",
    attendances: "サービス",
    filterGroups: "フィルターグループ",
    filterPrivateChats: "プライベート会話の統計をフィルタリングします。",
    controlPanel: "コントロールパネル",
    attendanceByChannelName: "チャネル別サービス（名称）",
    undefined: "不定",
    attendanceByChannel: "チャネル別サービス（接続）",
    attendanceByQueue: "キューサービス",
    attendanceByReasons: "オンデマンドサービス",
    attendanceByStatus: "ステータス別のサービス",
    attendanceByUser: "ユーザーによるサービス",
    evolutionByChannel: "チャネル別の進化",
    evolutionByValue: "価値による進化",
    attendanceEvolution: "サービスの進化",
    user: "ユーザー",
    pending: "保留中",
    attending: "出席",
    resolved: "完了",
    total: "合計",
    avgRating: "平均評価",
    avgFirstResponse: "初回応答の平均時間",
    avgHandlingTime: "平均サービス時間（AST）",
    hours: "時間",
    minutes: "分",
    scheduleStartDate: "予約日時",
    scheduleEndDate: "予約日時",
    generate: "生成するには",
    noDataHere: "ここにはデータがありません!",
    totalTickets: "総観客数",
    activeTickets: "アクティブ",
    receptiveTickets: "受容的",
    newContacts: "新しい連絡先",
    avgResponseTime: "初回応答の平均時間",
    performanceByTeam: "チームパフォーマンス",
    ticketsByChannel: "チャネル別サービス",
    ticketsByQueue: "キューサービス",
    ticketsByStatus: "ステータス別のサービス",
    ticketsByUser: "ユーザーによるサービス",
    ticketsEvolutionChannels: "チャネル別の進化",
    ticketsEvolutionByPeriod: "サービスの進化",
    notInformed: "通知なし",
    evolutionByPeriod: "サービス"
  },
  home: {
    welcome: "ようこそ",
    user: "ユーザー",
    subtitle: "システムの主要機能へのクイックアクセス",
    dashboard: "ダッシュボード",
    dashboardDescription: "統計とパフォーマンス指標を表示",
    attendance: "チケット",
    attendanceDescription: "チケットと会話を管理",
    contacts: "連絡先",
    contactsDescription: "連絡先リストを表示および管理",
    quickInfo: "クイック情報",
    info1: "詳細な分析のためにダッシュボードにアクセス",
    info2: "より良いパフォーマンスのために最適化されたシステム",
    info3: "メニューを閲覧してより多くの機能を利用",
    quickLinks: "クイックリンク",
    reports: "レポート",
    reportsDescription: "レポートと分析を表示",
    settings: "設定",
    settingsDescription: "ニーズに応じてシステムを設定"
  },
  confirmation: {
    irreversibleAction: "注意: これは取り返しのつかない操作です。",
    deleteTenant: "本当に会社 {id} を削除しますか?"
  },
  socketInitial: {
    updateWhatsapps: "WhatsAppのアップデートを受信しました",
    deleteWhatsapps: "WhatsAppの削除を受け取りました",
    updateSession: "セッションが更新されました",
    loadingScreen: "接続を同期中です: ",
    readySession: "接続が更新されました。",
    wavoipSession: "Wavoipとの同期接続: ",
    updateImport: "デバイスとアプリケーションを同期しています。",
    refreshImport: "デバイス メッセージを更新しています。",
    changeBattery: "WhatsAppモバイルバッテリーを充電する必要があります。",
    ticketUpdate: "チケットが更新されました。",
    ticketCreate: "新しいチケットが作成されました。",
    chatCreate: "新しいチャットが作成されました。",
    ticketNotification: "新規クライアントが保留中です。",
    messageAck: "メッセージを確認しました。",
    messageDelete: "メッセージは削除されました。",
    messageUpdate: "メッセージが更新されました。",
    contactUpdate: "連絡先が更新されました。",
    privateMsgReceived: "新しいプライベートメッセージを受信しました。",
    unreadPrivateMsgReceived: "未読のプライベートメッセージを受信しました。",
    notificationPrivateMsgReceived: "プライベートメッセージの受信通知。",
    userVerified: "認証済みユーザー。",
    userChatUpdate: "ユーザーステータスが更新されました。",
    userStatusUpdate: "ユーザーステータスが更新されました"
  },
  mainLayout: {
    novo: {
      wabaTemplate: "WABA用にテンプレート送信用の新しいチケットが作成されます",
      userNotFound: "エラー: ユーザーが見つかりません。再度ログインしてください。",
      whatsappNotFound: "エラー: WhatsApp が選択されていません。",
      numberNotFound: "エラー: 番号が入力されていません。",
      numberInvalid: "エラー: 無効な番号です。",
      invalidIds: "チケット確認用の無効なID",
      invalidData: "エラー: チケット作成用のデータが無効です。",
      ticketCreated: "{contatoName} の新しいチケットが作成されました - チケット: {ticketId}",
      ticketCreatedError: "エラー: チケットが作成されましたが有効なIDがありません。"
    },   
    noTutorials: 'チュートリアルが見つかりません',
    tutoriais: 'チュートリアル',
    checkAllInternalMessages: "すべてを既読にする（プライベートチャット）",
    checkAllInternalMessagesSuccess: "すべてのメッセージが既読になりました（プライベートチャット）",
    checkAllInternalMessagesError: "すべてのメッセージを既読にする際にエラーが発生しました（プライベートチャット）",
    checkAllMessages: "すべてを既読にする（サービス）",
    checkAllMessagesSuccess: "すべてのメッセージが既読になりました（出席）",
    checkAllMessagesError: "すべてのメッセージを既読にする際にエラーが発生しました（サービス）",
    webphone: "SIPウェブフォン",
    cookieWarning: "キャッシュとCookieをクリアします。 「OK」をクリックしてページを再読み込みしてください。",
    cleanCookies: "再起動",
    task: "タスク",
    dashboard: "パネル",
    atendimentos: "サービス",
    contatos: "連絡先",
    disparoMassa: "銃乱射事件",
    grupos: "グループ",
    chat: "チャット",
    kanban: "カンバン",
    tarefas: "タスク",
    perfil: "プロフィール",
    logout: "外出する",
    close: "閉じる",
    send: "送信する",
    cancel: "キャンセル",
    startConversation: "単一の会話を開始する",
    internalMessages: "内部メッセージ",
    tasks: "タスク",
    taskLimit: "制限",
    taskStatus: "状態",
    taskPriority: "優先度",
    taskDate: "締め切り",
    message: "メッセージ",
    number: "番号",
    whatsappId: "WhatsApp ID",
    taskName: "タスク",
    taskPriorityMap: {
      high: "高い",
      medium: "平均",
      low: "低い",
      none: "なし"
    },
    taskStatusMap: {
      delayed: "遅い",
      pending: "保留中",
      finished: "完了"
    },
    user: "ユーザー",
    hello: "こんにちは",
    userOnline: "オンラインユーザー",
    userOffline: "オフラインユーザー",
    newChat: "単一の会話を開始する",
    reopenCall: "Wavoip通話を再開する",
    internalMessage: "内部メッセージ",
    menu: "メニュー",
    notifications: "通知",
    noNewNotifications: "何も新しいことはありません!",
    newMessagesInInternalChat: "内部チャットに新しい未読メッセージがあります。",
    unreadMessagesInInternalChat: "内部チャットに未読メッセージがあります!",
    sharedTicketInvites: "共有チケット招待",
    pendingClientsInQueue: "キュー内の保留中の顧客",
    contact: "接触",
    yes: "はい",
    no: "いいえ",
    attention: "注意！",
    userProfile: "ユーザープロフィール",
    updateUser: "ユーザーの更新",
    acceptTerms: "利用規約に同意する",
    error: "エラー",
    successfullySent: "メッセージは正常に送信されました",
    acceptTermsMessage: "続行するには利用規約に同意してください。",
    invalidTenant: "無効なテナントです。スーパー管理者に電子メールの検証を依頼してください。",
    profile: "プロフィール"
  },
  scriptMainLayout: {
    groupTabAccess: "通話を開くには、サポートの [グループ] タブにアクセスします。",
    tokenUpdateError: "トークンを更新できません。",
    noQueue: "待ち行列なし",
    attention: "注意！！",
    logoutError: "ログアウトできません。",
    messagesLoadError: "内部メッセージの読み込み中にエラーが発生しました。",
    tasksLoadError: "タスクの読み込み中にエラーが発生しました。",
    markAsReadError: "メッセージを既読としてマークするときにエラーが発生しました。",
    deleteMessageError: "メッセージの削除中にエラーが発生しました。",
    fetchMessagesError: "未読メッセージの取得中にエラーが発生しました。",
    contactHasOngoingTicket: "{contact} は継続中のサービスを持っています。",
    adminCanAssign: "このサービスを割り当てることができるのは管理者のみです。",
    openTicketConfirmation: "{contact} には進行中のサービスがあります (サービス: {ticketId} - キュー: {queueId})。サービスを開きますか?",
    callNotification: "新しい着信",
    messageSent: "メッセージを送信した番号: {number}",
    messageSendError: "個別のメッセージの送信中にエラーが発生しました: {error}",
    internalMessagesNotification: "未読メッセージは {count} 件あります。",
    tasksNotification: "保留中のタスクが {count} 件あります。",
    acceptTermsSuccess: "利用規約に同意しました。",
    acceptTermsError: "スーパー管理者に会社の利用規約に同意するよう依頼します。",
    adminContact: "システム管理者に問い合わせてください。",
    betaMenuAccess: "ベータ メニューは許可されたユーザーのみが利用できます。",
    taskStatus: {
      delayed: "🚩 遅い",
      pending: "🔄 保留中",
      finished: "✅ 完了"
    },
    priorityStatus: {
      high: "⚡⚡⚡ 高い",
      medium: "⚡⚡ 平均",
      low: "⚡ダウンロード",
      none: "😉 なし"
    },
    notifications: {
      chatUpdate: "チャットで更新します。",
      newMessage: "{contact} からの新しいメッセージです。",
      messageFrom: "{contactName}からのメッセージ",
      notificationBody: "{メッセージ本文} - {時間}"
    }
  },
  menuCategories: {
    automacao: '自動化',
    dashboard: 'ダッシュボード',
    atendimento: 'サービス',
    gestaoComercial: '営業管理',
    comunicacaoMarketing: 'コミュニケーションとマーケティング',
    administracao: '管理',
    gestao: '管理',
    configuracao: '設定と API',
    tenantsLicenciamento: 'テナントとライセンス',
    configuracoes: '設定',
    canaisIntegracao: 'チャネルと統合',
    sistema: 'システム'
  },
  menu: {
    funil: {
      title: "漏斗",
      caption: "機会管理"
    },
    dashboard: {
      title: "パネル",
      caption: ""
    },
    atendimentos: {
      title: "サービス",
      caption: "サービス一覧"
    },
    contatos: {
      title: "連絡先",
      caption: "連絡先リスト"
    },
    disparoMassa: {
      title: "銃乱射事件",
      caption: "一括メッセージの送信"
    },
    grupos: {
      title: "グループ",
      caption: "一括グループ管理"
    },
    chat: {
      title: "チャット",
      caption: "チャット"
    },
    kanban: {
      title: "カンバン",
      caption: "CRM"
    },
    tarefas: {
      title: "タスク",
      caption: "ToDoリスト"
    },
    mensagensRapidas: {
      title: "クイックメッセージ",
      caption: "定義済みメッセージ"
    },
    galeria: {
      title: "ギャラリー",
      caption: "ファイルギャラリー"
    },
    instagramComentarios: {
      title: 'Instagramコメント',
      caption: 'コメントを管理'
    }
  },
  menuSupervisor: {
    canais: {
      title: "チャンネル",
      caption: "コミュニケーションチャネル"
    },
    relatorios: {
      title: "レポート",
      caption: "一般レポート"
    },
    filas: {
      title: "キュー",
      caption: "キュー登録"
    },
    equipes: {
      title: "チーム",
      caption: "チーム"
    },
    mensagensRapidas: {
      title: "クイックメッセージ",
      caption: "定義済みメッセージ"
    },
    chatbot: {
      title: "チャットボット",
      caption: "サービスロボット"
    },
    agendamentos: {
      title: "予約",
      caption: "スケジュールされたメッセージ"
    },
    aniversarios: {
      title: "誕生日",
      caption: "スケジュールされたメッセージ"
    },
    fechamento: {
      title: "終わりに",
      caption: "閉会のメッセージ"
    },
    etiquetas: {
      title: "タグ",
      caption: "ラベル登録"
    },
    notas: {
      title: "注記",
      caption: "サービスノート"
    },
    protocolos: {
      title: "プロトコル",
      caption: "サービスプロトコル"
    },
    avaliacoes: {
      title: "レビュー",
      caption: "サービス評価"
    },
    horarioAtendimento: {
      title: "営業時間",
      caption: "営業時間"
    },
    campanhas: {
      title: "キャンペーン",
      caption: "キャンペーンの送信"
    }
  },
  callLogs: {
    downloadReport: "レポートをダウンロードする",
    title: "SIP通話ログ",
    subtitle: "発信および着信のSIP通話記録",
    columns: {
      id: "ID",
      originNumber: "発信番号",
      destinationNumber: "着信番号",
      callStatus: "通話ステータス",
      callDuration: "通話時間",
      createdAt: "作成日",
      user: "ユーザー"
    },
    status: {
      calling: "発信中",
      received: "受信済み",
      accepted: "受け入れ済み",
      completed: "完了",
      ended: "終了"
    }
  },    
  menuAdmin: {
    logligacao: {
      title: "通話ログ",
      caption: "SIP通話履歴"
    },      
    canais: {
      title: "チャンネル",
      caption: "コミュニケーションチャネル"
    },
    painelAtendimentos: {
      title: "サービスパネル",
      caption: "サービスの概要"
    },
    relatorios: {
      title: "レポート",
      caption: "一般レポート"
    },
    usuarios: {
      title: "ユーザー",
      caption: "ユーザー管理者"
    },
    filas: {
      title: "キュー",
      caption: "キュー登録"
    },
    equipes: {
      title: "チーム",
      caption: "チームチャット"
    },
    mensagensRapidas: {
      title: "クイックメッセージ",
      caption: "定義済みメッセージ"
    },
    chatbot: {
      title: "チャットボット",
      caption: "サービスロボット"
    },
    agendamentos: {
      title: "予約",
      caption: "スケジュールされたメッセージ"
    },
    aniversarios: {
      title: "誕生日",
      caption: "スケジュールされたメッセージ"
    },
    fechamento: {
      title: "終わりに",
      caption: "閉会のメッセージ"
    },
    etiquetas: {
      title: "タグ",
      caption: "ラベル登録"
    },
    notas: {
      title: "注記",
      caption: "サービスノート"
    },
    wavoip: {
      title: "ワヴォイプ",
      caption: "着信と発信"
    },
    protocolos: {
      title: "プロトコル",
      caption: "サービスプロトコル"
    },
    avaliacoes: {
      title: "レビュー",
      caption: "サービス評価"
    },
    horarioAtendimento: {
      title: "営業時間",
      caption: "営業時間"
    },
    campanhas: {
      title: "キャンペーン",
      caption: "キャンペーンの送信"
    },
    api: {
      title: "API",
      caption: "外部システム統合"
    },
    configuracoes: {
      title: "設定",
      caption: "一般設定"
    }
  },
  menuSuperAdmin: {
    backup: {
      title: 'エクスポート',
      caption: 'データセンター'
    },
    migration: {
      title: '移行',
      caption: 'テナント移行'
    },
    monitor: {
      title: "モニター",
      caption: "システム監視"
    },
    assinatura: {
      title: "サイン",
      caption: "ライセンスの管理"
    },
    tenants: {
      title: "テナント",
      caption: "テナント"
    },
    usuarios: {
      title: "ユーザー",
      caption: "ユーザー管理者"
    },
    email: {
      title: "Eメール",
      caption: "パスワード回復"
    },
    planos: {
      title: "予定",
      caption: "プランを登録する"
    },
    pagamentos: {
      title: "支払い",
      caption: "支払い詳細"
    },
    canais: {
      title: "チャンネル",
      caption: "コミュニケーションチャネル"
    },
    api: {
      title: "API",
      caption: "スーパー管理者API"
    },
    appWaba: {
      title: 'App WABA',
      caption: 'Facebookアプリ設定'
    },
    atualizar: {
      title: "更新するには",
      caption: "システムメンテナンス"
    },
    customizar: {
      title: "カスタマイズ",
      caption: "ロゴと色"
    },
    notificacao: {
      title: "通知",
      caption: "内部メッセージ"
    },
    filasTarefas: {
      title: "キューとタスク",
      caption: "ブルとレディス"
    },
    dadosInternos: {
      title: "内部データ",
      caption: "内部メッセージ"
    },
    terminal: {
      title: "ターミナル",
      caption: "SSHターミナル"
    },
    provedoresGlobais: {
      title: "グローバルプロバイダー",
      caption: "グローバルプロバイダー設定"
    }
  },
  menuBloqueio: {
    configuracoes: {
      title: "設定",
      caption: "一般設定"
    }
  },
  grupoIndex: {
    tabs: {
      bulkgroups: "グループと参加者",
      bulkgroups2: "グループを操作する",
      bulkuser: "ユーザーを操作する",
      banlist: "禁止番号",
      wordlist: "禁じられた言葉",
      greetings: "挨拶メッセージ",
      farewell: "送別メッセージ"
    },
    banner: {
      stability: "このオプションは、Baileys および Whatsapp-Web.JS で利用できます。一括アクションを使用する場合は、グループの処理時に安定性が向上するため、Whatsapp-Web.JS を使用することをお勧めします。",
      warning: {
        title: "グループ自動化に関するお知らせ",
        blockRisk: "WhatsApp は私の番号をブロックまたは禁止できますか?",
        realRisk: "はい、その可能性は現実であり、真剣に受け止めるべきです。",
        spamTolerance: "WhatsApp はスパムに対して一切の寛容をしません。",
        monitoring: "厳格なルールを採用し、メッセージの送信と大量アクションの実行を厳格に監視します。",
        attention: "注意: 受信者の 2% があなたの番号を報告したり、メッセージをスパムとしてマークしたりした場合、あなたの番号はブロック/禁止されます。"
      }
    },
    dialog: {
      confirmButton: "続く",
      cancelButton: "外出する"
    },
    notifications: {
      colorsLoadError: "色の読み込み中にエラーが発生しました。",
      noStoredColors: "localStorage に色が保存されていません。"
    }
  },
  grupoGeralBanlist: {
    table: {
      columns: {
        id: "#",
        number: "番号",
        userId: "ユーザー",
        groupId: "グループ",
        createdAt: "日付",
        actions: "アクション"
      },
      title: "禁止事項"
    },
    placeholders: {
      search: "位置特定"
    },
    buttons: {
      add: "追加するには",
      delete: "消去"
    },
    dialogs: {
      deleteSingle: "本当に禁止「{banId}」を削除しますか?",
      deleteAll: "すべての {banCount} 件の禁止レコードを本当に削除しますか?"
    },
    notifications: {
      deleteSuccess: "{banId} の禁止が削除されました!",
      deleteAllSuccess: "すべての禁止記録が削除されました。",
      groupNameError: "{groupId} のグループ名の取得中にエラーが発生しました。"
    }
  },
  grupoGeralDespedida: {
    table: {
      columns: {
        id: "#",
        message: "メッセージ",
        userId: "ユーザー",
        groupId: "グループ",
        createdAt: "日付",
        actions: "アクション"
      },
      title: "別れ"
    },
    placeholders: {
      search: "位置特定"
    },
    buttons: {
      add: "追加するには",
      delete: "消去"
    },
    dialogs: {
      deleteSingle: "本当に「{despedidaId}」という送別メッセージを削除しますか?",
      deleteAll: "Despedida の {despedidaCount} 件のレコードをすべて削除してもよろしいですか?"
    },
    notifications: {
      deleteSuccess: "さようなら {despedidaId} が削除されました!",
      deleteAllSuccess: "全てのFarewellレコードが削除されました！",
      groupNameError: "{groupId} のグループ名の取得中にエラーが発生しました。"
    }
  },
  grupoGeralSaudacao: {
    table: {
      columns: {
        id: "#",
        message: "メッセージ",
        userId: "ユーザー",
        groupId: "グループ",
        createdAt: "日付",
        actions: "アクション"
      },
      title: "ご挨拶"
    },
    placeholders: {
      search: "位置特定"
    },
    buttons: {
      add: "追加するには",
      delete: "消去"
    },
    dialogs: {
      deleteSingle: "本当にグリーティング「{greetingId}」を削除しますか?",
      deleteAll: "{saudacaoCount} 件の敬称レコードをすべて削除してもよろしいですか?"
    },
    notifications: {
      deleteSuccess: "挨拶 {saudacaoId} が削除されました。",
      deleteAllSuccess: "すべてのグリーティングレコードが削除されました。",
      groupNameError: "{groupId} のグループ名の取得中にエラーが発生しました。"
    }
  },
  grupoGeralWordlist: {
    table: {
      columns: {
        id: "#",
        word: "言葉",
        userId: "ユーザー",
        groupId: "グループ",
        createdAt: "日付",
        actions: "アクション"
      },
      title: "禁じられた言葉"
    },
    placeholders: {
      search: "位置特定"
    },
    buttons: {
      add: "追加するには",
      delete: "消去",
      activateWordWatch: "ワードウォッチをオンにする"
    },
    dialogs: {
      deleteSingle: "本当に「{wordId}」という単語を削除しますか?",
      deleteAll: "{wordCount} 個の Word レコードをすべて削除してもよろしいですか?"
    },
    notifications: {
      deleteSuccess: "単語 {wordId} が削除されました。",
      deleteAllSuccess: "すべての Word レコードが削除されました。",
      groupNameError: "{groupId} のグループ名の取得中にエラーが発生しました。"
    }
  },
  grupoGeralModalDespedida: {
    dialog: {
      titleCreate: "別れを創る",
      titleEdit: "編集 別れ"
    },
    form: {
      message: "送別メッセージ",
      whatsappId: "WhatsApp ID",
      group: "グループ"
    },
    notifications: {
      createSuccess: "さようならが作成されました！",
      editSuccess: "編集してお別れします！",
      errorFetchingGroups: "グループの一覧表示中にエラーが発生しました。",
      errorSaving: "別れの保存中にエラーが発生しました。"
    }
  },
  grupoGeralModalBan: {
    dialog: {
      titleCreate: "禁止を作成",
      titleEdit: "編集禁止"
    },
    form: {
      number: "禁止番号",
      whatsappId: "WhatsApp ID",
      group: "グループ"
    },
    notifications: {
      createSuccess: "禁止を作成しました！",
      editSuccess: "編集済みを禁止しました！",
      errorFetchingGroups: "グループの一覧表示中にエラーが発生しました。",
      errorSaving: "禁止の保存中にエラーが発生しました。"
    }
  },
  grupoGeralModalSaudacao: {
    dialog: {
      titleCreate: "挨拶文を作成",
      titleEdit: "挨拶文を編集"
    },
    form: {
      message: "挨拶メッセージ",
      whatsappId: "WhatsApp ID",
      group: "グループ"
    },
    notifications: {
      createSuccess: "挨拶が作成されました!",
      editSuccess: "挨拶を編集しました！",
      errorFetchingGroups: "グループの一覧表示中にエラーが発生しました。",
      errorSaving: "挨拶を保存中にエラーが発生しました。"
    }
  },
  grupoGeralModalWordlist: {
    dialog: {
      titleCreate: "単語を作成",
      titleEdit: "単語を編集"
    },
    form: {
      word: "単語（小文字）",
      whatsappId: "WhatsApp ID",
      group: "グループ"
    },
    notifications: {
      createSuccess: "単語が作成されました!",
      editSuccess: "単語を編集しました!",
      errorFetchingGroups: "グループの一覧表示中にエラーが発生しました。",
      errorSaving: "単語の保存中にエラーが発生しました。"
    }
  },
  grupoGeralModalWordlistGrupo: {
    dialog: {
      title: "ワードウォッチをオンにする"
    },
    form: {
      connection: "繋がり",
      toggleLabel: "オン/オフ"
    },
    notifications: {
      selectConnection: "接続を選択してください。",
      updateSuccess: "WhatsApp {connection} が正常に更新されました。",
      updateError: "WhatsAppの更新中にエラーが発生しました。詳細についてはログを確認してください。"
    }
  },
  grupoMassa1: {
    title: "グループジェネレーター",
    sections: {
      createMassGroups: "一括でグループを作成する",
      listParticipants: "参加者リスト"
    },
    form: {
      connection: "繋がり",
      groups: "グループ",
      groupId: "IDグループ",
      participants: "参加者"
    },
    notifications: {
      selectConnection: "接続を選択してください。",
      selectGroups: "1 つ以上のグループを選択してください。",
      fieldsReset: "フィールドがリセットされ、このページが更新されます。",
      loadingParticipants: "お待ちください。グループ参加者全員を読み込んでいます...",
      loadingGroups: "お待ちください。グループを読み込んでいます..."
    },
    actions: {
      listGroupIds: "グループIDの一覧",
      listParticipants: "参加者リスト",
      exportToXLS: "XLSにエクスポート",
      clear: "掃除する"
    }
  },
  grupoMassa2: {
    title: "グループを操作する",
    form: {
      connection: "繋がり",
      groups: "グループ",
      changeTitle: "タイトルを変更",
      newTitle: "新しいタイトル",
      changeDescription: "変更の説明",
      newDescription: "新しい説明",
      changeImageUrl: "画像の変更（URL）",
      newImageUrl: "新しい画像",
      changeImageFile: "画像の変更（アップロード）",
      uploadImage: "画像アップロード",
      changePermission: "権限の変更",
      adminOnly: "管理者のみがメッセージを送信できます"
    },
    actions: {
      modify: "変更する",
      clear: "掃除する"
    },
    notifications: {
      selectConnection: "接続を選択してください。",
      selectGroups: "1 つ以上のグループを選択してください。",
      fillTitle: "新しいタイトルをオプションに入力してください。",
      fillDescription: "オプションに新しい説明を入力してください。",
      fillImageUrl: "新しい画像の URL をオプションに入力してください。",
      uploadFile: "新しいファイルをアップロードしてください。"
    },
    loading: {
      modifyingGroups: "グループデータを変更しています。お待ちください..."
    }
  },
  grupoMassaUsuarios: {
    title: "ユーザーを操作する",
    actions: {
      execute: "実行するには",
      clear: "フィールドをクリア",
      reload: "ページを再読み込み"
    },
    form: {
      connection: "繋がり",
      groups: "グループ",
      promoteAdmins: "管理者の昇格",
      demoteAdmins: "管理者の降格",
      addUsers: "ユーザーを追加する",
      removeUsers: "ユーザーを削除",
      importContacts: "連絡先をインポート",
      numbersInput: "数字（カンマ区切り）",
      csvImport: "CSVから数値をインポートする",
      selectContacts: "連絡先を選択",
      numbersCommaSeparated: "数字（カンマ区切り）",
      importCSV: "CSVをインポート"
    },
    notifications: {
      selectConnection: "接続を選択してください。",
      selectGroups: "1 つ以上のグループを選択してください。",
      fillContacts: "連絡先を選択または入力してください。",
      clearFields: "フィールドがリセットされ、このページが更新されます。"
    },
    loading: {
      fetchingContacts: "お待ちください。すべてのシステム連絡先を読み込んでいます...",
      executingActions: "しばらくお待ちください。操作を実行しています..."
    }
  },
  grupoMassaModalCriarGrupo: {
    form: {
      createGroups: "グループを作成する",
      connection: "繋がり",
      groupName: "グループ名",
      participantNumber: "参加者数",
      groupQuantity: "グループ数",
      importContacts: "連絡先の設定 / 連絡先の選択",
      selectContact: "連絡先を選択"
    },
    notifications: {
      selectConnection: "接続を選択してください。",
      fillGroupName: "グループ名をフィールドに入力してください。",
      fillParticipant: "新しく作成されたグループに追加する連絡先をフィールドに入力してください。",
      selectContact: "新しく作成されたグループに追加する連絡先を選択してください。",
      fillQuantity: "作成されたグループの数をフィールドに入力してください。"
    },
    loading: {
      fetchingContacts: "しばらくお待ちください。連絡先を読み込んでいます...",
      creatingGroups: "グループを作成しています。お待ちください..."
    }
  },
  massaGeral: {
    tabs: {
      template: "大量メール送信テンプレート",
      templateVariable: "一括メールテンプレート + 変数",
      text: "銃乱射事件",
      textVariable: "大量発射＋可変",
      sms: "SMS一括送信",
      report: "一括送信レポート"
    },
    dialog: {
      title: "銃乱射事件警報",
      description: {
        importantNotice: {
          title: "WhatsApp は私の番号をブロックまたは禁止できますか?",
          content: "はい、その可能性は現実であり、真剣に受け止めるべきです。"
        },
        additionalInfo: {
          title: "WhatsApp はスパムに対して一切の寛容をしません。",
          content: "厳格なルールがあり、大量メッセージングを厳重に監視しています。"
        },
        alert: {
          title: "注意",
          content: "受信者の 2% があなたの番号を報告したり、メッセージをスパムとしてマークしたりした場合、<b>あなたの番号はブロック/禁止されます。</b>"
        }
      },
      actions: {
        exit: "外出する",
        continue: "続く"
      }
    }
  },
  relatorioBulkDispatch: {
    title: "一括送信レポート",
    tooltip: {
      description: "このレポートは WhatsApp メッセージの送信のみを表示します。Wavoip や SMS の送信は含まれません。"
    },
    filters: {
      status: "ステータス",
      dispatchType: "送信タイプ"
    },
    actions: {
      search: "検索",
      clear: "クリア",
      viewDetails: "詳細を表示"
    },
    columns: {
      id: "ID",
      status: "ステータス",
      dispatchType: "タイプ",
      templateName: "テンプレート",
      progress: "進捗",
      createdAt: "作成日時",
      actions: "アクション"
    },
    status: {
      pending: "保留中",
      processing: "処理中",
      completed: "完了",
      failed: "失敗",
      cancelled: "キャンセル"
    },
    dispatchType: {
      template: "テンプレート",
      template_variable: "変数付きテンプレート",
      text: "テキスト",
      text_variable: "変数付きテキスト"
    },
    details: {
      title: "送信詳細",
      general: "一般情報",
      statistics: "統計",
      errors: "エラー",
      id: "ID",
      status: "ステータス",
      dispatchType: "送信タイプ",
      createdAt: "作成日時",
      startedAt: "開始日時",
      completedAt: "完了日時",
      totalMessages: "メッセージ総数",
      sentMessages: "送信済みメッセージ",
      failedMessages: "失敗したメッセージ",
      pendingMessages: "保留中のメッセージ",
      delay: "遅延"
    },
    notifications: {
      errorLoading: "レポートの読み込みエラー",
      errorLoadingDetails: "送信詳細の読み込みエラー"
    }
  },
  massaSMS: {
    form: {
      selectService: "サービスを選択",
      minSeconds: "最小（秒）",
      maxSeconds: "最大（秒）",
      contacts: "連絡先",
      selectContacts: "連絡先を選択",
      numbersCommaSeparated: "数字（カンマ区切り）",
      importCSV: "CSVから数値をインポートする",
      message: "メッセージ"
    },
    notifications: {
      selectService: "サービスを選択してください。",
      validMinMax: "最小値と最大値に有効な数値を入力してください。",
      enterNumbersMessage: "数字とメッセージを入力してください。",
      successComtele: "Comtele 経由の一括送信が正常に開始されました。",
      successConecta: "ConectaStartup による一括送信が正常に開始されました。",
      successLivson: "BHI による一括送信が正常に開始されました。",
      errorSending: "メッセージの送信中にエラーが発生しました: {error}",
      fieldsCleared: "きれいな畑。"
    }
  },
  massaTexto: {
    form: {
      bulkSend: "大量郵送",
      availableFunctions: "この機能はBaileysとWhatsapp-Web.JSで利用可能です。",
      availableFunctionsWaba: "この機能はWABAで利用可能です",
      selectConnection: "WhatsApp ID",
      minSeconds: "最小（秒）",
      maxSeconds: "最大（秒）",
      contacts: "連絡先",
      groups: "グループ",
      tags: "タグ",
      kanban: "カンバン",
      selectTag: "ラベルを選択",
      selectKanban: "カンバンを選択",
      selectContacts: "連絡先を選択",
      numbersCommaSeparated: "数字（カンマ区切り）",
      importCSV: "CSVから数値をインポートする",
      includeText: "テキストを含める",
      message: "メッセージ",
      includeMedia: "メディアを含める（URL）",
      mediaUrl: "メディアURL",
      mediaDescription: "メディアの説明",
      includeRecordedAudio: "録音した音声を含める",
      audioUrl: "オーディオ URL (.ogg)",
      includeFile: "ファイルを含める（アップロード）",
      fileDescription: "ファイルの説明",
      recordedAudio: "録音された音声",
      send: "送信する",
      clear: "フィールドをクリア",
      fetchingContacts: "お待ちください。すべてのシステム連絡先を読み込んでいます..."
    },
    notifications: {
      selectConnection: "接続を選択してください。",
      enterValidNumbers: "最小値と最大値に有効な数値を入力してください。",
      chooseSendOption: "配送オプションを 1 つ以上選択してください。",
      enterMessage: "送信するメッセージを入力してください。",
      enterMediaDetails: "アップロードするファイルのURLと説明を入力してください。",
      enterAudioDetails: "音声ファイルのURLを入力してください。",
      uploadFile: "ファイルをアップロードし、送信される説明を入力してください。",
      uploadingMessages: "しばらくお待ちください。メッセージを読み込んでいます。",
      messagesSent: "送信されたメッセージ: {sent} / {total}。",
      errorSendingMessages: "メッセージの送信中にエラーが発生しました。",
      errorFetchingTags: "タグの取得中にエラーが発生しました。",
      errorFetchingKanbans: "カンバンの取得中にエラーが発生しました。",
      errorFilteringContactsByTag: "ラベルによる連絡先のフィルタリング中にエラーが発生しました。",
      errorFilteringContactsByKanban: "カンバンによる連絡先のフィルタリング中にエラーが発生しました。",
      destiny: "目的地の番号を入力してください"
    }
  },
  massaTextoVariavel: {
    form: {
      availableFunctions: "BaileysとWhatsapp-Web.JSで利用可能な機能",
      minSeconds: "最小（秒）",
      maxSeconds: "最大（秒）",
      includeText: "テキストを含める",
      includeMedia: "メディアを含める（URL）",
      mediaUrl: "メディアURL",
      mediaDescription: "メディアの説明",
      includeRecordedAudio: "録音した音声を含める",
      audioUrl: "オーディオ URL (.ogg)",
      includeFile: "ファイルを含める（アップロード）",
      recordedAudio: "録音された音声",
      send: "送信する",
      clear: "掃除する",
      dataInputLabel: "数値、変数1、変数2、変数3...",
      instructions: "メディア メッセージ/説明を入力し、変数を二重中括弧で囲んで使用します。",
      example: "例: こんにちは、var1!あなたのステータスは var2 で、年齢は var3 です..."
    },
    notifications: {
      enterValidNumbers: "最小値と最大値に有効な数値を入力してください。",
      destiny: "目的地の番号を入力してください。",
      chooseSendOption: "配送オプションを 1 つ以上選択してください。",
      enterMessage: "送信するメッセージを入力してください。",
      enterMediaDetails: "アップロードするファイルのURLと説明を入力してください。",
      enterAudioDetails: "アップロードするファイルのURLを入力してください。",
      uploadFile: "ファイルをアップロードし、送信される説明を入力してください。",
      uploadingMessages: "しばらくお待ちください。メッセージを読み込んでいます。",
      messagesSent: "送信されたメッセージ: {sent} / {total}。"
    }
  },
  massaTemplate: {
    title: "大量郵送",
    form: {
      selectTemplate: "テンプレートを選択",
      selectTag: "ラベルを選択",
      fetchingContacts: "しばらくお待ちください。連絡先を読み込んでいます...",
      numbersCommaSeparated: "カンマで区切られた数字",
      importCSV: "CSVをインポート",
      minSeconds: "最小（秒）",
      maxSeconds: "最大（秒）",
      contacts: "連絡先",
      selectConnection: "接続を選択",
      errorFetchingTags: "ラベルの読み込みエラー",
      chooseTemplate: "テンプレートを選択",
      headerFormat: "ヘッダー形式: {format}",
      variableNumber: "価値",
      closeTicket: "送信後にチケットを閉じる"
    },
    notifications: {
      chooseMinTime: "最小時間を選択してください。",
      chooseMaxTime: "最小時間よりも長い最大時間を選択してください。",
      chooseConnection: "接続を選択してください。",
      chooseContact: "連絡先を選択してください。",
      messagesSent: "送信されたテンプレート: {sent} / {total}。",
      errorSendingTemplate: "テンプレートの送信中にエラーが発生しました。",
      uploadingMessages: "しばらくお待ちください。メッセージを送信しています... 送信が完了するまでこのページを閉じないでください。",
      uploadingTemplate: "お待ちください。テンプレートを読み込んでいます...",
      errorFetchingTags: "タグの取得中にエラーが発生しました。",
      errorUploadingCSV: "CSVファイルのアップロード中にエラーが発生しました。",
      invalidFileType: "無効なファイルタイプです。CSVファイルのみが許可されています。",
      csvUploadedSuccessfully: "CSVファイルが正常にアップロードされました。",
      errorProcessingCSV: "CSVファイルの処理中にエラーが発生しました。",
      errorReadingFile: "ファイルの読み取り中にエラーが発生しました。",
      invalidCSVContent: "無効なCSVコンテンツです。",
      noValidNumbersFound: "CSVファイルに有効な番号が見つかりませんでした。"
    },
    table: {
      variable: "変数",
      value: "価値"
    }
  },
  massaTemplateVariavel: {
    title: "変数を使用した一括メール送信",
    form: {
      availableFunctions: "この機能は公式API（WABA）で利用可能です",
      chooseTemplate: "テンプレートを選択",
      minSeconds: "最小（秒）",
      maxSeconds: "最大（秒）",
      numberFormat: "数値（形式：数値、変数1、変数2）",
      fetchingTemplates: "テンプレートを読み込んでいます..."
    },
    notifications: {
      messagesSent: "送信されたテンプレート: {sent} / {total}。",
      uploadingMessages: "しばらくお待ちください。メッセージを送信しています...送信が完了するまでこのページを閉じないでください。",
      chooseConnection: "接続を選択してください。",
      chooseTemplate: "テンプレートを選択してください。",
      completeFields: "必須項目をすべて入力してください。",
      sendingCompleted: "提出が完了しました。",
      errorFetchingTemplates: "テンプレートの読み込み中にエラーが発生しました。 API 接続を確認してください。"
    },
    variables: {
      templateVariables: "テンプレート変数",
      expectedFormat: "各行の想定される形式: 数値、{変数}"
    }
  },
  sessao: {
    compactView: "コンパクトビュー",
    normalView: "ノーマルビュー",
    page: "ページ",
    title: "コミュニケーションチャネル",
    addChannel: "チャンネルを追加",
    defaultConnection: "標準接続",
    editChannel: "チャンネルを編集",
    revalidateWebhook: "Webhookの再検証",
    revalidateCoexWebhook: "COEX Webhookの再検証",
    revalidateConnection: "接続の再検証",
    coexWebhookRevalidated: "COEX Webhookの再検証が正常に完了しました！",
    metaTokenNotFound: "Metaトークンが見つかりません。設定セクションでトークンを設定してください。",
    phoneNumberIdNotFound: "電話番号IDが見つかりません。",
    chatbot: "チャットボット",
    queue: "列",
    user: "ユーザー",
    qrCode: "QRコード",
    connect: "接続する",
    edit: "編集",
    newQrCode: "新しいQRコード",
    connecting: "接続中",
    disconnect: "切断",
    deleteConnection: "接続を削除",
    setAsDefault: "デフォルトとして設定",
    closeOpenTickets: "開いているサービスをすべて閉じる",
    closePendingTickets: "保留中の通話をすべて閉じる",
    syncMessagesUpdate: "メッセージの同期時間を更新",
    syncMessages: "メッセージを同期する",
    syncPrompt: "注意！！本当に同期しますか? ",
    syncMessagesPrompt: "インポートできるメッセージの制限",
    syncWarningPrompt: "チャットリストのサイズによっては、このプロセスに数分かかる場合があります。",
    syncMessagesHint: "正の数のみが許可されます",
    noQueueTooltip: "キューは、サービスに手動またはチャットボットによって定義されたキューがまだない場合にのみ割り当てられます。",
    noUserTooltip: "ユーザーが割り当てられるのは、サービスに担当者が手動またはチャットボットによってまだ定義されていない場合のみです。",
    processStarted: "プロセスが開始されました。",
    closingOpenTickets: "空いている予定を閉じます。",
    closingPendingTickets: "保留中のサービスを終了します。",
    syncingMessages: "しばらくお待ちください。システムはユーザーごとに {limit} 件のメッセージをインポートします。",
    syncError: "メッセージを同期中にエラーが発生しました。",
    invalidValue: "ユーザーが入力した値が無効であるか、指定されていません。",
    actionError: "アクションを実行しようとしたときにエラーが発生しました。",
    actionSuccess: "アクションは正常に実行されました。",
    noPageConfigured: "ページが設定されていません。",
    selectChatbot: "チャットボットを選択",
    selectQueue: "キューを選択",
    selectUser: "ユーザーを選択",
    defaultTooltip: "この接続をデフォルトとして設定します。",
    deleteTooltip: "この接続を完全に削除します。",
    syncTooltip: "古いメッセージを同期します。",
    actionWarningDelete: "注意！この接続を本当に削除しますか?",
    disconnectWarning: "注意！このセッションを切断してもよろしいですか?",
    defaultSet: "接続がデフォルトに正常に設定されました。",
    closeOpenTicketsPrompt: "注意！！このチャネルからのオープンコールをすべて閉じてもよろしいですか?",
    closePendingTicketsPrompt: "注意！！このチャネルからの保留中の通話をすべて閉じてもよろしいですか?",
    disconnectPrompt: "注意！！本当に切断しますか?",
    deleteChannelPrompt: "注意！！本当に削除しますか?",
    deleteChannelMessage: "このチャネルで開いているチャットは閉じられ、サポート パネルで確認できますが、アクセスできなくなります。",
    tokenRequiredTelegram: "Telegramのトークンを通知する必要があります。",
    qrCodeGenerated: "QR コードが正常に生成されました。",
    errorGeneratingQrCode: "QR コードの生成中にエラーが発生しました。",
    whatsappSaveError: "WhatsApp番号の保存中にエラーが発生しました。",
    whatsappSaved: "接続が正常に追加されました。"
  },
  sessaoItemStatus: {
    waitingQrCode: "QRコードの読み取りを待っています",
    clickQrCodeButton: "「QRコード」ボタンをクリックし、携帯電話でQRコードを読み取ってセッションを開始します。",
    disconnectedError: "このチャネルの通信を開始できませんでした。",
    whatsappDisconnected: "携帯電話がインターネットに接続されていることを確認してもう一度試すか、新しい QR コードをリクエストしてください。",
    wabaDisconnected: "もう一度接続してみてください。エラーが解決しない場合は、トークンが正しいことを確認してください。",
    telegramDisconnected: "もう一度接続してみてください。エラーが解決しない場合は、トークンが正しいことを確認してください。",
    instagramDisconnected: "もう一度接続してみてください。エラーが解決しない場合は、資格情報が正しいことを確認してください。",
    connectionEstablished: "接続が確立されました",
    noDataLoading: "データを読み込んでいます...",
    lostConnection: "携帯電話の接続が失われました",
    checkPhoneConnection: "携帯電話がインターネットに接続され、WhatsApp が開いていることを確認するか、「切断」ボタンをクリックして新しい QR コードを取得してください。",
    establishingConnection: "接続を確立しています。",
    mightTakeTime: "しばらく時間がかかるかもしれません...",
    lastUpdate: "最終更新日",
    contingencyInactive: "緊急時対応"
  },
  sessaoModalQrcode: {
    title: "QRコードをスキャンしてセッションを開始してください",
    pairingCode: "ペアリングコード: ",
    waitingQrCode: "QRコードを待っています",
    openQrCodeInNewTab: "QRコードを新しいタブで開く",
    qrCodeIssue: "読み取りに問題がある場合は、新しい QR コードをリクエストしてください。",
    newQrCode: "新しいQRコード"
  },
  sessaoModalWhatsapp: {
    messengerPageId: "MessengerページID",
    appId: "App ID",
    instagramId: "Instagram ID",
    tokenInstagram: "Instagramトークン",
    tokenNumber: "トークン番号",
    idNumber: "ID番号",
    novo: {
      configuracaoSmtp: "SMTP設定",
      servidorSmtp: "SMTPサーバー",
      exemploSmtp: "例: smtp.gmail.com",
      porta: "ポート",
      exemploPorta: "例: TLS用587、SSL用465",
      conexaoSegura: "セキュア接続 (SSL/TLS)",
      habilitarConexaoSegura: "セキュア接続を有効化",
      usuarioEmail: "ユーザー/メール",
      seuEmailAutenticacao: "認証用メールアドレス",
      senha: "パスワード",
      senhaAplicativo: "パスワードまたはアプリパスワード",
      emailRemetente: "送信者メール",
      emailRemetenteHint: "送信者として表示されるメール",
      emailResposta: "返信用メール (オプション)",
      emailRespostaHint: "返信が送られるメールアドレス",
      configuracaoOAuth2: "OAuth2設定 (Gmail推奨)",
      clientIdOAuth2: "Google Cloud ConsoleのクライアントID",
      clientIdOAuth2Hint: "Google Cloud ConsoleのクライアントID",
      exemploClientIdOAuth2: "例: 123456789-abcdef.apps.googleusercontent.com",
      clientSecretOAuth2: "Google Cloud Consoleのクライアントシークレット",
      clientSecretOAuth2Hint: "Google Cloud Consoleのクライアントシークレット",
      redirectUri: "リダイレクトURI (オプション)",
      redirectUriHint: "OAuth2用コールバックURL (デフォルトを使用する場合は空白)",
      exemploRedirectUri: "例: https://yourdomain.com/auth/callback",
      comoObterCredenciaisOAuth2: "OAuth2認証情報の取得方法:",
      acessarGoogleCloudConsole: "https://console.cloud.google.com にアクセス",
      criarProjeto: "新しいプロジェクトを作成、または既存のものを選択",
      habilitarGmailAPI: "Gmail APIを有効化",
      criarCredenciaisOAuth2: "OAuth2認証情報を作成",
      configureUrlsAutorizadas: "許可されたURLを設定",
      gmailOAuth2: "Gmail OAuth2:",
      gmailOAuth2Hint: "GmailはサードパーティアプリにOAuth2認証を要求します。",
      configurarOAuth2: "OAuth2を設定",
      status: "ステータス:",
      statusHint: "認証済みで動作中",
      oAuth2Configurado: "OAuth2設定済み:",
      oAuth2ConfiguradoHint: "Gmail用OAuth2認証が有効です。",
      protocoloAtivo: "有効なプロトコル:",
      statusDaConexao: "接続ステータス:",
      detalhes: "詳細:",
      testarSmtp: "SMTPをテスト",
      verificarStatus: "ステータスを確認",
      abraUrlAutorizacao: "認可URLを開き、指示に従ってください。認可後、コードを受け取ります。",
      errorConfigurarOAuth2: "OAuth2設定エラー: ",
      configOAuth2: "OAuth2設定",
      completarConfiguracao: "設定を完了",
      cancelar: "キャンセル",
      errorCompletarOAuth2: "OAuth2完了エラー: ",
      salveWhatsAppPrimeiro: "SMTP接続をテストする前にWhatsAppを保存してください",
      conexaoSmtpTestadaComSucesso: "SMTP接続が正常にテストされました！",
      falhaNoTesteSmtp: "SMTPテスト失敗: ",
      erroAoTestarSmtp: "SMTPテスト中にエラー発生: ",
      statusDaConexaoAtualizado: "接続ステータスが更新されました！",
      erroAoVerificarStatus: "ステータス確認中にエラー発生: "
    },    
    selectNewChannel1: "対応の転送は、ボリュームが多い場合や異なる種類（API）のチャネル間で行う場合に同期の問題が発生する可能性があります。その場合は、事前に対応のバックアップを取り、すべての対応が転送されたことを確認するまで古いチャネルを削除しないでください。",
    selectNewChannel2: "対応を転送する新しいチャネルを選択してください。注意！この操作は取り消せません。",
    selectNewChannel3: "対応のボリュームが多い、または異なる種類（API）のチャネル間である場合は、DBAの支援を受けてデータベース内で直接データを変更してください。",
    transferringChannels: "通話を転送しています...",
    checkErrors: "おっと！エラーを確認してください...",
    whatsappSaved: "繋がり ",
    sucess: " 成功しました！",
    edited: "編集済み",
    created: "作成された",
    variables: "変数",
    attentionEvo: "Evolution チャネルを作成すると、名前を編集できなくなります。スペースや特殊文字は自動的に削除されるため、使用しないでください。",
    title: "チャンネルの追加または編集",
    editChannel: "チャンネルの追加または編集",
    createChannel: "チャンネルの追加または編集",
    configureAfterCreate: "このフィールドは、チャンネル作成後に設定できます",
    type: "タイプ",
    tokenTelegram: "テレグラムトークン",
    pairingCode: "ペアリングコード",
    exactNumber: "正確なWhatsAppアカウント番号",
    informationTab: "情報",
    recommendationsTab: "推奨事項",
    wppWarning: {
      0: "WhatsApp をシステムに接続する前に、WhatsApp Web への接続を削除してください。",
      1: "スマートフォンによって異なります",
      2: "定期的な再接続が必要です。",
      3: "完璧な操作のためには、携帯電話を同期し、常にオンにしてインターネットに接続し、スクリーン セーバーを無効にして、WhatsApp アプリを開いたままにしておきます。",
      4: "携帯電話の不要な会話や古い会話をアーカイブする",
      5: "Chrome ブラウザと Windows オペレーティング システムの使用をお勧めします。",
      6: "プラットフォーム上で同期された番号で別のブラウザの WhatsApp Web を開かないでください。このような事態が発生すると、操作に影響が出る可能性があります。",
      7: "非公式サービス",
      8: "定期的な再接続が必要",
      9: "ブラジルとあなたの州にあるVPSを使用することをお勧めします",
      10: "Chrome ブラウザと Windows オペレーティング システムの使用をお勧めします。",
      11: "メッセージの損失や受信などの同期の問題が発生する可能性があります"
    },
    wabaAdvantages: {
      0: "接続安定性の保証",
      1: "禁止されるリスクはありません",
      2: "アカウント盗難に対するセキュリティ",
      3: "ボタンの使用を許可する",
      4: "テンプレートの使用を許可する"
    },
    typeMessage: "メッセージを入力してください",
    save: "保存",
    user: "ユーザー",
    numberId: "電話番号識別",
    bmId: "WhatsApp Businessアカウントの識別",
    apiVersion: "メタAPIバージョン",
    tokenWaba: "Metaビジネスマネージャートークン",
    igData: "Instagramアカウントの詳細",
    transferChannel: "転送チャネル",
    selectNewChannel: "通話を転送するには新しいチャネルを選択してください",
    newChannel: "新しいチャンネル",
    confirm: "確認する",
    attention: "注意",
    cancel: "キャンセル",
    timeSelection: "時間を選択",
    birthdayDateMessage: "誕生日メッセージ",
    selectHub: "ハブを選択",
    importMessage: "デバイスからメッセージをインポートする",
    importMessageCaption: "このオプションを有効にすると、デバイスからのメッセージがシステムにインポートされます。",
    importGroupMessage: "グループメッセージをインポート",
    dateHourSync: "インポート開始日時",
    queueImport: "メッセージをインポートするキュー",
    qrCodeWarning1: "このイベントは QRCode を読み取るときにのみ機能します。",
    qrCodeWarning2: "インポート中は、内部チャットボットやその他のインタラクションをオフにし、稼働時間をオープンにしておきます。システムに入るすべてのメッセージは、これらの設定がアクティブであればそれらとやり取りするからです。",
    ok: "わかりました",
    dateHourEndSync: "インポート終了日時",
    finalizeTicket: "インポート後のチケットのクローズ",
    chatGptConfig: {
      model: "ChatGPTテンプレート",
      title: "ChatGPT設定",
      apiKey: "ChatGPT APIキー",
      organizationKey: "ChatGPT組織キー",
      stopWord: "ChatGPTをオフにする言葉",
      prompt: "オプション1：ChatGPTプロンプト",
      resetHistory: "ChatGPT履歴を復元する",
      assistantOption: "オプション2：ChatGPTアシスタント",
      assistantId: "アシスタントIDを入力してください",
      resetPrompt: "プロンプトを変更した後、以下のボタンをクリックして ChatGPT 履歴を復元する必要があります。",
      removeAssistant: "削除ウィザード",
      voiceModel: "音声モデル（アロイ、エコー、フェイブル、オニキス、ノヴァ、シマー）",
      chatgptVoice: "音声応答を有効にする（ChatGPT Voice）"
    },
    lmConfig: {
      title: "LM Studioの設定",
      url: "LMスタジオURL",
      model: "LLMモデル",
      stopWord: "LM Studioをオフにする言葉",
      prompt: "LLMのプロンプト"
    },
    geminiConfig: {
      title: "ジェミニ設定",
      url: "ジェミニAPIキー",
      model: "ジェミニモデル",
      stopWord: "ジェミニをオフにする言葉",
      prompt: "ジェミニのプロンプト"
    },
    qwenConfig: {
      title: "Qwen設定",
      url: "Qwen APIキー",
      model: "Qwenモデル",
      stopWord: "Qwenをオフにする言葉",
      prompt: "Qwenのプロンプト"
    },
    claudeConfig: {
      title: "クロードの設定",
      url: "クロードのAPIキー",
      model: "クロードのモデル",
      stopWord: "クロードを止める言葉",
      prompt: "クロードへのプロンプト"
    },
    deepseekConfig: {
      title: "ディープシーク設定",
      url: "Deepseek APIキー",
      model: "Deepseekモデル",
      stopWord: "Deepseekをオフにする言葉",
      prompt: "Deepseekのプロンプト"
    },
    grokConfig: {
      title: "Grok設定",
      url: "Grok APIキー",
      model: "Grokモデル",
      stopWord: "Grokをオフにする言葉",
      prompt: "Grokのプロンプト"
    },
    ollamaConfig: {
      title: "オラマ設定",
      url: "オラマ URL",
      model: "LLMモデル",
      stopWord: "オラマをオフにする言葉",
      prompt: "LLMのプロンプト"
    },
    proxyConfig: {
      useProxy: "プロキシを使用する",
      proxyUrl: "プロキシURL",
      proxyUser: "プロキシユーザー",
      proxyPass: "プロキシパスワード"
    },
    enable: {
      webPush: "Webプッシュを有効にする（ベータ版）",
      webPush2: "このオプションを有効にすると、システムはアプリケーションに通知を送信します",
      contingency: "緊急時対応",
      contingency2: "アクティブの場合：チャネルはアクティブでメッセージを受信します。非アクティブの場合：チャネルは接続されたままですが、メッセージを受信しません。",
      autoEvaluation: "自動評価を有効にする",
      autoEvaluation2: "このオプションを有効にすると、各チケットを解決するときにサービス評価が自動的に送信されます。",
      transcribeAudio: "音声文字変換を有効にする",
      transcribeAudio2: "このオプションを有効にすると、受信した音声が文字起こしされます。",
      transcribeAudio5: "JSON構成",
      transcribeAudio4: "Google Speech-To-Text の設定を JSON 形式で入力します。",
      transcribeAudio3: "オーディオトランスクリプション設定 (JSON)",
      autoDistribution: "自動配布を有効にする",
      autoDistribution2: "このオプションを有効にすると、新しいチケットがシステムの担当者間で均等に分配されます。",
      destroyMessage: "メッセージの破棄を有効にする",
      destroyMessage2: "このオプションを有効にすると、削除されたメッセージはシステムから破棄されます。",
      birthdayMessage: "誕生日の人にメッセージを送信できるようにする",
      birthdayMessage2: "連絡先の誕生日にこのオプションを有効にすると、以下のフィールドで定義されたメッセージが送信されます。",
      birthdayMessage3: "誕生日メッセージ",
      birthdayMessage4: "メッセージ",
      birthdayMessage5: "ファイル（チャンネル作成後にファイルをアップロードしてください）",
      birthdayMessage6: "ファイルを選択",
      birthdayMessage7: "時間: システムは分を考慮しません (完全な時刻を入力してください - 例: 12:00):",
      birthdayMessage8: "時間を選択してください",
      ignoreBussinesHours: "営業時間を無視",
      ignoreBussinesHours2: "システムの営業時間を無視します。",
      removeBirthdayFile: "誕生日メッセージのファイルを削除",
      confirmRemoveBirthdayFile: "削除を確認",
      confirmRemoveBirthdayFileMessage: "誕生日メッセージのファイルを削除してもよろしいですか？",
      birthdayFileRemoved: "誕生日メッセージのファイルが削除されました！",
      externalIntegration: "外部統合の自動シャットダウンを有効にする",
      externalIntegration2: "このオプションを有効にすると、サービスを開いたときに、ChatGPT、Typebot、Dify、N8N、DialogFlow のインタラクションがオフになります。",
      waitProcessExternalInteraction: "外部統合（Typebot、ChatGPTなど）によるメッセージ処理の待機を有効にする",
      waitProcessExternalInteraction2: "サポートで複数のメッセージを受信した場合、システムは最初のメッセージに返信した後にのみ新しいメッセージを処理します。その間に受信されたメッセージは外部統合とやり取りしません。"
    },
    farewell: "別れ",
    farewellMessage: "サービス終了のメッセージ",
    automaticClosure: "自動クローズのキーワード",
    automaticClosure2: "これは、受信されるとチケットが自動的に閉じられるキーワードです。",
    wavoipWarn: "複数のトークンを接続するには、キーをコンマで区切って入力します (token1,token2...)",
    whatsappTypes: {
      waba: "WhatsApp公式（WABA）",
      baileys: "WhatsApp ベイリーズ (QRコード)",
      whatsapp: "WhatsApp WebJs（QRコード）",
      meow: "WhatsApp Meow（QRコード - ベータ版）",
      evo: "WhatsApp Evolution (QRCode - ベータ版)",
      telegram: "電報",
      hub: "ハブ通知"
    },
    conectLimit: "接続制限に達しました",
    saveError: "チャンネルの保存中にエラーが発生しました。もう一度お試しください。",
    wabaError: "おっと！ WABA データが正しくありません。BM 内の APP 識別子、トークン、および権限が正しいかどうかを確認してください...",
    instagramError: "おっと！ Instagram データが正しくありません。Page ID、トークン、および権限が正しいかどうか、また Instagram Business アカウントが Facebook ページにリンクされているかどうかを確認してください...",
    integrationUrlCopied: "統合 URL をコピーしました。",
    attentionMessage: "本当にすべてのサービスを新しいチャネルに転送しますか?この操作は元に戻せません。",
    noChannelSelected: "新しいチャンネルを選択してください!",
    newChannelSuccess: "チャンネルの転送に成功しました!",
    connectionError: "チャネルの転送中にエラーが発生しました。もう一度お試しください。",
    autoDistributeInfo: "利用可能なエージェント間でチケットを自動的に配布します。",
    transcribeAudioInfo: "受信した音声をテキストに自動転記します。",
    birthdayMessageInfo: "連絡先に誕生日メッセージを自動的に送信するための設定。",
    farewellInfo: "サービスを閉じるときに自動的に送信されるメッセージ。",
    confirmChannelTransfer: "このチャネルに通話を転送してもよろしいですか?",
    importMessagesInfo: "デバイスからシステムにメッセージをインポートします。",
    importGroupsInfo: "インポート時にグループ メッセージを含めます。",
    externalIntegrationDisableInfo: "通話を開始するときに外部統合を自動的に無効にします。",
    dialogflowConfig: {
      projectId: "Dialogflow プロジェクト ID",
      language: "言語",
      jsonFile: "JSON 構成ファイル",
      jsonContent: "JSONファイルの内容"
    },
    wavoip: {
      title: "Wavoip設定",
      token: "Wavoipトークン",
      info: "複数のアカウントの場合は、コンマで区切られたトークンを追加します。"
    },
    hubConfig: {
      title: "ハブ設定",
      selectHub: "ハブを選択",
      hubIntegration: "NotificaMeハブの設定"
    },
    n8nConfig: {
      title: "N8N設定",
      url: "N8N URL",
      instructions: "このセクションでは、N8N との統合フローを構成します。"
    },
    dialogConfig: {
      title: "Dialogflow設定",
      key: "Dialogflow APIキー",
      url: "ダイアログフロー URL",
      name: "Dialogflowのボット名",
      restartWord: "Dialogflowを再起動する",
      stopWord: "Dialogflowをオフにする",
      jsonContent: "JSONファイルの内容",
      jsonFile: "JSONファイル名",
      lang: "言語",
      projectId: "プロジェクトID",
      buttonWarning: "このオプションを有効にすると、Dialogflow オプションにボタンが送信され、それ以外の場合はリストが送信されます。"
    },
    typeConfig: {
      title: "タイプボットの設定",
      key: "タイプボット API キー",
      url: "タイプボットURL",
      name: "Typebotのボット名",
      restartWord: "Typebotを再起動するための単語",
      stopWord: "タイプボットをオフにする言葉",
      type: "構成タイプ",
      unknowMessage: "無効な応答のメッセージ",
      buttonChoose: "ボタン選択のメッセージ",
      buttons: "有効化ボタン",
      buttonWarning: "このオプションを有効にすると、ボタンが Typebot オプションに送信され、それ以外の場合はリストが送信されます。"
    },
    difyConfig: {
      title: "Dify設定",
      key: "Dify APIキー",
      url: "URLを分割する",
      restartWord: "Difyを再起動するための単語",
      stopWord: "Difyをオフにする言葉",
      type: "構成タイプ",
      typeOptions: {
        agent: "エージェント",
        textGenerator: "テキストジェネレーター",
        chatBot: "チャットボット",
        workflow: "流れ"
      }
    },
    additionalSettings: {
      title: "非公式サービスのための追加レイヤー",
      proxy: {
        useProxy: "プロキシを使用する",
        proxyUrl: "プロキシ URL (https://177.69.214.155:53281)",
        proxyUser: "プロキシユーザー",
        proxyPass: "プロキシパスワード"
      }
    },
    waiting: "しばらくお待ちください。チャンネルを作成しています...",
    errors: {
      invalidJson: "入力された JSON 形式が無効です。修正してもう一度お試しください。",
      requiredField: "この項目は必須です。",
      operationFailed: "操作は失敗しました。もう一度お試しください。"
    },
    success: {
      operationCompleted: "操作は正常に完了しました!",
      channelSaved: "チャンネルは正常に保存されました。",
      transferCompleted: "転送が正常に完了しました。"
    },
    variaveis: {
      0: {
        label: "名前",
        value: "{{名前}}"
      },
      1: {
        label: "挨拶",
        value: "{{挨拶}}"
      },
      2: {
        label: "プロトコル",
        value: "{{プロトコル}}"
      },
      3: {
        label: "メールアドレス（可能な場合）",
        value: "{{Eメール}}"
      },
      4: {
        label: "電話",
        value: "{{電話番号}}"
      },
      5: {
        label: "カンバン（ある場合）",
        value: "{{カンバン}}"
      },
      6: {
        label: "付き添い者（付き添いの場合）",
        value: "{{ユーザー}}"
      },
      7: {
        label: "担当者のメールアドレス（サービス中の場合）",
        value: "{{ユーザーメールアドレス}}"
      },
      8: {
        label: "名（ある場合）",
        value: "{{ファーストネーム}}"
      },
      9: {
        label: "姓（ある場合）",
        value: "{{苗字}}"
      },
      10: {
        label: "会社名（ある場合）",
        value: "{{ビジネス名}}"
      }
    },
    variaveisAniversario: {
      0: {
        label: "名前",
        value: "{{名前}}"
      },
      1: {
        label: "挨拶",
        value: "{{挨拶}}"
      },
      2: {
        label: "メールアドレス（可能な場合）",
        value: "{{Eメール}}"
      },
      3: {
        label: "電話",
        value: "{{電話番号}}"
      },
      4: {
        label: "名（ある場合）",
        value: "{{ファーストネーム}}"
      },
      5: {
        label: "姓（ある場合）",
        value: "{{苗字}}"
      },
      6: {
        label: "会社名（ある場合）",
        value: "{{ビジネス名}}"
      }
    }
  },
  sessaoTenant: {
    communicationChannels: "コミュニケーションチャネル",
    tenant: "テナント",
    name: "名前",
    status: "状態",
    session: "セッション",
    number: "番号",
    lastUpdate: "最終更新日",
    default: "標準",
    actions: "アクション",
    editConnection: "接続を編集",
    deleteConnection: "接続を削除",
    deleteAttention: "注意！！本当に削除しますか?",
    deleteWarning: "すでにその WhatsApp で通話を生成している場合は、削除しないことをお勧めします。",
    yes: "はい",
    no: "いいえ",
    errorLoadingColors: "色の読み込みエラー"
  },
  sessaoTenantStatus: {
    waitingQrCode: "QRコードの読み取りを待っています",
    clickQrCodeButton: "「QRコード」ボタンをクリックし、携帯電話でQRコードをスキャンしてセッションを開始します。",
    connectionFailed: "このチャネルの通信を開始できませんでした。",
    whatsappCheck: "携帯電話がインターネットに接続されていることを確認してもう一度お試しください。または、新しいQRコードをリクエストしてください。",
    telegramCheck: "もう一度接続してみてください。エラーが解決しない場合は、トークンが正しいことを確認してください。",
    instagramCheck: "もう一度接続してみてください。エラーが解決しない場合は、資格情報が正しいことを確認してください。",
    connectionEstablished: "接続が確立されました!",
    connectionLost: "携帯電話の接続が失われました",
    ensureInternet: "携帯電話がインターネットに接続され、WhatsAppが開いていることを確認するか、「切断」ボタンをクリックして新しいQRコードを取得してください。",
    establishingConnection: "接続を確立しています。",
    thisMayTakeTime: "しばらく時間がかかるかもしれません...",
    lastUpdate: "最終更新日:"
  },
  relatorioContatosAtendimento: {
    unknownChannel: '不明なチャンネル',
    yes: "はい",
    no: "いいえ",
    sheetName: "報告",
    sheetTitle: " サービスレポート",
    title: "チケットレポート",
    filtersLegend: "フィルター（チケット作成日）",
    startDate: "始める",
    endDate: "終わり",
    status: {
      status: "状態",
      open: "開ける",
      closed: "閉鎖",
      pending: "保留中"
    },
    queues: "キュー",
    channels: "チャンネル",
    demands: "要求",
    connections: "接続",
    users: "ユーザー",
    minValue: "最小値",
    maxValue: "最大値",
    generateButton: "生成するには",
    printButton: "印刷",
    excelButton: "エクセル",
    selectStatus: "ステータスを選択",
    selectQueues: "キューを選択",
    selectChannels: "チャンネルを選択",
    selectDemands: "要求を選択",
    selectConnections: "接続を選択",
    selectUsers: "ユーザーを選択",
    inputMinValue: "最小値を入力してください",
    inputMaxValue: "最大値を入力してください",
    tableHeaders: {
      ticketNotes: "観察",
      id: "ID",
      status: "状態",
      name: "名前",
      number: "番号",
      connection: "繋がり",
      lastMessage: "最後のメッセージ",
      unreadMessages: "未読メッセージ",
      demand: "要求",
      queues: "キュー",
      channel: "チャネル",
      value: "価値",
      creationDate: "作成日"
    },
    notifications: {
      loadError: "データの読み込み中にエラーが発生しました。",
      noDates: "日付を入力してレポートを生成します。",
      noQueues: "レポートを生成するキューを選択します。",
      reportGenerated: "レポートが正常に生成されました。",
      exportingError: "テーブルのエクスポート中にエラーが発生しました。",
      exportSuccess: "レポートが正常にエクスポートされました。",
      exportError: "レポートのエクスポート中にエラーが発生しました。もう一度お試しください。",
      loadingMotives: "要求の読み込み中に問題が発生しました。",
      loadingUsers: "ユーザーの読み込み中に問題が発生しました。",
      loadingQueues: "キューの読み込み中にエラーが発生しました。"
    }
  },
  relatorioContatosCarteira: {
    sheetName: "報告",
    sheetTitle: " サービスレポート",
    title: "ポートフォリオ別連絡先レポート",
    filters: "フィルター",
    tableHeaders: {
      name: "名前",
      whatsapp: "ワッツアップ",
      email: "Eメール",
      wallets: "ウォレット"
    },
    generateButton: "レポートを生成する",
    printButton: "印刷",
    excelButton: "Excelにエクスポート",
    notifications: {
      selectWallet: "エラー...レポートを生成するには、少なくとも 1 つのポートフォリオを選択する必要があります。",
      reportGenerated: "レポートが正常に生成されました。"
    }
  },
  relatorioContatosEstado: {
    sheetName: "報告",
    sheetTitle: " サービスレポート",
    title: "州別接触レポート",
    filters: "フィルター",
    tableHeaders: {
      name: "名前",
      whatsapp: "ワッツアップ",
      email: "Eメール",
      state: "州"
    },
    generateButton: "レポートを生成する",
    printButton: "印刷",
    excelButton: "Excelにエクスポート",
    notifications: {
      selectState: "エラー...レポートを生成するには、少なくとも 1 つの州を選択する必要があります。",
      reportGenerated: "レポートが正常に生成されました。"
    }
  },
  relatorioContatosEtiqueta: {
    sheetName: "報告",
    sheetTitle: " サービスレポート",
    title: "タグ別連絡先レポート",
    filters: "フィルター",
    tableHeaders: {
      name: "名前",
      whatsapp: "ワッツアップ",
      email: "Eメール",
      tags: "タグ"
    },
    generateButton: "レポートを生成する",
    printButton: "印刷",
    excelButton: "Excelにエクスポート",
    notifications: {
      selectTags: "エラー...レポートを生成するには、少なくとも 1 つのラベルを選択する必要があります。",
      reportGenerated: "レポートが正常に生成されました。"
    }
  },
  relatorioContatosGeral: {
    sheetName: "報告",
    sheetTitle: " サービスレポート",
    title: "連絡先レポート",
    filters: "フィルター（連絡先作成日）",
    tableHeaders: {
      empty: "空の",
      extraInfo: "追加情報",
      name: "名前",
      whatsapp: "ワッツアップ",
      email: "Eメール"
    },
    generateButton: "レポートを生成する",
    printButton: "印刷",
    excelButton: "Excelにエクスポート",
    notifications: {
      reportGenerated: "レポートが正常に生成されました。"
    }
  },
  relatorioContatosResumo: {
    sheetName: "報告",
    sheetTitle: " サービスレポート",
    title: "ユーザーサービス概要レポート",
    filters: "フィルター（サービス日）",
    tableHeaders: {
      name: "名前",
      email: "Eメール",
      pending: "保留中",
      inProgress: "稼働中",
      resolved: "解決済み",
      total: "合計"
    },
    generateButton: "レポートを生成する",
    printButton: "印刷",
    excelButton: "Excelにエクスポート",
    notifications: {
      reportGenerated: "レポートが正常に生成されました。"
    }
  },
  relatorioContatosKanban: {
    sheetName: "報告",
    sheetTitle: " サービスレポート",
    title: "カンバンによる連絡レポート",
    filters: "フィルター",
    tableHeaders: {
      name: "名前",
      whatsapp: "ワッツアップ",
      email: "Eメール",
      kanban: "カンバン"
    },
    generateButton: "レポートを生成する",
    printButton: "印刷",
    excelButton: "Excelにエクスポート",
    notifications: {
      reportGenerated: "レポートが正常に生成されました。",
      selectKanban: "おっと...レポートを生成するには、少なくとも 1 つのカンバンを選択する必要があります。"
    }
  },
  webphonecall: {
    callStatus: {
      accept: "承認済み",
      accept_elsewhere: "他のユーザーによって承認されました",
      reject_elsewhere: "他のユーザーによって拒否されました",
      terminate: "完了",
      reject: "拒否",
      outcoming_calling: "呼び出し",
      preaccept: "呼び出し",
      relaylatency: "呼び出し",
      unknown: "未知"
    },
    tooltips: {
      clear: "掃除する",
      close: "閉じる",
      call: "接続するには",
      hangUp: "電源を切る",
      mute: "変異",
      unmute: "ミュート解除"
    },
    labels: {
      keypad: "キーボード",
      display: "画面",
      duration: "間隔"
    },
    placeholders: {
      phoneNumber: "番号を入力してください"
    }
  },
  webphone: {
    callStatus: {
      accept: "承認済み",
      accept_elsewhere: "他のユーザーによって承認されました",
      reject_elsewhere: "他のユーザーによって拒否されました",
      terminate: "完了",
      reject: "拒否",
      outcoming_calling: "呼び出し",
      preaccept: "呼び出し",
      relaylatency: "呼び出し",
      offer: "コールオファー",
      unknown: "未知"
    },
    tooltips: {
      clear: "掃除する",
      close: "閉じる",
      call: "接続するには",
      hangUp: "電源を切る",
      accept: "受け入れる",
      reject: "拒否する",
      mute: "変異",
      unmute: "ミュート解除"
    },
    labels: {
      duration: "間隔",
      caller: "発信者",
      inbox: "受信トレイ",
      phoneNumber: "電話番号"
    },
    placeholders: {
      phoneNumber: "番号を入力してください"
    }
  },
  chatgptField: {
    placeholders: {
      apiKey: "ChatGpt APIキーを入力してください",
      orgId: "組織IDを入力してください",
      offKeyword: "ChatGptをオフにするキーワード",
      prompt: "ChatGptのプロンプト"
    }
  },
  delayField: {
    placeholders: {
      delayValue: "遅延値を秒単位で入力してください"
    }
  },
  n8nField: {
    placeholders: {
      n8nField: "N8Nフィールドの値を入力してください"
    }
  },
  typebotField: {
    placeholders: {
      url: "タイプボットのURLを入力",
      name: "タイプボットの名前を入力してください",
      offKeyword: "タイプボットをオフにするキーワード",
      restartKeyword: "Typebotを再起動するためのキーワード"
    }
  },
  mediaField: {
    labels: {
      uploadFile: "メディア構成メッセージ",
      replaceFile: "ファイルの置換",
      downloadPdf: "PDFをダウンロード",
      captionPlaceholder: "キャプション"
    },
    errors: {
      fileError: "ファイルの読み込みエラー",
      checkFiles: "アップロードしたファイルを確認して、もう一度お試しください。"
    }
  },
  messageField: {
    placeholders: {
      typeMessage: "ここにメッセージを入力してください..."
    },
    tooltips: {
      emoji: "絵文字",
      variables: "変数"
    },
    variables: {
      name: "名前",
      greeting: "挨拶",
      protocol: "プロトコル",
      email: "メールアドレス（可能な場合）",
      phoneNumber: "電話",
      kanban: "カンバン（ある場合）",
      user: "付き添い者（付き添いの場合）",
      userEmail: "担当者のメールアドレス（サービス中の場合）",
      firstName: "名（ある場合）",
      lastName: "姓（ある場合）",
      businessName: "会社名（ある場合）"
    }
  },
  messageOptionField: {
    placeholders: {
      typeMessage: "ここにメッセージを入力してください...",
      options: "オプション"
    },
    hints: {
      options: "オプションは、ターゲット チャネルのサポートに応じて、リスト/ボタンまたはプレーン テキストとして扱われます。"
    },
    tooltips: {
      emoji: "絵文字"
    }
  },
  webhookField: {
    placeholder: "Webhook を追加する (GET)",
    tooltip: {
      variables: "変数"
    },
    variables: {
      name: "名前",
      greeting: "挨拶",
      protocol: "プロトコル",
      email: "メールアドレス（可能な場合）",
      phoneNumber: "電話",
      kanban: "カンバン（ある場合）",
      user: "付き添い者（付き添いの場合）",
      userEmail: "担当者のメールアドレス（サービス中の場合）",
      firstName: "名（ある場合）",
      lastName: "姓（ある場合）",
      businessName: "会社名（ある場合）"
    }
  },
  nodeForm: {
    optionsVariableType: {
      text: "テキスト",
      number: "数値"
    },
    ChatBotBlockField: "チャットボットをブロック",
    OpportunityField: "機会",
    GoogleAgendaField: "Google カレンダー",
    ScheduleField: "スケジュール",
    WebhookAllField: "Webhooks",
    ChatGPTField: "チャットGPT",
    ChatFlowField: "チャットボットフロー",
    MessageField: "メッセージ",
    MediaField: "メディア",
    TypebotField: "タイプボット",
    ChatgptField: "チャットGpt",
    DelayField: "遅れ",
    N8nField: "N8N",
    TagField: "ラベル",
    KanbanField: "カンバン",
    WebhookField: "ウェブフック",
    routeTo: "ルート",
    routeToChatgpt: "キーワードを受信した場合、ルート:",
    key: "鍵",
    redefine: "リセット",
    welcomeMessage: "挨拶メッセージ（キュー/ユーザー）",
    welcomeMessage2: "ボットがキューまたはユーザーにサービスを誘導すると、このメッセージが送信されます。",
    fallbackMessage: "期待される応答が送信されない場合",
    fallbackMessage2: "この例外は、クライアントから送信された応答がステージ条件に従って期待値と一致しない場合に適用されます。",
    keyWord: "フローを開始するためのキーワード",
    keyWord2: "このインタラクションは、クライアントが定義されたキーワードを送信するとトリガーされ、クライアントは構成されたキュー/ユーザーに転送されます。",
    noAnswer: "応答なし",
    noAnswer2: "指定された時間が経過しても顧客が応答しない場合、ボットは指定されたキュー/ユーザーにリクエストを転送します。",
    hourMessage: "不在メッセージ",
    hourMessage2: "指定された時間が経過しても顧客が応答しない場合、以前に選択した設定が TERMINATE であれば、ボットはこのメッセージを送信します。",
    hourMessageWarning: "不在メッセージ（警告）",
    hourMessageWarning2: "指定された時間の半分で、顧客が応答しない場合、ボットはこのメッセージを送信します。",
    messageWarningEnabled: "警告メッセージを有効にする",
    maxAttempts: "ボットの最大試行回数",
    maxAttempts2: "質問/回答の最大再試行回数を超えた後、顧客が有効な応答を送信しない場合、ボットは設定されたキュー/ユーザーに応答を転送します。",
    message: "メッセージ",
    message2: "フィードバックメッセージ",
    firstInteraction: "最初のインタラクションでのターゲティング",
    firstInteraction2: "このインタラクションは顧客との最初のインタラクションでトリガーされ、顧客は設定されたキュー/ユーザーに転送されます。",
    outBussinesHour: "営業時間外の場合",
    outBussinesHour2: "このインタラクションは、顧客がサービス時間外にメッセージを送信した場合にトリガーされ、顧客は設定されたキュー/ユーザーに転送されます。",
    selfDistribution: "自動配信サービス",
    selfDistribution2: "いいえ: 無効",
    selfDistribution3: "ランダム: ユーザーをランダムに設定します。",
    selfDistribution7: "バランス: キュー内のユーザーに対してバランスのとれた方法でユーザーを設定します。",
    selfDistribution4: "いいえ",
    closeTicket: "サービス終了",
    closeTicket2: "お客様が想定される情報の一部を入力すると、サービスは終了します。",
    endMessage: "終了メッセージ（キュー/ユーザー）",
    endMessage2: "ボットがキューまたはユーザーへのサービス提供を終了すると、このメッセージが送信されます。",
    warning1: "ステージは最初の接触を表す",
    warning2: "- これが顧客との最初の接触である場合、システムは",
    warning3: "顧客の情報をカレンダーに自動的に保存します。",
    warning4: "- ボットは顧客が開始したサービスと対話します。",
    warning5: "- サービスがユーザーに引き継がれると、ボットは対話を停止します。",
    warning6: "- Typebot、ChatGPT、 N8N およびチャットボットのブロックとのやり取りは常にステップの最後のノードである必要があります。内部チャットボットはオフになり、サポートは定義された統合で続行されます。",
    warning7: "- 正規表現条件を使用する場合、他の条件よりも前に処理されます。",
    selfDistribution5: "ランダム",
    selfDistribution6: "バランスの取れた",
    selfDistribution8: "順次",
    selfDistribution9: "順次: 利用可能なエージェント間でチケットを順次および回転的に配布します。",
    emoji: "絵文字",
    chatbotBlock: {
      chatbotBlocked: "チャットボットがブロックされました",
      chatbotActive: "チャットボットがアクティブ"
    },
    googleAgenda: {
      selectConfigHint: "Googleカレンダーの設定を選択してください",
      dateType: "日付の種類",
      dateTypeHint: "スケジュール用の日付タイプを選択してください",
      daysFromInteraction: "インタラクションからの日数",
      daysRequired: "日数は必須です",
      daysFromInteractionHint: "スケジュールのためにインタラクションからの日数を入力してください",
      eventTitleHint: "イベントタイトルを入力してください",
      startDateTimeHint: "イベントの開始日時を入力してください",
      endDateTimeHint: "イベントの終了日時を入力してください",
      descriptionHint: "イベントの説明を入力してください",
      locationHint: "イベントの場所を入力してください",
      sendNotifications: "通知を送信する",
      reminderBefore: "リマインダー（前）",
      reminderMinutes: "分前",
      reminderMinutesHint: "通知を送信するイベント前の分数を入力してください",
      today: "今日",
      tomorrow: "明日",
      days_from_interaction: "インタラクションからの日数",
      custom: "カスタム日付"
    },
    opportunity: {
      contactAutoFill: "チケットの連絡先が自動的に入力されます",
      today: "今日",
      tomorrow: "明日",
      days_from_interaction: "インタラクションからの日数",
      custom: "カスタム日付",
      open: "オープン",
      win: "勝利",
      lose: "敗北",
      dateTypeHint: "スケジュール用の日付タイプを選択してください",
      dateType: "日付の種類"
    },
    schedule: {
      scheduleDateRequired: "日付は必須です",
      scheduleType: "スケジュールタイプ",
      scheduleTypeHint: "スケジュールタイプを選択してください",
      scheduleDate: "カスタム日時",
      scheduleDateHint: "スケジュール用のカスタム日時を入力してください",
      uploadImage: "画像をアップロード",
      selectImage: "画像を選択",
      deleteImage: "画像を削除",
      message: "メッセージ",
      messageHint: "スケジュールメッセージを入力してください",
      sendSignature: "署名を送信する",
      includeContactInfo: "連絡先情報を含める",
      advancedSettings: "詳細設定",
      delayBeforeSend: "送信前の遅延",
      delayBeforeSendHint: "遅延値を秒単位で入力してください",
      customSchedule: "カスタム日付",
      thirtyMinutes: "30分",
      oneHour: "1時間",
      tomorrow: "明日",
      nextWeek: "来週",
      nextMonth: "来月"
    },
    webhook: {
      url: "WebhookのURL",
      urlPlaceholder: "WebhookのURLを入力してください",
      urlHint: "WebhookのURLを入力してください",
      httpMethod: "HTTPメソッド",
      httpMethodHint: "WebhookのHTTPメソッドを選択してください",
      headers: "ヘッダー",
      headerKey: "キー",
      headerKeyPlaceholder: "ヘッダーキーを入力してください",
      headerValue: "値",
      headerValuePlaceholder: "ヘッダー値を入力してください",
      addHeader: "ヘッダーを追加",
      body: "本文",
      bodyType: "本文の種類",
      bodyContent: "本文の内容",
      bodyContentPlaceholder: "本文の内容を入力してください",
      bodyContentHint: "本文の内容を入力してください",
      formDataPlaceholder: "フォーム内容を入力してください",
      formDataHint: "フォーム内容を入力してください",
      testWebhook: "Webhookをテスト",
      testWebhookHint: "Webhookをテストして正しく動作しているか確認してください。",
      testSuccess: "Webhookが正常にテストされました！",
      testError: "Webhookのテスト中にエラーが発生しました",
      responseDetails: "応答の詳細",
      advancedSettings: "詳細設定",
      timeout: "タイムアウト",
      timeoutHint: "タイムアウト値を秒単位で入力してください",
      retryAttempts: "再試行回数",
      retryAttemptsHint: "再試行回数を入力してください",
      retryDelay: "再試行遅延",
      retryDelayHint: "遅延値を秒単位で入力してください",
      jsonBody: "JSON本文",
      formBody: "フォーム本文",
      testSuccessDetails: "サーバーから応答を受信しました（CORSによりブラウザでの読み取りがブロックされます）",
      testErrorCors: "ネットワークまたはCORSエラー。URLがアクセス可能か確認してください。",
      testErrorCorsDetails: "エラー: {error}\n\nヒント: Webhookは動作している可能性がありますが、CORSによりブラウザがブロックしています。webhook.siteでリクエストが届いたか確認してください。",
      testErrorUnknown: "不明なエラー"
    },
    ReasonsField: "理由",
    SmsField: "SMS",
    VapiField: "VAPI",
    NotesField: "メモ",
    clear: "クリア",
    phoneNumberId: "電話番号",
    assistantId: "アシスタント",
    sms: {
      service: "サービス",
      message: "メッセージ",
      messagePlaceholder: "SMSメッセージを入力してください"
    },
    notes: {
      note: "メモ",
      notePlaceholder: "メモを入力してください"
    },
    buttons: {
      addStep: "新しいステージ",
      saveFlow: "ストリームを保存",
      reorder: "再注文",
      addInteraction: {
        reasons: "理由",
        sms: "SMS",
        vapi: "VAPI",
        notes: "ノート",
        chatbotBlock: "チャットボットをブロック",
        opportunity: "機会",
        googleAgenda: "Google カレンダー",
        schedule: "スケジュール",
        webhookAll: "Webhooks",
        message: "メッセージを送信",
        media: "ドキュメント、ビデオ、オーディオ、その他のファイルを送信します。",
        typebot: "タイプボットを追加",
        chatgpt: "ChatGPTを追加",
        delay: "遅延を追加",
        n8n: "N8Nを追加",
        tag: "タグを追加",
        kanban: "カンバンを追加",
        webhook: "Webhook を追加する (GET)",
        newFlow: "新しいフローを開始する"
      },
      addCondition: "新しい状態"
    },
    optionsVariableType: {
      text: "テキスト",
      number: "数値"
    },
    labels: {
      variableType: "変数の種類",
      captureVariable: "応答を変数としてキャプチャ",
      comparisonType: "比較タイプ",
      timesAttempted: "試行回数",
      flow: "フロー構成",
      stepName: "名前",
      interactions: "相互作用",
      conditions: "条件",
      if: "もし",
      responses: "回答",
      routeTo: "ルーティング",
      step: "ステージ",
      queue: "列",
      user: "ユーザー",
      closeTicket: "サービス終了",
      channel: "チャンネル",
      time: "時間（分）",
      parameters: "パラメータ",
      keyword: "トリガーワード",
      maxRetries: "最大試行回数",
      autoDistribute: "セルフ配布サービス",
      outOfHours: "営業時間外",
      firstInteraction: "最初のやり取り",
      endMessage: "閉会のメッセージ",
      welcomeMessage: "挨拶メッセージ",
      noResponse: "応答なし"
    },
    optionsComparisonType: {
      equals: "等しい",
      contains: "含む",
      startsWith: "で始まる",
      endsWith: "で終わる",
      regex: "正規表現 (Regex)"
    },    
    placeholders: {
      typeMessage: "ここにメッセージを入力してください...",
      keyword: "単語を入力してください",
      feedbackMessage: "フィードバックメッセージ",
      farewellMessage: "締めくくりのメッセージ"
    },
    hints: {
      captureVariable: "変数キーを入力してください",
      typeEqual: "比較する正確なテキストを入力してください。",
      typeContains: "応答に含まれる必要があるテキストを入力してください。",
      typeStartsWith: "応答が始まる必要があるテキストを入力してください。",
      typeEndsWith: "応答が終わる必要があるテキストを入力してください。",
      typeRegex: "有効な正規表現を入力してください。",
      queueRedirect: "このインタラクションは、クライアントが定義されたキーワードを送信したときにトリガーされます。",
      outHours: "顧客が営業時間外にメッセージを送信した場合。",
      autoDistribute: "サービスのためにキューからユーザーを選択します。",
      typeValue: "値を入力してEnterキーを押します"
    },
    options: {
      routeTo: {
        queue: "列",
        user: "ユーザー",
        close: "近い",
        channel: "チャネル"
      }
    }
  },
  monitor: {
    monitor: "モニター",
    title: "システム監視",
    usage: "使用",
    cores: "コア",
    memory: "メモリ",
    total: "合計",
    free: "無料",
    used: "使用済み",
    usedPercentage: "使用率",
    uptime: "稼働時間"
  },
  common: {
    sendMarketing: "マーケティングテンプレートを送信",
    noQueue: "キューなし",
    required: "必須",
    downloadSuccess: "ダウンロードが成功しました！",
    downloadError: "ファイルのダウンロード中にエラーが発生しました",
    duplicate: "複製",
    searching: '検索中',
    you: 'あなた',
    enableChatgptAllBanner: "注意: すべてのチャネルの資格情報を構成します。この設定を有効にすると、どのチャネルでも作成されたすべての新しいチケットに ChatGPT 統合が自動的に適用されます。この設定はすべてのサービス チャネルに影響します。",
    enableClaudeAllBanner: "注意: すべてのチャネルの資格情報を構成します。この設定を有効にすると、どのチャネルでも作成されたすべての新しいチケットは自動的に Claude 統合を受け取ります。この設定はすべてのサービス チャネルに影響します。",
    enableDeepseekAllBanner: "注意: すべてのチャネルの資格情報を構成します。この設定を有効にすると、どのチャネルでも作成されたすべての新しいチケットに Deepseek 統合が自動的に適用されます。この設定はすべてのサービス チャネルに影響します。",
    enableDialogflowAllBanner: "注意: すべてのチャネルの資格情報を構成します。この設定を有効にすると、どのチャネルでも作成されたすべての新しいチケットは自動的に Dialogflow 統合を受け取ります。この設定はすべてのサービス チャネルに影響します。",
    enableDifyAllBanner: "注意: すべてのチャネルの資格情報を構成します。この設定を有効にすると、どのチャネルでも作成されたすべての新しいチケットは自動的に Dify 統合を受け取ります。この設定はすべてのサービス チャネルに影響します。",
    enableGeminiAllBanner: "注意: すべてのチャネルの資格情報を構成します。この設定を有効にすると、どのチャネルでも作成されたすべての新しいチケットは自動的に Gemini 統合を受け取ります。この設定はすべてのサービス チャネルに影響します。",
    enableGrokAllBanner: "注意: すべてのチャネルの資格情報を構成します。この設定を有効にすると、どのチャネルでも作成されたすべての新しいチケットは自動的に Grok 統合を受け取ります。この設定はすべてのサービス チャネルに影響します。",
    enableLmAllBanner: "注意: すべてのチャネルの資格情報を構成します。この設定を有効にすると、どのチャネルでも作成されたすべての新しいチケットが自動的に LM 統合を受け取ります。この設定はすべてのサービス チャネルに影響します。",
    enableN8NAllBanner: "注意: すべてのチャネルの資格情報を構成します。この設定を有効にすると、どのチャネルでも作成されたすべての新しいチケットは自動的に N8N 統合を受け取ります。この設定はすべてのサービス チャネルに影響します。",
    enableOllamaAllBanner: "注意: すべてのチャネルの資格情報を構成します。この設定を有効にすると、どのチャネルでも作成されたすべての新しいチケットは自動的に Ollama 統合を受け取ります。この設定はすべてのサービス チャネルに影響します。",
    enableQwenAllBanner: "注意: すべてのチャネルの資格情報を構成します。この設定を有効にすると、どのチャネルでも作成されたすべての新しいチケットに Qwen の統合が自動的に適用されます。この設定はすべてのサービス チャネルに影響します。",
    enableTypebotAllBanner: "注意: すべてのチャネルの資格情報を構成します。この設定を有効にすると、どのチャネルでも作成されたすべての新しいチケットに Typebot 統合が自動的に適用されます。この設定はすべてのサービス チャネルに影響します。",
    espiarAtendimento: "スパイサービス",
    atualizar: "更新するには",
    dadosAtualizados: "データが正常に更新されました。",
    erroAtualizacao: "データの更新中にエラーが発生しました。",
    funil: "漏斗",
    accessDenied: "アクセスが拒否されました！このページにアクセスする権限がありません。",
    loadMoreTickets: "チケットを検索しています... 必要に応じて、「さらにチケットを読み込む」の横にあるボタンを 1 回以上クリックして、古いチケットを一覧表示します。",
    oldMessage: "古いメッセージです。上にスクロールして履歴を読み込んでください...",
    rollTop: "上にスクロールしてメッセージを見つけようとしています...",
    messageNotFound: "メッセージが見つかりません!",
    fullscreen: "全画面表示",
    autoLayout: "ステップを自動整理",
    info: "情報",
    addInfo: "情報を追加する",
    hours: "時間",
    minutes: "分",
    confirmDeleteElement: "要素 ({idx}) を本当に削除しますか?",
    confirmDeleteCondition: "条件 ({idx}) を本当に削除しますか?",
    invalidDate: "無効な日付",
    pay: "請求書",
    version: "バージョン",
    resume: "要約する",
    readMore: "続きを読む",
    redefineError: "パスワードのリセット中にエラーが発生しました",
    recoverSucess: "パスワードのリセットに成功しました。",
    recoverError: "パスワードのリセットをリクエスト中にエラーが発生しました",
    recoverSend: "パスワード回復メールが正常に送信されました。",
    limitExceed: "ログイン試行回数が多すぎます。 1分後にもう一度お試しください",
    loginSuccess: "ログインに成功しました！",
    busyLine: "回線が混み合っています。しばらくしてからもう一度お試しいただくか、アップグレードしてください。",
    system: "システム",
    newClientPending: "新規クライアント保留中",
    client: "お客様： ",
    loading: "読み込み中...",
    errorOccurred: "エラーが発生しました",
    errorFetchingData: "データの取得中にエラーが発生しました",
    noData: "データなし",
    notInformed: "通知なし",
    resolve: "解決する",
    register: "登録する",
    unknown: "未知",
    message: "メッセージ",
    edited: "編集済み",
    sync: "同期",
    reply: "応答するには",
    forward: "転送するには",
    forwardToPrivateChat: "プライベートチャットに転送",
    forwardToOtherChannel: "他のチャネルに転送",
    markToForward: "複数転送（チェック）",
    react: "反応する",
    edit: "編集",
    delete2: "消去",
    download: "下がる",
    download2: "下がる",
    contact: "接触",
    typeMessage: "メッセージを入力してください...",
    emoji: "絵文字",
    types: "種類",
    ok: "わかりました",
    cancel: "キャンセル",
    start: "始める",
    close: "閉じる",
    confirm: "確認する",
    send: "送信する",
    updated: "更新しました！",
    users: "ユーザー",
    dateHourFormat: "dd/MM/yyyy 時:分:秒",
    dateFormat: "日/月/年",
    active: "アクティブ",
    actions: "アクション",
    description: "説明",
    import: "輸入",
    save: "保存",
    add: "追加するには",
    delete: "消去",
    no: "いいえ",
    yes: "はい",
    out: "外出する",
    continue: "続く",
    attention: "注意！！",
    search: "検索...",
    lang: "pt-BR",
    variables: {
      name: "名前",
      email: "メールアドレス（可能な場合）",
      phoneNumber: "電話",
      kanban: "カンバン（ある場合）",
      firstName: "名（ある場合）",
      lastName: "姓（ある場合）",
      businessName: "会社名（ある場合）"
    },
    notifications: {
      success: "構成が変更されました!",
      error: "エラーが発生しました。"
    },
    status: {
      pending: "保留中",
      received: "受け取った",
      overdue: "延滞",
      unknown: "ステータス不明"
    }
  },
  funil: {
    createEvent: "イベントを作成",
    selectCalendar: "カレンダーを選択",
    noConfig: "設定がありません",
    createGoogleCalendarEvent: "Googleカレンダーにイベントを作成",
    viewGoogleCalendar: "Googleカレンダーのイベントを表示",
    googleCalendarEvents: "Googleカレンダーのイベント",
    noCalendarConfig: "設定がありません",
    editCalendarEvent: "イベントを編集",
    openCalendarEvent: "Googleカレンダーで開く",
    eventTitle: "イベントタイトル",
    eventTitleRequired: "タイトルは必須です",
    eventStartDate: "開始日",
    eventStatus: "ステータス",
    eventStartDateRequired: "開始日は必須です",
    eventEndDate: "終了日",
    eventEndDateRequired: "終了日は必須です",
    eventDescription: "説明",
    eventLocation: "場所",
    eventAttendees: "参加者（カンマ区切りのメール）",
    eventAttendeesHint: "example@email.com, other@email.com",
    updateEvent: "イベントを更新",
    cancelUpdateEvent: "キャンセル",
    eventActions: "アクション",
    eventUpdatedSuccess: "イベントが正常に更新されました！",
    selectCalendarConfig: "イベントを取得する設定を選択してください。",
    configNotFound: "選択した設定が見つかりません",
    configureGoogleCalendar: "まずGoogleカレンダーの認証情報を設定してください",
    eventError: "イベントの読み込み中にエラーが発生しました",
    calendarConfigError: "Googleカレンダーの設定の読み込み中にエラーが発生しました",
    acao: "アクション",
    acaoTicket: "チケットアクション",
    todos: "全て",
    valorMin: "最小値",
    valorMax: "最大値",
    itemsPerPage: "ページあたりの項目数",
    filter: "フィルター",
    oportunidadeAtualizada: "機会が正常に更新されました",
    oportunidadeCriada: "機会が正常に作成されました",
    erroSalvar: "機会の保存中にエラーが発生しました",
    erroEnvioEmail: "メール送信エラー",
    emailDestinatario: "受信者のメールアドレス",
    camposObrigatorios: "必須項目",
    semEmailContato: "連絡先メールアドレスがありません",
    mensagemEmail: "メールメッセージ",
    assuntoEmail: "メールの件名",
    enviarEmail: "メールを送信",
    emailError: "メール送信エラー",
    emailErrorDetails: "エラーを判別できません",
    dataAnteriorNaoPermitida: "日付は現在日より前にはできません",
    nome: "名前",
    numero: "番号",
    email: "Eメール",
    dataCriacao: "作成日",
    novaOportunidade: "新たな機会",
    calendar: "カレンダー",
    buscarPorTermoPlaceholder: "検索する語句を入力してください",
    buscarPorTermo: "用語で検索",
    dataInicio: "開始日",
    dataFim: "終了日",
    limiteRegistros: "記録制限",
    registrosPorPagina: "ページあたりのレコード数",
    total: "合計",
    semDescricao: "説明はありません",
    etapas: "ステージ",
    contato: "接触",
    noventaDiasLabel: "過去90日間",
    filterByStage: "ステップでフィルタリング",
    filterByResponsible: "責任者によるフィルタリング",
    filterByPipeline: "ファネルでフィルタリング",
    aberto: "開ける",
    ganho: "得",
    perdido: "失った",
    export: "輸出",
    exportCSV: "CSVエクスポート",
    oportunidadesValue: "機会",
    pipelinesValue: "パイプライン",
    etapasValue: "手順",
    noDataToExport: "エクスポートするデータがありません",
    filterByStatus: "ステータスでフィルタリング",
    filterByPeriod: "期間でフィルタリング",
    fitlerByResponsible: "責任者によるフィルタリング",
    oportunidadeStatus: "機会ステータス",
    oportunidadePorResponsavel: "責任者による機会",
    evolucaoDasOportunidades: "機会の進化",
    ticketMedio: "平均チケット",
    todosLabel: "全て",
    abertosLabel: "開ける",
    ganhosLabel: "収益",
    perdidosLabel: "失った",
    seteDiasLabel: "過去7日間",
    trintaDiasLabel: "過去30日間",
    noventeDiasLabel: "過去90日間",
    noResponsible: "責任はない",
    oportunidades: "機会",
    criado: "創設された事業",
    emAberto: "営業中",
    negocioGanho: "ビジネス勝利",
    negocioPerdido: "失われたビジネス",
    taxaNegociosGanhos: "獲得した事業税率",
    dashBoard: "コントロールパネル",
    pipelines: "ファネル",
    kanban: "カンバン",
    ultimaEtapa: "これはパイプラインの最後のステップです",
    deletarOportunidade: "この機会を削除してもよろしいですか?",
    oportunidadeDeletada: "機会が正常に削除されました",
    erroAoDeletar: "機会の削除中にエラーが発生しました",
    atencao: "注意",
    nao: "いいえ",
    sim: "はい",
    cancelar: "キャンセル",
    salvar: "保存",
    fechar: "閉じる",
    adicionar: "追加するには",
    editar: "編集",
    deletar: "消去",
    oportunidadeVencendo: "機会獲得",
    venceEm: "勝利",
    dias: " 日）",
    verDetalhes: "詳細を見る",
    semMovimentacao: "動きなし",
    estaHa: "ありますか",
    diasSemMovimentacao: "動きのない日々",
    atualizar: "更新するには",
    valorAlto: "高価値",
    comValorDe: "$ の価値を持つ ",
    etapaEstagnada: "停滞期",
    diasNaEtapa: "舞台での日々",
    avancarEtapa: "次のステップ",
    semResponsavel: "責任はない",
    reponsavelAlerta: "担当者が指定されていない",
    designar: "指定する",
    fechamentoPrevisto: "終わりに",
    dataProxima: "締め切り日が近づいています！",
    criadoEm: "作成年",
    detalhesOportunidade: "機会の詳細",
    pipeline: "漏斗",
    etapa: "ステージ",
    status: "状態",
    valor: "価値",
    valoresData: "値と日付",
    previsao: "終値予測",
    ultimaUpdate: "最終更新日",
    responsaveis: "責任者",
    basicas: "基本情報",
    lead: "鉛",
    responsavel: "責任者",
    descricao: "説明",
    produtos: "製品",
    historicoAtividades: "活動履歴",
    valorMinimo: "最小値",
    valorMaximo: "最大値",
    limparFiltros: "フィルターをクリア",
    esteMes: "今月",
    mesAnterior: "前月",
    ultimos7dias: "過去7日間",
    ultimos30dias: "過去30日間",
    ultimos90dias: "過去90日間",
    hoje: "今日",
    valorDesc: "値（最高から最低）",
    valorAsc: "値（最低から最高）",
    criacaoDesc: "作成日（新しい順）",
    criacaoAsc: "作成日（古い順）",
    previsaoFechamento: "終値予測",
    editarOportunidade: "編集の機会",
    criarOportunidade: "機会を創出する",
    pipeEtapa: "ファネルとステージ",
    funil: "ファネル",
    etapa: "ステージ",
    selecioneData: "予定締め切り日を選択してください",
    dataObrigatoria: "日付は必須です",
    dataFutura: "日付は将来の日付でなければなりません",
    loadError: "必要なデータの読み込み中にエラーが発生しました",
    contactError: "連絡先の読み込み中にエラーが発生しました",
    editarPipe: "ファネルを編集",
    novoPipe: "新しいファネル",
    nomePipe: "ファネル名",
    campoObrigatorio: "必須項目",
    acoes: "アクション",
    excluirPipeline: "このファネルを削除してもよろしいですか?",
    funilDeletado: "ファネルが正常に削除されました",
    erroAoDeletarFunil: "ファネルの削除中にエラーが発生しました",
    pipeTitle: "ファネル"
  },
  asteriskWebphone: {
    conected: "接続されています",
    setNumber: "番号を入力してください",
    callReceived: "通話を受け取りました",
    disconnectedWebphone: "Webphoneが切断されました",
    calling: "通話中...",
    callError: "通話の開始中にエラーが発生しました",
    callReceivedError: "通話の受け取り中にエラーが発生しました",
    callEnded: "通話が終了しました",
    callEndedError: "通話の終了中にエラーが発生しました",
    callReceived: "通話を受け取りました",
  },
  configuracaoTutoriais: {
    title: 'チュートリアル',
    create: 'チュートリアルを作成',
    description: '説明',
    link: 'リンク',
    thumbnail: 'サムネイル',
    isActive: '有効',
    edit: '編集',
    deleteConfirmation: 'このチュートリアルを削除してもよろしいですか？',
    tutorialDeleted: 'チュートリアルが正常に削除されました',
    columns: {
      title: 'タイトル',
      link: 'リンク',
      isActive: '有効',
      acoes: '操作',
      thumbnail: 'サムネイル',
      description: '説明',
      actions: '操作',
      edit: '編集',
      delete: '削除',
      cancel: 'キャンセル',
      id: 'ID',
    },
    notifications: {
      duplicated: 'チュートリアルが正常に複製されました',
      errorDelete: 'チュートリアルの削除中にエラーが発生しました',
      errorDuplicate: 'チュートリアルの複製中にエラーが発生しました',
      created: 'チュートリアルが正常に作成されました',
      updated: 'チュートリアルが正常に更新されました',
    }
  },
  funilacao: {
    fluxoSalvoComSucesso: 'フローが正常に保存されました',
    tipoAcaoFluxo: 'フロー',
    erroSalvarFluxo: 'フローの保存中にエラーが発生しました',
    configurarFluxo: 'フローを設定',
    configurarAdicaoCarteira: 'ウォレットの追加を設定',
    configurarAdicaoTag: 'タグの追加を設定',
    configurarMudancaStatus: 'ステータスの変更を設定',
    configurarMudancaEtapa: 'ステージの変更を設定',
    configurarMensagem: 'メッセージを設定',
    selecionarAcao: 'アクションを選択',
    acoesDoFluxo: 'フローのアクション',
    adicioneAcoes: 'フローにアクションを追加',
    adicionarAcao: 'アクションを追加',
    moverParaBaixo: '下に移動',
    moverParaCima: '上に移動',
    diasAposInicio: "{dias} 日",
    configurarAcao: 'アクションを設定',
    selecionePipelineEtapa: 'パイプラインとステージを選択',
    novoFluxo: '新しいフロー',
    editarFluxo: 'フローを編集',
    editorFluxo: 'フローエディター',
    acoesDisponiveis: '利用可能なアクション',
    fluxo: 'フロー',
    verLogs: 'ログを見る',
    logAcao: 'アクションログ',
    contato: '連絡先',
    numero: '番号',
    email: 'メールアドレス',
    data: '日付',
    oportunidade: '商談',
    status: 'ステータス',
    mensagemErro: 'エラーメッセージ',
    erroCarregarLogs: 'ログの読み込み中にエラーが発生しました',
    acao: 'アクション',
    pipeline: 'パイプライン',
    etapa: 'ステージ',
    tipoAcao: 'アクションの種類',
    mensagem: 'メッセージ',
    etapaDestino: '移動先のステージ',
    statusDestino: '移動先のステータス',
    tag: 'タグ',
    carteira: 'ウォレット',
    diasParaDisparar: '実行までの日数',
    tipoAcaoMensagem: 'メッセージを送信',
    tipoAcaoMudarEtapa: 'ステージを変更',
    tipoAcaoMudarStatus: 'ステータスを変更',
    tipoAcaoAdicionarTag: 'タグを追加',
    tipoAcaoAdicionarCarteira: 'ウォレットを追加',
    aberto: 'オープン',
    ganho: '獲得',
    perdido: '失敗',
    novo: '新規',
    pesquisar: '検索',
    ativo: '有効',
    nome: '名前',
    pipeline: 'パイプライン',
    etapa: 'ステージ',
    status: 'ステータス',
    valor: '金額',
    valoresData: '金額と日付',
    previsao: 'クローズ予測',
    salvar: '保存',
    cancelar: 'キャンセル',
    descricao: '説明',
    whatsapp: '接続',
    pesquisar: '検索',
    novo: '新規',
    acoes: 'アクション',
    erroCarregarDados: 'データの読み込みエラー',
    required: '必須',
    editar: '編集',
    salvoComSucesso: '正常に保存されました',
    excluir: '削除',
    alteradoComSucesso: '正常に更新されました',
    confirmarExclusao: 'このアクションを削除してもよろしいですか？',
    confirmar: '確認',
    excluidoComSucesso: '正常に削除されました',
    erroExcluir: 'アクションの削除エラー',
    erroSalvar: 'アクションの保存エラー',
    erroAtualizar: 'アクションの更新エラー',
    erroCarregarEtiquetas: 'タグの読み込みエラー',
    erroCarregarCarteiras: 'ウォレットの読み込みエラー',
    erroCarregarWhatsapps: 'WhatsApp接続の読み込みエラー',
    acaoTicket: 'チケットアクション',
    horasSemResposta: '応答なしの時間',
    dataInicio: '開始日',
    dataInicioTooltipTitulo: '動作方法:',
    dataInicioTooltipDescricao: 'この日付は、アクションがチケットに適用される開始日を定義します。',
    dataInicioTooltipPreenchida: '入力した場合: この日付の後に作成されたチケットのみがアクションを受け取ります',
    dataInicioTooltipVazia: '空の場合: アクションはすべてのチケットに適用されます（デフォルトの動作）',
    dataInicioTooltipExemplo: '例: 2024年1月1日を設定した場合、この日付以降に作成されたチケットのみがアクションを受け取り、古いチケットは無視されます。',
    horasAposInicio: '開始後{horas}時間',
    pendente: '保留中',
    fechado: '閉じた',
    confirmar: '確認',
  },
  vapi: {
    assistants: "アシスタント",
    phones: "電話番号",
    createAccountInstruction: "Vapiでアカウントを作成し、統合に使用するトークンを生成してください",
    tokenLabel: "トークン",
    tokenTooltip: "Vapi",
    tooltip: "Vapiでアカウントを作成し、統合に使用するトークンを生成してください。",
    testCall: "テスト通話を行う",
    selectAssistant: "アシスタントを選択",
    selectPhoneNumber: "電話番号を選択",
    customerNumber: "顧客番号",
    makeCall: "通話を行う",
    cancel: "キャンセル",
    success: "通話が正常に行われました！",
    call: "通話",
  },
  rewriteIa: {
    title: 'ChatGPTで書き直す',
    estilos: '書き直しスタイル',
    pro: 'プロフェッショナル',
    prodesc: 'フォーマルでビジネス向けのトーン',
    simp: 'フレンドリー',
    simpdesc: '親しみやすく温かいトーン',
    marketing: 'マーケティング',
    marketingdesc: '説得力があり魅力的なトーン',
    ortografia: 'スペルチェック',
    ortografiadesc: 'スペルチェックのみ',
    caracteres: '文字',
    warning1: '書き直すテキストを入力してください',
    warning2: 'ChatGPTのAPIキーが設定されていません',
    warning3: 'このスタイルで書き直されました',
    warning4: '書き直しを元に戻しました',
    desfazer: '元に戻す',
    error1: 'テキストの書き直し中にエラーが発生しました。再試行してください', 
    promptMap: {
      profissional: 'プロフェッショナル',
      simpatico: 'フレンドリー',
      marketing: 'マーケティング',
      ortografia: 'スペルチェックのみ'
    },
    systemContent: 'テキストを{estilo}トーンで書き直します。内容はそのままにし、スタイルとスペルを調整します。フレンドリートーンの場合は表情符を適度に使用し、マーケティングトーンの場合はWhatsAppモードで太字と斜体を使用し表情符を使用します。'
  },
  dashStyles: {
    title: 'ダッシュボードをカスタマイズ',
    tema: 'ダッシュボードのテーマ',
    tipoGrafico: 'グラフの種類',
    tooltip: '次の表示グラフタイプをカスタマイズ：',
    show: '次のパネルを表示：',
    defaultLabel: 'デフォルト',
    defaultValue: 'デフォルト',
    pizzaLabel: '円グラフ',
    barLabel: '棒グラフ',
    lineLabel: '線グラフ',
    areaLabel: '面グラフ',
    donutLabel: 'ドーナツ',
    radarLabel: 'レーダー',
    queueLabel: 'キュー別対応',
    userLabel: 'ユーザー別対応',
    statusLabel: 'ステータス別対応',
    channelLabel: 'チャネル別対応（接続）',
    channelNameLabel: 'チャネル別対応（名前）',
    reasonsLabel: 'リクエスト別対応',
    users: 'ユーザー',
    atendimento: '対応',
    demandas: 'リクエスト',
    closed: '完了',
    open: 'オープン',
    pending: '保留',
    schedule: '予定済み',
    undefined: '未定義',
    channels: 'チャネル',
    classic: 'クラシック',
    modern: 'モダン',
    nature: 'ナチュラル',
    elegant: 'エレガント',
    vibrant: 'ビビッド',
    minimalist: 'ミニマリスト',
    corporative: 'コーポレート',
    default: 'デフォルト',
    performanceCardsLabel: 'パフォーマンスカード',
    performanceTableLabel: 'パフォーマンステーブル',
  },
  ticketCompartilhado: {
    convites: '招待',
    convite: '招待',
    conviteDeletado: '招待が正常に削除されました',
    conviteDeletadoErro: '招待の削除中にエラーが発生しました',
    meusConviteCompartilhados: '自分の共有招待',
    carregandoConvites: '招待を読み込み中...',
    nenhumConviteEncontrado: '招待が見つかりません',
    voceNaoPossuiConvitesAtivos: '有効な共有招待はありません。',
    compartilhadoEm: '共有日時',
    usuariosComAcesso: 'アクセス可能なユーザー',
    criadoPor: '作成者',
    voce: 'あなた',
    outroUsuario: '他のユーザー',
    abrirNaMesmaTela: '同じ画面で開く',
    deletarConvite: '招待を削除',
    erroAoCarregarConvites: '招待の読み込みエラー',
    linkCopiadoParaAreaDeTransferencia: 'リンクをクリップボードにコピーしました',
    naoFoiPossivelCopiarLink: 'リンクをコピーできませんでした',
    confirmarExclusa: '削除の確認',
    temCertezaQueDesejaDeletarOConviteDoTicket: 'チケット #{ticketId} の招待を削除してもよろしいですか？',
    conviteDeletadoComSucesso: '招待が正常に削除されました！',
    erroAoDeletarConvite: '招待の削除中にエラーが発生しました',
    confirmarExclusao: 'この招待を削除してもよろしいですか？',
    compartilharTicket: 'チケットを共有',
    editarCompartilhamento: '共有を編集',
    editeOsUsuariosQueTeraoAcessoAEsteTicket: 'このチケットにアクセスできるユーザーを編集してください',
    selecioneOsUsuariosQueTeraoAcessoAEsteTicket: 'このチケットにアクセスできるユーザーを選択してください',
    atualizar: '更新',
    compartilhar: '共有',
    erroAoVerificarConviteExistente: '既存の招待を確認中にエラーが発生しました',
    erroAoCarregarUsuarios: 'ユーザーの読み込み中にエラーが発生しました',
    selecionePeloMenosUmUsuarioParaCompartilhar: '共有するには少なくとも1人のユーザーを選択してください',
    conviteAtualizadoCom: '{length}人のユーザーで招待が更新されました',
    ticketCompartilhadoCom: 'チケットが{length}人のユーザーと共有されました',
    erroAoCompartilharTicket: 'チケットの共有中にエラーが発生しました',
    update: '更新',
  },
  backup: {
    title: "データセンター",
    backupActions: "データエクスポート",
    individualBackup: "個別エクスポート",
    allTenantsConfig: "すべてのテナントのエクスポート設定",
    tenantConfig: "テナントごとのエクスポート設定",
    oldBackupsCleanup: "古いデータのクリーンアップ",
    backupResults: "エクスポート結果",
    availableBackups: "利用可能なデータ",
    totalBackups: "エクスポート合計",
    totalSize: "合計サイズ",
    lastBackup: "最新のエクスポート",
    processedTenants: "処理されたエクスポート",
    backupAllTenants: "すべてのテナントをエクスポート",
    updateStatus: "ステータスを更新",
    makeBackup: "データをエクスポート",
    updateConfigs: "設定を更新",
    searchTenant: "テナントを検索",
    newConfig: "新しい設定",
    recreateDefaultConfig: "デフォルト設定を再作成",
    saveConfig: "設定を保存",
    cancel: "キャンセル",
    close: "閉じる",
    confirmRestore: "復元の確認",
    confirmGeneralCleanup: "全体クリーンアップの確認",
    cleanTenantBackups: "テナントの古いデータを削除",
    cleanAllTenantsBackups: "すべてのテナントの古いデータを削除",
    selectTenant: "テナントを選択",
    selectTenantForConfig: "設定するテナントを選択",
    selectTenantForCleanup: "クリーンアップするテナントを選択",
    viewAllTenantsConfig: "すべてのテナントのエクスポート設定を表示",
    removeOldBackups: "各テナントの保持ポリシーに従って古いデータを削除",
    tenantConfigInfo: "テナント設定:",
    noConfigFound: "設定が見つかりません",
    withoutDescription: "説明なし",
    createdIn: "作成日:",
    editConfig: "設定を編集",
    newConfigTitle: "新しい設定",
    storage: "ストレージ",
    general: "一般",
    advanced: "高度な設定",
    storageType: "ストレージタイプ",
    storagePath: "ストレージパス",
    retentionDays: "保持日数",
    compression: "圧縮",
    description: "説明",
    configDescription: "設定の説明",
    encryption: "暗号化",
    encryptionPassword: "暗号化パスワード",
    bucket: "バケット",
    region: "リージョン",
    accessKeyId: "アクセスキーID",
    secretAccessKey: "シークレットアクセスキー",
    host: "ホスト",
    port: "ポート",
    username: "ユーザー名",
    password: "パスワード",
    path: "パス",
    active: "有効",
    inactive: "無効",
    success: "成功",
    failure: "失敗",
    complete: "完了",
    partial: "部分的",
    yes: "はい",
    no: "いいえ",
    edit: "編集",
    recreateDefault: "デフォルト再作成",
    delete: "削除",
    viewDetails: "詳細を表示",
    downloadBackup: "データをダウンロード",
    deleteBackup: "データを削除",
    confirmDeleteBackup: "削除の確認",
    confirmDeleteBackupMessage: "このエクスポートを削除してもよろしいですか？この操作は取り消せません。",
    backupDeleted: "エクスポートが正常に削除されました",
    errorDeletingBackup: "データの削除中にエラーが発生しました",
    confirmDeleteBackupTitle: "データ削除の確認",
    id: "ID",
    tenant: "テナント",
    tenantId: "テナントID",
    backupName: "エクスポート名",
    size: "サイズ",
    dbSize: "DBサイズ",
    filesSize: "ファイルサイズ",
    totalSize: "合計サイズ",
    duration: "期間",
    type: "タイプ",
    date: "日付",
    actions: "操作",
    createdAt: "作成日",
    status: "ステータス",
    backupDetails: "エクスポート詳細",
    name: "名前",
    database: "データベース",
    files: "ファイル",
    dbSizeLabel: "DBサイズ:",
    filesSizeLabel: "ファイルサイズ:",
    totalSizeLabel: "合計サイズ:",
    dateLabel: "日付:",
    errors: "エラー:",
    restoreBackup: "データを復元",
    restoreWarning: "⚠️ 注意: この操作は現在のテナントデータを上書きします。元に戻せません。",
    confirmGeneralCleanupTitle: "全体クリーンアップの確認",
    action: "操作:",
    criteria: "条件:",
    cleanupAction: "すべてのテナントの古いデータを削除",
    cleanupCriteria: "設定された保持期間を超えたデータ",
    cleanupWarning: "⚠️ 注意: この操作はすべてのテナントの古いデータを永久に削除します。取り消せません。",
    cleanupAllWarning: "⚠️ この操作はすべてのテナントの古いデータを削除します",
    allBackupsCompleted: "すべてのテナントのエクスポートが完了しました",
    allBackupsExecuted: "すべてのテナントのエクスポートが完了しました",
    singleBackupExecuted: "テナントのエクスポートが完了しました",
    tenantBackupCompleted: "テナントのエクスポートが完了しました",
    configSaved: "設定が正常に保存されました",
    configDeleted: "設定が正常に削除されました",
    defaultConfigRecreated: "デフォルト設定が正常に再作成されました",
    restoreCompleted: "復元が正常に完了しました",
    tenantBackupsCleaned: "テナントの古いデータが正常に削除されました",
    oldBackupsCleaned: "テナントの古いデータが正常に削除されました",
    allTenantsBackupsCleaned: "すべてのテナントの古いデータが正常に削除されました",
    allOldBackupsCleaned: "すべてのテナントの古いデータが正常に削除されました",
    backupDownloaded: "データが正常にダウンロードされました！",
    tenantsWithSuccess: "成功したテナント",
    errorLoadingInitialData: "初期データの読み込み中にエラーが発生しました",
    errorLoadingStatus: "ステータスの読み込み中にエラーが発生しました",
    errorLoadingTenants: "テナントの読み込み中にエラーが発生しました",
    errorLoadingBackups: "データの読み込み中にエラーが発生しました",
    errorLoadingResults: "エクスポート結果の読み込み中にエラーが発生しました",
    errorLoadingAllConfigs: "すべてのテナントの設定の読み込み中にエラーが発生しました",
    errorLoadingTenantConfigs: "テナント設定の読み込み中にエラーが発生しました",
    errorExecutingBackup: "エクスポートの実行中にエラーが発生しました",
    errorExecutingAllBackups: "エクスポートの実行中にエラーが発生しました",
    errorExecutingTenantBackup: "テナントのエクスポート実行中にエラーが発生しました",
    errorExecutingSingleBackup: "テナントのエクスポート実行中にエラーが発生しました",
    errorSavingConfig: "設定の保存中にエラーが発生しました",
    errorDeletingConfig: "設定の削除中にエラーが発生しました",
    errorRecreatingDefaultConfig: "デフォルト設定の再作成中にエラーが発生しました",
    errorRestoringBackup: "データの復元中にエラーが発生しました",
    errorCleaningTenantBackups: "テナントのデータ削除中にエラーが発生しました",
    errorCleaningOldBackups: "テナントのデータ削除中にエラーが発生しました",
    errorCleaningAllTenantsBackups: "すべてのテナントのデータ削除中にエラーが発生しました",
    errorCleaningAllBackups: "すべてのテナントのデータ削除中にエラーが発生しました",
    errorDownloadingBackup: "データのダウンロード中にエラーが発生しました",
    selectTenantToConfigure: "設定するテナントを選択してください",
    selectTenantToClean: "データを削除するテナントを選択してください",
    selectTenantToCleanBackups: "データを削除するテナントを選択してください",
    selectTenantToRecreate: "デフォルト設定を再作成するテナントを選択してください",
    selectTenantToRecreateDefaultConfig: "デフォルト設定を再作成するテナントを選択してください",
    invalidConfig: "無効な設定",
    confirmDelete: "削除の確認",
    confirmDeleteConfigTitle: "削除の確認",
    confirmDeleteMessage: "この設定を削除してもよろしいですか？",
    confirmDeleteConfigMessage: "この設定を削除してもよろしいですか？",
    zeroBytes: "0バイト",
    na: "該当なし",
    tenantPrefix: "テナント ",
    backupInfoTitle: "エクスポート情報",
    includedModels: "含まれるモデル",
    excludedModels: "除外されたモデル",
    databaseModelsInfo: "データベースモデル",
    includedModelsTitle: "エクスポートに含まれるモデル",
    excludedModelsTitle: "エクスポートから除外されたモデル",
    includedModelsDescription: "これらのモデルはデータベースのエクスポートに含まれます",
    excludedModelsDescription: "これらのモデルはデータベースのエクスポートに含まれません",
    backupScope: "エクスポート範囲",
    backupScopeDescription: "テナント固有のデータ（tenantId付き）のみを含み、システムデータ、一時ログ、内部設定は除外されます。",
    showDetails: "詳細を表示",
    hideDetails: "詳細を非表示",
    backupAllTenantsTooltip: "すべてのテナントをエクスポート",
    backupAllTenantsDescription: "システム内のすべてのアクティブなテナントのエクスポートを実行",
    singleBackupTooltip: "個別エクスポート",
    singleBackupDescription: "特定のテナントのエクスポートを実行",
    modelsIncluded: "含まれるモデル",
    modelsExcluded: "除外されたモデル",
    models: "モデル",
    updateStatusDescription: "エクスポートの統計とステータスを更新",
    cleanupInfoTitle: "データクリーンアップ",
    cleanupInfoDescription: "保持ポリシーに基づいて古いデータを削除",
    cleanupScope: "クリーンアップ範囲",
    cleanupScopeDescription: "古いエクスポートファイルのみを削除し、データベースや設定には影響しません"
  },
  masterkey: {
    masterkeyOption: "MasterKey を使用する"
  },
  configuracaoMetaPanel: {
    novos: {
      configureWebhook: "Webhookを設定",
      configureSIP: "SIPを設定",
      registerPhone: "WABAに電話を登録",
      configureWebhookDescription: "WhatsApp Business APIからイベントを受信するためのコールバックURLを設定します",
      callbackUrl: "コールバックURL",
      callbackUrlRequired: "コールバックURLは必須です",
      verifyToken: "認証トークン",
      metaToken: "テナントのMetaトークン",
      metaTokenHint: "リクエストの真正性を確認するために使用されるトークン",
      metaTokenRequired: "認証トークンは必須です",
      overrideWebhook: "Webhookを上書き",
      configureSIPDescription: "WhatsApp Business APIを介して音声通話を受信するためにSIPサーバーを設定します",
      hostnameSIP: "SIPサーバーホスト名",
      hostnameSIPHint: "SIPサーバーのホスト名（例: asterisk.exemplo.com.br）",
      hostnameSIPRequired: "SIPサーバーのホスト名は必須です",
      hostnameSIPInvalid: "無効なSIPサーバーホスト名",
      hostnameSIPPlaceholder: "例: asterisk.exemplo.com.br",
      portSIP: "SIPサーバーポート",
      portSIPHint: "SIPサーバーポート (1-65535)",
      portSIPRequired: "SIPサーバーポートは必須です",
      portSIPInvalid: "無効なSIPサーバーポート",
      portSIPPlaceholder: "5061",
      important: "重要",
      configureSIPDescription2: "この設定により、WhatsApp Business APIを介した音声通話が有効になります。SIPサーバーが正しく設定され、アクセス可能であることを確認してください。",
      fillRequiredFields: "必須項目をすべて入力してください",
      portSIPInvalidMessage: "無効なポートです。1から65535の間である必要があります",
      hostnameSIPInvalidMessage: "無効なホスト名",
      SIPConfiguredSuccess: "SIPが正常に設定されました！",
      SIPConfiguredError: "SIP設定中にエラーが発生しました"
    },    
    profile: {
      updateProfile: "プロフィールを更新",
      profile: "WhatsAppビジネスプロフィール",
      about: "概要",
      address: "住所",
      description: "説明",
      email: "メールアドレス",
      vertical: "業種",
      websites: "ウェブサイト",
      loadingProfile: "現在のプロフィールを読み込み中...",
      configureProfile: "プロフィールを設定",
      configureProfileDescription: "WhatsAppビジネスプロフィールの情報を設定します",
      reloadProfile: "プロフィールを再読み込み",
      aboutPlaceholder: "ビジネスの簡単な説明",
      aboutHint: "最大512文字",
      addressPlaceholder: "ビジネスの完全な住所",
      addressHint: "店舗の物理的な住所",
      descriptionPlaceholder: "ビジネスの詳細な説明",
      descriptionHint: "サービスや製品の完全な説明",
      emailPlaceholder: "contacto@@empresa.com",
      emailHint: "ビジネスの連絡先メールアドレス",
      verticalPlaceholder: "業種を選択",
      verticalHint: "ビジネスの主なカテゴリ",
      websitesPlaceholder: "https://www.empresa.com",
      websitesHint: "ビジネスのウェブサイトURL（カンマで区切る）",
      cancel: "キャンセル",
      saveProfile: "プロフィールを保存",
      profileLoadError: "電話は認証済みですが、プロフィールを読み込めませんでした。",
      requiredFieldsError: "すべての必須フィールドを入力してください",
      invalidEmailFormat: "無効なメール形式",
      profileUpdatedSuccess: "プロフィールが正常に更新されました！",
      profileUpdateError: "プロフィールの更新中にエラーが発生しました。データを確認して再試行してください。",
      retail: "小売",
      services: "サービス",
      restaurant: "レストラン",
      education: "教育",
      health: "健康",
      technology: "テクノロジー",
      beauty: "美容",
      automotive: "自動車",
      realEstate: "不動産",
      financial: "金融",
      sports: "スポーツ",
      entertainment: "エンターテインメント",
      travel: "旅行",
      wellness: "ウェルネス",
      pet: "ペット",
      other: "その他"
    },
    label: {
      approved: "承認済み",
      pending: "保留中",
      rejected: "拒否されました",
      inAppeal: "審査中",
      disabled: "無効",
      utility: "ユーティリティ",
      marketing: "マーケティング",
      authentication: "認証",
      arAR: "アラビア語（サウジアラビア）",
      tshivenda: "ツシヴェンダ語",
      isiNdebeleNo: "北ンデベレ語",
      isiNdebeleSu: "南ンデベレ語",
      Sepedi: "セペディ語",
      Sesotho: "セソト語",
      ptBR: "ポルトガル語（ブラジル）",
      ptPT: "ポルトガル語（ポルトガル）",
      enUS: "英語（アメリカ）",
      enGB: "英語（イギリス）",
      esES: "スペイン語（スペイン）",
      esMX: "スペイン語（メキシコ）",
      esAR: "スペイン語（アルゼンチン）",
      frFR: "フランス語（フランス）",
      frCA: "フランス語（カナダ）",
      itIT: "イタリア語",
      deDE: "ドイツ語",
      nlNL: "オランダ語",
      ruRU: "ロシア語",
      jaJP: "日本語",
      koKR: "韓国語",
      zhCN: "中国語（簡体字）",
      zhTW: "中国語（繁体字）",
      arAE: "アラビア語（UAE）",
      arEG: "アラビア語（エジプト）",
      arSA: "アラビア語（サウジアラビア）",
      arMA: "アラビア語（モロッコ）",
      arTN: "アラビア語（チュニジア）",
      arDZ: "アラビア語（アルジェリア）",
      hiIN: "ヒンディー語",
      trTR: "トルコ語",
      plPL: "ポーランド語",
      svSE: "スウェーデン語",
      noNO: "ノルウェー語",
      daDK: "デンマーク語",
      fiFI: "フィンランド語",
      elGR: "ギリシャ語",
      huHU: "ハンガリー語",
      csCZ: "チェコ語",
      skSK: "スロバキア語",
      roRO: "ルーマニア語",
      bgBG: "ブルガリア語",
      hrHR: "クロアチア語",
      srRS: "セルビア語",
      slSI: "スロベニア語",
      etEE: "エストニア語",
      lvLV: "ラトビア語",
      ltLT: "リトアニア語",
      mtMT: "マルタ語",
      isIS: "アイスランド語",
      gaIE: "アイルランド語",
      cyGB: "ウェールズ語",
      euES: "バスク語",
      caES: "カタルーニャ語",
      glES: "ガリシア語",
      caESVALENCIA: "カタルーニャ語（バレンシア）",
      heIL: "ヘブライ語",
      faIR: "ペルシャ語（イラン）",
      thTH: "タイ語",
      viVN: "ベトナム語",
      idID: "インドネシア語",
      msMY: "マレー語",
      filPH: "フィリピン語",
      bnIN: "ベンガル語",
      taIN: "タミル語",
      teIN: "テルグ語",
      mrIN: "マラーティー語",
      guIN: "グジャラート語",
      knIN: "カンナダ語",
      mlIN: "マラヤーラム語",
      paIN: "パンジャブ語",
      urPK: "ウルドゥー語（パキスタン）",
      sdPK: "シンド語（パキスタン）",
      psAF: "パシュトー語",
      prsAF: "ダリー語（アフガニスタン）",
      uzUZ: "ウズベク語",
      kkKZ: "カザフ語",
      kyKG: "キルギス語",
      tgTJ: "タジク語",
      tkTM: "トルクメン語",
      mnMN: "モンゴル語",
      neNP: "ネパール語",
      siLK: "シンハラ語",
      myMM: "ビルマ語",
      kmKH: "クメール語",
      loLA: "ラオス語",
      mnMNCYRL: "モンゴル語（キリル）",
      mnMNMONG: "モンゴル語（伝統）",
      amET: "アムハラ語",
      tiET: "ティグリニャ語",
      soSO: "ソマリ語",
      swKE: "スワヒリ語",
      yoNG: "ヨルバ語",
      igNG: "イボ語",
      haNG: "ハウサ語",
      zuZA: "ズールー語",
      xhZA: "コサ語",
      afZA: "アフリカーンス語",
      stZA: "南部ソト語",
      tnZA: "ツワナ語",
      veZA: "ベンダ語",
      tsZA: "ツォンガ語",
      nrZA: "南部ンデベレ語",
      ndZA: "北部ンデベレ語",
      nsoZA: "北部ソト語",
      sstZA: "南部ソト語（バリアント）",
      header: "ヘッダー",
      body: "本文",
      footer: "フッター",
      buttons: "ボタン",
      texto: "テキスト",
      imagem: "画像",
      documento: "ドキュメント",
      video: "ビデオ",
      localizacao: "位置情報",
      quickReply: "クイック返信",
      url: "URL",
      telefone: "電話番号",
      otp: "OTP"
    },    
    tabs: {
      phones: "Wabas",
      templates: "テンプレート",
      create: "テンプレートを作成",
      instagram: "Instagram",
      messenger: "Messenger",
      facebook: "Facebook"
    },
    common: {
      selectWabaConnection: "WABA接続を選択",
      noWabaConnectionsAvailable: "WABA接続が利用できません",
      appId: "アプリID",
      appIdHint: "メディアアップロード用の Facebook アプリ ID",
      type: "タイプ",
      editTemplate: "テンプレートを編集",
      nameHint: "小文字とアンダースコア（_）のみ使用できます",
      buttonTextHint: "最大25文字",
      fieldRequired: "必須項目",
      phoneNumberIdRequired: "電話番号IDが必要です",
      wabaIdRequired: "WABA IDが必要です",
      wabaVersionRequired: "WABAバージョンは必須です",
      wabaTokenRequired: "WABAトークンは必須です",
      codeRequired: "受け取ったコードを入力してください",
      enterPin: "6桁のPINを入力してください",
      enterCode: "受け取ったコードを入力してください",
      enterPhoneNumberId: "電話番号IDを入力してください",
      enterWabaId: "WABA IDを入力してください",
      enterWabaVersion: "例: v23.0",
      enterWabaToken: "アクセストークンを入力してください"
    },
    templates: {
      title: "テンプレート",
      create: "テンプレートを作成",
      refresh: "更新するには",
      noTemplates: "テンプレートが見つかりません",
      noPreview: "プレビューは利用できません",
      facebook: "Facebook",
      selectMessengerConnection: "Messenger接続を選択",
      noMessengerConnectionsAvailable: "Messenger接続が利用できません",
      noMessengerConnections: "Messenger接続が見つかりません。通信チャネルセクションで最初にMessenger接続を設定してください。",
      templateSelected: "テンプレートが選択されました",
      filters: {
        status: "状態",
        category: "カテゴリ",
        language: "言語",
        search: "テンプレートを検索..."
      },
      actions: {
        view: "ビュー",
        test: "テスト",
        edit: "編集",
        delete: "消去"
      },
      createForm: {
        basicInfo: "基本情報",
        name: "テンプレート名",
        nameRequired: "名前は必須です",
        appIdRequired: "アプリIDは必須です",
        language: "言語",
        languageRequired: "言語は必須です",
        category: "カテゴリ",
        categoryRequired: "カテゴリーは必須です",
        components: "コンポーネント",
        addComponent: "コンポーネントを追加",
        component: "成分",
        componentType: "コンポーネントタイプ",
        headerFormat: "ヘッダー形式",
        text: "文章",
        buttons: "ボタン",
        addButton: "追加ボタン",
        button: "ボタン",
        buttonType: "ボタンタイプ",
        buttonText: "ボタンテキスト",
        url: "URL",
        phoneNumber: "電話番号",
        submit: "テンプレートを作成",
        requiredFieldsNote: "フィールドに * が付いているものは必須です"
      },
      details: {
        info: "情報",
        id: "ID",
        status: "状態",
        category: "カテゴリ",
        language: "言語",
        components: "コンポーネント"
      },
      delete: {
        confirmTitle: "削除を確認",
        confirmMessage: "テンプレート '{name}' を削除してもよろしいですか? この操作は元に戻せません。"
      },
      notifications: {
        created: "テンプレートが正常に作成されました。",
        updated: "テンプレートが正常に更新されました。",
        deleted: "テンプレートが正常に削除されました。"
      },
      
      // 警告
      warnings: {
        marketingConvertedToUtility: "テンプレートはUTILITYとして作成されました。Messengerのマーケティングテンプレートには、ユーザーのオプトインによるnotification_message_tokensが必要で、message_templatesエンドポイントを通じて作成することはできません。"
      },
      errors: {
        listError: "テンプレートの読み込みエラー",
        createError: "テンプレートの作成中にエラーが発生しました",
        updateError: "テンプレートの更新中にエラーが発生しました",
        deleteError: "テンプレートの削除中にエラーが発生しました",
        noValidComponents: "少なくとも1つの有効なコンポーネント（HEADER、BODY、またはBUTTONS）を追加してください"
      },
      facebookCreateComingSoon: "Facebookテンプレートの作成は今後のバージョンで利用可能になります。",
      wabaCreateComingSoon: "WABAテンプレートの作成は今後のバージョンで利用可能になります。",
      noTemplatesFound: "この接続のテンプレートが見つかりませんでした。",
      messengerCategoryHint: "MessengerはUTILITYテンプレートのみをサポートしています。マーケティングテンプレートには、ユーザーのオプトインによるnotification_message_tokensが必要です。"
    },
    phones: {
      title: "Wabas",
      selectConnection: "WABA接続を選択",
      noConnections: "WABA接続が利用できません",
      checkPhone: "WABAを確認",
      registerPhone: "WABAを登録",
      noConnectionsFound: "WABA接続が見つかりません。まずは通信チャネルセクションでWABA接続を設定してください。",
      selectConnectionToManage: "電話を管理するには、WABA 接続を選択します。",
      connectionInfo: {
        title: "WABA接続情報",
        phoneNumberId: "電話番号ID",
        wabaId: "WABA ID",
        wabaVersion: "WABAバージョン"
      },
      phoneStatus: {
        title: "電話のステータス",
        phoneNumber: "電話番号",
        phoneId: "電話ID",
        verifiedName: "名前確認済み",
        status: "状態"
      },
      tips: {
        title: "ヒントと情報",
        phoneVerification: {
          title: "電話認証",
          description: "お使いの携帯電話が WhatsApp Business API に登録され、アクティブになっていることを確認してください。"
        },
        phoneRegistration: {
          title: "電話登録",
          description: "電話を登録するには、Facebook ビジネス マネージャーから提供される 6 桁の PIN が必要です。"
        },
        verifiedStatus: {
          title: "検証済みステータス",
          description: "認証された電話はメッセージやテンプレートを送信できます。"
        },
        facebookBusinessManager: {
          title: "Facebookビジネスマネージャー",
          description: "アクセス: ビジネスマネージャー → WhatsApp Business API → 電話番号"
        }
      }
    },
    instagram: {
      title: "Instagram",
      selectInstagramConnection: "Instagram接続を選択",
      noInstagramConnectionsAvailable: "Instagram接続が利用できません",
      noInstagramConnections: "Instagram接続が見つかりません。まずは通信チャネルセクションでInstagram接続を設定してください。",
      selectConnectionToManage: "アカウントを管理するには、Instagram接続を選択します。",
      verifyAccount: "アカウントを確認",
      selectInstagramFirst: "まずInstagram接続を選択してください",
      accountInfoLoaded: "アカウント情報が正常に読み込まれました！",
      accountCheckError: "Instagramアカウントの確認中にエラーが発生しました",
      connectionInfo: {
        title: "Instagram接続情報",
        instagramPageId: "InstagramページID",
        wabaId: "WABA ID",
        wabaVersion: "WABAバージョン"
      },
      accountInfo: {
        title: "Instagramアカウント情報",
        accountId: "アカウントID",
        username: "ユーザー名",
        name: "名前",
        profilePicture: "プロフィール写真"
      },
      tips: {
        title: "ヒントと情報",
        accountVerification: {
          title: "アカウント認証",
          description: "InstagramアカウントがMeta Business Managerで接続され、アクティブになっていることを確認してください。"
        },
        facebookBusinessManager: {
          title: "Facebookビジネスマネージャー",
          description: "アクセス: ビジネスマネージャー → Instagram → 接続されたアカウント"
        }
      }
    },
    messenger: {
      title: "Messenger",
      selectMessengerConnection: "Messenger接続を選択",
      noMessengerConnectionsAvailable: "Messenger接続が利用できません",
      noMessengerConnections: "Messenger接続が見つかりません。まずは通信チャネルセクションでMessenger接続を設定してください。",
      selectConnectionToManage: "ページを管理するには、Messenger接続を選択します。",
      verifyAccount: "ページを確認",
      selectMessengerFirst: "まずMessenger接続を選択してください",
      accountInfoLoaded: "ページ情報が正常に読み込まれました！",
      accountCheckError: "Messengerページの確認中にエラーが発生しました",
      connectionInfo: {
        title: "Messenger接続情報",
        fbPageId: "FacebookページID",
        wabaId: "WABA ID",
        wabaVersion: "WABAバージョン"
      },
      accountInfo: {
        title: "Messengerページ情報",
        pageId: "ページID",
        name: "名前",
        category: "カテゴリ",
        picture: "プロフィール写真",
        about: "概要",
        website: "ウェブサイト",
        phone: "電話",
        location: "場所"
      },
      tips: {
        title: "ヒントと情報",
        pageVerification: {
          title: "ページ認証",
          description: "FacebookページがMeta Business Managerで接続され、アクティブになっていることを確認してください。"
        },
        facebookBusinessManager: {
          title: "Facebookビジネスマネージャー",
          description: "アクセス: ビジネスマネージャー → ページ → 接続されたページ"
        }
      }
    },
    facebook: {
      title: "Facebook",
      selectFacebookConnection: "Facebook接続を選択",
      noFacebookConnectionsAvailable: "Facebook接続が利用できません",
      noFacebookConnections: "Facebook接続が見つかりません。まずは通信チャネルセクションでFacebook接続を設定してください。",
      selectConnectionToManage: "管理する接続を選択",
      verifyPage: "ページを確認",
      selectFacebookFirst: "まずFacebook接続を選択してください",
      pageInfoLoaded: "ページ情報が正常に読み込まれました！",
      pageCheckError: "Facebookページの確認中にエラーが発生しました",
      connectionInfo: {
        title: "接続情報",
        pageId: "Page ID",
        wabaId: "WABA ID",
        wabaVersion: "WABAバージョン"
      },
      pageInfo: {
        title: "ページ情報",
        pageId: "Page ID",
        name: "名前",
        category: "カテゴリ",
        about: "概要",
        website: "ウェブサイト",
        phone: "電話",
        profilePicture: "プロフィール写真"
      },
      tips: {
        title: "ヒント",
        pageVerification: {
          title: "ページ認証",
          description: "Facebookページが認証され、必要な権限があることを確認してください。"
        },
        facebookBusinessManager: {
          title: "Facebookビジネスマネージャー",
          description: "ページはFacebook Business Managerにリンクされ、権限が設定されている必要があります。"
        }
      }
    },
    phoneRegistration: {
      title: "WABAに電話を登録する",
      description: "電話を登録するには、Facebook ビジネス マネージャーから提供される 6 桁の PIN が必要です。",
      phoneNumberId: "電話番号ID",
      phoneNumberIdHint: "WABAの固有の電話ID",
      wabaId: "WABA ID",
      wabaIdHint: "WhatsAppビジネスアカウントID",
      wabaVersion: "WABAバージョン",
      wabaVersionHint: "Facebook グラフ API バージョン",
      wabaToken: "WABAトークン",
      wabaTokenHint: "APIアクセストークン",
      pin: "6桁のPIN",
      pinHint: "Facebookビジネスマネージャー登録用の6桁のPIN",
      register: "電話番号を登録",
      success: "電話が WABA に正常に登録されました。",
      error: "電話の登録中にエラーが発生しました。PINと認証情報を確認してください。"
    },
    verification: {
      requestTitle: "リクエストコード",
      verifyTitle: "コードを確認する",
      requestDescription: "登録した電話番号にSMSまたは電話で認証コードが送信されます。",
      verifyDescription: "SMSまたは電話で送信された確認コードを入力します。",
      code: "コード",
      codeHint: "SMSまたは電話で受信したコードを入力してください",
      requestCode: "リクエストコード",
      requestNewCode: "新しいコードをリクエストする",
      verify: "確認するには",
      success: "確認コードはSMSまたは電話で送信されます。電話番号を確認してください。",
      verifySuccess: "コードの確認に成功しました。電話が有効化されました。",
      error: "確認コードの要求中にエラーが発生しました。",
      verifyError: "コードの確認中にエラーが発生しました。コードが正しいかどうか確認してください。",
      smsOption: "SMS",
      voiceOption: "電話",
      locale: "位置",
      language: "言語",
      methodTitle: "配送方法",
      localeHint: "認証コードの場所を選択してください",
      languageHint: "認証コードの言語を選択してください"
    },
    test: {
      title: "テストテンプレートの送信",
      phoneNumber: "テスト電話番号",
      phoneNumberHint: "国番号付きの番号を入力してください（例：5511999999999）",
      variables: "変数の値:",
      variableValue: "{{1}}の値",
      variablePlaceholder: "{変数}の値を入力してください",
      preview: "テンプレートのプレビュー:",
      sendTest: "テストを送信",
      success: "テストテンプレートが正常に送信されました。",
      error: "テストテンプレートの送信中にエラーが発生しました。番号を確認してもう一度お試しください。",
      invalidNumber: "電話番号は 10 桁から 15 桁の数字にする必要があります。",
      fillVariables: "テンプレート変数のすべての値を入力します。"
    },
    messages: {
      selectConnectionToManage: "テンプレートを管理するには接続を選択してください",
      selectWabaConnection: "テンプレートを表示するにはWABA接続を選択してください",
      selectWabaToCreate: "テンプレートを作成するには、WABA 接続を選択します。",
      selectWabaToEdit: "テンプレートを編集するには、WABA 接続を選択します。",
      selectWabaToDelete: "テンプレートを削除するには、WABA 接続を選択します。",
      selectWabaToTest: "テスト テンプレートを送信するには、WABA 接続を選択します。",
      selectWabaToCheck: "電話を確認するには、WABA 接続を選択します。",
      selectWabaFirst: "まずWABA接続を選択してください。",
      phoneAlreadyRegistered: "電話はすでにこの WABA に登録されています。",
      phoneNotRegistered: "電話はこの WABA に登録されていません。",
      phoneVerifiedNotRegistered: "WABA で電話認証されました。",
      phoneNotVerified: "電話番号が確認されていません。確認手続きを完了する必要があります。",
      codeExpired: "認証コードの有効期限が切れています。認証を更新する必要があります。",
      sampleTemplateEdit: "これは Facebook が提供するサンプル テンプレートであり、編集することはできません。",
      sampleTemplateDelete: "これは Facebook が提供するサンプル テンプレートであり、削除することはできません。",
      sampleTemplateChip: "サンプルテンプレート",
      sampleTemplateEditTitle: "サンプルテンプレートは編集できません。",
      sampleTemplateDeleteTitle: "サンプルテンプレートは削除できません",
      noWabaConnections: "WABA接続が見つかりません。まずは通信チャネルセクションでWABA接続を設定してください。",
      noWabaConnectionsShort: "WABA接続が見つかりません。まずWABA接続を設定してください。",
      allFieldsRequired: "6 桁の PIN を含め、すべてのフィールドは必須です。",
      pinFormatError: "PIN は 6 桁の数字でなければなりません。",
      enterPhoneNumber: "テストする電話番号を入力してください。",
      enterCode: "SMSまたは電話で受信した確認コードを入力します。",
      codeExpiredDialog: {
        title: "期限切れのコード",
        message: "この携帯電話の確認コードは期限切れです。新しいコードをリクエストしますか？"
      },
      phoneNotVerifiedDialog: {
        title: "電話番号が確認されていません",
        message: "この電話番号は確認されていません。確認コードをリクエストしますか？"
      }
    },
    statusOptions: {
      approved: "承認された",
      pending: "保留中",
      rejected: "拒否",
      inAppeal: "控訴について",
      disabled: "無効"
    },
    categoryOptions: {
      utility: "ユーティリティ",
      marketing: "マーケティング",
      authentication: "認証"
    },
    languageOptions: {
      ptBR: "ポルトガル語（ブラジル）",
      enUS: "英語（米国）",
      esES: "スペイン語"
    },
    componentTypeOptions: {
      header: "ヘッダ",
      body: "体",
      footer: "ベースボード",
      buttons: "ボタン"
    },
    headerFormatOptions: {
      text: "文章",
      image: "画像",
      document: "書類",
      video: "ビデオ",
      location: "位置"
    },
    buttonTypeOptions: {
      quickReply: "迅速な対応",
      url: "URL",
      phoneNumber: "電話",
      otp: "ワンタイムパスワード"
    },
    headerFields: {
      imageUrl: "画像URL（例）",
      imagePlaceholder: "https://exemplo.com/imagem.jpg",
      documentUrl: "ドキュメントURL（例）",
      documentPlaceholder: "https://exemplo.com/documento.pdf",
      videoUrl: "動画URL（例）",
      videoPlaceholder: "https://exemplo.com/video.mp4",
      latitude: "緯度（例）",
      latitudePlaceholder: "-23.5505",
      longitude: "経度（例）",
      longitudePlaceholder: "-46.6333",
      locationName: "場所名（例）",
      locationNamePlaceholder: "サンパウロ州"
    },
    characterLimits: {
      header: "最大60文字",
      body: "最大1024文字",
      footer: "最大60文字",
      button: "最大25文字"
    },
    preview: {
      title: "テンプレートのプレビュー",
      imageLoadError: "画像の読み込みに失敗しました",
      urlNotAvailable: "URL/ハンドルが利用できません",
      addButtonToStart: "「ボタンを追加」をクリックしてボタンの設定を開始します。"
    },
    buttons: {
      cancel: "キャンセル",
      sendTest: "テストを送信",
      registerPhone: "電話番号を登録",
      requestCode: "リクエストコード",
      requestNewCode: "新しいコードをリクエストする",
      verify: "確認するには",
      checkPhone: "電話を確認する"
    },
    dynamic: {
      actionButton: "アクション {インデックス}",
      buttonNumber: "{インデックス} ボタン"
    },
    notifications: {
      noWabaConnectionsFound: "WABA接続が見つかりません。まずWABA接続を設定してください。",
      selectWabaToList: "WABA 接続を選択してテンプレートを一覧表示します。",
      noMessengerConnectionsFound: "Messenger接続が見つかりません。最初にMessenger接続を設定してください。",
      selectMessengerToList: "テンプレートを一覧表示するには、Messenger接続を選択してください。",
      selectWabaToCreate: "テンプレートを作成するには、WABA 接続を選択します。",
      selectWabaToEdit: "テンプレートを編集するには、WABA 接続を選択します。",
      selectWabaToDelete: "テンプレートを削除するには、WABA 接続を選択します。",
      selectWabaToTest: "テスト テンプレートを送信するには、WABA 接続を選択します。",
      selectWabaToCheck: "電話を確認するには、WABA 接続を選択します。",
      selectWabaFirst: "まずWABA接続を選択してください。",
      phoneAlreadyRegistered: "電話はすでにこの WABA に登録されています。",
      templateCreated: "テンプレートが正常に作成されました。",
      templateUpdated: "テンプレートが正常に更新されました。",
      templateDeleted: "テンプレートが正常に削除されました。",
      phoneRegistered: "電話が WABA に正常に登録されました。",
      codeSent: "確認コードはSMSまたは電話で送信されます。電話番号を確認してください。",
      codeVerified: "コードの確認に成功しました。電話が有効化されました。",
      testSent: "テストテンプレートが正常に送信されました。",
      codeExpired: "認証コードの有効期限が切れています。認証を更新する必要があります。",
      phoneVerifiedNotRegistered: "WABA で電話認証されました。",
      phoneNotVerified: "電話番号が確認されていません。確認手続きを完了する必要があります。",
      phoneNotRegistered: "電話はこの WABA に登録されていません。",
      sampleTemplateEdit: "これは Facebook が提供するサンプル テンプレートであり、編集することはできません。",
      sampleTemplateDelete: "これは Facebook が提供するサンプル テンプレートであり、削除することはできません。",
      nameFormatted: "テンプレート名は、Facebook のルール (小文字とアンダースコアのみ) に従って自動的にフォーマットされました。",
      characterLimitExceeded: "文字数制限を超えました",
      characterLimitsExceeded: "制限を超えました: {詳細}",
      fillVariables: "テンプレート変数のすべての値を入力します。",
      invalidNumber: "電話番号は 10 桁から 15 桁の数字にする必要があります。",
      allFieldsRequired: "6 桁の PIN を含め、すべてのフィールドは必須です。",
      pinFormatError: "PIN は 6 桁の数字でなければなりません。",
      enterPhoneNumber: "テストする電話番号を入力してください。",
      enterCode: "SMSまたは電話で受信した確認コードを入力します。",
      listError: "テンプレートの読み込みエラー",
      createError: "テンプレートの作成中にエラーが発生しました",
      updateError: "テンプレートの編集エラー",
      deleteError: "テンプレートの削除中にエラーが発生しました",
      testError: "テストテンプレートの送信中にエラーが発生しました。番号を確認してもう一度お試しください。",
      phoneCheckError: "電話番号の確認中にエラーが発生しました。認証情報をご確認ください。",
      phoneRegistrationError: "電話の登録中にエラーが発生しました。PINと認証情報を確認してください。",
      codeRequestError: "確認コードの要求中にエラーが発生しました。",
      codeVerificationError: "コードの確認中にエラーが発生しました。コードが正しいかどうか確認してください。",
      uploadError: "画像の送信中にエラーが発生しました。接続を確認してもう一度お試しください。",
      uploadSuccess: "画像のアップロードに成功しました。ヘッダーハンドル: {handle}",
      codeExpiredDialog: {
        title: "期限切れのコード",
        message: "この携帯電話の確認コードは期限切れです。新しいコードをリクエストしますか？"
      },
      phoneNotVerifiedDialog: {
        title: "電話番号が確認されていません",
        message: "この電話番号は確認されていません。確認コードをリクエストしますか？"
      }
    }
  },
  googleCallback: {
    processing: "承認を処理中...",
    waitMessage: "Google カレンダーの承認を処理中です。しばらくお待ちください。",
    errors: {
      authorization: "認証エラー: {error}",
      codeNotFound: "認証コードが見つかりません",
      configNameNotFound: "設定名が見つかりません",
      noConfigFound: "設定が見つかりません",
      configNotFoundForName: "名前 {name} の構成が見つかりません",
      invalidTokens: "トークンの取得エラー: 無効なデータが返されました",
      saveTokensError: "トークンの保存中にエラーが発生しました: {error}",
      processAuthorizationError: "認証処理エラー: {error}"
    },
    success: {
      authorizationCompleted: "認証が正常に完了しました。"
    },
    warnings: {
      noParameters: "URLにパラメータが見つかりません"
    }
  },
  googleCalendar: {
    title: "Googleカレンダー",
    config: {
      modal: {
        redirectUri: {
          label: "リダイレクトURL",
          hint: "認可コードを受け取るためのURL",
          copyTooltip: "クリップボードにコピー",
          copySuccess: "リダイレクトURLをクリップボードにコピーしました！",
          copyError: "クリップボードにコピーできませんでした。手動でコピーしてください！"
        },        
        editTitle: "設定を編集する",
        newTitle: "新しい構成",
        completeMessage: "セットアップが完了しました。保存できます。",
        incompleteMessage: "すべてのフィールドに入力してトークンを取得し、保存します。",
        name: {
          label: "構成名",
          required: "名前は必須です",
          hint: "例: メインアジェンダ、個人アジェンダなど。"
        },
        clientId: {
          label: "Google クライアント ID",
          required: "クライアントIDが必要です"
        },
        clientSecret: {
          label: "Google クライアント シークレット",
          required: "クライアントシークレットは必須です"
        },
        accessToken: {
          label: "アクセストークン",
          required: "アクセストークンは必須です"
        },
        refreshToken: {
          label: "リフレッシュトークン",
          required: "リフレッシュトークンは必須です"
        },
        getTokensButton: "トークンを自動的に取得する",
        getTokensTooltip: "クリックするとアクセストークンとリフレッシュトークンが自動的に取得されます",
        saveButton: "設定を保存",
        cancelButton: "キャンセル",
        deleteButton: "設定の削除"
      },
      management: {
        title: "設定の管理",
        newButton: "新しい構成",
        table: {
          name: "名前",
          status: "状態",
          tokens: "トークン",
          createdAt: "作成年",
          actions: "アクション",
          statusActive: "アクティブ",
          statusInactive: "非アクティブ",
          tokensComplete: "完了",
          tokensPending: "保留中"
        },
        actions: {
          edit: "設定を編集する",
          delete: "設定を削除する"
        }
      },
      errors: {
        fillRequiredFields: "必須項目をすべて入力してください",
        saveError: "設定の保存中にエラーが発生しました: {error}",
        deleteError: "構成の削除中にエラーが発生しました: {error}",
        fillClientCredentials: "まずクライアントIDとクライアントシークレットを入力してください",
        fillConfigName: "まず設定名を入力してください",
        generateAuthUrlError: "認証 URL の生成中にエラーが発生しました: {error}",
        redirectingAuth: "Google 認証にリダイレクトしています..."
      },
      success: {
        saved: "設定が正常に保存されました。",
        deleted: "設定が正常に削除されました。",
        selectedForEdit: "編集用に選択された構成。"
      },
      confirm: {
        deleteTitle: "削除を確認",
        deleteMessage: "この設定を削除してもよろしいですか?",
        deleteCalendarMessage: "この Google カレンダーの設定を削除してもよろしいですか?"
      }
    },
    events: {
      create: {
        modal: {
          titleCreate: "新しいイベントを作成",
          title: {
            label: "イベントタイトル",
            required: "タイトルは必須です"
          },
          selectCalendar: "カレンダーを選択",
          selectCalendarRequired: "スケジュールを選択",
          noConfigAvailable: "利用可能な構成はありません",
          startDateTime: {
            label: "開始日時",
            required: "開始日は必須です"
          },
          endDateTime: {
            label: "終了日時",
            required: "終了日は必須です"
          },
          description: {
            label: "説明"
          },
          location: {
            label: "位置"
          },
          attendees: {
            label: "参加者（メールアドレスはカンマで区切ってください）",
            hint: "example@@email.com、other@@email.com"
          },
          createButton: "イベントを作成",
          cancelButton: "キャンセル"
        },
        errors: {
          selectConfig: "イベントを作成するための構成を選択します。",
          configNotFound: "選択した構成が見つかりません。",
          configureCredentials: "まずGoogleカレンダーの認証情報を設定します",
          createError: "イベント作成中にエラーが発生しました: {error}"
        },
        success: {
          created: "イベントが正常に作成されました。"
        }
      },
      list: {
        title: "イベント",
        selectCalendar: "カレンダーを選択",
        noConfigAvailable: "利用可能な構成はありません",
        createNewButton: "新しいイベントを作成",
        createNewTooltip: "Googleカレンダーで新しいイベントを作成する",
        filters: {
          startDate: "開始日",
          endDate: "終了日",
          maxResults: "結果の数",
          searchButton: "検索"
        },
        table: {
          title: "タイトル",
          start: "始める",
          end: "終わり",
          location: "位置",
          status: "状態",
          actions: "アクション"
        },
        actions: {
          edit: "イベントを編集",
          delete: "イベントを削除",
          open: "Googleカレンダーで開く"
        },
        errors: {
          selectConfig: "イベントを検索するには構成を選択します。",
          configNotFound: "選択した構成が見つかりません。",
          configureCredentials: "まずGoogleカレンダーの認証情報を設定します",
          loadError: "イベントの読み込み中にエラーが発生しました: {error}"
        }
      },
      edit: {
        modal: {
          titleEdit: "イベントを編集",
          title: {
            label: "イベントタイトル",
            required: "タイトルは必須です"
          },
          startDateTime: {
            label: "開始日時",
            required: "開始日は必須です"
          },
          endDateTime: {
            label: "終了日時",
            required: "終了日は必須です"
          },
          description: {
            label: "説明"
          },
          location: {
            label: "位置"
          },
          attendees: {
            label: "参加者（メールアドレスはカンマで区切ってください）",
            hint: "example@email.com、other@email.com"
          },
          updateButton: "更新イベント",
          cancelButton: "キャンセル"
        },
        errors: {
          selectConfig: "イベントを更新するには設定を選択します。",
          configNotFound: "選択した構成が見つかりません。",
          updateError: "イベントの更新中にエラーが発生しました: {error}"
        },
        success: {
          updated: "イベントが正常に更新されました。"
        }
      },
      delete: {
        confirm: {
          title: "削除を確認",
          message: "このイベントを削除してもよろしいですか?"
        },
        errors: {
          selectConfig: "イベントを削除するには設定を選択します。",
          configNotFound: "選択した構成が見つかりません。",
          deleteError: "イベントの削除中にエラーが発生しました: {error}"
        },
        success: {
          deleted: "イベントは正常に削除されました。"
        }
      }
    }
  },
  gmailCallback: {
    processing: "認証を処理中...",
    waitMessage: "Gmailの認証を処理しています。しばらくお待ちください。",
    title: "Gmail認証が完了しました！",
    message: "GmailアカウントがOAuth2用に正常に設定されました。",
    infoSession: "セッション情報:",
    whatsappId: "WhatsApp ID:",
    status: "ステータス:",
    data: "日付:",
    closeWindow: "ウィンドウを閉じる",
    errorTitle: "認証エラー",
    debugInfo: "デバッグ情報:",
    fullUrl: "完全なURL:",
    parameters: "パラメータ:",
    retry: "再試行",
    callbackTitle: "Gmailコールバック",
    waitingMessage: "認証処理を待機中...",
    noParametersFound: "URLにパラメータが見つかりません",
    authorizationError: "認証エラー",
    codeNotFound: "認証コードが見つかりません",
    whatsappIdNotFound: "WhatsApp IDが見つかりません",
    saveTokensError: "トークン保存エラー",
    processAuthorizationError: "認証処理エラー"
  },
  massaWavoip: {
    title: "Wavoip - 大量通話",
    sections: {
      sessions: {
        title: "Wavoipセッション",
        refresh: "更新",
        noSessions: "Wavoipトークンを持つセッションが見つかりません",
        connectButton: "セッションを接続",
        connecting: "接続中...",
        status: {
          connected: "接続済み",
          disconnected: "切断済み",
          online: "オンライン",
          offline: "オフライン"
        }
      },
      phoneNumbers: {
        title: "電話番号",
        addButton: "番号を追加",
        noNumbers: "番号が追加されていません",
        dialog: {
          title: "番号を追加",
          message: "電話番号を入力してください（国コード付き）:",
          placeholder: "例: 5511999999999"
        }
      },
      audioFile: {
        title: "オーディオファイル",
        selectFile: "オーディオファイルを選択",
        supportedFormats: "サポート形式: MP3, WAV, OGG, M4A, AAC",
        dragDrop: "オーディオファイルをここにドラッグするか、クリックして選択",
        dragActive: "ファイルをここにドロップ..."
      },
      status: {
        title: "セッション状態",
        makeCall: "通話を開始:",
        callButton: "通話"
      },
      callControls: {
        incomingCall: "着信",
        activeCall: "アクティブな通話",
        accept: "受話",
        reject: "拒否",
        injectAudio: "オーディオを注入",
        playing: "再生中...",
        endCall: "終了",
        transmittingAudio: "🎵 通話でオーディオを送信中"
      }
    },
    notifications: {
      selectSession: "少なくとも1つのセッションを選択してください",
      sessionNotConnected: "セッションが接続されていません",
      noAudioFile: "オーディオファイルが読み込まれていません",
      invalidInstance: "無効なWavoipインスタンス",
      connectionsEstablished: "接続が確立されました！",
      wavoipError: "Wavoipへの接続エラー",
      callStarted: "通話が開始されました！",
      callError: "通話開始エラー",
      callAccepted: "通話が受話されました！",
      acceptError: "通話受話エラー",
      callRejected: "通話が拒否されました",
      callEnded: "通話が終了しました",
      endError: "通話終了エラー",
      audioTransmitted: "通話でオーディオが送信されています！",
      audioError: "オーディオ注入エラー",
      audioFileError: "オーディオファイル読み込みエラー",
      wavoipLibraryError: "Wavoipライブラリ読み込みエラー",
      numberAdded: "番号が追加されました: {number}",
      numberRemoved: "番号が削除されました: {number}",
      fileLoaded: "ファイルが読み込まれました: {filename}",
      fileRemoved: "ファイルが削除されました",
      sessionsUpdated: "セッションが更新されました",
      callReceived: "{name}からの通話を受信"
    },
    logs: {
      audioContextInitialized: "AudioContextが初期化されました",
      audioContextNotSupported: "このブラウザではAudioContextがサポートされていません",
      audioContextError: "AudioContext初期化エラー: {error}",
      globalInterceptionSetup: "グローバルgetUserMediaインターセプトを設定中...",
      globalInterceptionConfigured: "グローバルインターセプトが設定されました",
      globalInterceptionError: "インターセプト設定エラー: {error}",
      wavoipInitializing: "Wavoip接続を初期化中...",
      sessionExpanded: "セッション{name}が{count}トークンに展開されました",
      sessionInitialized: "セッション{name}が初期化されました",
      sessionConnected: "セッション{name}が接続されました",
      sessionDisconnected: "セッション{name}が切断されました",
      sessionNoToken: "セッション{sessionId}にWavoipトークンがありません",
      sessionConnectError: "セッション{name}接続エラー: {error}",
      wavoipImportError: "Wavoipインポートエラー: {error}",
      wavoipNotLoaded: "Wavoipが正しく読み込まれていません",
      connectionFailed: "接続に失敗 - インスタンスが作成されませんでした",
      callStarting: "{number}への通話を開始中",
      callStarted: "{number}への通話が開始されました",
      callStartError: "通話開始エラー: {error}",
      signalingData: "シグナリングデータ: {data}",
      acceptEvent: "セッション{sessionId}のacceptイベントを受信",
      callTerminated: "通話が終了しました",
      callRejected: "通話が拒否されました",
      callAccepted: "通話が受話されました",
      audioInjecting: "通話にオーディオを注入中...",
      audioInjected: "オーディオが正常に注入されました！",
      audioInjectionError: "オーディオ注入エラー: {error}",
      audioNotLoaded: "オーディオファイルが読み込まれていません",
      audioTransmissionEnded: "オーディオ送信が終了しました",
      audioStopping: "すべてのオーディオを停止中",
      audioStopped: "すべてのオーディオが停止されました",
      audioFileLoaded: "オーディオファイルが読み込まれました: {filename}",
      audioFileError: "オーディオファイル読み込みエラー: {error}",
      audioContextNotAvailable: "ファイル読み込み用のAudioContextが利用できません",
      getUserMediaCalled: "インターセプトによってgetUserMediaが呼び出されました",
      interceptingGetUserMedia: "getUserMediaをインターセプト - MP3ストリームを返却",
      usingOriginalGetUserMedia: "元のgetUserMediaを使用",
      instanceCleaning: "セッションインスタンス{sessionId}をクリーンアップ中",
      instanceRemoved: "セッションインスタンス{sessionId}が削除されました",
      instanceCleanupError: "インスタンスクリーンアップエラー: {error}",
      resourcesCleaning: "リソースをクリーンアップ中...",
      cleanupComplete: "クリーンアップが完全に完了しました",
      sourceStopError: "ソース停止エラー: {error}"
    }
  },
  migration: {
    title: 'テナント移行',
    totalMigrations: '移行総数',
    completed: '完了',
    inProgress: '進行中',
    failed: '失敗',
    newMigration: '新しい移行',
    migrationInfoTitle: '移行情報',
    migrationInfoDescription: 'すべてのデータとファイルを含む、完全なテナントを1つのVPSから別のVPSに移行します。',
    requirements: '要件',
    remoteDatabase: 'リモートデータベース設定',
    dbHost: 'ホスト',
    dbPort: 'ポート',
    dbDialect: '方言',
    dbName: 'データベース名',
    dbUser: 'ユーザー',
    dbPassword: 'パスワード',
    sshConfig: 'SSH設定',
    sshHost: 'SSHホスト',
    sshPort: 'SSHポート',
    sshUser: 'SSHユーザー',
    sshPassword: 'SSHパスワード',
    sshPasswordOrKey: 'または秘密鍵を使用',
    sshPrivateKey: 'SSH秘密鍵',
    zproBasePath: 'ZPROベースパス',
    publicFolderPath: 'パブリックフォルダーパス',
    migrationConfig: '移行設定',
    sourceTenantId: 'ソーステナントID',
    targetTenantId: 'ターゲットテナントID',
    startMigration: '移行を開始',
    migrationsList: '移行リスト',
    refresh: '更新',
    viewDetails: '詳細を表示',
    resume: '再開',
    migrationDetails: '移行詳細',
    basicInfo: '基本情報',
    status: 'ステータス',
    createdAt: '作成日時',
    updatedAt: '更新日時',
    progressInfo: '進捗情報',
    currentStep: '現在のステップ',
    progress: '進捗',
    currentModel: '現在のモデル',
    files: 'ファイル',
    completedModels: '完了したモデル',
    error: 'エラー',
    close: '閉じる',
    confirm: '確認',
    chooseMigrationType: '移行タイプを選択:',
    fullMigration: '完全移行（データベース + ファイル）',
    databaseOnly: 'データベースのみ',
    filesOnly: 'ファイルのみ',
    loadSavedConfig: '保存された設定を読み込む',
    saveConfig: '設定を保存',
    clearSavedConfig: '保存された設定をクリア',
    savedConfigAvailable: '保存された設定が利用可能です。保存アイコン（緑）をクリックして読み込みます。',
    configSavedSuccess: '設定が正常に保存されました',
    configSavedMessage: '設定が保存され、再利用できます',
    configSaveError: '設定の保存中にエラーが発生しました',
    configLoadedSuccess: '設定が正常に読み込まれました',
    configSavedAt: '保存日時:',
    noSavedConfig: '保存された設定が見つかりません',
    configLoadError: '設定の読み込み中にエラーが発生しました',
    confirmClearConfig: '保存された設定を本当にクリアしますか？',
    configClearedSuccess: '保存された設定が削除されました',
    configClearError: '設定のクリア中にエラーが発生しました',
    databaseMigrationStarted: 'データベース移行が正常に開始されました',
    databaseMigrationError: 'データベース移行の開始中にエラーが発生しました',
    filesMigrationStarted: 'ファイル移行が正常に開始されました',
    filesMigrationError: 'ファイル移行の開始中にエラーが発生しました',
    migrationLogs: '移行ログ',
    refreshLogs: 'ログを更新',
    downloadLog: 'ログをダウンロード',
    noLogsAvailable: 'ログが利用できません',
    logsLoadError: 'ログの読み込み中にエラーが発生しました',
    logDownloadSuccess: 'ログが正常にダウンロードされました',
    logDownloadError: 'ログのダウンロード中にエラーが発生しました',
    retryDatabase: 'データベース移行を再試行',
    retryFiles: 'ファイル移行を再試行',
    pause: '一時停止',
    pauseSuccess: '移行が正常に一時停止されました',
    pauseError: '移行の一時停止中にエラーが発生しました'
  },
  updateNotification: {
    title: '新しいバージョンが利用可能です！',
    message: 'アプリケーションの新しいバージョンが利用可能です。最新の改善を入手するために更新してください。デスクトップでは、Ctrl+Shift+Rコマンドで更新できます。',
    updateButton: '今すぐ更新'
  }
};
