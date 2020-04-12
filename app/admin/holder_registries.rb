ActiveAdmin.register HolderRegistry do
  menu priority: 17
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :registry_date, :shareholder_id, :shares_count, :paid_shares_count,
  :subscription_date, :serie, :category, :share_price, :equity_percentage, :has_agreement, :create_modif, :outdate_modif, :outdate_date, :has_collateral,
  :create_modif_id, :outdate_modif_id
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

end
