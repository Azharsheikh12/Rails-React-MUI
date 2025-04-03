class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  def jwt_token
    payload = { user_id: self.id, jti: SecureRandom.uuid }
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end
end
