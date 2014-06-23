class RenameColumnToQueries < ActiveRecord::Migration
  def change
    rename_column :queries, :query, :q
  end
end
