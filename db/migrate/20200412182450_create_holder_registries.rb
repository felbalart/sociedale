class CreateHolderRegistries < ActiveRecord::Migration[5.2]
  def change
    create_table :holder_registries do |t|
      t.datetime :registry_date
      t.references :shareholder, foreign_key: true
      t.integer :shares_count
      t.integer :paid_shares_count
      t.date :subscription_date
      t.string :serie
      t.string :category
      t.decimal :share_price
      t.decimal :equity_percentage
      t.boolean :has_agreement
      t.datetime :outdate_date
      t.boolean :has_collateral

      t.timestamps
    end
  end
end
