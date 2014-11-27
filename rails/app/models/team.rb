class Team < ActiveRecord::Base
  has_many :queries
  validates :name, uniqueness: true
  has_secure_password

  def twitter_enabled?
    self.twitter_consumer_key &&
    self.twitter_consumer_secret &&
    self.twitter_oauth_key &&
    self.twitter_oauth_secret
  end
end
