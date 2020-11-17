# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_11_12_205856) do

  create_table "locations", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "city"
  end

  create_table "notes", force: :cascade do |t|
    t.string "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "trail_id", null: false
    t.index ["trail_id"], name: "index_notes_on_trail_id"
  end

  create_table "trails", force: :cascade do |t|
    t.string "name"
    t.string "difficulty"
    t.string "description"
    t.string "image"
    t.integer "location_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "likes", default: 0
    t.index ["location_id"], name: "index_trails_on_location_id"
  end

  add_foreign_key "notes", "trails"
  add_foreign_key "trails", "locations"
end
