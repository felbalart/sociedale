class AddModifToHolderRegistry < ActiveRecord::Migration[5.2]
  def change
    safety_assured do
      add_reference :holder_registries, :create_modif
      add_reference :holder_registries, :outdate_modif
      add_foreign_key :holder_registries, :registry_modifications, column: :create_modif_id, primary_key: :id
      add_foreign_key :holder_registries, :registry_modifications, column: :outdate_modif_id, primary_key: :id
    end
  end
end
