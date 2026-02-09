/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";

// Limpa caches antigos e precacheia a versão atual
cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST || []);


self.addEventListener("push", (event) => {
  console.log("Notitication received in Service Worker!", event);

  let data = {};

  try {
    data = event.data ? event.data.json() : { title: "NEW", body: "New message!" };
  } catch (error) {
    console.error("Erro ao processar JSON da notificação:", error);
    data = { title: "NEW", body: event.data.text() || "New message!" };
  }

  // Verificar se é notificação de chat interno (tem messageId e não tem ticketId)
  const isInternalChat = data.data && data.data.messageId && !data.data.ticketId;
  
  let title = data.title || "NEW!";
  let body = data.body || "New message.";
  let icon = "/icons/icon-192x192.png";
  let badge = "/icons/icon-192x192.png";
  let tag = "notification";
  let url = "/";

  if (isInternalChat) {
    // Personalizar para chat interno
    title = "💬 Chat Interno";
    body = data.body || "Nova mensagem recebida";
    tag = `chat-interno-${data.data.messageId}`;
    url = "/chatPrivado"; // URL para o chat interno
  } else if (data.data && data.data.ticketId) {
    // Personalizar para tickets
    title = "🆕 Novo Ticket";
    tag = `ticket-${data.data.ticketId}`;
    url = "/atendimento"; // URL para atendimentos
  }

  const options = {
    body: body,
    icon: icon,
    badge: badge,
    vibrate: [200, 100, 200],
    tag: tag, // Tag para agrupar notificações similares
    requireInteraction: false,
    data: {
      url: url,
      ...data.data // Incluir dados adicionais (messageId, ticketId, etc)
    },
    actions: [
      { action: "open", title: "Abrir" },
      { action: "close", title: "Fechar" },
    ],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  
  const notificationData = event.notification.data || {};
  const url = notificationData.url || "/";
  
  // Verificar se já existe uma janela aberta
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // Se já existe uma janela aberta, focar nela e navegar para a URL
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.includes(self.location.origin) && "focus" in client) {
          // Navegar para a URL específica e focar
          return client.navigate(url).then(() => client.focus());
        }
      }
      // Se não existe janela aberta, abrir nova
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Escutar mensagens do cliente para atualizar o service worker
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("install", (event) => {
  // Não fazer skipWaiting automaticamente - aguardar confirmação do usuário
  // self.skipWaiting(); // Removido para permitir controle manual
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    self.clients.claim()
  );
});
