resource "docker_container" "gtms-frontend" {
  name  = "gtms-frontend-${var.env}"
  image = "docker-registry.kabala.tech/gtms/appandrew:${var.tag}"
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
    "API_URL=${var.app_domain}/api",
    "FE_API_URL=${var.app_domain}/api",
    "VERSION=${var.tag}",
    "PORT=80",
    "FB_APP_ID=${var.fb_app_id}",
    "GOOGLE_CLIENT_ID=${var.google_client_id}"
  ]
}

resource "docker_container" "service-auth-db" {
  name  = "service-auth-${var.env}-db"
  image = "mongo:4"
  restart = "always"

  networks_advanced {
      name = "kabala-net"
  }

  volumes {
    host_path      = "${var.mount_point}/${var.env}/service-auth-db"
    container_path = "/data/db"
  }
}
