import request from 'src/service/request.js'

/**
 * Inicia migração completa de tenant (banco + arquivos)
 */
export function migrateTenant(data) {
  return request({
    url: '/admin/migrate-tenant',
    method: 'post',
    data
  })
}

/**
 * Inicia migração apenas do banco de dados
 */
export function migrateDatabase(data) {
  return request({
    url: '/admin/migrate-database',
    method: 'post',
    data
  })
}

/**
 * Inicia migração apenas de arquivos
 */
export function migrateFiles(data) {
  return request({
    url: '/admin/migrate-files',
    method: 'post',
    data
  })
}

/**
 * Lista todas as migrações
 */
export function listMigrations() {
  return request({
    url: '/admin/migrations',
    method: 'get'
  })
}

/**
 * Obtém progresso de uma migração específica
 */
export function getMigrationProgress(migrationId) {
  return request({
    url: `/admin/migrations/${migrationId}`,
    method: 'get'
  })
}

/**
 * Lista logs disponíveis para uma migração
 */
export function listMigrationLogs(migrationId) {
  return request({
    url: `/admin/migrations/${migrationId}/logs`,
    method: 'get'
  })
}

/**
 * Baixa um log específico de migração
 */
export function downloadMigrationLog(migrationId, logType) {
  return request({
    url: `/admin/migrations/${migrationId}/logs/${logType}`,
    method: 'get',
    responseType: 'blob'
  })
}

/**
 * Retoma uma migração interrompida
 */
export function resumeMigration(migrationId) {
  return request({
    url: `/admin/migrations/${migrationId}/resume`,
    method: 'post'
  })
}

/**
 * Pausa uma migração em andamento
 */
export function pauseMigration(migrationId) {
  return request({
    url: `/admin/migrations/${migrationId}/pause`,
    method: 'post'
  })
}

/**
 * Formata bytes para exibição humana
 */
export function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Formata data para exibição
 */
export function formatDate(dateString) {
  if (!dateString) return '-';
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
 * Obtém cor do status da migração
 */
export function getStatusColor(status) {
  switch (status) {
    case 'completed': return 'positive';
    case 'in_progress': return 'info';
    case 'failed': return 'negative';
    case 'paused': return 'warning';
    default: return 'grey';
  }
}

/**
 * Obtém texto do status da migração
 */
export function getStatusText(status) {
  switch (status) {
    case 'completed': return 'Concluída';
    case 'in_progress': return 'Em Andamento';
    case 'failed': return 'Falhou';
    case 'paused': return 'Pausada';
    case 'pending': return 'Pendente';
    default: return status;
  }
}

