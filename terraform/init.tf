provider "docker" {
    host = "tcp://192.168.0.33:2376/"
}

terraform {
  backend "s3" {
    bucket = "kabalatech-terraform"
    key    = "gtms_frontend-${var.subdomain}.tfstate"
    region = "nl-ams"
    endpoint = "s3.nl-ams.scw.cloud"
    access_key = "${var.s3_access_key}"
    secret_key = "${var.secret_key}"
    skip_credentials_validation = true
    skip_region_validation      = true
  }
}