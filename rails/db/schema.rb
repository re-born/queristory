# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141125033629) do

  create_table "pages", force: true do |t|
    t.integer  "query_id"
    t.string   "q"
    t.string   "session_id"
    t.string   "url"
    t.integer  "rank"
    t.integer  "start"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "title"
  end

  create_table "queries", force: true do |t|
    t.text     "q"
    t.datetime "deleted_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "oq"
    t.string   "tbm"
    t.string   "as_qdr"
    t.string   "lr"
    t.string   "tbs"
    t.string   "source"
    t.string   "safe"
    t.integer  "num"
    t.integer  "filter"
    t.integer  "pws"
    t.string   "session_id"
    t.integer  "queristory_from"
    t.integer  "team_id"
  end

  create_table "teams", force: true do |t|
    t.string   "name"
    t.integer  "the_number_of_people"
    t.string   "password_digest"
    t.string   "twitter_consumer_key"
    t.string   "twitter_consumer_secret"
    t.string   "twitter_oauth_key"
    t.string   "twitter_oauth_secret"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
