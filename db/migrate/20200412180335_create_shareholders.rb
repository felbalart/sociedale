class CreateShareholders < ActiveRecord::Migration[5.2]
  def change
    create_table :shareholders do |t|
      t.string :name
      t.integer :rut
      t.integer :dv
      t.references :company, foreign_key: true

      t.timestamps
    end
  end
end
