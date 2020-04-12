class RegistryModification < ApplicationRecord
  belongs_to :company
  extend Enumerize
  enumerize :motive, in: [ :bylaw_modification, :shareholders_meeting, :board_meeting, :mandate, :ruling, :shareholders_agreement, :other]
end
