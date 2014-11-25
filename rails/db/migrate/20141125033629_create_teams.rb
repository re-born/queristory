class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.string :name
      t.integer :the_number_of_people
      t.string :password_digest
      t.string :twitter_consumer_key
      t.string :twitter_consumer_secret
      t.string :twitter_oauth_key
      t.string :twitter_oauth_secret

      t.timestamps
    end
  end
end
