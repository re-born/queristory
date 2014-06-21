class AddColumnsToQueries < ActiveRecord::Migration
  def change
    add_column :queries, :oq,     :string
    add_column :queries, :tbm,    :string
    add_column :queries, :as_qdr, :string
    add_column :queries, :lr,     :string
    add_column :queries, :tbs,    :string
    add_column :queries, :source, :string
    add_column :queries, :safe,   :string
    add_column :queries, :num,    :integer
    add_column :queries, :filter, :integer
    add_column :queries, :pws,    :integer
  end
end
