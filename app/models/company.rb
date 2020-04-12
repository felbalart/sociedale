class Company < ApplicationRecord
  has_many :registry_modifications



  def active_registries
    HolderRegistry.all
  end
end

