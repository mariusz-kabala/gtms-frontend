resource "docker_container" "gtms-frontend" {
  name  = "gtms-frontend-${var.env}"
  image = "${var.DOCKER_REGISTRY}/gtms/appandrew:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "kabala-net"
  }

  labels {
    label = "traefik.enable"
    value = "true"
  }

  labels {
    label = "traefik.backend"
    value = "gtms-frontend-${var.env}"
  }

  labels {
    label = "traefik.frontend.rule"
    value = "Host:${var.app_domain}"
  }

  labels {
    label = "traefik.protocol"
    value = "http"
  }

  labels {
    label = "traefik.port"
    value = "80"
  }

  env = [
    "NODE_ENV=production",
    "API_URL=https://${var.app_domain}/api",
    "FE_API_URL=https://${var.app_domain}/api",
    "VERSION=${var.tag}",
    "PORT=80",
    "FB_APP_ID=${var.fb_app_id}",
    "GOOGLE_CLIENT_ID=${var.google_client_id}"
  ]
}
