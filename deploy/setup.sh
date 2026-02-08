#!/usr/bin/env bash
#
# Setup script para deploy em VPS Ubuntu (22.04/24.04)
# Uso: curl -sSL <url-do-script> | bash
#   ou: bash setup.sh <url-do-repo-git>
#
set -euo pipefail

REPO_URL="${1:-https://github.com/SEU-USUARIO/sistema-de-estoque.git}"
APP_DIR="/opt/sistema-de-estoque"

echo "==> Atualizando sistema..."
sudo apt-get update -y
sudo apt-get upgrade -y

# --- Docker ---
if ! command -v docker &> /dev/null; then
  echo "==> Instalando Docker..."
  sudo apt-get install -y ca-certificates curl gnupg
  sudo install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  sudo chmod a+r /etc/apt/keyrings/docker.gpg

  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

  sudo apt-get update -y
  sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

  sudo usermod -aG docker "$USER"
  echo "    Docker instalado. Pode ser necessario relogar para usar sem sudo."
else
  echo "==> Docker ja instalado."
fi

# --- Firewall ---
echo "==> Configurando firewall (ufw)..."
sudo apt-get install -y ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
echo "    Firewall configurado (SSH + HTTP + HTTPS)."

# --- Clone e deploy ---
if [ -d "$APP_DIR" ]; then
  echo "==> Atualizando repositorio existente..."
  cd "$APP_DIR"
  sudo git pull
else
  echo "==> Clonando repositorio..."
  sudo git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

echo "==> Buildando e iniciando containers..."
sudo docker compose up -d --build

echo ""
echo "========================================="
echo "  Deploy concluido!"
echo "  App acessivel em: http://$(hostname -I | awk '{print $1}')"
echo "========================================="
echo ""
echo "--- Proximos passos (SSL com Certbot) ---"
echo ""
echo "1. Aponte seu dominio para o IP deste servidor"
echo ""
echo "2. Instale o Certbot:"
echo "   sudo apt-get install -y certbot python3-certbot-nginx"
echo ""
echo "3. Gere o certificado:"
echo "   sudo certbot --nginx -d seu-dominio.com.br"
echo ""
echo "4. Renovacao automatica ja fica configurada via systemd timer."
echo ""
echo "--- Comandos uteis ---"
echo "  docker compose logs -f        # Ver logs"
echo "  docker compose restart         # Reiniciar"
echo "  docker compose down            # Parar"
echo "  docker compose up -d --build   # Rebuild e deploy"
echo ""
