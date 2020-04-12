class HolderRegistry < ApplicationRecord
  belongs_to :shareholder
  belongs_to :create_modif, class_name: :RegistryModification
  belongs_to :outdate_modif, class_name: :RegistryModification
end
