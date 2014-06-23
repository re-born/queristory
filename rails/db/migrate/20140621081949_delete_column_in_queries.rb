class DeleteColumnInQueries < ActiveRecord::Migration
  def change
    remove_column :queries, :user_id
  end
end
