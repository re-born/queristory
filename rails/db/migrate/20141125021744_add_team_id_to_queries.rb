class AddTeamIdToQueries < ActiveRecord::Migration
  def change
    add_column :queries, :team_id,     :integer
  end
end
