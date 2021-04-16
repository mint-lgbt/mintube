# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_16_164025) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "preferences", force: :cascade do |t|
    t.boolean "video_loop", default: false, null: false
    t.boolean "autoplay", default: true, null: false
    t.boolean "play_next_automatically", default: true, null: false
    t.boolean "proxy_videos", default: true, null: false
    t.boolean "audio_only", default: false, null: false
    t.string "speed", default: "1.0", null: false
    t.string "quality", default: "hd720", null: false
    t.string "dash_quality", default: "auto", null: false
    t.decimal "volume", default: "100.0", null: false
    t.string "comments", default: "youtube", null: false
    t.string "captions", default: "en", null: false
    t.boolean "show_related", default: true, null: false
    t.boolean "show_annotations", default: true, null: false
    t.string "language", default: "en", null: false
    t.string "player", default: "mintube", null: false
    t.boolean "dark_mode", default: true, null: false
    t.boolean "thin_mode", default: false, null: false
    t.string "default_home", default: "popular", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "sessions", force: :cascade do |t|
    t.string "session_id", null: false
    t.text "data"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["session_id"], name: "index_sessions_on_session_id", unique: true
    t.index ["updated_at"], name: "index_sessions_on_updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
