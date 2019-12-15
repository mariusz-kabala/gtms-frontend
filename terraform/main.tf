resource "docker_container" "gtms-frontend" {
  name  = "gtms-frontend-${var.subdomain}"
  image = "docker-registry.kabala.tech/gtms-frontend:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "kabala-net"
  }
  labels = {
     "traefik.backend" = "gtms-frontend-${var.subdomain}"
     "traefik.frontend.rule" = "Host:${var.subdomain}.geotags.pl"
     "traefik.port" = "3000"
     "traefik.protocol" = "http"
     "traefik.enable" = "true"
  }
}