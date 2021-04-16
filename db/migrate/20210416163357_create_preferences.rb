class CreatePreferences < ActiveRecord::Migration[6.1]
  def change
    create_table :preferences do |t|
      t.boolean :video_loop, default: false, null: false
      t.boolean :autoplay, default: true, null: false
      t.boolean :play_next_automatically, default: true, null: false
      t.boolean :proxy_videos, default: true, null: false
      t.boolean :audio_only, default: false, null: false
      t.string :speed, default: '1.0', null: false
      t.string :quality, default: 'hd720', null: false
      t.string :dash_quality, default: 'auto', null: false
      t.numeric :volume, default: '100', null: false
      t.string :comments, default: 'youtube', null: false
      t.string :captions, default: 'en', null: false
      t.boolean :show_related, default: true, null: false
      t.boolean :show_annotations, default: true, null: false
      t.string :language, default: 'en', null: false
      t.string :player, default: 'mintube', null: false
      t.boolean :dark_mode, default: true, null: false
      t.boolean :thin_mode, default: false, null: false
      t.string :default_home, default: 'popular', null: false

      t.timestamps
    end
  end
end
