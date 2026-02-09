import request from 'src/service/request.js'

/**
 * Executa backup de todos os tenants
 */
export function backupAllTenants() {
  return request({
    url: '/backup/all',
    method: 'post'
  })
}

/**
 * Executa backup de um tenant específico
 */
export function backupTenant(tenantId) {
  return request({
    url: `/backup/tenant/${tenantId}`,
    method: 'post'
  })
}

/**
 * Lista todos os backups disponíveis
 */
export function listBackups() {
  return request({
    url: '/backups',
    method: 'get'
  })
}

/**
 * Lista backups de um tenant específico
 */
export function listBackupsByTenant(tenantId) {
  return request({
    url: `/backups/tenant/${tenantId}`,
    method: 'get'
  })
}

/**
 * Obtém status geral dos backups
 */
export function getBackupStatus() {
  return request({
    url: '/status',
    method: 'get'
  })
}

/**
 * Obtém status dos backups de um tenant específico
 */
export function getBackupStatusByTenant(tenantId) {
  return request({
    url: `/status/tenant/${tenantId}`,
    method: 'get'
  })
}

/**
 * Restaura backup de um tenant
 */
export function restoreTenant(tenantId, backupPath) {
  return request({
    url: `/restore/tenant/${tenantId}`,
    method: 'post',
    data: { backupPath }
  })
}

// ===== ROTAS DE CONFIGURAÇÃO DE BACKUP =====

/**
 * Configura backup para um tenant específico
 */
export function configureBackupForTenant(tenantId, config) {
  return request({
    url: `/config/tenant/${tenantId}`,
    method: 'post',
    data: config
  })
}

/**
 * Obtém todas as configurações de backup de um tenant
 */
export function getBackupConfigs(tenantId) {
  return request({
    url: `/config/tenant/${tenantId}`,
    method: 'get'
  })
}

/**
 * Obtém todas as configurações de backup de todos os tenants
 */
export function getAllBackupConfigs() {
  return request({
    url: '/config/all',
    method: 'get'
  })
}

/**
 * Obtém a configuração ativa de backup de um tenant
 */
export function getActiveBackupConfig(tenantId) {
  return request({
    url: `/config/tenant/${tenantId}/active`,
    method: 'get'
  })
}

/**
 * Remove uma configuração de backup
 */
export function deleteBackupConfig(configId) {
  return request({
    url: `/config/${configId}`,
    method: 'delete'
  })
}

// ===== ROTAS DE LIMPEZA DE BACKUPS ANTIGOS =====

/**
 * Limpa backups antigos de um tenant específico
 */
export function cleanOldBackupsForTenant(tenantId) {
  return request({
    url: `/cleanup/tenant/${tenantId}`,
    method: 'post'
  })
}

/**
 * Limpa backups antigos de todos os tenants
 */
export function cleanOldBackupsForAllTenants() {
  return request({
    url: '/cleanup/all',
    method: 'post'
  })
}

/**
 * Recria configuração padrão para um tenant
 */
export function recreateDefaultConfig(tenantId) {
  return request({
    url: `/config/tenant/${tenantId}/recreate`,
    method: 'post'
  })
}

/**
 * Faz download de um backup específico
 */
export function downloadBackup(tenantId, backupPath) {
  return request({
    url: `/download/tenant/${tenantId}`,
    method: 'post',
    data: { backupPath },
    responseType: 'blob'
  })
}

/**
 * Deleta um backup específico
 */
export function deleteBackup(tenantId, backupPath) {
  return request({
    url: `/delete/tenant/${tenantId}`,
    method: 'delete',
    data: { backupPath }
  })
}

/**
 * Lista todos os resultados de backup
 */
export function listBackupResults(limit = 100, offset = 0) {
  return request({
    url: '/results',
    method: 'get',
    params: { limit, offset }
  })
}

/**
 * Lista resultados de backup de um tenant específico
 */
export function listBackupResultsByTenant(tenantId, limit = 50) {
  return request({
    url: `/results/tenant/${tenantId}`,
    method: 'get',
    params: { limit }
  })
}

/**
 * Obtém estatísticas de backup
 */
export function getBackupStatistics(tenantId) {
  return request({
    url: '/statistics',
    method: 'get',
    params: tenantId ? { tenantId } : {}
  })
}

// ===== ROTA LEGADA (MANTIDA PARA COMPATIBILIDADE) =====

/**
 * Configura o serviço de backup (rota legada)
 * @deprecated Use configureBackupForTenant instead
 */
export function configureBackup(config) {
  return request({
    url: '/configure',
    method: 'post',
    data: config
  })
}

/**
 * Formata bytes para exibição humana
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Formata data para exibição
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

/**
 * Obtém status de progresso do backup
 */
export function getBackupProgressStatus(result) {
  if (result.databaseSuccess && result.filesSuccess) {
    return { status: 'success', message: 'Backup completo' };
  } else if (result.databaseSuccess || result.filesSuccess) {
    return { status: 'warning', message: 'Backup parcial' };
  } else {
    return { status: 'error', message: 'Backup falhou' };
  }
}

/**
 * Valida configuração de backup
 */
export function validateBackupConfig(config) {
  const errors = [];

  if (!config.storageType) {
    errors.push('Tipo de armazenamento é obrigatório');
  }

  if (!config.storageConfig) {
    errors.push('Configuração de armazenamento é obrigatória');
  }

  switch (config.storageType) {
    case 'local':
      if (!config.storageConfig.local?.path) {
        errors.push('Caminho é obrigatório para armazenamento local');
      }
      break;
    case 's3':
      const s3Config = config.storageConfig.s3;
      if (!s3Config?.bucket || !s3Config?.region || !s3Config?.accessKeyId || !s3Config?.secretAccessKey) {
        errors.push('Bucket, região, accessKeyId e secretAccessKey são obrigatórios para S3');
      }
      break;
    case 'ftp':
      const ftpConfig = config.storageConfig.ftp;
      if (!ftpConfig?.host || !ftpConfig?.port || !ftpConfig?.username || !ftpConfig?.password || !ftpConfig?.path) {
        errors.push('Host, porta, usuário, senha e caminho são obrigatórios para FTP');
      }
      break;
    case 'sftp':
      const sftpConfig = config.storageConfig.sftp;
      if (!sftpConfig?.host || !sftpConfig?.port || !sftpConfig?.username || !sftpConfig?.path) {
        errors.push('Host, porta, usuário e caminho são obrigatórios para SFTP');
      }
      if (!sftpConfig?.password && !sftpConfig?.privateKey) {
        errors.push('Senha ou chave privada é obrigatória para SFTP');
      }
      break;
    default:
      // Para tipos personalizados, apenas verifica se storageConfig existe
      if (!config.storageConfig[config.storageType]) {
        errors.push(`Configuração para tipo '${config.storageType}' é obrigatória`);
      }
      break;
  }

  if (config.retentionDays < 1) {
    errors.push('Dias de retenção deve ser maior que 0');
  }

  if (config.encryption && !config.encryptionPassword) {
    errors.push('Senha de criptografia é obrigatória quando criptografia está habilitada');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Cria configuração padrão para um tenant
 */
export function createDefaultBackupConfig(tenantId) {
  return {
    storageType: 'local',
    storageConfig: {
      local: {
        path: './backup'
      }
    },
    compression: true,
    encryption: false,
    retentionDays: 30,
    description: 'Configuração padrão de backup'
  };
}

/**
 * Obtém tipos de armazenamento disponíveis
 */
export function getAvailableStorageTypes() {
  return [
    { label: 'Local', value: 'local', icon: 'folder' },
    { label: 'Amazon S3', value: 's3', icon: 'cloud' },
    { label: 'FTP', value: 'ftp', icon: 'cloud_upload' },
    { label: 'SFTP', value: 'sftp', icon: 'cloud_upload' }
  ];
}

/**
 * Obtém configuração de armazenamento baseada no tipo
 */
export function getStorageConfigTemplate(storageType) {
  switch (storageType) {
    case 'local':
      return {
        local: {
          path: '/backups'
        }
      };
    case 's3':
      return {
        s3: {
          bucket: '',
          region: '',
          accessKeyId: '',
          secretAccessKey: ''
        }
      };
    case 'ftp':
      return {
        ftp: {
          host: '',
          port: 21,
          username: '',
          password: '',
          path: ''
        }
      };
    case 'sftp':
      return {
        sftp: {
          host: '',
          port: 22,
          username: '',
          password: '',
          privateKey: '',
          path: ''
        }
      };
    default:
      return {};
  }
} 