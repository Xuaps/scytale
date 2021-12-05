provider "azurerm" {
  # whilst the `version` attribute is optional, we recommend pinning to a given version of the Provider
  version = "=2.20.0"
  features {}
}

variable "location" {}

variable "storagePolicy" {
  type = string
}

variable "region" {
  type    = string
  default = "we"
}

variable "prefix" {
  type    = string
  default = "xuaps"
}

variable "resourceFunction" {
  type = string
}

variable "environment" {
  type = string
}

variable "storageAccountSku" {
  default = {
    tier = "Standard"
    type = "GRS"
  }
}

variable "apimSku" {
  type = string
}

variable "apimSkuCapacity" {
  type = number
}

variable "apimPublisherName" {
  type = string
}

variable "apimPublisherEmail" {
  type = string
}

locals {
  resourceGroupName  = "${var.prefix}-${var.resourceFunction}-${var.environment}-${var.region}"
  storageAccountName = "${var.prefix}${var.resourceFunction}sa${var.environment}${var.region}"
  apimName           = "${var.prefix}-${var.resourceFunction}-${var.environment}-${var.region}"
  kvName             = "${var.prefix}-${var.resourceFunction}-kv-${var.environment}-${var.region}"
  appInsightsName    = "${var.prefix}-${var.resourceFunction}-appinsights-${var.environment}-${var.region}"
}

# --- Get reference to logged on Azure subscription ---
data "azurerm_client_config" "current" {}

# create resource group
resource "azurerm_resource_group" "rg" {
  name     = local.resourceGroupName
  location = var.location
}

# Create Storage Account
resource "azurerm_storage_account" "sa" {
  name                      = local.storageAccountName
  resource_group_name       = azurerm_resource_group.rg.name
  location                  = azurerm_resource_group.rg.location
  account_tier              = var.storageAccountSku.tier
  account_replication_type  = var.storageAccountSku.type
  account_kind              = "StorageV2"
  enable_https_traffic_only = true

  static_website {
    index_document = "index.html"
  }
}
resource "azurerm_storage_container" "saContainer" {
  name                  = "documents"
  storage_account_name  = azurerm_storage_account.sa.name
  container_access_type = "private"
}

#Add index.html to blob storage
resource "azurerm_storage_blob" "scytale-web" {
  name                   = "index.html"
  storage_account_name   = azurerm_storage_account.sa.name
  storage_container_name = "$web"
  type                   = "Block"
  content_type           = "text/html"
  source                 = "../dist/index.html"
}

output "storageAccountName" {
  value = azurerm_storage_account.sa.name
}

# create key vault
resource "azurerm_key_vault" "kv" {
  name                        = "local-kvName"
  location                    = azurerm_resource_group.rg.location
  resource_group_name         = azurerm_resource_group.rg.name
  enabled_for_disk_encryption = false
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  sku_name                    = "standard"
}

# set key vault permissions
resource "azurerm_key_vault_access_policy" "kvPermissions" {
  key_vault_id = azurerm_key_vault.kv.id

  tenant_id = data.azurerm_client_config.current.tenant_id
  object_id = data.azurerm_client_config.current.object_id

  secret_permissions = [
    "get"
  ]

  # Give full control to the sevice principal as it might need to delete a certificate on the next update run
  certificate_permissions = [
    "create",
    "delete",
    "get",
    "import",
    "list",
    "update"
  ]
}

resource "azurerm_api_management" "apim" {
  name                = local.apimName
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  publisher_name      = var.apimPublisherName
  publisher_email     = var.apimPublisherEmail

  sku_name = "${var.apimSku}_${var.apimSkuCapacity}"

  identity {
    type = "SystemAssigned"
  }

  # policy {
  #   xml_link = var.tenantPolicyUrl
  # }
}

# Assign get certificate permissions to APIM so APIM can access it
resource "azurerm_key_vault_access_policy" "kvApimPolicy" {
  key_vault_id = azurerm_key_vault.kv.id

  tenant_id = data.azurerm_client_config.current.tenant_id
  object_id = azurerm_api_management.apim.identity.0.principal_id

  secret_permissions = [
    "get"
  ]

  certificate_permissions = [
    "get",
    "list"
  ]
}

# Create Application Insights
resource "azurerm_application_insights" "ai" {
  name                = local.appInsightsName
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  application_type    = "web"
}
# Create Logger
resource "azurerm_api_management_logger" "apimLogger" {
  name                = "${local.apimName}-logger"
  api_management_name = azurerm_api_management.apim.name
  resource_group_name = azurerm_resource_group.rg.name

  application_insights {
    instrumentation_key = azurerm_application_insights.ai.instrumentation_key
  }
}

# create API
resource "azurerm_api_management_api" "scytale" {
  name                = "scytale"
  resource_group_name = azurerm_resource_group.rg.name
  api_management_name = azurerm_api_management.apim.name
  revision            = "1"
  display_name        = "Documents"
  path                = "doc"
  protocols           = ["https"]

  subscription_key_parameter_names {
    header = "AppKey"
    query  = "AppKey"
  }

  import {
    content_format = "openapi"
    content_value  = file("${path.module}/../api-v1.yaml")
  }
}

resource "azurerm_api_management_api_operation_policy" "scytale-get-file" {
  api_name            = azurerm_api_management_api.scytale.name
  api_management_name = azurerm_api_management.apim.name
  resource_group_name = azurerm_resource_group.rg.name
  operation_id        = "get-document"

  xml_content = var.storagePolicy

}

resource "azurerm_api_management_api_operation_policy" "scytale-delete-file" {
  api_name            = azurerm_api_management_api.scytale.name
  api_management_name = azurerm_api_management.apim.name
  resource_group_name = azurerm_resource_group.rg.name
  operation_id        = "delete-document"

  xml_content = var.storagePolicy

}

resource "azurerm_api_management_api_operation_policy" "scytale-upload-file" {
  api_name            = azurerm_api_management_api.scytale.name
  api_management_name = azurerm_api_management.apim.name
  resource_group_name = azurerm_resource_group.rg.name
  operation_id        = "upload-documents"

  xml_content = var.storagePolicy

}
