class AddSessionIdToQueries < ActiveRecord::Migration
  def change
    add_column :queries, :session_id, :string
  end
end
