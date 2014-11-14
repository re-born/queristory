class Page < ActiveRecord::Base
  belongs_to :query, touch: true
  validates :url, presence: true
end
