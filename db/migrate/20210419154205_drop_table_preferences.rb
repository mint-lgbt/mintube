class DropTablePreferences < ActiveRecord::Migration[6.1]
  def change
    drop_table :preferences
  end
end
