const usuario = JSON.parse(localStorage.getItem('usuario'))

// State mínimo necessário - apenas para rastrear tokens adicionados
// O controle real é feito pelo script CDN (window.wavoip)
const defaultState = {
  wavoip: {}, // Apenas para rastrear quais tokens foram adicionados: { [token]: { inbox_name, token } }
};

export const actions = {
  startWavoip: async ({ commit, state, dispatch }, { inboxName, token, buttonPosition }) => {

    if (state.wavoip && state.wavoip[token] && token) {
      return;
    }

    if(usuario &&usuario.blockWavoip) {
      window.wavoipWebphone.destroy();
      return;
    }

    if(usuario && usuario.profile === 'superadmin') {
      return;
    }

    const tokens = token.includes(',') ? token.split(',').map(t => t.trim()) : [token];

    if(tokens.length >= 1) {


      
      // const wavoipapi = await window.wavoipWebphone.render({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
      const wavoipapi = await window.wavoipWebphone.render({buttonPosition: { x: window.innerWidth - 80, y: window.innerHeight - 120 }});
      if(!wavoipapi) {
        return;
      }
    }
   
    for (const token of tokens){
      if (state.wavoip && state.wavoip[token]) {
        continue;
      }
      window.wavoip.device.addDevice(token);
      // Registra o token no state para rastreamento
      commit('ADD_WAVOIP', {
        token: token,
        inboxName: inboxName,
      });
    }
  },
  outcomingCall: async ({ commit, state, dispatch }, callInfo) => {
    let { phone } = callInfo;
    // Verifica se window.wavoip está disponível
    if (!window.wavoip) {
      console.error('Wavoip não está disponível. Certifique-se de que o script foi carregado.');
      throw new Error('Wavoip não está disponível');
    }

    // Usa APENAS o token especificado - não tenta outros tokens
    let fromTokens = [];
    
    // Prioridade: instances > token > erro
    if (callInfo.instances && Array.isArray(callInfo.instances) && callInfo.instances.length > 0) {
      // Se instances foi passado, usa apenas esses tokens
      fromTokens = callInfo.instances.flatMap(t => t.split(',').map(x => x.trim()));
    } else if (callInfo.token) {
      // Se token foi passado, usa apenas esse token
      fromTokens = callInfo.token.includes(',')
        ? callInfo.token.split(',').map(t => t.trim())
        : [callInfo.token];
    } else {
      // Se nenhum token foi especificado, lança erro
      throw new Error('Token não especificado. É necessário informar um token para realizar a chamada.');
    }

    // Valida se os tokens existem no state
    fromTokens = fromTokens.filter(token => {
      if (!state.wavoip || !state.wavoip[token]) {
        console.warn(`Token ${token} não foi adicionado ao Wavoip.`);
        return false;
      }
      return true;
    });

    if (fromTokens.length === 0) {
      throw new Error('Nenhum token válido disponível para realizar a chamada. Certifique-se de que o token foi adicionado.');
    }

      try {
        // Realiza a chamada usando APENAS o(s) token(s) especificado(s)
        // https://wavoip.gitbook.io/api/wavoip-api-websocket#realizando-uma-ligacao-outgoing
        const result = await window.wavoip.call.startCall(phone, fromTokens);
        
        // Desestrutura o resultado
        const { err, call } = result || {};
        
        // Se não encontrou call, tenta outras possibilidades
        let callOutgoing = call;
        if (!callOutgoing && result) {
          callOutgoing = result.callOutgoing || result.outgoing || result.callObject || result.callData;
        }

        if (err) {
          // Se houver erro, lança exceção imediatamente - não tenta outros tokens
          const errorMessage = err.message || 'Erro ao realizar chamada';
          throw new Error(errorMessage || 'Linha ocupada, tente mais tarde ou faça um upgrade');
        }

        // Se err é null mas call também é null/undefined, pode ser que a chamada foi iniciada
        // mas o objeto call será retornado via callback/evento
        // Nesse caso, consideramos sucesso e deixamos o widget do CDN gerenciar
        if (!err && !callOutgoing) {
          // Não lança erro - a chamada foi iniciada com sucesso (err: null)
          // O widget do CDN vai gerenciar a chamada visualmente
          return;
        }
        
        // Chamada iniciada com sucesso e call foi retornado
        if (!callOutgoing) {
          throw new Error('Chamada não foi criada');
        }

      // Obtém informações do dispositivo usado
      const deviceToken = callOutgoing.device_token;
      const inbox_name = state.wavoip[deviceToken]?.inbox_name || '';

      // Configura callbacks para eventos da chamada conforme documentação
      // O controle visual é feito pelo CDN
      callOutgoing.onPeerAccept((callActive) => {
        callActive.onEnd(() => {});
        callActive.onError((err) => {
          console.error('Erro durante a chamada:', err);
        });
        callActive.onPeerMute(() => {});
        callActive.onPeerUnmute(() => {});
      });

      callOutgoing.onPeerReject(() => {});
      callOutgoing.onUnanswered(() => {});
      callOutgoing.onEnd(() => {});
      callOutgoing.onStatus(() => {});

    } catch (error) {
      console.error('Erro ao realizar chamada:', error.message);
      throw error;
    }
  },
  destroyWavoip: async ({ commit, state }) => {
    try {
      // Esconde o botão do widget
      if (window.wavoip && window.wavoip.settings) {
        window.wavoip.settings.setShowWidgetButton(false);
      }
      
      // Destrói o widget
      if (window.wavoipWebphone && typeof window.wavoipWebphone.destroy === 'function') {
        window.wavoipWebphone.destroy();
      }
      
      // Limpa o state
      commit('CLEAR_WAVOIP');
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao destruir Wavoip:', error);
      throw error;
    }
  },
  hideWidgetButton: async ({ commit, state }) => {
    try {
      // Esconde apenas o botão do widget, sem destruir o widget
      if (window.wavoip && window.wavoip.settings) {
        window.wavoip.settings.setShowWidgetButton(false);
        // Salva o estado no localStorage
        localStorage.setItem('wavoipWidgetVisible', 'false');
        return { success: true };
      } else {
        throw new Error('Wavoip settings não está disponível');
      }
    } catch (error) {
      console.error('Erro ao esconder botão do widget:', error);
      throw error;
    }
  },
  showWidgetButton: async ({ commit, state }) => {
    try {
      // Mostra o botão do widget
      if (window.wavoip && window.wavoip.settings) {
        window.wavoip.settings.setShowWidgetButton(true);
        // Salva o estado no localStorage
        localStorage.setItem('wavoipWidgetVisible', 'true');
        return { success: true };
      } else {
        throw new Error('Wavoip settings não está disponível');
      }
    } catch (error) {
      console.error('Erro ao mostrar botão do widget:', error);
      throw error;
    }
  },
  getWidgetButtonState: async ({ commit, state }) => {
    try {
      // Tenta obter o estado do localStorage primeiro
      const savedState = localStorage.getItem('wavoipWidgetVisible');
      if (savedState !== null) {
        return { visible: savedState === 'true' };
      }
      
      // Se não houver estado salvo, verifica no DOM
      const webphoneDiv = document.getElementById('webphone');
      if (webphoneDiv) {
        const buttons = webphoneDiv.querySelectorAll('button[data-closed="true"], button[data-slot="button"]');
        const hasVisibleButton = Array.from(buttons).some(button => {
          const style = window.getComputedStyle(button);
          return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
        });
        // Salva o estado encontrado
        localStorage.setItem('wavoipWidgetVisible', hasVisibleButton ? 'true' : 'false');
        return { visible: hasVisibleButton };
      }
      
      // Se não conseguir verificar, assume visível por padrão
      localStorage.setItem('wavoipWidgetVisible', 'true');
      return { visible: true };
    } catch (error) {
      console.error('Erro ao obter estado do botão do widget:', error);
      // Em caso de erro, assume visível por padrão
      return { visible: true };
    }
  },
};

export const mutations = {
  // Apenas para rastrear quais tokens foram adicionados
  ADD_WAVOIP($state, data) {
    $state.wavoip = {
      ...$state.wavoip,
      [data.token]: { 
        inbox_name: data.inboxName, 
        token: data.token
      },
    };
  },
  // Limpa todos os tokens do state
  CLEAR_WAVOIP($state) {
    $state.wavoip = {};
  },
};

export default {
  namespaced: true,
  state: defaultState,
  actions,
  mutations,
};