class Query < ActiveRecord::Base
  has_many :pages
  belongs_to :team
  validates :q, presence: true
  default_scope -> { order('created_at DESC') }
  default_scope -> { where.not(q: nil) }

  def search_image?
    self.tbm == 'isch'
  end
end
