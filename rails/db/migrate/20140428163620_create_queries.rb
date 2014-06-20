class CreateQueries < ActiveRecord::Migration
  def change
    create_table :queries do |t|
      t.text :query
      t.integer :user_id
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
