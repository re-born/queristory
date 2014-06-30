class Page < ActiveRecord::Base
  belongs_to :query
  validates :url, presence: true
end
