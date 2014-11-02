class AddQueristoryFromToQueries < ActiveRecord::Migration
  def change
    add_column :queries, :queristory_form , :integer
  end
end
