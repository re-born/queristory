class Page < ActiveRecord::Base
  belongs_to :query, touch: true, counter_cache: true
  validates :url, presence: true
end
