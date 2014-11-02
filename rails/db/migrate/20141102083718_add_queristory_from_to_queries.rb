class AddQueristoryFromToQueries < ActiveRecord::Migration
  def change
    add_column :queries, :queristory_from , :integer
  end
end
