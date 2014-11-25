class Team < ActiveRecord::Base
  has_many :queries
  validates :name, uniqueness: true
  has_secure_password
end
