class CreateRegistryModifications < ActiveRecord::Migration[5.2]
  def change
    create_table :registry_modifications do |t|
      t.references :company, foreign_key: true
      t.string :motive
      t.datetime :modification_date
      t.string :comment

      t.timestamps
    end
  end
end
