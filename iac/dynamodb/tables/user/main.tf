resource "aws_dynamodb_table" "users-table" {
  name           = "dev-auto-users"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "Id"
  attribute {
    name = "Id"
    type = "S"
  }
  attribute {
    name = "Username"
    type = "S"
  }
  attribute {
    name = "FirstName"
    type = "S"
  }
  attribute {
    name = "LastName"
    type = "S"
  }
  attribute {
    name = "Email"
    type = "S"
  }
  attribute {
    name = "Password"
    type = "S"
  }
  attribute {
    name = "PhoneNumber"
    type = "S"
  }
  attribute {
    name = "ImageUrl"
    type = "S"
  }
  attribute {
    name = "Role"
    type = "S"
  }
  attribute {
    name = "Status"
    type = "S"
  }
  attribute {
    name = "CreatedAt"
    type = "N"
  }
  attribute {
    name = "CreatedBy"
    type = "S"
  }
}