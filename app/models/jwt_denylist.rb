class JwtDenylist < ApplicationRecord


  self.table_name = 'jwt_blacklists'

  belongs_to :user

  validates :jti, presence: true, uniqueness: true

  private
  def self.revoked?(jti)
    exists?(jti: jti)
  end
end
