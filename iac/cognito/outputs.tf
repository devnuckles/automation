output "cognito_user_pool_arn" {
  value = aws_cognito_user_pool.pool.arn
}

output "cognito_user_pool_id" {
  value = aws_cognito_user_pool.pool.id
}

output "cognito_client_id" {
  value = aws_cognito_user_pool_client.app_client.id
}