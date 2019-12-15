locals {
    subdomain = "${var.subdomain}"
    s3_access_key = "${var.s3_access_key}"
    s3_secret_key = "${var.s3_secret_key}"
}

provider "docker" {
    host = "tcp://192.168.0.33:2376/"
}

terraform {
  backend "s3" {
    bucket = "kabalatech-terraform"
    key    = "gtms_frontend-${local.subdomain}.tfstate"
    region = "nl-ams"
    endpoint = "s3.nl-ams.scw.cloud"
    access_key = "${local.s3_access_key}"
    secret_key = "${local.secret_key}"
    skip_credentials_validation = true
    skip_region_validation      = true
  }
}