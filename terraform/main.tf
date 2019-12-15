locals {
    tag = "${var.tag}"
}

resource "docker_container" "gtms-frontend" {
  name  = "gtms-frontend-${local.subdomain}"
  image = "docker-registry.kabala.tech/gtms-frontend:${local.tag}"
  restart = "always"
  networks_advanced {
      name = "kabala-net"
  }
  labels = {
     "traefik.backend" = "gtms-frontend-${local.subdomain}"
     "traefik.frontend.rule" = "Host:${local.subdomain}.geotags.pl"
     "traefik.port" = "3000"
     "traefik.protocol" = "http"
     "traefik.enable" = "true"
  }
}