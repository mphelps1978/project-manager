resource "azurerm_kubernetes_cluster" "app_cluster" {
  name = "web_app_cluster"
  location = azurerm_resource_group.web_app.location
  resource_group_name = azurerm_resource_group.web_app.name
  dns_prefix = "web_app_cluster"
  
  default_node_pool {
    name = "default_pool"
    node_count = "2"
    vm_size = "standard_e2bds_v5"
  }
  
  identity {
    type = "SystemAssigned"
  }
}