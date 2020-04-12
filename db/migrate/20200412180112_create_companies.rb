class CreateCompanies < ActiveRecord::Migration[5.2]
  def change
    create_table :companies do |t|
      t.string :name
      t.integer :rut
      t.integer :dv
      t.string :address
      t.string :logo
      t.date :incorporation_date
      t.string :ceo
      t.string :company_type
      t.string :incorporation_number

      t.timestamps
    end
  end
end
