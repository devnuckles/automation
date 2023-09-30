resource "aws_cognito_user_pool" "pool" {
  name                     = "automation-dev-user-pool"

  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]

  # lambda_config {
  #   pre_sign_up = var.cognito_user_auto_confirm_function_arn
  # }

  username_configuration {
    case_sensitive = false
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  password_policy {
    minimum_length                   = 8
    require_lowercase                = false
    require_numbers                  = false
    require_symbols                  = false
    require_uppercase                = false
    temporary_password_validity_days = 120
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "role"
    required                 = false

    string_attribute_constraints {
      min_length = 4
      max_length = 20
    }
  }


  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "createdBy"
    required                 = false

    string_attribute_constraints {
      min_length = 10
      max_length = 100
    }
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "status"
    required                 = false

    string_attribute_constraints {
      min_length = 2
      max_length = 10
    }
  }
}

resource "aws_cognito_user_pool_client" "app_client" {
  name                                 = "cognito-automation-user-pool-client"

  user_pool_id                         = aws_cognito_user_pool.pool.id
  generate_secret                      = false
  allowed_oauth_flows_user_pool_client = false
  read_attributes                      = [
    "email",
    "name",
    "phone_number",
    "picture",
    "custom:role",
    "custom:createdBy",
    "custom:status"
  ]
  prevent_user_existence_errors        = "LEGACY"
  explicit_auth_flows                  = [
    "ALLOW_CUSTOM_AUTH", "ALLOW_REFRESH_TOKEN_AUTH", "ALLOW_USER_PASSWORD_AUTH", "ALLOW_USER_SRP_AUTH", "ALLOW_ADMIN_USER_PASSWORD_AUTH"
  ]
  access_token_validity  = 1
  id_token_validity      = 24
  refresh_token_validity = 1

  token_validity_units {
    access_token  = "hours"
    id_token      = "hours"
    refresh_token = "days"
  }
}