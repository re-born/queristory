class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.integer :query_id
      t.string :q
      t.string :session_id
      t.string :url
      t.integer :rank
      t.integer :start

      t.timestamps
    end
  end
end
