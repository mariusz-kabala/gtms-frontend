resource "docker_container" "gtms-frontend" {
  name  = "gtms-frontend"
  image = "docker-registry.kabala.tech/gtms-frontend:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "kabala-net"
  }
  labels = {
     "traefik.backend" = "gtms-frontend"
     "traefik.frontend.rule" = "Host:geotags.pl"
     "traefik.port" = "3000"
     "traefik.protocol" = "http"
     "traefik.enable" = "true"
  }
}