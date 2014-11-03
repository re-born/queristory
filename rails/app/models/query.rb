class Query < ActiveRecord::Base
  has_many :pages
  default_scope -> { order('created_at DESC') }
  default_scope -> { where.not(q: nil) }

  def search_image?
    self.tbm == 'isch'
  end
end
