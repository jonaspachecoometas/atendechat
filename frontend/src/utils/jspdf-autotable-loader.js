/**
 * Utilitário para garantir que o plugin jspdf-autotable seja carregado corretamente
 * Este arquivo força o carregamento do plugin antes de criar instâncias do jsPDF
 */
import jsPDF from "jspdf";

// Variável para armazenar a função autoTable
let autoTableFunction = null;

/**
 * Carrega o plugin jspdf-autotable e retorna a função autoTable
 * @returns {Promise<Function>}
 */
async function loadAutoTable() {
  if (autoTableFunction) {
    return autoTableFunction;
  }

  try {
    // Tentar importar o módulo
    const autoTableModule = await import("jspdf-autotable");
    
    // Tentar diferentes formas de acessar a função
    if (autoTableModule.default && typeof autoTableModule.default === 'function') {
      autoTableFunction = autoTableModule.default;
    } else if (autoTableModule.autoTable && typeof autoTableModule.autoTable === 'function') {
      autoTableFunction = autoTableModule.autoTable;
    } else {
      // Tentar import side-effect e verificar se foi adicionado ao protótipo
      await import("jspdf-autotable");
      if (typeof jsPDF.prototype.autoTable === 'function') {
        // Criar wrapper que usa o método do protótipo
        autoTableFunction = function(doc, options) {
          return doc.autoTable(options);
        };
      }
    }

    if (!autoTableFunction) {
      throw new Error('Não foi possível encontrar a função autoTable no módulo jspdf-autotable');
    }

    return autoTableFunction;
  } catch (error) {
    console.error('Erro ao carregar jspdf-autotable:', error);
    throw new Error('Erro ao carregar o plugin jspdf-autotable. Por favor, recarregue a página e tente novamente.');
  }
}

/**
 * Cria uma instância do jsPDF
 * @returns {jsPDF}
 */
export function createJsPDF() {
  return new jsPDF();
}

/**
 * Adiciona uma tabela ao documento usando autoTable
 * @param {jsPDF} doc - Instância do jsPDF
 * @param {Object} options - Opções do autoTable
 */
export async function addAutoTable(doc, options) {
  const autoTable = await loadAutoTable();
  return autoTable(doc, options);
}

/**
 * Cria uma instância do jsPDF e garante que autoTable esteja disponível
 * Se o método estiver disponível no protótipo, adiciona à instância
 * @returns {Promise<jsPDF>}
 */
export async function createJsPDFWithAutoTable() {
  // Carregar o plugin primeiro
  await loadAutoTable();
  
  const doc = new jsPDF();
  
  // Se autoTableFunction é um wrapper que usa o protótipo, o método já deve estar disponível
  // Caso contrário, adicionar o método à instância
  if (typeof doc.autoTable !== 'function' && autoTableFunction) {
    // Adicionar o método à instância para compatibilidade
    doc.autoTable = function(options) {
      return autoTableFunction(this, options);
    };
  }
  
  return doc;
}

